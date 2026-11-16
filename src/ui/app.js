function switchTab(tabId) {
  const targetTab = tabId === 'history' ? 'stats' : tabId;
  activeTab = targetTab;
  ['stats', 'journal', 'substances', 'settings'].forEach(t => {
    const el = document.getElementById('tab-' + t);
    const btn = document.getElementById('nav-btn-' + t);
    if (!el || !btn) return;

    if (t === targetTab) {
      el.classList.remove('hidden');
      btn.classList.add('text-indigo-400');
      btn.classList.remove('text-slate-400');
    } else {
      el.classList.add('hidden');
      btn.classList.remove('text-indigo-400');
      btn.classList.add('text-slate-400');
    }
  });

  if (targetTab === 'journal') {
    if (typeof closeJournalDayDetail === 'function') {
      closeJournalDayDetail();
    }
  } else if (targetTab === 'stats' && typeof renderStatsPage === 'function') {
    renderStatsPage();
  }
}

function toggleLanguage() {
  setLanguage(currentLang === 'fr' ? 'en' : 'fr');
}

function setLanguage(lang) {
  currentLang = lang;
  SUBSTANCES_DATA = DATASETS[lang].substances;
  CATEGORIES_DATA = DATASETS[lang].categories;
  buildLookup();

  document.getElementById('lang-flag').textContent = lang === 'fr' ? '🇫🇷' : '🇬🇧';
  document.getElementById('lang-code').textContent = lang.toUpperCase();

  const btnFr = document.getElementById('btn-lang-fr');
  const btnEn = document.getElementById('btn-lang-en');
  if (btnFr && btnEn) {
    const activeCls = 'flex-1 py-2 px-3 rounded-xl border border-indigo-500 bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition';
    const inactiveCls = 'flex-1 py-2 px-3 rounded-xl border border-slate-700 bg-slate-950 text-slate-400 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition';
    btnFr.className = lang === 'fr' ? activeCls : inactiveCls;
    btnEn.className = lang === 'en' ? activeCls : inactiveCls;
  }

  const t = I18N[lang];
  const totalSubs = (SUBSTANCES_DATA && SUBSTANCES_DATA.length)
    ? SUBSTANCES_DATA.length
    : (DATASETS[lang] ? DATASETS[lang].substances.length : 388);

  document.getElementById('app-subtitle').textContent = t.appSubtitle(totalSubs);
  document.getElementById('txt-timeline-title').textContent = t.timelineTitle;
  document.getElementById('txt-empty-history').textContent = t.emptyHistory;
  document.getElementById('txt-empty-history-sub').textContent = t.emptyHistorySub;

  const subEl = document.getElementById('txt-timeline-subtitle');
  if (subEl) {
    subEl.textContent = lang === 'fr'
      ? 'Molette / Glisser pour zoomer et défiler sur X • Suivi auto'
      : 'Wheel / Drag to zoom and pan X • Auto tracking';
  }
  const btnAuto = document.getElementById('btn-window-auto');
  if (btnAuto) {
    btnAuto.title = lang === 'fr'
      ? 'Cadrage automatique X selon la durée des molécules'
      : 'Automatic X framing matched to substance duration';
  }
  const xTitleEl = document.getElementById('txt-x-zoom-title');
  if (xTitleEl) {
    xTitleEl.textContent = lang === 'fr' ? 'Zoom Axe X' : 'X-Axis Zoom';
  }
  const metToggleTxt = document.getElementById('txt-toggle-metabolites');
  if (metToggleTxt) {
    metToggleTxt.textContent = lang === 'fr' ? '🧬 Métabolites' : '🧬 Metabolites';
  }
  const metToggleLbl = document.getElementById('lbl-toggle-metabolites');
  if (metToggleLbl) {
    metToggleLbl.title = lang === 'fr'
      ? 'Afficher ou cacher les courbes des métabolites et sous-métabolites sur le graphique'
      : 'Show or hide active metabolite and sub-metabolite curves on the chart';
  }
  const modalMetTxt = document.getElementById('txt-toggle-modal-metabolites');
  if (modalMetTxt) {
    modalMetTxt.textContent = lang === 'fr' ? '🧬 Métabolites' : '🧬 Metabolites';
  }
  const modalMetLbl = document.getElementById('lbl-toggle-modal-metabolites');
  if (modalMetLbl) {
    modalMetLbl.title = lang === 'fr'
      ? 'Afficher ou cacher les métabolites actifs sur le graphique'
      : 'Show or hide active metabolites on the chart';
  }

  document.getElementById('txt-quick-log-title').textContent = t.quickLogTitle;
  document.getElementById('txt-quick-log-sub').textContent = t.quickLogSub;
  document.getElementById('txt-btn-add-ingestion').textContent = t.btnAddIngestion;

  const quickSearchInput = document.getElementById('quick-search-input');
  if (quickSearchInput) {
    quickSearchInput.placeholder = lang === 'fr'
      ? 'Rechercher molécule ou marque (ex: Doliprane, Xanax, Tramadol...)'
      : 'Search molecule or brand (e.g. Doliprane, Xanax, Tramadol...)';
  }
  const quickChangeBtn = document.getElementById('txt-quick-change');
  if (quickChangeBtn) quickChangeBtn.textContent = lang === 'fr' ? 'Changer' : 'Change';
  const quickDoseLbl = document.getElementById('txt-quick-dose-label');
  if (quickDoseLbl) quickDoseLbl.textContent = lang === 'fr' ? 'Dose administrée' : 'Administered dose';
  const quickTierHint = document.getElementById('txt-quick-tier-hint');
  if (quickTierHint) quickTierHint.textContent = lang === 'fr' ? 'Paliers rapides :' : 'Quick tiers:';
  const quickRoaLbl = document.getElementById('txt-quick-roa-label');
  if (quickRoaLbl) quickRoaLbl.textContent = lang === 'fr' ? "Voie d'administration" : 'Administration route';

  document.getElementById('txt-history-title').textContent = t.historyTitle;
  document.getElementById('txt-clear-all').textContent = t.clearAll;
  document.getElementById('search-input').placeholder = t.searchPlaceholder;
  document.getElementById('cat-pill-all').textContent = t.allCategory(totalSubs);
  document.getElementById('txt-click-to-view').textContent = t.clickToView;

  const statsPageTitle = document.getElementById('txt-stats-page-title');
  if (statsPageTitle) statsPageTitle.textContent = t.statsPageTitle;
  const statsPageSub = document.getElementById('txt-stats-page-sub');
  if (statsPageSub) statsPageSub.textContent = t.statsPageSub;
  const btnStats7d = document.getElementById('btn-stats-period-7d');
  if (btnStats7d) btnStats7d.textContent = t.statsPeriod7d;
  const btnStatsAll = document.getElementById('btn-stats-period-all');
  if (btnStatsAll) btnStatsAll.textContent = t.statsPeriodAll;
  const statsTolTitle = document.getElementById('txt-stats-tolerances-title');
  if (statsTolTitle) statsTolTitle.textContent = t.statsTolerancesTitle;
  const statsTolSub = document.getElementById('txt-stats-tolerances-sub');
  if (statsTolSub) statsTolSub.textContent = t.statsTolerancesSub;

  const jListTitle = document.getElementById('txt-journal-list-title');
  if (jListTitle) jListTitle.textContent = t.journalListTitle;
  const btnAddShortList = document.getElementById('txt-btn-add-short-list');
  if (btnAddShortList) btnAddShortList.textContent = t.btnAddShort;
  const btnAddShortDetail = document.getElementById('txt-btn-add-short-detail');
  if (btnAddShortDetail) btnAddShortDetail.textContent = t.btnAddShort;
  const jTolTitle = document.getElementById('txt-journal-tolerance-title');
  if (jTolTitle) jTolTitle.textContent = t.journalToleranceTitle;
  [
    ['btn-tol-range-7', lang === 'fr' ? '1S' : '1W'],
    ['btn-tol-range-14', lang === 'fr' ? '2S' : '2W'],
    ['btn-tol-range-21', lang === 'fr' ? '3S' : '3W'],
    ['btn-tol-range-30', '1M']
  ].forEach(([id, lbl]) => {
    const b = document.getElementById(id);
    if (b) b.textContent = lbl;
  });
  const jIntTitle = document.getElementById('txt-journal-interactions-title');
  if (jIntTitle) jIntTitle.textContent = t.journalInteractionsTitle;

  document.getElementById('txt-settings-lang-title').textContent = t.settingsLangTitle;
  document.getElementById('txt-settings-bg-title').textContent = t.settingsBgTitle;
  document.getElementById('txt-settings-bg-desc').textContent = t.settingsBgDesc;
  const bgSearchEl = document.getElementById('bg-search-input');
  if (bgSearchEl && t.bgSearchPlaceholder) bgSearchEl.placeholder = t.bgSearchPlaceholder;
  const bgStaticMap = [
    ['bg-sel-clear', lang === 'fr' ? 'Changer' : 'Change'],
    ['txt-bg-lbl-release', lang === 'fr' ? 'Forme (LI / LP)' : 'Form (IR / ER)'],
    ['txt-bg-lbl-roa', lang === 'fr' ? 'Voie & Dosage' : 'ROA & Dose'],
    ['txt-bg-lbl-lp-matrix', lang === 'fr' ? 'Profil de libération prolongée :' : 'Extended-release matrix:'],
    ['txt-bg-lbl-times', lang === 'fr' ? 'Heures de prise quotidiennes' : 'Daily intake times'],
    ['txt-bg-btn-add-time', lang === 'fr' ? '+ Ajouter heure' : '+ Add time'],
    ['txt-bg-lbl-period', lang === 'fr' ? 'Durée du traitement' : 'Treatment duration'],
    ['txt-bg-lbl-start', lang === 'fr' ? 'Date de début' : 'Start date'],
    ['txt-bg-lbl-end', lang === 'fr' ? 'Date de fin' : 'End date'],
    ['bg-cancel-btn', lang === 'fr' ? 'Annuler' : 'Cancel'],
    ['txt-settings-display-title', lang === 'fr' ? 'Affichage, Thème & Accessibilité' : 'Display, Theme & Accessibility'],
    ['txt-settings-display-desc', lang === 'fr' ? "Choisissez la densité d'information et l'ambiance visuelle" : 'Choose information density and visual theme'],
    ['txt-settings-mode-label', lang === 'fr' ? "Mode d'interface" : 'Interface Mode'],
    ['txt-mode-classic-title', lang === 'fr' ? '✨ Classique (RdR)' : '✨ Classic (HR)'],
    ['txt-mode-classic-sub', lang === 'fr' ? 'Complet avec courbes, tolérance et menus dépliants' : 'Full view with curves, tolerance & collapsible menus'],
    ['txt-mode-simplified-title', lang === 'fr' ? '🌿 Simplifié' : '🌿 Simplified'],
    ['txt-mode-simplified-sub', lang === 'fr' ? 'Essentiel, lisible et sans jargon (idéal grand public / seniors)' : 'Essential, clear & jargon-free (ideal for general / senior users)'],
    ['txt-settings-theme-label', lang === 'fr' ? 'Thème visuel' : 'Visual Theme'],
    ['txt-theme-dark', lang === 'fr' ? 'Sombre (Obsidienne)' : 'Dark (Obsidian)'],
    ['txt-theme-light', lang === 'fr' ? 'Clair (Blanc cassé & Beige)' : 'Light (Off-White & Beige)'],
    ['txt-settings-std-curve', lang === 'fr' ? 'Afficher la courbe standard (en pointillés) pour comparer sur le graphique' : 'Show standard reference curve (dashed) on chart'],
    ['txt-chart-tools-summary', lang === 'fr' ? 'Outils du graphique, Zoom X & Profil métabolique' : 'Chart tools, X-Zoom & Metabolic profile'],
    ['txt-stats-breakdown-title', lang === 'fr' ? 'Répartition par catégories & voies' : 'Breakdown by category & route']
  ];
  bgStaticMap.forEach(([id, txt]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  });
  syncThemeAndModeUI();
  document.getElementById('txt-about-title').textContent = t.aboutTitle;
  document.getElementById('txt-about-desc').textContent = t.aboutDesc;
  document.getElementById('txt-about-local').innerHTML = t.aboutLocal(totalSubs);
  document.getElementById('txt-about-offline').textContent = t.aboutOffline;

  document.getElementById('txt-modal-desc-title').textContent = t.modalDescTitle;
  document.getElementById('txt-modal-tiers-title').textContent = t.modalTiersTitle;
  document.getElementById('txt-modal-duration-title').textContent = t.modalDurationTitle;
  document.getElementById('txt-modal-curve-subtitle').textContent = t.modalCurveSubtitle;
  document.getElementById('txt-modal-inter-title').textContent = t.modalInterTitle;
  document.getElementById('modal-log-btn').textContent = t.modalBtnLog;
  document.getElementById('txt-modal-btn-close').textContent = t.modalBtnClose;

  document.getElementById('nav-lbl-stats').textContent = t.navStats;
  document.getElementById('nav-lbl-journal').textContent = t.navJournal;
  document.getElementById('nav-lbl-substances').textContent = t.navSubstances;
  document.getElementById('nav-lbl-settings').textContent = t.navSettings;

  initCategoryPills();
  updateCatalogSortUI();
  initSettingsToggles();
  renderSubstancesList();
  if (currentModalSubstanceName && !document.getElementById('substance-detail-modal').classList.contains('hidden')) {
    showSubstanceDetails(currentModalSubstanceName, selectedModalRoaName);
  }
  if (selectedQuickSubstance) {
    renderQuickRoaPills();
    renderQuickReleasePills();
    updateQuickDoseFields(selectedQuickSubstance, selectedQuickRoa);
  }
  updateSimulationUI();
  renderIngestions();
  drawTimeline();
}

let currentEnzymeGroupFilter = 'ALL';

let bgFormState = {
  editId: null,
  selectedName: null,
  color: '#818cf8',
  route: 'oral',
  releaseMode: 'IR',
  releaseProfileId: 'IR',
  releaseBadgeFr: 'LI',
  releaseBadgeEn: 'IR',
  dose: 10,
  unit: 'mg',
  times: ['08:00'],
  periodType: 'indefinite',
  startDate: '',
  endDate: ''
};

function getBgHabitDisplayName(name) {
  const extra = (typeof BACKGROUND_HABIT_EXTRAS !== 'undefined')
    ? BACKGROUND_HABIT_EXTRAS.find(e => e.name === name)
    : null;
  if (extra) return currentLang === 'fr' ? extra.labelFr : extra.labelEn;
  return name;
}

function formatBgShortDate(isoStr) {
  if (!isoStr || !/^\d{4}-\d{2}-\d{2}$/.test(isoStr)) return isoStr || '';
  const parts = isoStr.split('-');
  const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  const monthsFr = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getDate()} ${(currentLang === 'fr' ? monthsFr : monthsEn)[d.getMonth()]}`;
}

function onBgSearchInput(query) {
  const q = (query || '').trim().toLowerCase();
  const clearBtn = document.getElementById('bg-search-clear');
  if (clearBtn) clearBtn.classList.toggle('hidden', q.length === 0);
  renderBgSearchSuggestions(q);
}

function onBgSearchFocus() {
  const inp = document.getElementById('bg-search-input');
  renderBgSearchSuggestions((inp ? inp.value : '').trim().toLowerCase());
}

function clearBgSearchInput() {
  const inp = document.getElementById('bg-search-input');
  if (inp) {
    inp.value = '';
    inp.focus();
  }
  const clearBtn = document.getElementById('bg-search-clear');
  if (clearBtn) clearBtn.classList.add('hidden');
  renderBgSearchSuggestions('');
}

function renderBgSearchSuggestions(q) {
  const box = document.getElementById('bg-suggestions-box');
  if (!box) return;

  const extraMatches = [];
  if (typeof BACKGROUND_HABIT_EXTRAS !== 'undefined') {
    BACKGROUND_HABIT_EXTRAS.forEach(ex => {
      const hay = `${ex.name} ${ex.labelFr} ${ex.labelEn} ${ex.aliases.join(' ')}`.toLowerCase();
      if (!q || hay.includes(q)) {
        extraMatches.push({
          name: ex.name,
          display: currentLang === 'fr' ? ex.labelFr : ex.labelEn,
          sub: currentLang === 'fr' ? ex.categoryFr : ex.categoryEn,
          color: ex.color,
          isExtra: true
        });
      }
    });
  }

  let subMatches = [];
  if (!q) {
    const frequentNames = ['Lithium', 'Escitalopram', 'Venlafaxine', 'Sertraline', 'Ibuprofen', 'Paracetamol', 'Baclofen', 'Pregabalin', 'Methylphenidate', 'Diazepam'];
    subMatches = frequentNames
      .map(n => SUBSTANCES_BY_NAME[n])
      .filter(s => s && (typeof isBackgroundMedicationSubstance !== 'function' || isBackgroundMedicationSubstance(s)));
  } else if (typeof getSubstanceSearchRank === 'function') {
    const ranked = [];
    for (let i = 0; i < SUBSTANCES_DATA.length; i++) {
      const s = SUBSTANCES_DATA[i];
      if (s.metaboliteMeta && s.metaboliteMeta.directUse === 'endogenous_only') continue;
      if (typeof isBackgroundMedicationSubstance === 'function' && !isBackgroundMedicationSubstance(s)) continue;
      const rank = getSubstanceSearchRank(s, q);
      if (rank > 0) ranked.push({ s, rank });
    }
    ranked.sort((a, b) => (a.rank !== b.rank ? a.rank - b.rank : a.s.name.localeCompare(b.s.name)));
    subMatches = ranked.slice(0, 12).map(x => x.s);
  }

  const rows = [
    ...extraMatches.map(ex => `
      <button type="button" onclick="selectBgSubstance('${ex.name.replace(/'/g, "\\'")}')"
        class="w-full text-left flex items-center justify-between p-2.5 hover:bg-slate-800/75 transition cursor-pointer">
        <span class="flex items-center gap-2 min-w-0">
          <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background-color: ${ex.color};"></span>
          <span class="min-w-0">
            <span class="block text-xs font-bold text-slate-100 truncate">${ex.display}</span>
            <span class="block text-[10px] text-amber-300/80 truncate">${ex.sub}</span>
          </span>
        </span>
        <span class="text-[10px] text-indigo-300 font-semibold flex-shrink-0 ml-2">+</span>
      </button>
    `),
    ...subMatches.map(s => {
      const brand = (s.commonNames && s.commonNames.length > 0) ? s.commonNames.slice(0, 2).join(', ') : '';
      const cat = (s.categories && s.categories[0]) || '';
      const esc = s.name.replace(/'/g, "\\'");
      return `
        <button type="button" onclick="selectBgSubstance('${esc}')"
          class="w-full text-left flex items-center justify-between p-2.5 hover:bg-slate-800/75 transition cursor-pointer">
          <span class="flex items-center gap-2 min-w-0">
            <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background-color: ${s.color || '#818cf8'};"></span>
            <span class="min-w-0">
              <span class="block text-xs font-bold text-slate-100 truncate">${s.name}${brand ? ` <span class="font-normal text-slate-400">(${brand})</span>` : ''}</span>
              ${cat ? `<span class="block text-[10px] text-slate-500 truncate">${cat}</span>` : ''}
            </span>
          </span>
          <span class="text-[10px] text-indigo-300 font-semibold flex-shrink-0 ml-2">+</span>
        </button>
      `;
    })
  ];

  if (rows.length === 0) {
    box.innerHTML = `<div class="p-3 text-center text-xs text-slate-500">${currentLang === 'fr' ? 'Aucun résultat trouvé' : 'No matching result'}</div>`;
  } else {
    box.innerHTML = rows.join('');
  }
  box.classList.remove('hidden');
}

function selectBgSubstance(name, existingItem = null) {
  const s = SUBSTANCES_BY_NAME[name];
  const extra = (typeof BACKGROUND_HABIT_EXTRAS !== 'undefined')
    ? BACKGROUND_HABIT_EXTRAS.find(e => e.name === name)
    : null;
  if (!s && !extra) return;

  bgFormState.editId = existingItem ? existingItem.id : null;
  bgFormState.selectedName = name;
  bgFormState.color = existingItem ? (s ? s.color : (extra ? extra.color : '#818cf8')) : (s ? (s.color || '#818cf8') : extra.color);

  const roas = (s && Array.isArray(s.roas) && s.roas.length > 0)
    ? s.roas
    : [{ name: 'oral', dose: { commonMin: extra ? extra.defaultDose : 50, units: extra ? extra.unit : 'mg' } }];

  const chosenRoaName = (existingItem && existingItem.route) ? existingItem.route : roas[0].name;
  const roaObj = roas.find(r => r.name.toLowerCase() === chosenRoaName.toLowerCase()) || roas[0];
  bgFormState.route = roaObj.name;

  const roaSel = document.getElementById('bg-roa-select');
  if (roaSel) {
    roaSel.innerHTML = roas.map(r => `<option value="${r.name}">${r.name}</option>`).join('');
    roaSel.value = bgFormState.route;
  }

  const defDose = existingItem
    ? existingItem.dose
    : ((roaObj.dose && (roaObj.dose.commonMin || roaObj.dose.lightMin)) || (extra ? extra.defaultDose : 50));
  const defUnit = existingItem
    ? existingItem.unit
    : ((roaObj.dose && roaObj.dose.units) || (extra ? extra.unit : 'mg'));

  bgFormState.dose = defDose;
  bgFormState.unit = defUnit;

  const doseInp = document.getElementById('bg-dose-input');
  const unitEl = document.getElementById('bg-dose-unit');
  if (doseInp) doseInp.value = defDose;
  if (unitEl) unitEl.textContent = defUnit;

  bgFormState.releaseMode = existingItem ? (existingItem.releaseMode || 'IR') : 'IR';
  bgFormState.releaseProfileId = existingItem ? (existingItem.releaseProfileId || 'IR') : 'IR';
  bgFormState.releaseBadgeFr = existingItem ? (existingItem.releaseBadgeFr || 'LI') : 'LI';
  bgFormState.releaseBadgeEn = existingItem ? (existingItem.releaseBadgeEn || 'IR') : 'IR';

  bgFormState.times = existingItem && Array.isArray(existingItem.times) && existingItem.times.length > 0
    ? [...existingItem.times]
    : ['08:00'];
  bgFormState.periodType = existingItem ? (existingItem.periodType || 'indefinite') : 'indefinite';
  bgFormState.startDate = (existingItem && existingItem.startDate) ? existingItem.startDate : formatIsoDateForOffset(0);
  bgFormState.endDate = (existingItem && existingItem.endDate) ? existingItem.endDate : formatIsoDateForOffset(14);

  const dotEl = document.getElementById('bg-sel-dot');
  const nameEl = document.getElementById('bg-sel-name');
  if (dotEl) dotEl.style.backgroundColor = bgFormState.color;
  if (nameEl) nameEl.textContent = getBgHabitDisplayName(name);

  const sugBox = document.getElementById('bg-suggestions-box');
  if (sugBox) sugBox.classList.add('hidden');
  const panel = document.getElementById('bg-config-panel');
  if (panel) panel.classList.remove('hidden');

  const saveBtn = document.getElementById('bg-save-btn');
  if (saveBtn) {
    saveBtn.textContent = bgFormState.editId
      ? (currentLang === 'fr' ? '💾 Mettre à jour ce traitement' : '💾 Update treatment')
      : (currentLang === 'fr' ? '+ Ajouter au traitement de fond' : '+ Add background treatment');
  }

  updateBgReleaseUI();
  renderBgTimeChips();
  setBgPeriodType(bgFormState.periodType);

  const startEl = document.getElementById('bg-start-date');
  const endEl = document.getElementById('bg-end-date');
  if (startEl) startEl.value = bgFormState.startDate;
  if (endEl) endEl.value = bgFormState.endDate;
}

function onBgRoaChange(roaName) {
  if (!bgFormState.selectedName) return;
  bgFormState.route = roaName || 'oral';
  const s = SUBSTANCES_BY_NAME[bgFormState.selectedName];
  if (s && Array.isArray(s.roas)) {
    const rObj = s.roas.find(r => r.name.toLowerCase() === bgFormState.route.toLowerCase());
    if (rObj && rObj.dose) {
      if (!bgFormState.editId && (rObj.dose.commonMin || rObj.dose.lightMin)) {
        bgFormState.dose = rObj.dose.commonMin || rObj.dose.lightMin;
        const doseInp = document.getElementById('bg-dose-input');
        if (doseInp) doseInp.value = bgFormState.dose;
      }
      if (rObj.dose.units) {
        bgFormState.unit = rObj.dose.units;
        const unitEl = document.getElementById('bg-dose-unit');
        if (unitEl) unitEl.textContent = bgFormState.unit;
      }
    }
  }
  updateBgReleaseUI();
}

function updateBgReleaseUI() {
  const btnLi = document.getElementById('bg-btn-li');
  const btnLp = document.getElementById('bg-btn-lp');
  const lpBox = document.getElementById('bg-lp-profile-box');
  const lpSel = document.getElementById('bg-lp-profile-select');

  const activeCls = 'py-1.5 px-2 rounded-lg text-[10.5px] font-bold border border-amber-400 bg-amber-500/20 text-amber-200 cursor-pointer transition';
  const idleCls = 'py-1.5 px-2 rounded-lg text-[10.5px] font-bold border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 cursor-pointer transition';

  if (btnLi) {
    btnLi.className = bgFormState.releaseMode === 'IR' ? activeCls : idleCls;
    btnLi.textContent = currentLang === 'fr' ? 'LI (Immédiate)' : 'IR (Immediate)';
  }
  if (btnLp) {
    btnLp.className = bgFormState.releaseMode === 'ER' ? activeCls : idleCls;
    btnLp.textContent = currentLang === 'fr' ? 'LP (Prolongée)' : 'ER (Extended)';
  }

  const profiles = (typeof getReleaseProfilesFor === 'function' && bgFormState.selectedName)
    ? getReleaseProfilesFor(bgFormState.selectedName, bgFormState.route || 'oral')
    : [];
  const lpProfiles = profiles.filter(p => p.isExtended);

  if (bgFormState.releaseMode === 'ER') {
    if (lpProfiles.length > 0 && lpBox && lpSel) {
      lpSel.innerHTML = lpProfiles.map(p => `<option value="${p.id}">${currentLang === 'fr' ? p.shortFr : p.shortEn}</option>`).join('');
      const found = lpProfiles.find(p => p.id === bgFormState.releaseProfileId) || lpProfiles[0];
      lpSel.value = found.id;
      bgFormState.releaseProfileId = found.id;
      bgFormState.releaseBadgeFr = found.badgeFr || 'LP';
      bgFormState.releaseBadgeEn = found.badgeEn || 'ER';
      lpBox.classList.remove('hidden');
    } else {
      if (lpBox) lpBox.classList.add('hidden');
      bgFormState.releaseProfileId = 'LP_GENERIC';
      bgFormState.releaseBadgeFr = 'LP';
      bgFormState.releaseBadgeEn = 'ER';
    }
  } else {
    if (lpBox) lpBox.classList.add('hidden');
    bgFormState.releaseProfileId = 'IR';
    bgFormState.releaseBadgeFr = 'LI';
    bgFormState.releaseBadgeEn = 'IR';
  }
}

function setBgReleaseMode(mode) {
  bgFormState.releaseMode = mode === 'ER' ? 'ER' : 'IR';
  updateBgReleaseUI();
}

function onBgLpProfileChange(profId) {
  bgFormState.releaseProfileId = profId;
  const profiles = (typeof getReleaseProfilesFor === 'function' && bgFormState.selectedName)
    ? getReleaseProfilesFor(bgFormState.selectedName, bgFormState.route || 'oral')
    : [];
  const p = profiles.find(x => x.id === profId);
  if (p) {
    bgFormState.releaseBadgeFr = p.badgeFr || 'LP';
    bgFormState.releaseBadgeEn = p.badgeEn || 'ER';
  }
}

function renderBgTimeChips() {
  const el = document.getElementById('bg-times-chips');
  if (!el) return;
  el.innerHTML = bgFormState.times.map((t, idx) => `
    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-900 border border-indigo-500/40 text-[11px] font-mono font-bold text-indigo-200">
      <span>🕒 ${t}</span>
      ${bgFormState.times.length > 1 ? `<button type="button" onclick="removeBgIntakeTime(${idx})" class="text-slate-400 hover:text-rose-400 cursor-pointer ml-0.5">✕</button>` : ''}
    </span>
  `).join('');
}

function addBgIntakeTime(timeStr) {
  if (!timeStr || !/^\d{2}:\d{2}$/.test(timeStr)) return;
  if (!bgFormState.times.includes(timeStr)) {
    bgFormState.times.push(timeStr);
    bgFormState.times.sort();
    renderBgTimeChips();
  }
}

function addBgCustomTime() {
  const inp = document.getElementById('bg-time-add-input');
  if (inp && inp.value) addBgIntakeTime(inp.value);
}

function removeBgIntakeTime(idx) {
  if (bgFormState.times.length <= 1) return;
  bgFormState.times.splice(idx, 1);
  renderBgTimeChips();
}

function setBgPeriodType(type) {
  bgFormState.periodType = type === 'limited' ? 'limited' : 'indefinite';
  const btnIndef = document.getElementById('bg-btn-period-indefinite');
  const btnLim = document.getElementById('bg-btn-period-limited');
  const datesRow = document.getElementById('bg-dates-row');

  const actCls = 'py-1.5 px-2.5 rounded-lg text-[10.5px] font-bold border border-indigo-500 bg-indigo-600/25 text-indigo-200 cursor-pointer transition';
  const idleCls = 'py-1.5 px-2.5 rounded-lg text-[10.5px] font-bold border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 cursor-pointer transition';

  if (btnIndef) {
    btnIndef.className = bgFormState.periodType === 'indefinite' ? actCls : idleCls;
    btnIndef.textContent = currentLang === 'fr' ? '∞ Durée indéfinie' : '∞ Indefinite';
  }
  if (btnLim) {
    btnLim.className = bgFormState.periodType === 'limited' ? actCls : idleCls;
    btnLim.textContent = currentLang === 'fr' ? '📅 Période définie' : '📅 Date range';
  }
  if (datesRow) {
    datesRow.classList.toggle('hidden', bgFormState.periodType !== 'limited');
  }
}

function resetBgTreatmentForm() {
  bgFormState.editId = null;
  bgFormState.selectedName = null;
  const panel = document.getElementById('bg-config-panel');
  if (panel) panel.classList.add('hidden');
  const sugBox = document.getElementById('bg-suggestions-box');
  if (sugBox) sugBox.classList.add('hidden');
  const inp = document.getElementById('bg-search-input');
  if (inp) inp.value = '';
  const clearBtn = document.getElementById('bg-search-clear');
  if (clearBtn) clearBtn.classList.add('hidden');
}

function saveBgTreatment() {
  if (!bgFormState.selectedName) return;
  const doseInp = document.getElementById('bg-dose-input');
  const doseVal = doseInp ? parseFloat(doseInp.value) : bgFormState.dose;
  const cleanDose = (!isNaN(doseVal) && doseVal > 0) ? doseVal : bgFormState.dose;

  const startEl = document.getElementById('bg-start-date');
  const endEl = document.getElementById('bg-end-date');
  const startDate = (startEl && startEl.value) ? startEl.value : (bgFormState.startDate || formatIsoDateForOffset(0));
  const endDate = bgFormState.periodType === 'limited'
    ? ((endEl && endEl.value) ? endEl.value : (bgFormState.endDate || formatIsoDateForOffset(14)))
    : '';

  const entry = {
    id: bgFormState.editId || Date.now(),
    name: bgFormState.selectedName,
    route: bgFormState.route || 'oral',
    releaseMode: bgFormState.releaseMode || 'IR',
    releaseProfileId: bgFormState.releaseProfileId || 'IR',
    releaseBadgeFr: bgFormState.releaseBadgeFr || (bgFormState.releaseMode === 'ER' ? 'LP' : 'LI'),
    releaseBadgeEn: bgFormState.releaseBadgeEn || (bgFormState.releaseMode === 'ER' ? 'ER' : 'IR'),
    dose: cleanDose,
    unit: bgFormState.unit || 'mg',
    times: bgFormState.times.length > 0 ? [...bgFormState.times] : ['08:00'],
    periodType: bgFormState.periodType || 'indefinite',
    startDate,
    endDate,
    enabled: true
  };

  if (bgFormState.editId) {
    const idx = backgroundTreatments.findIndex(t => t.id === bgFormState.editId);
    if (idx !== -1) {
      entry.enabled = backgroundTreatments[idx].enabled;
      backgroundTreatments[idx] = entry;
    } else {
      backgroundTreatments.unshift(entry);
    }
  } else {
    backgroundTreatments.unshift(entry);
  }

  resetBgTreatmentForm();
  syncBackgroundSettingsFromTreatments();
  initSettingsToggles();
  if (typeof onQuickSubstanceChange === 'function') onQuickSubstanceChange();
  if (typeof refreshPKProfileAndRedraw === 'function') refreshPKProfileAndRedraw();
  if (typeof renderIngestions === 'function') renderIngestions();
}

function editBgTreatment(id) {
  const tr = backgroundTreatments.find(t => t.id === id);
  if (!tr) return;
  selectBgSubstance(tr.name, tr);
}

function deleteBgTreatment(id) {
  const idx = backgroundTreatments.findIndex(t => t.id === id);
  if (idx === -1) return;
  backgroundTreatments.splice(idx, 1);
  if (bgFormState.editId === id) resetBgTreatmentForm();
  syncBackgroundSettingsFromTreatments();
  initSettingsToggles();
  if (typeof onQuickSubstanceChange === 'function') onQuickSubstanceChange();
  if (typeof refreshPKProfileAndRedraw === 'function') refreshPKProfileAndRedraw();
  if (typeof renderIngestions === 'function') renderIngestions();
}

function toggleBgTreatmentEnabled(id, isEnabled) {
  const tr = backgroundTreatments.find(t => t.id === id);
  if (!tr) return;
  tr.enabled = Boolean(isEnabled);
  syncBackgroundSettingsFromTreatments();
  initSettingsToggles();
  if (typeof onQuickSubstanceChange === 'function') onQuickSubstanceChange();
  if (typeof refreshPKProfileAndRedraw === 'function') refreshPKProfileAndRedraw();
  if (typeof renderIngestions === 'function') renderIngestions();
}

function initSettingsToggles() {
  const container = document.getElementById('settings-toggles');
  if (!container) return;

  if (typeof syncBackgroundSettingsFromTreatments === 'function') {
    syncBackgroundSettingsFromTreatments();
  }

  container.innerHTML = '';
  if (!Array.isArray(backgroundTreatments) || backgroundTreatments.length === 0) {
    container.innerHTML = `<div class="text-center py-4 text-xs text-slate-500 bg-slate-950/60 border border-slate-800/80 rounded-xl">${currentLang === 'fr' ? 'Aucun traitement ou habitude de fond configuré.' : 'No background medication or habit configured.'}</div>`;
    initPKSettingsUI();
    return;
  }

  const fragment = document.createDocumentFragment();
  backgroundTreatments.forEach(tr => {
    const s = SUBSTANCES_BY_NAME[tr.name];
    const extra = (typeof BACKGROUND_HABIT_EXTRAS !== 'undefined')
      ? BACKGROUND_HABIT_EXTRAS.find(e => e.name === tr.name)
      : null;
    const col = (s && s.color) ? s.color : (extra ? extra.color : '#818cf8');
    const relBadge = currentLang === 'fr' ? (tr.releaseBadgeFr || 'LI') : (tr.releaseBadgeEn || 'IR');
    const timesStr = (tr.times && tr.times.length > 0) ? tr.times.join(' · ') : '08:00';
    const isLimited = tr.periodType === 'limited';
    const periodStr = isLimited
      ? `📅 ${formatBgShortDate(tr.startDate)} → ${formatBgShortDate(tr.endDate)}`
      : (currentLang === 'fr' ? '∞ Durée indéfinie' : '∞ Indefinite');
    const isActiveToday = isBackgroundTreatmentActiveOnDay(tr, selectedJournalDayOffset);

    const row = document.createElement('div');
    row.className = `flex items-stretch gap-2.5 p-2.5 rounded-xl bg-slate-950 border transition ${tr.enabled ? (isActiveToday ? 'border-slate-800' : 'border-slate-800/60 opacity-80') : 'border-slate-900 opacity-55'}`;
    row.innerHTML = `
      <span class="w-1.5 rounded-full flex-shrink-0 my-0.5" style="background-color: ${col};"></span>
      <div class="min-w-0 flex-1 space-y-1">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-1.5 min-w-0 flex-wrap">
            <span class="text-xs font-bold text-slate-100 truncate">${getBgHabitDisplayName(tr.name)}</span>
            <span class="text-[9.5px] px-1.5 py-0.5 rounded font-bold border ${tr.releaseMode === 'ER' ? 'bg-amber-950/80 border-amber-500/50 text-amber-300' : 'bg-slate-900 border-slate-700 text-slate-300'}">${relBadge}</span>
            <span class="text-[10.5px] font-mono font-bold text-indigo-300">${tr.dose} ${tr.unit}</span>
          </div>
          <input type="checkbox" ${tr.enabled ? 'checked' : ''} onchange="toggleBgTreatmentEnabled(${tr.id}, this.checked)"
            class="w-4 h-4 rounded text-indigo-600 focus:ring-0 bg-slate-900 border-slate-700 cursor-pointer flex-shrink-0">
        </div>
        <div class="flex items-center justify-between gap-2 flex-wrap text-[10px] text-slate-400">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-mono text-slate-300">🕒 ${timesStr}</span>
            <span class="${isLimited ? 'text-cyan-300' : 'text-emerald-300/90'} font-medium">${periodStr}</span>
            ${tr.enabled && !isActiveToday ? `<span class="text-[9px] px-1 py-0.2 rounded bg-slate-800 text-slate-400">${currentLang === 'fr' ? 'Hors période du jour' : 'Outside day range'}</span>` : ''}
          </div>
          <div class="flex items-center gap-1 flex-shrink-0">
            <button type="button" onclick="editBgTreatment(${tr.id})" class="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white cursor-pointer" title="${currentLang === 'fr' ? 'Modifier' : 'Edit'}">✎</button>
            <button type="button" onclick="deleteBgTreatment(${tr.id})" class="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-rose-950/70 border border-slate-800 text-slate-400 hover:text-rose-300 cursor-pointer" title="${currentLang === 'fr' ? 'Supprimer' : 'Delete'}">✕</button>
          </div>
        </div>
      </div>
    `;
    fragment.appendChild(row);
  });

  container.appendChild(fragment);
  initPKSettingsUI();
}

function toggleSetting(key, isEnabled) {
  if (isEnabled) enabledSettings.add(key);
  else enabledSettings.delete(key);
  onQuickSubstanceChange();
  refreshPKProfileAndRedraw();
}

function syncThemeAndModeUI() {
  const isLight = typeof appTheme !== 'undefined' && appTheme === 'light';
  const isSimplified = typeof uiViewMode !== 'undefined' && uiViewMode === 'simplified';

  if (document.documentElement && document.documentElement.classList) {
    document.documentElement.classList.toggle('dark', !isLight);
    document.documentElement.classList.toggle('theme-light', isLight);
    document.documentElement.classList.toggle('mode-simplified', isSimplified);
  }

  const themeIcon = document.getElementById('theme-toggle-icon');
  if (themeIcon) {
    themeIcon.textContent = isLight ? '🌙' : '☀️';
  }
  const btnDark = document.getElementById('btn-theme-dark');
  const btnLight = document.getElementById('btn-theme-light');
  if (btnDark && btnLight) {
    const activeThemeCls = 'py-2 px-3 rounded-xl border border-indigo-500 bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer';
    const inactiveThemeCls = 'py-2 px-3 rounded-xl border border-slate-700 bg-slate-950 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer';
    btnDark.className = !isLight ? activeThemeCls : inactiveThemeCls;
    btnLight.className = isLight ? activeThemeCls : inactiveThemeCls;
  }

  const modeIcon = document.getElementById('mode-toggle-icon');
  const modeLabel = document.getElementById('mode-toggle-label');
  if (modeIcon) modeIcon.textContent = isSimplified ? '🌿' : '✨';
  if (modeLabel) {
    modeLabel.textContent = isSimplified
      ? (currentLang === 'fr' ? 'Simplifié' : 'Simplified')
      : (currentLang === 'fr' ? 'Classique' : 'Classic');
  }

  const btnClassic = document.getElementById('btn-mode-classic');
  const btnSimp = document.getElementById('btn-mode-simplified');
  if (btnClassic && btnSimp) {
    const activeModeCls = 'p-2.5 rounded-xl border border-indigo-500 bg-indigo-600/20 text-left transition cursor-pointer';
    const inactiveModeCls = 'p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-left hover:border-slate-700 transition cursor-pointer';
    btnClassic.className = !isSimplified ? activeModeCls : inactiveModeCls;
    btnSimp.className = isSimplified ? activeModeCls : inactiveModeCls;
  }
}

function setAppTheme(theme) {
  appTheme = theme === 'light' ? 'light' : 'dark';
  syncThemeAndModeUI();
  if (typeof drawTimeline === 'function') drawTimeline();
  if (typeof lastModalCurveContext !== 'undefined' && lastModalCurveContext && lastModalCurveContext.substance) {
    drawModalTheoreticalCurve(lastModalCurveContext.substance, lastModalCurveContext.activeRoaName, true);
  }
}

function toggleTheme() {
  setAppTheme((typeof appTheme !== 'undefined' && appTheme === 'light') ? 'dark' : 'light');
}

function setUiViewMode(mode) {
  uiViewMode = mode === 'simplified' ? 'simplified' : 'classic';
  if (uiViewMode === 'simplified') {
    if (typeof showMetaboliteCurves !== 'undefined' && showMetaboliteCurves && typeof toggleMetaboliteCurves === 'function') {
      toggleMetaboliteCurves(false);
    }
    if (typeof showModalMetaboliteCurves !== 'undefined' && showModalMetaboliteCurves && typeof toggleModalMetaboliteCurves === 'function') {
      toggleModalMetaboliteCurves(false);
    }
    if (typeof catalogSortOrder !== 'undefined' && catalogSortOrder === 'potency' && typeof setCatalogSortOrder === 'function') {
      setCatalogSortOrder('alpha');
    }
  }
  syncThemeAndModeUI();
  if (typeof renderIngestions === 'function') renderIngestions();
  if (typeof drawTimeline === 'function') drawTimeline();
}

function toggleUiViewMode() {
  setUiViewMode((typeof uiViewMode !== 'undefined' && uiViewMode === 'simplified') ? 'classic' : 'simplified');
}

function initPKSettingsUI() {
  if (typeof ENZYME_CATALOG === 'undefined' || typeof SUBSTANCE_PK_DB === 'undefined') return;

  const calSel = document.getElementById('cal-substance-select');
  if (calSel && calSel.options.length === 0) {
    const priorityNames = [
      'Oxycodone', 'Morphine', 'Tramadol', 'Codeine', 'Hydromorphone',
      'Pregabalin', 'Gabapentin', 'Baclofen', 'Lithium',
      'Alprazolam', 'Diazepam', 'Clonazepam', 'Lorazepam', 'Oxazepam', 'Bromazepam', 'Zolpidem', 'Zopiclone',
      'Methylphenidate', 'Lisdexamfetamine', 'Amphetamine', 'Modafinil', 'Caffeine',
      'Paracetamol', 'Ibuprofen', 'Ketoprofen', 'Naproxen', 'Diclofenac',
      'Venlafaxine', 'Fluoxetine', 'Paroxetine', 'Escitalopram', 'Sertraline', 'Bupropion',
      'Quetiapine', 'Olanzapine', 'Risperidone', 'Aripiprazole', 'Lamotrigine', 'Valproate',
      'Ketamine', 'MDMA', 'LSD', 'Cannabis'
    ];
    const allVerified = Object.keys(SUBSTANCE_PK_DB).sort((a, b) => a.localeCompare(b));
    const ordered = [...new Set([...priorityNames, ...allVerified])];

    const frag = document.createDocumentFragment();
    ordered.forEach(name => {
      if (!SUBSTANCES_BY_NAME[name]) return;
      const stdH = getStandardSubstanceDurationHours(name, 'oral');
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = `${name} (standard : ~${stdH}h)`;
      frag.appendChild(opt);
    });
    calSel.appendChild(frag);
    calSel.value = 'Oxycodone';
  }

  onCalibrationSubstanceChange();
  renderEmpiricalCalibrationsList();
  renderRenalStatusUI();
  renderEnzymeSettingsList();
  updateJournalPKBanner();
}

function onCalSearchInput(query) {
  const box = document.getElementById('cal-suggestions-box');
  const clearBtn = document.getElementById('cal-search-clear');
  if (!box) return;

  const q = (query || '').trim().toLowerCase();
  if (clearBtn) {
    if (q.length > 0) clearBtn.classList.remove('hidden');
    else clearBtn.classList.add('hidden');
  }

  const allSubstances = (DATASETS[currentLang] && DATASETS[currentLang].substances)
    ? DATASETS[currentLang].substances
    : (SUBSTANCES_DATA || []);
  const verifiedNames = Object.keys(SUBSTANCE_PK_DB);

  let matches = [];
  if (q.length === 0) {
    const priority = ['Oxycodone', 'Alprazolam', 'Tramadol', 'Codeine', 'Diazepam', 'Zolpidem', 'Methylphenidate', 'Pregabalin', 'Morphine', 'Caffeine', 'Ketamine', 'Venlafaxine'];
    matches = priority.map(n => SUBSTANCES_BY_NAME[n]).filter(Boolean);
  } else {
    const rankedMatches = allSubstances
      .map(s => ({ s, rank: getSubstanceSearchRank(s, query) }))
      .filter(item => item.rank > 0);

    rankedMatches.sort((a, b) => {
      if (a.rank !== b.rank) return a.rank - b.rank;
      const aVer = verifiedNames.includes(a.s.name) ? 0 : 1;
      const bVer = verifiedNames.includes(b.s.name) ? 0 : 1;
      if (aVer !== bVer) return aVer - bVer;
      return a.s.name.localeCompare(b.s.name);
    });
    matches = rankedMatches.slice(0, 14).map(item => item.s);
  }

  if (matches.length === 0) {
    box.innerHTML = `<div class="px-3 py-2 text-xs text-slate-400 italic">Aucune molécule trouvée pour "${query}"</div>`;
    box.classList.remove('hidden');
    return;
  }

  box.innerHTML = matches.map(s => {
    const stdH = getStandardSubstanceDurationHours(s.name, 'oral');
    const pk = getSubstancePKProfile(s.name);
    const brands = (s.commonNames && s.commonNames.length > 0) ? ` (${s.commonNames.slice(0, 2).join(', ')})` : '';
    const enzSummary = (pk && pk.verified && pk.pathways)
      ? Object.entries(pk.pathways).map(([k, v]) => `${k} ${Math.round(v * 100)}%`).join(' • ')
      : 'Voie enzymatique non établie';
    const safeName = s.name.replace(/'/g, "\\'");

    return `
      <button type="button" onclick="openQuickCalibrateModal('${safeName}')"
        class="w-full text-left px-3 py-2 hover:bg-indigo-950/80 transition flex items-center justify-between gap-2 cursor-pointer border-b border-slate-800/60 last:border-0">
        <div class="min-w-0">
          <div class="text-xs font-bold text-white truncate flex items-center gap-1.5">
            <span>${s.name}</span>
            <span class="text-slate-400 font-normal text-[10.5px]">${brands}</span>
          </div>
          <div class="text-[9.5px] text-indigo-300 font-mono truncate">${enzSummary}</div>
        </div>
        <span class="text-[10px] font-mono font-bold px-2 py-1 rounded-lg bg-indigo-600/30 border border-indigo-400/40 text-indigo-200 flex-shrink-0">
          ⏱ Entrer durée ➔
        </span>
      </button>
    `;
  }).join('');

  box.classList.remove('hidden');
}

function onCalSearchFocus() {
  const input = document.getElementById('cal-search-input');
  onCalSearchInput(input ? input.value : '');
}

function clearCalSearchInput() {
  const input = document.getElementById('cal-search-input');
  const box = document.getElementById('cal-suggestions-box');
  const clearBtn = document.getElementById('cal-search-clear');
  if (input) input.value = '';
  if (box) box.classList.add('hidden');
  if (clearBtn) clearBtn.classList.add('hidden');
}

function selectCalibrationSubstance(name) {
  const calSel = document.getElementById('cal-substance-select');
  const box = document.getElementById('cal-suggestions-box');
  const input = document.getElementById('cal-search-input');
  const clearBtn = document.getElementById('cal-search-clear');

  if (calSel) {

    let exists = Array.from(calSel.options).some(o => o.value === name);
    if (!exists) {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      calSel.appendChild(opt);
    }
    calSel.value = name;
  }
  if (input) input.value = name;
  if (clearBtn) clearBtn.classList.remove('hidden');
  if (box) box.classList.add('hidden');

  onCalibrationSubstanceChange();
}

function adjustCalHours(delta) {
  const hrsInput = document.getElementById('cal-hours-input');
  if (!hrsInput) return;
  const cur = parseFloat(hrsInput.value) || 3.0;
  const next = Math.max(0.25, Math.min(48, Number((cur + delta).toFixed(2))));
  hrsInput.value = next;
  updateCalPresetHighlight(next);
}

function setCalPresetHours(h) {
  const hrsInput = document.getElementById('cal-hours-input');
  if (hrsInput) hrsInput.value = h;
  updateCalPresetHighlight(h);
}

function onCalHoursInputChanged(val) {
  const num = parseFloat(val);
  if (!isNaN(num)) {
    updateCalPresetHighlight(num);
  }
}

function updateCalPresetHighlight(h) {
  document.querySelectorAll('#cal-hours-presets button').forEach(btn => {
    const val = parseFloat(btn.textContent.trim().split('h')[0]);
    if (Math.abs(val - h) < 0.1) {
      btn.className = 'cal-preset-chip px-2.5 py-1 rounded-lg text-[10.5px] font-mono font-bold bg-indigo-600 border border-indigo-400 text-white shadow-sm transition';
    } else {
      btn.className = 'cal-preset-chip px-2.5 py-1 rounded-lg text-[10.5px] font-mono font-semibold bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition';
    }
  });
}

function renderCalPresetsForSubstance(name, selectedH) {
  const container = document.getElementById('cal-hours-presets');
  if (!container) return;

  const stdH = getStandardSubstanceDurationHours(name, 'oral');
  const rawPresets = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0, 6.0, 8.0, 10.0, 12.0, 16.0, 24.0];
  const filtered = rawPresets.filter(h => h >= Math.max(0.5, stdH * 0.35) && h <= Math.min(36, stdH * 2.2));
  if (!filtered.includes(stdH)) filtered.push(stdH);
  if (selectedH && !filtered.includes(selectedH)) filtered.push(selectedH);
  filtered.sort((a, b) => a - b);

  container.innerHTML = filtered.map(h => {
    const isCur = Math.abs(selectedH - h) < 0.1;
    const isStd = Math.abs(stdH - h) < 0.1;
    const label = `${h}h${isStd ? ' (std)' : ''}`;
    return `
      <button type="button" onclick="setCalPresetHours(${h})"
        class="cal-preset-chip px-2.5 py-1 rounded-lg text-[10.5px] font-mono transition ${isCur
          ? 'font-bold bg-indigo-600 border border-indigo-400 text-white shadow-sm'
          : (isStd ? 'font-semibold bg-slate-800 border border-slate-600 text-slate-200' : 'font-semibold bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700')
        }">
        ${label}
      </button>
    `;
  }).join('');
}

function onCalibrationSubstanceChange() {
  const calSel = document.getElementById('cal-substance-select');
  const nameBadge = document.getElementById('cal-selected-name-badge');
  const stdHint = document.getElementById('cal-std-hint');
  const preview = document.getElementById('cal-pathway-preview');
  const hrsInput = document.getElementById('cal-hours-input');
  if (!calSel) return;

  const name = calSel.value || 'Oxycodone';
  const s = SUBSTANCES_BY_NAME[name];
  const brand = (s && s.commonNames && s.commonNames[0]) ? ` (${s.commonNames[0]})` : '';
  const stdH = getStandardSubstanceDurationHours(name, 'oral');

  if (nameBadge) {
    nameBadge.textContent = `${name}${brand}`;
  }
  if (stdHint) {
    stdHint.textContent = currentLang === 'fr'
      ? `Durée standard à jeun : ~${stdH}h`
      : `Standard fasting duration: ~${stdH}h`;
  }

  const existing = (patientPKProfile.empiricalCalibrations || []).find(c => c.substanceName === name);
  const targetVal = existing ? existing.observedHours : (name === 'Oxycodone' ? 3.0 : stdH);
  if (hrsInput) {
    hrsInput.value = targetVal;
  }
  renderCalPresetsForSubstance(name, targetVal);

  if (preview) {
    const pk = getSubstancePKProfile(name);
    if (pk && pk.verified && pk.pathways) {
      const parts = Object.entries(pk.pathways)
        .map(([enz, fm]) => `<span class="text-indigo-300 font-mono font-semibold">${enz} (${Math.round(fm * 100)}%)</span>`)
        .join(' + ');
      preview.innerHTML = `${currentLang === 'fr' ? 'Enzymes évaluées par cette molécule :' : 'Enzymes probed by this substance:'} ${parts}`;
    } else {
      preview.textContent = currentLang === 'fr'
        ? 'Voie enzymatique humaine non établie scientifiquement (ajustera uniquement cette molécule).'
        : 'Human enzymatic pathway not scientifically established (will adjust only this substance).';
    }
  }
}

function addOrUpdateEmpiricalCalibration() {
  const calSel = document.getElementById('cal-substance-select');
  const hrsInput = document.getElementById('cal-hours-input');
  if (!calSel || !hrsInput) return;

  const name = calSel.value || 'Oxycodone';
  const obsH = Math.max(0.25, Math.min(72, parseFloat(hrsInput.value) || 3.0));
  const stdH = getStandardSubstanceDurationHours(name, 'oral');

  const idx = patientPKProfile.empiricalCalibrations.findIndex(c => c.substanceName === name);
  const entry = {
    id: Date.now(),
    substanceName: name,
    route: 'oral',
    observedHours: obsH,
    stdHours: stdH
  };

  if (idx !== -1) {
    patientPKProfile.empiricalCalibrations[idx] = entry;
  } else {
    patientPKProfile.empiricalCalibrations.push(entry);
  }

  refreshPKProfileAndRedraw();
}

function removeEmpiricalCalibration(substanceName) {
  patientPKProfile.empiricalCalibrations = (patientPKProfile.empiricalCalibrations || []).filter(
    c => c.substanceName !== substanceName
  );
  refreshPKProfileAndRedraw();
}

function applyQuickOxy3hDemo() {
  const stdH = getStandardSubstanceDurationHours('Oxycodone', 'oral');
  const existingIdx = patientPKProfile.empiricalCalibrations.findIndex(c => c.substanceName === 'Oxycodone');
  const entry = {
    id: Date.now(),
    substanceName: 'Oxycodone',
    route: 'oral',
    observedHours: 3.0,
    stdHours: stdH
  };

  if (existingIdx !== -1) {
    patientPKProfile.empiricalCalibrations[existingIdx] = entry;
  } else {
    patientPKProfile.empiricalCalibrations.unshift(entry);
  }

  const hasOxy = ingestions.some(i => i.substanceName === 'Oxycodone');
  if (!hasOxy) {
    const nowTs = getNowTime() - 15 * 60000;
    ingestions.unshift({
      id: Date.now() + 1,
      substanceName: 'Oxycodone',
      dose: 20,
      unit: 'mg',
      route: 'oral',
      releaseProfileId: 'IR',
      timeOffsetMinutes: -15,
      timestamp: nowTs,
      intakes: [{ dose: 20, timeOffsetMinutes: -15, timestamp: nowTs }]
    });
  }

  selectCalibrationSubstance('Oxycodone');
  const hrsInput = document.getElementById('cal-hours-input');
  if (hrsInput) hrsInput.value = '3.0';

  refreshPKProfileAndRedraw();
}

function renderEmpiricalCalibrationsList() {
  const listEl = document.getElementById('empirical-calibrations-list');
  const summaryEl = document.getElementById('inferred-enzymes-summary');
  if (!listEl) return;

  const cals = patientPKProfile.empiricalCalibrations || [];
  if (cals.length === 0) {
    listEl.innerHTML = `
      <div class="text-[10.5px] text-slate-500 italic text-center py-1">
        ${currentLang === 'fr'
          ? 'Aucune molécule étalonnée pour le moment. Cherchez une molécule ci-dessus et indiquez sa durée ressentie à jeun.'
          : 'No calibrated molecule yet. Search a substance above and enter its felt fasting duration.'}
      </div>
    `;
    if (summaryEl) summaryEl.classList.add('hidden');
    return;
  }

  listEl.innerHTML = `
    <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-1">
      Molécules validées à jeun (${cals.length}) :
    </div>
  ` + cals.map(c => {
    const pk = getSubstancePKProfile(c.substanceName);
    const enzList = (pk && pk.verified && pk.pathways)
      ? Object.entries(pk.pathways).map(([k, v]) => `${k} (${Math.round(v * 100)}%)`).join(', ')
      : '';
    const diffPct = Math.round(((c.observedHours - c.stdHours) / Math.max(0.25, c.stdHours)) * 100);
    const diffStr = diffPct <= -5 ? `${diffPct}% plus court` : (diffPct >= 5 ? `+${diffPct}% plus long` : 'Durée standard');
    const safeName = c.substanceName.replace(/'/g, "\\'");

    return `
      <div class="flex items-center justify-between bg-slate-950/90 border border-indigo-500/40 rounded-xl px-3 py-2 text-xs">
        <div class="min-w-0 cursor-pointer flex-1 mr-2" onclick="openQuickCalibrateModal('${safeName}')" title="Cliquer pour ajuster la durée">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="font-bold text-white hover:text-indigo-300 transition">🎯 ${c.substanceName}</span>
            <span class="font-mono font-bold text-emerald-300">${c.observedHours}h à jeun</span>
            <span class="text-[10px] text-slate-400 font-mono">(vs ${c.stdHours}h std • ${diffStr})</span>
          </div>
          ${enzList ? `<div class="text-[9.5px] text-indigo-300/90 mt-0.5">Voies sollicitées : ${enzList}</div>` : ''}
        </div>
        <div class="flex items-center gap-1.5 flex-shrink-0">
          <button type="button" onclick="openQuickCalibrateModal('${safeName}')"
            class="px-2 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-400/50 text-indigo-200 hover:text-white font-bold text-[10px] transition" title="Modifier la durée">
            Modifier ✎
          </button>
          <button type="button" onclick="removeEmpiricalCalibration('${safeName}')"
            class="p-1 text-slate-400 hover:text-rose-400 transition" title="Supprimer">✕</button>
        </div>
      </div>
    `;
  }).join('');

  if (summaryEl && typeof deduceGeneticMutationsReport === 'function') {
    const report = deduceGeneticMutationsReport();
    if (report.deductions && report.deductions.length > 0) {
      summaryEl.classList.remove('hidden');

      const cardsHtml = report.deductions.map(d => {
        const barW = Math.max(8, Math.min(100, Math.round((d.pct / 250) * 100)));
        return `
          <div class="bg-slate-950/90 border border-slate-800 rounded-xl p-2.5 space-y-1.5">
            <div class="flex items-center justify-between gap-1.5 flex-wrap">
              <span class="font-bold text-white text-xs">${d.code} <span class="text-[10px] font-normal text-slate-400">— ${currentLang === 'fr' ? d.nameFr : d.nameEn}</span></span>
              <span class="px-2 py-0.5 rounded-md border font-mono font-bold text-[10px] ${d.badgeColor}">
                ${currentLang === 'fr' ? d.copyStatusFr : d.copyStatusEn} • ${d.pct}%
              </span>
            </div>
            <div class="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
              <div class="h-full ${d.barColor} rounded-full transition-all" style="width: ${barW}%"></div>
            </div>
            <div class="text-[10px] text-slate-300 leading-snug">
              <strong>Mutation / Phénotype déduit :</strong> ${currentLang === 'fr' ? d.mutationHypothesisFr : d.mutationHypothesisEn}
            </div>
            <div class="text-[9.5px] text-indigo-300/90 font-mono">
              ${currentLang === 'fr' ? d.confidenceFr : d.confidenceEn}
            </div>
          </div>
        `;
      }).join('');

      let probeSuggestionHtml = '';
      if (report.suggestedProbes && report.suggestedProbes.length > 0) {
        const probeChips = report.suggestedProbes.map(sp => {
          const btns = sp.molecules.map(m => {
            const safeM = m.replace(/'/g, "\\'");
            return `<button type="button" onclick="selectCalibrationSubstance('${safeM}')" class="underline text-amber-300 hover:text-white font-bold mx-0.5">${m}</button>`;
          }).join(' ou ');
          return `<span>pour isoler <strong>${sp.enzymeId}</strong> : renseignez ${btns}</span>`;
        }).join(' ; ');

        probeSuggestionHtml = `
          <div class="bg-slate-900/90 border border-indigo-500/30 rounded-xl p-2 text-[10px] text-slate-300">
            💡 <strong>Affiner le recoupement génétique :</strong> Plus vous indiquez de molécules (prises à jeun), plus le moteur isole précisément quelle enzyme est mutée (${probeChips}).
          </div>
        `;
      }

      summaryEl.innerHTML = `
        <div class="flex items-center justify-between flex-wrap gap-1">
          <div class="font-bold text-indigo-300 text-xs flex items-center gap-1.5">
            <span>🧬</span>
            <span>Bilan Génétique & Intensités Enzymatiques Déduites :</span>
          </div>
          <span class="text-[9.5px] font-mono text-emerald-300">Adaptation auto de toutes les molécules</span>
        </div>
        <div class="space-y-1.5">${cardsHtml}</div>
        ${probeSuggestionHtml}
      `;
    } else {
      summaryEl.classList.add('hidden');
    }
  }
}

function setRenalMode(mode) {
  patientPKProfile.renal.mode = mode;
  const presetPanel = document.getElementById('renal-preset-panel');
  const creatPanel = document.getElementById('renal-creatinine-panel');
  const btnPreset = document.getElementById('btn-renal-mode-preset');
  const btnCreat = document.getElementById('btn-renal-mode-creat');

  if (mode === 'creatinine') {
    if (presetPanel) presetPanel.classList.add('hidden');
    if (creatPanel) creatPanel.classList.remove('hidden');
    if (btnCreat) btnCreat.className = 'py-1.5 px-2 rounded-lg text-[10.5px] font-bold transition bg-cyan-600 text-white';
    if (btnPreset) btnPreset.className = 'py-1.5 px-2 rounded-lg text-[10.5px] font-medium transition text-slate-400 hover:text-white';
    onRenalBloodInput();
  } else {
    if (presetPanel) presetPanel.classList.remove('hidden');
    if (creatPanel) creatPanel.classList.add('hidden');
    if (btnPreset) btnPreset.className = 'py-1.5 px-2 rounded-lg text-[10.5px] font-bold transition bg-cyan-600 text-white';
    if (btnCreat) btnCreat.className = 'py-1.5 px-2 rounded-lg text-[10.5px] font-medium transition text-slate-400 hover:text-white';
    refreshPKProfileAndRedraw();
  }
}

function setRenalPresetGFR(gfr) {
  patientPKProfile.renal.mode = 'preset';
  patientPKProfile.renal.presetGFR = parseInt(gfr, 10) || 100;
  refreshPKProfileAndRedraw();
}

function onRenalUnitChange(unit) {
  const input = document.getElementById('renal-creatinine-input');
  const oldUnit = patientPKProfile.renal.creatinineUnit;
  patientPKProfile.renal.creatinineUnit = unit;

  if (input && input.value) {
    const val = parseFloat(input.value);
    if (oldUnit === 'umol' && unit === 'mgdl') {
      input.step = '0.05';
      input.value = (val / 88.42).toFixed(2);
    } else if (oldUnit === 'mgdl' && unit === 'umol') {
      input.step = '1';
      input.value = Math.round(val * 88.42);
    }
  }
  onRenalBloodInput();
}

function onRenalBloodInput() {
  const creatInput = document.getElementById('renal-creatinine-input');
  const unitSel = document.getElementById('renal-creatinine-unit');
  const ageInput = document.getElementById('renal-age-input');
  const sexSel = document.getElementById('renal-sex-select');

  patientPKProfile.renal.mode = 'creatinine';
  patientPKProfile.renal.creatinineValue = creatInput ? parseFloat(creatInput.value) : 82;
  patientPKProfile.renal.creatinineUnit = unitSel ? unitSel.value : 'umol';
  patientPKProfile.renal.age = ageInput ? parseInt(ageInput.value, 10) || 30 : 30;
  patientPKProfile.renal.sex = sexSel ? sexSel.value : 'M';

  refreshPKProfileAndRedraw();
}

function renderRenalStatusUI() {
  const status = getPatientRenalStatus();
  const badge = document.getElementById('renal-egfr-badge');
  const preview = document.getElementById('renal-impact-preview');

  const colorThemes = {
    cyan: {
      cardClass: 'bg-cyan-950/45 border-cyan-500/60 text-cyan-100 shadow-md shadow-cyan-950/40',
      titleClass: 'text-cyan-300 font-bold',
      badgeClass: 'bg-cyan-950/90 border-cyan-400/60 text-cyan-300',
      barColor: 'bg-cyan-400',
      icon: '⚡',
      pillClass: 'bg-cyan-900/50 border-cyan-400/50 text-cyan-200'
    },
    emerald: {
      cardClass: 'bg-emerald-950/45 border-emerald-500/60 text-emerald-100 shadow-md shadow-emerald-950/40',
      titleClass: 'text-emerald-300 font-bold',
      badgeClass: 'bg-emerald-950/90 border-emerald-400/60 text-emerald-300',
      barColor: 'bg-emerald-400',
      icon: '✅',
      pillClass: 'bg-emerald-900/50 border-emerald-400/50 text-emerald-200'
    },
    amber: {
      cardClass: 'bg-amber-950/45 border-amber-500/60 text-amber-100 shadow-md shadow-amber-950/40',
      titleClass: 'text-amber-300 font-bold',
      badgeClass: 'bg-amber-950/90 border-amber-400/60 text-amber-300',
      barColor: 'bg-amber-400',
      icon: '⚠️',
      pillClass: 'bg-amber-900/50 border-amber-400/50 text-amber-200'
    },
    orange: {
      cardClass: 'bg-orange-950/45 border-orange-500/70 text-orange-100 shadow-md shadow-orange-950/40',
      titleClass: 'text-orange-300 font-bold',
      badgeClass: 'bg-orange-950/90 border-orange-400/70 text-orange-300',
      barColor: 'bg-orange-400',
      icon: '🟠',
      pillClass: 'bg-orange-900/50 border-orange-400/50 text-orange-200'
    },
    rose: {
      cardClass: 'bg-rose-950/50 border-rose-500/70 text-rose-100 shadow-md shadow-rose-950/40',
      titleClass: 'text-rose-300 font-bold',
      badgeClass: 'bg-rose-950/90 border-rose-400/70 text-rose-300',
      barColor: 'bg-rose-500',
      icon: '🛑',
      pillClass: 'bg-rose-900/50 border-rose-400/50 text-rose-200'
    }
  };

  const currentTheme = colorThemes[status.badgeColor] || colorThemes.emerald;

  if (badge) {
    badge.textContent = `DFG : ${status.egfr} mL/min`;
    badge.className = `text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border transition-all duration-300 ${currentTheme.badgeClass}`;
  }

  const presetColors = {
    135: 'border-cyan-400 bg-cyan-950/50 text-cyan-300 shadow-sm shadow-cyan-950/40',
    100: 'border-emerald-400 bg-emerald-950/50 text-emerald-300 shadow-sm shadow-emerald-950/40',
    72: 'border-amber-400 bg-amber-950/50 text-amber-300 shadow-sm shadow-amber-950/40',
    45: 'border-orange-400 bg-orange-950/50 text-orange-300 shadow-sm shadow-orange-950/40',
    25: 'border-rose-400 bg-rose-950/50 text-rose-300 shadow-sm shadow-rose-950/40'
  };

  document.querySelectorAll('.renal-preset-btn').forEach(btn => {
    const g = parseInt(btn.getAttribute('data-gfr'), 10);
    const isSel = patientPKProfile.renal.mode === 'preset' && Math.abs(g - patientPKProfile.renal.presetGFR) <= 5;
    const selCls = presetColors[g] || 'border-cyan-400 bg-cyan-950/40 text-cyan-300';
    btn.className = isSel
      ? `renal-preset-btn p-2 rounded-xl border ${selCls} text-left transition`
      : 'renal-preset-btn p-2 rounded-xl border border-slate-800 bg-slate-950 text-left hover:border-slate-700 transition';
  });

  if (preview) {
    preview.className = `rounded-xl p-3 border space-y-2 transition-all duration-300 ${currentTheme.cardClass}`;

    const pregabStdH = getStandardSubstanceDurationHours('Pregabalin', 'oral');
    const pregabRealH = (pregabStdH / status.gfrActivity).toFixed(1).replace('.0', '');
    const bacloStdH = getStandardSubstanceDurationHours('Baclofen', 'oral');
    const bacloRealH = (bacloStdH / (0.20 + 0.80 * status.gfrActivity)).toFixed(1).replace('.0', '');

    const barPercent = Math.min(100, Math.max(8, Math.round((status.egfr / 140) * 100)));

    preview.innerHTML = `
      <div class="flex items-center justify-between gap-1 flex-wrap">
        <div class="flex items-center gap-1.5 ${currentTheme.titleClass} text-xs">
          <span>${currentTheme.icon}</span>
          <span>${currentLang === 'fr' ? status.stageFr : status.stageEn}</span>
        </div>
        <span class="font-mono font-bold text-[10px] px-2 py-0.5 rounded-full ${currentTheme.pillClass} border">
          ${Math.round(status.gfrActivity * 100)}% de filtration
        </span>
      </div>

      <div class="w-full h-1.5 bg-slate-900/90 rounded-full overflow-hidden my-1">
        <div class="h-full ${currentTheme.barColor} rounded-full transition-all duration-500" style="width: ${barPercent}%"></div>
      </div>

      <div class="text-[10.5px] leading-snug pt-0.5 opacity-95">
        <span class="font-semibold text-slate-200">Impact rénal direct :</span>
        <strong>Prégabaline</strong> ≈ <span class="font-mono font-bold text-white px-1 py-0.5 rounded bg-slate-950/70 border border-white/10">${pregabRealH}h</span> <span class="text-slate-400 font-mono">(std ${pregabStdH}h)</span> •
        <strong>Baclofène</strong> ≈ <span class="font-mono font-bold text-white px-1 py-0.5 rounded bg-slate-950/70 border border-white/10">${bacloRealH}h</span> <span class="text-slate-400 font-mono">(std ${bacloStdH}h)</span>
      </div>
    `;
  }
}

function setEnzymeGroupFilter(grp) {
  currentEnzymeGroupFilter = grp;
  document.querySelectorAll('.enz-grp-btn').forEach(btn => {
    const g = btn.getAttribute('data-grp');
    btn.className = (g === grp)
      ? 'enz-grp-btn px-2.5 py-1 rounded-full bg-indigo-600 text-white font-bold border border-indigo-500 whitespace-nowrap'
      : 'enz-grp-btn px-2.5 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800 hover:text-white whitespace-nowrap';
  });
  renderEnzymeSettingsList();
}

function setEnzymeActivity(enzId, val) {
  const num = Math.max(0.10, Math.min(3.00, parseFloat(val) || 1.0));
  patientPKProfile.manualEnzymeActivities[enzId] = Number(num.toFixed(2));
  refreshPKProfileAndRedraw();
}

function resetSingleEnzyme(enzId) {
  delete patientPKProfile.manualEnzymeActivities[enzId];
  refreshPKProfileAndRedraw();
}

function renderEnzymeSettingsList() {
  const container = document.getElementById('enzyme-settings-list');
  if (!container || typeof ENZYME_CATALOG === 'undefined') return;

  const { effective, inferredSources } = getEffectiveEnzymeActivities();
  const entries = Object.values(ENZYME_CATALOG).filter(e => {
    if (e.id === 'PULMONARY') return false;
    if (currentEnzymeGroupFilter === 'ALL') return true;
    return e.group === currentEnzymeGroupFilter;
  });

  const phenotypes = [
    { label: 'Lent (PM 25%)', val: 0.25 },
    { label: 'Interm. (65%)', val: 0.65 },
    { label: 'Normal (100%)', val: 1.00 },
    { label: 'Rapide (145%)', val: 1.45 },
    { label: 'Ultra (UM 190%)', val: 1.90 }
  ];

  container.innerHTML = entries.map(enz => {
    const curVal = effective[enz.id] !== undefined ? effective[enz.id] : 1.0;
    const pct = Math.round(curVal * 100);
    const isManual = patientPKProfile.manualEnzymeActivities[enz.id] !== undefined;
    const isCalibrated = !isManual && inferredSources[enz.id] && inferredSources[enz.id].length > 0;

    let statusBadge = `<span class="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">${pct}% (Normal)</span>`;
    if (isManual || isCalibrated || Math.abs(pct - 100) >= 4) {
      const col = pct < 85
        ? 'bg-amber-950/90 border-amber-500/50 text-amber-300'
        : (pct > 115 ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-300' : 'bg-indigo-950/90 border-indigo-500/50 text-indigo-300');
      const srcTag = isManual ? (currentLang === 'fr' ? 'Manuel' : 'Manual') : (isCalibrated ? 'Étalonné' : 'Auto');
      statusBadge = `<span class="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded border ${col}">${pct}% (${srcTag})</span>`;
    }

    const presetBtns = phenotypes.map(p => {
      const active = Math.abs(curVal - p.val) <= 0.06;
      return `<button type="button" onclick="setEnzymeActivity('${enz.id}', ${p.val})"
        class="px-1.5 py-0.5 rounded text-[9px] font-semibold border transition ${active
          ? 'bg-indigo-600 border-indigo-400 text-white'
          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
        }">${p.label}</button>`;
    }).join('');

    return `
      <div class="bg-slate-950 border ${isManual || isCalibrated ? 'border-indigo-500/50' : 'border-slate-800'} rounded-xl p-2.5 space-y-1.5">
        <div class="flex items-center justify-between gap-1">
          <span class="text-xs font-bold text-white">${currentLang === 'fr' ? enz.nameFr : enz.nameEn}</span>
          <div class="flex items-center gap-1">
            ${statusBadge}
            ${isManual ? `<button type="button" onclick="resetSingleEnzyme('${enz.id}')" class="text-[9px] text-slate-400 hover:text-rose-400 px-1" title="Réinitialiser">↺</button>` : ''}
          </div>
        </div>
        <p class="text-[10px] text-slate-400 leading-snug">${currentLang === 'fr' ? enz.descFr : enz.descEn}</p>
        <div class="text-[9.5px] text-indigo-300/80 font-mono">${currentLang === 'fr' ? enz.mutationsFr : enz.mutationsEn}</div>
        <div class="flex flex-wrap gap-1 pt-0.5">${presetBtns}</div>
        <div class="flex items-center gap-2 pt-1">
          <span class="text-[9px] font-mono text-slate-500">Intensité :</span>
          <input type="range" min="10" max="300" step="5" value="${pct}"
            oninput="setEnzymeActivity('${enz.id}', this.value / 100)"
            class="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500">
          <span class="text-[10px] font-mono font-bold text-indigo-300 min-w-[38px] text-right">${pct}%</span>
        </div>
      </div>
    `;
  }).join('');
}

function toggleShowStdCurve(checked) {
  patientPKProfile.showStandardReferenceCurve = Boolean(checked);
  drawTimeline();
}

let currentCalibratingSubstance = 'Oxycodone';

function openQuickCalibrateModal(substanceName) {
  const name = substanceName || 'Oxycodone';
  currentCalibratingSubstance = name;

  const modal = document.getElementById('modal-quick-calibrate');
  const nameEl = document.getElementById('quick-cal-substance-name');
  const stdDurEl = document.getElementById('quick-cal-std-duration');
  const previewEl = document.getElementById('quick-cal-pathway-preview');
  const hoursInput = document.getElementById('quick-cal-hours-input');
  const presetsBox = document.getElementById('quick-cal-presets');

  const s = SUBSTANCES_BY_NAME[name];
  const brand = (s && s.commonNames && s.commonNames[0]) ? ` (${s.commonNames[0]})` : '';
  const stdH = getStandardSubstanceDurationHours(name, 'oral');
  const existing = (patientPKProfile.empiricalCalibrations || []).find(c => c.substanceName === name);

  if (nameEl) nameEl.textContent = `${name}${brand}`;
  if (stdDurEl) stdDurEl.textContent = `~${stdH}h (${currentLang === 'fr' ? 'durée clinique standard' : 'standard clinical duration'})`;

  const pk = getSubstancePKProfile(name);
  if (previewEl) {
    if (pk && pk.verified && pk.pathways) {
      const parts = Object.entries(pk.pathways)
        .map(([enz, fm]) => `<span class="text-indigo-300 font-mono font-semibold">${enz} (${Math.round(fm * 100)}%)</span>`)
        .join(' + ');
      previewEl.innerHTML = `🧬 ${currentLang === 'fr' ? 'Enzymes évaluées :' : 'Evaluated enzymes:'} ${parts}`;
    } else {
      previewEl.textContent = currentLang === 'fr'
        ? '⚠️ Voie enzymatique non établie scientifiquement (adaptera uniquement cette molécule).'
        : '⚠️ Enzymatic pathway not scientifically established.';
    }
  }

  const defaultHours = existing ? existing.observedHours : (name === 'Oxycodone' ? 3.0 : stdH);
  if (hoursInput) {
    hoursInput.value = defaultHours;
  }

  if (presetsBox) {
    const rawPresets = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0, 6.0, 8.0, 10.0, 12.0, 16.0, 24.0];
    const filteredPresets = rawPresets.filter(h => h >= Math.max(0.5, stdH * 0.35) && h <= Math.min(36, stdH * 2.2));
    if (!filteredPresets.includes(stdH)) filteredPresets.push(stdH);
    if (!filteredPresets.includes(defaultHours)) filteredPresets.push(defaultHours);
    filteredPresets.sort((a, b) => a - b);

    presetsBox.innerHTML = filteredPresets.map(h => {
      const isCur = Math.abs(defaultHours - h) < 0.1;
      const isStd = Math.abs(stdH - h) < 0.1;
      const label = `${h}h${isStd ? ' (std)' : ''}`;
      return `
        <button type="button" onclick="setQuickCalHours(${h})"
          class="quick-preset-btn px-2.5 py-1 rounded-xl text-[10.5px] font-mono font-bold border transition ${isCur
            ? 'bg-indigo-600 border-indigo-400 text-white shadow-sm'
            : (isStd ? 'bg-slate-800 border-slate-600 text-slate-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white')
          }">
          ${label}
        </button>
      `;
    }).join('');
  }

  if (modal) {
    modal.classList.remove('hidden');
  }

  selectCalibrationSubstance(name);
}

function closeQuickCalibrateModal() {
  const modal = document.getElementById('modal-quick-calibrate');
  if (modal) modal.classList.add('hidden');
}

function adjustQuickCalHours(delta) {
  const hoursInput = document.getElementById('quick-cal-hours-input');
  if (!hoursInput) return;
  const cur = parseFloat(hoursInput.value) || 3.0;
  const next = Math.max(0.25, Math.min(72, Number((cur + delta).toFixed(2))));
  hoursInput.value = next;

  document.querySelectorAll('#quick-cal-presets button').forEach(btn => {
    const val = parseFloat(btn.textContent.trim().split('h')[0]);
    if (Math.abs(val - next) < 0.1) {
      btn.className = 'quick-preset-btn px-2.5 py-1 rounded-xl text-[10.5px] font-mono font-bold border transition bg-indigo-600 border-indigo-400 text-white shadow-sm';
    } else {
      btn.className = 'quick-preset-btn px-2.5 py-1 rounded-xl text-[10.5px] font-mono font-bold border transition bg-slate-950 border-slate-800 text-slate-400 hover:text-white';
    }
  });
}

function setQuickCalHours(h) {
  const hoursInput = document.getElementById('quick-cal-hours-input');
  if (hoursInput) hoursInput.value = h;
  adjustQuickCalHours(0);
}

function saveQuickCalibrateModal() {
  const hoursInput = document.getElementById('quick-cal-hours-input');
  const obsH = Math.max(0.25, Math.min(72, parseFloat(hoursInput ? hoursInput.value : 3.0) || 3.0));
  const name = currentCalibratingSubstance || 'Oxycodone';
  const stdH = getStandardSubstanceDurationHours(name, 'oral');

  const idx = patientPKProfile.empiricalCalibrations.findIndex(c => c.substanceName === name);
  const entry = {
    id: Date.now(),
    substanceName: name,
    route: 'oral',
    observedHours: obsH,
    stdHours: stdH
  };

  if (idx !== -1) {
    patientPKProfile.empiricalCalibrations[idx] = entry;
  } else {
    patientPKProfile.empiricalCalibrations.push(entry);
  }

  closeQuickCalibrateModal();
  refreshPKProfileAndRedraw();

  if (typeof currentModalSubstanceName !== 'undefined' && currentModalSubstanceName === name) {
    showSubstanceDetails(name, selectedModalRoaName);
  }
}

function openCalibrateFromJournal(substanceName) {
  openQuickCalibrateModal(substanceName);
}

function resetAllPKProfile() {
  patientPKProfile.manualEnzymeActivities = {};
  patientPKProfile.empiricalCalibrations = [];
  patientPKProfile.renal.mode = 'preset';
  patientPKProfile.renal.presetGFR = 100;
  patientPKProfile.renal.creatinineValue = null;
  patientPKProfile.tolerance.autoFromHistory = true;
  patientPKProfile.tolerance.globalBaseline = 0.0;
  patientPKProfile.tolerance.classOverrides = {};

  setRenalMode('preset');
  refreshPKProfileAndRedraw();
}

function updateJournalPKBanner() {
  const summaryTxt = document.getElementById('journal-pk-summary-text');
  if (!summaryTxt) return;

  const cals = patientPKProfile.empiricalCalibrations || [];
  const manualCount = Object.keys(patientPKProfile.manualEnzymeActivities || {}).length;
  const renal = getPatientRenalStatus();

  const activeParts = [];
  if (cals.length > 0 && typeof deduceGeneticMutationsReport === 'function') {
    const rep = deduceGeneticMutationsReport();
    const topEnz = (rep.deductions || []).slice(0, 2).map(d => `${d.code} ${d.pct}% (${d.phenotypeCode})`).join(', ');
    activeParts.push(
      topEnz
        ? `${cals.map(c => `${c.substanceName}=${c.observedHours}h`).join(', ')} → ${topEnz}`
        : cals.map(c => `${c.substanceName}=${c.observedHours}h`).join(', ')
    );
  }
  if (manualCount > 0) {
    activeParts.push(`${manualCount} enzyme${manualCount > 1 ? 's' : ''} manuelle${manualCount > 1 ? 's' : ''}`);
  }
  if (Math.abs(renal.egfr - 100) >= 8) {
    activeParts.push(`DFG ${renal.egfr} mL/min`);
  }

  if (activeParts.length > 0) {
    summaryTxt.innerHTML = `<strong class="text-emerald-300">Profil Génétique actif :</strong> ${activeParts.join(' • ')}`;
  } else {
    summaryTxt.textContent = currentLang === 'fr'
      ? 'Cinétique personnalisée (Déduction d\'enzymes à jeun & Fonction rénale)'
      : 'Personalized kinetics (Fasting enzyme deduction & Renal function)';
  }
}

function refreshPKProfileAndRedraw() {
  renderEmpiricalCalibrationsList();
  renderRenalStatusUI();
  renderEnzymeSettingsList();
  updateJournalPKBanner();
  renderIngestions();
  drawTimeline();
  onQuickSubstanceChange();
}

function init() {
  updateClock();
  buildLookup();
  initTimelineInteraction();
  setLanguage('fr');
  toggleMetaboliteCurves(showMetaboliteCurves);
  initQuickSelect();

  document.addEventListener('click', (e) => {
    const searchStep = document.getElementById('quick-step-search');
    const box = document.getElementById('quick-suggestions-box');
    if (box && searchStep && !searchStep.contains(e.target)) {
      box.classList.add('hidden');
    }

    const calContainer = document.getElementById('cal-search-container');
    const calBox = document.getElementById('cal-suggestions-box');
    if (calBox && calContainer && !calContainer.contains(e.target)) {
      calBox.classList.add('hidden');
    }
  });
}

window.onload = init;
