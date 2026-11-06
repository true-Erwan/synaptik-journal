// Pre-ingestion checks: interaction mix, minimum delay, and 24h cap.
import type { Ingestion, Lang } from './types';
import { getIntakeStatuses, localizedName } from './today';
import { checkMix, type MixHit } from './interactions';
import { getMinDelayHours, get24hCapStatus } from './dosing';
import { getSubstanceByName } from './data';

export interface DelayWarning {
  kind: 'delay';
  substance: string;
  minDelayHours: number;
  nextPossibleMs: number;
}

export interface CapWarning {
  kind: 'cap';
  substance: string;
  projectedTotal: number;
  cap: number;
  units: string;
}

export interface PreCheckResult {
  mix: (MixHit & { a: string; b: string; reason: string }) | null;
  delay: DelayWarning | null;
  cap: CapWarning | null;
}

export function preCheck(
  newName: string,
  route: string,
  dose: number | null,
  ingestions: Ingestion[],
  riskFactors: string[],
  lang: Lang,
  now = Date.now(),
  releaseProfileId?: string,
): PreCheckResult {
  // 1. Interaction mix vs. active substances + background risk factors.
  const activeNames = Array.from(
    new Set(
      getIntakeStatuses(ingestions, lang, now)
        .filter((s) => s.isActive)
        .map((s) => s.ingestion.substanceName),
    ),
  );
  const hit = checkMix(newName, activeNames, riskFactors);
  const mix = hit
    ? {
        ...hit,
        a: localizedName(newName, lang),
        b: localizedName(hit.with, lang),
        reason: buildReason(newName, hit.with, hit.type, lang),
      }
    : null;

  // 2. Minimum delay since the last dose of the SAME substance.
  let delay: DelayWarning | null = null;
  const minH = getMinDelayHours(newName, route, releaseProfileId);
  if (minH != null) {
    const last = ingestions
      .filter((i) => i.substanceName === newName)
      .sort((a, b) => b.time - a.time)[0];
    if (last) {
      const nextPossibleMs = last.time + minH * 3600_000;
      if (now < nextPossibleMs) {
        delay = { kind: 'delay', substance: localizedName(newName, lang), minDelayHours: minH, nextPossibleMs };
      }
    }
  }

  // 3. 24h cap.
  let cap: CapWarning | null = null;
  if (dose != null) {
    const status = get24hCapStatus(newName, ingestions, now);
    if (status.hasCap && status.cap != null) {
      const projected = status.total24h + dose;
      if (projected > status.cap) {
        cap = {
          kind: 'cap',
          substance: localizedName(newName, lang),
          projectedTotal: projected,
          cap: status.cap,
          units: status.units || 'mg',
        };
      }
    }
  }

  return { mix, delay, cap };
}

// Build a short, plain-language reason for a mix, inferred from the data/category.
export function buildReason(aName: string, bName: string, level: string, lang: Lang): string {
  const a = getSubstanceByName(aName, 'en');
  const b = getSubstanceByName(bName, 'en');
  const cats = new Set([...(a?.categories || []), ...(b?.categories || [])].map((c) => c.toLowerCase()));
  const names = `${localizedName(aName, lang)} + ${localizedName(bName, lang)}`;
  const fr = lang === 'fr';

  const serotonergic = ['antidepressant', 'ssri', 'snri', 'maoi'];
  const isSero = (s?: typeof a) =>
    (s?.categories || []).some((c) => serotonergic.includes(c.toLowerCase())) ||
    ['Tramadol', 'Nefopam', 'Sumatriptan', 'MDMA'].includes(s?.name || '');

  if (isSero(a) && isSero(b)) {
    return fr
      ? `Ces deux substances augmentent la sérotonine. Ensemble, elles peuvent provoquer un syndrome sérotoninergique, qui peut être grave.`
      : `Both substances raise serotonin. Together they can cause serotonin syndrome, which can be serious.`;
  }
  if (cats.has('nsaid') && (bName === 'Lithium' || aName === 'Lithium')) {
    return fr
      ? `Un anti-inflammatoire associé au lithium peut faire monter dangereusement le taux de lithium dans le sang.`
      : `An anti-inflammatory with lithium can dangerously raise blood lithium levels.`;
  }
  const depressants = ['opioid', 'benzodiazepine', 'depressant', 'barbiturate'];
  const isDep = (s?: typeof a) => (s?.categories || []).some((c) => depressants.includes(c.toLowerCase()));
  if ((isDep(a) && isDep(b)) || cats.has('opioid') || cats.has('benzodiazepine')) {
    return fr
      ? `Associées, ces substances ralentissent la respiration et la vigilance. Le risque de dépression respiratoire augmente.`
      : `Combined, these substances slow breathing and alertness. The risk of respiratory depression rises.`;
  }
  // Generic fallback by level.
  if (level === 'DANGEROUS') {
    return fr
      ? `L'association ${names} présente un risque clinique majeur. Mieux vaut l'éviter.`
      : `The ${names} combination carries a major clinical risk. It is best avoided.`;
  }
  return fr
    ? `L'association ${names} demande de la prudence. Surveillez les effets et demandez conseil.`
    : `The ${names} combination calls for caution. Watch for effects and seek advice.`;
}
