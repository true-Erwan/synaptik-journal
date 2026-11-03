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

package com.isaakhanimann.journal.data.substances.repositories

import com.isaakhanimann.journal.data.substances.classes.SubstanceWithCategories
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class SearchRepository @Inject constructor(
    val substanceRepo: SubstanceRepository
) : SearchRepositoryInterface {

    override fun getMatchingSubstances(
        searchText: String,
        filterCategories: List<String>,
        recentlyUsedSubstanceNamesSorted: List<String>,
    ): List<SubstanceWithCategories> {
        val substancesMatchingCategories = getSubstancesMatchingCategories(filterCategories)
        val substancesFilteredWithText = getSubstancesMatchingSearchText(searchText, prefilteredSubstances = substancesMatchingCategories)
        return getSubstancesSorted(prefilteredSubstances = substancesFilteredWithText, recentlyUsedSubstanceNamesSorted = recentlyUsedSubstanceNamesSorted)
    }

    // --- NEW METHOD ADDED ---
    /**
     * A reactive version of getMatchingSubstances that returns a Flow.
     * This is ideal for observing substance data changes in a UI.
     * Note: This implementation does not include category filtering or recent-based sorting
     * for simplicity, as it's primarily used for the substance selector which needs all substances.
     *
     * @param searchText The text to filter substances by.
     * @return A Flow emitting the list of matching substances.
     */
    fun getMatchingSubstancesFlow(searchText: String): Flow<List<SubstanceWithCategories>> {
        // Assumption: substanceRepo provides a method to get all substances as a Flow.
        // This is a common pattern with Room DB.
        val allSubstancesFlow = substanceRepo.getAllSubstancesWithCategoriesFlow()

        return allSubstancesFlow.map { allSubstances ->
            // Reuse the existing text filtering logic within the flow's map operator.
            getSubstancesMatchingSearchText(searchText, allSubstances)
        }
    }

    private fun getSubstancesMatchingCategories(filterCategories: List<String>): List<SubstanceWithCategories> {
        return substanceRepo.getAllSubstancesWithCategories().filter { substanceWithCategories ->
            filterCategories.all { substanceWithCategories.substance.categories.contains(it) }
        }
    }

    /**
     * Filters substances strictly based on the primary substance name (`name`)
     * and its alternative/common/brand names (`commonNames`).
     * Formally excludes substance descriptions (summary, effectsSummary),
     * dosage remarks, and interaction texts.
     */
    private fun getSubstancesMatchingSearchText(
        searchText: String,
        prefilteredSubstances: List<SubstanceWithCategories>
    ): List<SubstanceWithCategories> {
        val trimmedSearch = searchText.trim()
        if (trimmedSearch.isEmpty()) {
            return prefilteredSubstances
        }

        fun normalize(str: String): String {
            val nfd = java.text.Normalizer.normalize(str, java.text.Normalizer.Form.NFD)
            return Regex("\\p{InCombiningDiacriticalMarks}+").replace(nfd, "")
                .replace(Regex("[- ]"), "")
                .lowercase()
        }

        val searchString = normalize(trimmedSearch)

        // 1. Primary name begins with the search query (highest priority)
        val mainPrefixMatches = prefilteredSubstances.filter { substanceWithCategories ->
            normalize(substanceWithCategories.substance.name).startsWith(searchString)
        }

        // 2. Any common/brand name begins with the search query
        val prefixMatches = prefilteredSubstances.filter { substanceWithCategories ->
            substanceWithCategories.substance.commonNames.any { name ->
                normalize(name).startsWith(searchString)
            }
        }

        // 3. Primary name or any common/brand name contains the search query
        val matches = prefilteredSubstances.filter { substanceWithCategories ->
            val allNames = listOf(substanceWithCategories.substance.name) + substanceWithCategories.substance.commonNames
            allNames.any { name ->
                normalize(name).contains(searchString)
            }
        }

        // Strictly combine matches from primary name and alias/brand names, deduplicated by substance name.
        // Descriptions (summary, effectsSummary), dosageRemarks, and interaction texts are strictly excluded.
        return (mainPrefixMatches + prefixMatches + matches).distinctBy { it.substance.name }
    }

    private fun getSubstancesSorted(
        prefilteredSubstances: List<SubstanceWithCategories>,
        recentlyUsedSubstanceNamesSorted: List<String>
    ): List<SubstanceWithCategories> {
        val recentNames = recentlyUsedSubstanceNamesSorted.distinct()
        val recentlyUsedMatches =
            recentNames.filter { recent -> prefilteredSubstances.any { it.substance.name == recent } }
                .mapNotNull {
                    substanceRepo.getSubstanceWithCategories(
                        substanceName = it
                    )
                }
        val commonSubstanceMatches =
            prefilteredSubstances.filter { sub -> sub.categories.any { cat -> cat.name == "common" } }
        return (recentlyUsedMatches + commonSubstanceMatches + prefilteredSubstances).distinctBy { it.substance.name }
    }
}