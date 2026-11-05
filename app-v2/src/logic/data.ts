// Data access layer. Loads the extracted JSON and exposes lookups by language.
import type { Substance, Category, Lang, NonDivertibleRoute, MedicalScheduleEntry } from './types';

import substancesFr from '../data/substances.fr.json';
import substancesEn from '../data/substances.en.json';
import categoriesFr from '../data/categories.fr.json';
import categoriesEn from '../data/categories.en.json';
import nonDivertibleDosesRaw from '../data/nonDivertibleDoses.json';
import medicalScheduleRaw from '../data/medicalSchedule.json';

const SUBSTANCES: Record<Lang, Substance[]> = {
  fr: substancesFr as unknown as Substance[],
  en: substancesEn as unknown as Substance[],
};

const CATEGORIES: Record<Lang, Category[]> = {
  fr: categoriesFr as unknown as Category[],
  en: categoriesEn as unknown as Category[],
};

export const NON_DIVERTIBLE_DOSES = nonDivertibleDosesRaw as unknown as Record<
  string,
  Record<string, NonDivertibleRoute>
>;

export const MEDICAL_SCHEDULE: Record<string, MedicalScheduleEntry> = (() => {
  const { _note, ...rest } = medicalScheduleRaw as Record<string, unknown>;
  void _note;
  return rest as unknown as Record<string, MedicalScheduleEntry>;
})();

// Substances are keyed by the SAME canonical English `name` in both languages,
// so FR and EN arrays are index-aligned by name. We index EN by name to allow
// cross-language lookup, and keep per-language maps for display.
const byNameEn = new Map<string, Substance>();
SUBSTANCES.en.forEach((s) => byNameEn.set(s.name, s));

const byNameByLang: Record<Lang, Map<string, Substance>> = {
  fr: new Map(SUBSTANCES.fr.map((s) => [s.name, s])),
  en: new Map(SUBSTANCES.en.map((s) => [s.name, s])),
};

export function getSubstances(lang: Lang): Substance[] {
  return SUBSTANCES[lang];
}

export function getCategories(lang: Lang): Category[] {
  return CATEGORIES[lang];
}

export function getSubstanceByName(name: string, lang: Lang): Substance | undefined {
  return byNameByLang[lang].get(name);
}

export function getCategory(key: string, lang: Lang): Category | undefined {
  return CATEGORIES[lang].find((c) => c.name === key);
}

// Diacritic-insensitive, case/space/hyphen-insensitive normalisation for search.
export function normalize(str: string): string {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s-]/g, '');
}
