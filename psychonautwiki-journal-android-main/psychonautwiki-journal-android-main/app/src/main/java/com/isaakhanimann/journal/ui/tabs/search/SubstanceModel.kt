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

package com.isaakhanimann.journal.ui.tabs.search

enum class SubstanceSortOrder(val label: String) {
    ALPHABETICAL("Alphabétique (A-Z)"),
    RELATIVE_POTENCY("Puissance relative")
}

data class SubstanceModel(
    val name: String,
    val commonNames: List<String>,
    val categories: List<CategoryModel>,
    val hasSaferUse: Boolean,
    val hasInteractions: Boolean,
    val relativePotency: Double = 1.0,
    val classPotencies: Map<String, Double> = emptyMap(),
) {
    fun getPotencyForCategory(categoryName: String?): Double {
        if (categoryName != null) {
            classPotencies[categoryName.lowercase()]?.let { return it }
        }
        return relativePotency
    }
}