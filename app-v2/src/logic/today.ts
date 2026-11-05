// Derived view-model for the Today screen: which intakes are still active,
// their status (taken / wait), and the next-dose-possible time.
import type { Ingestion, Lang } from './types';
import { getSubstanceByName, displayName } from './data';
import { buildCurve } from './effectCurve';
import { getNextDoseTime, isDivertible } from './dosing';
import { checkMix } from './interactions';

export interface IntakeStatus {
  ingestion: Ingestion;
  displayName: string; // localized substance name
  color: string;
  isActive: boolean; // effect still ongoing at `now`
  nextDoseAt: number | null; // ms when next intake allowed (null if unknown/divertible)
  waiting: boolean; // next dose not yet reached
}

export function localizedName(name: string, lang: Lang): string {
  return displayName(name, lang);
}

// A recurring treatment, materialized as a concrete intake for the current day.
export interface TreatmentLike {
  id: string;
  substanceName: string;
  route: string;
  dose: number | null;
  unit: string;
  hour: number;
  minute: number;
}

/**
 * Build the effective list of today's intakes: recurring daily treatments
 * (materialized at their time today) + the real logged ingestions.
 * Treatments get a stable virtual id so they can be rendered but not deleted
 * like one-off intakes.
 */
export function buildTodayIngestions(
  ingestions: Ingestion[],
  treatments: TreatmentLike[],
  now = Date.now(),
): Ingestion[] {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const dayStart = start.getTime();
  const dayEnd = dayStart + 24 * 3600_000;

  const virtual: Ingestion[] = treatments.map((t) => {
    const d = new Date(dayStart);
    d.setHours(t.hour, t.minute, 0, 0);
    return {
      id: `treatment:${t.id}`,
      substanceName: t.substanceName,
      route: t.route,
      dose: t.dose,
      unit: t.unit,
      time: d.getTime(),
    };
  });

  const todays = ingestions.filter((i) => i.time >= dayStart && i.time < dayEnd);
  return [...virtual, ...todays];
}

export function isTreatmentId(id: string): boolean {
  return id.startsWith('treatment:');
}

export function getIntakeStatuses(
  ingestions: Ingestion[],
  lang: Lang,
  now = Date.now(),
): IntakeStatus[] {
  return ingestions
    .slice()
    .sort((a, b) => a.time - b.time) // chronological: earliest first
    .map((ing) => {
      const s = getSubstanceByName(ing.substanceName, lang);
      const color = s?.color || '#1E2A5A';
      const curve = buildCurve(ing.substanceName, ing.route, ing.dose, color);
      const elapsedMin = (now - ing.time) / 60000;
      const isActive = curve ? elapsedMin >= 0 && elapsedMin <= curve.endMin : false;

      // Next-dose delay only applies to medicines (divertible substances have no shown schedule).
      const nextDoseAt = isDivertible(s) ? null : getNextDoseTime(ing.substanceName, ing.time, ing.route);
      const waiting = nextDoseAt != null && now < nextDoseAt;

      return {
        ingestion: ing,
        displayName: localizedName(ing.substanceName, lang),
        color,
        isActive,
        nextDoseAt,
        waiting,
      };
    });
}

export interface TodaySummary {
  activeCount: number;
  risk: null | { level: 'high' | 'caution'; a: string; b: string };
}

export function getTodaySummary(
  ingestions: Ingestion[],
  riskFactors: string[],
  lang: Lang,
  now = Date.now(),
): TodaySummary {
  const statuses = getIntakeStatuses(ingestions, lang, now);
  const activeNames = Array.from(
    new Set(statuses.filter((s) => s.isActive).map((s) => s.ingestion.substanceName)),
  );
  const activeCount = activeNames.length;

  // Check every active pair + each active vs risk factors; keep the worst.
  let worst: TodaySummary['risk'] = null;
  const rank = { high: 2, caution: 1 } as const;
  for (let i = 0; i < activeNames.length; i++) {
    const hit = checkMix(activeNames[i], activeNames.slice(i + 1), riskFactors);
    if (hit) {
      const level = hit.type === 'DANGEROUS' ? 'high' : 'caution';
      if (!worst || rank[level] > rank[worst.level]) {
        worst = { level, a: localizedName(activeNames[i], lang), b: localizedName(hit.with, lang) };
      }
    }
  }
  return { activeCount, risk: worst };
}
