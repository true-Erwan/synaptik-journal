// Strict search: matches ONLY the substance name and its commonNames (brands/synonyms),
// diacritic/case/space/hyphen insensitive. Mirrors the old simulator's strict filter.
import type { Lang, Substance } from './types';
import { getSubstances, normalize, displayName } from './data';

export interface SearchHit {
  substance: Substance;
  displayName: string;
  brands: string;
}

export function searchSubstances(query: string, lang: Lang, limit = 20): SearchHit[] {
  const q = normalize(query);
  const list = getSubstances(lang);
  if (!q) return [];
  const hits: { hit: SearchHit; score: number }[] = [];
  for (const s of list) {
    const name = normalize(s.name);
    const commons = (s.commonNames || []).map(normalize);
    let score = -1;
    if (name === q) score = 100;
    else if (name.startsWith(q)) score = 80;
    else if (commons.some((c) => c === q)) score = 70;
    else if (commons.some((c) => c.startsWith(q))) score = 60;
    else if (name.includes(q)) score = 40;
    else if (commons.some((c) => c.includes(q))) score = 30;
    if (score >= 0) {
      const disp = displayName(s.name, lang);
      const brands = (s.commonNames || [])
        .filter((c) => normalize(c) !== normalize(s.name) && normalize(c) !== normalize(disp))
        .slice(0, 3)
        .join(', ');
      hits.push({ hit: { substance: s, displayName: disp, brands }, score });
    }
  }
  hits.sort((a, b) => b.score - a.score || a.hit.displayName.localeCompare(b.hit.displayName));
  return hits.slice(0, limit).map((h) => h.hit);
}
