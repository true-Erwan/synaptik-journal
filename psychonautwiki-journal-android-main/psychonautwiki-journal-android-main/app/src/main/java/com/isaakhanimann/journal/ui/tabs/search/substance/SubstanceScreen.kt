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

package com.isaakhanimann.journal.ui.tabs.search.substance

import android.content.res.Configuration.UI_MODE_NIGHT_YES
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material.icons.filled.GppBad
import androidx.compose.material.icons.filled.Update
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material.icons.outlined.Info
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.tooling.preview.PreviewParameter
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.isaakhanimann.journal.R
import com.isaakhanimann.journal.data.room.experiences.entities.CustomUnit
import com.isaakhanimann.journal.data.substances.AdministrationRoute
import com.isaakhanimann.journal.data.substances.classes.Category
import com.isaakhanimann.journal.data.substances.classes.SubstanceWithCategories
import com.isaakhanimann.journal.data.substances.classes.Substance
import com.isaakhanimann.journal.ui.DOSE_DISCLAIMER
import com.isaakhanimann.journal.ui.FULL_STOMACH_DISCLAIMER
import com.isaakhanimann.journal.ui.tabs.journal.addingestion.dose.ChasingTheDragonText
import com.isaakhanimann.journal.ui.tabs.journal.addingestion.dose.OptionalDosageUnitDisclaimer
import com.isaakhanimann.journal.ui.tabs.journal.addingestion.dose.customunit.CustomUnitRoaDoseView
import com.isaakhanimann.journal.ui.tabs.journal.addingestion.time.TimePickerButton
import com.isaakhanimann.journal.ui.tabs.journal.experience.TimelineDisplayOption
import com.isaakhanimann.journal.ui.tabs.journal.experience.components.TimeDisplayOption
import com.isaakhanimann.journal.ui.tabs.journal.experience.timeline.AllTimelines
import com.isaakhanimann.journal.ui.tabs.search.substance.roa.ToleranceSection
import com.isaakhanimann.journal.ui.tabs.search.substance.roa.dose.RoaDoseView
import com.isaakhanimann.journal.ui.tabs.search.substance.roa.duration.RoaDurationView
import com.isaakhanimann.journal.ui.tabs.search.substance.roa.toReadableString
import com.isaakhanimann.journal.ui.theme.JournalTheme
import com.isaakhanimann.journal.ui.theme.horizontalPadding
import com.isaakhanimann.journal.ui.theme.verticalPaddingCards
import com.isaakhanimann.journal.ui.utils.getShortTimeText
import java.time.LocalDateTime
import java.time.temporal.ChronoUnit
import kotlin.math.absoluteValue

@Composable
fun SubstanceScreen(
    navigateToDosageExplanationScreen: () -> Unit,
    navigateToSaferHallucinogensScreen: () -> Unit,
    navigateToSaferStimulantsScreen: () -> Unit,
    navigateToVolumetricDosingScreen: () -> Unit,
    navigateToExplainTimeline: () -> Unit,
    navigateToCategoryScreen: (categoryName: String) -> Unit,
    viewModel: SubstanceViewModel = hiltViewModel()
) {
    SubstanceScreen(
        timelineDisplayOption = viewModel.timelineDisplayOptionFlow.collectAsState().value,
        ingestionTime = viewModel.ingestionTimeFlow.collectAsState().value,
        onChangeIngestionTime = viewModel::changeIngestionTime,
        navigateToDosageExplanationScreen = navigateToDosageExplanationScreen,
        navigateToSaferHallucinogensScreen = navigateToSaferHallucinogensScreen,
        navigateToSaferStimulantsScreen = navigateToSaferStimulantsScreen,
        navigateToVolumetricDosingScreen = navigateToVolumetricDosingScreen,
        navigateToCategoryScreen = navigateToCategoryScreen,
        navigateToExplainTimeline = navigateToExplainTimeline,
        substanceWithCategories = viewModel.substanceWithCategories,
        customUnits = viewModel.customUnitsFlow.collectAsState().value,
    )
}

@Preview(uiMode = UI_MODE_NIGHT_YES)
@Composable
fun SubstanceScreenPreview(
    @PreviewParameter(SubstanceWithCategoriesPreviewProvider::class) substanceWithCategories: SubstanceWithCategories
) {
    JournalTheme {
        SubstanceScreen(
            timelineDisplayOption = TimelineDisplayOption.Loading,
            ingestionTime = LocalDateTime.now(),
            onChangeIngestionTime = {},
            navigateToDosageExplanationScreen = {},
            navigateToSaferHallucinogensScreen = {},
            navigateToSaferStimulantsScreen = {},
            navigateToVolumetricDosingScreen = {},
            navigateToExplainTimeline = {},
            navigateToCategoryScreen = {},
            substanceWithCategories = substanceWithCategories,
            customUnits = listOf(
                CustomUnit.mdmaSample
            ),
        )
    }
}

@OptIn(ExperimentalMaterial3Api::class, ExperimentalLayoutApi::class)
@Composable
fun SubstanceScreen(
    timelineDisplayOption: TimelineDisplayOption,
    ingestionTime: LocalDateTime,
    onChangeIngestionTime: (LocalDateTime) -> Unit,
    navigateToDosageExplanationScreen: () -> Unit,
    navigateToSaferHallucinogensScreen: () -> Unit,
    navigateToSaferStimulantsScreen: () -> Unit,
    navigateToVolumetricDosingScreen: () -> Unit,
    navigateToExplainTimeline: () -> Unit,
    navigateToCategoryScreen: (categoryName: String) -> Unit,
    substanceWithCategories: SubstanceWithCategories,
    customUnits: List<CustomUnit>
) {
    val substance = substanceWithCategories.substance
    val uriHandler = LocalUriHandler.current
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(substance.name) },
                actions = {
                    TextButton(
                        onClick = { uriHandler.openUri(substance.url) },
                    ) {
                        Text(stringResource(R.string.article))
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .verticalScroll(rememberScrollState())
                .padding(padding)
        ) {
            if (!substance.isApproved) {
                ElevatedCard(
                    modifier = Modifier
                        .padding(
                            horizontal = horizontalPadding,
                            vertical = verticalPaddingCards
                        )
                        .fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier.padding(
                            vertical = 5.dp,
                            horizontal = horizontalPadding
                        )
                    ) {
                        Icon(imageVector = Icons.Default.GppBad, contentDescription = "Verified")
                        Spacer(Modifier.size(ButtonDefaults.IconSpacing))
                        Text(text = stringResource(R.string.info_is_not_approved))
                    }
                }
            }
            val categories = substanceWithCategories.categories
            if (substance.summary != null || categories.isNotEmpty()) {
                VerticalSpace()
                ElevatedCard(
                    modifier = Modifier.padding(
                        horizontal = horizontalPadding,
                        vertical = verticalPaddingCards
                    )
                ) {
                    Column(
                        modifier = Modifier
                            .padding(
                                horizontal = horizontalPadding,
                                vertical = 10.dp
                            )
                            .fillMaxWidth()
                    ) {
                        if (substance.summary != null) {
                            Text(text = substance.summary)
                            VerticalSpace()
                        }
                        FlowRow(
                            horizontalArrangement = Arrangement.spacedBy(5.dp),
                            verticalArrangement = Arrangement.spacedBy(5.dp),
                        ) {
                            categories.forEach { category ->
                                CategoryChipFromSubstanceScreen(category, navigateToCategoryScreen)
                            }
                        }
                    }
                }
            }
            val availableRoas = substance.roas
            var selectedRoaRoute by remember(substance.name) {
                mutableStateOf(
                    availableRoas.firstOrNull { it.route == AdministrationRoute.ORAL }?.route
                        ?: availableRoas.firstOrNull()?.route
                        ?: AdministrationRoute.ORAL
                )
            }

            if (availableRoas.size > 1) {
                VerticalSpace()
                ElevatedCard(
                    modifier = Modifier
                        .padding(
                            horizontal = horizontalPadding,
                            vertical = verticalPaddingCards
                        )
                        .fillMaxWidth()
                ) {
                    Column(
                        modifier = Modifier
                            .padding(horizontal = horizontalPadding, vertical = 10.dp)
                            .fillMaxWidth()
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(
                                text = stringResource(R.string.administration_route),
                                style = MaterialTheme.typography.titleMedium,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                            Surface(
                                shape = CircleShape,
                                color = MaterialTheme.colorScheme.surfaceVariant,
                                modifier = Modifier.padding(start = 8.dp)
                            ) {
                                Text(
                                    text = "${availableRoas.size} routes",
                                    style = MaterialTheme.typography.labelSmall,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                                )
                            }
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                        FlowRow(
                            horizontalArrangement = Arrangement.spacedBy(6.dp),
                            verticalArrangement = Arrangement.spacedBy(6.dp),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            availableRoas.forEach { roa ->
                                val isSelected = roa.route == selectedRoaRoute
                                val routeColor = roa.route.color.getComposeColor(isSystemInDarkTheme())
                                Surface(
                                    shape = CircleShape,
                                    color = if (isSelected) routeColor.copy(alpha = 0.20f) else MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.40f),
                                    border = if (isSelected) androidx.compose.foundation.BorderStroke(1.5.dp, routeColor) else null,
                                    modifier = Modifier
                                        .clip(CircleShape)
                                        .clickable { selectedRoaRoute = roa.route }
                                ) {
                                    Row(
                                        verticalAlignment = Alignment.CenterVertically,
                                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                                    ) {
                                        Surface(
                                            shape = CircleShape,
                                            color = routeColor,
                                            modifier = Modifier.size(8.dp)
                                        ) {}
                                        Spacer(modifier = Modifier.width(6.dp))
                                        Text(
                                            text = roa.route.displayText,
                                            style = MaterialTheme.typography.labelMedium,
                                            fontWeight = if (isSelected) androidx.compose.ui.text.font.FontWeight.Bold else androidx.compose.ui.text.font.FontWeight.Normal,
                                            color = if (isSelected) MaterialTheme.colorScheme.onSurface else MaterialTheme.colorScheme.onSurfaceVariant
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }

            val roasWithDosesDefined = substance.roas.filter { roa ->
                val roaDose = roa.roaDose
                val isEveryDoseNull =
                    roaDose?.lightMin == null && roaDose?.commonMin == null && roaDose?.strongMin == null && roaDose?.heavyMin == null
                return@filter !isEveryDoseNull
            }
            if (roasWithDosesDefined.isNotEmpty()) {
                SectionWithTitle(title = stringResource(R.string.dosage)) {
                    Column(Modifier.padding(horizontal = horizontalPadding)) {
                        val activeDoseRoa = roasWithDosesDefined.find { it.route == selectedRoaRoute } ?: roasWithDosesDefined.firstOrNull()
                        val roasToDisplay = if (activeDoseRoa != null) listOf(activeDoseRoa) else roasWithDosesDefined
                        roasToDisplay.forEach { roa ->
                            Column(
                                modifier = Modifier.padding(vertical = 5.dp)
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    RouteColorCircle(roa.route)
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Text(
                                        text = roa.route.displayText,
                                        style = MaterialTheme.typography.titleMedium
                                    )
                                    val bio = roa.bioavailability
                                    if (bio != null) {
                                        Spacer(modifier = Modifier.weight(1f))
                                        Text(
                                            text = stringResource(
                                                R.string.bioavailability,
                                                bio.min?.toReadableString() ?: "..",
                                                bio.max?.toReadableString() ?: ".."
                                            ),
                                            style = MaterialTheme.typography.bodySmall,
                                            color = MaterialTheme.colorScheme.onSurfaceVariant
                                        )
                                    }
                                }
                                if (roa.roaDose == null) {
                                    Text(text = stringResource(R.string.no_dosage_info))
                                } else {
                                    RoaDoseView(roaDose = roa.roaDose)
                                }
                                roa.roaDose?.let { roaDose ->
                                    val customUnitsForRoute =
                                        customUnits.filter { it.administrationRoute == roa.route && it.dose != null }
                                    customUnitsForRoute.forEach { customUnit ->
                                        Text(
                                            text = customUnit.name,
                                            style = MaterialTheme.typography.titleSmall
                                        )
                                        CustomUnitRoaDoseView(
                                            roaDose = roaDose,
                                            customUnit = customUnit
                                        )
                                    }
                                }
                                if (roa.route == AdministrationRoute.SMOKED && substance.name != "Cannabis") {
                                    Spacer(modifier = Modifier.height(5.dp))
                                    ChasingTheDragonText(
                                        titleStyle = MaterialTheme.typography.titleMedium
                                    )
                                }
                            }
                            HorizontalDivider()
                        }
                        VerticalSpace()
                        OptionalDosageUnitDisclaimer(substance.name)
                        Text(text = DOSE_DISCLAIMER)
                        VerticalSpace()
                        if (substance.roas.any { it.roaDose?.shouldUseVolumetricDosing == true }) {
                            HorizontalDivider()
                            TextButton(onClick = navigateToVolumetricDosingScreen) {
                                Icon(
                                    Icons.Outlined.Info,
                                    contentDescription = "Info",
                                    modifier = Modifier.size(ButtonDefaults.IconSize)
                                )
                                Spacer(Modifier.size(ButtonDefaults.IconSpacing))
                                Text(stringResource(R.string.volumetric_dosing))
                            }
                        }
                        HorizontalDivider()
                        TextButton(onClick = navigateToDosageExplanationScreen) {
                            Icon(
                                Icons.Outlined.Info,
                                contentDescription = "Info",
                                modifier = Modifier.size(ButtonDefaults.IconSize)
                            )
                            Spacer(Modifier.size(ButtonDefaults.IconSpacing))
                            Text(stringResource(R.string.dosage_classification))
                        }

                    }
                }
            }
            if (substance.tolerance != null || substance.crossTolerances.isNotEmpty()) {
                SectionWithTitle(title = stringResource(R.string.tolerance)) {
                    Column {
                        VerticalSpace()
                        ToleranceSection(
                            tolerance = substance.tolerance,
                            crossTolerances = substance.crossTolerances,
                            modifier = Modifier.padding(horizontal = horizontalPadding)
                        )
                        VerticalSpace()
                    }
                }
            }
            if (substance.toxicities.isNotEmpty()) {
                SectionWithTitle(title = stringResource(R.string.toxicity)) {
                    Column {
                        VerticalSpace()
                        if (substance.toxicities.size == 1) {
                            Text(
                                substance.toxicities.firstOrNull() ?: "",
                                modifier = Modifier.padding(horizontal = horizontalPadding)
                            )
                        } else {
                            BulletPoints(
                                points = substance.toxicities,
                                modifier = Modifier.padding(horizontal = horizontalPadding)
                            )
                        }
                        VerticalSpace()
                    }
                }
            }
            val roasWithDurationsDefined = substance.roas.filter { roa ->
                val roaDuration = roa.roaDuration
                val isEveryDurationNull =
                    roaDuration?.onset == null && roaDuration?.comeup == null && roaDuration?.peak == null && roaDuration?.offset == null && roaDuration?.total == null
                return@filter !isEveryDurationNull
            }
            if (roasWithDurationsDefined.isNotEmpty()) {
                SectionWithTitle(title = stringResource(R.string.duration)) {
                    Column(Modifier.padding(horizontal = horizontalPadding)) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            Text(stringResource(R.string.start_time))
                            Spacer(modifier = Modifier.width(5.dp))
                            TimePickerButton(
                                localDateTime = ingestionTime,
                                onChange = onChangeIngestionTime,
                                timeString = ingestionTime.getShortTimeText(),
                                hasOutline = false,
                            )
                            val isTimeALotDifferentToNow = ChronoUnit.MINUTES.between(
                                ingestionTime,
                                LocalDateTime.now()
                            ).absoluteValue > 5
                            Spacer(modifier = Modifier.width(5.dp))
                            AnimatedVisibility(visible = isTimeALotDifferentToNow) {
                                IconButton(onClick = { onChangeIngestionTime(LocalDateTime.now()) }) {
                                    Icon(
                                        imageVector = Icons.Default.Update,
                                        contentDescription = "Reset to now"
                                    )
                                }
                            }
                            Spacer(modifier = Modifier.weight(1f))
                            IconButton(onClick = navigateToExplainTimeline) {
                                Icon(
                                    imageVector = Icons.Outlined.Info,
                                    contentDescription = "Timeline disclaimer"
                                )
                            }
                        }
                        VerticalSpace()
                        when (timelineDisplayOption) {
                            TimelineDisplayOption.Hidden -> {}
                            TimelineDisplayOption.Loading -> LinearProgressIndicator(modifier = Modifier.fillMaxWidth())
                            TimelineDisplayOption.NotWorthDrawing -> {}
                            is TimelineDisplayOption.Shown -> {
                                val timelineModel = timelineDisplayOption.allTimelinesModel
                                val filteredLines = timelineModel.dataForLines.filter { it.route == selectedRoaRoute }
                                val singleRoaModel = timelineModel.copy(
                                    dataForLines = if (filteredLines.isNotEmpty()) filteredLines else timelineModel.dataForLines
                                )
                                AllTimelines(
                                    model = singleRoaModel,
                                    isShowingCurrentTime = false,
                                    timeDisplayOption = TimeDisplayOption.RELATIVE_TO_NOW,
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .height(200.dp)
                                )
                                Spacer(modifier = Modifier.height(8.dp))
                                FlowRow(
                                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                                    verticalArrangement = Arrangement.spacedBy(6.dp),
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    roasWithDurationsDefined.forEach { roa ->
                                        val isSelectedInTimeline = roa.route == selectedRoaRoute
                                        val routeColor = roa.route.color.getComposeColor(isSystemInDarkTheme())
                                        Row(
                                            verticalAlignment = Alignment.CenterVertically,
                                            modifier = Modifier
                                                .clip(CircleShape)
                                                .background(
                                                    if (isSelectedInTimeline) routeColor.copy(alpha = 0.25f)
                                                    else MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.40f)
                                                )
                                                .clickable { selectedRoaRoute = roa.route }
                                                .padding(horizontal = 10.dp, vertical = 4.dp)
                                        ) {
                                            Surface(
                                                shape = CircleShape,
                                                color = routeColor,
                                                modifier = Modifier.size(10.dp)
                                            ) {}
                                            Spacer(modifier = Modifier.width(6.dp))
                                            Text(
                                                text = roa.route.displayText,
                                                style = MaterialTheme.typography.labelMedium,
                                                fontWeight = if (isSelectedInTimeline) androidx.compose.ui.text.font.FontWeight.Bold else androidx.compose.ui.text.font.FontWeight.Normal
                                            )
                                        }
                                    }
                                }
                            }
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                        HorizontalDivider()
                        val activeDurRoa = roasWithDurationsDefined.find { it.route == selectedRoaRoute } ?: roasWithDurationsDefined.firstOrNull()
                        val roasDurToDisplay = if (activeDurRoa != null) listOf(activeDurRoa) else roasWithDurationsDefined
                        roasDurToDisplay.forEachIndexed { index, roa ->
                            Column(
                                modifier = Modifier.padding(
                                    vertical = 5.dp,
                                )
                            ) {
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                ) {
                                    RouteColorCircle(roa.route)
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Text(
                                        text = roa.route.displayText,
                                        style = MaterialTheme.typography.titleMedium
                                    )
                                }
                                val roaDuration = roa.roaDuration
                                if (roaDuration == null) {
                                    Text(text = stringResource(R.string.no_duration_info))
                                } else {
                                    Spacer(modifier = Modifier.height(3.dp))
                                    RoaDurationView(roaDuration = roaDuration)
                                    if (roa.route == AdministrationRoute.ORAL) {
                                        Text(
                                            text = FULL_STOMACH_DISCLAIMER,
                                            style = MaterialTheme.typography.bodySmall
                                        )
                                    }
                                }
                            }
                            if (index < roasWithDurationsDefined.size - 1) {
                                HorizontalDivider()
                            }
                        }
                        VerticalSpace()
                    }
                }
            }
            if (substance.dosageRemark != null) {
                ElevatedCard(
                    modifier = Modifier
                        .padding(
                            horizontal = horizontalPadding,
                            vertical = verticalPaddingCards
                        )
                        .fillMaxWidth()
                ) {
                    Column(
                        modifier = Modifier
                            .padding(
                                horizontal = horizontalPadding,
                                vertical = 10.dp
                            )
                            .fillMaxWidth()
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Default.Warning,
                                contentDescription = "Warning",
                                tint = MaterialTheme.colorScheme.error,
                                modifier = Modifier.size(20.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = stringResource(R.string.dosage_warning),
                                style = MaterialTheme.typography.titleMedium,
                                color = MaterialTheme.colorScheme.error
                            )
                        }
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = substance.dosageRemark,
                            style = MaterialTheme.typography.bodyMedium
                        )
                    }
                }
            }
            val interactions = substance.interactions
            if (interactions != null) {
                if (interactions.dangerous.isNotEmpty() || interactions.unsafe.isNotEmpty() || interactions.uncertain.isNotEmpty()) {
                    SectionWithTitle(stringResource(R.string.interactions)) {
                        InteractionsView(
                            interactions = substance.interactions,
                            substanceURL = substance.url,
                        )
                    }
                }
            }
            if (substance.effectsSummary != null) {
                SectionWithTitle(title = stringResource(R.string.effects)) {
                    Column {
                        Text(
                            text = substance.effectsSummary,
                            modifier = Modifier.padding(horizontal = horizontalPadding)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                    }
                }
            }
            if (substance.generalRisks != null && substance.longtermRisks != null) {
                SectionWithTitle(title = stringResource(R.string.risks)) {
                    Column {
                        Text(
                            text = substance.generalRisks,
                            modifier = Modifier.padding(horizontal = horizontalPadding)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                    }
                }
                SectionWithTitle(title = stringResource(R.string.long_term)) {
                    Column {
                        Text(
                            text = substance.longtermRisks,
                            modifier = Modifier.padding(horizontal = horizontalPadding)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                    }
                }
            }
            if (substance.saferUse.isNotEmpty()) {
                SectionWithTitle(title = stringResource(R.string.safer_use)) {
                    Column {
                        BulletPoints(
                            points = substance.saferUse,
                            modifier = Modifier.padding(horizontal = horizontalPadding)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                    }
                }
            }
            SectionWithTitle(title = "Dépendance & Addiction (0 à 10)") {
                val availableRoas = remember(substance) { substance.roas }
                var selectedRoaRoute by remember(substance) { mutableStateOf(substance.roas.firstOrNull()?.route ?: AdministrationRoute.ORAL) }
                val activeAddictionScore = substance.getAddictionScoreForRoute(selectedRoaRoute)

                Column(
                    modifier = Modifier
                        .padding(horizontal = horizontalPadding)
                        .fillMaxWidth(),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    DependenceScoreGauge(
                        title = "Indice d'addiction (Craving) • ${selectedRoaRoute.displayText}",
                        score = activeAddictionScore,
                        description = getCravingScoreDescription(activeAddictionScore)
                    )
                    if (availableRoas.size > 1 && substance.addictionScore > 0) {
                        FlowRow(
                            horizontalArrangement = Arrangement.spacedBy(6.dp),
                            verticalArrangement = Arrangement.spacedBy(6.dp),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            availableRoas.forEach { roa ->
                                val rScore = substance.getAddictionScoreForRoute(roa.route)
                                val isSel = roa.route == selectedRoaRoute
                                val routeColor = roa.route.color.getComposeColor(isSystemInDarkTheme())
                                Surface(
                                    shape = CircleShape,
                                    color = if (isSel) routeColor.copy(alpha = 0.22f) else MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.4f),
                                    border = if (isSel) androidx.compose.foundation.BorderStroke(1.dp, routeColor) else null,
                                    modifier = Modifier
                                        .clip(CircleShape)
                                        .clickable { selectedRoaRoute = roa.route }
                                ) {
                                    Text(
                                        text = if (rScore >= 11) "${roa.route.displayText} : 11/10 🚨" else "${roa.route.displayText} : $rScore/10",
                                        style = MaterialTheme.typography.labelSmall,
                                        fontWeight = if (isSel) androidx.compose.ui.text.font.FontWeight.Bold else androidx.compose.ui.text.font.FontWeight.Normal,
                                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                    )
                                }
                            }
                        }
                    }
                    DependenceScoreGauge(
                        title = "Indice de dépendance physique",
                        score = substance.physicalDependenceScore,
                        description = getPhysicalDependenceScoreDescription(substance)
                    )
                    if (substance.addictionPotential != null) {
                        HorizontalDivider(modifier = Modifier.padding(vertical = 4.dp))
                        Text(
                            text = substance.addictionPotential,
                            style = MaterialTheme.typography.bodyMedium
                        )
                    }
                    Spacer(modifier = Modifier.height(4.dp))
                }
            }
            val firstRoa = substance.roas.firstOrNull()
            val useVolumetric = firstRoa?.roaDose?.shouldUseVolumetricDosing == true
            if (substance.isHallucinogen || substance.isStimulant || useVolumetric) {
                SectionWithTitle(title = stringResource(R.string.see_also)) {
                    Column {
                        if (substance.isHallucinogen) {
                            TextButton(onClick = navigateToSaferHallucinogensScreen) {
                                Text(
                                    text = stringResource(R.string.safer_hallucinogen_use),
                                    modifier = Modifier.padding(horizontal = horizontalPadding)
                                )
                            }
                            HorizontalDivider()
                        }
                        if (substance.isStimulant) {
                            TextButton(onClick = navigateToSaferStimulantsScreen) {
                                Text(
                                    text = stringResource(R.string.safer_stimulant_use),
                                    modifier = Modifier.padding(horizontal = horizontalPadding)
                                )
                            }
                            HorizontalDivider()
                        }
                    }
                }
            }
            Spacer(modifier = Modifier.height(70.dp))
        }
    }
}

@Composable
fun RouteColorCircle(administrationRoute: AdministrationRoute) {
    val isDarkTheme = isSystemInDarkTheme()
    Surface(
        shape = CircleShape,
        color = administrationRoute.color.getComposeColor(isDarkTheme),
        modifier = Modifier
            .size(20.dp)
    ) {}
}

@Composable
fun BulletPoints(points: List<String>, modifier: Modifier = Modifier) {
    Column(modifier = modifier) {
        points.forEach {
            Row(verticalAlignment = Alignment.Top) {
                Surface(
                    shape = CircleShape,
                    color = MaterialTheme.colorScheme.onBackground,
                    modifier = Modifier
                        .padding(top = 7.dp)
                        .size(7.dp)
                ) {}
                Spacer(modifier = Modifier.width(6.dp))
                Text(text = it)
            }
        }
    }
}

@Composable
fun VerticalSpace() {
    Spacer(modifier = Modifier.height(5.dp))
}


@Composable
fun CategoryChipFromSubstanceScreen(
    category: Category,
    navigateToCategoryScreen: (categoryName: String) -> Unit
) {
    Row(
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier
            .clip(shape = CircleShape)
            .clickable {
                navigateToCategoryScreen(category.name)
            }
            .background(color = category.color.copy(alpha = 0.2f))
            .height(48.dp)
            .padding(horizontal = 12.dp)

    ) {
        Text(text = category.name)
        Spacer(modifier = Modifier.width(3.dp))
        Icon(
            imageVector = Icons.Default.ChevronRight,
            contentDescription = "Go to",
            modifier = Modifier.size(20.dp)
        )
    }
}

@Composable
fun DependenceScoreGauge(
    title: String,
    score: Int,
    description: String
) {
    val clamped = score.coerceIn(0, 11)
    val isOffScale = clamped >= 11
    val gaugeColor = when {
        isOffScale -> androidx.compose.ui.graphics.Color(0xFFFF0055) // Neon Crimson (Hors-échelle)
        clamped >= 8 -> androidx.compose.ui.graphics.Color(0xFFEF4444) // Red (Critical / potentially lethal withdrawal or extreme craving)
        clamped >= 6 -> androidx.compose.ui.graphics.Color(0xFFF97316) // Orange (High)
        clamped >= 3 -> androidx.compose.ui.graphics.Color(0xFFEAB308) // Amber (Moderate)
        else -> androidx.compose.ui.graphics.Color(0xFF10B981)         // Emerald (None / Very low)
    }

    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = title,
                style = MaterialTheme.typography.titleSmall,
                fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold
            )
            Surface(
                shape = CircleShape,
                color = if (isOffScale) gaugeColor.copy(alpha = 0.25f) else gaugeColor.copy(alpha = 0.2f),
                border = androidx.compose.foundation.BorderStroke(if (isOffScale) 2.dp else 1.dp, gaugeColor)
            ) {
                Text(
                    text = if (isOffScale) "11 / 10 🚨 (Hors-échelle)" else "$clamped / 10",
                    style = MaterialTheme.typography.labelMedium,
                    fontWeight = androidx.compose.ui.text.font.FontWeight.Bold,
                    color = gaugeColor,
                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                )
            }
        }
        LinearProgressIndicator(
            progress = { if (isOffScale) 1f else (clamped / 10f) },
            modifier = Modifier
                .fillMaxWidth()
                .height(8.dp)
                .clip(CircleShape),
            color = gaugeColor,
            trackColor = MaterialTheme.colorScheme.surfaceVariant,
        )
        Text(
            text = description,
            style = MaterialTheme.typography.bodySmall,
            color = if (isOffScale) gaugeColor else MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}

fun getCravingScoreDescription(score: Int): String = when {
    score >= 11 -> "11/10 — 🚨 HORS-ÉCHELLE : Compulsion absolue et craving incontrôlable (MDPV). Rush dopaminergique extrême, perte de contrôle immédiate, risque maximal de psychose paranoïde aiguë et tachycardie sévère."
    score in 9..10 -> "$score/10 — Compulsion de reconsommation maximale (risque très élevé de binge compulsif et perte de contrôle)"
    score in 7..8 -> "$score/10 — Craving élevé (forte compulsion psychologique de redosage)"
    score in 5..6 -> "$score/10 — Craving modéré à marqué (risque d'installation d'une habitude)"
    score in 3..4 -> "$score/10 — Craving léger à modéré"
    score in 1..2 -> "$score/10 — Craving très faible à quasi nul (usage compulsif exceptionnel)"
    else -> "0/10 — Aucun craving psychologique ni potentiel d'abus"
}

fun getPhysicalDependenceScoreDescription(substance: Substance): String {
    val score = substance.physicalDependenceScore
    val name = substance.name
    val cats = substance.categories.map { it.lowercase() }
    val isOpioid = cats.contains("opioid") || name in setOf("Heroin", "Morphine", "Fentanyl", "Methadone", "Oxycodone", "Buprenorphine", "Codeine", "Tramadol", "Kratom", "Opium")
    val isStimulant = substance.isStimulant || cats.contains("stimulant") || cats.contains("entactogen")

    if (isStimulant && score <= 1) {
        return "0-1/10 — 🧠 Aucune dépendance physique somatique : aucun syndrome de sevrage corporel ni convulsion. Dépendance d'ordre psychologique (craving dopaminergique, asthénie et rebond d'humeur passager)."
    }

    if (isOpioid) {
        return "$score/10 — ⚠️ Sevrage somatique extrêmement éprouvant mais NON mortel en soi : douleurs diffuses intenses, diarrhées, nausées et insomnie ('cold turkey'), sans risque convulsif primaire ni orage neurovégétatif fatal. Le danger vital est uniquement indirect (déshydratation aiguë si absence totale d'eau). TSO ou sevrage dégressif conseillé."
    }

    return when (score.coerceIn(0, 10)) {
        0 -> "0/10 — Aucune dépendance physique somatique ni syndrome de sevrage corporel"
        1, 2 -> "$score/10 — Dépendance physique très faible (rebond somatique léger, fatigue passagère ou céphalées)"
        3 -> "3/10 — Dépendance physique légère (rebond autonome bénin type nicotine ou syndrome d'arrêt d'antidépresseurs)"
        4 -> "4/10 — Dépendance physique modérée / syndrome d'arrêt (inconfort somatique, diminution progressive recommandée)"
        5 -> "5/10 — Dépendance physique forte non convulsive (sevrage somatique éprouvant mais sans orage neuro-végétatif létal)"
        7 -> "7/10 — 💤 Sevrage marqué avec rebond d'hyperexcitabilité (Z-drugs, gabapentine) : insomnie sévère de rebond, tremblements et anxiété. Risque convulsif rare mais existant lors d'arrêts brutaux de doses massives."
        8 -> "8/10 — ⚡ Sevrage neurovégétatif sévère (Prégabaline, Phénibut, Baclofène) : risque convulsif avéré sous fortes doses (>600mg Lyrica, >2g Phénibut), désorientation et anxiété paroxystique. Moins foudroyant que l'effondrement autonome de l'alcool/GHB, mais sevrage progressif par paliers indispensable."
        9 -> "9/10 — ⚠️ Sevrage critique potentiellement létal (Benzodiazépines, GHB/GBL) : risque élevé de crises comitiales (convulsions généralisées tonico-cloniques) et de psychose aiguë délirante (foudroyante en 2 à 4h pour le GHB). Arrêt brutal formellement proscrit : décroissance médicale très progressive obligatoire."
        10 -> "10/10 — 🚨 URGENCE VITALE ABSOLUE (Alcool, Barbituriques, Triazolo-benzos ultra-puissantes) : l'arrêt brutal supprime le frein GABA-A et déclenche un orage glutamatergique avec delirium tremens, hyperthermie maligne et état de mal épileptique fatal. Hospitalisation immédiate requise."
        else -> "$score/10 — Dépendance physique établie (sevrage médicalisé recommandé)"
    }
}

fun getPhysicalDependenceScoreDescription(score: Int): String = when (score.coerceIn(0, 10)) {
    0 -> "0/10 — Aucune dépendance physique somatique ni syndrome de sevrage corporel"
    1, 2 -> "$score/10 — Dépendance physique très faible (rebond somatique léger)"
    3 -> "3/10 — Dépendance physique légère (rebond autonome bénin)"
    4, 5 -> "$score/10 — ⚠️ Sevrage somatique extrêmement éprouvant mais NON mortel en soi (douleurs, diarrhées, insomnie, sans risque convulsif primaire)"
    7 -> "7/10 — 💤 Sevrage marqué avec rebond d'hyperexcitabilité (insomnie de rebond, tremblements, convulsions rares sous fortes doses)"
    8 -> "8/10 — ⚡ Sevrage neurovégétatif sévère (Prégabaline, Phénibut) : risque convulsif sous fortes doses, désorientation, sans l'effondrement autonome immédiat de l'alcool"
    9 -> "9/10 — ⚠️ Sevrage critique potentiellement létal (Benzodiazépines, GHB) : risque élevé de convulsions généralisées et de psychose aiguë de sevrage"
    10 -> "10/10 — 🚨 URGENCE VITALE ABSOLUE (Alcool, Barbituriques) : risque vital majeur de delirium tremens, hyperthermie et état de mal épileptique fatal"
    else -> "$score/10 — Dépendance physique critique (sevrage médicalisé indispensable)"
}
