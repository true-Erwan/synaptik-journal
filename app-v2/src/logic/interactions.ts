// Interaction engine — ported verbatim from simulateur_synaptik.html (checkInteraction, line ~4320).
// Pure, DOM-free, typed. Severity ranks DANGEROUS > UNSAFE > UNCERTAIN.
import type { Substance, InteractionResult, InteractionLevel } from './types';
import { getSubstanceByName } from './data';

// Group tokens that stand in for a whole class in the interaction lists.
const implicitCats: Record<string, string[]> = {
  Benzodiazepines: ['benzodiazepine', 'depressant'],
  Opioids: ['opioid', 'depressant'],
  SSRIs: ['ssri', 'antidepressant'],
  SNRIs: ['snri', 'antidepressant'],
  MAOI: ['maoi', 'antidepressant'],
  'Tricyclic antidepressants': ['tca', 'antidepressant'],
  Antihistamine: ['antihistamine'],
  NSAIDs: ['nsaid', 'analgesic'],
};

function matchesCat(inter: string, cat: string): boolean {
  const il = inter.toLowerCase();
  const cl = cat.toLowerCase();
  // Guard: "depressant" must not swallow "antidepressant".
  if (cl === 'depressant' && il.includes('antidepressant')) return false;
  if (cl === 'antidepressant') return il === 'antidepressant' || il === 'antidepressants';
  if (cl === 'tca') return il === 'tca' || il === 'tcas' || il.includes('tricyclic antidepressant');
  if (cl === 'ssri') return il === 'ssri' || il === 'ssris';
  if (cl === 'snri') return il === 'snri' || il === 'snris';
  if (cl === 'maoi') return il === 'maoi' || il === 'maois';
  if (cl === 'nsaid') return il === 'nsaid' || il === 'nsaids';
  if (cl === 'triptan') return il === 'triptan' || il === 'triptans';
  if (cl === 'mood-stabilizer') return il.includes('mood-stabilizer') || il.includes('mood stabilizer');
  return il.includes(cl);
}

function testSingle(
  a: Substance | undefined,
  bNameStr: string,
  bSub: Substance | undefined,
): InteractionLevel | null {
  if (!a || !a.interactions) return null;
  const dang = a.interactions.dangerous || [];
  const unsf = a.interactions.unsafe || [];
  const unct = a.interactions.uncertain || [];

  if (dang.includes(bNameStr)) return 'DANGEROUS';
  if (unsf.includes(bNameStr)) return 'UNSAFE';
  if (unct.includes(bNameStr)) return 'UNCERTAIN';

  const cats = (bSub && bSub.categories) || implicitCats[bNameStr] || [];
  for (const cat of cats) {
    for (const inter of dang) if (matchesCat(inter, cat)) return 'DANGEROUS';
    for (const inter of unsf) if (matchesCat(inter, cat)) return 'UNSAFE';
    for (const inter of unct) if (matchesCat(inter, cat)) return 'UNCERTAIN';
  }
  return null;
}

const dangerWeight: Record<InteractionLevel, number> = {
  DANGEROUS: 3,
  UNSAFE: 2,
  UNCERTAIN: 1,
};

/**
 * Check the interaction between two names. Names are the canonical English keys
 * (or a group token such as "NSAIDs", "Opioids"). Interaction data is identical
 * across languages, so we always resolve against the EN dataset.
 */
export function checkInteraction(aName: string, bName: string): InteractionResult | null {
  if (aName === bName) return null;
  const subA = getSubstanceByName(aName, 'en');
  const subB = getSubstanceByName(bName, 'en');

  const ab = testSingle(subA, bName, subB);
  const ba = testSingle(subB, aName, subA);

  let finalType: InteractionLevel | null;
  if (ab && ba) finalType = dangerWeight[ab] >= dangerWeight[ba] ? ab : ba;
  else finalType = ab || ba;

  return finalType ? { type: finalType } : null;
}

export interface MixHit {
  with: string; // the other substance / factor name
  type: InteractionLevel;
}

/**
 * Check one new substance against a list of active substances + background risk factors.
 * Returns the worst hit found, or null if nothing is flagged.
 */
export function checkMix(
  newName: string,
  activeNames: string[],
  riskFactors: string[] = [],
): MixHit | null {
  let worst: MixHit | null = null;
  const consider = (otherName: string) => {
    const res = checkInteraction(newName, otherName);
    if (!res) return;
    if (!worst || dangerWeight[res.type] > dangerWeight[worst.type]) {
      worst = { with: otherName, type: res.type };
    }
  };
  activeNames.forEach(consider);
  riskFactors.forEach(consider);
  return worst;
}

/** Map internal severity to the 2-level UI pill used in the maquettes. */
export function uiLevel(type: InteractionLevel): 'high' | 'caution' {
  return type === 'DANGEROUS' ? 'high' : 'caution';
}
