/*
 * Copyright (c) 2022-2023. Isaak Hanimann.
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

package com.isaakhanimann.journal.ui.tabs.journal.addingestion.interactions

import com.isaakhanimann.journal.data.substances.classes.InteractionType
import com.isaakhanimann.journal.data.substances.classes.Interactions
import com.isaakhanimann.journal.data.substances.repositories.SubstanceRepository
import javax.inject.Inject
import javax.inject.Singleton


@Singleton
class InteractionChecker @Inject constructor(
    private val substanceRepo: SubstanceRepository,
) {
    fun getInteractionBetween(aName: String, bName: String): Interaction? {
        if (aName == bName) {
            return null
        }
        val interactionFromAToB = getInteractionFromAToB(aName, bName)
        val interactionFromBToA = getInteractionFromAToB(bName, aName)
        if (interactionFromAToB != null && interactionFromBToA != null) {
            val isAtoB = interactionFromAToB.dangerCount >= interactionFromBToA.dangerCount
            val interactionType = if (isAtoB) interactionFromAToB else interactionFromBToA
            return Interaction(
                aName = aName,
                bName = bName,
                interactionType = interactionType,
            )
        } else if (interactionFromAToB != null) {
            return Interaction(
                aName = aName,
                bName = bName,
                interactionType = interactionFromAToB,
            )
        } else if (interactionFromBToA != null) {
            return Interaction(
                aName = aName,
                bName = bName,
                interactionType = interactionFromBToA,
            )
        } else {
            return null
        }
    }

    private fun getInteractionFromAToB(
        aName: String,
        bName: String,
    ): InteractionType? {
        val substanceA = substanceRepo.getSubstance(aName)
        if (substanceA != null) {
            val directInteraction = getDirectInteraction(interactions = substanceA.interactions, substanceName = bName)
            if (directInteraction != null) {
                return directInteraction
            }
            val wildcardInteraction = getWildcardInteraction(interactions = substanceA.interactions, substanceName = bName)
            if (wildcardInteraction != null) {
                return wildcardInteraction
            }
            val categoriesOfB = substanceRepo.getSubstance(bName)?.categories
                ?: getImplicitCategoriesForGroupName(bName)
            if (categoriesOfB.isNotEmpty()) {
                val classInteraction = getClassInteraction(interactions = substanceA.interactions, categories = categoriesOfB)
                if (classInteraction != null) {
                    return classInteraction
                }
            }
        }
        return null
    }

    private fun getImplicitCategoriesForGroupName(name: String): List<String> {
        return when (name) {
            "Benzodiazepines" -> listOf("benzodiazepine", "depressant")
            "Opioids" -> listOf("opioid", "depressant")
            "SSRIs" -> listOf("ssri", "antidepressant")
            "SNRIs" -> listOf("snri", "antidepressant")
            "MAOI" -> listOf("maoi", "antidepressant")
            "Tricyclic antidepressants" -> listOf("tca", "antidepressant")
            "Antihistamine" -> listOf("antihistamine")
            "NSAIDs" -> listOf("nsaid", "analgesic")
            else -> emptyList()
        }
    }

    private fun getDirectInteraction(interactions: Interactions?, substanceName: String): InteractionType? {
        if (interactions == null) {
            return null
        }
        return if (isDirectMatch(interactions.dangerous, substanceName)) {
            InteractionType.DANGEROUS
        } else if (isDirectMatch(interactions.unsafe, substanceName)) {
            InteractionType.UNSAFE
        } else if (isDirectMatch(interactions.uncertain, substanceName)) {
            InteractionType.UNCERTAIN
        } else {
            null
        }
    }

    private fun getWildcardInteraction(interactions: Interactions?, substanceName: String): InteractionType? {
        if (interactions == null) {
            return null
        }
        return if (isWildcardMatch(interactions.dangerous, substanceName)) {
            InteractionType.DANGEROUS
        } else if (isWildcardMatch(interactions.unsafe, substanceName)) {
            InteractionType.UNSAFE
        } else if (isWildcardMatch(interactions.uncertain, substanceName)) {
            InteractionType.UNCERTAIN
        } else {
            null
        }
    }

    private fun getClassInteraction(interactions: Interactions?, categories: List<String>): InteractionType? {
        if (interactions == null) {
            return null
        }
        return if (isClassMatch(interactions.dangerous, categories)) {
            InteractionType.DANGEROUS
        } else if (isClassMatch(interactions.unsafe, categories)) {
            InteractionType.UNSAFE
        } else if (isClassMatch(interactions.uncertain, categories)) {
            InteractionType.UNCERTAIN
        } else {
            null
        }
    }

    private fun isClassMatch(interactions: List<String>, categories: List<String>): Boolean {
        val extendedInteractions = extendAndCleanInteractions(interactions)
        val normalizedCategories = categories.map { normalizeCategoryName(it) }
        return normalizedCategories.any { categoryName ->
            extendedInteractions.any { interactionName ->
                matchesCategory(interactionName = interactionName, categoryName = categoryName)
            }
        }
    }

    private fun normalizeCategoryName(categoryName: String): String {
        return when (categoryName) {
            "常见的" -> "common"
            "迷幻剂" -> "psychedelic"
            "兴奋剂" -> "stimulant"
            "同感剂" -> "entactogen"
            "抑制剂" -> "depressant"
            "阿片类物质" -> "opioid"
            "易成瘾" -> "habit-forming"
            "研究性化学品" -> "research-chemical"
            "信息不确定" -> "tentative"
            "分离剂" -> "dissociative"
            "苯二氮䓬类" -> "benzodiazepine"
            "大麻素" -> "cannabinoid"
            "益智药" -> "nootropic"
            "谵妄剂" -> "deliriant"
            "巴比妥类" -> "barbiturate"
            "促醒剂" -> "eugeroic"
            "致幻剂" -> "hallucinogen"
            "致梦剂" -> "oneirogen"
            "抗精神病药" -> "antipsychotic"
            "抗抑郁药" -> "antidepressant"
            "催眠药" -> "hypnotic"
            "选择性5-羟色胺再摄取抑制剂" -> "ssri"
            "5-羟色胺和去甲肾上腺素再摄取抑制剂" -> "snri"
            "三环类抗抑郁药" -> "tca"
            "单胺氧化酶抑制剂" -> "maoi"
            "心境稳定剂" -> "mood-stabilizer"
            "抗惊厥药" -> "anticonvulsant"
            "抗焦虑药" -> "anxiolytic"
            "抗组胺药" -> "antihistamine"
            "镇痛药" -> "analgesic"
            "非甾体抗炎药" -> "nsaid"
            "曲普坦类" -> "triptan"
            "analgésique", "antalgique" -> "analgesic"
            "anti-inflammatoire", "anti-inflammatoire non stéroïdien" -> "nsaid"
            "isrs" -> "ssri"
            "irsna" -> "snri"
            "imao" -> "maoi"
            "tricyclique" -> "tca"
            "régulateur de l'humeur", "thymorégulateur" -> "mood-stabilizer"
            "antiépileptique", "anticonvulsivant" -> "anticonvulsant"
            "antipsychotique", "neuroleptique" -> "antipsychotic"
            "anxiolytique" -> "anxiolytic"
            "antihistaminique", "antihistaminique sédatif" -> "antihistamine"
            "somnifère", "hypnotique" -> "hypnotic"
            "dépresseur" -> "depressant"
            "opiacé", "opioïde" -> "opioid"
            "psychédélique" -> "psychedelic"
            "dissociatif" -> "dissociative"
            else -> categoryName
        }
    }

    private fun matchesCategory(interactionName: String, categoryName: String): Boolean {
        if (categoryName.equals("depressant", ignoreCase = true) &&
            interactionName.contains("antidepressant", ignoreCase = true)
        ) {
            return false
        }
        if (categoryName.equals("antidepressant", ignoreCase = true)) {
            return interactionName.equals("antidepressant", ignoreCase = true) ||
                interactionName.equals("antidepressants", ignoreCase = true)
        }
        if (categoryName.equals("tca", ignoreCase = true)) {
            return interactionName.equals("tca", ignoreCase = true) ||
                interactionName.equals("tcas", ignoreCase = true) ||
                interactionName.contains("tricyclic antidepressant", ignoreCase = true)
        }
        if (categoryName.equals("ssri", ignoreCase = true)) {
            return interactionName.equals("ssri", ignoreCase = true) ||
                interactionName.equals("ssris", ignoreCase = true)
        }
        if (categoryName.equals("snri", ignoreCase = true)) {
            return interactionName.equals("snri", ignoreCase = true) ||
                interactionName.equals("snris", ignoreCase = true)
        }
        if (categoryName.equals("maoi", ignoreCase = true)) {
            return interactionName.equals("maoi", ignoreCase = true) ||
                interactionName.equals("maois", ignoreCase = true)
        }
        if (categoryName.equals("nsaid", ignoreCase = true)) {
            return interactionName.equals("nsaid", ignoreCase = true) ||
                interactionName.equals("nsaids", ignoreCase = true)
        }
        if (categoryName.equals("triptan", ignoreCase = true)) {
            return interactionName.equals("triptan", ignoreCase = true) ||
                interactionName.equals("triptans", ignoreCase = true)
        }
        if (categoryName.equals("mood-stabilizer", ignoreCase = true)) {
            return interactionName.contains("mood-stabilizer", ignoreCase = true) ||
                interactionName.contains("mood stabilizer", ignoreCase = true)
        }
        return interactionName.contains(categoryName, ignoreCase = true)
    }

    private fun isWildcardMatch(interactions: List<String>, substanceName: String): Boolean {
        val extendedInteractions = extendAndCleanInteractions(interactions)
        return extendedInteractions.map { interaction ->
            Regex(
                pattern = interaction.replace(
                    oldValue = "x",
                    newValue = "[\\S]{2}",
                    ignoreCase = true
                ),
                option = RegexOption.IGNORE_CASE
            ).matches(substanceName)
        }.any { it }
    }

    private fun isDirectMatch(interactions: List<String>, substanceName: String): Boolean {
        val extendedInteractions = extendAndCleanInteractions(interactions)
        return extendedInteractions.contains(substanceName)
    }

    private fun extendAndCleanInteractions(interactions: List<String>): List<String> {
        return interactions.flatMap { name ->
            when (name) {
                "Substituted amphetamines" -> {
                    return@flatMap substitutedAmphetamines
                }
                "Serotonin releasers" -> {
                    return@flatMap serotoninReleasers
                }
                "Tricyclic antidepressants" -> {
                    return@flatMap tricyclicAntidepressants
                }
                "ALDH2 inhibitors" -> {
                    return@flatMap aldh2Inhibitors
                }
                "Hepatotoxic drugs" -> {
                    return@flatMap hepatotoxicDrugs
                }
                else -> {
                    return@flatMap listOf(name)
                }
            }
        }.distinct()
    }

    private val tricyclicAntidepressants = listOf(
        "Tricyclic antidepressants",
        "tca",
        "Amitriptyline",
        "Clomipramine",
        "Imipramine",
        "Nortriptyline",
        "Doxepin"
    )

    private val aldh2Inhibitors = listOf(
        "ALDH2 inhibitors",
        "Disulfiram"
    )

    private val hepatotoxicDrugs = listOf(
        "Hepatotoxic drugs",
        "Paracetamol",
        "Valproate",
        "Carbamazepine",
        "Agomelatine",
        "Disulfiram",
        "Naltrexone",
        "Etifoxine"
    )

    private val serotoninReleasers = listOf(
        "MDMA",
        "MDA",
        "Mephedrone",
        "4-MMC",
        "3-MMC",
        "4-CMC",
        "3-CMC",
        "4-MEC",
        "6-APB",
        "5-MAPB",
        "5-APB",
        "Methylone",
        "Eutylone",
        "4-FA",
        "PMA",
        "PMMA"
    )

    private val substitutedAmphetamines = listOf(
        "Amphetamine",
        "Dextroamphetamine",
        "Methamphetamine",
        "Ethylamphetamine",
        "Propylamphetamine",
        "Isopropylamphetamine",
        "Bromo-DragonFLY",
        "Lisdexamfetamine",
        "Clobenzorex",
        "Dimethylamphetamine",
        "Selegiline",
        "Benzphetamine",
        "Ortetamine",
        "3-Methylamphetamine",
        "4-Methylamphetamine",
        "4-MMA",
        "Xylopropamine",
        "ß-methylamphetamine",
        "3-phenylmethamphetamine",
        "2-FA",
        "2-FMA",
        "2-FEA",
        "3-FA",
        "3-FMA",
        "3-FEA",
        "Fenfluramine",
        "Norfenfluramine",
        "4-FA",
        "4-FMA",
        "4-CA",
        "4-BA",
        "4-IA",
        "DCA",
        "4-HA",
        "4-HMA",
        "3,4-DHA",
        "OMA",
        "3-MA",
        "MMMA",
        "MMA",
        "PMA",
        "PMMA",
        "PMEA",
        "4-ETA",
        "TMA-2",
        "TMA-6",
        "4-MTA",
        "5-API",
        "Cathine",
        "Phenmetrazine",
        "3-FPM",
        "Prolintane"
    )

}

data class Interaction(
    val aName: String,
    val bName: String,
    val interactionType: InteractionType,
)