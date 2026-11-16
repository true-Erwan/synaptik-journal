const patientPKProfile = {

  manualEnzymeActivities: {},

  empiricalCalibrations: [],

  renal: {
    mode: 'preset',
    presetGFR: 100,
    creatinineValue: null,
    creatinineUnit: 'umol',
    age: 30,
    sex: 'M'
  },

  tolerance: {
    autoFromHistory: true,
    globalBaseline: 0.0,
    classOverrides: {}
  },

  showStandardReferenceCurve: false
};

function computeCKDEpi2021(creatinineVal, unit, age, sex) {
  const val = parseFloat(creatinineVal);
  if (!val || val <= 0 || isNaN(val)) return 100;

  const scrMgDl = (unit === 'umol') ? (val / 88.42) : val;
  const patientAge = Math.max(18, Math.min(100, parseFloat(age) || 30));
  const isFemale = (sex === 'F');

  const kappa = isFemale ? 0.7 : 0.9;
  const alpha = isFemale ? -0.241 : -0.302;
  const sexMult = isFemale ? 1.012 : 1.0;

  const ratio = scrMgDl / kappa;
  const minPart = Math.pow(Math.min(ratio, 1.0), alpha);
  const maxPart = Math.pow(Math.max(ratio, 1.0), -1.200);
  const agePart = Math.pow(0.9938, patientAge);

  const egfr = 142.0 * minPart * maxPart * agePart * sexMult;
  return Math.max(8, Math.min(160, Math.round(egfr)));
}

function getPatientRenalStatus() {
  const r = patientPKProfile.renal;
  let egfr = r.presetGFR || 100;

  if (r.mode === 'creatinine' && r.creatinineValue && parseFloat(r.creatinineValue) > 0) {
    egfr = computeCKDEpi2021(r.creatinineValue, r.creatinineUnit, r.age, r.sex);
  }

  const gfrActivity = Math.max(0.12, Math.min(1.60, egfr / 100.0));

  let stageFr = 'Fonction rénale normale (Stade G1)';
  let stageEn = 'Normal renal function (Stage G1)';
  let badgeColor = 'emerald';

  if (egfr >= 120) {
    stageFr = 'Hyperfiltration rénale (Élimination rénale rapide)';
    stageEn = 'Renal hyperfiltration (Fast renal clearance)';
    badgeColor = 'cyan';
  } else if (egfr >= 90) {
    stageFr = 'Fonction rénale normale optimale (G1)';
    stageEn = 'Optimal normal renal function (G1)';
    badgeColor = 'emerald';
  } else if (egfr >= 60) {
    stageFr = 'Baisse légère du DFG (Stade G2 : 60–89 mL/min)';
    stageEn = 'Mildly decreased GFR (Stage G2: 60–89 mL/min)';
    badgeColor = 'amber';
  } else if (egfr >= 30) {
    stageFr = 'Insuffisance rénale modérée (Stade G3 : 30–59 mL/min)';
    stageEn = 'Moderate renal impairment (Stage G3: 30–59 mL/min)';
    badgeColor = 'orange';
  } else {
    stageFr = 'Insuffisance rénale sévère (Stade G4/G5 : <30 mL/min)';
    stageEn = 'Severe renal impairment (Stage G4/G5: <30 mL/min)';
    badgeColor = 'rose';
  }

  return {
    egfr,
    gfrActivity,
    stageFr,
    stageEn,
    badgeColor
  };
}

function getStandardSubstanceDurationHours(substanceName, routeName = 'oral') {
  const s = SUBSTANCES_BY_NAME[substanceName];
  if (!s || !s.roas || s.roas.length === 0) return 5.0;
  const roa = s.roas.find(r => r.name.toLowerCase() === (routeName || 'oral').toLowerCase() && r.duration)
    || s.roas.find(r => r.duration)
    || s.roas[0];
  const { onsetMin, riseMin, fallMin } = parseRoaDurationMinutes(roa);
  return Math.max(0.25, Number(((onsetMin + riseMin + fallMin) / 60).toFixed(2)));
}

function getEffectiveEnzymeActivities() {
  const effective = {};
  const inferredSources = {};

  for (const enzId in ENZYME_CATALOG) {
    effective[enzId] = 1.0;
    inferredSources[enzId] = [];
  }

  const cals = patientPKProfile.empiricalCalibrations || [];
  const validEquations = [];

  for (let i = 0; i < cals.length; i++) {
    const cal = cals[i];
    const pk = getSubstancePKProfile(cal.substanceName);
    if (!pk || !pk.verified || !pk.pathways) continue;

    const stdH = cal.stdHours || getStandardSubstanceDurationHours(cal.substanceName, cal.route);
    const obsH = Math.max(0.2, parseFloat(cal.observedHours) || stdH);
    const targetClearanceRatio = stdH / obsH;

    const entries = Object.entries(pk.pathways).filter(([k, fm]) => {
      if (fm <= 0 || k === 'PULMONARY') return false;
      if (k === 'RENAL_GFR' && (fm < 0.50 || patientPKProfile.renal.mode === 'creatinine')) return false;
      return true;
    });
    if (entries.length === 0) continue;

    let sumSq = 0;
    for (let j = 0; j < entries.length; j++) {
      const fm = entries[j][1];
      sumSq += fm * fm;
    }
    const normDenom = Math.max(0.22, sumSq);

    validEquations.push({
      substanceName: cal.substanceName,
      observedHours: obsH,
      stdHours: stdH,
      targetDelta: targetClearanceRatio - 1.0,
      entries,
      normDenom
    });

    for (let j = 0; j < entries.length; j++) {
      const [enzId, fm] = entries[j];
      const singleDeltaV = (targetClearanceRatio - 1.0) * (fm / normDenom);
      const singleImpliedV = Math.max(0.15, Math.min(3.00, 1.0 + singleDeltaV));
      inferredSources[enzId].push({
        substanceName: cal.substanceName,
        observedHours: obsH,
        stdHours: stdH,
        fm,
        impliedV: singleImpliedV
      });
    }
  }

  if (validEquations.length === 1) {

    const eq = validEquations[0];
    for (let j = 0; j < eq.entries.length; j++) {
      const [enzId, fm] = eq.entries[j];
      const deltaV = eq.targetDelta * (fm / eq.normDenom);
      effective[enzId] = Number(Math.max(0.15, Math.min(3.00, 1.0 + deltaV)).toFixed(3));
    }
  } else if (validEquations.length >= 2) {

    const deltaMap = {};
    for (const enzId in ENZYME_CATALOG) {
      deltaMap[enzId] = 0.0;
    }

    const iterations = 28;
    for (let iter = 0; iter < iterations; iter++) {

      if (iter < 18) {
        for (const enzId in deltaMap) {
          deltaMap[enzId] *= 0.985;
        }
      }
      for (let m = 0; m < validEquations.length; m++) {
        const eq = validEquations[m];
        let currentPred = 0;
        for (let j = 0; j < eq.entries.length; j++) {
          const [enzId, fm] = eq.entries[j];
          currentPred += fm * (deltaMap[enzId] || 0);
        }
        const residual = eq.targetDelta - currentPred;
        const stepScale = 0.72;
        for (let j = 0; j < eq.entries.length; j++) {
          const [enzId, fm] = eq.entries[j];
          const upd = deltaMap[enzId] + stepScale * residual * (fm / eq.normDenom);
          deltaMap[enzId] = Math.max(-0.85, Math.min(2.00, upd));
        }
      }
    }

    for (const enzId in inferredSources) {
      if (inferredSources[enzId].length > 0) {
        effective[enzId] = Number(Math.max(0.15, Math.min(3.00, 1.0 + (deltaMap[enzId] || 0))).toFixed(3));
      }
    }
  }

  const renalStatus = getPatientRenalStatus();
  if (patientPKProfile.renal.mode === 'creatinine' || Math.abs(patientPKProfile.renal.presetGFR - 100) > 1) {
    effective.RENAL_GFR = renalStatus.gfrActivity;

    if (patientPKProfile.manualEnzymeActivities.RENAL_OAT === undefined) {
      effective.RENAL_OAT = Number((0.25 + 0.75 * renalStatus.gfrActivity).toFixed(2));
    }
    if (patientPKProfile.manualEnzymeActivities.RENAL_OCT2 === undefined) {
      effective.RENAL_OCT2 = Number((0.25 + 0.75 * renalStatus.gfrActivity).toFixed(2));
    }
  }

  for (const enzId in patientPKProfile.manualEnzymeActivities) {
    const manualVal = patientPKProfile.manualEnzymeActivities[enzId];
    if (manualVal !== undefined && manualVal !== null && !isNaN(manualVal)) {
      effective[enzId] = Math.max(0.10, Math.min(3.00, parseFloat(manualVal)));
    }
  }

  return {
    effective,
    inferredSources,
    renalStatus
  };
}

function deduceGeneticMutationsReport() {
  const { effective, inferredSources } = getEffectiveEnzymeActivities();
  const touchedEnzIds = Object.keys(inferredSources).filter(
    k => inferredSources[k] && inferredSources[k].length > 0
  );

  const deductions = touchedEnzIds.map(enzId => {
    const enz = ENZYME_CATALOG[enzId];
    const sources = inferredSources[enzId];
    const act = effective[enzId] !== undefined ? effective[enzId] : 1.0;
    const pct = Math.round(act * 100);
    const devPct = pct - 100;
    const maxFm = Math.max(...sources.map(s => s.fm));
    const molCount = sources.length;

    let phenotypeCode = 'EM';
    let copyStatusFr = 'Nombre / Activité Normale (EM)';
    let copyStatusEn = 'Normal Copy / Activity (EM)';
    let badgeColor = 'text-slate-300 border-slate-700 bg-slate-900/90';
    let barColor = 'bg-slate-400';
    let mutationHypothesisFr = '';
    let mutationHypothesisEn = '';

    if (pct >= 160) {
      phenotypeCode = 'UM';
      copyStatusFr = '⚡ Enzyme en Sur-nombre / Ultra-Rapide (UM)';
      copyStatusEn = '⚡ Excess Enzyme / Ultra-Rapid Metabolizer (UM)';
      badgeColor = 'text-emerald-300 border-emerald-500/60 bg-emerald-950/80';
      barColor = 'bg-emerald-400';
      mutationHypothesisFr = `Gain de fonction majeur ou duplication génique sur ${enz.code} (${enz.mutationsFr}). Dégradation très accélérée.`;
      mutationHypothesisEn = `Major gain-of-function or gene duplication on ${enz.code} (${enz.mutationsEn}). Markedly accelerated clearance.`;
    } else if (pct >= 118) {
      phenotypeCode = 'RM';
      copyStatusFr = '🔥 Sur-activité / Métaboliseur Rapide (RM)';
      copyStatusEn = '🔥 Increased Activity / Rapid Metabolizer (RM)';
      badgeColor = 'text-teal-300 border-teal-500/60 bg-teal-950/80';
      barColor = 'bg-teal-400';
      mutationHypothesisFr = `Polymorphisme gain de fonction ou hyper-expression de ${enz.code} (${enz.mutationsFr}).`;
      mutationHypothesisEn = `Gain-of-function polymorphism or overexpression of ${enz.code} (${enz.mutationsEn}).`;
    } else if (pct <= 45) {
      phenotypeCode = 'PM';
      copyStatusFr = '🛑 Sous-nombre sévère / Déficit Enzymatique (PM)';
      copyStatusEn = '🛑 Severe Deficiency / Poor Metabolizer (PM)';
      badgeColor = 'text-rose-300 border-rose-500/60 bg-rose-950/80';
      barColor = 'bg-rose-500';
      mutationHypothesisFr = `Mutation perte de fonction homozygote probable sur ${enz.code} (${enz.mutationsFr}). Élimination fortement ralentie.`;
      mutationHypothesisEn = `Probable homozygous loss-of-function mutation on ${enz.code} (${enz.mutationsEn}). Strongly delayed clearance.`;
    } else if (pct <= 84) {
      phenotypeCode = 'IM';
      copyStatusFr = '🐢 Enzyme en Sous-nombre / Intermédiaire (IM)';
      copyStatusEn = '🐢 Reduced Enzyme / Intermediate Metabolizer (IM)';
      badgeColor = 'text-amber-300 border-amber-500/60 bg-amber-950/80';
      barColor = 'bg-amber-400';
      mutationHypothesisFr = `Hétérozygote perte de fonction ou allèle à activité réduite sur ${enz.code} (${enz.mutationsFr}).`;
      mutationHypothesisEn = `Heterozygous loss-of-function or reduced-activity allele on ${enz.code} (${enz.mutationsEn}).`;
    } else {
      phenotypeCode = 'EM';
      copyStatusFr = '✅ Activité Normale (Confirmée par recoupement)';
      copyStatusEn = '✅ Normal Activity (Confirmed by cross-check)';
      badgeColor = 'text-sky-300 border-sky-500/40 bg-sky-950/60';
      barColor = 'bg-sky-400';
      mutationHypothesisFr = `Aucune mutation délétère détectée sur ${enz.code} (allèles fonctionnels *1/*1).`;
      mutationHypothesisEn = `No deleterious mutation detected on ${enz.code} (functional *1/*1 alleles).`;
    }

    let confidenceFr = '';
    let confidenceEn = '';
    if (molCount >= 2) {
      confidenceFr = `🎯 Recoupé sur ${molCount} molécules (${sources.map(s => s.substanceName).join(' + ')})`;
      confidenceEn = `🎯 Cross-checked across ${molCount} molecules (${sources.map(s => s.substanceName).join(' + ')})`;
    } else if (maxFm >= 0.40) {
      confidenceFr = `🔍 Voie majeure (${Math.round(maxFm * 100)}% de ${sources[0].substanceName})`;
      confidenceEn = `🔍 Major pathway (${Math.round(maxFm * 100)}% of ${sources[0].substanceName})`;
    } else {
      confidenceFr = `💡 Voie secondaire (${Math.round(maxFm * 100)}% de ${sources[0].substanceName})`;
      confidenceEn = `💡 Secondary pathway (${Math.round(maxFm * 100)}% of ${sources[0].substanceName})`;
    }

    return {
      enzymeId: enzId,
      code: enz ? enz.code : enzId,
      nameFr: enz ? enz.nameFr : enzId,
      nameEn: enz ? enz.nameEn : enzId,
      pct,
      devPct,
      maxFm,
      molCount,
      phenotypeCode,
      copyStatusFr,
      copyStatusEn,
      badgeColor,
      barColor,
      mutationHypothesisFr,
      mutationHypothesisEn,
      confidenceFr,
      confidenceEn,
      sources
    };
  });

  deductions.sort((a, b) => (Math.abs(b.devPct) * (0.4 + b.maxFm)) - (Math.abs(a.devPct) * (0.4 + a.maxFm)));

  const calibratedNames = new Set((patientPKProfile.empiricalCalibrations || []).map(c => c.substanceName));
  const probeSuggestions = {
    CYP3A4: ['Alprazolam', 'Zolpidem', 'Midazolam', 'Quetiapine'],
    CYP2D6: ['Tramadol', 'Codeine', 'Dextromethorphan', 'Venlafaxine'],
    CYP2C19: ['Diazepam', 'Escitalopram', 'Clobazam'],
    CYP1A2: ['Caffeine', 'Duloxetine'],
    UGT2B7: ['Morphine', 'Lorazepam', 'Oxazepam'],
    CES1: ['Methylphenidate', 'Cocaine']
  };

  const suggestedProbes = [];
  for (let i = 0; i < deductions.length; i++) {
    const d = deductions[i];
    if (d.molCount === 1 && Math.abs(d.devPct) >= 15 && probeSuggestions[d.enzymeId]) {
      const candidates = probeSuggestions[d.enzymeId].filter(m => !calibratedNames.has(m));
      if (candidates.length > 0) {
        suggestedProbes.push({
          enzymeId: d.enzymeId,
          molecules: candidates.slice(0, 2)
        });
      }
    }
  }

  return {
    deductions,
    suggestedProbes: suggestedProbes.slice(0, 2)
  };
}

function computeEnzymaticCompetitionForIngestion(targetIng, allIngestions) {
  const pkA = getSubstancePKProfile(targetIng.substanceName);
  if (!pkA || !pkA.verified || !pkA.pathways) {
    return {
      enzymeInhibitionMap: {},
      enzymeInductionMap: {},
      nephroNsaidFactor: 1.0,
      conflicts: []
    };
  }

  const enzymeInhibitionMap = {};
  const enzymeInductionMap = {};
  let nephroNsaidActive = false;
  const conflicts = [];

  const nowMs = getNowTime();

  const sA = SUBSTANCES_BY_NAME[targetIng.substanceName];
  const roaA = (sA && sA.roas)
    ? (sA.roas.find(r => r.name === (targetIng.route || 'oral') && r.duration) || sA.roas[0])
    : null;
  const durA = parseRoaDurationMinutes(roaA);
  const tStartA = targetIng.timestamp
    ? Math.round((targetIng.timestamp - nowMs) / 60000)
    : (targetIng.timeOffsetMinutes || 0);
  const tEndA = tStartA + (durA.onsetMin + durA.riseMin + durA.fallMin) * 1.6;

  if (typeof enabledSettings !== 'undefined' && enabledSettings.size > 0) {
    enabledSettings.forEach(settingKey => {
      const mod = BACKGROUND_HABIT_ENZYME_MODS[settingKey];
      if (!mod) return;

      if (mod.nephroDynamicEffect === 'NSAID_GFR_REDUCTION') {
        nephroNsaidActive = true;
        if (pkA.pathways.RENAL_GFR >= 0.40) {
          conflicts.push({
            source: currentLang === 'fr' ? mod.nameFr : mod.nameEn,
            pathway: 'RENAL_GFR',
            type: 'renal_hemodynamic',
            descFr: `${mod.nameFr} réduit la filtration rénale (DFG)`,
            descEn: `${mod.nameEn} reduces renal glomerular filtration`
          });
        }
      }

      if (mod.inhibits) {
        for (const enzId in mod.inhibits) {
          const fmA = pkA.pathways[enzId] || 0;
          if (fmA > 0) {
            const pot = mod.inhibits[enzId];
            enzymeInhibitionMap[enzId] = (enzymeInhibitionMap[enzId] || 0) + pot;
            conflicts.push({
              source: currentLang === 'fr' ? mod.nameFr : mod.nameEn,
              pathway: enzId,
              type: 'inhibition',
              descFr: `${mod.nameFr} inhibe ${enzId} (${Math.round(fmA * 100)}% de l'élimination de ${targetIng.substanceName})`,
              descEn: `${mod.nameEn} inhibits ${enzId} (${Math.round(fmA * 100)}% of ${targetIng.substanceName} clearance)`
            });
          }
        }
      }
    });
  }

  const list = allIngestions || ingestions || [];
  for (let i = 0; i < list.length; i++) {
    const otherIng = list[i];
    if (!otherIng || otherIng.id === targetIng.id || otherIng.substanceName === targetIng.substanceName) {
      continue;
    }

    const pkB = getSubstancePKProfile(otherIng.substanceName);
    if (!pkB || !pkB.verified) continue;

    const sB = SUBSTANCES_BY_NAME[otherIng.substanceName];
    const roaB = (sB && sB.roas)
      ? (sB.roas.find(r => r.name === (otherIng.route || 'oral') && r.duration) || sB.roas[0])
      : null;
    const durB = parseRoaDurationMinutes(roaB);
    const tStartB = otherIng.timestamp
      ? Math.round((otherIng.timestamp - nowMs) / 60000)
      : (otherIng.timeOffsetMinutes || 0);
    const halfLifeBMin = (pkB.halfLifeHours || 4.0) * 60;
    const tEndB = tStartB + Math.max((durB.onsetMin + durB.riseMin + durB.fallMin) * 1.4, halfLifeBMin * 2.2);

    const overlapStart = Math.max(tStartA, tStartB);
    const overlapEnd = Math.min(tEndA, tEndB);
    if (overlapEnd <= overlapStart) continue;

    const overlapRatio = Math.min(1.0, (overlapEnd - overlapStart) / Math.max(60, (tEndA - tStartA) * 0.6));

    if (pkB.nephroDynamicEffect === 'NSAID_GFR_REDUCTION' && pkA.pathways.RENAL_GFR >= 0.30) {
      nephroNsaidActive = true;
      conflicts.push({
        source: otherIng.substanceName,
        pathway: 'RENAL_GFR',
        type: 'renal_hemodynamic',
        descFr: `${otherIng.substanceName} (AINS) freine la clairance rénale de ${targetIng.substanceName}`,
        descEn: `${otherIng.substanceName} (NSAID) slows renal clearance of ${targetIng.substanceName}`
      });
    }

    if (pkB.inhibits) {
      for (const enzId in pkB.inhibits) {
        const fmA = pkA.pathways[enzId] || 0;
        if (fmA > 0) {
          const load = pkB.inhibits[enzId] * overlapRatio;
          enzymeInhibitionMap[enzId] = (enzymeInhibitionMap[enzId] || 0) + load;
          conflicts.push({
            source: otherIng.substanceName,
            pathway: enzId,
            type: 'inhibition',
            descFr: `${otherIng.substanceName} inhibe ${enzId} (ralentit la dégradation de ${targetIng.substanceName})`,
            descEn: `${otherIng.substanceName} inhibits ${enzId} (slows degradation of ${targetIng.substanceName})`
          });
        }
      }
    }

    if (pkB.induces) {
      for (const enzId in pkB.induces) {
        const fmA = pkA.pathways[enzId] || 0;
        if (fmA > 0) {
          const load = pkB.induces[enzId] * overlapRatio;
          enzymeInductionMap[enzId] = (enzymeInductionMap[enzId] || 0) + load;
          conflicts.push({
            source: otherIng.substanceName,
            pathway: enzId,
            type: 'induction',
            descFr: `${otherIng.substanceName} induit ${enzId} (accélère l'élimination de ${targetIng.substanceName})`,
            descEn: `${otherIng.substanceName} induces ${enzId} (accelerates clearance of ${targetIng.substanceName})`
          });
        }
      }
    }

    if (pkB.pathways) {
      for (const enzId in pkA.pathways) {
        if (enzId === 'PULMONARY' || enzId === 'RENAL_GFR') continue;
        const fmA = pkA.pathways[enzId] || 0;
        const fmB = pkB.pathways[enzId] || 0;
        if (fmA >= 0.15 && fmB >= 0.15) {

          const satWeight = (enzId === 'ADH_ALDH2' || enzId === 'RENAL_OAT' || enzId === 'RENAL_OCT2' || enzId === 'CES1')
            ? 0.85
            : 0.50;
          const compLoad = satWeight * fmA * fmB * overlapRatio;
          enzymeInhibitionMap[enzId] = (enzymeInhibitionMap[enzId] || 0) + compLoad;

          const alreadyListed = conflicts.some(c => c.source === otherIng.substanceName && c.pathway === enzId);
          if (!alreadyListed) {
            conflicts.push({
              source: otherIng.substanceName,
              pathway: enzId,
              type: 'competition',
              descFr: `Compétition sur ${enzId} avec ${otherIng.substanceName} (${Math.round(fmA * 100)}% vs ${Math.round(fmB * 100)}%)`,
              descEn: `Substrate competition on ${enzId} with ${otherIng.substanceName} (${Math.round(fmA * 100)}% vs ${Math.round(fmB * 100)}%)`
            });
          }
        }
      }
    }
  }

  let nephroNsaidFactor = 1.0;
  if (nephroNsaidActive) {

    nephroNsaidFactor = (targetIng.substanceName === 'Lithium') ? 0.65 : 0.82;
  }

  return {
    enzymeInhibitionMap,
    enzymeInductionMap,
    nephroNsaidFactor,
    conflicts
  };
}

function computeSubstanceTolerance(targetIng, allIngestions) {
  const pk = getSubstancePKProfile(targetIng.substanceName);
  const tolClassKey = pk ? pk.toleranceClass : null;
  const tolClass = tolClassKey ? RECEPTOR_TOLERANCE_CLASSES[tolClassKey] : null;

  const baseGlobal = Math.max(0, Math.min(0.85, parseFloat(patientPKProfile.tolerance.globalBaseline) || 0));
  const classOverride = (tolClassKey && patientPKProfile.tolerance.classOverrides[tolClassKey] !== undefined)
    ? parseFloat(patientPKProfile.tolerance.classOverrides[tolClassKey])
    : null;

  let baseTol = classOverride !== null && !isNaN(classOverride) ? classOverride : baseGlobal;

  if (!tolClass) {
    return {
      toleranceIndex: baseTol,
      amplitudeMultiplier: 1.0 - 0.45 * baseTol,
      durationShrinkMultiplier: 1.0 - 0.12 * baseTol,
      classInfo: null,
      priorDosesCount: 0
    };
  }

  let dynamicCharge = 0;
  let priorDosesCount = 0;

  if (patientPKProfile.tolerance.autoFromHistory) {
    const nowMs = getNowTime();
    const targetTimeMin = targetIng.timestamp
      ? Math.round((targetIng.timestamp - nowMs) / 60000)
      : (targetIng.timeOffsetMinutes || 0);

    const list = allIngestions || ingestions || [];
    for (let i = 0; i < list.length; i++) {
      const other = list[i];
      if (!other) continue;
      const pkOther = getSubstancePKProfile(other.substanceName);
      if (!pkOther || pkOther.toleranceClass !== tolClassKey) continue;

      const sOther = SUBSTANCES_BY_NAME[other.substanceName];
      const roaOther = (sOther && sOther.roas)
        ? (sOther.roas.find(r => r.name === (other.route || 'oral')) || sOther.roas[0])
        : null;
      const commonDose = (roaOther && roaOther.dose && roaOther.dose.commonMin) ? roaOther.dose.commonMin : 50;

      const subIntakes = (other.intakes && other.intakes.length > 0)
        ? other.intakes
        : [{ dose: other.dose, timeOffsetMinutes: other.timeOffsetMinutes || 0, timestamp: other.timestamp }];

      for (let j = 0; j < subIntakes.length; j++) {
        const subIt = subIntakes[j];
        const tOtherMin = subIt.timestamp
          ? Math.round((subIt.timestamp - nowMs) / 60000)
          : (subIt.timeOffsetMinutes || 0);

        const dtHours = (targetTimeMin - tOtherMin) / 60.0;
        if (dtHours >= 0.75) {
          const normalizedDoseUnits = Math.min(3.5, (subIt.dose || commonDose) / Math.max(0.1, commonDose));
          const decay = Math.exp(-dtHours / tolClass.recoveryTauHours);
          dynamicCharge += normalizedDoseUnits * decay;
          priorDosesCount++;
        }
      }
    }
  }

  const k50 = 2.2;
  const hillAcquired = dynamicCharge > 0
    ? Math.pow(dynamicCharge, 1.25) / (Math.pow(k50, 1.25) + Math.pow(dynamicCharge, 1.25))
    : 0;

  const combinedTol = Math.min(0.90, baseTol + (1.0 - baseTol) * hillAcquired * 0.65);
  const amplitudeMultiplier = Math.max(0.30, 1.0 - tolClass.maxAttenuation * combinedTol);
  const durationShrinkMultiplier = Math.max(0.72, 1.0 - tolClass.durationShrink * combinedTol);

  return {
    toleranceIndex: Number(combinedTol.toFixed(3)),
    amplitudeMultiplier: Number(amplitudeMultiplier.toFixed(3)),
    durationShrinkMultiplier: Number(durationShrinkMultiplier.toFixed(3)),
    classInfo: tolClass,
    priorDosesCount
  };
}

function computeActiveMetaboliteTailModels(ing, pk, enzActivities, comp, renalStatus, baseDur, onsetScale) {
  if (!pk || !Array.isArray(pk.activeMetabolites) || pk.activeMetabolites.length === 0) {
    return [];
  }

  const gfrAct = (renalStatus && renalStatus.gfrActivity !== undefined) ? renalStatus.gfrActivity : 1.0;
  const nsaidMult = (comp && comp.nephroNsaidFactor !== undefined) ? comp.nephroNsaidFactor : 1.0;
  const effOnsetMin = (baseDur ? baseDur.onsetMin : 30) * (onsetScale || 1.0);
  const stdOnsetMin = baseDur ? baseDur.onsetMin : 30;

  return pk.activeMetabolites.map(met => {

    const enz1 = met.formationEnzyme;
    const baseAct1 = (enz1 && enzActivities && enzActivities[enz1] !== undefined) ? enzActivities[enz1] : 1.0;
    const inhib1 = (enz1 && comp && comp.enzymeInhibitionMap && comp.enzymeInhibitionMap[enz1]) ? comp.enzymeInhibitionMap[enz1] : 0;
    const induc1 = (enz1 && comp && comp.enzymeInductionMap && comp.enzymeInductionMap[enz1]) ? comp.enzymeInductionMap[enz1] : 0;
    const effAct1 = (baseAct1 * (1.0 + 0.55 * induc1)) / (1.0 + inhib1);

    let rawFormationRate = effAct1;
    const enz2 = met.secondaryFormationEnzyme;
    if (enz2) {
      const baseAct2 = (enzActivities && enzActivities[enz2] !== undefined) ? enzActivities[enz2] : 1.0;
      const inhib2 = (comp && comp.enzymeInhibitionMap && comp.enzymeInhibitionMap[enz2]) ? comp.enzymeInhibitionMap[enz2] : 0;
      const induc2 = (comp && comp.enzymeInductionMap && comp.enzymeInductionMap[enz2]) ? comp.enzymeInductionMap[enz2] : 0;
      const effAct2 = (baseAct2 * (1.0 + 0.55 * induc2)) / (1.0 + inhib2);
      rawFormationRate = 0.68 * effAct1 + 0.32 * effAct2;
    }
    if (met.isSubMetabolite && Array.isArray(met.precursorMetabolites) && met.precursorMetabolites.length > 0) {
      const precMet = pk.activeMetabolites.find(pm => met.precursorMetabolites.includes(pm.name));
      if (precMet && precMet.formationEnzyme) {
        const pEnz = precMet.formationEnzyme;
        const pBase = (enzActivities && enzActivities[pEnz] !== undefined) ? enzActivities[pEnz] : 1.0;
        const pInhib = (comp && comp.enzymeInhibitionMap && comp.enzymeInhibitionMap[pEnz]) ? comp.enzymeInhibitionMap[pEnz] : 0;
        const pInduc = (comp && comp.enzymeInductionMap && comp.enzymeInductionMap[pEnz]) ? comp.enzymeInductionMap[pEnz] : 0;
        const pEffAct = (pBase * (1.0 + 0.55 * pInduc)) / (1.0 + pInhib);
        rawFormationRate = Math.sqrt(Math.max(0.05, rawFormationRate * pEffAct));
      }
    }
    const effectiveFormationRate = Math.max(0.10, Math.min(3.00, rawFormationRate));

    const metPK = getSubstancePKProfile(met.name);
    let rawClearanceRate = 1.0;

    if (metPK && metPK.verified && metPK.pathways && Object.keys(metPK.pathways).length > 0) {
      let mKnownFm = 0;
      let mWeightedClearance = 0;
      for (const mEnzId in metPK.pathways) {
        const mFm = metPK.pathways[mEnzId] || 0;
        if (mFm <= 0) continue;
        mKnownFm += mFm;

        let mAct = (enzActivities && enzActivities[mEnzId] !== undefined) ? enzActivities[mEnzId] : 1.0;
        if (mEnzId === 'RENAL_GFR') {
          mAct = gfrAct * nsaidMult;
        } else if (mEnzId === 'RENAL_OAT' || mEnzId === 'RENAL_OCT2') {
          mAct = Math.min(mAct, 0.25 + 0.75 * gfrAct) * (mEnzId === 'RENAL_OAT' ? nsaidMult : 1.0);
        }

        const mInhib = (comp && comp.enzymeInhibitionMap && comp.enzymeInhibitionMap[mEnzId]) ? comp.enzymeInhibitionMap[mEnzId] : 0;
        const mInduc = (comp && comp.enzymeInductionMap && comp.enzymeInductionMap[mEnzId]) ? comp.enzymeInductionMap[mEnzId] : 0;
        const mCompAct = (mAct * (1.0 + 0.55 * mInduc)) / (1.0 + mInhib);
        mWeightedClearance += mFm * mCompAct;
      }

      rawClearanceRate = Math.max(0, 1.0 - mKnownFm) + mWeightedClearance;
      if (met.renalDependent && (!metPK.pathways.RENAL_GFR || metPK.pathways.RENAL_GFR < 0.25)) {
        rawClearanceRate = 0.60 * rawClearanceRate + 0.40 * (gfrAct * nsaidMult);
      }
    } else if (met.renalDependent) {
      rawClearanceRate = (0.35 + 0.65 * gfrAct) * nsaidMult;
    }

    const effectiveClearanceRate = Math.max(0.12, Math.min(3.00, rawClearanceRate));

    const stdHalfLifeHours = Math.max(0.5, parseFloat(met.halfLifeHours) || 6.0);
    const stdHalfLifeMin = stdHalfLifeHours * 60;
    const effectiveHalfLifeHours = stdHalfLifeHours / effectiveClearanceRate;
    const effectiveHalfLifeMin = effectiveHalfLifeHours * 60;

    const stdLagMin = Math.max(20, (parseFloat(met.peakDelayHours) || 1.5) * 60);
    const lagMin = Math.max(
      15,
      stdLagMin / Math.max(0.35, Math.min(2.20, Math.pow(effectiveFormationRate, 0.45)))
    );

    const stdTailWeight = Math.max(0.05, Math.min(0.45, parseFloat(met.tailWeight) || 0.15));
    const effectiveTailWeight = Math.max(
      0.01,
      Math.min(
        0.58,
        stdTailWeight * Math.pow(effectiveFormationRate, 0.78) * Math.pow(1.0 / effectiveClearanceRate, 0.35)
      )
    );

    const potRel = parseFloat(met.potencyRelative) || 0.5;
    const convFrac = parseFloat(met.conversionFraction) || 0.3;

    const stdReboundWeight = (potRel >= 1.15 && (met.peakDelayHours || 1.5) <= 4.5)
      ? Math.min(0.24, 0.055 * Math.log(1 + potRel) * (0.5 + 0.5 * convFrac))
      : 0;
    const reboundBumpWeight = stdReboundWeight > 0
      ? Math.max(
          0.0,
          Math.min(0.32, stdReboundWeight * Math.pow(effectiveFormationRate, 0.85) * Math.pow(1.0 / effectiveClearanceRate, 0.20))
        )
      : 0;

    const stdActivityPeakRatio = Math.max(0.02, Math.min(1.0, convFrac * potRel));
    const effectiveActivityPeakRatio = Math.max(
      0.01,
      Math.min(1.25, stdActivityPeakRatio * Math.pow(effectiveFormationRate, 0.78) * Math.pow(1.0 / effectiveClearanceRate, 0.32))
    );

    const stdHalfLivesTo5Pct = (typeof getMetaboliteCutoffHalfLives === 'function')
      ? getMetaboliteCutoffHalfLives(stdActivityPeakRatio)
      : Math.max(1.8, Math.min(4.3, Math.log2(Math.max(0.08, stdActivityPeakRatio) / 0.05)));
    const stdTailEndMin = Math.round(stdOnsetMin + stdLagMin + stdHalfLifeMin * stdHalfLivesTo5Pct);

    const effHalfLivesTo5Pct = (typeof getMetaboliteCutoffHalfLives === 'function')
      ? getMetaboliteCutoffHalfLives(effectiveActivityPeakRatio)
      : (effectiveActivityPeakRatio < 0.05 ? 1.25 : Math.max(1.8, Math.min(4.3, Math.log2(Math.max(0.08, effectiveActivityPeakRatio) / 0.05))));
    const tailEndMin = Math.round(effOnsetMin + lagMin + effectiveHalfLifeMin * effHalfLivesTo5Pct);

    return {
      name: met.name,
      color: met.color || null,
      isSubMetabolite: Boolean(met.isSubMetabolite),
      precursorMetabolites: Array.isArray(met.precursorMetabolites) ? met.precursorMetabolites : [],
      directUse: met.directUse || 'endogenous_only',
      formationEnzyme: enz1 || null,
      secondaryFormationEnzyme: enz2 || null,
      conversionFraction: convFrac,
      potencyRelative: potRel,
      renalDependent: Boolean(met.renalDependent),
      specificInteractions: met.specificInteractions || null,
      stdHalfLifeHours: Number(stdHalfLifeHours.toFixed(2)),
      stdHalfLifeMin: Math.round(stdHalfLifeMin),
      effectiveHalfLifeHours: Number(effectiveHalfLifeHours.toFixed(2)),
      effectiveHalfLifeMin: Math.round(effectiveHalfLifeMin),
      effectiveFormationRate: Number(effectiveFormationRate.toFixed(3)),
      effectiveClearanceRate: Number(effectiveClearanceRate.toFixed(3)),
      stdLagMin: Math.round(stdLagMin),
      lagMin: Math.round(lagMin),
      stdTailWeight: Number(stdTailWeight.toFixed(3)),
      effectiveTailWeight: Number(effectiveTailWeight.toFixed(3)),
      stdReboundWeight: Number(stdReboundWeight.toFixed(3)),
      reboundBumpWeight: Number(reboundBumpWeight.toFixed(3)),
      stdActivityPeakRatio: Number(stdActivityPeakRatio.toFixed(3)),
      effectiveActivityPeakRatio: Number(effectiveActivityPeakRatio.toFixed(3)),
      stdTailEndMin,
      tailEndMin
    };
  });
}

function getPersonalizedPKModifier(ing, allIngestions) {
  if (!ing) {
    return {
      verified: false,
      onsetScale: 1.0,
      riseScale: 1.0,
      fallScale: 1.0,
      totalDurationScale: 1.0,
      amplitudeScale: 1.0,
      stdDurationMin: 300,
      realDurationMin: 300,
      stdPerceivedDurationMin: 300,
      perceivedDurationMin: 300,
      stdMetaboliteTailEndMin: 300,
      metaboliteTailEndMin: 300,
      hasActiveMetaboliteTail: false,
      metaboliteTailModels: [],
      conflicts: [],
      calibrationSource: null,
      toleranceInfo: { toleranceIndex: 0, amplitudeMultiplier: 1.0 }
    };
  }

  const pk = getSubstancePKProfile(ing.substanceName);
  const { effective: enzActivities, inferredSources, renalStatus } = getEffectiveEnzymeActivities();
  const comp = computeEnzymaticCompetitionForIngestion(ing, allIngestions);
  const tol = computeSubstanceTolerance(ing, allIngestions);

  const s = SUBSTANCES_BY_NAME[ing.substanceName];
  const roa = (s && s.roas)
    ? (s.roas.find(r => r.name === (ing.route || 'oral') && r.duration) || s.roas.find(r => r.duration) || s.roas[0])
    : null;
  const baseDur = parseRoaDurationMinutes(roa);
  const stdDurationMin = Math.round(baseDur.onsetMin + baseDur.riseMin + baseDur.fallMin);

  const directCal = (patientPKProfile.empiricalCalibrations || []).find(
    c => c.substanceName.toLowerCase() === ing.substanceName.toLowerCase()
  );

  let geneticAndRenalClearance = 1.0;
  let totalClearanceWithCompetition = 1.0;
  let calibrationSource = null;

  if (pk && pk.verified && pk.pathways && Object.keys(pk.pathways).length > 0) {
    let totalKnownFm = 0;
    let weightedClearanceNoComp = 0;
    let weightedClearanceWithComp = 0;
    const sharedCalibratedEnzymes = [];

    for (const enzId in pk.pathways) {
      const fm = pk.pathways[enzId] || 0;
      if (fm <= 0) continue;
      totalKnownFm += fm;

      let baseAct = enzActivities[enzId] !== undefined ? enzActivities[enzId] : 1.0;
      if (enzId === 'RENAL_GFR') {
        baseAct *= comp.nephroNsaidFactor;
      }

      if (!directCal && inferredSources[enzId] && inferredSources[enzId].length > 0) {
        sharedCalibratedEnzymes.push({
          enzyme: enzId,
          fm,
          fromSubstance: inferredSources[enzId][0].substanceName,
          activity: baseAct
        });
      }

      const inhibLoad = comp.enzymeInhibitionMap[enzId] || 0;
      const inducLoad = comp.enzymeInductionMap[enzId] || 0;
      const compAct = (baseAct * (1.0 + 0.65 * inducLoad)) / (1.0 + inhibLoad);

      weightedClearanceNoComp += fm * baseAct;
      weightedClearanceWithComp += fm * compAct;
    }

    const residualFm = Math.max(0, 1.0 - totalKnownFm);
    geneticAndRenalClearance = residualFm + weightedClearanceNoComp;
    totalClearanceWithCompetition = residualFm + weightedClearanceWithComp;

    if (sharedCalibratedEnzymes.length > 0) {
      calibrationSource = {
        type: 'indirect',
        sharedEnzymes: sharedCalibratedEnzymes
      };
    }
  }

  let baseDurationScale = 1.0 / Math.max(0.22, Math.min(3.20, geneticAndRenalClearance));
  const competitionStretchFactor = geneticAndRenalClearance / Math.max(0.18, totalClearanceWithCompetition);

  if (directCal) {
    const stdH = directCal.stdHours || (stdDurationMin / 60);
    const obsH = Math.max(0.25, parseFloat(directCal.observedHours) || stdH);
    baseDurationScale = obsH / Math.max(0.25, stdH);
    calibrationSource = {
      type: 'direct',
      observedHours: obsH,
      stdHours: stdH
    };
  }

  const effectiveDurationScale = Math.max(
    0.25,
    Math.min(3.80, baseDurationScale * competitionStretchFactor * tol.durationShrinkMultiplier)
  );

  let onsetScale = 1.0;
  let riseScale = 1.0;
  let fallScale = 1.0;

  if (directCal) {

    const compMult = Math.max(0.5, Math.min(3.0, competitionStretchFactor * tol.durationShrinkMultiplier));
    onsetScale = Math.max(0.50, Math.min(1.50, Math.pow(baseDurationScale, 0.45)));
    const usedOnsetMin = baseDur.onsetMin * onsetScale;
    const remainingTargetMin = Math.max(30, stdDurationMin * baseDurationScale * compMult - usedOnsetMin);
    const stdRiseFallMin = Math.max(20, baseDur.riseMin + baseDur.fallMin);
    const rfScale = remainingTargetMin / stdRiseFallMin;
    riseScale = Math.max(0.35, Math.min(2.50, rfScale * 0.88));
    fallScale = Math.max(0.30, Math.min(3.80, (remainingTargetMin - baseDur.riseMin * riseScale) / Math.max(15, baseDur.fallMin)));
  } else {

    riseScale = Math.max(0.55, Math.min(1.85, 0.65 + 0.35 * effectiveDurationScale));
    const targetTotalMin = stdDurationMin * effectiveDurationScale;
    const targetFallMin = Math.max(20, targetTotalMin - baseDur.onsetMin - baseDur.riseMin * riseScale);
    fallScale = Math.max(0.28, Math.min(4.00, targetFallMin / Math.max(15, baseDur.fallMin)));
  }

  let prodrugAmplitudeFactor = 1.0;
  if (pk && pk.prodrug && pk.prodrug.enzyme) {
    const prodEnzId = pk.prodrug.enzyme;
    const baseEnzAct = enzActivities[prodEnzId] !== undefined ? enzActivities[prodEnzId] : 1.0;
    const inhibLoad = comp.enzymeInhibitionMap[prodEnzId] || 0;
    const effProdAct = baseEnzAct / (1.0 + inhibLoad);
    const w = pk.prodrug.weight || 0.5;

    prodrugAmplitudeFactor = Math.max(0.20, Math.min(1.55, (1.0 - w) + w * Math.pow(effProdAct, 0.75)));
  }

  const firstPassCmaxFactor = (pk && pk.prodrug && pk.prodrug.weight >= 0.70)
    ? 1.0
    : Math.max(0.82, Math.min(1.28, Math.pow(effectiveDurationScale, 0.18)));

  const amplitudeScale = Math.max(
    0.18,
    Math.min(1.65, tol.amplitudeMultiplier * prodrugAmplitudeFactor * firstPassCmaxFactor)
  );

  const realDurationMin = Math.round(
    baseDur.onsetMin * onsetScale + baseDur.riseMin * riseScale + baseDur.fallMin * fallScale
  );
  const perceivedDurationMin = realDurationMin;
  const stdPerceivedDurationMin = stdDurationMin;

  const metaboliteTailModels = computeActiveMetaboliteTailModels(
    ing,
    pk,
    enzActivities,
    comp,
    renalStatus,
    baseDur,
    onsetScale
  );
  const hasActiveMetaboliteTail = metaboliteTailModels.length > 0;
  const maxTailEndMin = hasActiveMetaboliteTail
    ? Math.max(...metaboliteTailModels.map(m => m.tailEndMin))
    : 0;
  const maxStdTailEndMin = hasActiveMetaboliteTail
    ? Math.max(...metaboliteTailModels.map(m => m.stdTailEndMin))
    : 0;
  const metaboliteTailEndMin = Math.max(perceivedDurationMin, maxTailEndMin);
  const stdMetaboliteTailEndMin = Math.max(stdPerceivedDurationMin, maxStdTailEndMin);

  return {
    verified: Boolean(pk && pk.verified),
    pkProfile: pk,
    onsetScale: Number(onsetScale.toFixed(3)),
    riseScale: Number(riseScale.toFixed(3)),
    fallScale: Number(fallScale.toFixed(3)),
    totalDurationScale: Number((realDurationMin / Math.max(1, stdDurationMin)).toFixed(3)),
    amplitudeScale: Number(amplitudeScale.toFixed(3)),
    prodrugAmplitudeFactor: Number(prodrugAmplitudeFactor.toFixed(3)),
    competitionStretchFactor: Number(competitionStretchFactor.toFixed(3)),
    stdDurationMin,
    realDurationMin,
    stdPerceivedDurationMin,
    perceivedDurationMin,
    stdMetaboliteTailEndMin,
    metaboliteTailEndMin,
    hasActiveMetaboliteTail,
    metaboliteTailModels,
    conflicts: comp.conflicts,
    calibrationSource,
    toleranceInfo: tol,
    renalStatus
  };
}

function getActiveMetaboliteLoadAt(ingestionsList, targetTimestampMs, options) {
  const opts = options || {};
  const threshold = opts.threshold !== undefined ? parseFloat(opts.threshold) : 0.05;
  const nowRefMs = (typeof getNowTime === 'function') ? getNowTime() : Date.now();
  const targetMs = (targetTimestampMs !== undefined && targetTimestampMs !== null)
    ? targetTimestampMs
    : nowRefMs;

  const baseList = Array.isArray(ingestionsList)
    ? ingestionsList
    : (typeof ingestions !== 'undefined' && Array.isArray(ingestions) ? ingestions : []);

  const includeHistory = opts.includeMultiDayHistory !== undefined
    ? Boolean(opts.includeMultiDayHistory)
    : (!Array.isArray(ingestionsList) || (typeof ingestions !== 'undefined' && ingestionsList === ingestions));

  const candidateIngestions = [];
  const seenIds = new Set();

  function addCandidate(ingObj, dayOff) {
    if (!ingObj || !ingObj.substanceName) return;
    const key = ingObj.id !== undefined ? `id:${ingObj.id}` : null;
    if (key && seenIds.has(key)) return;
    if (key) seenIds.add(key);
    candidateIngestions.push({ ing: ingObj, dayOffset: dayOff !== undefined ? dayOff : 0 });
  }

  const currentDayOff = (typeof selectedJournalDayOffset !== 'undefined') ? selectedJournalDayOffset : 0;
  for (let i = 0; i < baseList.length; i++) {
    addCandidate(baseList[i], currentDayOff);
  }

  if (includeHistory && typeof journalDaysHistory !== 'undefined' && journalDaysHistory) {
    const dayKeys = Object.keys(journalDaysHistory).map(Number).sort((a, b) => b - a);
    for (let k = 0; k < dayKeys.length; k++) {
      const dOff = dayKeys[k];
      const dayEntry = journalDaysHistory[dOff];
      if (dayEntry && Array.isArray(dayEntry.ingestions)) {
        for (let j = 0; j < dayEntry.ingestions.length; j++) {
          addCandidate(dayEntry.ingestions[j], dOff);
        }
      }
    }
  }

  if (Array.isArray(opts.additionalHistoricalIngestions)) {
    for (let i = 0; i < opts.additionalHistoricalIngestions.length; i++) {
      addCandidate(opts.additionalHistoricalIngestions[i], -1);
    }
  }

  const flatIngestions = candidateIngestions.map(c => c.ing);
  const aggregatedByMetabolite = {};

  for (let i = 0; i < candidateIngestions.length; i++) {
    const { ing, dayOffset } = candidateIngestions[i];
    const pkMod = getPersonalizedPKModifier(ing, flatIngestions);
    if (!pkMod || !pkMod.hasActiveMetaboliteTail || !pkMod.metaboliteTailModels.length) {
      continue;
    }

    const sParent = SUBSTANCES_BY_NAME[ing.substanceName];
    const roa = (sParent && sParent.roas)
      ? (sParent.roas.find(r => r.name === (ing.route || 'oral') && r.duration) || sParent.roas.find(r => r.duration) || sParent.roas[0])
      : null;
    const baseDur = parseRoaDurationMinutes(roa);
    const baseOnsetMin = baseDur.onsetMin * (pkMod.onsetScale || 1.0);

    const d = (roa && roa.dose) ? roa.dose : {};
    const heavyRef = d.heavyMin
      || (d.strongMin ? d.strongMin * 1.35 : null)
      || (d.commonMin ? d.commonMin * 2.0 : null)
      || (d.lightMin ? d.lightMin * 4.0 : 100);
    const commonRef = d.commonMin || (d.lightMin ? d.lightMin * 2.0 : heavyRef * 0.35) || 10;

    const waves = (ing.waves && ing.waves.length > 0)
      ? ing.waves
      : [{ delayMin: 0, weight: 1.0, onsetScale: 1.0, riseScale: 1.0, plateauMin: 0, fallScale: 1.0 }];
    const totalWaveWeight = waves.reduce((acc, wv) => acc + (wv.weight || 1.0), 0) || 1.0;

    const subIntakes = (ing.intakes && ing.intakes.length > 0)
      ? ing.intakes
      : [{ dose: ing.dose || commonRef, timeOffsetMinutes: ing.timeOffsetMinutes || 0, timestamp: ing.timestamp }];

    for (let sIdx = 0; sIdx < subIntakes.length; sIdx++) {
      const subIt = subIntakes[sIdx];
      let intakeTsMs;
      if (subIt.timestamp !== undefined && subIt.timestamp !== null) {
        intakeTsMs = subIt.timestamp;
      } else if (ing.timestamp !== undefined && ing.timestamp !== null) {
        intakeTsMs = ing.timestamp;
      } else {
        intakeTsMs = nowRefMs + ((subIt.timeOffsetMinutes !== undefined ? subIt.timeOffsetMinutes : (ing.timeOffsetMinutes || 0)) * 60000);
      }

      const dtMin = (targetMs - intakeTsMs) / 60000;
      if (dtMin <= 0) continue;

      const subDose = subIt.dose || ing.dose || commonRef;
      const doseFactor = Math.max(0.25, Math.min(3.50, Math.pow(subDose / Math.max(0.001, commonRef), 0.75)));
      const isParentAcuteActiveForIntake = dtMin <= pkMod.perceivedDurationMin;

      for (let mIdx = 0; mIdx < pkMod.metaboliteTailModels.length; mIdx++) {
        const m = pkMod.metaboliteTailModels[mIdx];
        let wavePhiSum = 0;

        for (let wIdx = 0; wIdx < waves.length; wIdx++) {
          const wv = waves[wIdx];
          const wFrac = (wv.weight || 1.0) / totalWaveWeight;
          const wOnset = baseOnsetMin * (wv.onsetScale || 1.0);
          const dtFromOnset = dtMin - (wv.delayMin || 0) - wOnset;
          if (dtFromOnset > 0 && typeof evalSingleMetaboliteEnvelope === 'function') {
            wavePhiSum += wFrac * evalSingleMetaboliteEnvelope(dtFromOnset, m, false);
          }
        }

        if (wavePhiSum <= 0.001) continue;

        const contribLoad = m.effectiveActivityPeakRatio * doseFactor * wavePhiSum;
        const contribVisualTail = m.effectiveTailWeight * doseFactor * wavePhiSum;

        if (!aggregatedByMetabolite[m.name]) {
          aggregatedByMetabolite[m.name] = {
            metaboliteName: m.name,
            substance: SUBSTANCES_BY_NAME[m.name] || null,
            directUse: m.directUse,
            formationEnzyme: m.formationEnzyme,
            secondaryFormationEnzyme: m.secondaryFormationEnzyme,
            renalDependent: m.renalDependent,
            effectiveHalfLifeHours: m.effectiveHalfLifeHours,
            effectiveFormationRate: m.effectiveFormationRate,
            effectiveClearanceRate: m.effectiveClearanceRate,
            specificInteractions: m.specificInteractions || null,
            totalLoadFraction: 0,
            totalVisualTailFraction: 0,
            maxEnvelopePhi: 0,
            maxRemainingMin: 0,
            maxElapsedHours: 0,
            isParentAcuteActive: false,
            fromPriorDay: false,
            parentNamesSet: new Set(),
            parentIdsSet: new Set(),
            parentSources: []
          };
        }

        const entry = aggregatedByMetabolite[m.name];
        entry.totalLoadFraction += contribLoad;
        entry.totalVisualTailFraction += contribVisualTail;
        if (wavePhiSum > entry.maxEnvelopePhi) entry.maxEnvelopePhi = wavePhiSum;

        const remMin = Math.max(0, m.tailEndMin - dtMin);
        if (remMin > entry.maxRemainingMin) entry.maxRemainingMin = remMin;

        const elapsedH = dtMin / 60;
        if (elapsedH > entry.maxElapsedHours) entry.maxElapsedHours = elapsedH;

        if (isParentAcuteActiveForIntake) {
          entry.isParentAcuteActive = true;
        }
        if (dayOffset < currentDayOff || elapsedH >= 18) {
          entry.fromPriorDay = true;
        }

        entry.parentNamesSet.add(ing.substanceName);
        if (ing.id !== undefined) entry.parentIdsSet.add(ing.id);
        entry.parentSources.push({
          parentSubstanceName: ing.substanceName,
          parentIngestionId: ing.id,
          dayOffset,
          dose: subDose,
          unit: ing.unit || 'mg',
          intakeTimestampMs: intakeTsMs,
          elapsedHours: Number(elapsedH.toFixed(2)),
          loadFraction: Number(contribLoad.toFixed(4)),
          isParentAcuteActive: isParentAcuteActiveForIntake
        });
      }
    }
  }

  const results = [];
  for (const metName in aggregatedByMetabolite) {
    const item = aggregatedByMetabolite[metName];
    if (item.totalLoadFraction < threshold) continue;

    const parentSubstanceNames = Array.from(item.parentNamesSet);
    results.push({
      metaboliteName: item.metaboliteName,
      substance: item.substance,
      directUse: item.directUse,
      formationEnzyme: item.formationEnzyme,
      secondaryFormationEnzyme: item.secondaryFormationEnzyme,
      renalDependent: item.renalDependent,
      loadFraction: Number(item.totalLoadFraction.toFixed(4)),
      loadPct: Math.min(100, Math.round(item.totalLoadFraction * 100)),
      visualTailFraction: Number(Math.min(0.65, item.totalVisualTailFraction).toFixed(4)),
      plasmaRetentionPct: Math.min(100, Math.round(item.maxEnvelopePhi * 100)),
      effectiveHalfLifeHours: item.effectiveHalfLifeHours,
      effectiveFormationRate: item.effectiveFormationRate,
      effectiveClearanceRate: item.effectiveClearanceRate,
      remainingSignificantHours: Number((item.maxRemainingMin / 60).toFixed(1)),
      maxElapsedHours: Number(item.maxElapsedHours.toFixed(1)),
      isParentAcuteActive: item.isParentAcuteActive,
      isPostAcuteTailOnly: !item.isParentAcuteActive,
      fromPriorDay: item.fromPriorDay,
      parentSubstanceName: parentSubstanceNames[0] || null,
      parentSubstanceNames,
      parentIngestionIds: Array.from(item.parentIdsSet),
      specificInteractions: item.specificInteractions,
      parentSources: item.parentSources
    });
  }

  results.sort((a, b) => b.loadFraction - a.loadFraction);
  return results;
}
