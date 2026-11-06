import type { Lang } from './logic/types';

type Dict = Record<string, string>;

const FR_CHECKS = (n: number): string =>
  n === 0
    ? 'Aucune autre substance active à comparer.'
    : `Synaptik vérifie le mélange avec ${n} substance${n > 1 ? 's' : ''} active${n > 1 ? 's' : ''}.`;

const EN_CHECKS = (n: number): string =>
  n === 0
    ? 'No other active substance to compare.'
    : `Synaptik checks the mix with ${n} active substance${n > 1 ? 's' : ''}.`;

const FR: Dict = {
  greeting: 'Bonjour',
  noRiskMix: 'Aucun mélange à risque',
  activeSubstances: 'substance active en ce moment',
  activeSubstancesPlural: 'substances actives en ce moment',
  myIntakes: 'Mes prises du jour',
  addIntake: 'Ajouter une prise',
  taken: 'Pris',
  wait: 'Attendre',
  possibleFrom: 'Possible à partir de',
  tabToday: "Aujourd'hui",
  tabJournal: 'Journal',
  tabSubstances: 'Substances',
  tabProfile: 'Profil',
  cancel: 'Annuler',
  newIntake: 'Nouvelle prise',
  qWhat: 'QUOI ?',
  qHow: 'COMMENT ?',
  qHowMuch: 'COMBIEN ?',
  qWhen: 'QUAND ?',
  searchPlaceholder: 'Rechercher une molécule ou une marque',
  perPrescription: 'Selon votre ordonnance.',
  askProfessional: 'Parlez-en à un professionnel de santé.',
  formRelease: 'FORME & LIBÉRATION',
  formLI: 'Forme LI (Immédiate)',
  formLP: 'Forme LP (Prolongée)',
  lpMatrix: 'Matrice LP & Marque commerciale',
  prescribedDose: 'Dose prescrite',
  earlier: 'Plus tôt',
  now: 'Maintenant',
  later: 'Plus tard',
  checkMix: 'Vérifier le mélange',
  back: 'Retour',
  riskHigh: 'RISQUE ÉLEVÉ',
  riskCaution: 'PRUDENCE',
  whatYouCanDo: 'Ce que vous pouvez faire',
  emergency15: 'En cas de signes graves (agitation, fièvre, tremblements, sueurs), appelez le 15.',
  askPharmacist: 'Demandez conseil à votre pharmacien ou médecin avant de prendre.',
  dontTake: 'Ne pas prendre',
  learnMore: 'En savoir plus sur ce mélange',
  effectOverTime: 'Effet dans le temps',
  pinchToZoom: 'Pincer pour zoomer',
  nowLine: 'maintenant',
  nextDosePossible: 'Prochaine prise possible',
  history: 'Historique',
  peakAround: 'Effet maximal vers',
  endAround: 'fin vers',
  goodToKnow: 'BON À SAVOIR',
  mixesToWatch: 'Mélanges à surveiller',
  comparativeProfile: 'Profil comparatif',
  comparativeSub: 'Délai, durée et puissance vs une référence',
  levelHigh: 'Élevé',
  levelCaution: 'Prudence',
  byMouth: 'Par la bouche',
  other: 'Autre',
  profile: 'Profil',
  medicalDisclaimer: 'Synaptik ne remplace pas un avis médical.',
  about: 'À propos',
  aboutText:
    "Synaptik est dérivé de PsychonautWiki Journal (licence GPL-3.0). Les données proviennent de PsychonautWiki. Merci au projet original.",
  riskFactors: 'Traitements de fond & facteurs de risque',
  language: 'Langue',
  noIntakesYet: "Aucune prise enregistrée aujourd'hui.",
  minDelay: 'Délai minimum',
  cap24h: 'Plafond sur 24 h',
  hours: 'h',
  emptyChart: 'Ajoutez une prise pour voir la courbe.',
  searchSubstances: 'Rechercher une substance',
};

const EN: Dict = {
  greeting: 'Hello',
  noRiskMix: 'No risky mix',
  activeSubstances: 'active substance right now',
  activeSubstancesPlural: 'active substances right now',
  myIntakes: "Today's intakes",
  addIntake: 'Add an intake',
  taken: 'Taken',
  wait: 'Wait',
  possibleFrom: 'Possible from',
  tabToday: 'Today',
  tabJournal: 'Journal',
  tabSubstances: 'Substances',
  tabProfile: 'Profile',
  cancel: 'Cancel',
  newIntake: 'New intake',
  qWhat: 'WHAT?',
  qHow: 'HOW?',
  qHowMuch: 'HOW MUCH?',
  qWhen: 'WHEN?',
  searchPlaceholder: 'Search a molecule or a brand',
  perPrescription: 'As prescribed.',
  askProfessional: 'Talk to a healthcare professional.',
  formRelease: 'FORM & RELEASE',
  formLI: 'IR form (Immediate)',
  formLP: 'ER form (Extended)',
  lpMatrix: 'ER matrix & brand',
  prescribedDose: 'Prescribed dose',
  earlier: 'Earlier',
  now: 'Now',
  later: 'Later',
  checkMix: 'Check the mix',
  back: 'Back',
  riskHigh: 'HIGH RISK',
  riskCaution: 'CAUTION',
  whatYouCanDo: 'What you can do',
  emergency15: 'If serious signs appear (agitation, fever, tremor, sweating), call emergency services (15 / 112).',
  askPharmacist: 'Ask your pharmacist or doctor for advice before taking.',
  dontTake: "Don't take",
  learnMore: 'Learn more about this mix',
  effectOverTime: 'Effect over time',
  pinchToZoom: 'Pinch to zoom',
  nowLine: 'now',
  nextDosePossible: 'Next dose possible',
  history: 'History',
  peakAround: 'Peak around',
  endAround: 'ends around',
  goodToKnow: 'GOOD TO KNOW',
  mixesToWatch: 'Mixes to watch',
  comparativeProfile: 'Comparative profile',
  comparativeSub: 'Delay, duration and potency vs a reference',
  levelHigh: 'High',
  levelCaution: 'Caution',
  byMouth: 'By mouth',
  other: 'Other',
  profile: 'Profile',
  medicalDisclaimer: 'Synaptik is not a substitute for medical advice.',
  about: 'About',
  aboutText:
    'Synaptik is derived from PsychonautWiki Journal (GPL-3.0 licence). Data comes from PsychonautWiki. Thanks to the original project.',
  riskFactors: 'Ongoing therapies & risk factors',
  language: 'Language',
  noIntakesYet: 'No intake logged today.',
  minDelay: 'Minimum delay',
  cap24h: '24h cap',
  hours: 'h',
  emptyChart: 'Add an intake to see the curve.',
  searchSubstances: 'Search a substance',
};

const DICTS: Record<Lang, Dict> = { fr: FR, en: EN };
const CHECKS: Record<Lang, (n: number) => string> = { fr: FR_CHECKS, en: EN_CHECKS };

export function makeT(lang: Lang) {
  const d = DICTS[lang];
  const t = (key: string): string => d[key] ?? key;
  return Object.assign(t, { checksWith: CHECKS[lang] });
}

export type T = ReturnType<typeof makeT>;
