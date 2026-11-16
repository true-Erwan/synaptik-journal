let currentLang = 'fr';
let SUBSTANCES_DATA = DATASETS[currentLang].substances;
let CATEGORIES_DATA = DATASETS[currentLang].categories;
let SUBSTANCES_BY_NAME = {};
let CATEGORY_COUNTS = {};

let activeTab = 'journal';
let currentFilterCat = 'ALL';
let currentCatalogSort = 'alpha';

let currentModalSubstanceName = null;
let selectedModalRoaName = null;

let selectedQuickSubstance = null;
let selectedQuickRoa = null;
let selectedQuickReleaseMode = 'IR';
let selectedQuickReleaseProfile = null;
let selectedQuickTimeOffsetMinutes = 0;

let timelineXZoom = 1.0;
let timelineTouchX = null;
let isPointerDownOnTimeline = false;
let initialPinchDist = null;
let initialPinchZoom = 1.0;
let showMetaboliteCurves = false;
let showModalMetaboliteCurves = false;
let appTheme = 'dark';
let uiViewMode = 'classic';
const hiddenTimelineSeriesKeys = new Set();

function getTimelineSeriesKey(substanceName, seriesKey) {
  return `${String(substanceName || '')}::${String(seriesKey || 'parent')}`;
}

function isTimelineSeriesVisible(substanceName, seriesKey) {
  return !hiddenTimelineSeriesKeys.has(getTimelineSeriesKey(substanceName, seriesKey));
}

function toggleTimelineSeriesVisibility(substanceName, seriesKey, isVisible) {
  const k = getTimelineSeriesKey(substanceName, seriesKey);
  if (isVisible) hiddenTimelineSeriesKeys.delete(k);
  else hiddenTimelineSeriesKeys.add(k);
  if (typeof drawTimeline === 'function') drawTimeline();
}

const sessionBaseTimestamp = Date.now();
let selectedJournalDayOffset = 0;
let virtualTimeOffsetMs = 0;
let isSimulatingPlayback = false;
let simulationPlayInterval = null;
let timelinePanMin = 0;
let totalTimelineWidthMin = 360;

function getTimestampAtClockOnDay(dayOffset, hours, minutes) {
  const d = new Date(sessionBaseTimestamp);
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hours, minutes || 0, 0, 0);
  return d.getTime();
}

function getDayBaseReferenceTime(dayOffset) {
  if (dayOffset === 0) return sessionBaseTimestamp;
  return getTimestampAtClockOnDay(dayOffset, 14, 0);
}

function formatJournalDayTitle(dayOffset, lang = currentLang) {
  if (dayOffset === 0) return lang === 'fr' ? "Aujourd'hui" : 'Today';
  if (dayOffset === -1) return lang === 'fr' ? 'Hier (J-1)' : 'Yesterday (D-1)';
  if (dayOffset === -2) return lang === 'fr' ? 'Avant-hier (J-2)' : '2 days ago (D-2)';
  const abs = Math.abs(dayOffset);
  return lang === 'fr' ? `Il y a ${abs} jours (J-${abs})` : `${abs} days ago (D-${abs})`;
}

function formatJournalDayShortLabel(dayOffset, lang = currentLang) {
  if (dayOffset === 0) return lang === 'fr' ? "Auj." : 'Today';
  if (dayOffset === -1) return lang === 'fr' ? 'Hier' : 'Yest.';
  const abs = Math.abs(dayOffset);
  return lang === 'fr' ? `J-${abs}` : `D-${abs}`;
}

function formatJournalDayFullDate(dayOffset, lang = currentLang) {
  const d = new Date(sessionBaseTimestamp);
  d.setDate(d.getDate() + dayOffset);
  const daysFr = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'];
  const daysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsFr = ['Jan.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];
  const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayName = lang === 'fr' ? daysFr[d.getDay()] : daysEn[d.getDay()];
  const monthName = lang === 'fr' ? monthsFr[d.getMonth()] : monthsEn[d.getMonth()];
  return lang === 'fr' ? `${dayName} ${d.getDate()} ${monthName}` : `${dayName}, ${monthName} ${d.getDate()}`;
}

function buildHistoricalDayIngestion(id, dayOffset, substanceName, unit, route, intakesSpec, releaseProfileId = 'IR', releaseBadgeFr = null, releaseBadgeEn = null, isExtended = false, waves = null) {
  const refMs = getDayBaseReferenceTime(dayOffset);
  const builtIntakes = intakesSpec.map(sp => {
    const ts = getTimestampAtClockOnDay(dayOffset, sp.h, sp.m);
    const offMin = Math.round((ts - refMs) / 60000);
    return {
      dose: sp.dose,
      timestamp: ts,
      timeOffsetMinutes: offMin,
      source: 'user_intake'
    };
  });
  const totalDose = Number(builtIntakes.reduce((sum, it) => sum + it.dose, 0).toFixed(2));
  const lastIt = builtIntakes[builtIntakes.length - 1];
  return {
    id,
    substanceName,
    dose: totalDose,
    unit,
    route,
    source: 'user_intake',
    releaseProfileId,
    releaseBadgeFr,
    releaseBadgeEn,
    isExtendedRelease: isExtended,
    waves: waves || [{ delayMin: 0, weight: 1.0, onsetScale: 1.0, riseScale: 1.0, plateauMin: 0, fallScale: 1.0 }],
    timestamp: lastIt.timestamp,
    timeOffsetMinutes: lastIt.timeOffsetMinutes,
    intakes: builtIntakes
  };
}

const journalDaysHistory = {
  0: {
    dayOffset: 0,
    referenceTimeMs: sessionBaseTimestamp,
    ingestions: [
      {
        id: 1,
        substanceName: 'Paracetamol',
        dose: 1000,
        unit: 'mg',
        route: 'oral',
        source: 'user_intake',
        timestamp: sessionBaseTimestamp - 90 * 60000,
        timeOffsetMinutes: -90,
        intakes: [{
          dose: 1000,
          timestamp: sessionBaseTimestamp - 90 * 60000,
          timeOffsetMinutes: -90,
          source: 'user_intake'
        }]
      },
      {
        id: 2,
        substanceName: 'Ibuprofen',
        dose: 400,
        unit: 'mg',
        route: 'oral',
        source: 'user_intake',
        timestamp: sessionBaseTimestamp - 30 * 60000,
        timeOffsetMinutes: -30,
        intakes: [{
          dose: 400,
          timestamp: sessionBaseTimestamp - 30 * 60000,
          timeOffsetMinutes: -30,
          source: 'user_intake'
        }]
      }
    ]
  },
  [-1]: {
    dayOffset: -1,
    referenceTimeMs: getDayBaseReferenceTime(-1),
    ingestions: [
      buildHistoricalDayIngestion(101, -1, 'Oxycodone', 'mg', 'oral', [
        { dose: 10, h: 9, m: 0 },
        { dose: 10, h: 13, m: 30 },
        { dose: 20, h: 18, m: 0 }
      ]),
      buildHistoricalDayIngestion(102, -1, 'Paracetamol', 'mg', 'oral', [
        { dose: 1000, h: 9, m: 0 },
        { dose: 1000, h: 15, m: 30 }
      ]),
      buildHistoricalDayIngestion(103, -1, 'Alprazolam', 'mg', 'oral', [
        { dose: 0.5, h: 20, m: 30 }
      ])
    ]
  },
  [-2]: {
    dayOffset: -2,
    referenceTimeMs: getDayBaseReferenceTime(-2),
    ingestions: [
      buildHistoricalDayIngestion(201, -2, 'Pregabalin', 'mg', 'oral', [
        { dose: 150, h: 8, m: 30 },
        { dose: 150, h: 19, m: 30 }
      ]),
      buildHistoricalDayIngestion(202, -2, 'Tramadol', 'mg', 'oral', [
        { dose: 100, h: 10, m: 0 },
        { dose: 50, h: 16, m: 0 }
      ]),
      buildHistoricalDayIngestion(203, -2, 'Caffeine', 'mg', 'oral', [
        { dose: 80, h: 8, m: 0 },
        { dose: 80, h: 13, m: 30 }
      ])
    ]
  },
  [-3]: {
    dayOffset: -3,
    referenceTimeMs: getDayBaseReferenceTime(-3),
    ingestions: [
      buildHistoricalDayIngestion(301, -3, 'Methylphenidate', 'mg', 'oral', [
        { dose: 20, h: 8, m: 30 },
        { dose: 10, h: 13, m: 0 }
      ]),
      buildHistoricalDayIngestion(302, -3, 'Diazepam', 'mg', 'oral', [
        { dose: 10, h: 21, m: 0 }
      ]),
      buildHistoricalDayIngestion(303, -3, 'Paracetamol', 'mg', 'oral', [
        { dose: 1000, h: 18, m: 0 }
      ])
    ]
  },
  [-4]: {
    dayOffset: -4,
    referenceTimeMs: getDayBaseReferenceTime(-4),
    ingestions: [
      buildHistoricalDayIngestion(401, -4, 'Codeine', 'mg', 'oral', [
        { dose: 60, h: 10, m: 30 },
        { dose: 60, h: 16, m: 30 }
      ]),
      buildHistoricalDayIngestion(402, -4, 'Ibuprofen', 'mg', 'oral', [
        { dose: 400, h: 10, m: 30 },
        { dose: 400, h: 18, m: 30 }
      ])
    ]
  },
  [-5]: {
    dayOffset: -5,
    referenceTimeMs: getDayBaseReferenceTime(-5),
    ingestions: [
      buildHistoricalDayIngestion(501, -5, 'Baclofen', 'mg', 'oral', [
        { dose: 10, h: 8, m: 30 },
        { dose: 10, h: 13, m: 0 },
        { dose: 10, h: 19, m: 0 }
      ]),
      buildHistoricalDayIngestion(502, -5, 'Zolpidem', 'mg', 'oral', [
        { dose: 10, h: 22, m: 30 }
      ])
    ]
  },
  [-6]: {
    dayOffset: -6,
    referenceTimeMs: getDayBaseReferenceTime(-6),
    ingestions: [
      buildHistoricalDayIngestion(601, -6, 'Caffeine', 'mg', 'oral', [
        { dose: 100, h: 8, m: 30 },
        { dose: 100, h: 14, m: 0 }
      ]),
      buildHistoricalDayIngestion(602, -6, 'Ibuprofen', 'mg', 'oral', [
        { dose: 400, h: 12, m: 30 }
      ])
    ]
  }
};

function getOrCreateJournalDay(dayOffset) {
  if (!journalDaysHistory[dayOffset]) {
    journalDaysHistory[dayOffset] = {
      dayOffset,
      referenceTimeMs: getDayBaseReferenceTime(dayOffset),
      ingestions: []
    };
  }
  return journalDaysHistory[dayOffset];
}

let ingestions = journalDaysHistory[0].ingestions;

function syncActiveDayIngestions() {
  const dayObj = getOrCreateJournalDay(selectedJournalDayOffset);
  dayObj.ingestions = ingestions;
}

let enabledSettings = new Set([
  'Alcohol', 'Lithium', 'NSAIDs', 'SSRIs'
]);

function formatIsoDateForOffset(dayOffset = 0) {
  const d = new Date(sessionBaseTimestamp);
  d.setDate(d.getDate() + dayOffset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const BACKGROUND_HABIT_EXTRAS = [
  {
    name: 'Hormonal birth control',
    labelFr: 'Contraception hormonale',
    labelEn: 'Hormonal birth control',
    categoryFr: 'Traitement hormonal chronique',
    categoryEn: 'Chronic hormonal therapy',
    defaultDose: 1,
    unit: 'cp',
    color: '#ec4899',
    aliases: ['contraception', 'pilule', 'hormonal', 'birth control', 'oestrogene', 'progestatif']
  }
];

const BACKGROUND_MEDICATION_CATEGORIES = new Set([
  'antidepressant', 'antipsychotic', 'mood-stabilizer', 'nsaid', 'analgesic',
  'anxiolytic', 'anticonvulsant', 'gabapentinoid', 'triptan', 'antispasmodic',
  'corticosteroid', 'antihistamine', 'benzodiazepine', 'eugeroic'
]);

const BACKGROUND_NON_MED_CATEGORIES = new Set([
  'research-chemical', 'psychedelic', 'entactogen', 'dissociative', 'cannabinoid', 'tentative'
]);

const BACKGROUND_NON_MED_NAMES = new Set([
  'Diclazepam', 'N-Methylbisfluoromodafinil', 'Phenibut', 'F-Phenibut',
  'Alcohol', 'Caffeine', 'Nicotine', 'Theacrine', 'Paraxanthine',
  'Creatine', '5-Hydroxytryptophan', 'Alpha-GPC', 'Choline bitartrate',
  'Citicoline', 'SAM-e', 'Theanine', 'Tyrosine', 'Benzydamine',
  'Bromantane', 'Omberacetam', 'Aniracetam', 'Oxiracetam', 'Pramiracetam',
  'Coluracetam', 'Meclofenoxate', 'Secobarbital', 'Pentobarbital',
  'Methaqualone', 'Mephenaqualone', 'Etomidate', 'Heroin', 'Opium',
  'Kratom', 'U-47700', 'Acetylfentanyl', 'Desomorphine', '7-Hydroxymitragynine',
  'O-Desmethyltramadol', 'Cocaine', 'Methamphetamine', 'Cathinone',
  'A-PVP', 'A-PHP', 'A-PiHP', 'MDPV', 'Apomorphine', 'Propylhexedrine',
  'Ephedrine', 'Cyclazodone', 'Desoxypipradrol', 'Dipentylone', 'Dichloropane',
  'Ethylphenidate', '4F-MPH', '4F-EPH', 'Isopropylphenidate', 'Methylnaphthidate',
  'Hexedrone', 'N-Ethylhexedrone', 'NEP', 'Pentedrone', 'MCPP', 'Gaboxadol',
  'GBL', 'GHB', '1,4-Butanediol', '2M2B', 'Carisoprodol', 'Dextropropoxyphene',
  'Ethylmorphine', 'Norbuprenorphine', 'Norpethidine', 'Nortilidine', 'Pethidine', 'Sufentanil'
]);

const BACKGROUND_MEDICATION_ALLOWLIST = new Set([
  'Zolpidem', 'Zopiclone', 'Zaleplon', 'Eszopiclone', 'Melatonin',
  'Alimemazine', 'Promethazine', 'Diphenhydramine', 'Doxylamine',
  'Mirtazapine', 'Atomoxetine', 'Memantine', 'Galantamine', 'Piracetam',
  'Baclofen', 'Acamprosate', 'Clonidine', 'Cyclobenzaprine', 'Methocarbamol',
  'Tizanidine', 'Progesterone', 'Methylphenidate', 'Lisdexamfetamine',
  'Dextroamphetamine', 'Amphetamine', 'Buprenorphine', 'Methadone',
  'Morphine', 'Oxycodone', 'Codeine', 'Tramadol', 'Fentanyl',
  'Tapentadol', 'Hydromorphone', 'Hydrocodone', 'Dihydrocodeine',
  'Tilidin', 'Nalmefene', 'Naloxone'
]);

function isBackgroundMedicationSubstance(s) {
  if (!s || !s.name) return false;
  if (s.metaboliteMeta && s.metaboliteMeta.directUse === 'endogenous_only') return false;
  if (BACKGROUND_NON_MED_NAMES.has(s.name)) return false;
  if (BACKGROUND_MEDICATION_ALLOWLIST.has(s.name)) return true;
  const cats = Array.isArray(s.categories) ? s.categories.map(c => String(c).toLowerCase()) : [];
  if (cats.some(c => BACKGROUND_NON_MED_CATEGORIES.has(c))) return false;
  if (cats.includes('deliriant') || cats.includes('hallucinogen') || cats.includes('oneirogen')) return false;
  return cats.some(c => BACKGROUND_MEDICATION_CATEGORIES.has(c));
}

function getBackgroundSettingKeysForSubstance(substanceName) {
  const keys = [];
  if (!substanceName) return keys;
  keys.push(substanceName);
  const low = substanceName.toLowerCase();
  const s = SUBSTANCES_BY_NAME[substanceName];
  const cats = (s && Array.isArray(s.categories)) ? s.categories.map(c => String(c).toLowerCase()) : [];

  if (low === 'grapefruit' || low.includes('pamplemousse')) keys.push('Grapefruit');
  if (low === 'alcohol' || low === 'ethanol' || low === 'alcool') keys.push('Alcohol');
  if (low === 'lithium') keys.push('Lithium');
  if (low === 'baclofen') keys.push('Baclofen');
  if (['ibuprofen', 'ketoprofen', 'naproxen', 'diclofenac', 'aspirin', 'celecoxib', 'meloxicam'].includes(low) || cats.some(c => c.includes('nsaid') || c.includes('ains'))) {
    keys.push('NSAIDs');
  }
  if (['escitalopram', 'citalopram', 'fluoxetine', 'paroxetine', 'sertraline', 'fluvoxamine'].includes(low) || cats.some(c => c.includes('ssri') || c.includes('isrs'))) {
    keys.push('SSRIs');
  }
  if (['venlafaxine', 'desvenlafaxine', 'duloxetine', 'milnacipran'].includes(low) || cats.some(c => c.includes('snri') || c.includes('irsna'))) {
    keys.push('SNRIs');
  }
  if (cats.some(c => c.includes('benzodiazep'))) {
    keys.push('Benzodiazepines');
  }
  if (cats.some(c => c.includes('opioid') || c.includes('opiac'))) {
    keys.push('Opioids');
  }
  return [...new Set(keys)];
}

let backgroundTreatments = [
  {
    id: 9001,
    name: 'Lithium',
    route: 'oral',
    releaseMode: 'ER',
    releaseProfileId: 'LP_GENERIC',
    releaseBadgeFr: 'LP',
    releaseBadgeEn: 'ER',
    dose: 400,
    unit: 'mg',
    times: ['08:00', '20:00'],
    periodType: 'indefinite',
    startDate: formatIsoDateForOffset(-30),
    endDate: '',
    enabled: true
  },
  {
    id: 9002,
    name: 'Escitalopram',
    route: 'oral',
    releaseMode: 'IR',
    releaseProfileId: 'IR',
    releaseBadgeFr: 'LI',
    releaseBadgeEn: 'IR',
    dose: 10,
    unit: 'mg',
    times: ['08:00'],
    periodType: 'indefinite',
    startDate: formatIsoDateForOffset(-30),
    endDate: '',
    enabled: true
  },
  {
    id: 9004,
    name: 'Ibuprofen',
    route: 'oral',
    releaseMode: 'IR',
    releaseProfileId: 'IR',
    releaseBadgeFr: 'LI',
    releaseBadgeEn: 'IR',
    dose: 400,
    unit: 'mg',
    times: ['08:00', '20:00'],
    periodType: 'limited',
    startDate: formatIsoDateForOffset(-2),
    endDate: formatIsoDateForOffset(5),
    enabled: true
  }
];

function isBackgroundTreatmentActiveOnDay(tr, dayOffset = selectedJournalDayOffset) {
  if (!tr || !tr.enabled) return false;
  if (tr.periodType !== 'limited') return true;
  const targetIso = formatIsoDateForOffset(dayOffset);
  if (tr.startDate && targetIso < tr.startDate) return false;
  if (tr.endDate && targetIso > tr.endDate) return false;
  return true;
}

function getActiveBackgroundTreatmentsForDay(dayOffset = selectedJournalDayOffset) {
  return backgroundTreatments.filter(tr => isBackgroundTreatmentActiveOnDay(tr, dayOffset));
}

function syncBackgroundSettingsFromTreatments(dayOffset = selectedJournalDayOffset) {
  enabledSettings.clear();
  getActiveBackgroundTreatmentsForDay(dayOffset).forEach(tr => {
    getBackgroundSettingKeysForSubstance(tr.name).forEach(k => enabledSettings.add(k));
  });
}

function normalizeSearchText(str) {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[- ]/g, '')
    .toLowerCase();
}

function normalizeSearchToken(str) {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function isScientificChemicalAlias(cn, substanceName) {
  if (!cn) return true;
  const raw = String(cn).trim();
  if (!raw) return true;
  if (/^\([0-9RSrs+\-±,]+\)-/.test(raw) || /[\[\]Δγ]/.test(raw)) return true;
  const cleaned = raw.replace(/\s*\([^)]*\)\s*/g, ' ').trim();
  if (!cleaned) return true;
  if (cleaned.toLowerCase() === String(substanceName || '').trim().toLowerCase()) return false;
  if (cleaned.length > 16) {
    if (/^\d+[,\d]*-[a-z]/i.test(cleaned)) return true;
    if (/^(n|o|alpha|beta|α)-/i.test(cleaned) && /(methyl|ethyl|propyl|desmethyl|carbamimidoyl|hydroxy)/i.test(cleaned)) return true;
    if (/(guanido|phosphorylcholine|lysergic|glutamylethylamide|phenylalanine|methoxyeticyclidine|hydroxyphencyclidine|hydroxyeticyclidine)/i.test(cleaned)) return true;
  }
  return false;
}

function getSearchableAliases(s) {
  if (s && Array.isArray(s._searchAliases)) return s._searchAliases;
  const list = Array.isArray(s && s.commonNames) ? s.commonNames : [];
  return list
    .filter(cn => !isScientificChemicalAlias(cn, s.name))
    .map(cn => String(cn).replace(/\s*\([^)]*\)\s*/g, ' ').trim())
    .filter(Boolean);
}

function getSubstanceSearchRank(s, rawQuery) {
  if (!s || !rawQuery) return 0;
  const cleanQ = normalizeSearchText(rawQuery);
  const tokQ = normalizeSearchToken(rawQuery.trim());
  if (!cleanQ && !tokQ) return 0;

  const normName = s._normName || normalizeSearchText(s.name);
  if (cleanQ && normName.startsWith(cleanQ)) return 1;

  const nameWords = normalizeSearchToken(s.name).split(/[\s\-_/.,()]+/).filter(Boolean);
  if (tokQ && nameWords.some(w => w.startsWith(tokQ))) return 2;

  const aliases = getSearchableAliases(s);
  const normBrands = s._normBrands || aliases.map(normalizeSearchText);
  if (cleanQ && normBrands.some(b => b.startsWith(cleanQ))) return 3;

  const brandWords = aliases
    .flatMap(cn => normalizeSearchToken(cn).split(/[\s\-_/.,()]+/))
    .filter(Boolean);
  if (tokQ && brandWords.some(w => w.startsWith(tokQ))) return 4;

  return 0;
}

function buildLookup() {
  SUBSTANCES_BY_NAME = {};
  CATEGORY_COUNTS = {};

  for (let i = 0; i < SUBSTANCES_DATA.length; i++) {
    const s = SUBSTANCES_DATA[i];
    SUBSTANCES_BY_NAME[s.name] = s;

    if (!s._normName) {
      s._normName = normalizeSearchText(s.name);
      s._searchAliases = getSearchableAliases(s);
      s._normBrands = s._searchAliases.map(normalizeSearchText);
    }

    if (Array.isArray(s.categories)) {
      for (let j = 0; j < s.categories.length; j++) {
        const cat = s.categories[j];
        CATEGORY_COUNTS[cat] = (CATEGORY_COUNTS[cat] || 0) + 1;
      }
    }
  }
}

const RGB_CACHE = {};

function hexToRgb(hex) {
  const key = hex || '#818cf8';
  if (RGB_CACHE[key]) return RGB_CACHE[key];

  let c = key.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16) || 0x818cf8;
  const rgb = {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
  RGB_CACHE[key] = rgb;
  return rgb;
}

function shiftHexColorHsl(hex, hueShiftDeg, satDelta, lightDelta) {
  const { r, g, b } = hexToRgb(hex);
  const rf = r / 255;
  const gf = g / 255;
  const bf = b / 255;
  const max = Math.max(rf, gf, bf);
  const min = Math.min(rf, gf, bf);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rf: h = (gf - bf) / d + (gf < bf ? 6 : 0); break;
      case gf: h = (bf - rf) / d + 2; break;
      case bf: h = (rf - gf) / d + 4; break;
    }
    h *= 60;
  }

  h = (h + hueShiftDeg + 360) % 360;
  s = Math.max(0.35, Math.min(0.95, s + satDelta));
  l = Math.max(0.48, Math.min(0.78, l + lightDelta));

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r1 = 0, g1 = 0, b1 = 0;
  if (h < 60) { r1 = c; g1 = x; b1 = 0; }
  else if (h < 120) { r1 = x; g1 = c; b1 = 0; }
  else if (h < 180) { r1 = 0; g1 = c; b1 = x; }
  else if (h < 240) { r1 = 0; g1 = x; b1 = c; }
  else if (h < 300) { r1 = x; g1 = 0; b1 = c; }
  else { r1 = c; g1 = 0; b1 = x; }

  const toHex = v => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r1)}${toHex(g1)}${toHex(b1)}`.toUpperCase();
}

function rgbToHsl(r, g, b) {
  const rf = r / 255;
  const gf = g / 255;
  const bf = b / 255;
  const max = Math.max(rf, gf, bf);
  const min = Math.min(rf, gf, bf);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rf: h = (gf - bf) / d + (gf < bf ? 6 : 0); break;
      case gf: h = (bf - rf) / d + 2; break;
      case bf: h = (rf - gf) / d + 4; break;
    }
    h *= 60;
  }
  return { h, s, l };
}

function getHslPerceptualDistance(hexA, hexB) {
  const rgbA = hexToRgb(hexA);
  const rgbB = hexToRgb(hexB);
  const a = rgbToHsl(rgbA.r, rgbA.g, rgbA.b);
  const b = rgbToHsl(rgbB.r, rgbB.g, rgbB.b);
  const dhRaw = Math.abs(a.h - b.h);
  const dh = Math.min(dhRaw, 360 - dhRaw);
  const dl = Math.abs(a.l - b.l) * 180;
  const ds = Math.abs(a.s - b.s) * 45;
  return Math.sqrt(dh * dh + dl * dl + ds * ds);
}

function getMetaboliteCoherentColor(parentColorHex, metModel, metIdx = 0) {
  const pCol = (parentColorHex || '#6366F1').toUpperCase();
  const isSub = Boolean(metModel && metModel.isSubMetabolite);

  let candidate = null;
  if (metModel && metModel.color && metModel.color.toUpperCase() !== pCol) {
    candidate = metModel.color.toUpperCase();
  } else {
    const metSub = (metModel && metModel.name && SUBSTANCES_BY_NAME) ? SUBSTANCES_BY_NAME[metModel.name] : null;
    if (metSub && metSub.color && metSub.color.toUpperCase() !== pCol) {
      candidate = metSub.color.toUpperCase();
    }
  }

  if (candidate && getHslPerceptualDistance(pCol, candidate) >= 24) {
    return candidate;
  }

  const hueShifts = isSub ? [-46, 50, -68, 70] : [32, -34, 56, -56];
  const hueShift = hueShifts[metIdx % hueShifts.length];
  const lightDelta = isSub
    ? (metIdx % 2 === 0 ? 0.16 : -0.12)
    : (metIdx % 2 === 0 ? 0.13 : -0.10);
  return shiftHexColorHsl(candidate || pCol, hueShift, 0.10, lightDelta);
}

function getRoaInfo(roaName) {
  const key = (roaName || 'oral').toLowerCase();
  const cfg = ROA_NORM_CONFIG[key] || {
    color: '#94A3B8',
    fr: roaName,
    en: roaName,
    shortFr: roaName,
    shortEn: roaName
  };
  return {
    color: cfg.color,
    label: currentLang === 'fr' ? cfg.fr : cfg.en,
    shortLabel: currentLang === 'fr' ? cfg.shortFr : cfg.shortEn
  };
}

function formatOffsetTimeStr(off, timestamp) {
  const intakeDate = timestamp ? new Date(timestamp) : new Date(getNowTime() + (off || 0) * 60000);
  const timeExactStr = intakeDate.toTimeString().slice(0, 5);

  if (selectedJournalDayOffset < 0) {
    const dayShort = formatJournalDayShortLabel(selectedJournalDayOffset, currentLang);
    return currentLang === 'fr' ? `Pris à ${timeExactStr} (${dayShort})` : `Taken at ${timeExactStr} (${dayShort})`;
  }

  if (!off || off === 0) {
    return currentLang === 'fr' ? `À l'instant (${timeExactStr})` : `Just now (${timeExactStr})`;
  }
  if (off < 0) {
    const minsAgo = Math.abs(off);
    const durStr = minsAgo >= 60
      ? `${Math.floor(minsAgo / 60)}h${minsAgo % 60 > 0 ? String(minsAgo % 60).padStart(2, '0') : ''}`
      : `${minsAgo} min`;
    return currentLang === 'fr' ? `Il y a ${durStr} (${timeExactStr})` : `${durStr} ago (${timeExactStr})`;
  }

  const minsFut = off;
  const durStr = minsFut >= 60
    ? `${Math.floor(minsFut / 60)}h${minsFut % 60 > 0 ? String(minsFut % 60).padStart(2, '0') : ''}`
    : `${minsFut} min`;
  return currentLang === 'fr' ? `Planifié dans ${durStr} (${timeExactStr})` : `Planned in ${durStr} (${timeExactStr})`;
}

function getNowTime() {
  if (selectedJournalDayOffset === 0) {
    return Date.now() + virtualTimeOffsetMs;
  }
  const dayObj = getOrCreateJournalDay(selectedJournalDayOffset);
  return dayObj.referenceTimeMs + virtualTimeOffsetMs;
}

function updateClock() {
  const now = new Date(Date.now() + (selectedJournalDayOffset === 0 ? virtualTimeOffsetMs : 0));
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const clockEl = document.getElementById('clock');
  if (clockEl) clockEl.textContent = `${h}:${m}`;
}

function advanceSimulationTime(minutes) {
  virtualTimeOffsetMs += minutes * 60000;
  if (typeof ensureTimelineVisibleAtOffset === 'function') {
    ensureTimelineVisibleAtOffset(0);
  }
  updateSimulationUI();
  drawTimeline();
  renderIngestions();
}

function resetSimulationTime() {
  virtualTimeOffsetMs = 0;
  timelinePanMin = 0;
  if (isSimulatingPlayback) toggleSimulationPlayback();
  updateSimulationUI();
  drawTimeline();
  renderIngestions();
}

function toggleSimulationPlayback() {
  isSimulatingPlayback = !isSimulatingPlayback;
  const btn = document.getElementById('btn-sim-play');
  const icon = document.getElementById('icon-sim-play');
  const txt = document.getElementById('txt-sim-play');

  if (isSimulatingPlayback) {
    if (btn) btn.className = 'px-2 py-0.5 rounded bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-300 font-semibold text-[10px] flex items-center gap-1 transition animate-pulse';
    if (icon) icon.textContent = '⏸';
    if (txt) txt.textContent = currentLang === 'fr' ? 'Pause' : 'Pause';
    simulationPlayInterval = setInterval(() => {
      virtualTimeOffsetMs += 15000;
      if (typeof ensureTimelineVisibleAtOffset === 'function') {
        ensureTimelineVisibleAtOffset(0);
      }
      updateSimulationUI();
      drawTimeline();
      renderIngestions();
    }, 250);
  } else {
    if (simulationPlayInterval) {
      clearInterval(simulationPlayInterval);
      simulationPlayInterval = null;
    }
    if (btn) btn.className = 'px-2 py-0.5 rounded bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/50 text-indigo-300 font-semibold text-[10px] flex items-center gap-1 transition';
    if (icon) icon.textContent = '▶';
    if (txt) txt.textContent = currentLang === 'fr' ? 'Défiler (x60)' : 'Play (x60)';
  }
}

function updateSimulationUI() {
  const statusEl = document.getElementById('sim-time-status');
  const resetBtn = document.getElementById('btn-sim-reset');
  const nowSim = new Date(getNowTime());
  const timeStr = nowSim.toTimeString().slice(0, 5);
  const offMin = Math.round(virtualTimeOffsetMs / 60000);

  if (statusEl) {
    if (selectedJournalDayOffset < 0 && offMin === 0 && Math.abs(timelinePanMin) < 1) {
      const dayLbl = formatJournalDayShortLabel(selectedJournalDayOffset, currentLang);
      statusEl.textContent = `📅 ${dayLbl} • ${timeStr}`;
      statusEl.className = 'text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-bold';
    } else if (offMin === 0 && Math.abs(timelinePanMin) < 1) {
      statusEl.textContent = currentLang === 'fr' ? `Maintenant (${timeStr})` : `Now (${timeStr})`;
      statusEl.className = 'text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400';
    } else {
      const sign = offMin > 0 ? `+${offMin}m` : (offMin < 0 ? `${offMin}m` : '');
      const panStr = Math.abs(timelinePanMin) >= 1 ? ` • ↔ ${timelinePanMin > 0 ? '+' : ''}${Math.round(timelinePanMin)}m` : '';
      statusEl.textContent = `⏱ ${timeStr} (${sign || 'T=0'}${panStr})`;
      statusEl.className = 'text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold';
    }
  }

  if (resetBtn) {
    resetBtn.classList.toggle('hidden', offMin === 0 && Math.abs(timelinePanMin) < 1);
  }
  updateClock();
}

setInterval(updateClock, 1000);
setInterval(() => {
  if (!isSimulatingPlayback && typeof drawTimeline === 'function' && typeof renderIngestions === 'function') {
    updateSimulationUI();
    drawTimeline();
    renderIngestions();
  }
}, 5000);
