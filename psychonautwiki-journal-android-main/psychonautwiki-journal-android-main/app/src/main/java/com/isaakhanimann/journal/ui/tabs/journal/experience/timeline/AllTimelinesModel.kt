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

package com.isaakhanimann.journal.ui.tabs.journal.experience.timeline

import com.isaakhanimann.journal.data.room.experiences.entities.SubstanceColor
import com.isaakhanimann.journal.data.substances.classes.roa.RoaDuration
import com.isaakhanimann.journal.ui.tabs.journal.experience.components.DataForOneEffectLine
import com.isaakhanimann.journal.ui.tabs.journal.experience.timeline.drawables.AxisDrawable
import com.isaakhanimann.journal.ui.tabs.journal.experience.timeline.drawables.GroupDrawable
import java.time.Duration
import java.time.Instant
import kotlin.math.max
import kotlin.time.Duration.Companion.hours
import kotlin.time.Duration.Companion.minutes

class AllTimelinesModel(
    val dataForLines: List<DataForOneEffectLine>,
    val dataForRatings: List<DataForOneRating>,
    val timedNotes: List<DataForOneTimedNote>,
    val areSubstanceHeightsIndependent: Boolean,
) {
    fun copy(
        dataForLines: List<DataForOneEffectLine> = this.dataForLines,
        dataForRatings: List<DataForOneRating> = this.dataForRatings,
        timedNotes: List<DataForOneTimedNote> = this.timedNotes,
        areSubstanceHeightsIndependent: Boolean = this.areSubstanceHeightsIndependent,
    ): AllTimelinesModel = AllTimelinesModel(
        dataForLines = dataForLines,
        dataForRatings = dataForRatings,
        timedNotes = timedNotes,
        areSubstanceHeightsIndependent = areSubstanceHeightsIndependent
    )
    val startTime: Instant
    val widthInSeconds: Float
    val groupDrawables: List<GroupDrawable>
    val axisDrawable: AxisDrawable

    data class RoaGroup(
        val color: SubstanceColor,
        val roaDuration: RoaDuration?,
        val weightedLines: List<WeightedLine>
    )

    init {
        val ratingTimes = dataForRatings.map { it.time }
        val ingestionTimes = dataForLines.map { it.startTime }
        val noteTimes = timedNotes.mapNotNull { it.time }
        val allStartTimeCandidates = ratingTimes + ingestionTimes + noteTimes
        startTime =
            allStartTimeCandidates.reduceOrNull { acc, date -> if (acc.isBefore(date)) acc else date } ?: Instant.now()
        val roaGroups = dataForLines.groupBy { it.substanceName }
            .map { substanceGroup ->
                val linesPerSubstance = substanceGroup.value
                RoaGroup(
                    color = linesPerSubstance.first().color,
                    roaDuration = linesPerSubstance.firstOrNull { it.roaDuration != null }?.roaDuration,
                    weightedLines = linesPerSubstance.map {
                        WeightedLine(
                            startTime = it.startTime,
                            endTime = it.endTime,
                            horizontalWeight = it.horizontalWeight,
                            height = it.height
                        )
                    }
                )
            }
        val groupDrawables = roaGroups.map { group ->
            GroupDrawable(
                startTimeGraph = startTime,
                color = group.color,
                roaDuration = group.roaDuration,
                weightedLines = group.weightedLines,
                areSubstanceHeightsIndependent = areSubstanceHeightsIndependent
            )
        }
        val maxGroupHeight = (groupDrawables.maxOfOrNull { it.nonNormalisedHeight } ?: 1f).coerceAtLeast(0.01f)
        val overallMaxHeight = maxGroupHeight
        groupDrawables.forEach { it.normaliseHeight(overallMaxHeight) }
        this.groupDrawables = groupDrawables
        val maxWidthOfGroups: Float = groupDrawables.maxOfOrNull {
            it.endOfLineRelativeToStartInSeconds
        } ?: 0f
        val latestRating = ratingTimes.maxOrNull()
        val maxWidthRating: Float = if (latestRating != null) {
            Duration.between(startTime, latestRating).seconds.toFloat()
        } else {
            0f
        }
        val latestNote = noteTimes.maxOrNull()
        val maxWidthNote: Float = if (latestNote != null) {
            Duration.between(startTime, latestNote).seconds.toFloat()
        } else {
            0f
        }
        val maxCandidates = listOf(
            maxWidthOfGroups,
            maxWidthRating,
            maxWidthNote,
            2.hours.inWholeSeconds.toFloat()
        )
        widthInSeconds = maxCandidates.max() + 10.minutes.inWholeSeconds.toFloat()
        axisDrawable = AxisDrawable(startTime, widthInSeconds)
    }
}