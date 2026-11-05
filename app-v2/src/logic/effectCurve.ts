// Effect-curve calculation — ported from simulateur_synaptik.html drawTimeline()
// (computeTierResponse, getSubstancePowerFactor, evalSmoothWave).
// C1-continuous dome: sin^2 rise, gently arched plateau, cos^2 fall. Pure, no canvas.
import type { Substance, Roa } from './types';
import { getSubstanceByName } from './data';

const multToMin: Record<string, number> = {
  seconds: 1 / 60,
  minutes: 1,
  hours: 60,
  days: 1440,
};

// Mild peripheral medicines are capped low so their curve never dominates the chart.
const MILD_PERIPHERAL_POWER: Record<string, number> = {
  paracetamol: 0.18, acetaminophen: 0.18, phloroglucinol: 0.12, aspirin: 0.18,
  ibuprofen: 0.22, ketoprofen: 0.25, naproxen: 0.23, diclofenac: 0.23,
  metamizole: 0.24, celecoxib: 0.22, meloxicam: 0.22, piroxicam: 0.22,
  'mefenamic acid': 0.2, 'tiaprofenic acid': 0.21, flurbiprofen: 0.22,
  aceclofenac: 0.22, etoricoxib: 0.23, prednisolone: 0.2, prednisone: 0.2,
  methylprednisolone: 0.2, dexamethasone: 0.22, betamethasone: 0.22,
  propranolol: 0.22, nefopam: 0.42, caffeine: 0.28,
};

function getSubstancePowerFactor(sub: Substance): number {
  const nLow = (sub.name || '').toLowerCase();
  if (MILD_PERIPHERAL_POWER[nLow] !== undefined) return MILD_PERIPHERAL_POWER[nLow];
  const cats = (sub.categories || []).map((c) => c.toLowerCase());
  if (cats.includes('nsaid') || cats.includes('corticosteroid') || cats.includes('antispasmodic')) return 0.22;
  if (cats.includes('triptan') || cats.includes('nootropic')) return 0.32;
  if (cats.includes('antidepressant') && !cats.includes('opioid') && !cats.includes('stimulant')) return 0.28;
  const pot = Math.max(0.05, sub.relativePotency !== undefined ? sub.relativePotency : 1.0);
  return Math.max(0.65, Math.min(1.35, 1.05 + 0.12 * Math.log10(pot)));
}

function computeTierResponse(doseVal: number, d: NonNullable<Roa['dose']>, fallbackHeavy: number): number {
  if (!doseVal || doseVal <= 0) return 0.5;
  const light = d.lightMin || (d.commonMin ? d.commonMin * 0.5 : fallbackHeavy * 0.15);
  const thr = d.threshold || light * 0.5;
  const common = d.commonMin || light * 2.0;
  const strong = d.strongMin || common * 1.8;
  const heavy = d.heavyMin || fallbackHeavy;
  if (doseVal <= thr) return 0.42 * (doseVal / Math.max(0.001, thr));
  if (doseVal <= light) return 0.42 + 0.14 * ((doseVal - thr) / Math.max(0.001, light - thr));
  if (doseVal <= common) return 0.56 + 0.18 * ((doseVal - light) / Math.max(0.001, common - light));
  if (doseVal <= strong) return 0.74 + 0.14 * ((doseVal - common) / Math.max(0.001, strong - common));
  if (doseVal <= heavy) return 0.88 + 0.12 * ((doseVal - strong) / Math.max(0.001, heavy - strong));
  return Math.min(1.35, 1.0 + 0.25 * ((doseVal - heavy) / Math.max(0.001, heavy)));
}

export interface CurveModel {
  substanceName: string;
  color: string;
  /** minutes from intake until onset / peak / end (relative) */
  onsetMin: number;
  peakMin: number;
  endMin: number;
  /** amplitude of the curve (0..~1.35) */
  amplitude: number;
  /** effect intensity at t minutes after intake (relative, 0..amplitude) */
  sampleAt(tMin: number): number;
}

/**
 * Build an effect-curve model for a single intake.
 * For divertible substances, `dose` is null; we use the "common" tier as a neutral
 * shape reference so the kinetic curve can still be drawn without exposing a misuse dose.
 */
export function buildCurve(
  substanceName: string,
  route: string,
  dose: number | null,
  color: string,
): CurveModel | null {
  const s = getSubstanceByName(substanceName, 'en');
  if (!s || !s.roas) return null;
  const roa = s.roas.find((r) => r.name === route && r.duration) || s.roas.find((r) => r.duration) || s.roas[0];
  const dur = roa?.duration;
  if (!dur || !dur.onset || !dur.peak || !dur.offset) return null;

  const baseOnsetMin = ((dur.onset.min + dur.onset.max) / 2) * (multToMin[dur.onset.units] || 1);
  const baseComeupMin = dur.comeup
    ? ((dur.comeup.min + dur.comeup.max) / 2) * (multToMin[dur.comeup.units] || 1)
    : Math.max(15, baseOnsetMin * 0.7);
  const basePeakMin = ((dur.peak.min + dur.peak.max) / 2) * (multToMin[dur.peak.units] || 1);
  const baseOffsetMin = ((dur.offset.min + dur.offset.max) / 2) * (multToMin[dur.offset.units] || 1);

  const wRise = Math.max(10, baseComeupMin + basePeakMin * 0.42);
  const wFall = Math.max(15, baseOffsetMin + basePeakMin * 0.58);

  const d = roa?.dose || { units: 'mg' };
  const heavyRef =
    d.heavyMin ||
    (d.strongMin ? d.strongMin * 1.35 : 0) ||
    (d.commonMin ? d.commonMin * 2.0 : 0) ||
    (d.lightMin ? d.lightMin * 4.0 : 100);

  const powerFactor = getSubstancePowerFactor(s);
  // For divertible substances we hide the dose, so use the common tier as the shape.
  const effectiveDose = dose != null ? dose : d.commonMin || heavyRef * 0.4;
  const tierResp = computeTierResponse(effectiveDose, d, heavyRef);
  const amplitude = Math.max(0.06, tierResp * powerFactor);

  const tClimbEnd = baseOnsetMin + wRise;
  const tWaveEnd = tClimbEnd + wFall;

  function sampleAt(tMin: number): number {
    if (tMin <= baseOnsetMin) return 0;
    if (tMin <= tClimbEnd) {
      const tau = (tMin - baseOnsetMin) / wRise;
      return Math.sin((tau * Math.PI) / 2) ** 2 * amplitude;
    }
    if (tMin <= tWaveEnd) {
      const tau = (tMin - tClimbEnd) / wFall;
      return Math.cos((tau * Math.PI) / 2) ** 2 * amplitude;
    }
    return 0;
  }

  return {
    substanceName,
    color,
    onsetMin: baseOnsetMin,
    peakMin: tClimbEnd,
    endMin: tWaveEnd,
    amplitude,
    sampleAt,
  };
}
