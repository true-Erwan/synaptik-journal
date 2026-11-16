const DANGER_WEIGHT = {
  DANGEROUS: 3,
  UNSAFE:    2,
  UNCERTAIN: 1
};

function matchesInteractionCategory(inter, cat) {
  const il = inter.toLowerCase();
  const cl = cat.toLowerCase();

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

function testSingleDirectionInteraction(a, bNameStr, bSub) {
  if (!a || !a.interactions) return null;

  const dang = a.interactions.dangerous || [];
  const unsf = a.interactions.unsafe || [];
  const unct = a.interactions.uncertain || [];

  if (dang.includes(bNameStr)) return 'DANGEROUS';
  if (unsf.includes(bNameStr)) return 'UNSAFE';
  if (unct.includes(bNameStr)) return 'UNCERTAIN';

  const cats = (bSub && bSub.categories) || IMPLICIT_INTERACTION_CATS[bNameStr] || [];
  for (let i = 0; i < cats.length; i++) {
    const cat = cats[i];
    for (let j = 0; j < dang.length; j++) {
      if (matchesInteractionCategory(dang[j], cat)) return 'DANGEROUS';
    }
    for (let j = 0; j < unsf.length; j++) {
      if (matchesInteractionCategory(unsf[j], cat)) return 'UNSAFE';
    }
    for (let j = 0; j < unct.length; j++) {
      if (matchesInteractionCategory(unct[j], cat)) return 'UNCERTAIN';
    }
  }

  return null;
}

function getParentMetaboliteRelationship(aName, bName) {
  if (!aName || !bName || aName.toLowerCase() === bName.toLowerCase()) return null;

  const aLower = aName.toLowerCase();
  const bLower = bName.toLowerCase();

  if (typeof getSubstancePKProfile === 'function') {
    const pkA = getSubstancePKProfile(aName);
    if (pkA && Array.isArray(pkA.activeMetabolites)) {
      const matchB = pkA.activeMetabolites.find(m => m.name && m.name.toLowerCase() === bLower);
      if (matchB) {
        return {
          parentName: aName,
          metaboliteName: matchB.name,
          metaboliteSpec: matchB,
          directUse: matchB.directUse || 'endogenous_only'
        };
      }
    }

    const pkB = getSubstancePKProfile(bName);
    if (pkB && Array.isArray(pkB.activeMetabolites)) {
      const matchA = pkB.activeMetabolites.find(m => m.name && m.name.toLowerCase() === aLower);
      if (matchA) {
        return {
          parentName: bName,
          metaboliteName: matchA.name,
          metaboliteSpec: matchA,
          directUse: matchA.directUse || 'endogenous_only'
        };
      }
    }
  }

  const subA = SUBSTANCES_BY_NAME[aName];
  if (subA && subA.metaboliteMeta && Array.isArray(subA.metaboliteMeta.parentSubstances)) {
    const pMatch = subA.metaboliteMeta.parentSubstances.find(p => p.toLowerCase() === bLower);
    if (pMatch) {
      return {
        parentName: pMatch,
        metaboliteName: subA.name,
        metaboliteSpec: null,
        directUse: subA.metaboliteMeta.directUse || 'endogenous_only'
      };
    }
  }

  const subB = SUBSTANCES_BY_NAME[bName];
  if (subB && subB.metaboliteMeta && Array.isArray(subB.metaboliteMeta.parentSubstances)) {
    const pMatch = subB.metaboliteMeta.parentSubstances.find(p => p.toLowerCase() === aLower);
    if (pMatch) {
      return {
        parentName: pMatch,
        metaboliteName: subB.name,
        metaboliteSpec: null,
        directUse: subB.metaboliteMeta.directUse || 'endogenous_only'
      };
    }
  }

  return null;
}

function testMetaboliteSpecificInteraction(metSpec, targetName, targetSub) {
  if (!metSpec || !metSpec.specificInteractions || !Array.isArray(metSpec.specificInteractions.alertClasses)) {
    return null;
  }
  const spec = metSpec.specificInteractions;
  const tLower = (targetName || '').toLowerCase();
  const targetCats = (targetSub && targetSub.categories) || IMPLICIT_INTERACTION_CATS[targetName] || [];

  for (let i = 0; i < spec.alertClasses.length; i++) {
    const alertCls = spec.alertClasses[i];
    if (!alertCls) continue;
    if (alertCls.toLowerCase() === tLower) {
      return {
        type: spec.severity || 'DANGEROUS',
        noteFr: spec.noteFr || null,
        noteEn: spec.noteEn || null
      };
    }
    for (let j = 0; j < targetCats.length; j++) {
      if (matchesInteractionCategory(alertCls, targetCats[j])) {
        return {
          type: spec.severity || 'DANGEROUS',
          noteFr: spec.noteFr || null,
          noteEn: spec.noteEn || null
        };
      }
    }
  }
  return null;
}

function checkDirectInteractionOnly(aName, bName) {
  if (!aName || !bName || aName === bName) return null;

  const subA = SUBSTANCES_BY_NAME[aName];
  const subB = SUBSTANCES_BY_NAME[bName];

  const ab = testSingleDirectionInteraction(subA, bName, subB);
  const ba = testSingleDirectionInteraction(subB, aName, subA);

  let finalType = null;
  if (ab && ba) {
    finalType = DANGER_WEIGHT[ab] >= DANGER_WEIGHT[ba] ? ab : ba;
  } else {
    finalType = ab || ba;
  }

  return finalType ? { type: finalType } : null;
}

function checkInteraction(aName, bName, options) {
  if (!aName || !bName || aName === bName) return null;
  const opts = options || {};

  const rel = getParentMetaboliteRelationship(aName, bName);
  if (rel) {
    const isEndogenous = Boolean(
      opts.isEndogenousMetabolite ||
      opts.sourceA === 'endogenous_metabolism' ||
      opts.sourceB === 'endogenous_metabolism'
    );
    if (isEndogenous) {

      return null;
    }

    const directCheck = checkDirectInteractionOnly(aName, bName);
    const subParent = SUBSTANCES_BY_NAME[rel.parentName];
    const subMet = SUBSTANCES_BY_NAME[rel.metaboliteName];
    const allCats = [
      ...((subParent && subParent.categories) || []),
      ...((subMet && subMet.categories) || [])
    ].map(c => c.toLowerCase());

    let cumulSeverity = (directCheck && directCheck.type) ? directCheck.type : 'UNSAFE';
    if (
      allCats.includes('opioid') ||
      allCats.includes('maoi') ||
      rel.metaboliteName === 'O-Desmethyltramadol' ||
      rel.metaboliteName === 'Morphine' ||
      rel.metaboliteName === 'Hydromorphone' ||
      rel.metaboliteName === 'Oxymorphone' ||
      rel.metaboliteName === 'Norbuprenorphine' ||
      rel.metaboliteName === 'Noribogaine' ||
      rel.metaboliteName === 'MDA'
    ) {
      cumulSeverity = 'DANGEROUS';
    } else if (DANGER_WEIGHT[cumulSeverity] < DANGER_WEIGHT.UNSAFE) {
      cumulSeverity = 'UNSAFE';
    }

    return {
      type: cumulSeverity,
      isParentMetaboliteCumul: true,
      parentName: rel.parentName,
      metaboliteName: rel.metaboliteName,
      viaLabelFr: `cumul direct ${rel.parentName} + son métabolite actif ${rel.metaboliteName} (prise indépendante)`,
      viaLabelEn: `direct cumulative intake of ${rel.parentName} + its active metabolite ${rel.metaboliteName} (independent intake)`,
      reasonFr: `Cumul pharmacologique et redondance des récepteurs : ${rel.metaboliteName} est déjà synthétisé par votre organisme à partir de ${rel.parentName}. Une prise directe simultanée additionne les charges actives et majore le risque de surdosage.`,
      reasonEn: `Pharmacological accumulation & receptor redundancy: ${rel.metaboliteName} is already synthesized by your body from ${rel.parentName}. Simultaneous independent intake stacks active load and increases overdose risk.`
    };
  }

  const directRes = checkDirectInteractionOnly(aName, bName);
  if (opts.directOnly) {
    return directRes;
  }

  let bestRes = directRes;
  let bestWeight = directRes ? (DANGER_WEIGHT[directRes.type] || 0) : 0;

  function checkMetabolitesOfParentAgainstTarget(parentName, targetName) {
    if (typeof getSubstancePKProfile !== 'function') return;
    const pkParent = getSubstancePKProfile(parentName);
    if (!pkParent || !Array.isArray(pkParent.activeMetabolites) || pkParent.activeMetabolites.length === 0) {
      return;
    }

    const targetSub = SUBSTANCES_BY_NAME[targetName];
    for (let i = 0; i < pkParent.activeMetabolites.length; i++) {
      const metSpec = pkParent.activeMetabolites[i];
      if (!metSpec || !metSpec.name) continue;

      if (
        metSpec.name.toLowerCase() === targetName.toLowerCase() ||
        getParentMetaboliteRelationship(metSpec.name, targetName)
      ) {
        continue;
      }

      const metDirect = checkDirectInteractionOnly(metSpec.name, targetName);
      const metSpecInter = testMetaboliteSpecificInteraction(metSpec, targetName, targetSub);

      let candType = null;
      if (metDirect && metSpecInter) {
        candType = DANGER_WEIGHT[metDirect.type] >= DANGER_WEIGHT[metSpecInter.type]
          ? metDirect.type
          : metSpecInter.type;
      } else if (metDirect) {
        candType = metDirect.type;
      } else if (metSpecInter) {
        candType = metSpecInter.type;
      }

      if (!candType) continue;
      const candWeight = DANGER_WEIGHT[candType] || 0;

      if (candWeight > bestWeight) {
        bestWeight = candWeight;
        bestRes = {
          type: candType,
          viaMetabolite: true,
          metaboliteName: metSpec.name,
          parentSubstanceName: parentName,
          targetSubstanceName: targetName,
          viaLabelFr: `via métabolite actif ${metSpec.name} issu de ${parentName}`,
          viaLabelEn: `via active metabolite ${metSpec.name} from ${parentName}`,
          specificNoteFr: (metSpecInter && metSpecInter.noteFr) || (metSpec.specificInteractions && metSpec.specificInteractions.noteFr) || null,
          specificNoteEn: (metSpecInter && metSpecInter.noteEn) || (metSpec.specificInteractions && metSpec.specificInteractions.noteEn) || null
        };
      }
    }
  }

  checkMetabolitesOfParentAgainstTarget(aName, bName);
  checkMetabolitesOfParentAgainstTarget(bName, aName);

  return bestRes;
}

function evaluatePreIngestionInteractions(newSubstanceName, options) {
  if (!newSubstanceName) {
    return { worstType: null, primaryAlertMsgFr: '', primaryAlertMsgEn: '', alerts: [] };
  }

  const opts = options || {};
  const nowMs = (typeof getNowTime === 'function') ? getNowTime() : Date.now();
  const targetTsMs = (opts.targetTimestampMs !== undefined && opts.targetTimestampMs !== null)
    ? opts.targetTimestampMs
    : nowMs;
  const currentDayOff = (opts.currentDayOffset !== undefined && opts.currentDayOffset !== null)
    ? opts.currentDayOffset
    : ((typeof selectedJournalDayOffset !== 'undefined') ? selectedJournalDayOffset : 0);
  const currentList = Array.isArray(opts.currentIngestions)
    ? opts.currentIngestions
    : ((typeof ingestions !== 'undefined' && Array.isArray(ingestions)) ? ingestions : []);
  const bgSet = opts.enabledBackgroundSettings || ((typeof enabledSettings !== 'undefined') ? enabledSettings : new Set());

  const alerts = [];
  const sameDayParentAlertWeight = {};

  function pushAlert(alertObj) {
    alerts.push(alertObj);
  }

  for (let i = 0; i < currentList.length; i++) {
    const ing = currentList[i];
    if (!ing || !ing.substanceName) continue;

    const pkMod = (typeof getPersonalizedPKModifier === 'function')
      ? getPersonalizedPKModifier(ing, currentList)
      : null;
    const ingTsMs = (ing.timestamp !== undefined && ing.timestamp !== null)
      ? ing.timestamp
      : (nowMs + ((ing.timeOffsetMinutes || 0) * 60000));
    const dtMin = (targetTsMs - ingTsMs) / 60000;
    const acuteWindowMin = pkMod ? (pkMod.perceivedDurationMin * 1.15) : 360;

    if (dtMin > acuteWindowMin && pkMod && pkMod.hasActiveMetaboliteTail) {
      continue;
    }

    if (ing.substanceName.toLowerCase() === newSubstanceName.toLowerCase()) {
      continue;
    }

    const res = checkInteraction(newSubstanceName, ing.substanceName, {
      sourceA: 'user_intake',
      sourceB: ing.source || 'user_intake'
    });
    if (!res) continue;

    const w = DANGER_WEIGHT[res.type] || 0;
    sameDayParentAlertWeight[ing.substanceName] = Math.max(
      sameDayParentAlertWeight[ing.substanceName] || 0,
      w
    );

    const sevFr = res.type === 'DANGEROUS' ? 'DANGEREUSE' : (res.type === 'UNSAFE' ? 'NON SÉCURISÉE' : 'INCERTAINE');
    const sevEn = res.type === 'DANGEROUS' ? 'DANGEROUS' : (res.type === 'UNSAFE' ? 'UNSAFE' : 'UNCERTAIN');
    const isAlc = ing.substanceName.toLowerCase() === 'alcohol' || newSubstanceName.toLowerCase() === 'alcohol';

    let msgFr = '';
    let msgEn = '';

    if (res.isParentMetaboliteCumul) {
      msgFr = `⚠️ Cumul & Interaction ${sevFr} : prise directe de ${newSubstanceName} avec ${ing.substanceName} (${res.viaLabelFr}) !`;
      msgEn = `⚠️ ${sevEn} Cumulative Interaction: direct intake of ${newSubstanceName} with ${ing.substanceName} (${res.viaLabelEn})!`;
    } else if (res.viaMetabolite) {
      msgFr = `⚠️ Interaction ${sevFr} avec ${ing.substanceName} (${res.viaLabelFr}) !`;
      msgEn = `⚠️ ${sevEn} interaction with ${ing.substanceName} (${res.viaLabelEn})!`;
      if (res.specificNoteFr) msgFr += ` — ${res.specificNoteFr}`;
      if (res.specificNoteEn) msgEn += ` — ${res.specificNoteEn}`;
    } else if (isAlc) {
      msgFr = `⚠️ À risque avec l'alcool (interaction ${sevFr})`;
      msgEn = `⚠️ At risk with alcohol (${sevEn} interaction)!`;
    } else {
      msgFr = `⚠️ Interaction ${sevFr} avec ${ing.substanceName} pris(e) récemment !`;
      msgEn = `⚠️ ${sevEn} interaction with recent ${ing.substanceName} intake!`;
    }

    pushAlert({
      type: res.type,
      weight: w,
      origin: res.viaMetabolite ? 'same_day_metabolite_upgrade' : (res.isParentMetaboliteCumul ? 'parent_metabolite_user_intake' : 'same_day_parent'),
      substanceName: ing.substanceName,
      metaboliteName: res.metaboliteName || null,
      parentSubstanceName: res.parentSubstanceName || res.parentName || ing.substanceName,
      msgFr,
      msgEn
    });
  }

  if (typeof getActiveMetaboliteLoadAt === 'function') {
    const activeMets = getActiveMetaboliteLoadAt(currentList, targetTsMs, {
      threshold: 0.05,
      includeMultiDayHistory: opts.includeMultiDayHistory !== undefined ? opts.includeMultiDayHistory : true
    });

    for (let i = 0; i < activeMets.length; i++) {
      const metEntry = activeMets[i];
      if (!metEntry || !metEntry.metaboliteName) continue;

      const isNewSubTheParent = (metEntry.parentSubstanceNames || []).some(
        pName => pName.toLowerCase() === newSubstanceName.toLowerCase()
      );
      if (isNewSubTheParent) {
        continue;
      }

      let metInter = null;
      let isIndependentMetaboliteIntakeOnTopOfParent = false;

      if (newSubstanceName.toLowerCase() === metEntry.metaboliteName.toLowerCase()) {

        isIndependentMetaboliteIntakeOnTopOfParent = true;
        metInter = checkInteraction(newSubstanceName, metEntry.parentSubstanceName, {
          sourceA: 'user_intake',
          sourceB: 'user_intake'
        });
      } else {
        const directMet = checkDirectInteractionOnly(newSubstanceName, metEntry.metaboliteName);
        const specMet = testMetaboliteSpecificInteraction(
          { specificInteractions: metEntry.specificInteractions },
          newSubstanceName,
          SUBSTANCES_BY_NAME[newSubstanceName]
        );
        if (directMet && specMet) {
          metInter = DANGER_WEIGHT[directMet.type] >= DANGER_WEIGHT[specMet.type] ? directMet : specMet;
        } else {
          metInter = directMet || specMet;
        }
      }

      if (!metInter) continue;
      const wMet = DANGER_WEIGHT[metInter.type] || 0;

      const sources = metEntry.parentSources || [];
      const nonRedundantSources = sources.filter(src => {
        const alreadyAlertedWeight = sameDayParentAlertWeight[src.parentSubstanceName] || 0;
        if (src.dayOffset === currentDayOff && src.isParentAcuteActive && alreadyAlertedWeight >= wMet) {
          return false;
        }
        return true;
      });

      if (nonRedundantSources.length === 0) {
        continue;
      }

      const primarySrc = nonRedundantSources.find(s => s.dayOffset < currentDayOff) || nonRedundantSources[0];
      const alreadySameDayWeight = sameDayParentAlertWeight[primarySrc.parentSubstanceName] || 0;
      if (alreadySameDayWeight >= wMet && primarySrc.dayOffset === currentDayOff && primarySrc.isParentAcuteActive) {
        continue;
      }

      const sevFr = metInter.type === 'DANGEROUS' ? 'DANGEREUSE' : (metInter.type === 'UNSAFE' ? 'NON SÉCURISÉE' : 'INCERTAINE');
      const sevEn = metInter.type === 'DANGEROUS' ? 'DANGEROUS' : (metInter.type === 'UNSAFE' ? 'UNSAFE' : 'UNCERTAIN');

      let originFr = `issu de ${primarySrc.parentSubstanceName}`;
      let originEn = `from ${primarySrc.parentSubstanceName}`;
      if (primarySrc.dayOffset < currentDayOff) {
        const relDay = primarySrc.dayOffset - currentDayOff;
        const dayStrFr = relDay === -1 ? 'J-1 (Hier)' : `J${relDay}`;
        const dayStrEn = relDay === -1 ? 'D-1 (Yesterday)' : `D${relDay}`;
        originFr = `issu du ${primarySrc.parentSubstanceName} pris à ${dayStrFr}`;
        originEn = `from ${primarySrc.parentSubstanceName} taken at ${dayStrEn}`;
      }

      let msgFr = '';
      let msgEn = '';
      if (isIndependentMetaboliteIntakeOnTopOfParent) {
        msgFr = `⚠️ Cumul & Interaction ${sevFr} : prise directe de ${newSubstanceName} alors que ce métabolite actif est encore présent à ${metEntry.loadPct}% dans le sang (${originFr}) !`;
        msgEn = `⚠️ ${sevEn} Cumulative Interaction: direct intake of ${newSubstanceName} while this active metabolite is still at ${metEntry.loadPct}% in blood (${originEn})!`;
      } else {
        msgFr = `⚠️ Interaction ${sevFr} via métabolite actif ${metEntry.metaboliteName} (${metEntry.loadPct}% actif, ${originFr}) !`;
        msgEn = `⚠️ ${sevEn} interaction via active metabolite ${metEntry.metaboliteName} (${metEntry.loadPct}% active, ${originEn})!`;
        if (metEntry.specificInteractions && metEntry.specificInteractions.noteFr) {
          msgFr += ` — ${metEntry.specificInteractions.noteFr}`;
        }
        if (metEntry.specificInteractions && metEntry.specificInteractions.noteEn) {
          msgEn += ` — ${metEntry.specificInteractions.noteEn}`;
        }
      }

      pushAlert({
        type: metInter.type,
        weight: wMet,
        origin: primarySrc.dayOffset < currentDayOff ? 'multi_day_carryover_metabolite' : 'residual_metabolite_tail',
        substanceName: primarySrc.parentSubstanceName,
        metaboliteName: metEntry.metaboliteName,
        parentSubstanceName: primarySrc.parentSubstanceName,
        dayOffset: primarySrc.dayOffset,
        loadPct: metEntry.loadPct,
        remainingHours: metEntry.remainingSignificantHours,
        msgFr,
        msgEn
      });
    }
  }

  if (bgSet && typeof bgSet.forEach === 'function') {
    bgSet.forEach(bg => {
      const res = checkInteraction(newSubstanceName, bg);
      if (!res) return;
      const w = DANGER_WEIGHT[res.type] || 0;
      const sevFr = res.type === 'DANGEROUS' ? 'DANGEREUSE' : (res.type === 'UNSAFE' ? 'NON SÉCURISÉE' : 'INCERTAINE');
      const sevEn = res.type === 'DANGEROUS' ? 'DANGEROUS' : (res.type === 'UNSAFE' ? 'UNSAFE' : 'UNCERTAIN');

      let msgFr = '';
      let msgEn = '';
      if (bg === 'Alcohol' || newSubstanceName.toLowerCase() === 'alcohol') {
        msgFr = `⚠️ À risque avec l'alcool (interaction ${sevFr}${res.viaMetabolite ? ` ${res.viaLabelFr}` : ''})`;
        msgEn = `⚠️ At risk with alcohol (${sevEn} interaction${res.viaMetabolite ? ` ${res.viaLabelEn}` : ''})!`;
      } else {
        msgFr = `⚠️ Interaction ${sevFr} avec votre traitement de fond : ${bg}${res.viaMetabolite ? ` (${res.viaLabelFr})` : ''} !`;
        msgEn = `⚠️ ${sevEn} interaction with background therapy: ${bg}${res.viaMetabolite ? ` (${res.viaLabelEn})` : ''}!`;
      }

      pushAlert({
        type: res.type,
        weight: w,
        origin: 'background_setting',
        substanceName: bg,
        metaboliteName: res.metaboliteName || null,
        parentSubstanceName: res.parentSubstanceName || null,
        msgFr,
        msgEn
      });
    });
  }

  if (alerts.length === 0) {
    return { worstType: null, primaryAlertMsgFr: '', primaryAlertMsgEn: '', alerts: [] };
  }

  alerts.sort((a, b) => b.weight - a.weight);
  const top = alerts[0];

  return {
    worstType: top.type,
    primaryAlertMsgFr: top.msgFr,
    primaryAlertMsgEn: top.msgEn,
    alerts
  };
}
