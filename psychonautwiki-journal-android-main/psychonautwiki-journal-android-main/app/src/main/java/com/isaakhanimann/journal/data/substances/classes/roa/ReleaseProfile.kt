package com.isaakhanimann.journal.data.substances.classes.roa

import com.isaakhanimann.journal.data.substances.AdministrationRoute
import com.isaakhanimann.journal.ui.tabs.journal.experience.components.DataForOneEffectLine

data class ReleaseWave(
    val delayHours: Double,
    val fraction: Double,
    val durationStretchFactor: Double = 1.0,
    val plateauHours: Double = 0.0
)

data class ReleaseProfile(
    val id: String,
    val shortLabel: String,
    val fullTitle: String,
    val kineticDescription: String,
    val totalDurationHours: Double,
    val waves: List<ReleaseWave>
) {
    fun expandToEffectLines(baseLine: DataForOneEffectLine): List<DataForOneEffectLine> {
        if (waves.size <= 1 && waves.firstOrNull()?.delayHours == 0.0 && waves.firstOrNull()?.durationStretchFactor == 1.0) {
            return listOf(baseLine)
        }
        return waves.map { wave ->
            val delayedStart = baseLine.startTime.plusSeconds((wave.delayHours * 3600.0).toLong())
            val stretchedEnd = if (wave.plateauHours > 0.0) {
                delayedStart.plusSeconds((wave.plateauHours * 3600.0).toLong())
            } else {
                baseLine.endTime?.plusSeconds((wave.delayHours * 3600.0).toLong())
            }
            baseLine.copy(
                height = (baseLine.height * wave.fraction).toFloat(),
                horizontalWeight = (baseLine.horizontalWeight * wave.fraction).toFloat(),
                startTime = delayedStart,
                endTime = stretchedEnd
            )
        }
    }
}

object ReleaseProfileCatalog {

    val immediateDefault = ReleaseProfile(
        id = "IR",
        shortLabel = "LI (Immédiate)",
        fullTitle = "Libération immédiate (LI — 100%)",
        kineticDescription = "100% de la dose libérée immédiatement après l'administration.",
        totalDurationHours = 5.0,
        waves = listOf(ReleaseWave(delayHours = 0.0, fraction = 1.0, durationStretchFactor = 1.0))
    )

    val IMMEDIATE_RELEASE = immediateDefault

    private val specificProfilesBySubstance: Map<String, List<ReleaseProfile>> = mapOf(
        "oxycodone" to listOf(
            immediateDefault.copy(
                shortLabel = "LI (OxyNorm)",
                fullTitle = "OxyNorm / OxyNormOro (LI — 100% immédiat)",
                kineticDescription = "100% de la dose libérée immédiatement (pic ~1h, durée 4-6h)."
            ),
            ReleaseProfile(
                id = "OXYCONTIN_LP_12H",
                shortLabel = "OxyContin LP 12h (30%/70%)",
                fullTitle = "OxyContin LP 12h (Biphasique AcroContin : 30% immédiat + 70% sur 12h)",
                kineticDescription = "30% de la dose est libéré immédiatement (montée rapide dès 20-30 min et pic initial haut à ~1h30) et les 70% restants sont délivrés en plateau sur 12h.",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.48, durationStretchFactor = 0.9),
                    ReleaseWave(delayHours = 0.5, fraction = 0.52, durationStretchFactor = 2.4, plateauHours = 7.5)
                )
            ),
            ReleaseProfile(
                id = "OXY_GENERIC_LP_12H",
                shortLabel = "Oxycodone LP Générique 12h",
                fullTitle = "Oxycodone LP Générique 12h (Matrice continue lente sans dose immédiate)",
                kineticDescription = "Libération purement matricielle sans fraction immédiate : montée beaucoup plus lente (pic atteint en 3 à 4h) et plateau plus bas étalé sur 12h.",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.5, fraction = 0.52, durationStretchFactor = 2.8, plateauHours = 8.0)
                )
            ),
            ReleaseProfile(
                id = "OXY_LP_24H",
                shortLabel = "LP 24h (1 prise/j)",
                fullTitle = "Oxycodone LP 24h (Libération prolongée sur 24h)",
                kineticDescription = "15% initial puis libération matricielle lente sur 24h.",
                totalDurationHours = 24.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.15, durationStretchFactor = 1.2),
                    ReleaseWave(delayHours = 1.5, fraction = 0.85, durationStretchFactor = 4.2, plateauHours = 16.0)
                )
            )
        ),
        "methylphenidate" to listOf(
            immediateDefault.copy(
                shortLabel = "LI (Ritaline LI)",
                fullTitle = "Ritaline LI 10 mg (100% immédiat — 3 à 4h)",
                kineticDescription = "100% de la dose libérée immédiatement (durée 3 à 4h)."
            ),
            ReleaseProfile(
                id = "RITALINE_LP_50_50",
                shortLabel = "Ritaline LP / Medikinet (50% + 50% à 4h)",
                fullTitle = "Ritaline LP / Medikinet LM 8h (50% immédiat + 50% à +4h)",
                kineticDescription = "50% de la dose est libéré immédiatement (T=0) et l'autre moitié (50%) est libérée 4h plus tard (billes gastrorésistantes).",
                totalDurationHours = 8.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.50, durationStretchFactor = 1.0),
                    ReleaseWave(delayHours = 4.0, fraction = 0.50, durationStretchFactor = 1.0)
                )
            ),
            ReleaseProfile(
                id = "QUASYM_LP_30_70",
                shortLabel = "Quasym LP (30% + 70%)",
                fullTitle = "Quasym LP 8h (30% immédiat + 70% prolongé)",
                kineticDescription = "30% de la dose est libéré immédiatement et 70% est libéré progressivement à partir de +2h à +4h.",
                totalDurationHours = 8.5,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.30, durationStretchFactor = 1.0),
                    ReleaseWave(delayHours = 2.5, fraction = 0.70, durationStretchFactor = 1.4, plateauHours = 3.5)
                )
            ),
            ReleaseProfile(
                id = "CONCERTA_LP_22_78",
                shortLabel = "Concerta LP (22% + 78% sur 12h)",
                fullTitle = "Concerta LP OROS 12h (22% immédiat + 78% osmotique continu)",
                kineticDescription = "22% de la dose totale est délivré immédiatement (enrobage externe) et les 78% restants sont délivrés de manière équitable par système osmotique sur 10-12h.",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.22, durationStretchFactor = 1.0),
                    ReleaseWave(delayHours = 1.0, fraction = 0.39, durationStretchFactor = 1.8, plateauHours = 4.5),
                    ReleaseWave(delayHours = 5.0, fraction = 0.39, durationStretchFactor = 1.8, plateauHours = 5.0)
                )
            )
        ),
        "tramadol" to listOf(
            immediateDefault.copy(
                shortLabel = "LI (Topalgic / Contramal LI)",
                fullTitle = "Tramadol LI 50 mg (100% immédiat — 5 à 7h)",
                kineticDescription = "100% de la dose libérée immédiatement."
            ),
            ReleaseProfile(
                id = "TRAMADOL_LP_12H",
                shortLabel = "LP 12h (Topalgic/Contramal LP)",
                fullTitle = "Tramadol LP 12h (2 prises/j — 25% initial + 75% sur 12h)",
                kineticDescription = "Version LP 12h : 25% libéré rapidement puis 75% réparti sur 12 heures.",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.25, durationStretchFactor = 1.0),
                    ReleaseWave(delayHours = 1.0, fraction = 0.75, durationStretchFactor = 2.2, plateauHours = 7.5)
                )
            ),
            ReleaseProfile(
                id = "TRAMADOL_LP_24H",
                shortLabel = "LP 24h (Monoalgic / Monocrixo)",
                fullTitle = "Tramadol LP 24h (1 prise/j — Libération sur 24h)",
                kineticDescription = "Version LP 24h : libération matricielle progressive assurant une couverture régulière sur 24 heures.",
                totalDurationHours = 24.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.15, durationStretchFactor = 1.2),
                    ReleaseWave(delayHours = 1.5, fraction = 0.85, durationStretchFactor = 4.0, plateauHours = 16.0)
                )
            )
        ),
        "morphine" to listOf(
            immediateDefault.copy(
                shortLabel = "LI (Actiskénan / Oramorph)",
                fullTitle = "Morphine LI (Actiskénan / Sévrédol / Oramorph — 4 à 5h)",
                kineticDescription = "100% de la dose libérée immédiatement."
            ),
            ReleaseProfile(
                id = "MORPHINE_LP_12H",
                shortLabel = "Skénan / Moscontin LP 12h",
                fullTitle = "Morphine LP 12h (Skénan LP / Moscontin — 25% + 75% sur 12h)",
                kineticDescription = "Microgranules à libération prolongée sur 12h (2 prises/jour).",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.25, durationStretchFactor = 1.0),
                    ReleaseWave(delayHours = 1.0, fraction = 0.75, durationStretchFactor = 2.4, plateauHours = 7.5)
                )
            ),
            ReleaseProfile(
                id = "MORPHINE_LP_24H",
                shortLabel = "Kapanol LP 24h",
                fullTitle = "Morphine LP 24h (Kapanol LP — Libération sur 24h)",
                kineticDescription = "Microgranules enrobés à libération continue sur 24 heures.",
                totalDurationHours = 24.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.15, durationStretchFactor = 1.2),
                    ReleaseWave(delayHours = 1.5, fraction = 0.85, durationStretchFactor = 4.2, plateauHours = 16.0)
                )
            )
        ),
        "hydromorphone" to listOf(
            immediateDefault,
            ReleaseProfile(
                id = "SOPHIDONE_LP_12H",
                shortLabel = "Sophidone LP 12h",
                fullTitle = "Sophidone LP 12h (Microgranules LP sur 12h)",
                kineticDescription = "25% initial puis 75% libéré progressivement sur 12 heures.",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.25, durationStretchFactor = 1.0),
                    ReleaseWave(delayHours = 1.0, fraction = 0.75, durationStretchFactor = 2.4, plateauHours = 7.5)
                )
            ),
            ReleaseProfile(
                id = "JURNISTA_LP_24H",
                shortLabel = "Jurnista LP 24h (OROS)",
                fullTitle = "Jurnista LP 24h (Système osmotique OROS 24h)",
                kineticDescription = "Délivrance osmotique continue sur 24 heures.",
                totalDurationHours = 24.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.15, durationStretchFactor = 1.2),
                    ReleaseWave(delayHours = 1.5, fraction = 0.85, durationStretchFactor = 4.2, plateauHours = 16.0)
                )
            )
        )
    )

    private val genericOralProfiles: List<ReleaseProfile> = listOf(
        immediateDefault,
        ReleaseProfile(
            id = "GENERIC_LP_12H_30_70",
            shortLabel = "LP 12h (30% LI + 70% LP)",
            fullTitle = "Libération Prolongée 12h (Biphasique : 30% immédiat + 70% sur 12h)",
            kineticDescription = "30% de la dose libéré immédiatement + 70% réparti progressivement sur 12h.",
            totalDurationHours = 12.0,
            waves = listOf(
                ReleaseWave(delayHours = 0.0, fraction = 0.30, durationStretchFactor = 1.0),
                ReleaseWave(delayHours = 0.75, fraction = 0.70, durationStretchFactor = 2.4, plateauHours = 7.5)
            )
        ),
        ReleaseProfile(
            id = "GENERIC_LP_BIMODAL_50_50",
            shortLabel = "LP Bimodale 8h (50% + 50% à 4h)",
            fullTitle = "Libération Modifiée Bimodale (50% immédiat + 50% à +4h)",
            kineticDescription = "50% de la dose libéré immédiatement (T=0) + 50% libéré 4h plus tard (T+4h).",
            totalDurationHours = 8.0,
            waves = listOf(
                ReleaseWave(delayHours = 0.0, fraction = 0.50, durationStretchFactor = 1.0),
                ReleaseWave(delayHours = 4.0, fraction = 0.50, durationStretchFactor = 1.0)
            )
        ),
        ReleaseProfile(
            id = "GENERIC_LP_24H",
            shortLabel = "LP 24h (Continue 24h)",
            fullTitle = "Libération Prolongée 24h (1 prise/jour — 24h)",
            kineticDescription = "15% initial puis 85% délivré de manière équitable sur 24 heures.",
            totalDurationHours = 24.0,
            waves = listOf(
                ReleaseWave(delayHours = 0.0, fraction = 0.15, durationStretchFactor = 1.2),
                ReleaseWave(delayHours = 1.5, fraction = 0.85, durationStretchFactor = 4.0, plateauHours = 16.0)
            )
        )
    )

    fun getProfilesForSubstance(substanceName: String, route: AdministrationRoute): List<ReleaseProfile> {
        if (route != AdministrationRoute.ORAL) {
            return listOf(immediateDefault)
        }
        return specificProfilesBySubstance[substanceName.lowercase()] ?: genericOralProfiles
    }
}
