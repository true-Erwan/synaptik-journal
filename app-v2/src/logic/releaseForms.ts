// Release form / extended-release (LP) profiles, extracted from the old simulator's
// RELEASE_PROFILES_CATALOG. Each form carries localized labels, a description, and a
// set of "waves" that shape the effect curve (LI = single quick wave; LP = biphasic
// or plateau waves up to the stated duration).
import type { Lang } from './types';
import catalog from '../data/releaseProfiles.json';

export interface Wave {
  delayMin: number;
  weight: number;
  onsetScale?: number;
  riseScale?: number;
  plateauMin?: number;
  fallScale?: number;
  stretch?: number;
  extraPeakMin?: number;
}

export interface ReleaseForm {
  id: string;
  shortFr: string;
  shortEn: string;
  badgeFr: string;
  badgeEn: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  isExtended: boolean;
  waves: Wave[];
}

interface Catalog {
  defaultImmediate: ReleaseForm;
  specific: Record<string, ReleaseForm[]>;
}

const CATALOG = catalog as unknown as Catalog;

/** All release forms for a substance (IR first, then LP matrices). Empty if only one form. */
export function getReleaseForms(substanceName: string): ReleaseForm[] {
  const forms = CATALOG.specific[substanceName];
  return forms && forms.length > 1 ? forms : [];
}

/** True when the substance offers a choice of forms (LI vs LP). */
export function hasMultipleForms(substanceName: string): boolean {
  return getReleaseForms(substanceName).length > 1;
}

export function getDefaultImmediate(): ReleaseForm {
  return CATALOG.defaultImmediate;
}

/** The immediate-release form for a substance (or the generic default). */
export function getImmediateForm(substanceName: string): ReleaseForm {
  const forms = getReleaseForms(substanceName);
  return forms.find((f) => !f.isExtended) || forms[0] || CATALOG.defaultImmediate;
}

/** The extended-release forms for a substance. */
export function getExtendedForms(substanceName: string): ReleaseForm[] {
  return getReleaseForms(substanceName).filter((f) => f.isExtended);
}

export function formShort(f: ReleaseForm, lang: Lang): string {
  return lang === 'fr' ? f.shortFr : f.shortEn;
}
export function formBadge(f: ReleaseForm, lang: Lang): string {
  return lang === 'fr' ? f.badgeFr : f.badgeEn;
}
export function formTitle(f: ReleaseForm, lang: Lang): string {
  return lang === 'fr' ? f.titleFr : f.titleEn;
}
export function formDesc(f: ReleaseForm, lang: Lang): string {
  return lang === 'fr' ? f.descFr : f.descEn;
}
