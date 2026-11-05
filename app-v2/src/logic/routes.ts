// Route-of-administration labels and helpers.
import type { Lang, Substance } from './types';

export const ROA_COLORS: Record<string, string> = {
  oral: '#3b82f6',
  sublingual: '#06b6d4',
  buccal: '#0ea5e9',
  insufflated: '#8b5cf6',
  rectal: '#ec4899',
  transdermal: '#10b981',
  subcutaneous: '#14b8a6',
  intramuscular: '#f59e0b',
  intravenous: '#ef4444',
  smoked: '#f97316',
  inhaled: '#fb923c',
  vaporized: '#f97316',
};

const ROA_LABELS: Record<Lang, Record<string, string>> = {
  fr: {
    oral: 'Par la bouche',
    sublingual: 'Sous la langue',
    buccal: 'Buccale',
    insufflated: 'Nez',
    rectal: 'Rectale',
    transdermal: 'Patch',
    subcutaneous: 'Sous-cutanée',
    intramuscular: 'Intramusculaire',
    intravenous: 'Intraveineuse',
    smoked: 'Fumée',
    inhaled: 'Inhalée',
    vaporized: 'Vaporisée',
  },
  en: {
    oral: 'By mouth',
    sublingual: 'Sublingual',
    buccal: 'Buccal',
    insufflated: 'Nose',
    rectal: 'Rectal',
    transdermal: 'Patch',
    subcutaneous: 'Subcutaneous',
    intramuscular: 'Intramuscular',
    intravenous: 'Intravenous',
    smoked: 'Smoked',
    inhaled: 'Inhaled',
    vaporized: 'Vaporized',
  },
};

export function roaLabel(route: string, lang: Lang): string {
  return ROA_LABELS[lang][route] || route;
}

export function availableRoutes(s: Substance | undefined): string[] {
  if (!s || !s.roas) return ['oral'];
  const seen: string[] = [];
  for (const r of s.roas) if (r.name && !seen.includes(r.name)) seen.push(r.name);
  return seen.length ? seen : ['oral'];
}
