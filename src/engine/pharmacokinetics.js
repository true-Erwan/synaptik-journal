const DURATION_TO_MIN = {
  seconds: 1 / 60,
  minutes: 1,
  hours:   60,
  days:    1440
};

function rangeToAvgMinutes(rangeObj, fallbackMin = 0) {
  if (!rangeObj || (rangeObj.min === undefined && rangeObj.max === undefined)) {
    return fallbackMin;
  }
  const minVal = rangeObj.min !== undefined ? rangeObj.min : rangeObj.max;
  const maxVal = rangeObj.max !== undefined ? rangeObj.max : rangeObj.min;
  const mult = DURATION_TO_MIN[rangeObj.units] || 1;
  return ((minVal + maxVal) / 2) * mult;
}

function parseRoaDurationMinutes(roa) {
  const dur = (roa && roa.duration) ? roa.duration : null;
  const onsetMin = dur && dur.onset ? rangeToAvgMinutes(dur.onset, 30) : 30;
  const comeupMin = dur && dur.comeup
    ? rangeToAvgMinutes(dur.comeup, Math.max(15, onsetMin * 0.7))
    : Math.max(15, onsetMin * 0.7);
  const peakMin = dur && dur.peak ? rangeToAvgMinutes(dur.peak, 90) : 90;
  const offsetMin = dur && dur.offset ? rangeToAvgMinutes(dur.offset, 150) : 150;

  const riseMin = comeupMin + peakMin * 0.42;
  const fallMin = offsetMin + peakMin * 0.58;
  const tApex = onsetMin + comeupMin + (peakMin / 2);
  const tEnd = onsetMin + comeupMin + peakMin + offsetMin;

  return {
    onsetMin,
    comeupMin,
    peakMin,
    offsetMin,
    riseMin,
    fallMin,
    tApex,
    tEnd
  };
}

function getSubstancePotency(s, catKey) {
  if (s && s.classPotencies && catKey && catKey !== 'ALL' && s.classPotencies[catKey] !== undefined) {
    return s.classPotencies[catKey];
  }
  return (s && s.relativePotency !== undefined) ? s.relativePotency : 1.0;
}

function formatPotencyIndex(val) {
  if (val === undefined || val === null) return '1x';
  return Number.isInteger(val) ? `${val}x` : `${Number(val.toFixed(2))}x`;
}

function getSubstancePowerFactor(sub) {
  if (!sub) return 0.85;
  const nLow = (sub.name || '').toLowerCase();
  if (MILD_PERIPHERAL_POWER[nLow] !== undefined) {
    return MILD_PERIPHERAL_POWER[nLow];
  }
  const cats = (sub.categories || []).map(c => c.toLowerCase());
  if (cats.includes('nsaid') || cats.includes('corticosteroid') || cats.includes('antispasmodic')) return 0.22;
  if (cats.includes('triptan') || cats.includes('nootropic')) return 0.32;
  if (cats.includes('antidepressant') && !cats.includes('opioid') && !cats.includes('stimulant')) return 0.28;

  const pot = Math.max(0.05, sub.relativePotency !== undefined ? sub.relativePotency : 1.0);
  return Math.max(0.65, Math.min(1.35, 1.05 + 0.12 * Math.log10(pot)));
}

function computeTierResponse(doseVal, doseObj, fallbackHeavy) {
  if (!doseVal || doseVal <= 0) return 0.5;
  const light = doseObj.lightMin || (doseObj.commonMin ? doseObj.commonMin * 0.5 : fallbackHeavy * 0.15);
  const thr = doseObj.threshold || (light * 0.5);
  const common = doseObj.commonMin || (light * 2.0);
  const strong = doseObj.strongMin || (common * 1.8);
  const heavy = doseObj.heavyMin || fallbackHeavy;

  if (doseVal <= thr)    return 0.42 * (doseVal / Math.max(0.001, thr));
  if (doseVal <= light)  return 0.42 + 0.14 * ((doseVal - thr) / Math.max(0.001, light - thr));
  if (doseVal <= common) return 0.56 + 0.18 * ((doseVal - light) / Math.max(0.001, common - light));
  if (doseVal <= strong) return 0.74 + 0.14 * ((doseVal - common) / Math.max(0.001, strong - common));
  if (doseVal <= heavy)  return 0.88 + 0.12 * ((doseVal - strong) / Math.max(0.001, heavy - strong));
  return Math.min(1.35, 1.00 + 0.25 * ((doseVal - heavy) / Math.max(0.001, heavy)));
}

function getMetaboliteCutoffHalfLives(peakRatio) {
  const r = Number(peakRatio);
  if (!isFinite(r) || r < 0.05) return 0.9;
  return Math.max(0.85, Math.min(3.8, Math.log2(Math.max(0.06, r) / 0.05)));
}

function evalSingleMetaboliteEnvelope(dtFromOnsetMin, metModel, useStd = false) {
  if (!metModel || dtFromOnsetMin <= 0) return 0;

  const lagMin = Math.max(15, useStd ? (metModel.stdLagMin || metModel.lagMin || 90) : (metModel.lagMin || 90));
  const halfLifeMin = Math.max(
    30,
    useStd
      ? (metModel.stdHalfLifeMin || metModel.effectiveHalfLifeMin || 360)
      : (metModel.effectiveHalfLifeMin || 360)
  );

  if (dtFromOnsetMin <= lagMin) {
    const tau = dtFromOnsetMin / lagMin;
    const s = Math.sin(tau * Math.PI / 2);
    return metModel.isSubMetabolite ? (s * s * s) : (s * s);
  }

  const u = (dtFromOnsetMin - lagMin) / halfLifeMin;
  const peakRatio = useStd
    ? (metModel.stdActivityPeakRatio !== undefined ? metModel.stdActivityPeakRatio : 0.35)
    : (metModel.effectiveActivityPeakRatio !== undefined ? metModel.effectiveActivityPeakRatio : 0.35);
  const maxHalfLives = getMetaboliteCutoffHalfLives(peakRatio);
  if (u >= maxHalfLives) return 0;

  const kappa = 0.22;
  const smoothHalfLifeExp = (u * u) / (u + kappa);
  let val = Math.pow(2, -smoothHalfLifeExp);

  const uFadeStart = maxHalfLives * 0.45;
  if (u > uFadeStart) {
    const tauEnd = (u - uFadeStart) / (maxHalfLives - uFadeStart);
    val *= Math.cos(tauEnd * Math.PI / 2) ** 2;
  }

  return Math.max(0, Math.min(1, val));
}

function evalSingleMetaboliteActivityAt(dtWave, wOnset, metModel, useStd = false) {
  if (!metModel || dtWave <= wOnset) return 0;
  const dtFromOnset = dtWave - wOnset;
  const phi = evalSingleMetaboliteEnvelope(dtFromOnset, metModel, useStd);
  const wTail = useStd
    ? (metModel.stdTailWeight !== undefined ? metModel.stdTailWeight : metModel.effectiveTailWeight)
    : (metModel.effectiveTailWeight !== undefined ? metModel.effectiveTailWeight : 0.15);
  const boostFactor = metModel.isSubMetabolite ? 1.35 : 1.45;
  const targetPeak = useStd
    ? (metModel.stdActivityPeakRatio !== undefined ? metModel.stdActivityPeakRatio : (wTail * boostFactor))
    : (metModel.effectiveActivityPeakRatio !== undefined ? metModel.effectiveActivityPeakRatio : (wTail * boostFactor));
  return Math.min(1.25, Math.max(0, targetPeak * phi));
}

function evalMetaboliteTailAt(dtWave, wOnset, metaboliteTailModels, useStd = false) {
  if (!metaboliteTailModels || metaboliteTailModels.length === 0 || dtWave <= wOnset) {
    return { tailVal: 0, reboundVal: 0, totalVal: 0 };
  }

  const dtFromOnset = dtWave - wOnset;
  let tailSum = 0;
  let reboundSum = 0;

  for (let i = 0; i < metaboliteTailModels.length; i++) {
    const m = metaboliteTailModels[i];
    const phi = evalSingleMetaboliteEnvelope(dtFromOnset, m, useStd);
    const wTail = useStd
      ? (m.stdTailWeight !== undefined ? m.stdTailWeight : m.effectiveTailWeight)
      : (m.effectiveTailWeight !== undefined ? m.effectiveTailWeight : 0.15);
    tailSum += wTail * phi;

    const wReb = useStd ? (m.stdReboundWeight || 0) : (m.reboundBumpWeight || 0);
    if (wReb > 0) {
      const lag = Math.max(15, useStd ? (m.stdLagMin || m.lagMin || 90) : (m.lagMin || 90));
      const rebHalfWidth = Math.max(40, lag * 0.65);
      const dist = Math.abs(dtFromOnset - lag);
      if (dist < rebHalfWidth) {
        const tauReb = dist / rebHalfWidth;
        reboundSum += wReb * (Math.cos(tauReb * Math.PI / 2) ** 2);
      }
    }
  }

  const tailVal = Math.min(0.62, tailSum);
  const reboundVal = Math.min(0.32, reboundSum);
  return {
    tailVal,
    reboundVal,
    totalVal: Math.min(0.72, tailVal + reboundVal)
  };
}

function evalSmoothWave(dtWave, wv, baseOnsetMin, baseRiseMin, baseFallMin, pkMod) {
  const wOnset = baseOnsetMin * (wv.onsetScale || 1.0);
  if (dtWave <= wOnset) return 0;

  const wRise = Math.max(10, baseRiseMin * (wv.riseScale || wv.stretch || 1.0));
  const wPlat = Math.max(0, wv.plateauMin !== undefined ? wv.plateauMin : (wv.extraPeakMin || 0));
  const wFall = Math.max(15, baseFallMin * (wv.fallScale || wv.stretch || 1.0));

  const tClimbEnd = wOnset + wRise;
  const tPlatEnd = tClimbEnd + wPlat;
  const tWaveEnd = tPlatEnd + wFall;

  let acuteVal = 0;
  let postPeakTransitionGate = 0;

  if (dtWave <= tClimbEnd) {
    const tau = (dtWave - wOnset) / wRise;
    acuteVal = Math.sin(tau * Math.PI / 2) ** 2;
    postPeakTransitionGate = 0;
  } else if (wPlat > 0 && dtWave <= tPlatEnd) {
    acuteVal = 1.0;
    postPeakTransitionGate = 0;
  } else if (dtWave <= tWaveEnd) {
    const tau = (dtWave - tPlatEnd) / wFall;
    const tauCut = 0.86;
    if (tau >= tauCut) {
      acuteVal = 0;
      postPeakTransitionGate = 1.0;
    } else {
      acuteVal = Math.cos((tau / tauCut) * Math.PI / 2) ** 2;
      postPeakTransitionGate = 1.0 - acuteVal;
    }
  } else {
    acuteVal = 0;
    postPeakTransitionGate = 1.0;
  }

  const tailModels = (pkMod && pkMod.metaboliteTailModels)
    || (wv && wv.metaboliteTailModels)
    || null;

  if (!tailModels || tailModels.length === 0 || postPeakTransitionGate <= 0) {
    return acuteVal;
  }

  const useStdTail = Boolean(
    (pkMod && pkMod.useStdMetaboliteTail) || (wv && wv.useStdMetaboliteTail)
  );
  const { totalVal: metTotalVal } = evalMetaboliteTailAt(dtWave, wOnset, tailModels, useStdTail);
  if (metTotalVal <= 0) {
    return acuteVal;
  }

  const combinedVal = acuteVal + postPeakTransitionGate * metTotalVal;
  if (dtWave > tPlatEnd) {
    if (combinedVal <= 0.05) return 0;
    if (combinedVal < 0.09) {
      const fadeT = (combinedVal - 0.05) / 0.04;
      return combinedVal * fadeT * fadeT * (3 - 2 * fadeT);
    }
  }
  return combinedVal;
}

function buildSingleIntakeCombinedProfile(waves, baseOnsetMin, baseRiseMin, baseFallMin, pkMod) {
  const waveList = (waves && waves.length > 0)
    ? waves
    : [{ delayMin: 0, weight: 1.0, onsetScale: 1.0, riseScale: 1.0, plateauMin: 0, fallScale: 1.0 }];

  let maxAcuteRel = 0;
  waveList.forEach(wv => {
    const wOn = baseOnsetMin * (wv.onsetScale || 1.0);
    const wRi = Math.max(10, baseRiseMin * (wv.riseScale || wv.stretch || 1.0));
    const wPl = Math.max(0, wv.plateauMin !== undefined ? wv.plateauMin : (wv.extraPeakMin || 0)) * ((pkMod && pkMod.fallScale) || 1.0);
    const wFa = Math.max(15, baseFallMin * (wv.fallScale || wv.stretch || 1.0));
    const wEnd = (wv.delayMin || 0) + wOn + wRi + wPl + wFa * 0.86;
    if (wEnd > maxAcuteRel) maxAcuteRel = wEnd;
  });

  const tailEndMin = (pkMod && pkMod.hasActiveMetaboliteTail && pkMod.metaboliteTailEndMin)
    ? pkMod.metaboliteTailEndMin
    : maxAcuteRel;
  const maxEvalMin = Math.max(maxAcuteRel + 30, Math.min(tailEndMin + 60, 24000));
  const stepMin = maxEvalMin > 4800 ? 15 : 5;
  const n = Math.max(20, Math.ceil(maxEvalMin / stepMin));

  const acuteSamples = new Float64Array(n + 1);
  const rawCombinedSamples = new Float64Array(n + 1);
  let parentPeak = 0;
  let combinedPeak = 0;
  let combinedPeakIdx = 0;

  for (let idx = 0; idx <= n; idx++) {
    const dt = idx * stepMin;
    let aSum = 0;
    let cSum = 0;
    for (let wIdx = 0; wIdx < waveList.length; wIdx++) {
      const wv = waveList[wIdx];
      const dtW = dt - (wv.delayMin || 0);
      if (dtW > 0) {
        const adjWv = (wv.plateauMin || wv.extraPeakMin)
          ? { ...wv, plateauMin: (wv.plateauMin !== undefined ? wv.plateauMin : wv.extraPeakMin) * ((pkMod && pkMod.fallScale) || 1.0) }
          : wv;
        const wWeight = wv.weight || 1.0;
        aSum += wWeight * evalSmoothWave(dtW, adjWv, baseOnsetMin, baseRiseMin, baseFallMin, null);
        cSum += wWeight * evalSmoothWave(dtW, adjWv, baseOnsetMin, baseRiseMin, baseFallMin, pkMod);
      }
    }
    acuteSamples[idx] = aSum;
    rawCombinedSamples[idx] = cSum;
    if (aSum > parentPeak) parentPeak = aSum;
    if (cSum > combinedPeak) {
      combinedPeak = cSum;
      combinedPeakIdx = idx;
    }
  }

  for (let idx = n - 1; idx > combinedPeakIdx; idx--) {
    if (rawCombinedSamples[idx] < rawCombinedSamples[idx + 1]) {
      rawCombinedSamples[idx] = rawCombinedSamples[idx + 1];
    }
  }

  const normScale = (combinedPeak > 0 && parentPeak > 0) ? (parentPeak / combinedPeak) : 1.0;
  if (normScale !== 1.0) {
    for (let idx = 0; idx <= n; idx++) {
      rawCombinedSamples[idx] *= normScale;
    }
  }

  return function evalCombinedAt(dt) {
    if (dt <= 0 || dt >= maxEvalMin) return 0;
    const fIdx = dt / stepMin;
    const lo = Math.floor(fIdx);
    const hi = Math.min(n, lo + 1);
    const frac = fIdx - lo;
    return rawCombinedSamples[lo] * (1 - frac) + rawCombinedSamples[hi] * frac;
  };
}

function evalBiphasicSubstanceEffectAt(ing, dtMinFromIntake, allIngestions, useStd = false) {
  if (!ing || dtMinFromIntake <= 0) return 0;
  const s = SUBSTANCES_BY_NAME[ing.substanceName];
  if (!s) return 0;

  const roa = s.roas
    ? (s.roas.find(r => r.name === (ing.route || 'oral') && r.duration) || s.roas.find(r => r.duration) || s.roas[0])
    : null;
  const { onsetMin: stdOnsetMin, riseMin: stdRiseMin, fallMin: stdFallMin } = parseRoaDurationMinutes(roa);
  const pkMod = (typeof getPersonalizedPKModifier === 'function')
    ? getPersonalizedPKModifier(ing, allIngestions || (typeof ingestions !== 'undefined' ? ingestions : null))
    : null;

  const baseOnsetMin = useStd ? stdOnsetMin : stdOnsetMin * ((pkMod && pkMod.onsetScale) || 1.0);
  const baseRiseMin = useStd ? stdRiseMin : stdRiseMin * ((pkMod && pkMod.riseScale) || 1.0);
  const baseFallMin = useStd ? stdFallMin : stdFallMin * ((pkMod && pkMod.fallScale) || 1.0);

  const waves = (ing.waves && ing.waves.length > 0)
    ? ing.waves
    : [{ delayMin: 0, weight: 1.0, onsetScale: 1.0, riseScale: 1.0, plateauMin: 0, fallScale: 1.0 }];

  const tailContext = pkMod
    ? { metaboliteTailModels: pkMod.metaboliteTailModels, useStdMetaboliteTail: useStd, fallScale: useStd ? 1.0 : (pkMod.fallScale || 1.0), hasActiveMetaboliteTail: pkMod.hasActiveMetaboliteTail, metaboliteTailEndMin: pkMod.metaboliteTailEndMin }
    : null;

  if (tailContext && tailContext.metaboliteTailModels && tailContext.metaboliteTailModels.length > 0) {
    const evalMono = buildSingleIntakeCombinedProfile(waves, baseOnsetMin, baseRiseMin, baseFallMin, tailContext);
    return evalMono(dtMinFromIntake);
  }

  let sum = 0;
  for (let i = 0; i < waves.length; i++) {
    const wv = waves[i];
    const dtW = dtMinFromIntake - (wv.delayMin || 0);
    if (dtW > 0) {
      const adjWv = (!useStd && (wv.plateauMin || wv.extraPeakMin) && pkMod)
        ? { ...wv, plateauMin: (wv.plateauMin !== undefined ? wv.plateauMin : wv.extraPeakMin) * (pkMod.fallScale || 1.0) }
        : wv;
      sum += (wv.weight || 1.0) * evalSmoothWave(dtW, adjWv, baseOnsetMin, baseRiseMin, baseFallMin, null);
    }
  }
  return sum;
}

function getRemainingBodyPercentage(ing) {
  if (!ing) return 0;
  const s = SUBSTANCES_BY_NAME[ing.substanceName];
  let roa = null;
  if (s && s.roas) {
    roa = s.roas.find(r => r.name === (ing.route || 'oral') && r.duration)
      || s.roas.find(r => r.duration)
      || s.roas[0];
  }

  const { onsetMin: rawOnsetMin, riseMin: rawRiseMin, fallMin: rawFallMin } = parseRoaDurationMinutes(roa);
  const pkMod = (typeof getPersonalizedPKModifier === 'function')
    ? getPersonalizedPKModifier(ing, typeof ingestions !== 'undefined' ? ingestions : null)
    : { onsetScale: 1.0, riseScale: 1.0, fallScale: 1.0, metaboliteTailModels: [] };

  const baseOnsetMin = rawOnsetMin * (pkMod.onsetScale || 1.0);
  const baseRiseMin = rawRiseMin * (pkMod.riseScale || 1.0);
  const baseFallMin = rawFallMin * (pkMod.fallScale || 1.0);
  const tailModels = pkMod.metaboliteTailModels || [];

  const waves = (ing.waves && ing.waves.length > 0)
    ? ing.waves
    : [{ delayMin: 0, weight: 1.0, onsetScale: 1.0, riseScale: 1.0, plateauMin: 0, fallScale: 1.0 }];

  const totalWaveWeight = waves.reduce((acc, wv) => acc + (wv.weight || 1.0), 0) || 1.0;
  const intakesList = (ing.intakes && ing.intakes.length > 0)
    ? ing.intakes
    : [{ dose: ing.dose || 1, timeOffsetMinutes: ing.timeOffsetMinutes || 0, timestamp: ing.timestamp }];

  const totalDose = intakesList.reduce((acc, it) => acc + (it.dose || 0), 0) || 1;
  const nowMs = getNowTime();
  let remainingWeightedSum = 0;

  intakesList.forEach(subIt => {
    const dSub = subIt.dose || 1;
    const currentOffsetMin = subIt.timestamp
      ? Math.round((subIt.timestamp - nowMs) / 60000)
      : (subIt.timeOffsetMinutes || 0);
    const dt = -currentOffsetMin;

    if (dt < 0) {

      remainingWeightedSum += dSub * 1.0;
      return;
    }

    let subRem = 0;
    waves.forEach(wv => {
      const wFrac = (wv.weight || 1.0) / totalWaveWeight;
      const wDelay = wv.delayMin || 0;
      const dtWave = dt - wDelay;
      const wOnset = baseOnsetMin * (wv.onsetScale || 1.0);
      const wRise = Math.max(10, baseRiseMin * (wv.riseScale || wv.stretch || 1.0));
      const wPlat = Math.max(0, wv.plateauMin !== undefined ? wv.plateauMin : (wv.extraPeakMin || 0));
      const wFall = Math.max(15, baseFallMin * (wv.fallScale || wv.stretch || 1.0));

      const tStartClearance = wDelay + wOnset * 0.4;
      const tEndClearance = wDelay + wOnset + wRise + wPlat + wFall;

      let acuteRem = 0;
      if (dt <= tStartClearance) {
        acuteRem = 1.0;
      } else if (dt < tEndClearance) {
        const tau = (dt - tStartClearance) / Math.max(1, tEndClearance - tStartClearance);
        acuteRem = Math.pow(1 - Math.pow(tau, 1.35), 0.75) * Math.pow(Math.cos(tau * Math.PI / 2), 0.65);
        acuteRem = Math.max(0, Math.min(1, acuteRem));
      }

      let tailRem = 0;
      if (tailModels.length > 0 && dtWave > wOnset) {
        const { totalVal } = evalMetaboliteTailAt(dtWave, wOnset, tailModels, false);
        tailRem = Math.max(0, Math.min(0.65, totalVal));
      }

      const combinedWaveRem = acuteRem + (1.0 - acuteRem) * tailRem;
      subRem += wFrac * Math.max(0, Math.min(1, combinedWaveRem));
    });

    remainingWeightedSum += dSub * subRem;
  });

  return Math.max(0, Math.min(100, Math.round((remainingWeightedSum / totalDose) * 100)));
}

function isNonDivertible(s) {
  if (!s) return false;
  if (NON_DIVERTIBLE_DOSES[s.name]) return true;
  const cats = (s.categories || []).map(c => c.toLowerCase());
  return (
    cats.includes('nsaid') ||
    cats.includes('corticosteroid') ||
    cats.includes('beta-blocker') ||
    cats.includes('antispasmodic')
  );
}

function getDoseTierInfo(substanceName, routeName, dose, lang) {
  const s = SUBSTANCES_BY_NAME[substanceName];
  if (!s) return { label: '', badgeCls: 'bg-slate-800 text-slate-400 border-slate-700' };

  const nd = NON_DIVERTIBLE_DOSES[substanceName];
  if (nd) {
    const ndRoute = nd[routeName] || nd['oral'] || Object.values(nd)[0];
    if (ndRoute) {
      if (ndRoute.low && dose <= ndRoute.low * 1.05 && dose < ndRoute.standard * 0.8) {
        return {
          label: lang === 'fr' ? 'Dose faible' : 'Low dose',
          badgeCls: 'bg-emerald-950/80 border-emerald-700/80 text-emerald-300'
        };
      }
      if (dose <= ndRoute.standard * 1.05 && (!ndRoute.max || ndRoute.max === ndRoute.standard || dose < ndRoute.max * 0.95)) {
        return {
          label: lang === 'fr' ? 'Dose standard' : 'Standard dose',
          badgeCls: 'bg-blue-950/80 border-blue-700/80 text-blue-300'
        };
      }
      if (ndRoute.max && dose <= ndRoute.max * 1.05) {
        return {
          label: lang === 'fr' ? 'Dose max / prise' : 'Max dose/intake',
          badgeCls: 'bg-amber-950/80 border-amber-700/80 text-amber-300'
        };
      }
      return {
        label: lang === 'fr' ? 'Dépassement max' : 'Exceeds max',
        badgeCls: 'bg-rose-950/80 border-rose-700/80 text-rose-300'
      };
    }
  }

  const roas = s.roas || [];
  const roa = roas.find(r => r.name.toLowerCase() === (routeName || 'oral').toLowerCase()) || roas[0];
  const d = roa ? (roa.dose || {}) : {};

  const th = d.threshold;
  const lt = d.lightMin;
  const cm = d.commonMin;
  const st = d.strongMin;
  const hv = d.heavyMin;

  if (th !== undefined && dose < (lt || cm * 0.5)) {
    return {
      label: lang === 'fr' ? 'Seuil' : 'Threshold',
      badgeCls: 'bg-slate-800/80 border-slate-700 text-slate-300'
    };
  }
  if (lt !== undefined && dose < (cm || st * 0.6)) {
    return {
      label: lang === 'fr' ? 'Léger' : 'Light',
      badgeCls: 'bg-emerald-950/80 border-emerald-700/80 text-emerald-300'
    };
  }
  if (cm !== undefined && dose < (st || (hv ? hv * 0.75 : cm * 1.5))) {
    return {
      label: lang === 'fr' ? 'Commun' : 'Common',
      badgeCls: 'bg-blue-950/80 border-blue-700/80 text-blue-300'
    };
  }
  if (st !== undefined && dose < (hv || st * 1.4)) {
    return {
      label: lang === 'fr' ? 'Fort' : 'Strong',
      badgeCls: 'bg-amber-950/80 border-amber-700/80 text-amber-300'
    };
  }
  if (hv !== undefined || st !== undefined) {
    return {
      label: lang === 'fr' ? 'Très fort' : 'Heavy',
      badgeCls: 'bg-rose-950/80 border-rose-700/80 text-rose-300'
    };
  }

  return {
    label: lang === 'fr' ? 'Dose usuelle' : 'Usual dose',
    badgeCls: 'bg-indigo-950/80 border-indigo-700/80 text-indigo-300'
  };
}

function getAddictionForRoa(sub, rObj) {
  if (!sub) return 0;
  const isOffScale = sub.name === 'MDPV';
  const maxScore = isOffScale ? 11 : 10;
  const base = Math.max(0, Math.min(maxScore, sub.addictionScore !== undefined ? sub.addictionScore : 0));
  if (base === 0) return 0;
  if (rObj && rObj.addictionScore !== undefined) {
    return Math.max(0, Math.min(maxScore, rObj.addictionScore));
  }
  return base;
}

function getGaugeColor(sc) {
  if (sc >= 11) return { hex: '#ff0055', bg: 'bg-rose-500/30', text: 'text-rose-400 font-extrabold shadow-[0_0_12px_rgba(255,0,85,0.6)] animate-pulse', border: 'border-rose-500' };
  if (sc >= 8)  return { hex: '#ef4444', bg: 'bg-red-500/20',     text: 'text-red-400',     border: 'border-red-500/40' };
  if (sc >= 6)  return { hex: '#f97316', bg: 'bg-orange-500/20',  text: 'text-orange-400',  border: 'border-orange-500/40' };
  if (sc >= 3)  return { hex: '#eab308', bg: 'bg-amber-500/20',   text: 'text-amber-300',   border: 'border-amber-500/40' };
  return               { hex: '#10b981', bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/40' };
}

function getCravingDesc(sc, lang, rName) {
  const rInfo = getRoaInfo(rName || 'oral');
  const routeLbl = rInfo.shortLabel.toLowerCase();

  if (lang === 'fr') {
    if (sc >= 11) return "🚨 11/10 — HORS-ÉCHELLE : Compulsion absolue et craving incontrôlable (MDPV). Rush dopaminergique extrême, perte de contrôle immédiate, risque maximal de psychose paranoïde aiguë et tachycardie sévère.";
    if (sc === 0) return "Aucun craving psychologique ni potentiel d'abus";
    if (sc <= 2)  return `Craving très faible par voie ${routeLbl} (usage compulsif exceptionnel)`;
    if (sc <= 4)  return `Craving léger à modéré par voie ${routeLbl}`;
    if (sc <= 6)  return `Craving modéré à marqué par voie ${routeLbl} (risque d'installation d'une habitude)`;
    if (sc === 7) return `Craving élevé par voie ${routeLbl} (renforcement psychologique net, cinétique plus progressive)`;
    if (sc === 8) return `Craving très élevé par voie ${routeLbl} (forte euphorie et compulsion de reconsommation)`;
    if (sc === 9) return `Craving sévère par voie ${routeLbl} (montée rapide / rush marqué, très forte compulsion de redosage)`;
    return "🚨 Compulsion absolue et craving incontrôlable (10/10 - MDPV / Pyrovalérones) : rush dopaminergique massif, redosing compulsif immédiat, risque extrême de psychose paranoïde aiguë et tachycardie sévère.";
  }

  if (sc >= 11) return "🚨 11/10 — OFF-SCALE: Absolute compulsion and uncontrollable craving (MDPV). Extreme dopaminergic rush, immediate loss of control, maximal risk of acute paranoid psychosis and severe tachycardia.";
  if (sc === 0) return "No psychological craving or abuse potential";
  if (sc <= 2)  return `Very low to negligible craving via ${routeLbl} route`;
  if (sc <= 4)  return `Mild to moderate psychological craving via ${routeLbl} route`;
  if (sc <= 6)  return `Moderate to marked craving via ${routeLbl} route`;
  if (sc === 7) return `High craving via ${routeLbl} route (clear psychological reinforcement)`;
  if (sc === 8) return `Very high craving via ${routeLbl} route (strong euphoria and compulsion to redose)`;
  if (sc === 9) return `Severe craving via ${routeLbl} route (fast onset / rush and intense compulsion)`;
  return "🚨 Absolute compulsion and uncontrollable craving (10/10 - MDPV / Pyrovalerones): massive dopaminergic rush, immediate compulsive redosing, extreme risk of acute paranoid psychosis and severe tachycardia.";
}

const OPIOID_NAMES_SET = new Set([
  'Heroin', 'Morphine', 'Fentanyl', 'Methadone', 'Oxycodone',
  'Buprenorphine', 'Codeine', 'Tramadol', 'Kratom', 'Opium'
]);

function getPhysDesc(sub, sc, lang) {
  const cats = (sub.categories || []).map(c => c.toLowerCase());
  const isOpioid = cats.includes('opioid') || OPIOID_NAMES_SET.has(sub.name);
  const isStimulant = cats.includes('stimulant') || cats.includes('entactogen');

  if (lang === 'fr') {
    if (isStimulant && sc <= 1) {
      return "🧠 0-1/10 — Aucune dépendance physique somatique : aucun syndrome de sevrage organique ni convulsion. La dépendance est psychologique (craving dopaminergique, asthénie et rebond d'humeur passager).";
    }
    if (isOpioid) {
      return `${sc}/10 — ⚠️ Sevrage somatique extrêmement éprouvant mais NON mortel en soi : douleurs diffuses intenses, diarrhées, nausées, sueurs et insomnie ('cold turkey'), sans risque convulsif primaire ni orage neurovégétatif fatal. Danger vital uniquement indirect (déshydratation aiguë si absence totale d'eau). TSO ou sevrage dégressif conseillé.`;
    }
    if (sc === 0) return "0/10 — Aucune dépendance physique somatique ni syndrome de sevrage corporel";
    if (sc <= 2)  return `${sc}/10 — Dépendance physique très faible : rebond léger, fatigue passagère ou céphalées`;
    if (sc === 3) return "3/10 — Dépendance physique légère : rebond autonome bénin type nicotine ou syndrome d'arrêt d'antidépresseurs";
    if (sc <= 5)  return `${sc}/10 — Dépendance physique modérée à forte non convulsive : syndrome d'arrêt franc, diminution progressive recommandée`;
    if (sc === 7) return "💤 7/10 — Sevrage marqué avec rebond d'hyperexcitabilité (Z-drugs, gabapentine) : insomnie sévère de rebond, tremblements et agitation. Crises convulsives rares mais possibles lors d'arrêts brutaux de doses massives.";
    if (sc === 8) return "⚡ 8/10 — Sevrage neurovégétatif sévère (Prégabaline, Phénibut, Baclofène) : risque convulsif avéré sous fortes doses (>600mg Lyrica, >2g Phénibut), désorientation et anxiété paroxystique. Moins foudroyant que l'effondrement autonome de l'alcool/GHB, mais sevrage progressif par paliers indispensable.";
    if (sc === 9) return "⚠️ 9/10 — Sevrage critique potentiellement létal (Benzodiazépines, GHB/GBL) : risque élevé de crises comitiales (convulsions généralisées tonico-cloniques) et de psychose aiguë délirante (foudroyante en 2 à 4h pour le GHB). Arrêt brutal formellement proscrit : décroissance médicale très progressive obligatoire.";
    return "🚨 10/10 — URGENCE VITALE ABSOLUE (Alcool, Barbituriques, Triazolo-benzos ultra-puissantes) : l'arrêt brutal supprime brutalement le frein GABA-A et déclenche un orage glutamatergique massif avec delirium tremens, hyperthermie maligne et état de mal épileptique fatal en 24 à 72h. Hospitalisation et sevrage médicalisé stricts indispensables.";
  }

  if (isStimulant && sc <= 1) {
    return "🧠 0-1/10 — No somatic physical dependence: zero organic withdrawal syndrome, no seizures, and no physical danger. Dependence is purely psychological (dopaminergic craving, fatigue, and temporary mood dip).";
  }
  if (isOpioid) {
    return `${sc}/10 — ⚠️ Severe somatic withdrawal, extremely agonizing but NOT directly dangerous: severe bone/muscle pain, diarrhea, nausea, chills, and insomnia ('cold turkey'), without primary seizure risk or fatal autonomic storm. Direct life threat is absent (only indirect through severe dehydration). Taper or OUD therapy advised.`;
  }
  if (sc === 0) return "0/10 — No somatic physical dependence or bodily withdrawal syndrome";
  if (sc <= 2)  return `${sc}/10 — Very low physical dependence: mild rebound, transient fatigue, or headaches`;
  if (sc === 3) return "3/10 — Mild physical dependence: benign autonomic rebound (nicotine, caffeine) or antidepressant discontinuation";
  if (sc <= 5)  return `${sc}/10 — Moderate to strong non-convulsive physical dependence: clear withdrawal syndrome, gradual taper advised`;
  if (sc === 7) return "💤 7/10 — Marked withdrawal with rebound hyperexcitability (Z-drugs, gabapentin): severe rebound insomnia, tremors, and agitation. Seizures are rare but possible after abrupt cessation of massive doses.";
  if (sc === 8) return "⚡ 8/10 — Severe neuro-vegetative withdrawal (Pregabalin, Phenibut, Baclofen): severe rebound panic, stubborn insomnia, disorientation, and clear seizure risk upon abrupt cessation of high doses (>600mg Lyrica, >2g Phenibut). Lacks the instant autonomic collapse of alcohol/GHB, but gradual step-by-step taper is essential.";
  if (sc === 9) return "⚠️ 9/10 — Critical, potentially lethal withdrawal (Benzodiazepines, GHB/GBL): high risk of generalized tonic-clonic seizures and acute withdrawal psychosis (rapid delirium within 2–4h for GHB/GBL). Abrupt stop strictly contraindicated: slow medical taper mandatory.";
  return "🚨 10/10 — LIFE-THREATENING EMERGENCY (Alcohol, Barbiturates, Ultra-potent triazolo-benzos): abrupt cessation removes the GABA-A brake, triggering massive glutamate rebound with delirium tremens, malignant hyperthermia, and fatal refractory status epilepticus within 24–72h. Inpatient medically supervised detoxification is mandatory.";
}
