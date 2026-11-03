/*
 * Copyright (c) 2022. Isaak Hanimann.
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

package com.isaakhanimann.journal.ui.tabs.search.substance.category

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.navigation.toRoute
import com.isaakhanimann.journal.data.substances.repositories.SubstanceRepository
import com.isaakhanimann.journal.ui.main.navigation.graphs.CategoryRoute
import com.isaakhanimann.journal.ui.tabs.search.SubstanceModel
import com.isaakhanimann.journal.ui.tabs.search.SubstanceSortOrder
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class CategoryViewModel @Inject constructor(
    substanceRepo: SubstanceRepository,
    state: SavedStateHandle
) : ViewModel() {
    val categoryName = state.toRoute<CategoryRoute>().categoryName
    val category = substanceRepo.getCategory(categoryName)

    private val baseSubstances: List<SubstanceModel> =
        substanceRepo.getAllSubstancesWithCategories()
            .filter { swc ->
                swc.substance.categories.any { it.equals(categoryName, ignoreCase = true) }
            }
            .map { it.toSubstanceModel() }

    private val _sortOrderFlow = MutableStateFlow(SubstanceSortOrder.ALPHABETICAL)
    val sortOrderFlow: StateFlow<SubstanceSortOrder> = _sortOrderFlow.asStateFlow()

    fun onSortOrderChange(newSortOrder: SubstanceSortOrder) {
        viewModelScope.launch {
            _sortOrderFlow.emit(newSortOrder)
        }
    }

    val substancesInCategoryFlow: StateFlow<List<SubstanceModel>> = _sortOrderFlow.map { sortOrder ->
        when (sortOrder) {
            SubstanceSortOrder.ALPHABETICAL -> {
                baseSubstances.sortedBy { it.name.lowercase() }
            }
            SubstanceSortOrder.RELATIVE_POTENCY -> {
                baseSubstances.sortedWith(
                    compareByDescending<SubstanceModel> { it.getPotencyForCategory(categoryName) }
                        .thenBy { it.name.lowercase() }
                )
            }
        }
    }.stateIn(
        initialValue = baseSubstances.sortedBy { it.name.lowercase() },
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000)
    )
}