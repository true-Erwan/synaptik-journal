const I18N = {
  fr: {
    appSubtitle: (n) => `v1.0.0 — ${n} molécule${n > 1 ? 's' : ''}`,
    timelineTitle: "Courbes d'effet en temps réel",
    activeIngestions: (n) => `${n} prise${n > 1 ? 's' : ''} active${n > 1 ? 's' : ''}`,
    emptyHistory: 'Aucune prise enregistrée',
    emptyHistorySub: 'Ajoutez une molécule ci-dessous pour voir sa courbe',
    timelinePast: 'Passé (-4h)',
    timelineNow: 'Maintenant (T=0)',
    timelineFuture: 'Futur (+12h)',
    quickLogTitle: 'Enregistrer une prise rapide',
    quickLogSub: 'Teste les calculs et interactions',
    btnAddIngestion: 'Ajouter cette prise au journal',
    historyTitle: 'Prises de la journée',
    clearAll: 'Effacer tout',
    emptyHistoryCard: "Aucune prise dans l'historique",
    justNow: "À l'instant",
    ago: (m) => `Il y a ${m} min`,
    searchPlaceholder: 'Rechercher molécule ou marque (Doliprane, Advil, Seroplex...)',
    allCategory: (n) => `Toutes (${n})`,
    substancesCount: (n) => `${n} molécule${n > 1 ? 's' : ''} répertoriée${n > 1 ? 's' : ''}`,
    clickToView: 'Cliquez pour voir la fiche',
    statsPageTitle: 'Statistiques',
    statsPageSub: 'Analyse globale de vos prises et tendances par molécule',
    statsPeriod7d: '7 derniers jours',
    statsPeriodAll: 'Tout l’historique',
    statsTolerancesTitle: 'Tolérance des substances consommées',
    statsTolerancesSub: 'Niveau théorique actuel & retour < 5 %',
    journalListTitle: 'Journal',
    btnAddShort: 'Prise',
    journalToleranceTitle: 'Tolérance & exposition récente',
    journalInteractionsTitle: 'Interactions',
    settingsLangTitle: "Langue de l'application / Language",
    settingsBgTitle: 'Traitements de fond',
    settingsBgDesc: 'Ajoutez vos traitements quotidiens (médicament, forme LI/LP, dosage, heures de prise et durée) :',
    bgSearchPlaceholder: 'Rechercher un médicament de fond (ex: Lithium, Seroplex, Doliprane...)',
    aboutTitle: 'À propos de Synaptik Journal',
    aboutDesc: 'Version enrichie pour les traitements psychoactifs et les médicaments à intervalles stricts. Basée sur le projet open-source PsychonautWiki Journal v1.0.0.',
    aboutLocal: (n) => `Base locale : <strong class="text-slate-300">${n} molécule${n > 1 ? 's' : ''}</strong>`,
    aboutOffline: '100% hors-ligne',
    modalDescTitle: 'Description & Usage',
    modalRoaSelectorTitle: "Mode d'administration",
    modalTiersTitle: 'Paliers de doses',
    modalDurationTitle: "Durée d'action clinique",
    modalCurveSubtitle: 'Cinétiques par voie (ROA)',
    modalInterTitle: 'Interactions clés',
    modalBtnLog: 'Ajouter au Journal',
    modalBtnClose: 'Fermer',
    navStats: 'Stats',
    navJournal: 'Journal',
    navSubstances: 'Molécules',
    navSettings: 'Réglages',
    onset: 'Début (Onset)',
    comeup: 'Montée (Comeup)',
    peak: 'Plateau / Pic (Peak)',
    offset: 'Descente (Offset)',
    alertDangerous: 'INTERACTION DANGEREUSE (Contre-indication)',
    alertUnsafe: 'NON SÉCURISÉ (Prudence renforcée)',
    alertSafe: 'Aucune interaction majeure répertoriée',
    settingsOptions: [
      { key: 'Alcohol', label: 'Alcool (consommation fréquente / co-ingestion)' },
      { key: 'Lithium', label: 'Traitement de fond par Lithium' },
      { key: 'NSAIDs', label: 'Anti-inflammatoires (AINS)' },
      { key: 'SSRIs', label: 'Antidépresseurs ISRS (Seroplex, Zoloft...)' },
      { key: 'SNRIs', label: 'Antidépresseurs IRSNa (Effexor, Cymbalta)' },
      { key: 'Benzodiazepines', label: 'Benzodiazépines (Xanax, Valium...)' },
      { key: 'Opioids', label: 'Opioïdes & opiacés' },
      { key: 'Hormonal birth control', label: 'Contraception hormonale' },
      { key: 'Baclofen', label: 'Traitement par Baclofène (Liorésal, Baclocur)' },
      { key: 'Grapefruit', label: 'Jus de pamplemousse (inhibiteur enzymatique)' }
    ]
  },

  en: {
    appSubtitle: (n) => `v1.0.0 — ${n} substance${n > 1 ? 's' : ''}`,
    timelineTitle: 'Real-time effect curves',
    activeIngestions: (n) => `${n} active ingestion${n > 1 ? 's' : ''}`,
    emptyHistory: 'No ingestions recorded',
    emptyHistorySub: 'Add a substance below to see its effect curve',
    timelinePast: 'Past (-4h)',
    timelineNow: 'Now (T=0)',
    timelineFuture: 'Future (+12h)',
    quickLogTitle: 'Quick log ingestion',
    quickLogSub: 'Tests calculations and interaction warnings',
    btnAddIngestion: 'Add ingestion to journal',
    historyTitle: "Today's ingestions",
    clearAll: 'Clear all',
    emptyHistoryCard: 'No ingestions in history',
    justNow: 'Just now',
    ago: (m) => `${m} min ago`,
    searchPlaceholder: 'Search substance or brand (Doliprane, Advil, Seroplex...)',
    allCategory: (n) => `All (${n})`,
    substancesCount: (n) => `${n} substance${n > 1 ? 's' : ''} indexed`,
    clickToView: 'Click to view details',
    statsPageTitle: 'Statistics',
    statsPageSub: 'Overall intake analytics and molecule trends',
    statsPeriod7d: 'Last 7 days',
    statsPeriodAll: 'All history',
    statsTolerancesTitle: 'Tolerance of consumed substances',
    statsTolerancesSub: 'Current theoretical level & time < 5%',
    journalListTitle: 'Journal',
    btnAddShort: 'Ingestion',
    journalToleranceTitle: 'Tolerance & recent exposure',
    journalInteractionsTitle: 'Interactions',
    settingsLangTitle: 'Application Language',
    settingsBgTitle: 'Background Treatments',
    settingsBgDesc: 'Add your daily medications (molecule, IR/ER form, dose, intake times & period):',
    bgSearchPlaceholder: 'Search a background medication (e.g. Lithium, Escitalopram, Ibuprofen...)',
    aboutTitle: 'About Synaptik Journal',
    aboutDesc: 'Expanded version for psychoactive medications and strict-interval therapies. Based on PsychonautWiki Journal v1.0.0.',
    aboutLocal: (n) => `Local database: <strong class="text-slate-300">${n} substance${n > 1 ? 's' : ''}</strong>`,
    aboutOffline: '100% offline',
    modalDescTitle: 'Description & Usage',
    modalRoaSelectorTitle: 'Route of Administration',
    modalTiersTitle: 'Dosage Tiers',
    modalDurationTitle: 'Clinical Duration',
    modalCurveSubtitle: 'Theoretical effect curve',
    modalInterTitle: 'Key Interactions',
    modalBtnLog: 'Add to Journal',
    modalBtnClose: 'Close',
    navStats: 'Stats',
    navJournal: 'Journal',
    navSubstances: 'Substances',
    navSettings: 'Settings',
    onset: 'Onset',
    comeup: 'Comeup',
    peak: 'Peak',
    offset: 'Offset',
    alertDangerous: 'DANGEROUS INTERACTION (Contraindicated)',
    alertUnsafe: 'UNSAFE INTERACTION (High caution)',
    alertSafe: 'No major dangerous interaction reported',
    settingsOptions: [
      { key: 'Alcohol', label: 'Alcohol (frequent intake / co-use)' },
      { key: 'Lithium', label: 'Lithium ongoing therapy' },
      { key: 'NSAIDs', label: 'Anti-inflammatory drugs (NSAIDs)' },
      { key: 'SSRIs', label: 'SSRI Antidepressants (Seroplex, Zoloft...)' },
      { key: 'SNRIs', label: 'SNRI Antidepressants (Effexor, Cymbalta)' },
      { key: 'Benzodiazepines', label: 'Benzodiazepines (Xanax, Valium...)' },
      { key: 'Opioids', label: 'Opioids & opiates' },
      { key: 'Hormonal birth control', label: 'Hormonal birth control' },
      { key: 'Baclofen', label: 'Baclofen ongoing treatment (Lioresal, Baclocur)' },
      { key: 'Grapefruit', label: 'Grapefruit juice (CYP3A4 inhibitor)' }
    ]
  }
};

const CATEGORY_CONFIG = [
  { key: 'opioid',          fr: 'Opioïdes',                  en: 'Opioids' },
  { key: 'benzodiazepine',  fr: 'Benzodiazépines',           en: 'Benzodiazepines' },
  { key: 'antidepressant',  fr: 'Antidépresseurs',           en: 'Antidepressants' },
  { key: 'gabapentinoid',   fr: 'Gabapentinoïdes',           en: 'Gabapentinoids' },
  { key: 'nsaid',           fr: 'AINS',                      en: 'NSAIDs' },
  { key: 'corticosteroid',  fr: 'Corticoïdes (AIS)',         en: 'Corticosteroids (SAIDs)' },
  { key: 'analgesic',       fr: 'Antalgiques (non-opioïdes)',en: 'Non-opioid Analgesics' },
  { key: 'stimulant',       fr: 'Stimulants',                en: 'Stimulants' },
  { key: 'psychedelic',     fr: 'Psychédéliques',            en: 'Psychedelics' },
  { key: 'dissociative',    fr: 'Dissociatifs',              en: 'Dissociatives' },
  { key: 'entactogen',      fr: 'Entactogènes',              en: 'Entactogens' },
  { key: 'cannabinoid',     fr: 'Cannabinoïdes',             en: 'Cannabinoids' },
  { key: 'depressant',      fr: 'Sédatifs & GABA',           en: 'Sedatives & GABA' },
  { key: 'triptan',         fr: 'Triptans',                  en: 'Triptans' },
  { key: 'mood-stabilizer', fr: 'Thymorégulateurs',          en: 'Mood Stabilizers' },
  { key: 'antipsychotic',   fr: 'Antipsychotiques',          en: 'Antipsychotics' },
  { key: 'anxiolytic',      fr: 'Anxiolytiques (non-benzo)', en: 'Non-benzo Anxiolytics' },
  { key: 'nootropic',       fr: 'Nootropiques',              en: 'Nootropics' },
  { key: 'deliriant',       fr: 'Délirigènes',               en: 'Deliriants' }
];

const ROA_NORM_CONFIG = {
  oral:          { color: '#3B82F6', fr: 'Orale',                 en: 'Oral',                shortFr: 'Orale',      shortEn: 'Oral' },
  sublingual:    { color: '#06B6D4', fr: 'Sublinguale',           en: 'Sublingual',          shortFr: 'Subling.',   shortEn: 'Subling.' },
  buccal:        { color: '#34D399', fr: 'Buccale',               en: 'Buccal',              shortFr: 'Buccale',    shortEn: 'Buccal' },
  insufflated:   { color: '#A855F7', fr: 'Nasale (Insufflée)',    en: 'Insufflated (Nasal)', shortFr: 'Nasale',     shortEn: 'Nasal' },
  rectal:        { color: '#F97316', fr: 'Rectale',               en: 'Rectal',              shortFr: 'Rectale',    shortEn: 'Rectal' },
  intravenous:   { color: '#EF4444', fr: 'Intraveineuse (IV)',    en: 'Intravenous (IV)',    shortFr: 'IV',         shortEn: 'IV' },
  intramuscular: { color: '#EC4899', fr: 'Intramusculaire (IM)',  en: 'Intramuscular (IM)',  shortFr: 'IM',         shortEn: 'IM' },
  subcutaneous:  { color: '#14B8A6', fr: 'Sous-cutanée (SC)',     en: 'Subcutaneous (SC)',   shortFr: 'SC',         shortEn: 'SC' },
  smoked:        { color: '#10B981', fr: 'Inhalée / Fumée',       en: 'Smoked / Vaporized',  shortFr: 'Inhalée',    shortEn: 'Smoked' },
  inhaled:       { color: '#EAB308', fr: 'Inhalée (Gaz/Volatil)', en: 'Inhaled (Gas)',       shortFr: 'Gaz inhalé', shortEn: 'Inhaled' },
  vaporized:     { color: '#10B981', fr: 'Vaporisée',             en: 'Vaporized',           shortFr: 'Vaporisée',  shortEn: 'Vaporized' },
  transdermal:   { color: '#6366F1', fr: 'Transdermique (Patch)', en: 'Transdermal (Patch)', shortFr: 'Patch',      shortEn: 'Patch' }
};

const ROA_COLORS = Object.fromEntries(
  Object.entries(ROA_NORM_CONFIG).map(([k, v]) => [k, v.color])
);

const ROA_LABELS = {
  fr: Object.fromEntries(Object.entries(ROA_NORM_CONFIG).map(([k, v]) => [k, v.shortFr])),
  en: Object.fromEntries(Object.entries(ROA_NORM_CONFIG).map(([k, v]) => [k, v.shortEn]))
};

const NON_DIVERTIBLE_DOSES = {
  'Aspirin': {
    oral:        { low: 500, standard: 1000, max: 1000, units: 'mg' }
  },
  'Cetirizine': {
    oral:        { low: 5,   standard: 10,   max: 20,   units: 'mg' }
  },
  'Diclofenac': {
    oral:        { low: 25,  standard: 50,   max: 75,   units: 'mg' }
  },
  'Ibuprofen': {
    oral:        { low: 200, standard: 400,  max: 600,  units: 'mg' }
  },
  'Ketoprofen': {
    oral:        { low: 50,  standard: 100,  max: 100,  units: 'mg' },
    intravenous: { low: 50,  standard: 100,  max: 100,  units: 'mg' }
  },
  'Metamizole': {
    oral:        { low: 500, standard: 500,  max: 1000, units: 'mg' }
  },
  'Naproxen': {
    oral:        { low: 250, standard: 500,  max: 500,  units: 'mg' }
  },
  'Nefopam': {
    oral:        { low: 30,  standard: 30,   max: 60,   units: 'mg' },
    intravenous: { low: 10,  standard: 20,   max: 20,   units: 'mg' }
  },
  'Paracetamol': {
    oral:        { low: 500, standard: 1000, max: 1000, units: 'mg' },
    rectal:      { low: 500, standard: 1000, max: 1000, units: 'mg' },
    intravenous: { low: 500, standard: 1000, max: 1000, units: 'mg' }
  },
  'Phloroglucinol': {
    oral:        { low: 80,  standard: 80,   max: 160,  units: 'mg' },
    intravenous: { low: 40,  standard: 40,   max: 80,   units: 'mg' }
  },
  'Prednisolone': {
    oral:        { low: 10,  standard: 20,   max: 40,   units: 'mg' }
  },
  'Propranolol': {
    oral:        { low: 10,  standard: 40,   max: 80,   units: 'mg' }
  }
};

const MILD_PERIPHERAL_POWER = {
  'aceclofenac':        0.22,
  'acetaminophen':      0.18,
  'aspirin':            0.18,
  'betamethasone':      0.22,
  'caffeine':           0.28,
  'celecoxib':          0.22,
  'cetirizine':         0.18,
  'dexamethasone':      0.22,
  'diclofenac':         0.23,
  'etoricoxib':         0.23,
  'flurbiprofen':       0.22,
  'ibuprofen':          0.22,
  'ketoprofen':         0.25,
  'mefenamic acid':     0.20,
  'meloxicam':          0.22,
  'metamizole':         0.24,
  'methylprednisolone': 0.20,
  'naproxen':           0.23,
  'nefopam':            0.42,
  'paracetamol':        0.18,
  'paraxanthine':       0.28,
  'phloroglucinol':     0.12,
  'piroxicam':          0.22,
  'prednisolone':       0.20,
  'prednisone':         0.20,
  'propranolol':        0.22,
  'tiaprofenic acid':   0.21
};

const PRIORITY_SUGGESTIONS = [
  'Paracetamol', 'Ibuprofen', 'Diazepam', 'Alprazolam', 'Tramadol',
  'Codeine', 'Morphine', 'Sertraline', 'Escitalopram', 'Baclofen',
  'Hydroxyzine', 'Zolpidem', 'Ketoprofen', 'Pregabalin', 'Gabapentin',
  'Propranolol', 'Prednisolone', 'Lithium', 'Amisulpride', 'Alcohol'
];

const IMPLICIT_INTERACTION_CATS = {
  'Antihistamine':             ['antihistamine'],
  'Benzodiazepines':           ['benzodiazepine', 'depressant'],
  'MAOI':                      ['maoi', 'antidepressant'],
  'NSAIDs':                    ['nsaid', 'analgesic'],
  'Opioids':                   ['opioid', 'depressant'],
  'SNRIs':                     ['snri', 'antidepressant'],
  'SSRIs':                     ['ssri', 'antidepressant'],
  'Tricyclic antidepressants': ['tca', 'antidepressant']
};
