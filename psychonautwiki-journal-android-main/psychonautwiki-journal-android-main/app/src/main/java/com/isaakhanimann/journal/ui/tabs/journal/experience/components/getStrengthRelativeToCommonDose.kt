/*
 * Copyright (c) 2023. Isaak Hanimann.
 * This file is part of PsychonautWiki Journal.
 *
 * PsychonautWiki Journal is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or (at
 * your option) any later version.
 *
 * PsychonautWiki Journal is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with PsychonautWiki Journal.  If not, see https://www.gnu.org/licenses/gpl-3.0.en.html.
 */

package com.isaakhanimann.journal.ui.tabs.journal.experience.components

import com.isaakhanimann.journal.data.room.experiences.relations.IngestionWithCompanionAndCustomUnit
import com.isaakhanimann.journal.data.substances.classes.Substance
import com.isaakhanimann.journal.data.substances.classes.roa.RoaDose
import kotlin.math.log10
import kotlin.math.max

private val MILD_PERIPHERAL_POWER_FACTORS = mapOf(
    "paracetamol" to 0.18,
    "acetaminophen" to 0.18,
    "phloroglucinol" to 0.12,
    "aspirin" to 0.18,
    "ibuprofen" to 0.22,
    "ketoprofen" to 0.25,
    "naproxen" to 0.23,
    "diclofenac" to 0.23,
    "metamizole" to 0.24,
    "celecoxib" to 0.22,
    "meloxicam" to 0.22,
    "piroxicam" to 0.22,
    "mefenamic acid" to 0.20,
    "tiaprofenic acid" to 0.21,
    "flurbiprofen" to 0.22,
    "aceclofenac" to 0.22,
    "etoricoxib" to 0.23,
    "prednisolone" to 0.20,
    "prednisone" to 0.20,
    "methylprednisolone" to 0.20,
    "dexamethasone" to 0.22,
    "betamethasone" to 0.22,
    "propranolol" to 0.22,
    "nefopam" to 0.42,
    "caffeine" to 0.28
)

fun getSubstancePharmacologicalPowerFactor(substance: Substance?): Double {
    if (substance == null) return 0.85
    val nameLower = substance.name.lowercase()
    MILD_PERIPHERAL_POWER_FACTORS[nameLower]?.let { return it }

    val cats = substance.categories.map { it.lowercase() }
    if (cats.contains("nsaid") || cats.contains("corticosteroid") || cats.contains("antispasmodic")) {
        return 0.22
    }
    if (cats.contains("triptan") || cats.contains("nootropic")) {
        return 0.32
    }
    if (cats.contains("antidepressant") && !cats.contains("opioid") && !cats.contains("stimulant")) {
        return 0.28
    }

    val potency = substance.relativePotency.coerceAtLeast(0.05)
    return (1.05 + 0.12 * log10(potency)).coerceIn(0.65, 1.35)
}

fun getStrengthRelativeToCommonDose(
    ingestion: IngestionWithCompanionAndCustomUnit,
    allIngestions: List<IngestionWithCompanionAndCustomUnit>,
    roaDose: RoaDose?,
    substance: Substance? = null,
): Double {
    val allKnownDoses = allIngestions
        .filter { it.ingestion.substanceName == ingestion.ingestion.substanceName && it.ingestion.administrationRoute == ingestion.ingestion.administrationRoute }
        .mapNotNull { it.pureDose }
    val sumDose = allKnownDoses.reduceOrNull { acc, d -> acc + d } ?: 0.0
    val averageDose = sumDose / max(1.0, allKnownDoses.size.toDouble())

    val powerFactor = getSubstancePharmacologicalPowerFactor(substance)
    val doseSnap = ingestion.pureDose ?: return (0.5 * powerFactor).coerceAtLeast(0.08)

    if (roaDose == null) {
        val ref = averageDose.takeIf { it > 0.0 } ?: 1.0
        return ((doseSnap / ref).coerceIn(0.1, 1.3) * powerFactor).coerceAtLeast(0.06)
    }

    val light = roaDose.lightMin ?: (roaDose.commonMin?.times(0.5)) ?: 5.0
    val thr = (roaDose.lightMin?.times(0.5)) ?: (light * 0.5)
    val common = roaDose.commonMin ?: (light * 2.0)
    val strong = roaDose.strongMin ?: (common * 1.8)
    val heavy = roaDose.heavyMin ?: (strong * 1.4)

    val tierResponse = when {
        doseSnap <= 0.0 -> 0.0
        doseSnap <= thr -> 0.42 * (doseSnap / max(0.001, thr))
        doseSnap <= light -> 0.42 + 0.14 * ((doseSnap - thr) / max(0.001, light - thr))
        doseSnap <= common -> 0.56 + 0.18 * ((doseSnap - light) / max(0.001, common - light))
        doseSnap <= strong -> 0.74 + 0.14 * ((doseSnap - common) / max(0.001, strong - common))
        doseSnap <= heavy -> 0.88 + 0.12 * ((doseSnap - strong) / max(0.001, heavy - strong))
        else -> (1.00 + 0.25 * ((doseSnap - heavy) / max(0.001, heavy))).coerceAtMost(1.35)
    }

    return (tierResponse * powerFactor).coerceAtLeast(0.06)
}
