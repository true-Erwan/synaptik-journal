let currentTimelineWindowPreset = 'auto';
let lastTimelineBasePastMin = -180;
let lastTimelineBaseFutureMin = 960;
let lastTimelineEffectSpanMin = 540;
let lastTimelineGraphStartMin = -180;
let lastTimelineGraphEndMin = 960;
let lastRenderedCanvasWidth = 380;

function getMinTimelineXZoom() {
  return 1.0;
}

function toggleMetaboliteCurves(enabled) {
  showMetaboliteCurves = Boolean(enabled);
  const cb = document.getElementById('toggle-metabolite-curves');
  if (cb && cb.checked !== showMetaboliteCurves) {
    cb.checked = showMetaboliteCurves;
  }
  const lbl = document.getElementById('lbl-toggle-metabolites');
  if (lbl) {
    lbl.className = showMetaboliteCurves
      ? 'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-violet-950/75 hover:bg-violet-900/80 border border-violet-500/45 text-[10px] font-semibold text-violet-200 cursor-pointer select-none transition whitespace-nowrap'
      : 'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-[10px] font-semibold text-slate-400 cursor-pointer select-none transition whitespace-nowrap';
  }
  drawTimeline();
}

function updateTimelineWindowPresetButtons() {
  const presets = ['auto', 12, 24, 72];
  presets.forEach(p => {
    const btnId = p === 'auto' ? 'btn-window-auto' : `btn-window-${p}h`;
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const isActive = currentTimelineWindowPreset === p;
    btn.className = isActive
      ? 'px-1.5 py-0.5 rounded bg-indigo-600/40 hover:bg-indigo-600/60 text-indigo-200 font-mono text-[9.5px] font-bold border border-indigo-500/50 transition cursor-pointer'
      : 'px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[9.5px] font-bold border border-slate-700 transition cursor-pointer';
  });
}

function setTimelineWindowHours(hours) {
  if (hours === 'auto') {
    currentTimelineWindowPreset = 'auto';
    timelinePanMin = 0;
    onTimelineXZoomChange(1.0, true);
    updateTimelineWindowPresetButtons();
    if (typeof updateSimulationUI === 'function') updateSimulationUI();
    return;
  }
  const h = Number(hours) || 24;
  currentTimelineWindowPreset = h;
  if (h === 12) {
    timelinePanMin = -120;
    onTimelineXZoomChange(1.75, true);
  } else if (h === 72) {
    timelinePanMin = 0;
    onTimelineXZoomChange(1.0, true);
  } else {
    currentTimelineWindowPreset = 24;
    timelinePanMin = 0;
    onTimelineXZoomChange(1.0, true);
  }
  updateTimelineWindowPresetButtons();
  if (typeof updateSimulationUI === 'function') updateSimulationUI();
}

function onTimelineXZoomChange(val, keepPreset = false, anchorMin = null, anchorFrac = 0.5) {
  const numVal = parseFloat(val) || 1.0;
  const minZoom = getMinTimelineXZoom();
  const newZoom = Math.max(minZoom, Math.min(12.0, numVal));

  if (anchorMin !== null && isFinite(anchorMin)) {
    const clampedFrac = Math.max(0.02, Math.min(0.98, anchorFrac));
    const baseSpan = Math.max(30, lastTimelineBaseFutureMin - lastTimelineBasePastMin);
    const newStartRel = lastTimelineBasePastMin / newZoom;
    const newSpan = baseSpan / newZoom;
    timelinePanMin = anchorMin - newStartRel - clampedFrac * newSpan;
  }

  timelineXZoom = newZoom;
  if (!keepPreset) {
    if (Math.abs(timelineXZoom - 1.0) <= 0.04 && Math.abs(timelinePanMin) < 15) {
      currentTimelineWindowPreset = 'auto';
      timelinePanMin = 0;
    } else {
      currentTimelineWindowPreset = null;
    }
    updateTimelineWindowPresetButtons();
  }

  const slider = document.getElementById('timeline-x-zoom-slider');
  if (slider) {
    slider.min = minZoom.toFixed(2);
    slider.value = timelineXZoom;
  }

  const badge = document.getElementById('timeline-x-zoom-val');
  if (badge) {
    badge.textContent = timelineXZoom >= 10 ? timelineXZoom.toFixed(0) + 'x' : timelineXZoom.toFixed(1) + 'x';
    if (timelineXZoom > 1.05) {
      badge.className = 'text-[10px] font-mono font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/40 px-1.5 py-0.5 rounded min-w-[42px] text-center';
    } else if (timelineXZoom < 0.95) {
      badge.className = 'text-[10px] font-mono font-bold text-amber-300 bg-amber-500/20 border border-amber-500/40 px-1.5 py-0.5 rounded min-w-[42px] text-center';
    } else {
      badge.className = 'text-[10px] font-mono font-bold text-slate-300 bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded min-w-[42px] text-center';
    }
  }

  const resetBtn = document.getElementById('timeline-x-reset-btn');
  if (resetBtn) {
    resetBtn.classList.toggle('hidden', Math.abs(timelineXZoom - 1.0) <= 0.04 && Math.abs(timelinePanMin) < 15);
  }
  drawTimeline();
}

function adjustTimelineXZoomFactor(factor, anchorMin = null, anchorFrac = 0.5) {
  onTimelineXZoomChange((timelineXZoom * factor).toFixed(3), false, anchorMin, anchorFrac);
}

function adjustTimelineXZoom(delta) {
  onTimelineXZoomChange((timelineXZoom + delta).toFixed(2));
}

function ensureTimelineVisibleAtOffset(focusMin = 0) {
  const span = Math.max(60, lastTimelineGraphEndMin - lastTimelineGraphStartMin);
  const leftMargin = lastTimelineGraphStartMin + span * 0.16;
  const rightMargin = lastTimelineGraphEndMin - span * 0.16;
  if (focusMin < leftMargin) {
    timelinePanMin -= (leftMargin - focusMin);
  } else if (focusMin > rightMargin) {
    timelinePanMin += (focusMin - rightMargin);
  }
}

function initTimelineInteraction() {
  const canvas = document.getElementById('timeline-canvas');
  if (!canvas) return;

  function updateTouchPos(clientX) {
    const rect = canvas.getBoundingClientRect();
    timelineTouchX = clientX - rect.left;
    drawTimeline();
  }

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || lastRenderedCanvasWidth || 380;
    const innerW = Math.max(10, w - 48);
    const frac = Math.max(0, Math.min(1, (e.clientX - rect.left - 24) / innerW));

    if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      const dRaw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const panStep = (dRaw / Math.max(120, rect.width || 380)) * Math.max(60, totalTimelineWidthMin) * 0.45;
      timelinePanMin += panStep;
      currentTimelineWindowPreset = null;
      updateTimelineWindowPresetButtons();
      if (typeof updateSimulationUI === 'function') updateSimulationUI();
      drawTimeline();
      return;
    }

    const span = Math.max(30, lastTimelineGraphEndMin - lastTimelineGraphStartMin);
    const anchorMin = lastTimelineGraphStartMin + frac * span;
    const factor = e.deltaY < 0 ? 1.22 : (1 / 1.22);
    adjustTimelineXZoomFactor(factor, anchorMin, frac);
    if (typeof updateSimulationUI === 'function') updateSimulationUI();
  }, { passive: false });

  canvas.addEventListener('dblclick', () => {
    setTimelineWindowHours('auto');
  });

  let dragStartX = null;
  let dragStartPan = 0;

  canvas.addEventListener('pointerdown', (e) => {
    isPointerDownOnTimeline = true;
    dragStartX = e.clientX;
    dragStartPan = timelinePanMin;
    if (canvas.setPointerCapture) {
      try { canvas.setPointerCapture(e.pointerId); } catch (_) { }
    }
    updateTouchPos(e.clientX);
  });

  canvas.addEventListener('pointermove', (e) => {
    if (isPointerDownOnTimeline && dragStartX !== null) {
      const dx = e.clientX - dragStartX;
      if (Math.abs(dx) > 6) {
        const rect = canvas.getBoundingClientRect();
        const minPerPx = totalTimelineWidthMin / Math.max(10, rect.width - 48);
        timelinePanMin = dragStartPan - (dx * minPerPx);
        updateSimulationUI();
        drawTimeline();
        return;
      }
    }
    if (isPointerDownOnTimeline || e.pointerType === 'mouse') {
      updateTouchPos(e.clientX);
    }
  });

  canvas.addEventListener('pointerup', (e) => {
    isPointerDownOnTimeline = false;
    dragStartX = null;
    if (canvas.releasePointerCapture) {
      try { canvas.releasePointerCapture(e.pointerId); } catch (_) { }
    }
  });

  canvas.addEventListener('pointerleave', () => {
    if (!isPointerDownOnTimeline) {
      timelineTouchX = null;
      drawTimeline();
    }
  });

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      initialPinchDist = Math.hypot(dx, dy);
      initialPinchZoom = timelineXZoom;
    } else if (e.touches && e.touches.length === 1) {
      updateTouchPos(e.touches[0].clientX);
    }
  }, { passive: true });

  canvas.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length === 2 && initialPinchDist) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const ratio = dist / initialPinchDist;
      const rect = canvas.getBoundingClientRect();
      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const frac = Math.max(0, Math.min(1, (midX - rect.left - 24) / Math.max(10, (rect.width || 380) - 48)));
      const anchorMin = lastTimelineGraphStartMin + frac * Math.max(30, lastTimelineGraphEndMin - lastTimelineGraphStartMin);
      onTimelineXZoomChange((initialPinchZoom * ratio).toFixed(3), false, anchorMin, frac);
    } else if (e.touches && e.touches.length === 1) {
      updateTouchPos(e.touches[0].clientX);
    }
  }, { passive: true });

  canvas.addEventListener('touchend', (e) => {
    if (!e.touches || e.touches.length < 2) {
      initialPinchDist = null;
    }
  });
}

function drawTimeline() {
  const canvas = document.getElementById('timeline-canvas');
  const emptyHint = document.getElementById('empty-timeline-hint');
  const legendBox = document.getElementById('journal-timeline-legend');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const w = rect.width || 380;
  const h = rect.height || 208;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const isLightTheme = typeof appTheme !== 'undefined' && appTheme === 'light';
  if (isLightTheme) {
    ctx.fillStyle = '#f5efe2';
    ctx.fillRect(0, 0, w, h);
  }

  if (ingestions.length === 0) {
    emptyHint.classList.remove('hidden');
    if (legendBox) {
      legendBox.classList.add('hidden');
      legendBox.innerHTML = '';
    }
    return;
  }
  emptyHint.classList.add('hidden');

  const unitIntakeModels = [];
  const nowMs = getNowTime();

  ingestions.forEach(ing => {
    const s = SUBSTANCES_BY_NAME[ing.substanceName];
    if (!s) return;

    const roa = s.roas
      ? (s.roas.find(r => r.name === (ing.route || 'oral') && r.duration) || s.roas.find(r => r.duration) || s.roas[0])
      : null;
    if (!roa || !roa.duration || !roa.duration.onset || !roa.duration.peak || !roa.duration.offset) return;

    const { onsetMin: stdOnsetMin, riseMin: stdRiseMin, fallMin: stdFallMin } = parseRoaDurationMinutes(roa);
    const pkMod = (typeof getPersonalizedPKModifier === 'function')
      ? getPersonalizedPKModifier(ing, ingestions)
      : {
          verified: false,
          onsetScale: 1.0,
          riseScale: 1.0,
          fallScale: 1.0,
          totalDurationScale: 1.0,
          amplitudeScale: 1.0,
          stdDurationMin: Math.round(stdOnsetMin + stdRiseMin + stdFallMin),
          realDurationMin: Math.round(stdOnsetMin + stdRiseMin + stdFallMin),
          conflicts: [],
          calibrationSource: null,
          toleranceInfo: { toleranceIndex: 0 }
        };

    const baseOnsetMin = stdOnsetMin * (pkMod.onsetScale || 1.0);
    const baseRiseMin = stdRiseMin * (pkMod.riseScale || 1.0);
    const baseFallMin = stdFallMin * (pkMod.fallScale || 1.0);

    const waves = (ing.waves && ing.waves.length > 0)
      ? ing.waves
      : [{ delayMin: 0, weight: 1.0, onsetScale: 1.0, riseScale: 1.0, plateauMin: 0, fallScale: 1.0 }];

    const fallZeroFrac = 0.86;
    let maxWaveEndRel = 0;
    let maxStdWaveEndRel = 0;
    waves.forEach(wv => {
      const wOnset = baseOnsetMin * (wv.onsetScale || 1.0);
      const wRise = baseRiseMin * (wv.riseScale || wv.stretch || 1.0);
      const wPlat = (wv.plateauMin !== undefined ? wv.plateauMin : (wv.extraPeakMin || 0)) * (pkMod.fallScale || 1.0);
      const wFall = baseFallMin * (wv.fallScale || wv.stretch || 1.0);
      const wEnd = (wv.delayMin || 0) + wOnset + wRise + wPlat + wFall * fallZeroFrac;
      if (wEnd > maxWaveEndRel) maxWaveEndRel = wEnd;

      const sOnset = stdOnsetMin * (wv.onsetScale || 1.0);
      const sRise = stdRiseMin * (wv.riseScale || wv.stretch || 1.0);
      const sPlat = wv.plateauMin !== undefined ? wv.plateauMin : (wv.extraPeakMin || 0);
      const sFall = stdFallMin * (wv.fallScale || wv.stretch || 1.0);
      const sEnd = (wv.delayMin || 0) + sOnset + sRise + sPlat + sFall * fallZeroFrac;
      if (sEnd > maxStdWaveEndRel) maxStdWaveEndRel = sEnd;
    });

    const d = roa.dose || {};
    const heavyRef = d.heavyMin
      || (d.strongMin ? d.strongMin * 1.35 : null)
      || (d.commonMin ? d.commonMin * 2.0 : null)
      || (d.lightMin ? d.lightMin * 4.0 : 100);

    const powerFactor = getSubstancePowerFactor(s);
    const subColor = s.color || '#818cf8';

    const subIntakes = (ing.intakes && ing.intakes.length > 0)
      ? ing.intakes
      : [{ dose: ing.dose, timeOffsetMinutes: ing.timeOffsetMinutes || 0, timestamp: ing.timestamp }];

    subIntakes.forEach(subIt => {
      const tIng = subIt.timestamp
        ? Math.round((subIt.timestamp - nowMs) / 60000)
        : (subIt.timeOffsetMinutes || 0);
      const tierResp = computeTierResponse(subIt.dose, d, heavyRef);
      const stdDoseRatio = Math.max(0.06, tierResp * powerFactor);
      const singleDoseRatio = Math.max(0.05, stdDoseRatio * (pkMod.amplitudeScale || 1.0));

      function getEffectAt(tm) {
        const dt = tm - tIng;
        if (dt <= 0) return 0;
        let sum = 0;
        for (let wIdx = 0; wIdx < waves.length; wIdx++) {
          const wv = waves[wIdx];
          const dtW = dt - (wv.delayMin || 0);
          if (dtW > 0) {
            const adjWv = (wv.plateauMin || wv.extraPeakMin)
              ? { ...wv, plateauMin: (wv.plateauMin !== undefined ? wv.plateauMin : wv.extraPeakMin) * (pkMod.fallScale || 1.0) }
              : wv;
            sum += (wv.weight || 1.0) * evalSmoothWave(dtW, adjWv, baseOnsetMin, baseRiseMin, baseFallMin, null);
          }
        }
        return sum * singleDoseRatio;
      }

      const evalCombinedUnit = (pkMod && Array.isArray(pkMod.metaboliteTailModels) && pkMod.metaboliteTailModels.length > 0 && typeof buildSingleIntakeCombinedProfile === 'function')
        ? buildSingleIntakeCombinedProfile(waves, baseOnsetMin, baseRiseMin, baseFallMin, pkMod)
        : null;

      function getCombinedEffectAt(tm) {
        if (!evalCombinedUnit) return getEffectAt(tm);
        const dt = tm - tIng;
        if (dt <= 0) return 0;
        return evalCombinedUnit(dt) * singleDoseRatio;
      }

      function getStdEffectAt(tm) {
        const dt = tm - tIng;
        if (dt <= 0) return 0;
        let sum = 0;
        for (let wIdx = 0; wIdx < waves.length; wIdx++) {
          const wv = waves[wIdx];
          const dtW = dt - (wv.delayMin || 0);
          if (dtW > 0) {
            sum += (wv.weight || 1.0) * evalSmoothWave(dtW, wv, stdOnsetMin, stdRiseMin, stdFallMin, null);
          }
        }
        return sum * stdDoseRatio;
      }

      function getMetaboliteEffectAt(tm, metIdx) {
        const dt = tm - tIng;
        if (dt <= 0 || !pkMod || !pkMod.metaboliteTailModels || !pkMod.metaboliteTailModels[metIdx]) return 0;
        const metModel = pkMod.metaboliteTailModels[metIdx];
        const peakRatioVal = metModel.effectiveActivityPeakRatio !== undefined ? metModel.effectiveActivityPeakRatio : 0.35;
        const singleDoseMetCapScale = peakRatioVal > 1.0 ? (1.0 / peakRatioVal) : 1.0;
        let sum = 0;
        for (let wIdx = 0; wIdx < waves.length; wIdx++) {
          const wv = waves[wIdx];
          const dtW = dt - (wv.delayMin || 0);
          if (dtW > 0) {
            const wOnset = baseOnsetMin * (wv.onsetScale || 1.0);
            sum += (wv.weight || 1.0) * evalSingleMetaboliteActivityAt(dtW, wOnset, metModel, false);
          }
        }
        return sum * singleDoseMetCapScale * singleDoseRatio;
      }

      const showMet = typeof showMetaboliteCurves === 'undefined' || showMetaboliteCurves;
      const tailRelMin = (showMet && pkMod && pkMod.hasActiveMetaboliteTail && pkMod.metaboliteTailEndMin)
        ? Math.max(maxWaveEndRel, pkMod.metaboliteTailEndMin)
        : maxWaveEndRel;

      unitIntakeModels.push({
        ing,
        pkMod,
        substance: s,
        substanceName: s.name,
        dose: subIt.dose,
        unit: ing.unit,
        color: subColor,
        rgb: hexToRgb(subColor),
        tIng,
        tOnsetAbs: tIng + baseOnsetMin,
        tEndAbs: tIng + maxWaveEndRel,
        tTailEndAbs: tIng + tailRelMin,
        tStdEndAbs: tIng + maxStdWaveEndRel,
        totalDurMin: maxWaveEndRel,
        tailDurMin: tailRelMin,
        stdDurMin: maxStdWaveEndRel,
        singleDoseRatio,
        stdDoseRatio,
        getEffectAt,
        getCombinedEffectAt,
        getStdEffectAt,
        getMetaboliteEffectAt
      });
    });
  });

  if (unitIntakeModels.length === 0) return;

  const groupsBySubstance = {};
  unitIntakeModels.forEach(um => {
    if (!groupsBySubstance[um.substanceName]) {
      groupsBySubstance[um.substanceName] = {
        substance: um.substance,
        substanceName: um.substanceName,
        pkMod: um.pkMod,
        color: um.color,
        rgb: um.rgb,
        unit: um.unit,
        totalDose: 0,
        intakeTimes: [],
        releaseBadges: new Set(),
        models: [],
        minStartMin: um.tIng,
        maxEndMin: um.tEndAbs,
        maxTailEndMin: um.tTailEndAbs,
        maxStdEndMin: um.tStdEndAbs
      };
    }
    const grp = groupsBySubstance[um.substanceName];
    grp.totalDose = Number((grp.totalDose + (um.dose || 0)).toFixed(2));
    grp.intakeTimes.push(um.tIng);
    if (um.ing.releaseProfileId && um.ing.releaseProfileId !== 'IR') {
      grp.releaseBadges.add(currentLang === 'fr' ? (um.ing.releaseBadgeFr || 'LP') : (um.ing.releaseBadgeEn || 'ER'));
    }
    grp.models.push(um);
    if (um.tIng < grp.minStartMin) grp.minStartMin = um.tIng;
    if (um.tEndAbs > grp.maxEndMin) grp.maxEndMin = um.tEndAbs;
    if (um.tTailEndAbs > grp.maxTailEndMin) grp.maxTailEndMin = um.tTailEndAbs;
    if (um.tStdEndAbs > grp.maxStdEndMin) grp.maxStdEndMin = um.tStdEndAbs;
  });

  const substanceGroups = Object.values(groupsBySubstance);
  let maxPeakOnGraph = 0.01;

  substanceGroups.forEach(grp => {
    grp.getCumulativeEffectAt = function (tm) {
      let totalEff = 0;
      for (let i = 0; i < grp.models.length; i++) {
        totalEff += grp.models[i].getEffectAt(tm);
      }
      return totalEff;
    };

    grp.getTotalWithMetabolitesAt = function (tm) {
      let totalEff = 0;
      for (let i = 0; i < grp.models.length; i++) {
        totalEff += grp.models[i].getCombinedEffectAt(tm);
      }
      return totalEff;
    };

    grp.getStdCumulativeEffectAt = function (tm) {
      let totalEff = 0;
      for (let i = 0; i < grp.models.length; i++) {
        totalEff += grp.models[i].getStdEffectAt(tm);
      }
      return totalEff;
    };

    let bestTm = grp.minStartMin + 60;
    let maxVal = 0;
    let maxCombinedVal = 0;
    let maxStdVal = 0;
    const scanEnd = Math.max(grp.maxEndMin, grp.maxStdEndMin || grp.maxEndMin);
    for (let tm = grp.minStartMin; tm <= scanEnd; tm += 4) {
      const v = grp.getCumulativeEffectAt(tm);
      if (v > maxVal) {
        maxVal = v;
        bestTm = tm;
      }
      const cv = grp.getTotalWithMetabolitesAt(tm);
      if (cv > maxCombinedVal) {
        maxCombinedVal = cv;
      }
      const sv = grp.getStdCumulativeEffectAt(tm);
      if (sv > maxStdVal) {
        maxStdVal = sv;
      }
    }
    grp.peakVal = Math.max(0.02, maxVal);
    grp.combinedPeakVal = grp.models.length === 1 ? grp.peakVal : Math.max(grp.peakVal, maxCombinedVal);
    grp.stdPeakVal = Math.max(0.02, maxStdVal);
    grp.tApexAbs = bestTm;
    if (grp.peakVal > maxPeakOnGraph) {
      maxPeakOnGraph = grp.peakVal;
    }
    if ((typeof showMetaboliteCurves !== 'undefined' && showMetaboliteCurves) && grp.models.length > 1 && grp.combinedPeakVal > maxPeakOnGraph) {
      maxPeakOnGraph = grp.combinedPeakVal;
    }
    if (typeof patientPKProfile !== 'undefined' && patientPKProfile.showStandardReferenceCurve && grp.stdPeakVal > maxPeakOnGraph) {
      maxPeakOnGraph = grp.stdPeakVal;
    }

    grp.metaboliteSeries = [];
    if (
      (typeof showMetaboliteCurves === 'undefined' || showMetaboliteCurves) &&
      grp.pkMod &&
      Array.isArray(grp.pkMod.metaboliteTailModels) &&
      grp.pkMod.metaboliteTailModels.length > 0
    ) {
      grp.pkMod.metaboliteTailModels.forEach((metModel, metIdx) => {
        const metColor = (typeof getMetaboliteCoherentColor === 'function')
          ? getMetaboliteCoherentColor(grp.color, metModel, metIdx)
          : (metModel.color || '#38BDF8');
        const metRgb = hexToRgb(metColor);
        const getMetCumulativeAt = function (tm) {
          let mTot = 0;
          for (let i = 0; i < grp.models.length; i++) {
            mTot += grp.models[i].getMetaboliteEffectAt(tm, metIdx);
          }
          return mTot;
        };
        let bestMetTm = grp.minStartMin + (metModel.lagMin || 120);
        let maxMetVal = 0;
        const metScanEnd = Math.max(scanEnd, Math.min(grp.maxTailEndMin || scanEnd, grp.minStartMin + 1440));
        for (let tm = grp.minStartMin; tm <= metScanEnd; tm += 6) {
          const mv = getMetCumulativeAt(tm);
          if (mv > maxMetVal) {
            maxMetVal = mv;
            bestMetTm = tm;
          }
        }
        const metMaxAllowed = grp.models.length === 1 ? grp.peakVal : maxPeakOnGraph;
        if (grp.models.length > 1 && maxMetVal > metMaxAllowed) {
          maxPeakOnGraph = maxMetVal;
        }
        grp.metaboliteSeries.push({
          metIdx,
          metModel,
          name: metModel.name,
          isSubMetabolite: Boolean(metModel.isSubMetabolite),
          precursorMetabolites: metModel.precursorMetabolites || [],
          color: metColor,
          rgb: metRgb,
          peakVal: Math.max(0.01, Math.min(grp.models.length === 1 ? grp.peakVal : Infinity, maxMetVal)),
          tApexAbs: bestMetTm,
          getEffectAt: grp.models.length === 1 && maxMetVal > grp.peakVal
            ? (tm) => getMetCumulativeAt(tm) * (grp.peakVal / maxMetVal)
            : getMetCumulativeAt
        });
      });
    }

    const tierInfo = getDoseTierInfo(grp.substanceName, 'oral', grp.totalDose, currentLang);
    grp.tierLabel = tierInfo.label || 'Standard';

    grp.getPhaseLabelAt = function (tm) {
      const v = grp.getCumulativeEffectAt(tm);
      if (tm < grp.minStartMin) return currentLang === 'fr' ? 'Avant prise' : 'Before intake';
      if (v <= 0.004 && tm > grp.tApexAbs) return currentLang === 'fr' ? 'Terminé' : 'Ended';
      if (tm > grp.maxEndMin && v > 0.004 && grp.pkMod && grp.pkMod.hasActiveMetaboliteTail) {
        const allMets = (grp.pkMod.metaboliteTailModels || []).map(m => m.name).join(' + ');
        return currentLang === 'fr'
          ? `Queue métabolite${allMets ? ` (${allMets})` : ''} • RdR`
          : `Metabolite tail${allMets ? ` (${allMets})` : ''} • HR`;
      }
      if (v <= 0.02 && tm <= grp.tApexAbs) return currentLang === 'fr' ? 'Latence (Onset)' : 'Onset';
      const vNext = grp.getCumulativeEffectAt(tm + 8);
      const relBadgesArr = Array.from(grp.releaseBadges);
      const lpTag = relBadgesArr.length > 0 ? ` • ${relBadgesArr[0]}` : '';
      if (v >= grp.peakVal * 0.85) return (currentLang === 'fr' ? 'Pic / Plateau' : 'Peak / Plateau') + lpTag;
      if (vNext > v + 0.005) return (currentLang === 'fr' ? 'Montée' : 'Comeup') + lpTag;
      return (currentLang === 'fr' ? 'Descente / Plateau' : 'Offset / Plateau') + lpTag;
    };
  });

  const minIntakeStart = Math.min(...substanceGroups.map(g => g.minStartMin));
  const maxAcuteEnd = Math.max(...substanceGroups.map(g => Math.max(g.maxEndMin, g.maxStdEndMin || g.maxEndMin)));
  const maxFullTailEnd = Math.max(...substanceGroups.map(g => g.maxTailEndMin || g.maxEndMin));

  let basePastMin;
  let baseFutureMin;
  if (currentTimelineWindowPreset === 'auto') {
    basePastMin = Math.max(-420, Math.min(-90, minIntakeStart - 45));
    const naturalFuture = Math.max(360, maxAcuteEnd + 60);
    baseFutureMin = Math.min(1680, Math.max(240, naturalFuture));
  } else if (currentTimelineWindowPreset === 72) {
    basePastMin = -180;
    baseFutureMin = 4140;
  } else {
    basePastMin = Math.max(-360, Math.min(-180, minIntakeStart - 60));
    const acuteFutureSpan = Math.max(960, maxAcuteEnd + 60);
    baseFutureMin = Math.min(1320, acuteFutureSpan);
  }

  lastTimelineBasePastMin = basePastMin;
  lastTimelineBaseFutureMin = baseFutureMin;
  lastTimelineEffectSpanMin = Math.max(300, (maxAcuteEnd - minIntakeStart) + 120);
  lastRenderedCanvasWidth = w;

  const minZoom = getMinTimelineXZoom();
  if (timelineXZoom < minZoom) {
    timelineXZoom = minZoom;
  }
  const sliderEl = document.getElementById('timeline-x-zoom-slider');
  if (sliderEl) {
    sliderEl.min = minZoom.toFixed(2);
    sliderEl.value = timelineXZoom;
  }
  const zoomBadgeEl = document.getElementById('timeline-x-zoom-val');
  if (zoomBadgeEl) {
    zoomBadgeEl.textContent = timelineXZoom >= 10 ? timelineXZoom.toFixed(0) + 'x' : timelineXZoom.toFixed(1) + 'x';
  }

  const visiblePastMin = (basePastMin / timelineXZoom) + timelinePanMin;
  const visibleFutureMin = (baseFutureMin / timelineXZoom) + timelinePanMin;

  const useSubHourGrid = (visibleFutureMin - visiblePastMin) <= 240;
  const tickSnapMin = useSubHourGrid ? 30 : 60;
  const graphStartMin = Math.floor(visiblePastMin / tickSnapMin) * tickSnapMin;
  const graphEndMin = Math.ceil(visibleFutureMin / tickSnapMin) * tickSnapMin;
  const totalGraphMin = Math.max(graphEndMin - graphStartMin, 30);
  totalTimelineWidthMin = totalGraphMin;
  lastTimelineGraphStartMin = graphStartMin;
  lastTimelineGraphEndMin = graphEndMin;

  const leftPad = 24;
  const rightPad = 24;
  const topY = 48;
  const bottomY = h - 26;
  const curveHeight = bottomY - topY;
  const maxDoseRatio = Math.max(0.02, maxPeakOnGraph);

  function mToX(m) {
    return leftPad + ((m - graphStartMin) / totalGraphMin) * (w - leftPad - rightPad);
  }

  function valToY(normVal) {
    return bottomY - (normVal / maxDoseRatio) * curveHeight;
  }

  const tierLevels = [
    { frac: 0.25, label: '25%' },
    { frac: 0.50, label: '50%' },
    { frac: 0.75, label: '75%' },
    { frac: 1.00, label: '100% (Max)' }
  ];
  tierLevels.forEach(tl => {
    const y = valToY(tl.frac * maxDoseRatio);
    if (y >= topY - 8 && y <= bottomY) {
      ctx.strokeStyle = isLightTheme ? 'rgba(68, 64, 60, 0.08)' : 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(leftPad, y);
      ctx.lineTo(w - rightPad, y);
      ctx.stroke();

      ctx.fillStyle = isLightTheme ? 'rgba(87, 83, 78, 0.65)' : 'rgba(148, 163, 184, 0.40)';
      ctx.font = '8px sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText(tl.label, w - 6, y - 1);
    }
  });

  const totalHoursCount = totalGraphMin / 60;
  const gridStepMin = totalGraphMin <= 180 ? 30 : (totalHoursCount > 96 ? 240 : (totalHoursCount > 48 ? 120 : 60));
  const labelStepMin = totalGraphMin <= 180 ? 30 : (totalHoursCount > 240 ? 1440 : (totalHoursCount > 120 ? 720 : (totalHoursCount > 56 ? 480 : (totalHoursCount > 28 ? 240 : (totalHoursCount > 14 ? 120 : 60)))));

  const nowDateObj = new Date(nowMs);
  const nowMinutesOfDay = nowDateObj.getHours() * 60 + nowDateObj.getMinutes() + nowDateObj.getSeconds() / 60;
  const firstClockDayMin = Math.ceil((nowMinutesOfDay + graphStartMin) / gridStepMin) * gridStepMin;

  let lastLabelX = -999;
  for (let clockMin = firstClockDayMin; clockMin <= nowMinutesOfDay + graphEndMin; clockMin += gridStepMin) {
    const m = clockMin - nowMinutesOfDay;
    const x = mToX(m);
    if (x < leftPad - 1 || x > w - rightPad + 1) continue;

    ctx.save();
    ctx.strokeStyle = isLightTheme ? 'rgba(68, 64, 60, 0.14)' : 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, topY - 14);
    ctx.lineTo(x, bottomY);
    ctx.stroke();
    ctx.restore();

    ctx.strokeStyle = isLightTheme ? 'rgba(68, 64, 60, 0.42)' : 'rgba(255, 255, 255, 0.38)';
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(x, bottomY - 3);
    ctx.lineTo(x, bottomY + 4);
    ctx.stroke();

    const normClockMin = ((Math.round(clockMin) % 1440) + 1440) % 1440;
    const isMajorLabel = (normClockMin % labelStepMin === 0);
    if (isMajorLabel && x - lastLabelX >= 30) {
      const hh = Math.floor(normClockMin / 60);
      const mm = normClockMin % 60;
      const tickLabel = mm !== 0
        ? `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
        : `${String(hh).padStart(2, '0')}h`;
      ctx.fillStyle = isLightTheme ? '#57534e' : '#94a3b8';
      ctx.font = '8.5px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(tickLabel, x, h - 11);
      lastLabelX = x;
    }
  }

  const zeroX = mToX(0);
  if (zeroX >= leftPad && zeroX <= w - rightPad) {
    ctx.save();
    ctx.strokeStyle = isLightTheme ? 'rgba(79, 70, 229, 0.72)' : 'rgba(99, 102, 241, 0.65)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(zeroX, topY - 14);
    ctx.lineTo(zeroX, bottomY);
    ctx.stroke();
    ctx.restore();

    const isPastView = typeof selectedJournalDayOffset !== 'undefined' && selectedJournalDayOffset < 0;
    if (!isPastView) {
      const nowClockStr = `${String(nowDateObj.getHours()).padStart(2, '0')}:${String(nowDateObj.getMinutes()).padStart(2, '0')}`;
      ctx.fillStyle = isLightTheme ? '#4338ca' : '#a5b4fc';
      ctx.font = 'bold 8.5px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(nowClockStr, zeroX, topY - 20);
    }
  }

  ctx.strokeStyle = isLightTheme ? 'rgba(68, 64, 60, 0.24)' : 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(leftPad, bottomY);
  ctx.lineTo(w - rightPad, bottomY);
  ctx.stroke();

  const samples = 360;
  const placedBadges = [];

  substanceGroups.forEach(grp => {
    const { r, g, b } = grp.rgb;
    const pts = [];

    if (grp.metaboliteSeries && grp.metaboliteSeries.length > 0) {
      grp.metaboliteSeries.forEach((ms, msIdx) => {
        if (typeof isTimelineSeriesVisible === 'function' && !isTimelineSeriesVisible(grp.substanceName, 'met:' + ms.name)) {
          return;
        }
        const { r: mr, g: mg, b: mb } = ms.rgb;
        const mPts = [];
        let visPeakTm = ms.tApexAbs;
        let visPeakEff = ms.getEffectAt(ms.tApexAbs);

        for (let i = 0; i <= samples; i++) {
          const tm = graphStartMin + (i / samples) * totalGraphMin;
          const x = mToX(tm);
          const mEff = ms.getEffectAt(tm);
          const y = valToY(mEff);
          mPts.push({ x, y, tm, mEff });
        }

        if (ms.tApexAbs < graphStartMin + 20 || ms.tApexAbs > graphEndMin - 20) {
          visPeakEff = 0;
          mPts.forEach(p => {
            if (p.x >= leftPad + 16 && p.x <= w - rightPad - 16 && p.mEff > visPeakEff) {
              visPeakEff = p.mEff;
              visPeakTm = p.tm;
            }
          });
        }

        const mPeakY = valToY(Math.max(0.01, ms.peakVal));

        ctx.beginPath();
        ctx.moveTo(mPts[0].x, bottomY);
        mPts.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(mPts[mPts.length - 1].x, bottomY);
        ctx.closePath();

        const mGrad = ctx.createLinearGradient(0, mPeakY, 0, bottomY);
        mGrad.addColorStop(0, `rgba(${mr}, ${mg}, ${mb}, 0.24)`);
        mGrad.addColorStop(0.75, `rgba(${mr}, ${mg}, ${mb}, 0.06)`);
        mGrad.addColorStop(1, `rgba(${mr}, ${mg}, ${mb}, 0.0)`);
        ctx.fillStyle = mGrad;
        ctx.fill();

        ctx.save();
        ctx.beginPath();
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.setLineDash(ms.isSubMetabolite ? [3, 3] : [6, 3]);
        mPts.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.strokeStyle = ms.color;
        ctx.lineWidth = ms.isSubMetabolite ? 1.85 : 2.05;
        ctx.stroke();
        ctx.restore();

        const visX = mToX(visPeakTm);
        const visY = valToY(visPeakEff);
        if (visX >= leftPad + 6 && visX <= w - rightPad - 6 && visPeakEff > 0.004) {
          ctx.fillStyle = ms.color;
          ctx.beginPath();
          ctx.arc(visX, visY, 3.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.1;
          ctx.stroke();

          if (timelineTouchX === null) {
            const prefix = ms.isSubMetabolite ? '↳↳ ' : '↳ ';
            const metLabel = `${prefix}${ms.name}`;
            ctx.font = 'bold 8.5px sans-serif';
            const tw = ctx.measureText(metLabel).width;
            const pw = tw + 10;
            const ph = 14;
            const staggerX = (msIdx - (grp.metaboliteSeries.length - 1) / 2) * 14;
            const px = Math.max(pw / 2 + 4, Math.min(w - pw / 2 - 4, visX + staggerX));
            let py = Math.max(14, Math.min(bottomY - 12, visY - 12));

            placedBadges.forEach(prev => {
              if (Math.abs(prev.x - px) < (prev.w + pw) / 2 + 4 && Math.abs(prev.y - py) < ph + 2) {
                py = Math.max(12, prev.y - ph - 2);
              }
            });
            placedBadges.push({ x: px, y: py, w: pw });

            ctx.fillStyle = isLightTheme ? 'rgba(255, 253, 248, 0.94)' : 'rgba(15, 23, 42, 0.90)';
            ctx.beginPath();
            if (ctx.roundRect) {
              ctx.roundRect(px - pw / 2, py - ph / 2, pw, ph, 6);
            } else {
              ctx.rect(px - pw / 2, py - ph / 2, pw, ph);
            }
            ctx.fill();
            ctx.fillStyle = `rgba(${mr}, ${mg}, ${mb}, 0.22)`;
            ctx.fill();
            ctx.strokeStyle = ms.color;
            ctx.lineWidth = 0.95;
            ctx.stroke();

            ctx.fillStyle = isLightTheme ? '#1c1917' : '#f8fafc';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(metLabel, px, py);
          }
        }
      });
    }

    const showParentCurve = typeof isTimelineSeriesVisible !== 'function' || isTimelineSeriesVisible(grp.substanceName, 'parent');
    const showCumulCurve = typeof isTimelineSeriesVisible !== 'function' || isTimelineSeriesVisible(grp.substanceName, 'cumul');

    if (showCumulCurve && grp.metaboliteSeries && grp.metaboliteSeries.length > 0 && typeof grp.getTotalWithMetabolitesAt === 'function') {
      const combPts = [];
      for (let i = 0; i <= samples; i++) {
        const tm = graphStartMin + (i / samples) * totalGraphMin;
        const x = mToX(tm);
        const combEff = grp.getTotalWithMetabolitesAt(tm);
        const y = valToY(combEff);
        combPts.push({ x, y });
      }
      ctx.save();
      ctx.beginPath();
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.setLineDash([7, 3]);
      combPts.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.strokeStyle = isLightTheme ? 'rgba(41, 37, 36, 0.72)' : 'rgba(226, 232, 240, 0.72)';
      ctx.lineWidth = 1.85;
      ctx.stroke();
      ctx.restore();
    }

    if (showParentCurve) {
      for (let i = 0; i <= samples; i++) {
        const tm = graphStartMin + (i / samples) * totalGraphMin;
        const x = mToX(tm);
        const effect = grp.getCumulativeEffectAt(tm);
        const y = valToY(effect);
        pts.push({ x, y });
      }

      const peakY = valToY(grp.peakVal);

      ctx.beginPath();
      ctx.moveTo(pts[0].x, bottomY);
      pts.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(pts[pts.length - 1].x, bottomY);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, peakY, 0, bottomY);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.44)`);
      grad.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.13)`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.0)`);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      pts.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.strokeStyle = grp.color;
      ctx.lineWidth = 2.6;
      ctx.stroke();

      const apexX = mToX(grp.tApexAbs);
      const endX = mToX(grp.maxEndMin);

      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.28)`;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(apexX, peakY);
      ctx.lineTo(apexX, bottomY);
      ctx.stroke();
      ctx.setLineDash([]);

      grp.intakeTimes.forEach(tIng => {
        const ingX = mToX(tIng);
        ctx.fillStyle = grp.color;
        ctx.beginPath();
        ctx.arc(ingX, bottomY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.3;
        ctx.stroke();
      });

      if (endX >= leftPad - 2 && endX <= w - rightPad + 2) {
        ctx.fillStyle = grp.color;
        ctx.beginPath();
        ctx.arc(endX, bottomY, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = grp.color;
      ctx.beginPath();
      ctx.arc(apexX, peakY, 3.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      if (timelineTouchX === null) {
        ctx.font = 'bold 9px sans-serif';
        const relBadgesArr = Array.from(grp.releaseBadges);
        const lpSuffix = relBadgesArr.length > 0 ? ` • ${relBadgesArr.join('+')}` : '';
        const cumulSuffix = grp.models.length > 1 ? ` [${grp.models.length}×]` : '';
        const nowEff = grp.getCumulativeEffectAt(0);
        const nowPctVsHigh = grp.peakVal > 0 ? Math.min(100, Math.max(0, Math.round((nowEff / grp.peakVal) * 100))) : 0;
        const badgeText = `${grp.substanceName} (${grp.totalDose}${grp.unit} • ${nowPctVsHigh}%${cumulSuffix}${lpSuffix})`;
        const txtW = ctx.measureText(badgeText).width;
        const pillW = txtW + 12;
        const pillH = 16;
        const pillX = Math.max(pillW / 2 + 4, Math.min(w - pillW / 2 - 4, apexX));
        let pillY = Math.max(12, peakY - 13);

        placedBadges.forEach(prev => {
          if (Math.abs(prev.x - pillX) < (prev.w + pillW) / 2 + 4 && Math.abs(prev.y - pillY) < pillH + 2) {
            pillY = Math.max(11, prev.y - pillH - 2);
          }
        });
        placedBadges.push({ x: pillX, y: pillY, w: pillW });

        ctx.fillStyle = isLightTheme ? 'rgba(255, 253, 248, 0.92)' : 'rgba(15, 23, 42, 0.85)';
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(pillX - pillW / 2, pillY - pillH / 2, pillW, pillH, 8);
        } else {
          ctx.rect(pillX - pillW / 2, pillY - pillH / 2, pillW, pillH);
        }
        ctx.fill();

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.25)`;
        ctx.fill();
        ctx.strokeStyle = grp.color;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = isLightTheme ? '#1c1917' : '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(badgeText, pillX, pillY);
      }
    }
  });

  if (timelineTouchX !== null) {
    const touchX = Math.max(leftPad, Math.min(w - rightPad, timelineTouchX));
    const touchedMin = graphStartMin + ((touchX - leftPad) / (w - leftPad - rightPad)) * totalGraphMin;
    const absMin = Math.round(Math.abs(touchedMin));
    const hrs = Math.floor(absMin / 60);
    const mins = absMin % 60;
    const durText = hrs > 0
      ? (mins > 0 ? `${hrs}h ${mins}min` : `${hrs}h`)
      : `${mins} min`;

    const touchedDate = new Date(nowMs + touchedMin * 60000);
    const clockTimeStr = touchedDate.toTimeString().slice(0, 5);
    const isPastDay = typeof selectedJournalDayOffset !== 'undefined' && selectedJournalDayOffset < 0;

    let deltaLabel = '';
    if (isPastDay) {
      const dayLbl = formatJournalDayShortLabel(selectedJournalDayOffset, currentLang);
      const signDur = absMin < 1 ? 'Réf' : (touchedMin < 0 ? `-${durText}` : `+${durText}`);
      deltaLabel = `${dayLbl} • ${clockTimeStr} (${signDur})`;
    } else if (absMin < 1) {
      deltaLabel = currentLang === 'fr' ? `${clockTimeStr} • Maintenant (T=0)` : `${clockTimeStr} • Now (T=0)`;
    } else if (touchedMin < 0) {
      deltaLabel = currentLang === 'fr' ? `${clockTimeStr} • Il y a ${durText}` : `${clockTimeStr} • ${durText} ago`;
    } else {
      deltaLabel = currentLang === 'fr' ? `${clockTimeStr} • Dans ${durText}` : `${clockTimeStr} • In ${durText}`;
    }

    ctx.save();
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(touchX, topY - 12);
    ctx.lineTo(touchX, bottomY);
    ctx.stroke();
    ctx.restore();

    let activeSubInfo = '';
    substanceGroups.forEach(grp => {
      const showParentTouch = typeof isTimelineSeriesVisible !== 'function' || isTimelineSeriesVisible(grp.substanceName, 'parent');
      const showCumulTouch = typeof isTimelineSeriesVisible !== 'function' || isTimelineSeriesVisible(grp.substanceName, 'cumul');

      if (grp.metaboliteSeries && grp.metaboliteSeries.length > 0) {
        grp.metaboliteSeries.forEach(ms => {
          if (typeof isTimelineSeriesVisible === 'function' && !isTimelineSeriesVisible(grp.substanceName, 'met:' + ms.name)) {
            return;
          }
          const mEff = ms.getEffectAt(touchedMin);
          if (mEff > 0.003) {
            const mY = valToY(mEff);
            ctx.fillStyle = ms.color;
            ctx.beginPath();
            ctx.arc(touchX, mY, 3.6, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        });
      }

      const eff = grp.getCumulativeEffectAt(touchedMin);
      const yAtTouch = valToY(eff);

      if (showCumulTouch && grp.metaboliteSeries && grp.metaboliteSeries.length > 0 && typeof grp.getTotalWithMetabolitesAt === 'function') {
        const combEff = grp.getTotalWithMetabolitesAt(touchedMin);
        if (combEff > 0.004) {
          ctx.fillStyle = '#e2e8f0';
          ctx.beginPath();
          ctx.arc(touchX, valToY(combEff), 3.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (showParentTouch) {
        ctx.fillStyle = grp.color;
        ctx.beginPath();
        ctx.arc(touchX, yAtTouch, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      if ((eff > 0.004 || (grp.metaboliteSeries && grp.metaboliteSeries.length > 0 && grp.getTotalWithMetabolitesAt(touchedMin) > 0.004)) && !activeSubInfo) {
        const pctEff = Math.round((eff / grp.peakVal) * 100);
        const phase = grp.getPhaseLabelAt(touchedMin);
        const combVal = (grp.metaboliteSeries && grp.metaboliteSeries.length > 0 && typeof grp.getTotalWithMetabolitesAt === 'function')
          ? grp.getTotalWithMetabolitesAt(touchedMin)
          : eff;
        const combPct = Math.round((combVal / grp.peakVal) * 100);
        const metParts = (grp.metaboliteSeries || [])
          .filter(ms => typeof isTimelineSeriesVisible !== 'function' || isTimelineSeriesVisible(grp.substanceName, 'met:' + ms.name))
          .map(ms => {
            const mVal = ms.getEffectAt(touchedMin);
            const mPct = grp.peakVal > 0 ? Math.round((mVal / grp.peakVal) * 100) : 0;
            return mPct >= 2 ? `${ms.isSubMetabolite ? '↳↳' : '↳'}${ms.name} ${mPct}%` : null;
          })
          .filter(Boolean);
        const metSuffix = metParts.length > 0
          ? `${showCumulTouch ? ` • Global ${combPct}%` : ''} • ${metParts.join(' • ')}`
          : ` (${phase})`;
        activeSubInfo = `${grp.substanceName} : ${pctEff}%${metSuffix}`;
      }
    });

    if (!activeSubInfo && substanceGroups.length > 0) {
      const g0 = substanceGroups[0];
      activeSubInfo = `${g0.substanceName} : ${g0.getPhaseLabelAt(touchedMin)}`;
    }

    ctx.font = 'bold 10px sans-serif';
    const w1 = ctx.measureText(deltaLabel).width;
    ctx.font = '9px sans-serif';
    const w2 = activeSubInfo ? ctx.measureText(activeSubInfo).width : 0;
    const boxW = Math.max(w1, w2) + 18;
    const boxH = activeSubInfo ? 32 : 20;
    const boxX = Math.max(boxW / 2 + 4, Math.min(w - boxW / 2 - 4, touchX));
    const boxY = 6;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(boxX - boxW / 2, boxY, boxW, boxH, 8);
    } else {
      ctx.rect(boxX - boxW / 2, boxY, boxW, boxH);
    }
    ctx.fill();
    ctx.strokeStyle = touchedMin < -0.5 ? '#38bdf8' : (touchedMin > 0.5 ? '#818cf8' : '#34d399');
    ctx.lineWidth = 1.3;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(deltaLabel, boxX, activeSubInfo ? boxY + 11 : boxY + 10);

    if (activeSubInfo) {
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '9px sans-serif';
      ctx.fillText(activeSubInfo, boxX, boxY + 23);
    }
  }

  if (legendBox) {
    legendBox.classList.remove('hidden');
    const refTimeMin = timelineTouchX !== null
      ? (graphStartMin + ((Math.max(leftPad, Math.min(w - rightPad, timelineTouchX)) - leftPad) / (w - leftPad - rightPad)) * totalGraphMin)
      : 0;

    legendBox.innerHTML = substanceGroups.map(grp => {
      const effAtRef = grp.getCumulativeEffectAt(refTimeMin);
      const activeEffectPctVsHigh = grp.peakVal > 0
        ? Math.min(100, Math.max(0, Math.round((effAtRef / grp.peakVal) * 100)))
        : 0;
      const durHrs = ((grp.maxEndMin - grp.minStartMin) / 60).toFixed(1).replace('.0', '') + 'h';
      const stdDurHrs = ((grp.maxStdEndMin - grp.minStartMin) / 60).toFixed(1).replace('.0', '') + 'h';
      const pkMod = grp.pkMod || {};
      const hasDurDiff = Math.abs((grp.maxEndMin - grp.maxStdEndMin) / 60) >= 0.15;
      const safeGrpName = grp.substanceName.replace(/'/g, "\\'");
      const feltLbl = currentLang === 'fr' ? 'ressenti' : 'felt';
      const durComparisonHtml = hasDurDiff
        ? `<button type="button" onclick="openQuickCalibrateModal('${safeGrpName}')" class="text-indigo-300 hover:text-white hover:bg-indigo-950/80 px-1.5 py-0.5 rounded border border-indigo-500/40 font-mono font-bold text-[9.5px] transition cursor-pointer text-left" title="${currentLang === 'fr' ? 'Cliquer pour ajuster votre durée ressentie à jeun' : 'Click to adjust your fasting duration'}">⏱ ~${durHrs} ${feltLbl} <span class="text-slate-400 font-normal">(std ${stdDurHrs}) ✎</span></button>`
        : `<button type="button" onclick="openQuickCalibrateModal('${safeGrpName}')" class="text-slate-300 hover:text-white hover:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 font-mono text-[9.5px] transition cursor-pointer text-left" title="${currentLang === 'fr' ? 'Cliquer pour ajuster votre durée ressentie à jeun' : 'Click to adjust your fasting duration'}">⏱ ~${durHrs} ${feltLbl} ✎</button>`;

      const cumulTxt = grp.models.length > 1
        ? `<span class="text-[9.5px] text-indigo-300 font-semibold">(Cumul ${grp.models.length} prises)</span>`
        : '';

      const pkBadges = [];
      if (pkMod.hasActiveMetaboliteTail && grp.maxTailEndMin > grp.maxEndMin + 20) {
        const tailHrs = Math.round((grp.maxTailEndMin - grp.minStartMin) / 60) + 'h';
        const allMets = (pkMod.metaboliteTailModels || []).map(m => m.name).join(', ');
        const metTooltip = currentLang === 'fr'
          ? `Activité pharmacologique prolongée via métabolite(s) actif(s) (${allMets}) — vigilance interactions RdR`
          : `Prolonged pharmacological activity via active metabolite(s) (${allMets}) — HR interaction vigilance`;
        pkBadges.push(`<span class="px-1.5 py-0.5 rounded bg-violet-950/90 border border-violet-500/50 text-violet-200 text-[9px] font-mono font-semibold" title="${metTooltip}">🧬 ${currentLang === 'fr' ? `métabolite actif ~${tailHrs} (RdR)` : `active metabolite ~${tailHrs} (HR)`}</span>`);
      }

      let metaboliteCurvesLegendRow = '';
      if (grp.metaboliteSeries && grp.metaboliteSeries.length > 0) {
        const combVisible = typeof isTimelineSeriesVisible !== 'function' || isTimelineSeriesVisible(grp.substanceName, 'cumul');
        const combAtRef = typeof grp.getTotalWithMetabolitesAt === 'function' ? grp.getTotalWithMetabolitesAt(refTimeMin) : effAtRef;
        const combPctVsHigh = grp.combinedPeakVal > 0
          ? Math.min(200, Math.max(0, Math.round((combAtRef / grp.peakVal) * 100)))
          : activeEffectPctVsHigh;
        const combPillHtml = `<label class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-900/95 hover:bg-slate-800 border border-slate-400/50 text-slate-200 text-[9px] font-mono cursor-pointer select-none transition ${combVisible ? '' : 'opacity-45'}">
            <input type="checkbox" ${combVisible ? 'checked' : ''} onchange="toggleTimelineSeriesVisibility('${safeGrpName}', 'cumul', this.checked)" class="w-3 h-3 rounded accent-slate-300 cursor-pointer">
            <span class="w-2.5 h-0 border-t-2 border-dashed border-slate-200 flex-shrink-0"></span>
            <span class="font-bold">Global</span>
            <span class="px-1 py-0.2 rounded bg-slate-800 text-white font-bold">${combPctVsHigh}%</span>
          </label>`;
        const metItemsHtml = grp.metaboliteSeries.map(ms => {
          const metVisible = typeof isTimelineSeriesVisible !== 'function' || isTimelineSeriesVisible(grp.substanceName, 'met:' + ms.name);
          const mEffAtRef = ms.getEffectAt(refTimeMin);
          const mPctVsHigh = grp.peakVal > 0
            ? Math.max(0, Math.round((mEffAtRef / grp.peakVal) * 100))
            : 0;
          const prefix = ms.isSubMetabolite ? '↳↳' : '↳';
          const levelLbl = ms.isSubMetabolite
            ? (currentLang === 'fr' ? 'sous-métabolite' : 'sub-metabolite')
            : (currentLang === 'fr' ? 'métabolite' : 'metabolite');
          const safeMetName = ms.name.replace(/'/g, "\\'");
          const enzTxt = ms.metModel.formationEnzyme ? `${ms.metModel.formationEnzyme} • ` : '';
          const hlTxt = `t½ ${ms.metModel.effectiveHalfLifeHours}h`;
          const dashStyle = ms.isSubMetabolite ? 'dotted' : 'dashed';
          return `<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-950/90 hover:bg-slate-800/80 border text-[9px] font-mono transition ${metVisible ? '' : 'opacity-45'}" style="border-color: ${ms.color}66;">
            <label class="inline-flex items-center gap-1 cursor-pointer select-none">
              <input type="checkbox" ${metVisible ? 'checked' : ''} onchange="toggleTimelineSeriesVisibility('${safeGrpName}', 'met:${safeMetName}', this.checked)" class="w-3 h-3 rounded cursor-pointer" style="accent-color: ${ms.color};">
              <span class="w-2.5 h-0 border-t-2 flex-shrink-0" style="border-color: ${ms.color}; border-top-style: ${dashStyle};"></span>
              <span class="font-bold" style="color: ${ms.color};">${prefix} ${ms.name}</span>
              <span class="px-1 py-0.2 rounded bg-slate-900 text-slate-200 font-bold">${mPctVsHigh}%</span>
              <span class="text-slate-400">(${enzTxt}${hlTxt})</span>
            </label>
            <button type="button" onclick="showSubstanceDetails('${safeMetName}')" class="ml-0.5 text-slate-400 hover:text-white cursor-pointer flex-shrink-0" title="${currentLang === 'fr' ? `Voir la fiche de ${ms.name} (${levelLbl})` : `View ${ms.name} (${levelLbl}) details`}">ⓘ</button>
          </span>`;
        }).join('');
        metaboliteCurvesLegendRow = `<div class="flex flex-wrap items-center gap-1 pt-1 border-t border-slate-800/60 mt-1">${combPillHtml}${metItemsHtml}</div>`;
      }

      if (pkMod.calibrationSource) {
        if (pkMod.calibrationSource.type === 'direct') {
          pkBadges.push(`<span class="px-1.5 py-0.5 rounded bg-indigo-950/90 border border-indigo-500/50 text-indigo-300 text-[9px] font-semibold">🎯 ${currentLang === 'fr' ? 'Étalonné' : 'Calibrated'} (${pkMod.calibrationSource.observedHours}h)</span>`);
        } else if (pkMod.calibrationSource.sharedEnzymes && pkMod.calibrationSource.sharedEnzymes.length > 0) {
          const enzNames = pkMod.calibrationSource.sharedEnzymes.map(e => e.enzyme).join('/');
          const refSub = pkMod.calibrationSource.sharedEnzymes[0].fromSubstance;
          pkBadges.push(`<span class="px-1.5 py-0.5 rounded bg-violet-950/90 border border-violet-500/50 text-violet-300 text-[9px] font-semibold">🧬 ${currentLang === 'fr' ? `Adapté via ${refSub}` : `Adapted via ${refSub}`} (${enzNames})</span>`);
        }
      }

      if (pkMod.conflicts && pkMod.conflicts.length > 0) {
        const compEnz = [...new Set(pkMod.conflicts.map(c => c.pathway))].join(', ');
        const stretchPct = Math.round(((pkMod.competitionStretchFactor || 1) - 1) * 100);
        const sign = stretchPct >= 0 ? `+${stretchPct}%` : `${stretchPct}%`;
        pkBadges.push(`<span class="px-1.5 py-0.5 rounded bg-amber-950/90 border border-amber-500/50 text-amber-300 text-[9px] font-semibold" title="${pkMod.conflicts.map(c => currentLang === 'fr' ? c.descFr : c.descEn).join(' • ')}">⚔️ ${currentLang === 'fr' ? 'Compétition' : 'Competition'} ${compEnz} (${sign})</span>`);
      }

      if (pkMod.pkProfile && pkMod.pkProfile.pathways && pkMod.pkProfile.pathways.RENAL_GFR >= 0.35 && pkMod.renalStatus && Math.abs(pkMod.renalStatus.egfr - 100) >= 8) {
        pkBadges.push(`<span class="px-1.5 py-0.5 rounded bg-cyan-950/90 border border-cyan-500/50 text-cyan-300 text-[9px] font-semibold">🫘 DFG ${pkMod.renalStatus.egfr} mL/min</span>`);
      }

      if (pkMod.pkProfile && !pkMod.verified) {
        pkBadges.push(`<span class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 text-[9px]">${currentLang === 'fr' ? 'Voie enzymatique non établie' : 'Enzymatic pathway unestablished'}</span>`);
      }

      const pkBadgesRow = pkBadges.length > 0
        ? `<div class="flex flex-wrap gap-1 pt-1 border-t border-slate-800/70 mt-1">${pkBadges.join('')}</div>`
        : '';

      const parentVisible = typeof isTimelineSeriesVisible !== 'function' || isTimelineSeriesVisible(grp.substanceName, 'parent');
      return `
        <div class="text-[10.5px] bg-slate-900/90 border border-slate-800/80 rounded-lg px-2.5 py-1.5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5 min-w-0 flex-wrap">
              <label class="inline-flex items-center gap-1.5 cursor-pointer select-none min-w-0 ${parentVisible ? '' : 'opacity-45'}" title="${currentLang === 'fr' ? `Afficher ou cacher la courbe de ${grp.substanceName}` : `Show or hide ${grp.substanceName} curve`}">
                <input type="checkbox" ${parentVisible ? 'checked' : ''} onchange="toggleTimelineSeriesVisibility('${safeGrpName}', 'parent', this.checked)" class="w-3 h-3 rounded cursor-pointer flex-shrink-0" style="accent-color: ${grp.color};">
                <span class="w-3 h-3 rounded-sm flex-shrink-0 shadow-sm border border-white/20" style="background-color: ${grp.color};"></span>
                <span class="font-bold text-white truncate">${grp.substanceName}</span>
              </label>
              <span class="font-mono font-semibold" style="color: ${grp.color};">${grp.totalDose} ${grp.unit}</span>
              <span class="px-1.5 py-0.5 rounded font-mono font-bold text-[10px] border bg-emerald-950/80 border-emerald-500/60 text-emerald-300" title="${currentLang === 'fr' ? "Pourcentage de l'effet actif actuel vis-à-vis du pic d'effet maximal (High)" : "Current active effect percentage relative to peak high"}">${activeEffectPctVsHigh}%</span>
              ${cumulTxt}
            </div>
            <div class="flex items-center gap-1.5 flex-shrink-0">
              <span class="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[9.5px] font-medium">${grp.tierLabel}</span>
              ${durComparisonHtml}
            </div>
          </div>
          ${metaboliteCurvesLegendRow}
          ${pkBadgesRow}
        </div>
      `;
    }).join('');
  }
}

let modalCurveZoom = 1.0;
let modalCurvePanMin = 0;
let modalCurveTotalMin = 120;
let lastModalCurveContext = null;

function ensureModalCurveInteraction(canvas) {
  if (!canvas || canvas.dataset.zoomBound === 'true') return;
  canvas.dataset.zoomBound = 'true';
  canvas.style.cursor = 'grab';
  let isModalPanning = false;
  let panStartX = 0;
  let panStartMin = 0;

  canvas.addEventListener('wheel', function (e) {
    if (!lastModalCurveContext) return;
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 360;
    const frac = Math.max(0, Math.min(1, (e.clientX - rect.left - 28) / Math.max(1, w - 56)));
    const oldSpan = modalCurveTotalMin / modalCurveZoom;
    const anchorMin = modalCurvePanMin + frac * oldSpan;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) && e.deltaX !== 0 ? e.deltaX : e.deltaY;
    if (e.shiftKey && Math.abs(e.deltaY) > 0) {
      modalCurvePanMin = Math.max(0, Math.min(modalCurveTotalMin - oldSpan, modalCurvePanMin + (e.deltaY > 0 ? 1 : -1) * oldSpan * 0.12));
    } else {
      const factor = delta < 0 ? 1.22 : 1 / 1.22;
      modalCurveZoom = Math.max(1.0, Math.min(10.0, Math.round(modalCurveZoom * factor * 100) / 100));
      const newSpan = modalCurveTotalMin / modalCurveZoom;
      modalCurvePanMin = Math.max(0, Math.min(Math.max(0, modalCurveTotalMin - newSpan), anchorMin - frac * newSpan));
    }
    drawModalTheoreticalCurve(lastModalCurveContext.substance, lastModalCurveContext.activeRoaName, true);
  }, { passive: false });

  canvas.addEventListener('mousedown', function (e) {
    if (!lastModalCurveContext || modalCurveZoom <= 1.02) return;
    isModalPanning = true;
    panStartX = e.clientX;
    panStartMin = modalCurvePanMin;
    canvas.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', function (e) {
    if (!isModalPanning || !lastModalCurveContext) return;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 360;
    const span = modalCurveTotalMin / modalCurveZoom;
    const dxMin = ((panStartX - e.clientX) / Math.max(1, w - 56)) * span;
    modalCurvePanMin = Math.max(0, Math.min(Math.max(0, modalCurveTotalMin - span), panStartMin + dxMin));
    drawModalTheoreticalCurve(lastModalCurveContext.substance, lastModalCurveContext.activeRoaName, true);
  });

  window.addEventListener('mouseup', function () {
    if (!isModalPanning) return;
    isModalPanning = false;
    canvas.style.cursor = modalCurveZoom > 1.02 ? 'grab' : 'zoom-in';
  });

  canvas.addEventListener('dblclick', function () {
    if (!lastModalCurveContext) return;
    modalCurveZoom = 1.0;
    modalCurvePanMin = 0;
    drawModalTheoreticalCurve(lastModalCurveContext.substance, lastModalCurveContext.activeRoaName, true);
  });
}

function toggleModalMetaboliteCurves(enabled) {
  showModalMetaboliteCurves = Boolean(enabled);
  const cb = document.getElementById('toggle-modal-metabolites');
  if (cb && cb.checked !== showModalMetaboliteCurves) {
    cb.checked = showModalMetaboliteCurves;
  }
  const lbl = document.getElementById('lbl-toggle-modal-metabolites');
  if (lbl && !lbl.classList.contains('hidden')) {
    lbl.className = showModalMetaboliteCurves
      ? 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-950/75 hover:bg-violet-900/80 border border-violet-500/45 text-[9.5px] font-semibold text-violet-200 cursor-pointer select-none transition whitespace-nowrap'
      : 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-[9.5px] font-semibold text-slate-400 cursor-pointer select-none transition whitespace-nowrap';
  }
  if (lastModalCurveContext && lastModalCurveContext.substance) {
    drawModalTheoreticalCurve(lastModalCurveContext.substance, lastModalCurveContext.activeRoaName, true);
  }
}

function drawModalTheoreticalCurve(substance, activeRoaName = null, preserveView = false) {
  const canvas = document.getElementById('modal-curve-canvas');
  if (!canvas) return;
  ensureModalCurveInteraction(canvas);

  if (!preserveView) {
    const sameTarget = lastModalCurveContext &&
      lastModalCurveContext.substance &&
      lastModalCurveContext.substance.name === substance.name &&
      lastModalCurveContext.activeRoaName === activeRoaName;
    if (!sameTarget) {
      modalCurveZoom = 1.0;
      modalCurvePanMin = 0;
    }
  }
  lastModalCurveContext = { substance, activeRoaName };
  canvas.style.cursor = modalCurveZoom > 1.02 ? 'grab' : 'zoom-in';

  const ctx = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const w = rect.width || 360;
  const h = rect.height || 192;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const isLightTheme = typeof appTheme !== 'undefined' && appTheme === 'light';
  if (isLightTheme) {
    ctx.fillStyle = '#f5efe2';
    ctx.fillRect(0, 0, w, h);
  }

  const validRoas = (substance.roas || []).filter(
    r => r.duration && r.duration.onset && r.duration.peak && r.duration.offset
  );

  if (validRoas.length === 0) {
    ctx.fillStyle = '#64748b';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentLang === 'fr' ? 'Courbe théorique non disponible' : 'Theoretical curve unavailable', w / 2, h / 2);
    return;
  }

  const roaModels = validRoas.map(r => {
    const parsed = parseRoaDurationMinutes(r);
    const rInfo = getRoaInfo(r.name);
    return {
      name: r.name,
      color: rInfo.color,
      label: rInfo.label,
      shortLabel: rInfo.shortLabel,
      ...parsed
    };
  });

  const primaryModel = roaModels.find(m => m.name === activeRoaName) || roaModels[0];
  const pk = (typeof getSubstancePKProfile === 'function') ? getSubstancePKProfile(substance.name) : null;
  const modalMetabolites = (
    (typeof showModalMetaboliteCurves !== 'undefined' && showModalMetaboliteCurves) &&
    pk &&
    Array.isArray(pk.activeMetabolites)
  )
    ? pk.activeMetabolites
    : [];

  const fallZeroTau = 0.86;
  const tZeroEnd = primaryModel.tApex + Math.max(primaryModel.tEnd - primaryModel.tApex, 0.1) * fallZeroTau;

  const totalGraphMin = Math.max(tZeroEnd * 1.18, primaryModel.tEnd * 1.12, 10);
  modalCurveTotalMin = totalGraphMin;
  const viewSpanMin = totalGraphMin / modalCurveZoom;
  const viewStartMin = Math.max(0, Math.min(Math.max(0, totalGraphMin - viewSpanMin), modalCurvePanMin));
  modalCurvePanMin = viewStartMin;

  function mToX(m) {
    return 28 + ((m - viewStartMin) / Math.max(1, viewSpanMin)) * (w - 56);
  }

  function formatTimeLabel(min) {
    if (min < 1) return Math.round(min * 60) + 's';
    if (min < 60) return Math.round(min) + 'm';
    const hrs = min / 60;
    return (hrs % 1 === 0 ? hrs.toFixed(0) : hrs.toFixed(1)) + 'h';
  }

  const topY = 52;
  const bottomY = h - 28;
  const curveHeight = bottomY - topY;

  function getSmoothEffect(t) {
    if (t <= primaryModel.onsetMin) return 0;
    if (t <= primaryModel.tApex) {
      const tau = (t - primaryModel.onsetMin) / Math.max(primaryModel.tApex - primaryModel.onsetMin, 0.1);
      return Math.sin(tau * Math.PI / 2) ** 2;
    }
    if (t <= tZeroEnd) {
      const tau = (t - primaryModel.tApex) / Math.max(tZeroEnd - primaryModel.tApex, 0.1);
      return Math.cos(tau * Math.PI / 2) ** 2;
    }
    return 0;
  }

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(12, bottomY);
  ctx.lineTo(w - 12, bottomY);
  ctx.stroke();

  ctx.save();
  ctx.beginPath();
  ctx.rect(20, 24, w - 40, bottomY - 24 + 3);
  ctx.clip();

  const samples = 160;

  modalMetabolites.forEach((m, mIdx) => {
    const mCol = (typeof getMetaboliteCoherentColor === 'function')
      ? getMetaboliteCoherentColor(substance.color || primaryModel.color, m, mIdx)
      : (m.color || '#38BDF8');
    const { r: mr, g: mg, b: mb } = hexToRgb(mCol);
    const lagMin = Math.max(20, (parseFloat(m.peakDelayHours) || 1.5) * 60);
    const hlMin = Math.max(30, (parseFloat(m.halfLifeHours) || 6) * 60);
    const convF = parseFloat(m.conversionFraction) || 0.25;
    const potR = parseFloat(m.potencyRelative) || 1.0;
    const stdPeakRatio = Math.max(0.02, Math.min(1.0, convF * potR));
    const stdTailW = Math.max(0.05, Math.min(0.45, parseFloat(m.tailWeight) || 0.15));
    const stdModel = {
      isSubMetabolite: Boolean(m.isSubMetabolite),
      stdLagMin: lagMin,
      lagMin,
      stdHalfLifeMin: hlMin,
      effectiveHalfLifeMin: hlMin,
      stdTailWeight: stdTailW,
      effectiveTailWeight: stdTailW,
      stdActivityPeakRatio: stdPeakRatio,
      effectiveActivityPeakRatio: stdPeakRatio,
      stdReboundWeight: 0
    };

    const mPts = [];
    let bestX = 0;
    let bestY = bottomY;
    let bestVal = 0;
    for (let i = 0; i <= samples; i++) {
      const tm = viewStartMin + (i / samples) * viewSpanMin;
      const x = mToX(tm);
      const mVal = evalSingleMetaboliteActivityAt(tm, primaryModel.onsetMin, stdModel, true);
      const y = bottomY - (mVal * curveHeight);
      mPts.push({ x, y });
      if (mVal > bestVal && x >= 32 && x <= w - 32) {
        bestVal = mVal;
        bestX = x;
        bestY = y;
      }
    }

    ctx.beginPath();
    ctx.moveTo(mPts[0].x, bottomY);
    mPts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(mPts[mPts.length - 1].x, bottomY);
    ctx.closePath();

    const mGrad = ctx.createLinearGradient(0, bestY, 0, bottomY);
    mGrad.addColorStop(0, `rgba(${mr}, ${mg}, ${mb}, 0.22)`);
    mGrad.addColorStop(1, `rgba(${mr}, ${mg}, ${mb}, 0.0)`);
    ctx.fillStyle = mGrad;
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.setLineDash(m.isSubMetabolite ? [3, 3] : [6, 3]);
    mPts.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.strokeStyle = mCol;
    ctx.lineWidth = m.isSubMetabolite ? 1.8 : 2.0;
    ctx.stroke();
    ctx.restore();

    if (bestVal > 0.02) {
      ctx.fillStyle = mCol;
      ctx.beginPath();
      ctx.arc(bestX, bestY, 3, 0, Math.PI * 2);
      ctx.fill();

      const lbl = `${m.isSubMetabolite ? '↳↳ ' : '↳ '}${m.name}`;
      ctx.font = 'bold 8px sans-serif';
      const tw = ctx.measureText(lbl).width + 8;
      const lx = Math.max(tw / 2 + 24, Math.min(w - tw / 2 - 24, bestX));
      const ly = Math.max(30, bestY - 10 - (mIdx % 2) * 12);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
      ctx.fillRect(lx - tw / 2, ly - 6, tw, 12);
      ctx.strokeStyle = mCol;
      ctx.lineWidth = 0.8;
      ctx.strokeRect(lx - tw / 2, ly - 6, tw, 12);
      ctx.fillStyle = '#f8fafc';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(lbl, lx, ly);
    }
  });
  const primaryPts = [];
  for (let i = 0; i <= samples; i++) {
    const tm = viewStartMin + (i / samples) * viewSpanMin;
    const x = mToX(tm);
    const effect = getSmoothEffect(tm);
    const y = bottomY - (effect * curveHeight);
    primaryPts.push({ x, y });
  }

  const { r: cr, g: cg, b: cb } = hexToRgb(primaryModel.color);

  ctx.beginPath();
  ctx.moveTo(primaryPts[0].x, bottomY);
  primaryPts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(primaryPts[primaryPts.length - 1].x, bottomY);
  ctx.closePath();

  const grad = ctx.createLinearGradient(0, topY, 0, bottomY);
  grad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0.50)`);
  grad.addColorStop(0.7, `rgba(${cr}, ${cg}, ${cb}, 0.15)`);
  grad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0.0)`);
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  primaryPts.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.strokeStyle = primaryModel.color;
  ctx.lineWidth = 2.8;
  ctx.stroke();

  ctx.restore();

  const keyPoints = [
    { m: 0,                     label: 'T=0',                                        col: '#94a3b8',          y: bottomY },
    { m: primaryModel.onsetMin, label: currentLang === 'fr' ? 'Début' : 'Onset',     col: primaryModel.color, y: bottomY },
    { m: primaryModel.tApex,    label: currentLang === 'fr' ? 'Plateau' : 'Peak',    col: primaryModel.color, y: topY },
    { m: tZeroEnd,              label: currentLang === 'fr' ? 'Fin (5%)' : 'End (5%)', col: '#94a3b8',        y: bottomY }
  ];

  keyPoints.forEach((pt, i) => {
    const x = mToX(pt.m);
    if (x < 16 || x > w - 16) return;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(x, 26);
    ctx.lineTo(x, bottomY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = pt.col;
    ctx.beginPath();
    ctx.arc(x, pt.y, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(formatTimeLabel(pt.m), x, h - 12);

    ctx.textBaseline = 'middle';
    if (i === 2) {
      ctx.font = 'bold 9.5px sans-serif';
      const txtWidth = ctx.measureText(pt.label).width;
      ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, 0.22)`;
      const pillW = txtWidth + 16;
      const pillH = 18;
      const pillX = Math.max(pillW / 2 + 4, Math.min(w - pillW / 2 - 4, x));
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(pillX - pillW / 2, 18 - pillH / 2, pillW, pillH, 9);
      } else {
        ctx.rect(pillX - pillW / 2, 18 - pillH / 2, pillW, pillH);
      }
      ctx.fill();
      ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, 0.65)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.fillText(pt.label, pillX, 18);
    } else {
      ctx.fillStyle = pt.col;
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText(pt.label, x, 18);
    }
  });

  if (modalCurveZoom > 1.02) {
    const zTxt = `${modalCurveZoom.toFixed(1)}x`;
    ctx.font = 'bold 9px monospace';
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    const zw = ctx.measureText(zTxt).width + 10;
    ctx.fillRect(w - zw - 8, topY - 18, zw, 14);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
    ctx.lineWidth = 0.8;
    ctx.strokeRect(w - zw - 8, topY - 18, zw, 14);
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(zTxt, w - zw / 2 - 8, topY - 11);
  }
}
