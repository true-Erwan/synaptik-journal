function initCategoryPills() {
  const container = document.getElementById('category-pills');
  if (!container) return;
  container.innerHTML = '';

  const fragment = document.createDocumentFragment();

  const allBtn = document.createElement('button');
  allBtn.id = 'cat-pill-all';
  const isAllActive = currentFilterCat === 'ALL';
  allBtn.className = `category-pill whitespace-nowrap px-2.5 py-1 rounded-full border transition ${isAllActive
    ? 'active bg-indigo-600 text-white font-medium border-indigo-500'
    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
  }`;
  allBtn.textContent = currentLang === 'fr' ? `Toutes (${SUBSTANCES_DATA.length})` : `All (${SUBSTANCES_DATA.length})`;
  allBtn.onclick = () => setCategoryFilter('ALL', allBtn);
  fragment.appendChild(allBtn);

  CATEGORY_CONFIG.forEach(cfg => {
    const count = CATEGORY_COUNTS[cfg.key] || 0;
    if (count === 0) return;

    const btn = document.createElement('button');
    const isActive = currentFilterCat === cfg.key;
    btn.className = `category-pill whitespace-nowrap px-2.5 py-1 rounded-full border transition ${isActive
      ? 'active bg-indigo-600 text-white font-medium border-indigo-500'
      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
    }`;
    const label = currentLang === 'fr' ? cfg.fr : cfg.en;
    btn.textContent = `${label} (${count})`;
    btn.onclick = () => setCategoryFilter(cfg.key, btn);
    fragment.appendChild(btn);
  });

  container.appendChild(fragment);
}

function setCategoryFilter(catName, clickedBtn) {
  currentFilterCat = catName;
  document.querySelectorAll('.category-pill').forEach(b => {
    b.className = 'category-pill whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 transition';
  });
  if (clickedBtn) {
    clickedBtn.className = 'category-pill whitespace-nowrap px-2.5 py-1 rounded-full bg-indigo-600 text-white font-medium border border-indigo-500';
  } else {
    const all = document.getElementById('cat-pill-all');
    if (all) all.className = 'category-pill whitespace-nowrap px-2.5 py-1 rounded-full bg-indigo-600 text-white font-medium border border-indigo-500';
  }
  filterSubstances();
}

function setCatalogSortOrder(order) {
  currentCatalogSort = order;
  updateCatalogSortUI();
  filterSubstances();
}

function updateCatalogSortUI() {
  const btnAlpha = document.getElementById('sort-btn-alpha');
  const btnPotency = document.getElementById('sort-btn-potency');
  const sortLbl = document.getElementById('txt-catalog-sort-label');

  if (sortLbl) {
    sortLbl.innerHTML = `<svg class="w-3 h-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/></svg><span>${currentLang === 'fr' ? 'Tri :' : 'Sort:'}</span>`;
  }
  if (btnAlpha) {
    btnAlpha.textContent = currentLang === 'fr' ? 'Alphabétique (A-Z)' : 'Alphabetical (A-Z)';
    btnAlpha.className = currentCatalogSort === 'alpha'
      ? 'px-2.5 py-1 rounded-lg text-[10px] font-bold border transition bg-indigo-600 text-white border-indigo-500 shadow-sm'
      : 'px-2.5 py-1 rounded-lg text-[10px] font-medium border transition bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200';
  }
  if (btnPotency) {
    btnPotency.textContent = currentLang === 'fr' ? '⚡ Puissance relative' : '⚡ Relative potency';
    btnPotency.className = currentCatalogSort === 'potency'
      ? 'expert-only-block px-2.5 py-1 rounded-lg text-[10px] font-bold border transition bg-indigo-600 text-white border-indigo-500 shadow-sm'
      : 'expert-only-block px-2.5 py-1 rounded-lg text-[10px] font-medium border transition bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200';
  }
}

function renderSubstancesList(filterList = null) {
  const baseList = filterList ? [...filterList] : [...SUBSTANCES_DATA];
  const list = baseList.sort((a, b) => {
    if (currentCatalogSort === 'potency') {
      const potA = getSubstancePotency(a, currentFilterCat);
      const potB = getSubstancePotency(b, currentFilterCat);
      if (potB !== potA) return potB - potA;
    }
    return (a.name || '').localeCompare(b.name || '');
  });

  const container = document.getElementById('substances-list');
  if (!container) return;
  container.innerHTML = '';

  const countEl = document.getElementById('substances-count');
  if (countEl) {
    countEl.textContent = I18N[currentLang].substancesCount(list.length);
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-slate-500 text-xs">
        ${currentLang === 'fr' ? 'Aucune molécule ne correspond à votre recherche.' : 'No substances match your search.'}
      </div>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();
  const isPotencySort = currentCatalogSort === 'potency';
  const potencyBadgeCls = isPotencySort
    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
    : 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30';
  const potencyPrefix = currentLang === 'fr' ? 'Puissance' : 'Potency';

  list.forEach(s => {
    const card = document.createElement('div');
    card.className = 'bg-slate-900 hover:bg-slate-800/80 border border-slate-800 rounded-xl p-3 flex items-center justify-between cursor-pointer transition';
    card.onclick = () => showSubstanceDetails(s.name);

    const brands = s.commonNames && s.commonNames.length > 0 ? s.commonNames.slice(0, 3).join(', ') : '';
    const cats = s.categories && s.categories.length > 0 ? s.categories.slice(0, 2).join(' · ') : '';
    const oralRoa = s.roas ? s.roas.find(r => r.name === 'oral') : null;
    const doseStr = oralRoa && oralRoa.dose ? `Max: ${oralRoa.dose.heavyMin} ${oralRoa.dose.units}` : '';
    const potencyVal = getSubstancePotency(s, currentFilterCat);

    let metabCardBadge = '';
    if (s.metaboliteMeta && s.metaboliteMeta.isMetabolite) {
      const du = s.metaboliteMeta.directUse;
      const duTag = du === 'rc'
        ? (currentLang === 'fr' ? '🧬 Métabolite actif • RC' : '🧬 Active metabolite • RC')
        : (du === 'medication'
          ? (currentLang === 'fr' ? '🧬 Métabolite actif • Médicament' : '🧬 Active metabolite • Med')
          : (currentLang === 'fr' ? '🧬 Métabolite actif • Endogène' : '🧬 Active metabolite • Endogenous'));
      metabCardBadge = `<span class="text-[9px] px-1.5 py-0.5 rounded bg-violet-950/80 border border-violet-500/40 text-violet-300 font-semibold">${duTag}</span>`;
    }

    card.innerHTML = `
      <div class="flex-1 min-w-0 pr-2">
        <div class="flex items-center gap-1.5 flex-wrap">
          <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color: ${s.color || '#6366f1'}"></span>
          <span class="font-bold text-xs text-white">${s.name}</span>
          <span class="expert-only-block text-[9.5px] px-1.5 py-0.5 rounded font-mono font-bold ${potencyBadgeCls}">⚡ ${potencyPrefix} : ${formatPotencyIndex(potencyVal)}</span>
          ${metabCardBadge ? `<span class="expert-only-block">${metabCardBadge}</span>` : ''}
          ${cats ? `<span class="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">${cats}</span>` : ''}
        </div>
        ${brands ? `<p class="text-[11px] text-indigo-300/80 truncate mt-0.5">${brands}</p>` : ''}
      </div>
      <div class="text-right shrink-0">
        ${doseStr ? `<span class="text-[10px] font-mono font-medium text-slate-300 block">${doseStr}</span>` : ''}
        <svg class="w-4 h-4 text-slate-500 inline-block mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </div>
    `;
    fragment.appendChild(card);
  });

  const endMarker = document.createElement('div');
  endMarker.className = 'text-center py-4 text-[11px] text-slate-500 flex items-center justify-center gap-2 border-t border-slate-800/60 mt-3';
  endMarker.innerHTML = `
    <span class="w-1.5 h-1.5 rounded-full bg-indigo-500/60"></span>
    <span>${currentLang === 'fr' ? `${list.length} molécules affichées • Fin de la liste` : `${list.length} substances displayed • End of list`}</span>
    <span class="w-1.5 h-1.5 rounded-full bg-indigo-500/60"></span>
  `;
  fragment.appendChild(endMarker);

  container.appendChild(fragment);
}

function filterSubstances() {
  const searchEl = document.getElementById('search-input');
  const query = searchEl ? searchEl.value.trim() : '';
  const clearBtn = document.getElementById('clear-search-btn');
  if (clearBtn) clearBtn.classList.toggle('hidden', !query);

  if (!query) {
    const filtered = currentFilterCat === 'ALL'
      ? SUBSTANCES_DATA
      : SUBSTANCES_DATA.filter(s => s.categories && s.categories.includes(currentFilterCat));
    renderSubstancesList(filtered);
    return;
  }

  const ranked = [];
  for (let i = 0; i < SUBSTANCES_DATA.length; i++) {
    const s = SUBSTANCES_DATA[i];
    if (currentFilterCat !== 'ALL') {
      if (!s.categories || !s.categories.includes(currentFilterCat)) continue;
    }
    const rank = getSubstanceSearchRank(s, query);
    if (rank > 0) ranked.push({ s, rank });
  }

  ranked.sort((a, b) => (a.rank !== b.rank ? a.rank - b.rank : a.s.name.localeCompare(b.s.name)));
  renderSubstancesList(ranked.map(item => item.s));
}

function clearSearch() {
  const searchEl = document.getElementById('search-input');
  if (searchEl) searchEl.value = '';
  filterSubstances();
}

function selectModalRoa(roaName) {
  if (!currentModalSubstanceName) return;
  selectedModalRoaName = roaName;
  showSubstanceDetails(currentModalSubstanceName, roaName);
}

function formatBioavailabilityRange(bio, separator = '-') {
  if (!bio || (bio.min === undefined && bio.max === undefined)) return null;
  const minStr = bio.min ?? '';
  const hasRange = bio.min !== undefined && bio.max !== undefined && bio.min !== bio.max;
  const maxStr = bio.max !== bio.min ? (bio.max ?? '') : '';
  return `${minStr}${hasRange ? separator : ''}${maxStr}%`;
}

function showSubstanceDetails(name, preferredRoa = null) {
  const s = SUBSTANCES_BY_NAME[name];
  if (!s) return;
  currentModalSubstanceName = name;

  const roas = s.roas || [];
  if (preferredRoa && roas.some(r => r.name === preferredRoa)) {
    selectedModalRoaName = preferredRoa;
  } else if (!selectedModalRoaName || !roas.some(r => r.name === selectedModalRoaName)) {
    const oralRoa = roas.find(r => r.name === 'oral') || roas[0];
    selectedModalRoaName = oralRoa ? oralRoa.name : null;
  }

  const curRoa = roas.find(r => r.name === selectedModalRoaName) || roas[0] || null;
  const curRoaInfo = curRoa ? getRoaInfo(curRoa.name) : { color: '#818cf8', label: 'N/A', shortLabel: 'N/A' };

  document.getElementById('modal-substance-name').textContent = s.name;
  const brands = s.commonNames && s.commonNames.length > 0
    ? s.commonNames.join(', ')
    : (currentLang === 'fr' ? 'Aucun nom commercial enregistré' : 'No brand names listed');
  document.getElementById('modal-substance-brands').textContent = brands;

  const badge = document.getElementById('modal-substance-badge');
  badge.textContent = s.categories && s.categories.length > 0 ? s.categories[0].toUpperCase() : 'MOLÉCULE';
  const sColor = s.color || '#818cf8';
  badge.style.borderColor = sColor + '55';
  badge.style.backgroundColor = sColor + '20';
  badge.style.color = sColor;

  const remarkEl = document.getElementById('modal-substance-remark');
  if (s.dosageRemark) {
    remarkEl.innerHTML = `<strong>⚠️ ${currentLang === 'fr' ? 'Attention posologie & intervalles :' : 'Warning dosage & intervals:'}</strong><br>${s.dosageRemark}`;
    remarkEl.classList.remove('hidden');
  } else {
    remarkEl.classList.add('hidden');
  }

  document.getElementById('modal-substance-summary').textContent =
    s.summary || s.effectsSummary || (currentLang === 'fr' ? 'Aucune description détaillée enregistrée.' : 'No detailed summary available.');

  const selectorPills = document.getElementById('modal-roa-selector-pills');
  const selectorTitle = document.getElementById('txt-modal-roa-selector-title');
  const selectorCount = document.getElementById('modal-roa-badge-count');

  if (selectorTitle) {
    selectorTitle.innerHTML = `
      <svg class="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
      ${currentLang === 'fr' ? "Mode d'administration" : "Route of Administration"}
    `;
  }

  if (selectorCount) {
    selectorCount.textContent = currentLang === 'fr'
      ? `${roas.length} ${roas.length > 1 ? 'modes disponibles' : 'mode unique'}`
      : `${roas.length} ${roas.length > 1 ? 'routes available' : 'single route'}`;
  }

  if (selectorPills) {
    selectorPills.innerHTML = '';
    if (roas.length > 0) {
      roas.forEach(r => {
        const rInfo = getRoaInfo(r.name);
        const isSelected = r.name === selectedModalRoaName;
        const btn = document.createElement('button');
        btn.className = `flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold text-xs transition border ${isSelected
          ? 'bg-slate-800 text-white shadow-md'
          : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border-slate-800 hover:bg-slate-900'
        }`;
        if (isSelected) {
          btn.style.borderColor = rInfo.color;
          btn.style.boxShadow = `0 0 12px ${rInfo.color}40`;
        }
        const bioLabel = formatBioavailabilityRange(r.bioavailability, '-');
        btn.innerHTML = `
          <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background-color: ${rInfo.color}; box-shadow: ${isSelected ? `0 0 8px ${rInfo.color}` : 'none'};"></span>
          <span>${rInfo.label}</span>
          ${bioLabel ? `<span class="text-[9.5px] font-mono px-1.5 py-0.5 rounded-md ${isSelected ? 'bg-indigo-950/80 text-cyan-300 border border-cyan-500/50' : 'bg-slate-950 text-slate-300 border border-slate-700/80'}">⚡ ${bioLabel}</span>` : ''}
        `;
        btn.onclick = () => selectModalRoa(r.name);
        selectorPills.appendChild(btn);
      });
    } else {
      selectorPills.innerHTML = `<span class="text-slate-500 text-xs">${currentLang === 'fr' ? 'Aucune voie répertoriée' : 'No route listed'}</span>`;
    }
  }

  const doseContainer = document.getElementById('modal-substance-doses');
  const doseTypeLabel = document.getElementById('modal-dose-type');
  doseContainer.innerHTML = '';

  if (curRoa) {
    const bioText = formatBioavailabilityRange(curRoa.bioavailability, ' à ');

    if (doseTypeLabel) {
      doseTypeLabel.innerHTML = `
        <div class="flex items-center gap-2 flex-wrap">
          <span class="font-bold" style="color: ${curRoaInfo.color};">${curRoaInfo.label}</span>
          ${bioText ? `
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-600/60 shadow-sm" title="${currentLang === 'fr' ? 'Biodisponibilité systémique de cette voie' : 'Systemic bioavailability of this route'}">
              <span>⚡ Biodisp. ${bioText}</span>
            </span>
          ` : `
            <span class="text-[9.5px] text-slate-500 italic">(${currentLang === 'fr' ? 'Biodisp. non documentée' : 'Bioavailability not documented'})</span>
          `}
        </div>
      `;
    }

    const d = curRoa.dose;
    if (d && (d.lightMin !== undefined || d.commonMin !== undefined || d.strongMin !== undefined || d.heavyMin !== undefined)) {
      const isNd = isNonDivertible(s);
      const nd = NON_DIVERTIBLE_DOSES[s.name];
      const ndRoute = nd ? (nd[curRoa.name] || nd['oral'] || Object.values(nd)[0]) : null;

      const tiers = isNd ? [
        { label: currentLang === 'fr' ? 'Dose faible' : 'Low dose',         val: (ndRoute && ndRoute.low) || d.lightMin,                     col: 'text-emerald-400 bg-emerald-500/10' },
        { label: currentLang === 'fr' ? 'Dose standard' : 'Standard dose',  val: (ndRoute && ndRoute.standard) || d.commonMin,               col: 'text-blue-400 bg-blue-500/10' },
        { label: currentLang === 'fr' ? 'Dose max / prise' : 'Max dose/intake', val: (ndRoute && ndRoute.max) || d.heavyMin || d.strongMin,  col: 'text-amber-400 bg-amber-500/10' }
      ] : [
        { label: currentLang === 'fr' ? 'Léger' : 'Light',       val: d.lightMin,  col: 'text-emerald-400 bg-emerald-500/10' },
        { label: currentLang === 'fr' ? 'Commun' : 'Common',     val: d.commonMin, col: 'text-blue-400 bg-blue-500/10' },
        { label: currentLang === 'fr' ? 'Fort' : 'Strong',       val: d.strongMin, col: 'text-amber-400 bg-amber-500/10' },
        { label: currentLang === 'fr' ? 'Très fort' : 'Heavy',   val: d.heavyMin,  col: 'text-red-400 bg-red-500/10' }
      ];

      tiers.forEach(t => {
        if (t.val === undefined || t.val === null) return;
        const col = document.createElement('div');
        col.className = `p-2 rounded-lg border border-slate-800 ${t.col}`;
        col.innerHTML = `
          <span class="block text-[10px] uppercase font-bold text-slate-400">${t.label}</span>
          <span class="block font-mono font-bold text-xs mt-0.5">${t.val ?? '-'} <span class="text-[9px] font-normal">${d.units || ''}</span></span>
        `;
        doseContainer.appendChild(col);
      });
    } else {
      doseContainer.innerHTML = `<div class="col-span-4 text-slate-500 py-2 text-center text-xs">${currentLang === 'fr' ? 'Posologies non définies pour cette voie' : 'Dosage not available for this route'}</div>`;
    }
  } else {
    doseContainer.innerHTML = `<div class="col-span-4 text-slate-500 py-2 text-center text-xs">${currentLang === 'fr' ? 'Posologies non définies' : 'Dosage not available'}</div>`;
  }

  const legendContainer = document.getElementById('modal-roa-legend');
  if (legendContainer) {
    const activePillsHtml = roas.map(r => {
      const rInfo = getRoaInfo(r.name);
      const isSelected = r.name === selectedModalRoaName;
      const rBio = formatBioavailabilityRange(r.bioavailability, '-');
      const rBioStr = rBio ? ` (${rBio})` : '';
      return `
        <button onclick="selectModalRoa('${r.name}')" class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-semibold transition border ${isSelected
          ? 'bg-slate-800 text-white shadow-sm'
          : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 border-slate-800'
        }" style="${isSelected ? `border-color: ${rInfo.color}; box-shadow: 0 0 10px ${rInfo.color}35;` : ''}">
          <span class="w-2.5 h-2.5 rounded-full inline-block" style="background-color: ${rInfo.color};"></span>
          <span>${rInfo.label}</span>
          ${rBioStr ? `<span class="text-[9.5px] font-mono font-bold text-cyan-300 ml-0.5">${rBioStr}</span>` : ''}
        </button>
      `;
    }).join('');

    const normKeys = ['oral', 'sublingual', 'insufflated', 'smoked', 'rectal', 'intravenous', 'intramuscular'];
    const normRefHtml = normKeys.map(k => {
      const info = getRoaInfo(k);
      return `
        <span class="inline-flex items-center gap-1 text-[9px] text-slate-400">
          <span class="w-2 h-2 rounded-full inline-block" style="background-color: ${info.color};"></span>
          <span>${info.shortLabel}</span>
        </span>
      `;
    }).join('');

    legendContainer.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
          ${currentLang === 'fr' ? 'Voies de cette molécule (cliquer pour basculer)' : 'Molecule routes (click to switch)'}
        </span>
        <span class="text-[9px] font-semibold" style="color: ${curRoaInfo.color};">${curRoaInfo.label}</span>
      </div>
      <div class="flex flex-wrap gap-1.5">
        ${activePillsHtml}
      </div>
      <div class="pt-1.5 border-t border-slate-800/80 flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span class="text-[8.5px] font-bold uppercase tracking-wider text-slate-500">${currentLang === 'fr' ? 'Norme ROA :' : 'ROA Standard:'}</span>
        ${normRefHtml}
      </div>
    `;
  }

  const durContainer = document.getElementById('modal-substance-duration');
  const curveSubtitle = document.getElementById('txt-modal-curve-subtitle');
  if (curveSubtitle) {
    curveSubtitle.innerHTML = `<span style="color: ${curRoaInfo.color}; font-weight: 700;">${currentLang === 'fr' ? 'Cinétique' : 'Kinetics'} • ${curRoaInfo.label}</span>`;
  }
  const modalMetLbl = document.getElementById('lbl-toggle-modal-metabolites');
  const modalMetCb = document.getElementById('toggle-modal-metabolites');
  const modalMetTxt = document.getElementById('txt-toggle-modal-metabolites');
  const pkInfoModal = (typeof getSubstancePKProfile === 'function') ? getSubstancePKProfile(s.name) : null;
  const hasModalMets = Boolean(pkInfoModal && Array.isArray(pkInfoModal.activeMetabolites) && pkInfoModal.activeMetabolites.length > 0);
  if (typeof showModalMetaboliteCurves !== 'undefined') {
    if (!lastModalCurveContext || !lastModalCurveContext.substance || lastModalCurveContext.substance.name !== s.name) {
      showModalMetaboliteCurves = false;
    }
    if (modalMetCb) modalMetCb.checked = Boolean(showModalMetaboliteCurves);
    if (modalMetTxt) modalMetTxt.textContent = currentLang === 'fr' ? '🧬 Métabolites' : '🧬 Metabolites';
    if (modalMetLbl) {
      if (hasModalMets) {
        modalMetLbl.className = showModalMetaboliteCurves
          ? 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-950/75 hover:bg-violet-900/80 border border-violet-500/45 text-[9.5px] font-semibold text-violet-200 cursor-pointer select-none transition whitespace-nowrap'
          : 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-[9.5px] font-semibold text-slate-400 cursor-pointer select-none transition whitespace-nowrap';
      } else {
        modalMetLbl.classList.add('hidden');
      }
    }
  }
  durContainer.innerHTML = '';

  if (curRoa && curRoa.duration) {
    const dur = curRoa.duration;
    const totalStr = dur.total ? `${dur.total.min}-${dur.total.max} ${dur.total.units}` : '';
    const durItems = [
      { k: I18N[currentLang].onset,  v: dur.onset },
      { k: I18N[currentLang].comeup, v: dur.comeup },
      { k: I18N[currentLang].peak,   v: dur.peak },
      { k: I18N[currentLang].offset, v: dur.offset }
    ];

    const gridHtml = durItems.map(item => {
      const valStr = item.v ? `${item.v.min}-${item.v.max} ${item.v.units}` : 'N/A';
      return `
        <div class="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
          <span class="text-[10px] text-slate-400 block">${item.k}</span>
          <span class="font-medium text-slate-200 text-xs">${valStr}</span>
        </div>
      `;
    }).join('');

    durContainer.innerHTML = `
      <div class="grid grid-cols-2 gap-2">
        ${gridHtml}
      </div>
      ${totalStr ? `
        <div class="mt-2 p-2 rounded-lg bg-slate-900/40 border border-slate-800/80 flex items-center justify-between text-xs">
          <span class="text-slate-400">${currentLang === 'fr' ? 'Durée totale estimée :' : 'Estimated total duration:'}</span>
          <span class="font-bold text-white px-2 py-0.5 rounded bg-slate-800">${totalStr}</span>
        </div>
      ` : ''}
    `;
  } else {
    durContainer.innerHTML = `<div class="col-span-2 text-slate-500 py-2 text-center text-xs">${currentLang === 'fr' ? 'Cinétique non disponible pour cette voie' : 'Duration info not available for this route'}</div>`;
  }

  const depTitleEl = document.getElementById('txt-modal-dependence-title');
  if (depTitleEl) {
    depTitleEl.innerHTML = `
      <svg class="w-3.5 h-3.5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
      <span>${currentLang === 'fr' ? 'Dépendance & Addiction (0 à 10)' : 'Dependence & Addiction (0 to 10)'}</span>
    `;
  }

  const depContent = document.getElementById('modal-dependence-content');
  if (depContent) {
    const addScore = getAddictionForRoa(s, curRoa);
    const physScore = Math.max(0, Math.min(10, s.physicalDependenceScore !== undefined ? s.physicalDependenceScore : 0));

    const addCol = getGaugeColor(addScore);
    const physCol = getGaugeColor(physScore);

    const roaComparisonHtml = (roas.length > 1 && (s.addictionScore > 0 || addScore > 0))
      ? `<div class="pt-1 flex flex-wrap items-center gap-1">
          <span class="text-[9px] text-slate-400 mr-0.5">${currentLang === 'fr' ? 'Par voie :' : 'By route:'}</span>
          ${roas.map(r => {
            const rInf = getRoaInfo(r.name);
            const rSc = getAddictionForRoa(s, r);
            const isSel = r.name === selectedModalRoaName;
            return `<button type="button" onclick="selectModalRoa('${r.name}')"
              class="px-1.5 py-0.5 rounded-md text-[9.5px] font-mono transition border flex items-center gap-1 ${isSel
                ? 'bg-slate-800 text-white font-bold shadow-sm'
                : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border-slate-800'
              }" style="${isSel ? `border-color: ${rInf.color};` : ''}">
              <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${rInf.color};"></span>
              <span>${rSc >= 11 ? `${rInf.shortLabel} : 11/10 🔥` : `${rInf.shortLabel} : ${rSc}/10`}</span>
            </button>`;
          }).join('')}
        </div>`
      : '';

    depContent.innerHTML = `
      <div class="space-y-1.5">
        <div class="flex items-center justify-between gap-1 flex-wrap">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-[11px] font-semibold text-slate-200">${currentLang === 'fr' ? "Indice d'addiction (Craving)" : "Addiction Index (Craving)"}</span>
            <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[9.5px] font-bold" style="color: ${curRoaInfo.color};">
              <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${curRoaInfo.color};"></span>
              <span>${curRoaInfo.shortLabel}</span>
            </span>
          </div>
          <span class="text-[10.5px] font-mono font-bold px-2 py-0.5 rounded-full border ${addCol.bg} ${addCol.text} ${addCol.border}">${addScore >= 11 ? (currentLang === 'fr' ? '11 / 10 🔥 (Hors-échelle)' : '11 / 10 🔥 (Off-scale)') : `${addScore} / 10`}</span>
        </div>
        <div class="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div class="h-full rounded-full transition-all duration-300" style="width: ${addScore >= 11 ? 100 : Math.min(100, addScore * 10)}%; background-color: ${addCol.hex};"></div>
        </div>
        <p class="text-[10px] text-slate-400 leading-snug">${getCravingDesc(addScore, currentLang, selectedModalRoaName)}</p>
        ${roaComparisonHtml}
      </div>

      <div class="space-y-1 pt-1 border-t border-slate-800/60">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-semibold text-slate-200">${currentLang === 'fr' ? "Indice de dépendance physique" : "Physical Dependence Index"}</span>
          <span class="text-[10.5px] font-mono font-bold px-2 py-0.5 rounded-full border ${physCol.bg} ${physCol.text} ${physCol.border}">${physScore} / 10</span>
        </div>
        <div class="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div class="h-full rounded-full transition-all duration-300" style="width: ${physScore * 10}%; background-color: ${physCol.hex};"></div>
        </div>
        <p class="text-[10px] ${physScore >= 8 ? 'text-red-300 font-semibold' : 'text-slate-400'} leading-snug">${getPhysDesc(s, physScore, currentLang)}</p>
      </div>
      ${s.addictionPotential ? `<p class="text-[10.5px] text-slate-300 pt-1.5 border-t border-slate-800/60 italic">${s.addictionPotential}</p>` : ''}
    `;
  }

  const metabContainer = document.getElementById('modal-substance-metabolism');
  if (metabContainer && typeof getSubstancePKProfile === 'function') {
    const pk = getSubstancePKProfile(s.name);
    const { effective: enzActs } = getEffectiveEnzymeActivities();
    const simMod = getPersonalizedPKModifier(
      { id: -999, substanceName: s.name, route: selectedModalRoaName || 'oral', dose: (curRoa && curRoa.dose && curRoa.dose.commonMin) || 20 },
      ingestions
    );
    const stdHrs = (simMod.stdDurationMin / 60).toFixed(1).replace('.0', '');
    const realHrs = (simMod.realDurationMin / 60).toFixed(1).replace('.0', '');

    const isCalibrated = (typeof patientPKProfile !== 'undefined' && patientPKProfile.empiricalCalibrations)
      ? patientPKProfile.empiricalCalibrations.find(c => c.substanceName === s.name)
      : null;

    const calActionHtml = isCalibrated
      ? `
        <div class="flex items-center justify-between p-2 rounded-xl bg-indigo-950/70 border border-indigo-500/50 text-[10.5px]">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-emerald-300 font-bold">🎯 ${currentLang === 'fr' ? 'Étalonné sur vous :' : 'Calibrated on you:'}</span>
            <span class="font-mono font-bold text-white text-xs">${isCalibrated.observedHours}h à jeun</span>
            <span class="text-slate-400 font-mono">(std ${stdHrs}h)</span>
          </div>
          <button type="button" onclick="openQuickCalibrateModal('${s.name.replace(/'/g, "\\'")}')"
            class="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] transition shadow-sm">
            ${currentLang === 'fr' ? 'Modifier ✎' : 'Edit ✎'}
          </button>
        </div>
      `
      : `
        <button type="button" onclick="openQuickCalibrateModal('${s.name.replace(/'/g, "\\'")}')"
          class="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 transition cursor-pointer active:scale-[0.99]">
          <span class="text-sm">⏱</span>
          <span>${currentLang === 'fr' ? 'Indiquer mon temps d\'effet réel (à jeun)' : 'Set my real felt duration (fasting)'}</span>
        </button>
      `;

    let activeMetabolitesHtml = '';
    if (pk && pk.activeMetabolites && pk.activeMetabolites.length > 0) {
      const metPills = pk.activeMetabolites.map((m, idx) => {
        const safeM = m.name.replace(/'/g, "\\'");
        const fracPct = Math.round((m.conversionFraction || m.fractionOfParent || 0.2) * 100);
        const mCol = (typeof getMetaboliteCoherentColor === 'function')
          ? getMetaboliteCoherentColor(s.color, m, idx)
          : (m.color || '#38BDF8');
        const prefix = m.isSubMetabolite ? '↳↳' : '↳';
        const subTag = m.isSubMetabolite
          ? `<span class="px-1 py-0.2 rounded bg-slate-900 text-[8.5px] text-teal-300 border border-teal-500/30">${currentLang === 'fr' ? 'Sous-métabolite' : 'Sub-metabolite'}</span>`
          : '';
        const dashStyle = m.isSubMetabolite ? 'dotted' : 'dashed';
        return `<button type="button" onclick="showSubstanceDetails('${safeM}')" class="px-2 py-1 rounded-lg bg-slate-950/90 hover:bg-slate-800 border text-[10px] font-mono flex items-center gap-1.5 transition cursor-pointer" style="border-color: ${mCol}66;">
          <span class="w-2.5 h-0 border-t-2 flex-shrink-0" style="border-color: ${mCol}; border-top-style: ${dashStyle};"></span>
          <span style="color: ${mCol};"><strong>${prefix} ${m.name}</strong></span>
          ${subTag}
          <span class="text-slate-300">(${m.formationEnzyme} • ~${fracPct}% • t½ ${m.halfLifeHours}h)</span>
        </button>`;
      }).join('');
      activeMetabolitesHtml = `
        <div class="p-2 rounded-lg bg-slate-900/80 border border-violet-500/30 space-y-1.5">
          <div class="text-[10px] font-bold text-violet-300 uppercase tracking-wider">
            ${currentLang === 'fr' ? '🧬 Métabolites & Sous-métabolites actifs générés (≥ 5% steady-state)' : '🧬 Generated Active Metabolites & Sub-metabolites (≥ 5% steady-state)'}
          </div>
          <div class="flex flex-wrap gap-1.5">${metPills}</div>
        </div>
      `;
    }

    let isMetaboliteBannerHtml = '';
    if (s.metaboliteMeta && s.metaboliteMeta.isMetabolite) {
      const mm = s.metaboliteMeta;
      const duTag = mm.directUse === 'rc'
        ? (currentLang === 'fr' ? 'RC / Consommation directe possible' : 'RC / Direct use possible')
        : (mm.directUse === 'medication'
          ? (currentLang === 'fr' ? 'Médicament commercialisé & Métabolite' : 'Marketed Medication & Metabolite')
          : (currentLang === 'fr' ? 'Métabolite purement endogène (in vivo)' : 'Endogenous-only metabolite (in vivo)'));
      const parentsPills = (mm.parentSubstances || []).map(pName => {
        const safeP = pName.replace(/'/g, "\\'");
        return `<button type="button" onclick="showSubstanceDetails('${safeP}')" class="underline font-bold text-indigo-300 hover:text-white cursor-pointer">${pName}</button>`;
      }).join(', ');
      isMetaboliteBannerHtml = `
        <div class="p-2 rounded-lg bg-violet-950/50 border border-violet-500/40 text-[10px] text-violet-200 space-y-1">
          <div class="flex items-center justify-between flex-wrap gap-1">
            <span class="font-bold text-violet-300">🧬 ${currentLang === 'fr' ? 'Métabolite actif' : 'Active Metabolite'} (${duTag})</span>
            ${mm.formationEnzyme ? `<span class="font-mono text-[9.5px] px-1.5 py-0.5 rounded bg-slate-900 border border-violet-500/30">${mm.formationEnzyme}</span>` : ''}
          </div>
          ${parentsPills ? `<div>${currentLang === 'fr' ? 'Molécule(s) mère(s) :' : 'Parent substance(s):'} ${parentsPills}</div>` : ''}
        </div>
      `;
    }

    if (pk && pk.verified) {
      const pathwayPills = Object.entries(pk.pathways || {}).map(([enzId, fm]) => {
        const enzMeta = ENZYME_CATALOG[enzId] || { nameFr: enzId, nameEn: enzId };
        const actPct = Math.round((enzActs[enzId] !== undefined ? enzActs[enzId] : 1.0) * 100);
        const isRenal = enzId.startsWith('RENAL');
        const colCls = isRenal
          ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300'
          : 'bg-indigo-950/80 border-indigo-500/40 text-indigo-300';
        const actBadge = actPct !== 100
          ? `<span class="ml-1 px-1 py-0.2 rounded bg-slate-900 text-[8.5px] ${actPct > 105 ? 'text-emerald-300' : 'text-amber-300'}">${actPct}%</span>`
          : '';
        return `<span class="inline-flex items-center px-2 py-0.5 rounded-lg border text-[10px] font-mono font-bold ${colCls}">
          ${enzId} : ${Math.round(fm * 100)}%${actBadge}
        </span>`;
      }).join('');

      const prodrugHtml = pk.prodrug
        ? `<div class="p-2 rounded-lg bg-violet-950/40 border border-violet-500/30 text-[10px] text-violet-200">
            <strong>🧪 Prodrogue (${pk.prodrug.enzyme} → ${pk.prodrug.activeMetabolite}) :</strong> ${currentLang === 'fr' ? pk.prodrug.noteFr : pk.prodrug.noteEn}
           </div>`
        : '';

      metabContainer.innerHTML = `
        <div class="flex items-center justify-between flex-wrap gap-1">
          <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
            <span>✓ ${currentLang === 'fr' ? 'Données cliniques humaines vérifiées' : 'Verified human clinical data'}</span>
            ${pk.halfLifeHours ? `<span class="text-slate-400 font-mono">• t½ ≈ ${pk.halfLifeHours}h</span>` : ''}
          </span>
          <button type="button" onclick="openQuickCalibrateModal('${s.name.replace(/'/g, "\\'")}')"
            class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 hover:bg-indigo-950/90 border border-slate-700 hover:border-indigo-400 text-indigo-300 transition cursor-pointer"
            title="${currentLang === 'fr' ? 'Cliquer pour ajuster votre durée' : 'Click to adjust your duration'}">
            ⏱ ${currentLang === 'fr' ? 'Votre durée estimée :' : 'Your estimated duration:'} ${realHrs}h <span class="text-slate-500 font-normal">(std ${stdHrs}h) ✎</span>
          </button>
        </div>
        <div class="flex flex-wrap gap-1.5 pt-1">${pathwayPills}</div>
        <p class="text-[10.5px] text-slate-300 leading-relaxed">${currentLang === 'fr' ? pk.summaryFr : pk.summaryEn}</p>
        ${isMetaboliteBannerHtml}
        ${prodrugHtml}
        ${activeMetabolitesHtml}
        ${calActionHtml}
      `;
    } else {
      metabContainer.innerHTML = `
        <div class="flex items-center justify-between flex-wrap gap-1">
          <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400">
            ℹ️ ${currentLang === 'fr' ? 'Voie enzymatique non établie scientifiquement' : 'Enzymatic pathway not scientifically established'}
          </span>
          <button type="button" onclick="openQuickCalibrateModal('${s.name.replace(/'/g, "\\'")}')"
            class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 text-slate-300 transition cursor-pointer">
            ⏱ ${realHrs}h ✎
          </button>
        </div>
        <p class="text-[10px] text-slate-400 leading-relaxed">
          ${currentLang === 'fr' ? pk.summaryFr : pk.summaryEn}
        </p>
        ${isMetaboliteBannerHtml}
        ${activeMetabolitesHtml}
        ${calActionHtml}
      `;
    }
  }

  const interContainer = document.getElementById('modal-substance-interactions');
  interContainer.innerHTML = '';
  const inter = s.interactions;
  if (inter && (inter.dangerous?.length || inter.unsafe?.length || inter.uncertain?.length)) {
    if (inter.dangerous?.length) {
      interContainer.innerHTML += `
        <div class="text-[10px]"><span class="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-bold border border-red-500/30">${currentLang === 'fr' ? 'DANGEREUX' : 'DANGEROUS'}</span> : <span class="text-slate-300">${inter.dangerous.join(', ')}</span></div>
      `;
    }
    if (inter.unsafe?.length) {
      interContainer.innerHTML += `
        <div class="text-[10px]"><span class="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">${currentLang === 'fr' ? 'NON SÉCURISÉ' : 'UNSAFE'}</span> : <span class="text-slate-300">${inter.unsafe.join(', ')}</span></div>
      `;
    }
  } else {
    interContainer.innerHTML = `<span class="text-slate-500 text-[10px]">${currentLang === 'fr' ? 'Aucune interaction spécifique listée' : 'No specific interaction listed'}</span>`;
  }

  document.getElementById('modal-log-btn').onclick = () => {
    closeModal();
    switchTab('journal');
    if (typeof openQuickLogDrawer === 'function') {
      openQuickLogDrawer(selectedJournalDayOffset);
    }
    selectQuickSubstance(s.name, selectedModalRoaName);
  };

  document.getElementById('substance-detail-modal').classList.remove('hidden');
  setTimeout(() => {
    drawModalTheoreticalCurve(s, selectedModalRoaName);
  }, 50);
}

function closeModal() {
  document.getElementById('substance-detail-modal').classList.add('hidden');
}
