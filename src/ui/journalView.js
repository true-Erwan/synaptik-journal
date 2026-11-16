function initQuickSelect() {
  const input = document.getElementById('quick-search-input');
  if (input) input.value = '';
  resetQuickSearch();
}

function onQuickSearchInput(query) {
  const clearBtn = document.getElementById('quick-search-clear');
  const q = (query || '').trim().toLowerCase();
  if (clearBtn) {
    clearBtn.classList.toggle('hidden', q.length === 0);
  }
  renderQuickSuggestions(q);
}

function onQuickSearchFocus() {
  const input = document.getElementById('quick-search-input');
  const q = (input ? input.value : '').trim().toLowerCase();
  renderQuickSuggestions(q);
}

function clearQuickSearchInput() {
  const input = document.getElementById('quick-search-input');
  if (input) {
    input.value = '';
    input.focus();
  }
  const clearBtn = document.getElementById('quick-search-clear');
  if (clearBtn) clearBtn.classList.add('hidden');
  renderQuickSuggestions('');
}

let showEndogenousInQuickSearch = false;

function toggleQuickSearchEndogenous(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  showEndogenousInQuickSearch = !showEndogenousInQuickSearch;
  const input = document.getElementById('quick-search-input');
  const q = (input ? input.value : '').trim().toLowerCase();
  renderQuickSuggestions(q);
}

function renderQuickSuggestions(q) {
  const box = document.getElementById('quick-suggestions-box');
  if (!box) return;

  let list = [];
  let hiddenEndogenousCount = 0;

  if (!q || q.length === 0) {
    list = PRIORITY_SUGGESTIONS.map(name => SUBSTANCES_BY_NAME[name]).filter(Boolean);
  } else {
    const rankedMatches = [];

    for (let i = 0; i < SUBSTANCES_DATA.length; i++) {
      const s = SUBSTANCES_DATA[i];
      const rank = getSubstanceSearchRank(s, q);
      if (rank === 0) continue;

      if (s.metaboliteMeta && s.metaboliteMeta.directUse === 'endogenous_only' && !showEndogenousInQuickSearch) {
        hiddenEndogenousCount++;
        continue;
      }

      rankedMatches.push({ s, rank });
    }

    rankedMatches.sort((a, b) => (a.rank !== b.rank ? a.rank - b.rank : a.s.name.localeCompare(b.s.name)));
    list = rankedMatches.slice(0, 15).map(item => item.s);
  }

  const endogenousFooterHtml = (q && q.length > 0 && (hiddenEndogenousCount > 0 || showEndogenousInQuickSearch))
    ? `<div onclick="toggleQuickSearchEndogenous(event)" class="px-3 py-1.5 text-[10px] text-violet-300 hover:text-white bg-violet-950/40 hover:bg-violet-900/50 border-t border-slate-800/80 cursor-pointer flex items-center justify-between transition">
        <span>🧬 ${showEndogenousInQuickSearch
          ? (currentLang === 'fr' ? 'Masquer les métabolites purement endogènes' : 'Hide endogenous-only metabolites')
          : (currentLang === 'fr' ? `Afficher ${hiddenEndogenousCount} métabolite(s) endogène(s) masqué(s)` : `Show ${hiddenEndogenousCount} hidden endogenous metabolite(s)`)}</span>
        <span class="font-mono font-bold underline">${showEndogenousInQuickSearch ? (currentLang === 'fr' ? 'Masquer' : 'Hide') : (currentLang === 'fr' ? 'Afficher' : 'Show')}</span>
       </div>`
    : '';

  if (list.length === 0) {
    box.innerHTML = `<div class="p-3 text-center text-xs text-slate-400">${currentLang === 'fr' ? 'Aucune molécule trouvée' : 'No matching molecule found'}</div>${endogenousFooterHtml}`;
    box.classList.remove('hidden');
    return;
  }

  const headerHtml = (!q || q.length === 0)
    ? `<div class="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-900/80 border-b border-slate-800/80">${currentLang === 'fr' ? 'Suggestions fréquentes' : 'Frequent suggestions'}</div>`
    : `<div class="px-3 py-1.5 text-[10px] font-bold text-indigo-400 uppercase tracking-wider bg-slate-900/80 border-b border-slate-800/80">${currentLang === 'fr' ? 'Résultats correspondants' : 'Matching results'} (${list.length})</div>`;

  const rowsHtml = list.map(s => {
    const brand = (s.commonNames && s.commonNames.length > 0) ? s.commonNames.slice(0, 2).join(', ') : '';
    const cat = (s.categories && s.categories[0]) || '';
    const color = s.color || '#6366f1';
    const escapedName = s.name.replace(/'/g, "\\'");
    let metabBadge = '';
    if (s.metaboliteMeta && s.metaboliteMeta.isMetabolite) {
      const du = s.metaboliteMeta.directUse;
      const duLbl = du === 'rc'
        ? '🧬 RC / Métabolite'
        : (du === 'medication'
          ? (currentLang === 'fr' ? '🧬 Médicament / Métabolite' : '🧬 Med / Metabolite')
          : (currentLang === 'fr' ? '🧬 Métabolite endogène' : '🧬 Endogenous metabolite'));
      metabBadge = `<span class="text-[9px] px-1.5 py-0.2 rounded bg-violet-950/80 border border-violet-500/40 text-violet-300 font-semibold">${duLbl}</span>`;
    }
    return `
      <div onclick="selectQuickSubstance('${escapedName}')" class="flex items-center justify-between p-2.5 hover:bg-slate-800/70 cursor-pointer transition group">
        <div class="flex items-center gap-2.5 min-w-0">
          <span class="w-3 h-3 rounded-full shrink-0 shadow-sm transition-transform group-hover:scale-125" style="background-color: ${color};"></span>
          <div class="min-w-0">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="font-bold text-xs text-slate-100 group-hover:text-indigo-300 transition truncate">${s.name}</span>
              ${brand ? `<span class="text-[10px] text-slate-400 font-medium truncate">(${brand})</span>` : ''}
              ${metabBadge}
            </div>
            ${cat ? `<div class="text-[10px] text-slate-500 truncate">${cat}</div>` : ''}
          </div>
        </div>
        <div class="flex items-center gap-1 shrink-0 text-slate-500 group-hover:text-indigo-400 transition text-[11px] font-medium ml-2">
          <span class="text-[10px]">${currentLang === 'fr' ? 'Choisir' : 'Select'}</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </div>
      </div>
    `;
  }).join('');

  box.innerHTML = headerHtml + rowsHtml + endogenousFooterHtml;
  box.classList.remove('hidden');
}

function selectQuickSubstance(substanceName, preferredRoaName = null) {
  const s = SUBSTANCES_BY_NAME[substanceName];
  if (!s) return;
  selectedQuickSubstance = s;

  const box = document.getElementById('quick-suggestions-box');
  if (box) box.classList.add('hidden');
  const stepSearch = document.getElementById('quick-step-search');
  if (stepSearch) stepSearch.classList.add('hidden');
  const stepDose = document.getElementById('quick-step-dose');
  if (stepDose) stepDose.classList.remove('hidden');

  const dot = document.getElementById('quick-selected-dot');
  if (dot) dot.style.backgroundColor = s.color || '#6366f1';
  const nameEl = document.getElementById('quick-selected-name');
  if (nameEl) nameEl.textContent = s.name;
  const brandEl = document.getElementById('quick-selected-brand');
  if (brandEl) {
    const brands = (s.commonNames && s.commonNames.length > 0) ? s.commonNames.slice(0, 3).join(', ') : '';
    brandEl.textContent = brands ? `(${brands})` : '';
  }
  const catEl = document.getElementById('quick-selected-category');
  if (catEl) {
    catEl.textContent = (s.categories && s.categories[0]) ? s.categories[0] : (currentLang === 'fr' ? 'Molécule' : 'Substance');
  }

  let roas = s.roas || [];
  if (roas.length === 0) {
    roas = [{ name: 'oral', dose: { units: 'mg', commonMin: 100 } }];
  }
  let chosenRoa = null;
  if (preferredRoaName) {
    chosenRoa = roas.find(r => r.name.toLowerCase() === preferredRoaName.toLowerCase());
  }
  if (!chosenRoa) {
    chosenRoa = roas.find(r => r.name === 'oral') || roas[0];
  }
  selectedQuickRoa = chosenRoa;

  selectedQuickReleaseMode = 'IR';
  selectedQuickReleaseProfile = null;
  renderQuickRoaPills();
  renderQuickReleasePills();
  initQuickTime();
  updateQuickDoseFields(s, selectedQuickRoa);
  checkPreIngestionAlert(s.name);

  const doseInput = document.getElementById('quick-dose');
  if (doseInput) {
    setTimeout(() => {
      doseInput.focus();
      doseInput.select();
    }, 50);
  }
}

function resetQuickSearch() {
  selectedQuickSubstance = null;
  selectedQuickRoa = null;
  const stepDose = document.getElementById('quick-step-dose');
  if (stepDose) stepDose.classList.add('hidden');
  const stepSearch = document.getElementById('quick-step-search');
  if (stepSearch) stepSearch.classList.remove('hidden');
  const input = document.getElementById('quick-search-input');
  if (input) input.value = '';
  const clearBtn = document.getElementById('quick-search-clear');
  if (clearBtn) clearBtn.classList.add('hidden');
  const box = document.getElementById('quick-suggestions-box');
  if (box) box.classList.add('hidden');
  const banner = document.getElementById('preingestion-alert');
  if (banner) banner.classList.add('hidden');
}

function renderQuickRoaPills() {
  const roaContainer = document.getElementById('quick-roa-container');
  const roaPills = document.getElementById('quick-roa-pills');
  if (!roaContainer || !roaPills || !selectedQuickSubstance) return;

  roaContainer.classList.remove('hidden');

  let roas = selectedQuickSubstance.roas || [];
  if (roas.length === 0) {
    roas = [{ name: 'oral', dose: { units: 'mg' } }];
  }

  const currentRoaName = (selectedQuickRoa && selectedQuickRoa.name) ? selectedQuickRoa.name.toLowerCase() : 'oral';
  const hasCurrent = roas.some(r => r.name.toLowerCase() === currentRoaName);
  if (!hasCurrent && selectedQuickRoa) {
    roas = [...roas, selectedQuickRoa];
  }

  roaPills.innerHTML = roas.map(r => {
    const rName = r.name.toLowerCase();
    const isActive = rName === currentRoaName;
    const rInfo = getRoaInfo(rName);

    const qBio = r.bioavailability;
    const qBioLabel = qBio && (qBio.min !== undefined || qBio.max !== undefined)
      ? `${qBio.min ?? ''}${qBio.min !== undefined && qBio.max !== undefined && qBio.min !== qBio.max ? '-' : ''}${qBio.max !== qBio.min ? (qBio.max ?? '') : ''}%`
      : null;

    return `
      <button type="button" onclick="selectQuickRoa('${rName}')"
        class="px-3 py-1.5 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${isActive
        ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-md ring-1 ring-indigo-400/50'
        : 'bg-slate-900 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800'
      }">
        <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color: ${rInfo.color}; ${isActive ? `box-shadow: 0 0 8px ${rInfo.color};` : ''}"></span>
        <span>${rInfo.shortLabel}</span>
        ${qBioLabel ? `<span class="text-[9.5px] font-mono px-1 py-0.2 rounded bg-slate-950/80 text-cyan-300 border border-cyan-800/60 font-semibold">${qBioLabel}</span>` : ''}
        ${isActive ? '<span class="text-[10px] text-indigo-300 font-semibold ml-0.5">✓</span>' : ''}
      </button>
    `;
  }).join('');
}

function selectQuickRoa(roaName) {
  if (!selectedQuickSubstance) return;
  const rName = roaName.toLowerCase();
  const roas = selectedQuickSubstance.roas || [];
  let foundRoa = roas.find(r => r.name.toLowerCase() === rName);
  if (!foundRoa) {
    foundRoa = { name: rName, dose: { units: 'mg' } };
  }
  selectedQuickRoa = foundRoa;
  selectedQuickReleaseMode = 'IR';
  selectedQuickReleaseProfile = null;
  renderQuickRoaPills();
  renderQuickReleasePills();
  updateQuickDoseFields(selectedQuickSubstance, selectedQuickRoa);
}

function renderQuickReleasePills() {
  const container = document.getElementById('quick-release-container');
  const btnLi = document.getElementById('btn-release-type-li');
  const btnLp = document.getElementById('btn-release-type-lp');
  const indLi = document.getElementById('indicator-release-type-li');
  const indLp = document.getElementById('indicator-release-type-lp');
  const txtLi = document.getElementById('txt-release-type-li');
  const txtLp = document.getElementById('txt-release-type-lp');
  const lpBox = document.getElementById('quick-lp-dropdown-box');
  const lpSelect = document.getElementById('quick-lp-select');
  const descBox = document.getElementById('quick-release-desc');
  const badgeEl = document.getElementById('quick-release-duration-badge');
  const titleEl = document.getElementById('txt-quick-release-title');
  const lpLbl = document.getElementById('txt-lp-dropdown-label');

  if (!container || !btnLi || !btnLp || !selectedQuickSubstance) return;

  const rName = (selectedQuickRoa && selectedQuickRoa.name) ? selectedQuickRoa.name.toLowerCase() : 'oral';
  if (rName !== 'oral') {
    container.classList.add('hidden');
    return;
  }

  const profiles = getReleaseProfilesFor(selectedQuickSubstance.name, rName);
  const irProfile = profiles.find(p => !p.isExtended);
  const lpProfiles = profiles.filter(p => p.isExtended);

  const hasIR = !!irProfile;
  const hasLP = lpProfiles.length > 0;

  container.classList.remove('hidden');

  if (titleEl) {
    titleEl.textContent = currentLang === 'fr' ? 'Forme & Libération' : 'Formulation & Release';
  }
  if (lpLbl) {
    lpLbl.innerHTML = `
      <svg class="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
      <span>${currentLang === 'fr' ? 'Matrice LP & Marque commerciale :' : 'ER Matrix & Brand name:'}</span>
    `;
  }

  if (selectedQuickReleaseMode === 'IR' && !hasIR && hasLP) {
    selectedQuickReleaseMode = 'ER';
  } else if (selectedQuickReleaseMode === 'ER' && !hasLP && hasIR) {
    selectedQuickReleaseMode = 'IR';
  }

  if (hasIR) {
    btnLi.disabled = false;
    btnLi.className = selectedQuickReleaseMode === 'IR'
      ? "py-1.5 px-2.5 rounded-lg text-[11px] font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer bg-amber-500/25 border-amber-400 text-amber-200 shadow-sm ring-1 ring-amber-400/40"
      : "py-1.5 px-2.5 rounded-lg text-[11px] font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900";
    if (indLi) indLi.className = selectedQuickReleaseMode === 'IR' ? "w-2 h-2 rounded-full bg-amber-400" : "w-2 h-2 rounded-full bg-slate-600";
    if (txtLi) txtLi.textContent = currentLang === 'fr' ? 'Forme LI (Immédiate)' : 'IR Form (Immediate)';
  } else {
    btnLi.disabled = true;
    btnLi.className = "py-1.5 px-2.5 rounded-lg text-[11px] font-bold border transition flex items-center justify-center gap-1.5 cursor-not-allowed bg-slate-950/60 border-slate-900 text-slate-600 opacity-40";
    if (indLi) indLi.className = "w-2 h-2 rounded-full bg-slate-700";
    if (txtLi) txtLi.textContent = currentLang === 'fr' ? 'Pas de forme LI' : 'No IR available';
  }

  if (hasLP) {
    btnLp.disabled = false;
    btnLp.className = selectedQuickReleaseMode === 'ER'
      ? "py-1.5 px-2.5 rounded-lg text-[11px] font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer bg-amber-500/25 border-amber-400 text-amber-200 shadow-sm ring-1 ring-amber-400/40"
      : "py-1.5 px-2.5 rounded-lg text-[11px] font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900";
    if (indLp) indLp.className = selectedQuickReleaseMode === 'ER' ? "w-2 h-2 rounded-full bg-amber-400" : "w-2 h-2 rounded-full bg-slate-600";
    if (txtLp) txtLp.textContent = currentLang === 'fr' ? 'Forme LP (Prolongée)' : 'ER Form (Extended)';
  } else {
    btnLp.disabled = true;
    btnLp.className = "py-1.5 px-2.5 rounded-lg text-[11px] font-bold border transition flex items-center justify-center gap-1.5 cursor-not-allowed bg-slate-950/60 border-slate-900 text-slate-600 opacity-40";
    if (indLp) indLp.className = "w-2 h-2 rounded-full bg-slate-700";
    if (txtLp) txtLp.textContent = currentLang === 'fr' ? 'Pas de forme LP' : 'No ER available';
  }

  if (selectedQuickReleaseMode === 'ER' && hasLP) {
    if (lpBox) lpBox.classList.remove('hidden');
    if (lpSelect) {
      lpSelect.innerHTML = lpProfiles.map(p => {
        const optLabel = currentLang === 'fr' ? p.shortFr : p.shortEn;
        return `<option value="${p.id}">${optLabel}</option>`;
      }).join('');

      if (!selectedQuickReleaseProfile || !lpProfiles.some(p => p.id === selectedQuickReleaseProfile.id)) {
        selectedQuickReleaseProfile = lpProfiles[0];
      }
      lpSelect.value = selectedQuickReleaseProfile.id;
    }
  } else {
    if (lpBox) lpBox.classList.add('hidden');
    selectedQuickReleaseProfile = irProfile || RELEASE_PROFILES_CATALOG.defaultImmediate;
  }

  if (badgeEl && selectedQuickReleaseProfile) {
    if (selectedQuickReleaseMode === 'IR') {
      badgeEl.textContent = currentLang === 'fr' ? (irProfile ? irProfile.badgeFr : 'Standard LI') : (irProfile ? irProfile.badgeEn : 'Standard IR');
    } else {
      badgeEl.textContent = currentLang === 'fr' ? selectedQuickReleaseProfile.badgeFr : selectedQuickReleaseProfile.badgeEn;
    }
  }

  if (descBox && selectedQuickReleaseProfile) {
    if (selectedQuickReleaseMode === 'IR' && !hasLP) {
      descBox.innerHTML = `
        <div class="font-bold text-amber-300 mb-0.5">${currentLang === 'fr' ? 'Libération Immédiate conventionnelle' : 'Standard Immediate Release'}</div>
        <div class="text-slate-300">${currentLang === 'fr' ? "Forme galénique standard à libération immédiate (100% de la dose délivrée). Ce médicament n'existe pas sous forme de libération prolongée (LP)." : "Standard immediate release formulation (100% active dose). This medication does not exist in an extended-release (ER) form."}</div>
      `;
    } else {
      const title = currentLang === 'fr' ? selectedQuickReleaseProfile.titleFr : selectedQuickReleaseProfile.titleEn;
      const desc = currentLang === 'fr' ? selectedQuickReleaseProfile.descFr : selectedQuickReleaseProfile.descEn;
      descBox.innerHTML = `<div class="font-bold text-amber-300 mb-0.5">${title}</div><div class="text-slate-300">${desc}</div>`;
    }
  }
}

function setQuickReleaseMode(mode) {
  if (!selectedQuickSubstance) return;
  const rName = (selectedQuickRoa && selectedQuickRoa.name) ? selectedQuickRoa.name.toLowerCase() : 'oral';
  const profiles = getReleaseProfilesFor(selectedQuickSubstance.name, rName);
  const irProfile = profiles.find(p => !p.isExtended);
  const lpProfiles = profiles.filter(p => p.isExtended);

  if (mode === 'IR' && irProfile) {
    selectedQuickReleaseMode = 'IR';
    selectedQuickReleaseProfile = irProfile;
  } else if (mode === 'ER' && lpProfiles.length > 0) {
    selectedQuickReleaseMode = 'ER';
    selectedQuickReleaseProfile = lpProfiles[0];
  }
  renderQuickReleasePills();
}

function onQuickLpSelectChange(profileId) {
  if (!selectedQuickSubstance) return;
  const rName = (selectedQuickRoa && selectedQuickRoa.name) ? selectedQuickRoa.name.toLowerCase() : 'oral';
  const profiles = getReleaseProfilesFor(selectedQuickSubstance.name, rName);
  const lpProfiles = profiles.filter(p => p.isExtended);
  const found = lpProfiles.find(p => p.id === profileId) || lpProfiles[0];
  if (found) {
    selectedQuickReleaseProfile = found;
    selectedQuickReleaseMode = 'ER';
    renderQuickReleasePills();
  }
}

function selectQuickReleaseProfile(profileId) {
  if (!selectedQuickSubstance) return;
  const rName = (selectedQuickRoa && selectedQuickRoa.name) ? selectedQuickRoa.name.toLowerCase() : 'oral';
  const profiles = getReleaseProfilesFor(selectedQuickSubstance.name, rName);
  const found = profiles.find(p => p.id === profileId) || profiles[0];
  selectedQuickReleaseProfile = found;
  selectedQuickReleaseMode = found.isExtended ? 'ER' : 'IR';
  renderQuickReleasePills();
}

function updateQuickDoseFields(s, roa) {
  const doseInput = document.getElementById('quick-dose');
  const unitEl = document.getElementById('quick-unit');
  const tierContainer = document.getElementById('quick-tier-buttons');

  const roaName = (roa && roa.name) ? roa.name : 'oral';
  const nd = NON_DIVERTIBLE_DOSES[s.name];

  if (nd) {
    const ndRoute = nd[roaName] || nd['oral'] || Object.values(nd)[0];
    if (ndRoute) {
      const units = ndRoute.units || 'mg';
      if (unitEl) unitEl.textContent = units;
      const defaultDose = ndRoute.standard || ndRoute.max || 1000;
      if (doseInput) doseInput.value = defaultDose;

      if (tierContainer) {
        const tiers = [];
        if (ndRoute.low && ndRoute.low !== ndRoute.standard) {
          tiers.push({
            label: currentLang === 'fr' ? 'Dose faible' : 'Low dose',
            val: ndRoute.low,
            cls: 'bg-emerald-950/70 border-emerald-700/80 text-emerald-300'
          });
        }
        if (ndRoute.standard) {
          tiers.push({
            label: currentLang === 'fr' ? 'Dose standard' : 'Standard dose',
            val: ndRoute.standard,
            cls: 'bg-blue-950/70 border-blue-700/80 text-blue-300'
          });
        }
        if (ndRoute.max && ndRoute.max !== ndRoute.standard) {
          tiers.push({
            label: currentLang === 'fr' ? 'Dose max / prise' : 'Max dose/intake',
            val: ndRoute.max,
            cls: 'bg-amber-950/70 border-amber-700/80 text-amber-300'
          });
        }

        tierContainer.innerHTML = tiers.map(t => `
          <button type="button" onclick="setQuickDoseVal(${t.val})"
            class="px-2 py-0.5 rounded-lg text-[10px] font-semibold border ${t.cls} hover:brightness-125 transition flex items-center gap-1 shadow-sm">
            <span>${t.label}</span>
            <span class="opacity-80">(${t.val} ${units})</span>
          </button>
        `).join('');
        tierContainer.classList.remove('hidden');
      }
      return;
    }
  }

  const doseInfo = roa ? roa.dose : null;
  const units = (doseInfo && doseInfo.units) ? doseInfo.units : 'mg';
  if (unitEl) unitEl.textContent = units;

  let defaultDose = 100;
  if (doseInfo) {
    defaultDose = doseInfo.commonMin || doseInfo.lightMin || doseInfo.heavyMin || 100;
  }
  if (doseInput) doseInput.value = defaultDose;

  if (tierContainer) {
    if (doseInfo) {
      const tiers = [];
      if (doseInfo.threshold !== undefined) tiers.push({ label: currentLang === 'fr' ? 'Seuil' : 'Threshold', val: doseInfo.threshold, cls: 'bg-slate-800/80 border-slate-700 text-slate-300' });
      if (doseInfo.lightMin !== undefined)  tiers.push({ label: currentLang === 'fr' ? 'Léger' : 'Light',     val: doseInfo.lightMin,  cls: 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300' });
      if (doseInfo.commonMin !== undefined) tiers.push({ label: currentLang === 'fr' ? 'Commun' : 'Common',   val: doseInfo.commonMin, cls: 'bg-blue-950/60 border-blue-800/80 text-blue-300' });
      if (doseInfo.strongMin !== undefined) tiers.push({ label: currentLang === 'fr' ? 'Fort' : 'Strong',     val: doseInfo.strongMin, cls: 'bg-amber-950/60 border-amber-800/80 text-amber-300' });
      if (doseInfo.heavyMin !== undefined)  tiers.push({ label: currentLang === 'fr' ? 'Très fort' : 'Heavy', val: doseInfo.heavyMin,  cls: 'bg-rose-950/60 border-rose-800/80 text-rose-300' });

      if (tiers.length > 0) {
        tierContainer.innerHTML = tiers.map(t => `
          <button type="button" onclick="setQuickDoseVal(${t.val})"
            class="px-2 py-0.5 rounded-lg text-[10px] font-semibold border ${t.cls} hover:brightness-125 transition flex items-center gap-1 shadow-sm">
            <span>${t.label}</span>
            <span class="opacity-80">(${t.val} ${units})</span>
          </button>
        `).join('');
        tierContainer.classList.remove('hidden');
        return;
      }
    }
    tierContainer.innerHTML = '';
    tierContainer.classList.add('hidden');
  }
}

function setQuickDoseVal(val) {
  const doseInput = document.getElementById('quick-dose');
  if (doseInput) {
    doseInput.value = val;
    doseInput.focus();
  }
}

function initQuickTime() {
  selectedQuickTimeOffsetMinutes = 0;
  const timeInput = document.getElementById('quick-time-input');
  if (timeInput) {
    const now = new Date(getNowTime());
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    timeInput.value = `${hh}:${mm}`;
  }
  updateQuickTimePresetUI(0);
}

function setQuickTimePreset(offsetMinutes) {
  selectedQuickTimeOffsetMinutes = offsetMinutes;
  const targetDate = new Date(getNowTime() + offsetMinutes * 60000);
  const timeInput = document.getElementById('quick-time-input');
  if (timeInput) {
    const hh = String(targetDate.getHours()).padStart(2, '0');
    const mm = String(targetDate.getMinutes()).padStart(2, '0');
    timeInput.value = `${hh}:${mm}`;
  }
  updateQuickTimePresetUI(offsetMinutes);
  if (selectedQuickSubstance) {
    checkPreIngestionAlert(selectedQuickSubstance.name);
  }
}

function onQuickTimeInputChange(val) {
  if (!val) return;
  const parts = val.split(':');
  if (parts.length < 2) return;
  const h = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);

  const now = new Date(getNowTime());
  const target = new Date(getNowTime());
  target.setHours(h, m, 0, 0);

  let diffMinutes = Math.round((target.getTime() - now.getTime()) / 60000);
  if (diffMinutes > 12 * 60) diffMinutes -= 24 * 60;
  if (diffMinutes < -12 * 60) diffMinutes += 24 * 60;

  selectedQuickTimeOffsetMinutes = diffMinutes;
  updateQuickTimePresetUI(diffMinutes);
  if (selectedQuickSubstance) {
    checkPreIngestionAlert(selectedQuickSubstance.name);
  }
}

function updateQuickTimePresetUI(offsetMinutes) {
  const hint = document.getElementById('quick-time-relative-hint');
  if (hint) {
    if (offsetMinutes === 0) {
      hint.textContent = currentLang === 'fr' ? "À l'instant" : "Just now";
      hint.className = "text-[10px] text-indigo-400 font-bold";
    } else if (offsetMinutes < 0) {
      const m = Math.abs(offsetMinutes);
      const durStr = m >= 60 ? `${Math.floor(m / 60)}h${m % 60 > 0 ? String(m % 60).padStart(2, '0') : ''}` : `${m} min`;
      hint.textContent = currentLang === 'fr' ? `Il y a ${durStr} (passé)` : `${durStr} ago (past)`;
      hint.className = "text-[10px] text-amber-400 font-bold";
    } else {
      const m = offsetMinutes;
      const durStr = m >= 60 ? `${Math.floor(m / 60)}h${m % 60 > 0 ? String(m % 60).padStart(2, '0') : ''}` : `${m} min`;
      hint.textContent = currentLang === 'fr' ? `Dans ${durStr} (futur)` : `In ${durStr} (future)`;
      hint.className = "text-[10px] text-emerald-400 font-bold";
    }
  }

  document.querySelectorAll('.quick-preset-btn').forEach(btn => {
    const off = parseInt(btn.getAttribute('data-offset'), 10);
    btn.className = (off === offsetMinutes)
      ? "quick-preset-btn px-2 py-0.5 rounded-lg text-[10px] font-bold border transition bg-indigo-600 border-indigo-500 text-white shadow-sm"
      : "quick-preset-btn px-2 py-0.5 rounded-lg text-[10px] font-medium border bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 transition";
  });
}

function onQuickSubstanceChange() {
  if (selectedQuickSubstance) {
    checkPreIngestionAlert(selectedQuickSubstance.name);
  }
}

function checkPreIngestionAlert(newSubstanceName) {
  const banner = document.getElementById('preingestion-alert');
  if (!banner) return;
  banner.classList.add('hidden');
  banner.className = 'hidden rounded-xl p-2.5 text-xs border';

  const plannedTargetMs = getNowTime() + (selectedQuickTimeOffsetMinutes || 0) * 60000;
  let worstType = null;
  let alertHtml = '';

  if (typeof evaluatePreIngestionInteractions === 'function') {
    const evalRes = evaluatePreIngestionInteractions(newSubstanceName, {
      currentIngestions: ingestions,
      targetTimestampMs: plannedTargetMs,
      currentDayOffset: selectedJournalDayOffset,
      includeMultiDayHistory: true,
      enabledBackgroundSettings: enabledSettings
    });

    if (evalRes && evalRes.worstType) {
      worstType = evalRes.worstType;
      const primaryMsg = currentLang === 'fr' ? evalRes.primaryAlertMsgFr : evalRes.primaryAlertMsgEn;

      const extraLines = [];
      const seenMsgs = new Set([primaryMsg]);
      for (let i = 1; i < evalRes.alerts.length && extraLines.length < 2; i++) {
        const alt = evalRes.alerts[i];
        const mTxt = currentLang === 'fr' ? alt.msgFr : alt.msgEn;
        if (mTxt && !seenMsgs.has(mTxt)) {
          seenMsgs.add(mTxt);
          extraLines.push(`<div class="mt-1 pt-1 border-t border-white/10 text-[11px] opacity-90">${mTxt}</div>`);
        }
      }
      alertHtml = `<div>${primaryMsg}</div>${extraLines.join('')}`;
    }
  } else {
    ingestions.forEach(ing => {
      const res = checkInteraction(newSubstanceName, ing.substanceName);
      if (res && (!worstType || res.type === 'DANGEROUS')) {
        worstType = res.type;
        alertHtml = currentLang === 'fr'
          ? `⚠️ Interaction ${res.type === 'DANGEROUS' ? 'DANGEREUSE' : 'NON SÉCURISÉE'} avec ${ing.substanceName} pris(e) récemment !`
          : `⚠️ ${res.type === 'DANGEROUS' ? 'DANGEROUS' : 'UNSAFE'} interaction with recent ${ing.substanceName} intake!`;
      }
    });
  }

  if (worstType) {
    banner.classList.remove('hidden');
    banner.className = worstType === 'DANGEROUS'
      ? 'rounded-xl p-2.5 text-xs bg-red-500/20 border-red-500/40 text-red-200'
      : 'rounded-xl p-2.5 text-xs bg-amber-500/20 border-amber-500/40 text-amber-200';
    banner.innerHTML = alertHtml;
  } else if (typeof getPersonalizedPKModifier === 'function') {
    const previewMod = getPersonalizedPKModifier({
      id: -888,
      substanceName: newSubstanceName,
      route: selectedQuickRoa ? selectedQuickRoa.name : 'oral',
      dose: parseFloat(document.getElementById('quick-dose')?.value) || 20,
      timeOffsetMinutes: selectedQuickTimeOffsetMinutes || 0
    }, ingestions);

    if (previewMod.conflicts && previewMod.conflicts.length > 0) {
      banner.classList.remove('hidden');
      banner.className = 'rounded-xl p-2.5 text-xs bg-indigo-500/15 border border-indigo-500/40 text-indigo-200';
      const conflictText = previewMod.conflicts.map(c => currentLang === 'fr' ? c.descFr : c.descEn).join(' • ');
      const realH = (previewMod.realDurationMin / 60).toFixed(1).replace('.0', '');
      const stdH = (previewMod.stdDurationMin / 60).toFixed(1).replace('.0', '');
      banner.innerHTML = `🧬 <strong>${currentLang === 'fr' ? 'Compétition enzymatique / rénale détectée :' : 'Enzymatic / renal competition detected:'}</strong> ${conflictText} → <strong>⏱ ${realH}h</strong> <span class="opacity-75">(vs ${stdH}h std)</span>`;
    }
  }
}

function logIngestion() {
  if (!selectedQuickSubstance) return;
  const name = selectedQuickSubstance.name;
  const dose = parseFloat(document.getElementById('quick-dose').value) || 0;
  const unit = document.getElementById('quick-unit').textContent;
  const route = selectedQuickRoa ? selectedQuickRoa.name : 'oral';
  const offsetMin = selectedQuickTimeOffsetMinutes || 0;

  const relProf = selectedQuickReleaseProfile || RELEASE_PROFILES_CATALOG.defaultImmediate;
  const relId = relProf.id || 'IR';

  const existingIdx = ingestions.findIndex(item =>
    item.substanceName === name &&
    (item.route || 'oral') === route &&
    (item.releaseProfileId || 'IR') === relId
  );

  const newSubIntake = {
    dose: dose,
    timeOffsetMinutes: offsetMin,
    timestamp: getNowTime() + offsetMin * 60000,
    source: 'user_intake'
  };

  if (existingIdx !== -1) {
    const existing = ingestions[existingIdx];
    existing.source = existing.source || 'user_intake';
    if (!existing.intakes || !Array.isArray(existing.intakes)) {
      existing.intakes = [{
        dose: existing.dose,
        timeOffsetMinutes: existing.timeOffsetMinutes || 0,
        timestamp: existing.timestamp || getNowTime(),
        source: 'user_intake'
      }];
    }
    existing.intakes.push(newSubIntake);
    existing.dose = Number((existing.dose + dose).toFixed(2));
    existing.timeOffsetMinutes = offsetMin;
    existing.timestamp = newSubIntake.timestamp;
    ingestions.splice(existingIdx, 1);
    ingestions.unshift(existing);
  } else {
    ingestions.unshift({
      id: Date.now(),
      substanceName: name,
      dose: dose,
      unit: unit,
      route: route,
      source: 'user_intake',
      releaseProfileId: relId,
      releaseBadgeFr: relProf.badgeFr,
      releaseBadgeEn: relProf.badgeEn,
      isExtendedRelease: !!relProf.isExtended,
      waves: relProf.waves || [{ delayMin: 0, weight: 1.0, onsetScale: 1.0, riseScale: 1.0, plateauMin: 0, fallScale: 1.0 }],
      timeOffsetMinutes: offsetMin,
      timestamp: newSubIntake.timestamp,
      intakes: [newSubIntake]
    });
  }

  syncActiveDayIngestions();
  closeQuickLogDrawer();
  renderIngestions();
  drawTimeline();
  resetQuickSearch();
  if (journalSubView !== 'detail') {
    openJournalDayDetail(selectedJournalDayOffset);
  }
}

function deleteIngestion(id) {
  ingestions = ingestions.filter(i => i.id !== id);
  syncActiveDayIngestions();
  renderIngestions();
  drawTimeline();
  onQuickSubstanceChange();
}

function deleteSubIntake(ingestionId, subIntakeIdx) {
  const target = ingestions.find(i => i.id === ingestionId);
  if (!target) return;
  if (!target.intakes || target.intakes.length <= 1) {
    deleteIngestion(ingestionId);
    return;
  }
  target.intakes.splice(subIntakeIdx, 1);
  target.dose = Number(target.intakes.reduce((acc, it) => acc + (it.dose || 0), 0).toFixed(2));
  const lastIt = target.intakes[target.intakes.length - 1];
  if (lastIt) {
    target.timestamp = lastIt.timestamp;
    target.timeOffsetMinutes = lastIt.timeOffsetMinutes;
  }
  syncActiveDayIngestions();
  renderIngestions();
  drawTimeline();
  onQuickSubstanceChange();
}

function clearHistory() {
  ingestions = [];
  syncActiveDayIngestions();
  renderIngestions();
  drawTimeline();
  onQuickSubstanceChange();
}

function selectJournalDay(dayOffset, scrollToTop = false) {
  syncActiveDayIngestions();
  selectedJournalDayOffset = Math.min(0, parseInt(dayOffset, 10) || 0);
  const dayObj = getOrCreateJournalDay(selectedJournalDayOffset);
  ingestions = dayObj.ingestions;
  if (typeof syncBackgroundSettingsFromTreatments === 'function') {
    syncBackgroundSettingsFromTreatments(selectedJournalDayOffset);
  }

  virtualTimeOffsetMs = 0;
  timelinePanMin = 0;
  if (isSimulatingPlayback) toggleSimulationPlayback();

  initQuickTime();
  updateSimulationUI();
  renderIngestions();
  drawTimeline();
  onQuickSubstanceChange();

  if (scrollToTop) {
    const sc = document.getElementById('screen-container');
    if (sc && typeof sc.scrollTo === 'function') {
      sc.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

function stepJournalDay(delta) {
  const nextOffset = Math.min(0, selectedJournalDayOffset + delta);
  selectJournalDay(nextOffset, false);
}

function renderJournalDayNavigator() {
  const titleEl = document.getElementById('journal-active-day-title');
  const dateEl = document.getElementById('journal-active-day-date');
  const nextBtn = document.getElementById('btn-next-day');
  const returnTodayBtn = document.getElementById('btn-return-today');
  const bannerEl = document.getElementById('past-day-banner');
  const timelineTitleEl = document.getElementById('txt-timeline-title');
  const cumulTitleEl = document.getElementById('txt-daily-cumul-title');
  const historyTitleEl = document.getElementById('txt-history-title');

  const dayTitle = formatJournalDayTitle(selectedJournalDayOffset, currentLang);
  const dayFullDate = formatJournalDayFullDate(selectedJournalDayOffset, currentLang);
  const longDate = (typeof formatJournalLongDate === 'function')
    ? formatJournalLongDate(selectedJournalDayOffset, currentLang)
    : dayTitle;

  if (titleEl) {
    titleEl.textContent = longDate;
    titleEl.className = selectedJournalDayOffset === 0
      ? 'text-xs font-extrabold text-white tracking-wide truncate'
      : 'text-xs font-extrabold text-amber-300 tracking-wide truncate';
  }
  if (dateEl) {
    dateEl.textContent = selectedJournalDayOffset === 0 ? dayTitle : dayFullDate;
    dateEl.className = selectedJournalDayOffset === 0
      ? 'text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300'
      : 'text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300';
  }

  if (nextBtn) {
    nextBtn.disabled = selectedJournalDayOffset >= 0;
  }
  if (returnTodayBtn) {
    returnTodayBtn.classList.toggle('hidden', selectedJournalDayOffset === 0);
    returnTodayBtn.textContent = currentLang === 'fr' ? "Aujourd'hui" : 'Today';
  }

  if (timelineTitleEl) {
    timelineTitleEl.textContent = selectedJournalDayOffset === 0
      ? I18N[currentLang].timelineTitle
      : (currentLang === 'fr' ? `Courbes d'effet — ${dayTitle}` : `Effect curves — ${dayTitle}`);
  }
  if (cumulTitleEl) {
    cumulTitleEl.textContent = selectedJournalDayOffset === 0
      ? (currentLang === 'fr' ? "Dosages Cumulés d'Aujourd'hui" : "Today's Cumulative Dosages")
      : (currentLang === 'fr' ? `Dosages Cumulés — ${dayTitle}` : `Cumulative Dosages — ${dayTitle}`);
  }
  if (historyTitleEl) {
    historyTitleEl.textContent = selectedJournalDayOffset === 0
      ? I18N[currentLang].historyTitle
      : (currentLang === 'fr' ? `Prises enregistrées — ${dayTitle}` : `Recorded intakes — ${dayTitle}`);
  }

  if (bannerEl) {
    if (selectedJournalDayOffset === 0) {
      bannerEl.classList.add('hidden');
      bannerEl.innerHTML = '';
    } else {
      bannerEl.classList.remove('hidden');
      const totalIntakes = ingestions.reduce((sum, ing) => sum + ((ing.intakes && ing.intakes.length) ? ing.intakes.length : 1), 0);
      bannerEl.innerHTML = `
        <div class="min-w-0 flex-1">
          <div class="font-bold text-amber-300 flex items-center gap-1">
            <span>📂</span>
            <span>${currentLang === 'fr'
              ? `Archive du ${dayFullDate} (${dayTitle})`
              : `Archive of ${dayFullDate} (${dayTitle})`}</span>
          </div>
          <div class="text-[10px] text-amber-100/90 mt-0.5">
            ${currentLang === 'fr'
              ? `Vous consultez le graphique, les dosages cumulés (${ingestions.length} molécule${ingestions.length > 1 ? 's' : ''}, ${totalIntakes} prise${totalIntakes > 1 ? 's' : ''}) et le détail de cette journée.`
              : `Viewing the graph, cumulative dosages (${ingestions.length} substance${ingestions.length > 1 ? 's' : ''}, ${totalIntakes} intake${totalIntakes > 1 ? 's' : ''}) and logs for this day.`}
          </div>
        </div>
        <button type="button" onclick="selectJournalDay(0)"
          class="px-2.5 py-1.5 rounded-lg bg-amber-500/30 hover:bg-amber-500/40 border border-amber-400/60 text-amber-100 font-bold text-[10px] flex-shrink-0 transition cursor-pointer">
          ${currentLang === 'fr' ? "Revenir à Aujourd'hui ↩" : 'Back to Today ↩'}
        </button>
      `;
    }
  }
}

function renderDailyCumulativeSummary() {
  const listEl = document.getElementById('daily-cumulative-list');
  const badgeEl = document.getElementById('daily-cumul-badge');
  if (!listEl) return;

  const totalIntakesCount = ingestions.reduce(
    (sum, ing) => sum + ((ing.intakes && ing.intakes.length > 0) ? ing.intakes.length : 1),
    0
  );

  const groupedBySub = {};
  ingestions.forEach(ing => {
    const name = ing.substanceName;
    if (!groupedBySub[name]) {
      const s = SUBSTANCES_BY_NAME[name];
      groupedBySub[name] = {
        substanceName: name,
        substance: s,
        color: (s && s.color) ? s.color : '#818cf8',
        unit: ing.unit || 'mg',
        route: ing.route || 'oral',
        totalDose: 0,
        intakesChrono: [],
         sampleIng: ing
      };
    }
    const grp = groupedBySub[name];
    const subIntakes = (ing.intakes && ing.intakes.length > 0)
      ? ing.intakes
      : [{ dose: ing.dose, timestamp: ing.timestamp, timeOffsetMinutes: ing.timeOffsetMinutes || 0 }];

    subIntakes.forEach(it => {
      grp.totalDose = Number((grp.totalDose + (it.dose || 0)).toFixed(2));
      const dTime = it.timestamp ? new Date(it.timestamp) : new Date(getNowTime() + (it.timeOffsetMinutes || 0) * 60000);
      grp.intakesChrono.push({
        dose: it.dose,
        unit: ing.unit || 'mg',
        route: ing.route || 'oral',
        timeStr: dTime.toTimeString().slice(0, 5),
        ts: dTime.getTime(),
        releaseBadge: ing.releaseProfileId && ing.releaseProfileId !== 'IR'
          ? (currentLang === 'fr' ? (ing.releaseBadgeFr || 'LP') : (ing.releaseBadgeEn || 'ER'))
          : null
      });
    });
  });

  const groups = Object.values(groupedBySub);
  if (badgeEl) {
    badgeEl.textContent = currentLang === 'fr'
      ? `${groups.length} molécule${groups.length > 1 ? 's' : ''} • ${totalIntakesCount} prise${totalIntakesCount > 1 ? 's' : ''}`
      : `${groups.length} substance${groups.length > 1 ? 's' : ''} • ${totalIntakesCount} intake${totalIntakesCount > 1 ? 's' : ''}`;
  }

  if (groups.length === 0) {
    listEl.innerHTML = `
      <div class="text-center py-2.5 text-slate-500 text-[11px] bg-slate-950/60 rounded-xl border border-slate-800/70">
        ${currentLang === 'fr'
          ? 'Aucun dosage cumulé sur cette journée.'
          : 'No cumulative dosage recorded on this day.'}
      </div>
    `;
    return;
  }

  listEl.innerHTML = groups.map(grp => {
    grp.intakesChrono.sort((a, b) => a.ts - b.ts);
    const s = grp.substance;
    const brand = (s && s.commonNames && s.commonNames[0]) ? ` (${s.commonNames[0]})` : '';
    const tierInfo = getDoseTierInfo(grp.substanceName, grp.route, grp.totalDose, currentLang);
    const pkMod = (typeof getPersonalizedPKModifier === 'function')
      ? getPersonalizedPKModifier(grp.sampleIng, ingestions)
      : null;
    const realDurH = pkMod ? (pkMod.realDurationMin / 60).toFixed(1).replace('.0', '') + 'h' : '';

    const breakdownHtml = grp.intakesChrono.map(it => `
      <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-900 border border-slate-700/80 text-[10px] font-mono text-slate-200">
        <span class="text-indigo-300 font-bold">${it.timeStr}</span>
        <span>:</span>
        <span class="font-bold text-white">${it.dose}${it.unit}</span>
        ${it.releaseBadge ? `<span class="text-[8.5px] text-amber-300">(${it.releaseBadge})</span>` : ''}
      </span>
    `).join('<span class="text-slate-600 text-[10px] font-bold">+</span>');

    return `
      <div class="bg-slate-950/90 border border-slate-800/90 rounded-xl p-2.5 space-y-1.5">
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <div class="flex items-center gap-1.5 min-w-0">
            <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background-color: ${grp.color};"></span>
            <span class="font-bold text-xs text-white truncate">${grp.substanceName}</span>
            <span class="text-[10px] text-slate-400 truncate">${brand}</span>
          </div>
          <div class="flex items-center gap-1.5 flex-shrink-0">
            <span class="px-2 py-0.5 rounded-lg bg-indigo-950/90 border border-indigo-500/60 font-mono font-extrabold text-xs" style="color: ${grp.color};">
              ${currentLang === 'fr' ? 'Total' : 'Total'} ${grp.totalDose} ${grp.unit}
            </span>
            <span class="text-[9.5px] px-1.5 py-0.5 rounded font-bold border ${tierInfo.badgeCls}">
              ${tierInfo.label}
            </span>
            ${realDurH ? `<span class="text-[9.5px] font-mono text-slate-400">⏱ ${realDurH}/prise</span>` : ''}
          </div>
        </div>
        <div class="flex items-center gap-1 flex-wrap pt-0.5">
          <span class="text-[9.5px] text-slate-400 font-semibold mr-0.5">
            ${currentLang === 'fr' ? `Détail (${grp.intakesChrono.length} prise${grp.intakesChrono.length > 1 ? 's' : ''}) :` : `Breakdown (${grp.intakesChrono.length}):`}
          </span>
          ${breakdownHtml}
        </div>
      </div>
    `;
  }).join('');
}

let journalSubView = 'list';
let historyStatsPeriod = '7d';

function formatJournalLongDate(dayOffset, lang = currentLang) {
  const d = new Date(sessionBaseTimestamp);
  d.setDate(d.getDate() + dayOffset);
  const monthsFr = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const mName = lang === 'fr' ? monthsFr[d.getMonth()] : monthsEn[d.getMonth()];
  return lang === 'fr'
    ? `${d.getDate()} ${mName} ${d.getFullYear()}`
    : `${mName} ${d.getDate()}, ${d.getFullYear()}`;
}

function formatJournalShortWeekdayYear(dayOffset, lang = currentLang) {
  const d = new Date(sessionBaseTimestamp);
  d.setDate(d.getDate() + dayOffset);
  const daysFr = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
  const daysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsFr = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dName = lang === 'fr' ? daysFr[d.getDay()] : daysEn[d.getDay()];
  const mName = lang === 'fr' ? monthsFr[d.getMonth()] : monthsEn[d.getMonth()];
  return lang === 'fr'
    ? `${dName} ${d.getDate()} ${mName} ${d.getFullYear()}`
    : `${dName}, ${mName} ${d.getDate()}, ${d.getFullYear()}`;
}

function openQuickLogDrawer(dayOffset) {
  if (dayOffset !== undefined && dayOffset !== selectedJournalDayOffset) {
    syncActiveDayIngestions();
    selectedJournalDayOffset = Math.min(0, parseInt(dayOffset, 10) || 0);
    const dayObj = getOrCreateJournalDay(selectedJournalDayOffset);
    ingestions = dayObj.ingestions;
    initQuickTime();
    renderJournalDayNavigator();
  }
  const drawer = document.getElementById('quick-log-drawer');
  const hint = document.getElementById('quick-log-target-day-hint');
  if (hint) {
    const longD = formatJournalLongDate(selectedJournalDayOffset, currentLang);
    const titleD = formatJournalDayTitle(selectedJournalDayOffset, currentLang);
    hint.textContent = currentLang === 'fr'
      ? `Ajout dans : ${longD} (${titleD})`
      : `Adding to: ${longD} (${titleD})`;
  }
  if (drawer) {
    drawer.classList.remove('hidden');
  }
  const inp = document.getElementById('quick-search-input');
  if (inp && typeof inp.focus === 'function') {
    inp.focus();
  }
}

function closeQuickLogDrawer() {
  const drawer = document.getElementById('quick-log-drawer');
  if (drawer) {
    drawer.classList.add('hidden');
  }
}

function openJournalDayDetail(dayOffset) {
  journalSubView = 'detail';
  closeQuickLogDrawer();
  selectJournalDay(dayOffset, true);
  const daysView = document.getElementById('journal-days-view');
  const detailView = document.getElementById('journal-day-detail-view');
  if (daysView) daysView.classList.add('hidden');
  if (detailView) detailView.classList.remove('hidden');
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(() => drawTimeline());
  }
  setTimeout(drawTimeline, 50);
}

function closeJournalDayDetail() {
  journalSubView = 'list';
  closeQuickLogDrawer();
  const daysView = document.getElementById('journal-days-view');
  const detailView = document.getElementById('journal-day-detail-view');
  if (detailView) detailView.classList.add('hidden');
  if (daysView) daysView.classList.remove('hidden');
  renderJournalDaysList();
}

function setHistoryStatsPeriod(period) {
  historyStatsPeriod = period === 'all' ? 'all' : '7d';
  const btn7 = document.getElementById('btn-stats-period-7d');
  const btnAll = document.getElementById('btn-stats-period-all');
  const activeCls = 'px-2.5 py-1 rounded-lg text-[10px] font-bold bg-indigo-600 text-white border border-indigo-500 transition cursor-pointer';
  const inactiveCls = 'px-2.5 py-1 rounded-lg text-[10px] font-medium bg-transparent text-slate-400 hover:text-slate-200 border border-transparent transition cursor-pointer';
  if (btn7) btn7.className = historyStatsPeriod === '7d' ? activeCls : inactiveCls;
  if (btnAll) btnAll.className = historyStatsPeriod === 'all' ? activeCls : inactiveCls;
  renderStatsPage();
}

function openJournalDayFromStats(dayOffset) {
  if (typeof switchTab === 'function') {
    switchTab('journal');
  }
  openJournalDayDetail(dayOffset);
}

function getSortedHistoryOffsets(includeToday = true) {
  const keys = Object.keys(journalDaysHistory)
    .map(k => parseInt(k, 10))
    .filter(n => !isNaN(n) && (includeToday ? n <= 0 : n < 0));
  for (let d = includeToday ? 0 : -1; d >= -6; d--) {
    if (!keys.includes(d)) keys.push(d);
  }
  return keys.sort((a, b) => b - a);
}

function formatStatTotalDose(dose, unit) {
  if (!isFinite(dose)) return '0';
  const rounded = Math.round(dose * 100) / 100;
  return `${rounded} ${unit || 'mg'}`;
}

function renderStatsPage() {
  const kpiEl = document.getElementById('history-stats-kpis');
  const barsEl = document.getElementById('history-daily-bars');
  const topEl = document.getElementById('history-stats-top-substances');
  const breakdownEl = document.getElementById('history-stats-breakdown');
  const rangeEl = document.getElementById('history-stats-daily-range');
  if (!kpiEl && !barsEl && !topEl && !breakdownEl) return;

  const dailyTitleEl = document.getElementById('txt-stats-daily-title');
  const topTitleEl = document.getElementById('txt-stats-top-title');
  const topSubEl = document.getElementById('txt-stats-top-sub');
  if (dailyTitleEl) {
    dailyTitleEl.textContent = currentLang === 'fr'
      ? 'Activité par jour (cliquer pour ouvrir)'
      : 'Daily intake activity (click to open)';
  }
  if (topTitleEl) {
    topTitleEl.textContent = currentLang === 'fr'
      ? 'Molécules & doses cumulées'
      : 'Substances & cumulative doses';
  }
  if (topSubEl) {
    topSubEl.textContent = currentLang === 'fr'
      ? 'Cliquer pour voir la fiche'
      : 'Click to inspect molecule';
  }

  const allOffsetsDesc = getSortedHistoryOffsets(true);
  const periodOffsetsDesc = historyStatsPeriod === '7d'
    ? allOffsetsDesc.filter(d => d >= -6 && d <= 0)
    : allOffsetsDesc;
  const chronoOffsets = [...periodOffsetsDesc].sort((a, b) => a - b);

  let totalIntakes = 0;
  let activeDaysCount = 0;
  const subStatsMap = {};
  const categoryStatsMap = {};
  const slotCounts = { morning: 0, afternoon: 0, evening: 0, night: 0 };
  const dailyRows = [];

  chronoOffsets.forEach(dOff => {
    const dayEntry = getOrCreateJournalDay(dOff);
    const dayIngs = dayEntry.ingestions || [];
    let dayIntakesCount = 0;
    const daySubsSeen = new Set();

    dayIngs.forEach(ing => {
      const subObj = SUBSTANCES_BY_NAME[ing.substanceName];
      const subCol = (subObj && subObj.color) ? subObj.color : '#818cf8';
      const intakesList = (ing.intakes && ing.intakes.length > 0)
        ? ing.intakes
        : [{ dose: ing.dose, timestamp: ing.timestamp || dayEntry.referenceTimeMs }];
      const primaryCat = (subObj && Array.isArray(subObj.categories) && subObj.categories.length > 0)
        ? subObj.categories[0]
        : (currentLang === 'fr' ? 'Autre' : 'Other');

      if (!subStatsMap[ing.substanceName]) {
        subStatsMap[ing.substanceName] = {
          name: ing.substanceName,
          color: subCol,
          unit: ing.unit || 'mg',
          totalDose: 0,
          intakes: 0,
          days: new Set(),
          category: primaryCat
        };
      }
      if (!categoryStatsMap[primaryCat]) {
        categoryStatsMap[primaryCat] = { name: primaryCat, intakes: 0, substances: new Set(), color: subCol };
      }

      subStatsMap[ing.substanceName].days.add(dOff);
      categoryStatsMap[primaryCat].substances.add(ing.substanceName);

      intakesList.forEach(it => {
        const dVal = parseFloat(it.dose !== undefined ? it.dose : ing.dose) || 0;
        subStatsMap[ing.substanceName].totalDose += dVal;
        subStatsMap[ing.substanceName].intakes += 1;
        categoryStatsMap[primaryCat].intakes += 1;
        dayIntakesCount += 1;
        totalIntakes += 1;

        const dt = it.timestamp ? new Date(it.timestamp) : new Date(dayEntry.referenceTimeMs);
        const hr = dt.getHours();
        if (hr >= 6 && hr < 12) slotCounts.morning += 1;
        else if (hr >= 12 && hr < 18) slotCounts.afternoon += 1;
        else if (hr >= 18 && hr < 24) slotCounts.evening += 1;
        else slotCounts.night += 1;
      });
      daySubsSeen.add(subCol);
    });

    if (dayIntakesCount > 0) activeDaysCount += 1;
    dailyRows.push({
      dayOffset: dOff,
      label: formatJournalDayShortLabel(dOff, currentLang),
      intakesCount: dayIntakesCount,
      colors: [...daySubsSeen]
    });
  });

  const subList = Object.values(subStatsMap).sort((a, b) => (b.intakes - a.intakes) || (b.days.size - a.days.size) || a.name.localeCompare(b.name));
  const catList = Object.values(categoryStatsMap).sort((a, b) => b.intakes - a.intakes);
  const topSub = subList[0] || null;
  const topCat = catList[0] || null;
  const avgPerActiveDay = activeDaysCount > 0 ? (totalIntakes / activeDaysCount).toFixed(1) : '0.0';

  const slotLabels = [
    { key: 'morning', label: currentLang === 'fr' ? 'Matin (6–12h)' : 'Morning (6–12h)', count: slotCounts.morning, color: '#fbbf24' },
    { key: 'afternoon', label: currentLang === 'fr' ? 'Après-midi (12–18h)' : 'Afternoon (12–18h)', count: slotCounts.afternoon, color: '#38bdf8' },
    { key: 'evening', label: currentLang === 'fr' ? 'Soir (18–00h)' : 'Evening (18–00h)', count: slotCounts.evening, color: '#a78bfa' },
    { key: 'night', label: currentLang === 'fr' ? 'Nuit (00–6h)' : 'Night (00–6h)', count: slotCounts.night, color: '#64748b' }
  ];
  const dominantSlot = [...slotLabels].sort((a, b) => b.count - a.count)[0];

  if (rangeEl) {
    rangeEl.textContent = `${chronoOffsets.length}j • ${activeDaysCount} ${currentLang === 'fr' ? 'actif(s)' : 'active'}`;
  }

  if (kpiEl) {
    kpiEl.innerHTML = `
      <div class="bg-slate-950/85 border border-slate-800/90 rounded-xl p-2.5">
        <div class="text-[9.5px] uppercase tracking-wider font-bold text-slate-400">
          ${currentLang === 'fr' ? 'Prises enregistrées' : 'Recorded intakes'}
        </div>
        <div class="text-lg font-extrabold text-white mt-0.5 font-mono">${totalIntakes}</div>
        <div class="text-[10px] text-indigo-300 mt-0.5">
          ${activeDaysCount}/${chronoOffsets.length} ${currentLang === 'fr' ? 'jours actifs' : 'active days'}
        </div>
      </div>
      <div class="bg-slate-950/85 border border-slate-800/90 rounded-xl p-2.5">
        <div class="text-[9.5px] uppercase tracking-wider font-bold text-slate-400">
          ${currentLang === 'fr' ? 'Molécules distinctes' : 'Distinct substances'}
        </div>
        <div class="text-lg font-extrabold text-emerald-300 mt-0.5 font-mono">${subList.length}</div>
        <div class="text-[10px] text-slate-400 truncate mt-0.5">
          ${topCat ? `${topCat.name} (${topCat.intakes}×)` : '—'}
        </div>
      </div>
      <div class="bg-slate-950/85 border border-slate-800/90 rounded-xl p-2.5">
        <div class="text-[9.5px] uppercase tracking-wider font-bold text-slate-400">
          ${currentLang === 'fr' ? 'Moyenne / jour actif' : 'Avg / active day'}
        </div>
        <div class="text-lg font-extrabold text-sky-300 mt-0.5 font-mono">${avgPerActiveDay}</div>
        <div class="text-[10px] text-slate-400 truncate mt-0.5">
          ${dominantSlot && dominantSlot.count > 0 ? dominantSlot.label : '—'}
        </div>
      </div>
      <div class="bg-slate-950/85 border border-slate-800/90 rounded-xl p-2.5">
        <div class="text-[9.5px] uppercase tracking-wider font-bold text-slate-400">
          ${currentLang === 'fr' ? 'Plus fréquente' : 'Most frequent'}
        </div>
        <div class="text-sm font-extrabold mt-1 truncate flex items-center gap-1.5" style="color: ${topSub ? topSub.color : '#94a3b8'};">
          ${topSub ? `<span class="w-2 h-2 rounded-full flex-shrink-0" style="background-color: ${topSub.color};"></span><span class="truncate">${topSub.name}</span>` : '—'}
        </div>
        <div class="text-[10px] text-slate-400 mt-1 font-mono">
          ${topSub ? `${topSub.intakes}× • ${formatStatTotalDose(topSub.totalDose, topSub.unit)}` : (currentLang === 'fr' ? 'Aucune donnée' : 'No data')}
        </div>
      </div>
    `;
  }

  if (barsEl) {
    const maxDayIntakes = Math.max(1, ...dailyRows.map(r => r.intakesCount));
    barsEl.innerHTML = dailyRows.map(r => {
      const hPct = r.intakesCount > 0 ? Math.max(18, Math.round((r.intakesCount / maxDayIntakes) * 100)) : 8;
      const isSelected = r.dayOffset === selectedJournalDayOffset;
      const dots = r.colors.slice(0, 3).map(c => `<span class="w-1.5 h-1.5 rounded-full" style="background-color: ${c};"></span>`).join('');
      const barCol = r.intakesCount === 0
        ? 'bg-slate-800/70'
        : isSelected
          ? 'bg-amber-400'
          : (r.dayOffset === 0 ? 'bg-indigo-500' : 'bg-sky-500/80 group-hover:bg-indigo-400');

      return `
        <button type="button" onclick="openJournalDayFromStats(${r.dayOffset})"
          class="group flex-1 min-w-[34px] flex flex-col items-center gap-1 cursor-pointer focus:outline-none">
          <span class="text-[9.5px] font-mono font-bold ${isSelected ? 'text-amber-300' : 'text-slate-300'}">${r.intakesCount}</span>
          <div class="w-full h-16 flex items-end justify-center px-1 bg-slate-900/70 rounded-lg border ${isSelected ? 'border-amber-400/60' : 'border-slate-800/80 group-hover:border-indigo-500/50'}">
            <div class="w-full max-w-[20px] rounded-t-md transition-all ${barCol}" style="height: ${hPct}%;"></div>
          </div>
          <div class="flex items-center gap-0.5 h-2">${dots}</div>
          <span class="text-[9px] font-bold truncate max-w-full ${isSelected ? 'text-amber-300' : (r.dayOffset === 0 ? 'text-indigo-300' : 'text-slate-400')}">${r.label}</span>
        </button>
      `;
    }).join('');
  }

  if (topEl) {
    if (subList.length === 0) {
      topEl.innerHTML = `<div class="text-[11px] text-slate-500 italic py-2 text-center">${currentLang === 'fr' ? 'Aucune prise enregistrée sur cette période.' : 'No intakes recorded for this period.'}</div>`;
    } else {
      const maxIntakes = Math.max(1, subList[0].intakes);
      topEl.innerHTML = subList.slice(0, 8).map(item => {
        const wPct = Math.max(10, Math.round((item.intakes / maxIntakes) * 100));
        return `
          <button type="button" onclick="showSubstanceDetails('${item.name.replace(/'/g, "\\'")}')"
            class="w-full text-left bg-slate-900/70 hover:bg-slate-800/70 border border-slate-800/80 rounded-xl p-2 transition cursor-pointer space-y-1.5">
            <div class="flex items-center justify-between gap-2 text-[11px]">
              <span class="font-bold text-slate-100 flex items-center gap-1.5 truncate">
                <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background-color: ${item.color};"></span>
                <span class="truncate">${item.name}</span>
              </span>
              <span class="font-mono font-bold text-slate-200 flex-shrink-0">
                ${item.intakes}× • <span style="color: ${item.color};">${formatStatTotalDose(item.totalDose, item.unit)}</span>
                <span class="text-[9.5px] text-slate-400 font-normal">(${item.days.size}j)</span>
              </span>
            </div>
            <div class="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all" style="width: ${wPct}%; background-color: ${item.color};"></div>
            </div>
          </button>
        `;
      }).join('');
    }
  }

  if (breakdownEl) {
    const maxCat = Math.max(1, ...(catList.map(c => c.intakes)));
    const catHtml = catList.length === 0
      ? `<div class="text-[10px] text-slate-500 italic">—</div>`
      : catList.slice(0, 4).map(c => {
          const pct = totalIntakes > 0 ? Math.round((c.intakes / totalIntakes) * 100) : 0;
          const barW = Math.max(12, Math.round((c.intakes / maxCat) * 100));
          return `
            <div class="space-y-0.5">
              <div class="flex items-center justify-between text-[10px]">
                <span class="text-slate-200 font-semibold truncate capitalize">${c.name}</span>
                <span class="text-slate-400 font-mono">${c.intakes}× (${pct}%)</span>
              </div>
              <div class="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div class="h-full rounded-full" style="width: ${barW}%; background-color: ${c.color};"></div>
              </div>
            </div>
          `;
        }).join('');

    const maxSlot = Math.max(1, ...slotLabels.map(s => s.count));
    const slotHtml = slotLabels.map(s => {
      const pct = totalIntakes > 0 ? Math.round((s.count / totalIntakes) * 100) : 0;
      const barW = s.count > 0 ? Math.max(10, Math.round((s.count / maxSlot) * 100)) : 0;
      return `
        <div class="space-y-0.5">
          <div class="flex items-center justify-between text-[10px]">
            <span class="text-slate-200 font-medium">${s.label}</span>
            <span class="text-slate-400 font-mono">${s.count}× (${pct}%)</span>
          </div>
          <div class="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
            <div class="h-full rounded-full" style="width: ${barW}%; background-color: ${s.color};"></div>
          </div>
        </div>
      `;
    }).join('');

    breakdownEl.innerHTML = `
      <div class="bg-slate-950/75 border border-slate-800/90 rounded-xl p-3 space-y-2">
        <div class="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
          ${currentLang === 'fr' ? 'Classes dominantes' : 'Top classes'}
        </div>
        ${catHtml}
      </div>
      <div class="bg-slate-950/75 border border-slate-800/90 rounded-xl p-3 space-y-2">
        <div class="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
          ${currentLang === 'fr' ? 'Répartition horaire' : 'Time of day'}
        </div>
        ${slotHtml}
      </div>
    `;
  }

  renderStatsAllTolerances(subList);
}

function collectHistoryIngestionsUpTo(maxDayOffset, lookbackDays = 30) {
  const result = [];
  const startOff = maxDayOffset - lookbackDays;
  const knownOffsets = Object.keys(journalDaysHistory).map(Number).filter(n => !isNaN(n) && n <= maxDayOffset && n >= startOff);
  knownOffsets.forEach(dOff => {
    const dayEntry = (dOff === selectedJournalDayOffset)
      ? { ingestions }
      : journalDaysHistory[dOff];
    if (!dayEntry || !Array.isArray(dayEntry.ingestions)) return;
    const baseTs = getDayBaseReferenceTime(dOff);
    dayEntry.ingestions.forEach(ing => {
      if (!ing || !ing.substanceName) return;
      result.push(ing.timestamp
        ? ing
        : Object.assign({}, ing, { timestamp: baseTs + ((ing.timeOffsetMinutes || 0) * 60000) }));
    });
  });
  return result;
}

function renderStatsAllTolerances(subList) {
  const listEl = document.getElementById('stats-all-tolerances-list');
  if (!listEl) return;

  if (!Array.isArray(subList) || subList.length === 0) {
    listEl.innerHTML = `<div class="text-[11px] text-slate-500 italic py-2 text-center">${currentLang === 'fr' ? 'Aucune substance consommée sur cette période.' : 'No consumed substance for this period.'}</div>`;
    return;
  }

  const nowMs = getNowTime();
  const allIngs = collectHistoryIngestionsUpTo(0, 45);
  const classCounts = {};
  subList.forEach(item => {
    const pk = (typeof getSubstancePKProfile === 'function') ? getSubstancePKProfile(item.name) : null;
    if (pk && pk.toleranceClass) {
      classCounts[pk.toleranceClass] = (classCounts[pk.toleranceClass] || 0) + 1;
    }
  });

  const rows = subList.map(item => {
    const pk = (typeof getSubstancePKProfile === 'function') ? getSubstancePKProfile(item.name) : null;
    const tolClassKey = pk ? pk.toleranceClass : null;
    const tolClass = (tolClassKey && typeof RECEPTOR_TOLERANCE_CLASSES !== 'undefined')
      ? RECEPTOR_TOLERANCE_CLASSES[tolClassKey]
      : null;

    if (!tolClass) {
      return {
        name: item.name,
        color: item.color,
        hasTol: false,
        ownTol: 0,
        crossTol: 0,
        hoursToClear: 0,
        classLabel: currentLang === 'fr' ? 'Sans tolérance pharmacologique' : 'No tolerance data',
        sharedCount: 0
      };
    }

    const ownIngs = allIngs.filter(x => x.substanceName === item.name);
    const ownTol = computePerSubstanceToleranceAt(item.name, nowMs, ownIngs);
    const otherClassTol = computeClassCrossToleranceAt(tolClassKey, nowMs, allIngs, item.name);
    let hoursToClear = 0;
    if (ownTol >= 0.05) {
      for (let h = 6; h <= 600; h += 6) {
        if (computePerSubstanceToleranceAt(item.name, nowMs + h * 3600000, ownIngs) < 0.05) {
          hoursToClear = h;
          break;
        }
      }
    }
    return {
      name: item.name,
      color: item.color,
      hasTol: true,
      ownTol,
      crossTol: otherClassTol,
      hoursToClear,
      classLabel: tolClass.nameFr && currentLang === 'fr' ? tolClass.nameFr : (tolClass.nameEn || tolClassKey),
      sharedCount: classCounts[tolClassKey] || 1
    };
  });

  rows.sort((a, b) => {
    if (b.hasTol !== a.hasTol) return (b.hasTol ? 1 : 0) - (a.hasTol ? 1 : 0);
    if (Math.abs(b.ownTol - a.ownTol) >= 0.02) return b.ownTol - a.ownTol;
    return b.crossTol - a.crossTol;
  });

  listEl.innerHTML = rows.map(r => {
    if (!r.hasTol) {
      return `
        <button type="button" onclick="showSubstanceDetails('${r.name.replace(/'/g, "\\'")}')"
          class="w-full text-left bg-slate-900/50 hover:bg-slate-800/60 border border-slate-800/70 rounded-xl px-2.5 py-2 flex items-center justify-between gap-2 transition cursor-pointer">
          <span class="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 truncate">
            <span class="w-2 h-2 rounded-full flex-shrink-0" style="background-color: ${r.color};"></span>
            <span class="truncate">${r.name}</span>
          </span>
          <span class="text-[9.5px] text-slate-500 italic flex-shrink-0">${r.classLabel}</span>
        </button>
      `;
    }

    const tolPct = Math.round(r.ownTol * 100);
    const barW = tolPct >= 5 ? Math.max(6, Math.min(100, tolPct)) : 0;
    const sat = r.ownTol < 0.50 ? 'saturate(0.5)' : 'saturate(1)';
    const crossPct = Math.round(r.crossTol * 100);
    const clearText = tolPct < 5
      ? (currentLang === 'fr' ? 'Sous 5 % (base)' : 'Below 5% (baseline)')
      : r.hoursToClear > 0
        ? (r.hoursToClear >= 48
            ? `~${(r.hoursToClear / 24).toFixed(1)}j → <5%`
            : `~${r.hoursToClear}h → <5%`)
        : '>25j';
    const badgeCls = tolPct >= 50
      ? 'text-rose-300'
      : (tolPct >= 5 ? 'text-amber-300' : 'text-slate-500');

    return `
      <button type="button" onclick="showSubstanceDetails('${r.name.replace(/'/g, "\\'")}')"
        class="w-full text-left bg-slate-900/70 hover:bg-slate-800/70 border border-slate-800/80 rounded-xl p-2 space-y-1.5 transition cursor-pointer">
        <div class="flex items-center justify-between gap-2 text-[11px]">
          <span class="flex items-center gap-1.5 min-w-0">
            <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background-color: ${r.color};"></span>
            <span class="font-bold text-slate-100 truncate">${r.name}</span>
            ${r.sharedCount > 1 && crossPct >= 10 ? `<span class="text-[9px] px-1.5 py-0.5 rounded bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 font-semibold flex-shrink-0">${currentLang === 'fr' ? 'Croisée' : 'Cross'} ~${crossPct}%</span>` : ''}
          </span>
          <span class="font-mono font-bold flex-shrink-0 ${badgeCls}">
            ${tolPct >= 5 ? `~${tolPct}%` : '<5%'}
            <span class="text-[9.5px] text-slate-400 font-normal ml-1">• ${clearText}</span>
          </span>
        </div>
        <div class="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/70">
          ${barW > 0 ? `<div class="h-full rounded-full transition-all" style="width: ${barW}%; background-color: ${r.color}; filter: ${sat};"></div>` : ''}
        </div>
      </button>
    `;
  }).join('');
}

function getDoseTierDotsHtml(substanceName, routeName, dose, color) {
  const s = SUBSTANCES_BY_NAME[substanceName];
  let level = 2;
  if (s && Array.isArray(s.roas)) {
    const roa = s.roas.find(r => r.name.toLowerCase() === (routeName || 'oral').toLowerCase()) || s.roas[0];
    const d = roa ? (roa.dose || {}) : {};
    const th = d.threshold || 0;
    const lt = d.lightMin || 0;
    const cm = d.commonMin || 0;
    const st = d.strongMin || 0;
    const hv = d.heavyMin || 0;
    if (hv && dose >= hv) level = 4;
    else if (st && dose >= st) level = 3;
    else if (cm && dose >= cm) level = 2;
    else if (lt && dose >= lt) level = 1;
    else if (th && dose < th) level = 1;
    else level = 2;
  }
  const dots = [];
  for (let i = 0; i < 4; i++) {
    const filled = i < level;
    dots.push(`<span class="w-1.5 h-1.5 rounded-full inline-block ${filled ? '' : 'border border-slate-500/70 bg-transparent'}" style="${filled ? `background-color: ${color};` : ''}"></span>`);
  }
  return `<span class="inline-flex items-center gap-0.5">${dots.join('')}</span>`;
}

function renderJournalDaysList() {
  const container = document.getElementById('journal-days-list');
  const subtitleEl = document.getElementById('journal-days-subtitle');
  if (!container) return;

  const allOffsets = getSortedHistoryOffsets(true);
  if (subtitleEl) {
    const activeCnt = allOffsets.filter(d => ((getOrCreateJournalDay(d).ingestions || []).length > 0)).length;
    subtitleEl.textContent = currentLang === 'fr'
      ? `${activeCnt} jour${activeCnt > 1 ? 's' : ''} actif${activeCnt > 1 ? 's' : ''} • Cliquez sur un jour pour voir son graphique`
      : `${activeCnt} active day${activeCnt > 1 ? 's' : ''} • Tap a day to view its graph & details`;
  }

  container.innerHTML = allOffsets.map(dOff => {
    const dayEntry = getOrCreateJournalDay(dOff);
    const dayIngs = dayEntry.ingestions || [];
    const totalIntakes = dayIngs.reduce(
      (sum, ing) => sum + ((ing.intakes && ing.intakes.length > 0) ? ing.intakes.length : 1),
      0
    );
    const longDate = formatJournalLongDate(dOff, currentLang);
    const shortDate = formatJournalShortWeekdayYear(dOff, currentLang);
    const isToday = dOff === 0;

    const colors = dayIngs.map(ing => {
      const s = SUBSTANCES_BY_NAME[ing.substanceName];
      return (s && s.color) ? s.color : '#818cf8';
    });
    const barStyle = colors.length === 0
      ? 'background-color: #334155;'
      : colors.length === 1
        ? `background-color: ${colors[0]};`
        : `background: linear-gradient(to bottom, ${colors.join(', ')});`;

    const namesStr = dayIngs.length > 0
      ? dayIngs.map(ing => ing.substanceName).join(', ')
      : (currentLang === 'fr' ? 'Aucune prise enregistrée' : 'No intakes recorded');

    return `
      <button type="button" onclick="openJournalDayDetail(${dOff})"
        class="w-full text-left px-3 py-3 hover:bg-slate-800/60 active:bg-slate-800 transition flex items-stretch gap-3 cursor-pointer">
        <span class="w-1.5 rounded-full flex-shrink-0 my-0.5" style="${barStyle}"></span>
        <div class="min-w-0 flex-1 space-y-1">
          <div class="flex items-center justify-between gap-2">
            <span class="text-sm font-bold text-white truncate">${longDate}</span>
            ${isToday ? `<span class="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 flex-shrink-0">${currentLang === 'fr' ? "Aujourd'hui" : 'Today'}</span>` : ''}
          </div>
          <div class="text-xs ${dayIngs.length > 0 ? 'text-slate-200 font-medium' : 'text-slate-500 italic'} truncate">
            ${namesStr}
          </div>
          <div class="flex items-center justify-between text-[10.5px] text-slate-400">
            <span>${shortDate}</span>
            <span class="inline-flex items-center gap-1 font-mono font-bold text-slate-300">
              <span class="opacity-75">☰</span>
              <span>${totalIntakes}</span>
            </span>
          </div>
        </div>
      </button>
    `;
  }).join('');
}

let toleranceRangeDays = 7;

function setToleranceRangeDays(days) {
  toleranceRangeDays = [7, 14, 21, 30].includes(days) ? days : 7;
  renderJournalToleranceSection();
}

function formatToleranceAxisDate(dayOffset, lang = currentLang) {
  const d = new Date(sessionBaseTimestamp);
  d.setDate(d.getDate() + dayOffset);
  const monthsFr = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const m = (lang === 'fr' ? monthsFr : monthsEn)[d.getMonth()];
  return `${d.getDate()} ${m}`;
}

function computeToleranceFromIngestionsAt(ingList, targetTs, tolClass) {
  if (!tolClass || !Array.isArray(ingList) || ingList.length === 0) {
    return 0;
  }
  const tauHours = Math.max(18, (tolClass.recoveryTauHours || 72) * 0.65);
  let charge = 0;

  for (let i = 0; i < ingList.length; i++) {
    const ing = ingList[i];
    if (!ing || !ing.substanceName) continue;
    const s = SUBSTANCES_BY_NAME[ing.substanceName];
    const roa = (s && s.roas)
      ? (s.roas.find(r => r.name === (ing.route || 'oral')) || s.roas[0])
      : null;
    const commonDose = (roa && roa.dose && roa.dose.commonMin) ? roa.dose.commonMin : 50;
    const subIntakes = (ing.intakes && ing.intakes.length > 0)
      ? ing.intakes
      : [{ dose: ing.dose, timestamp: ing.timestamp }];

    for (let j = 0; j < subIntakes.length; j++) {
      const it = subIntakes[j];
      const ts = it.timestamp || ing.timestamp;
      if (!ts) continue;
      const dtHours = (targetTs - ts) / 3600000;
      if (dtHours >= 0) {
        const units = Math.min(3.5, (it.dose || commonDose) / Math.max(0.1, commonDose));
        charge += units * Math.exp(-dtHours / tauHours);
      }
    }
  }

  if (charge <= 0) return 0;
  return Math.min(0.95, 1 - Math.exp(-0.55 * charge));
}

function getToleranceClassObj(substanceName) {
  const pk = (typeof getSubstancePKProfile === 'function') ? getSubstancePKProfile(substanceName) : null;
  const tolClassKey = pk ? pk.toleranceClass : null;
  const tolClass = tolClassKey && typeof RECEPTOR_TOLERANCE_CLASSES !== 'undefined'
    ? RECEPTOR_TOLERANCE_CLASSES[tolClassKey]
    : null;
  return tolClass ? { key: tolClassKey, cls: tolClass } : null;
}

function computePerSubstanceToleranceAt(substanceName, targetTs, substanceIngestions) {
  const info = getToleranceClassObj(substanceName);
  if (!info) return 0;
  const filtered = (substanceIngestions || []).filter(ing => ing && ing.substanceName === substanceName);
  return computeToleranceFromIngestionsAt(filtered, targetTs, info.cls);
}

function computeClassCrossToleranceAt(tolClassKey, targetTs, allIngestions, excludeSubstanceName = null) {
  const tolClass = tolClassKey && typeof RECEPTOR_TOLERANCE_CLASSES !== 'undefined'
    ? RECEPTOR_TOLERANCE_CLASSES[tolClassKey]
    : null;
  if (!tolClass) return 0;
  const filtered = (allIngestions || []).filter(ing => {
    if (!ing || !ing.substanceName) return false;
    if (excludeSubstanceName && ing.substanceName === excludeSubstanceName) return false;
    const pk = (typeof getSubstancePKProfile === 'function') ? getSubstancePKProfile(ing.substanceName) : null;
    return pk && pk.toleranceClass === tolClassKey;
  });
  return computeToleranceFromIngestionsAt(filtered, targetTs, tolClass);
}

function renderJournalToleranceSection() {
  const stripEl = document.getElementById('journal-tolerance-strip');
  if (!stripEl) return;

  [7, 14, 21, 30].forEach(d => {
    const btn = document.getElementById('btn-tol-range-' + d);
    if (!btn) return;
    btn.className = d === toleranceRangeDays
      ? 'px-1.5 py-0.5 rounded-md bg-indigo-600 text-white cursor-pointer transition'
      : 'px-1.5 py-0.5 rounded-md text-slate-400 hover:text-white cursor-pointer transition';
  });

  const endOff = selectedJournalDayOffset;
  const rangeCfg = {
    7: { pastDays: 1, futureDays: 5 },
    14: { pastDays: 2, futureDays: 11 },
    21: { pastDays: 3, futureDays: 17 },
    30: { pastDays: 5, futureDays: 24 }
  }[toleranceRangeDays] || { pastDays: 1, futureDays: 5 };

  const pastDays = rangeCfg.pastDays;
  const futureDays = rangeCfg.futureDays;
  const totalDays = pastDays + 1 + futureDays;
  const startOff = endOff - pastDays;
  const numSteps = 48;

  const windowIngestions = [];
  const candidateSubstances = {};
  const todayTolClasses = new Set();
  const missingTodayNames = new Set();

  for (let dOff = endOff - 30; dOff <= endOff; dOff++) {
    const dayEntry = (dOff === selectedJournalDayOffset)
      ? { ingestions }
      : (journalDaysHistory[dOff] || null);
    const dayList = (dayEntry && Array.isArray(dayEntry.ingestions)) ? [...dayEntry.ingestions] : [];

    if (typeof getActiveBackgroundTreatmentsForDay === 'function') {
      const bgActive = getActiveBackgroundTreatmentsForDay(dOff);
      bgActive.forEach(tr => {
        if (!tr || !tr.name || !getToleranceClassObj(tr.name)) return;
        const timesArr = (Array.isArray(tr.times) && tr.times.length > 0) ? tr.times : ['08:00'];
        timesArr.forEach(hm => {
          const parts = String(hm).split(':');
          const hh = Number(parts[0]) || 8;
          const mm = Number(parts[1]) || 0;
          const tsBg = getTimestampAtClockOnDay(dOff, hh, mm);
          dayList.push({
            id: `bg_${tr.id}_${dOff}_${hm}`,
            substanceName: tr.name,
            dose: tr.dose || 1,
            unit: tr.unit || 'mg',
            route: tr.route || 'oral',
            timestamp: tsBg,
            source: 'background_treatment'
          });
        });
      });
    }

    const baseTs = getDayBaseReferenceTime(dOff);
    const isToday = dOff === endOff;
    const inCandidateWindow = dOff >= endOff - 14 && dOff <= endOff;

    dayList.forEach(ing => {
      if (!ing || !ing.substanceName) return;
      const normIng = ing.timestamp
        ? ing
        : Object.assign({}, ing, { timestamp: baseTs + ((ing.timeOffsetMinutes || 0) * 60000) });
      windowIngestions.push(normIng);

      const info = getToleranceClassObj(ing.substanceName);
      if (isToday && ing.source !== 'background_treatment' && !info) {
        missingTodayNames.add(ing.substanceName);
      }
      if (!info) return;
      if (isToday) {
        todayTolClasses.add(info.key);
      }

      if (inCandidateWindow) {
        const s = SUBSTANCES_BY_NAME[ing.substanceName];
        const col = (s && s.color) ? s.color : '#818cf8';
        if (!candidateSubstances[ing.substanceName]) {
          candidateSubstances[ing.substanceName] = {
            name: ing.substanceName,
            color: col,
            tolClassKey: info.key,
            tolClassObj: info.cls,
            lastDayOffset: dOff,
            takenDays: new Set(),
            latestIng: normIng
          };
        }
        candidateSubstances[ing.substanceName].takenDays.add(dOff);
        if (dOff >= candidateSubstances[ing.substanceName].lastDayOffset) {
          candidateSubstances[ing.substanceName].lastDayOffset = dOff;
          candidateSubstances[ing.substanceName].latestIng = normIng;
        }
      }
    });
  }

  const refTs = endOff === 0 ? getNowTime() : getTimestampAtClockOnDay(endOff, 22, 0);
  const windowStartMs = getTimestampAtClockOnDay(startOff, 0, 0);
  const windowEndMs = windowStartMs + totalDays * 86400000;
  const totalWindowMs = Math.max(86400000, windowEndMs - windowStartMs);

  const activeMets = (typeof getActiveMetaboliteLoadAt === 'function')
    ? getActiveMetaboliteLoadAt(ingestions, refTs, { includeMultiDayHistory: true })
    : [];

  const nowPctNum = Math.max(4, Math.min(96, ((refTs - windowStartMs) / totalWindowMs) * 100));
  const nowPct = nowPctNum.toFixed(2);
  const nowBadgeLabel = endOff === 0
    ? (currentLang === 'fr' ? 'Auj.' : 'Now')
    : formatJournalDayShortLabel(endOff, currentLang);

  const rows = Object.values(candidateSubstances).map(r => {
    const takenToday = r.takenDays.has(endOff);
    const subIngs = windowIngestions.filter(x => x.substanceName === r.name);
    const sameClassIngs = windowIngestions.filter(x => {
      const pk = (typeof getSubstancePKProfile === 'function') ? getSubstancePKProfile(x.substanceName) : null;
      return pk && pk.toleranceClass === r.tolClassKey;
    });

    const currentOwnTol = computePerSubstanceToleranceAt(r.name, refTs, subIngs);
    const classCombinedTol = computeToleranceFromIngestionsAt(sameClassIngs, refTs, r.tolClassObj);
    const otherClassTol = computeClassCrossToleranceAt(r.tolClassKey, refTs, windowIngestions, r.name);
    const sharesTodayClass = !takenToday && todayTolClasses.has(r.tolClassKey);
    const isMajorCross = !takenToday && ((sharesTodayClass && currentOwnTol >= 0.08) || (otherClassTol >= 0.25 && currentOwnTol >= 0.12));

    if (!takenToday && !isMajorCross) {
      return null;
    }

    const useClassCurve = (sharesTodayClass || otherClassTol >= 0.15) && sameClassIngs.length > subIngs.length;
    const evalCurveAt = (tsVal) => useClassCurve
      ? computeToleranceFromIngestionsAt(sameClassIngs, tsVal, r.tolClassObj)
      : computePerSubstanceToleranceAt(r.name, tsVal, subIngs);

    const effectiveTol = evalCurveAt(refTs);
    let hoursToClear = 0;
    if (effectiveTol >= 0.05) {
      for (let h = 6; h <= 720; h += 6) {
        if (evalCurveAt(refTs + h * 3600000) < 0.05) {
          hoursToClear = h;
          break;
        }
      }
    }

    const stepTols = [];
    for (let st = 0; st < numSteps; st++) {
      const stTs = windowStartMs + ((st + 0.5) / numSteps) * totalWindowMs;
      stepTols.push({
        tol: evalCurveAt(stTs),
        isFuture: stTs >= refTs
      });
    }
    return Object.assign({}, r, {
      stepTols,
      currentTol: effectiveTol,
      ownTol: currentOwnTol,
      classCombinedTol,
      useClassCurve,
      hoursToClear,
      takenToday,
      isMajorCross,
      otherClassTol
    });
  }).filter(Boolean);

  rows.sort((a, b) => {
    if ((b.takenToday ? 1 : 0) !== (a.takenToday ? 1 : 0)) return (b.takenToday ? 1 : 0) - (a.takenToday ? 1 : 0);
    if (Math.abs(b.currentTol - a.currentTol) >= 0.02) return b.currentTol - a.currentTol;
    return b.lastDayOffset - a.lastDayOffset;
  });

  if (rows.length === 0 && missingTodayNames.size === 0 && activeMets.length === 0) {
    stripEl.innerHTML = `<div class="text-[11px] text-slate-500 italic py-1">${currentLang === 'fr' ? 'Aucune tolérance ou tolérance croisée majeure ce jour.' : 'No active tolerance or major cross-tolerance on this day.'}</div>`;
    return;
  }

  const tickOffsets = [
    startOff,
    endOff,
    endOff + Math.max(1, Math.round(futureDays * 0.42)),
    endOff + Math.max(2, Math.round(futureDays * 0.85))
  ];
  const axisHtml = `
    <div class="relative h-4 text-[10px] text-slate-400 font-medium select-none">
      ${tickOffsets.map(dOff => {
        const dMidTs = getTimestampAtClockOnDay(dOff, 12, 0);
        const pct = Math.max(4, Math.min(96, ((dMidTs - windowStartMs) / totalWindowMs) * 100)).toFixed(1);
        return `<span class="absolute -translate-x-1/2 whitespace-nowrap ${dOff === endOff ? 'opacity-0' : ''}" style="left: ${pct}%;">${formatToleranceAxisDate(dOff, currentLang)}</span>`;
      }).join('')}
    </div>
  `;

  const gridLinesHtml = tickOffsets.map(dOff => {
    const dMidTs = getTimestampAtClockOnDay(dOff, 12, 0);
    const pct = Math.max(4, Math.min(96, ((dMidTs - windowStartMs) / totalWindowMs) * 100)).toFixed(1);
    return `<div class="absolute top-0 bottom-0 w-px bg-slate-800/75 pointer-events-none" style="left: ${pct}%;"></div>`;
  }).join('');

  const barsHtml = rows.slice(0, 6).map(r => {
    const tolPct = Math.round(r.currentTol * 100);
    const sensPct = Math.max(5, Math.min(100, 100 - tolPct));
    const tolCls = tolPct >= 50 ? 'text-rose-300' : (tolPct >= 20 ? 'text-amber-300' : 'text-emerald-300');
    const shortClass = (r.tolClassKey || '').replace('_BZD', '');
    const classPill = shortClass
      ? `<span class="ml-1.5 text-[9px] px-1.5 py-0.5 rounded bg-slate-800/90 border border-slate-700 text-slate-300 font-mono">${shortClass}</span>`
      : '';
    const crossTag = r.isMajorCross
      ? `<span class="ml-1 text-[9px] px-1.5 py-0.5 rounded bg-indigo-950/80 border border-indigo-500/35 text-indigo-300 font-semibold">${currentLang === 'fr' ? 'Tol. croisée' : 'Cross-tol.'}</span>`
      : '';
    const tolBadge = tolPct >= 5
      ? `<span class="inline-flex items-center gap-1.5 text-[10px] font-mono">
          <span class="font-bold ${tolCls}">${currentLang === 'fr' ? 'Tolérance' : 'Tolerance'} ~${tolPct}%</span>
          <span class="text-slate-500">·</span>
          <span class="text-slate-300">${currentLang === 'fr' ? 'Sensib.' : 'Sensit.'} ~${sensPct}%</span>
        </span>`
      : `<span class="text-[10px] font-mono text-emerald-400">&lt; 5% (${currentLang === 'fr' ? 'base' : 'baseline'})</span>`;

    const segs = r.stepTols.map(st => {
      if (st.tol < 0.05) {
        return `<div class="flex-1 h-full bg-transparent"></div>`;
      }
      const sat = st.tol < 0.50 ? 'saturate(0.5)' : 'saturate(1)';
      const op = st.isFuture
        ? (st.tol < 0.50 ? '0.40' : '0.55')
        : (st.tol < 0.50 ? '0.86' : '0.96');
      return `<div class="flex-1 h-full" style="background-color: ${r.color}; filter: ${sat}; opacity: ${op};"></div>`;
    }).join('');

    let etaStr = '';
    if (tolPct < 5) {
      etaStr = currentLang === 'fr' ? 'Retour à la normale (< 5%)' : 'Back to baseline (< 5%)';
    } else if (r.hoursToClear > 0) {
      const clearOff = endOff + Math.round(r.hoursToClear / 24);
      const durTxt = r.hoursToClear < 48 ? `~${r.hoursToClear}h` : `~${Math.round(r.hoursToClear / 24)}${currentLang === 'fr' ? 'j' : 'd'}`;
      const dateStr = formatToleranceAxisDate(clearOff, currentLang);
      etaStr = currentLang === 'fr'
        ? `Retour < 5% : ${durTxt} (${dateStr})`
        : `Clear < 5%: ${durTxt} (${dateStr})`;
    } else {
      etaStr = currentLang === 'fr' ? 'Retour < 5% : > 30j' : 'Clear < 5%: > 30d';
    }
    const crossDetail = r.useClassCurve && Math.round(r.ownTol * 100) !== tolPct
      ? ` • ${r.name} seul ~${Math.round(r.ownTol * 100)}%`
      : '';
    const safeName = r.name.replace(/'/g, "\\'");

    return `
      <div class="relative z-10 space-y-1">
        <div class="flex items-center justify-between gap-2 text-[11px]">
          <button type="button" onclick="showSubstanceDetails('${safeName}')"
            class="font-semibold text-slate-200 hover:text-white truncate flex items-center cursor-pointer text-left">
            <span class="w-2 h-2 rounded-full mr-1.5 flex-shrink-0" style="background-color: ${r.color};"></span>
            <span class="truncate">${r.name}</span>${classPill}${crossTag}
          </button>
          ${tolBadge}
        </div>
        <div class="w-full h-3.5 rounded-full overflow-hidden flex bg-slate-950/70 border border-slate-800/60">${segs}</div>
        <div class="flex items-center justify-between text-[9.5px] text-slate-400">
          <span>${etaStr}${crossDetail}</span>
        </div>
      </div>
    `;
  }).join('');

  const legendHtml = rows.length > 0
    ? `<div class="flex flex-wrap items-center gap-3 text-[9.5px] text-slate-400 pt-1">
        <span class="inline-flex items-center gap-1"><span class="w-2.5 h-1.5 rounded-full bg-indigo-400 inline-block"></span>${currentLang === 'fr' ? '≥50% saturation pleine' : '≥50% full saturation'}</span>
        <span class="inline-flex items-center gap-1"><span class="w-2.5 h-1.5 rounded-full bg-indigo-400/80 inline-block" style="filter: saturate(0.5);"></span>${currentLang === 'fr' ? '5–49% saturation /2' : '5–49% half saturation'}</span>
        <span class="inline-flex items-center gap-1"><span class="w-2.5 h-1.5 rounded-full border border-slate-700 bg-transparent inline-block"></span>${currentLang === 'fr' ? '<5% dissipée' : '<5% cleared'}</span>
      </div>`
    : '';

  const missingList = [...missingTodayNames];
  const missingHtml = missingList.length > 0
    ? `<div class="text-[10.5px] text-slate-400 pt-1">${currentLang === 'fr' ? 'Sans données de tolérance' : 'Missing tolerance info'}: <span class="text-slate-300">${missingList.join(', ')}</span></div>`
    : '';

  const carryHtml = activeMets.length > 0
    ? `<div class="pt-1.5 border-t border-slate-800/80 space-y-1">
        <div class="text-[10px] font-bold text-cyan-300">${currentLang === 'fr' ? 'Métabolites encore actifs :' : 'Active residual metabolites:'}</div>
        ${activeMets.slice(0, 3).map(m => `
          <div class="flex items-center justify-between text-[10px] bg-slate-950/75 border border-slate-800 rounded-lg px-2 py-1">
            <span class="text-slate-200 font-semibold">↳ ${m.metaboliteName} <span class="text-slate-400 font-normal">(${m.parentSubstanceName})</span></span>
            <span class="font-mono font-bold text-cyan-300">${m.loadPct}% • ~${m.remainingSignificantHours}h</span>
          </div>
        `).join('')}
      </div>`
    : '';

  stripEl.innerHTML = `
    ${rows.length > 0 ? `
      <div class="space-y-1.5">
        ${axisHtml}
        <div class="relative py-1 space-y-2.5">
          ${gridLinesHtml}
          <div class="absolute top-0 bottom-0 z-20 pointer-events-none flex flex-col items-center -translate-x-1/2" style="left: ${nowPct}%;">
            <span class="px-1.5 py-0.5 -mt-4 rounded bg-white text-slate-950 text-[9px] font-extrabold leading-none shadow">${nowBadgeLabel}</span>
            <div class="w-0.5 flex-1 bg-white shadow-[0_0_8px_rgba(255,255,255,0.65)] rounded-full"></div>
          </div>
          ${barsHtml}
        </div>
        ${axisHtml}
        ${legendHtml}
      </div>
    ` : ''}
    ${missingHtml}
    ${carryHtml}
  `;
}

function renderJournalInteractionsSection() {
  const listEl = document.getElementById('journal-interactions-list');
  const badgeEl = document.getElementById('journal-interactions-badge');
  if (!listEl) return;

  const alerts = [];
  const seenKeys = new Set();
  const uniqueNames = [...new Set(ingestions.map(i => i.substanceName))];

  for (let i = 0; i < uniqueNames.length; i++) {
    for (let j = i + 1; j < uniqueNames.length; j++) {
      const a = uniqueNames[i];
      const b = uniqueNames[j];
      const res = checkInteraction(a, b, { sourceA: 'user_intake', sourceB: 'user_intake' });
      if (res) {
        const key = [a, b].sort().join('__');
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          alerts.push({
            label: `${a} × ${b}`,
            type: res.type || 'UNSAFE',
            note: currentLang === 'fr' ? (res.specificNoteFr || res.reasonFr || res.viaLabelFr || '') : (res.specificNoteEn || res.reasonEn || res.viaLabelEn || ''),
            targetName: a
          });
        }
      }
    }
  }

  uniqueNames.forEach(name => {
    const firstIng = ingestions.find(x => x.substanceName === name);
    const targetTs = selectedJournalDayOffset === 0
      ? getNowTime()
      : ((firstIng && firstIng.timestamp) ? firstIng.timestamp : getNowTime());
    const evalRes = (typeof evaluatePreIngestionInteractions === 'function')
      ? evaluatePreIngestionInteractions(name, {
          targetTimestampMs: targetTs,
          currentDayOffset: selectedJournalDayOffset,
          currentIngestions: ingestions,
          includeMultiDayHistory: true
        })
      : null;
    if (evalRes && Array.isArray(evalRes.alerts)) {
      evalRes.alerts.forEach(w => {
        const pairKey = w.substanceName ? [name, w.substanceName].sort().join('__') : '';
        if ((w.origin === 'same_day_parent' || w.origin === 'same_day_metabolite_upgrade' || w.origin === 'parent_metabolite_user_intake') && pairKey && seenKeys.has(pairKey)) {
          return;
        }
        const label = w.metaboliteName && (w.origin === 'multi_day_carryover_metabolite' || w.origin === 'residual_metabolite_tail')
          ? `${name} × ${w.metaboliteName} (${w.parentSubstanceName || w.substanceName || ''})`
          : (w.substanceName ? `${name} × ${w.substanceName}` : name);
        const key = `${label}__${w.origin || ''}__${w.metaboliteName || ''}`;
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          alerts.push({
            label,
            type: w.type || 'UNSAFE',
            note: currentLang === 'fr' ? (w.msgFr || '') : (w.msgEn || ''),
            targetName: name
          });
        }
      });
    }
  });

  if (badgeEl) {
    badgeEl.textContent = String(alerts.length);
    badgeEl.className = alerts.some(a => a.type === 'DANGEROUS')
      ? 'text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-300'
      : alerts.length > 0
        ? 'text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300'
        : 'text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300';
  }

  if (alerts.length === 0) {
    listEl.innerHTML = `
      <div class="text-[11px] text-emerald-300/90 bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-3 py-2">
        ✓ ${currentLang === 'fr' ? 'Aucune interaction à risque détectée pour les prises de ce jour.' : 'No high-risk interaction detected for this day.'}
      </div>
    `;
    return;
  }

  listEl.innerHTML = alerts.map(a => {
    const isDang = a.type === 'DANGEROUS';
    const tri = isDang ? '▲▲▲' : '▲▲';
    const cls = isDang
      ? 'bg-red-500/12 border-red-500/35 text-red-200'
      : 'bg-amber-500/12 border-amber-500/35 text-amber-200';
    return `
      <button type="button" onclick="showSubstanceDetails('${a.targetName.replace(/'/g, "\\'")}')"
        class="w-full text-left border rounded-xl p-2.5 transition hover:brightness-110 cursor-pointer ${cls} space-y-0.5">
        <div class="flex items-center justify-between gap-2 text-xs font-bold">
          <span class="truncate">${a.label}</span>
          <span class="font-mono text-[11px] tracking-tighter flex-shrink-0 ${isDang ? 'text-red-400' : 'text-amber-400'}">${tri}</span>
        </div>
        ${a.note ? `<div class="text-[10px] opacity-85 leading-snug">${a.note}</div>` : ''}
      </button>
    `;
  }).join('');
}

function renderIngestions() {
  renderJournalDayNavigator();
  renderJournalDaysList();
  renderDailyCumulativeSummary();
  renderJournalToleranceSection();
  renderJournalInteractionsSection();
  renderStatsPage();

  const container = document.getElementById('ingestions-list');
  if (!container) return;
  container.innerHTML = '';

  const badgeEl = document.getElementById('active-ingestion-badge');
  if (badgeEl) {
    badgeEl.textContent = I18N[currentLang].activeIngestions(ingestions.length);
  }

  if (ingestions.length === 0) {
    container.innerHTML = `
      <div class="text-center py-4 text-slate-500 text-xs bg-slate-900/40 rounded-xl border border-slate-800/60">
        ${I18N[currentLang].emptyHistoryCard}
      </div>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();
  const nowMs = getNowTime();

  ingestions.forEach(ing => {
    const s = SUBSTANCES_BY_NAME[ing.substanceName];
    const brand = s && s.commonNames && s.commonNames[0] ? ` (${s.commonNames[0]})` : '';
    const intakesList = (ing.intakes && ing.intakes.length > 0)
      ? ing.intakes
      : [{ dose: ing.dose, timeOffsetMinutes: ing.timeOffsetMinutes || 0, timestamp: ing.timestamp }];

    const currentOffset = ing.timestamp
      ? Math.round((ing.timestamp - nowMs) / 60000)
      : (ing.timeOffsetMinutes || 0);
    const timeStr = formatOffsetTimeStr(currentOffset, ing.timestamp);

    let cumulBadgeHtml = '';
    let subIntakesChipsHtml = '';
    if (intakesList.length > 1) {
      const partsStr = intakesList.map(it => `${it.dose}${ing.unit}`).join(' + ');
      cumulBadgeHtml = `
        <span class="text-[9.5px] px-1.5 py-0.5 rounded font-bold border bg-indigo-950/90 border-indigo-500/70 text-indigo-300">
          ${currentLang === 'fr' ? `Cumul ${intakesList.length} prises (${partsStr})` : `Total ${intakesList.length} intakes (${partsStr})`}
        </span>
      `;
      const chips = intakesList.map((it, idx) => {
        const dt = it.timestamp ? new Date(it.timestamp) : new Date(nowMs + (it.timeOffsetMinutes || 0) * 60000);
        const hm = dt.toTimeString().slice(0, 5);
        return `
          <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[9.5px] font-mono text-slate-300">
            <span class="text-indigo-300 font-bold">${hm}</span>
            <span>${it.dose}${ing.unit}</span>
            <button type="button" onclick="deleteSubIntake(${ing.id}, ${idx})" class="text-slate-500 hover:text-rose-400 ml-0.5 cursor-pointer" title="${currentLang === 'fr' ? 'Supprimer cette prise unitaire' : 'Delete this single intake'}">✕</button>
          </span>
        `;
      }).join('');
      subIntakesChipsHtml = `<div class="flex flex-wrap gap-1 mt-1">${chips}</div>`;
    }

    const subColor = (s && s.color) ? s.color : '#818cf8';
    const tierInfo = getDoseTierInfo(ing.substanceName, ing.route, ing.dose, currentLang);
    const roaInfo = getRoaInfo(ing.route || 'oral');
    const pkMod = (typeof getPersonalizedPKModifier === 'function')
      ? getPersonalizedPKModifier(ing, ingestions)
      : null;

    let pkInfoLine = '';
    if (pkMod) {
      const realH = (pkMod.realDurationMin / 60).toFixed(1).replace('.0', '');
      const stdH = (pkMod.stdDurationMin / 60).toFixed(1).replace('.0', '');
      const tags = [];
      if (Math.abs(pkMod.realDurationMin - pkMod.stdDurationMin) >= 8) {
        tags.push(`<button type="button" onclick="openQuickCalibrateModal('${ing.substanceName.replace(/'/g, "\\'")}')" class="underline hover:text-white cursor-pointer font-bold" title="Cliquer pour ajuster votre durée ressentie">⏱ ${realH}h (std ${stdH}h)</button>`);
      }
      if (pkMod.conflicts && pkMod.conflicts.length > 0) {
        tags.push(pkMod.conflicts.map(c => currentLang === 'fr' ? c.descFr : c.descEn).join(' • '));
      } else if (pkMod.calibrationSource && pkMod.calibrationSource.type === 'indirect') {
        const shared = pkMod.calibrationSource.sharedEnzymes.map(e => `${e.enzyme} (${Math.round(e.fm * 100)}%)`).join(', ');
        tags.push(`${currentLang === 'fr' ? 'Adapté via' : 'Adapted via'} ${pkMod.calibrationSource.sharedEnzymes[0].fromSubstance} [${shared}]`);
      }
      if (tags.length > 0) {
        pkInfoLine = `<div class="text-[9.5px] text-indigo-300/90 mt-0.5 font-medium">🧬 ${tags.join(' • ')}</div>`;
      }
    }

    const isCalibrated = (typeof patientPKProfile !== 'undefined' && patientPKProfile.empiricalCalibrations)
      ? patientPKProfile.empiricalCalibrations.find(c => c.substanceName === ing.substanceName)
      : null;
    const btnLabel = isCalibrated
      ? `⏱ ${isCalibrated.observedHours}h ✎`
      : `⏱ Durée ressentie`;
    const btnCls = isCalibrated
      ? `bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 border-indigo-400/50`
      : `bg-indigo-950/70 hover:bg-indigo-800/80 text-indigo-300 border-indigo-500/40`;

    const tierDotsHtml = getDoseTierDotsHtml(ing.substanceName, ing.route, ing.dose, subColor);
    const row = document.createElement('div');
    row.className = 'bg-slate-900 border border-slate-800 rounded-xl p-2.5 flex items-stretch justify-between text-xs gap-2.5';
    row.innerHTML = `
      <span class="w-1.5 rounded-full flex-shrink-0 my-0.5" style="background-color: ${subColor};"></span>
      <div class="min-w-0 flex-1 mr-1">
        <div class="flex items-center gap-1.5 flex-wrap">
          <span class="text-[10px] text-slate-400">${timeStr}</span>
          <span class="font-bold text-white cursor-pointer hover:text-indigo-300 transition" onclick="openQuickCalibrateModal('${ing.substanceName.replace(/'/g, "\\'")}')" title="Cliquer pour entrer votre durée">${ing.substanceName}</span>
          <span class="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border bg-cyan-950/80 border-cyan-600/60 text-cyan-300" title="${currentLang === 'fr' ? 'Pourcentage de la molécule encore présente / active dans le corps à l\'heure de référence' : 'Percentage of molecule still remaining in the body at reference time'}">${getRemainingBodyPercentage(ing)}%</span>
          ${ing.releaseProfileId && ing.releaseProfileId !== 'IR' ? `
            <span class="text-[9.5px] px-1.5 py-0.5 rounded font-bold border bg-amber-950/80 border-amber-600/70 text-amber-300">
              ⏱ ${currentLang === 'fr' ? (ing.releaseBadgeFr || 'LP') : (ing.releaseBadgeEn || 'ER')}
            </span>
          ` : ''}
          ${cumulBadgeHtml}
        </div>
        <div class="flex items-center gap-2 mt-0.5 flex-wrap">
          <span class="font-mono font-bold text-slate-200">${ing.dose} ${ing.unit}</span>
          <span class="text-[10px] text-slate-400 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${roaInfo.color};"></span>
            <span>${ing.route || 'oral'}</span>
          </span>
          <span class="text-[10px] px-1.5 py-0.5 rounded font-bold border ${tierInfo.badgeCls}">${tierInfo.label}</span>
          ${brand ? `<span class="text-[10px] text-slate-500">${brand}</span>` : ''}
        </div>
        ${subIntakesChipsHtml}
        ${pkInfoLine}
      </div>
      <div class="flex flex-col items-end justify-between gap-1.5 flex-shrink-0">
        <div class="flex items-center gap-1.5">
          ${tierDotsHtml}
          <button onclick="deleteIngestion(${ing.id})" class="p-1 text-slate-500 hover:text-red-400 transition" title="Supprimer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
        <button type="button" onclick="openQuickCalibrateModal('${ing.substanceName.replace(/'/g, "\\'")}')"
          class="px-2 py-0.5 rounded-lg border text-[9.5px] font-semibold transition cursor-pointer flex items-center gap-1 ${btnCls}"
          title="Indiquer la durée d'effet ressentie (à jeun) de cette molécule pour déduire vos enzymes">
          ${btnLabel}
        </button>
      </div>
    `;
    fragment.appendChild(row);
  });

  container.appendChild(fragment);
}
