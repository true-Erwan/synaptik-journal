// Dosing logic: divertibility, medical dose tiers, minimum delay between intakes, 24h caps.
// Ported from simulateur_synaptik.html (isNonDivertible, getDoseTierInfo, NON_DIVERTIBLE_DOSES)
// and extended with the curated MEDICAL_SCHEDULE (min delays + 24h caps from MODIFICATIONS.md §1).
import type { Lang, Substance, Ingestion } from './types';
import { NON_DIVERTIBLE_DOSES, MEDICAL_SCHEDULE, getSubstanceByName } from './data';
import { buildCurve, wavesForForm } from './effectCurve';

const multToMin: Record<string, number> = {
  seconds: 1 / 60,
  minutes: 1,
  hours: 60,
  days: 1440,
};

/**
 * A substance is "non-divertible" (an ordinary medicine for which we may show
 * prescription-style doses) if it is in NON_DIVERTIBLE_DOSES or belongs to a
 * therapeutic class with no misuse potential.
 */
export function isNonDivertible(s: Substance | undefined): boolean {
  if (!s) return false;
  if (NON_DIVERTIBLE_DOSES[s.name]) return true;
  const cats = (s.categories || []).map((c) => c.toLowerCase());
  if (
    cats.includes('nsaid') ||
    cats.includes('corticosteroid') ||
    cats.includes('beta-blocker') ||
    cats.includes('antispasmodic') ||
    cats.includes('triptan') ||
    cats.includes('analgesic')
  ) {
    return true;
  }
  return false;
}

/**
 * SAFETY RULE: a substance is "divertible" when it has misuse potential. For these
 * we NEVER show dose values in the UI — only kinetics, interactions and a referral.
 */
export function isDivertible(s: Substance | undefined): boolean {
  return !isNonDivertible(s);
}

export interface MedicalDoseOption {
  label: string; // localized tier label
  value: number;
  units: string;
}

/** Prescription-style dose options for a non-divertible medicine + route. */
export function getMedicalDoseOptions(
  substanceName: string,
  route: string,
  lang: Lang,
): MedicalDoseOption[] {
  const nd = NON_DIVERTIBLE_DOSES[substanceName];
  if (!nd) return [];
  const r = nd[route] || nd.oral || Object.values(nd)[0];
  if (!r) return [];
  const labels =
    lang === 'fr'
      ? { low: 'Dose faible', standard: 'Dose standard', max: 'Dose max / prise' }
      : { low: 'Low dose', standard: 'Standard dose', max: 'Max / intake' };
  const out: MedicalDoseOption[] = [];
  const seen = new Set<number>();
  ([['low', r.low], ['standard', r.standard], ['max', r.max]] as const).forEach(([k, v]) => {
    if (v != null && !seen.has(v)) {
      seen.add(v);
      out.push({ label: labels[k], value: v, units: r.units });
    }
  });
  return out;
}

export interface DoseTier {
  key: 'low' | 'standard' | 'max' | 'over';
  label: string;
  tone: 'ok' | 'info' | 'caution' | 'danger';
}

/**
 * Prescribed dose quick-pick chips for a medicine, sourced ONLY from the curated
 * MEDICAL_SCHEDULE (labelled "Dose prescrite"). Returns [] for substances without a
 * schedule entry (so recreational/misuse substances never show dose chips).
 */
export function getPrescribedDoses(substanceName: string): { value: number; units: string }[] {
  const sched = MEDICAL_SCHEDULE[substanceName];
  if (!sched || !sched.doses) return [];
  return sched.doses.map((v) => ({ value: v, units: sched.units }));
}

/** Classify a dose for a non-divertible medicine (medical vocabulary only). */
export function getMedicalDoseTier(
  substanceName: string,
  route: string,
  dose: number,
  lang: Lang,
): DoseTier | null {
  const nd = NON_DIVERTIBLE_DOSES[substanceName];
  if (!nd) return null;
  const r = nd[route] || nd.oral || Object.values(nd)[0];
  if (!r) return null;
  const L = (fr: string, en: string) => (lang === 'fr' ? fr : en);
  if (r.low && dose <= r.low * 1.05 && dose < r.standard * 0.8) {
    return { key: 'low', label: L('Dose faible', 'Low dose'), tone: 'ok' };
  }
  if (dose <= r.standard * 1.05 && (!r.max || r.max === r.standard || dose < r.max * 0.95)) {
    return { key: 'standard', label: L('Dose standard', 'Standard dose'), tone: 'info' };
  }
  if (r.max && dose <= r.max * 1.05) {
    return { key: 'max', label: L('Dose max / prise', 'Max dose/intake'), tone: 'caution' };
  }
  return { key: 'over', label: L('Dépassement max', 'Exceeds max'), tone: 'danger' };
}

function roaTotalMinutes(s: Substance, route: string): number | null {
  const roas = s.roas || [];
  const roa = roas.find((r) => r.name === route) || roas.find((r) => r.duration) || roas[0];
  const total = roa?.duration?.total;
  if (!total) return null;
  return ((total.min + total.max) / 2) * (multToMin[total.units] || 1);
}

/**
 * Minimum delay (hours) before the next intake is allowed.
 *
 * Priority:
 *  1. If a release form is selected, follow that form's effect-curve duration
 *     (so LP forms correctly space the next dose to 12h / 24h).
 *  2. Else use the curated MEDICAL_SCHEDULE (per-molecule min delay).
 *  3. Else fall back to roa.duration.total.
 */
export function getMinDelayHours(substanceName: string, route = 'oral', releaseProfileId?: string): number | null {
  if (releaseProfileId) {
    const waves = wavesForForm(substanceName, releaseProfileId);
    const model = buildCurve(substanceName, route, 1, '#000', waves);
    if (model) return Math.round((model.endMin / 60) * 10) / 10;
  }
  const sched = MEDICAL_SCHEDULE[substanceName];
  if (sched) return sched.minDelayHours;
  const s = getSubstanceByName(substanceName, 'en');
  if (!s) return null;
  const totalMin = roaTotalMinutes(s, route);
  return totalMin != null ? totalMin / 60 : null;
}

/** When the next intake becomes possible, given the last intake time (ms). */
export function getNextDoseTime(
  substanceName: string,
  lastIntakeMs: number,
  route = 'oral',
  releaseProfileId?: string,
): number | null {
  const h = getMinDelayHours(substanceName, route, releaseProfileId);
  if (h == null) return null;
  return lastIntakeMs + h * 3600_000;
}

export interface CapStatus {
  hasCap: boolean;
  total24h: number;
  cap: number | null;
  exceeded: boolean;
  units: string | null;
}

/** Sum intakes of a substance in the trailing 24h and compare to its cap. */
export function get24hCapStatus(
  substanceName: string,
  ingestions: Ingestion[],
  now = Date.now(),
): CapStatus {
  const sched = MEDICAL_SCHEDULE[substanceName];
  const windowStart = now - 24 * 3600_000;
  const total24h = ingestions
    .filter((i) => i.substanceName === substanceName && i.time >= windowStart && i.time <= now)
    .reduce((sum, i) => sum + (i.dose || 0), 0);
  if (!sched) {
    return { hasCap: false, total24h, cap: null, exceeded: false, units: null };
  }
  return {
    hasCap: true,
    total24h,
    cap: sched.maxPer24h,
    exceeded: total24h > sched.maxPer24h,
    units: sched.units,
  };
}
