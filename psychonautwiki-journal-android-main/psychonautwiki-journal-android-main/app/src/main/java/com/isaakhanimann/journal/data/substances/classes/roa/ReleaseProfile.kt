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
        shortLabel = "LI (100% Immédiate)",
        fullTitle = "Libération immédiate (LI — 100%)",
        kineticDescription = "Forme conventionnelle à libération immédiate (100% de la dose délivrée). Aucune matrice LP n'existe pour cette molécule.",
        totalDurationHours = 5.0,
        waves = listOf(ReleaseWave(delayHours = 0.0, fraction = 1.0, durationStretchFactor = 1.0))
    )

    val IMMEDIATE_RELEASE = immediateDefault

    private val specificProfilesBySubstance: Map<String, List<ReleaseProfile>> = mapOf(
        "oxycodone" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "OxyNorm LI",
                fullTitle = "OxyNorm / OxyNormOro (LI — 100% immédiat, 4-6h)",
                kineticDescription = "100% de la dose libérée immédiatement (pic ~1h-1h15, durée 4-6h)."
            ),
            ReleaseProfile(
                id = "OXYCONTIN_LP_12H",
                shortLabel = "OxyContin LP 12h",
                fullTitle = "OxyContin LP 12h (AcroContin Biphasique : 30% immédiat + 70% sur 12h)",
                kineticDescription = "30% libéré immédiatement en surface (montée rapide dès 20-30 min et pic initial haut à ~1h15-1h30) suivi des 70% restants délivrés en plateau prolongé jusqu'à 12h.",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.48, durationStretchFactor = 0.9),
                    ReleaseWave(delayHours = 0.5, fraction = 0.52, durationStretchFactor = 2.4, plateauHours = 7.5)
                )
            ),
            ReleaseProfile(
                id = "OXY_GENERIC_LP_12H",
                shortLabel = "Oxycodone LP 12h Générique",
                fullTitle = "Oxycodone LP 12h Générique (Matrice continue lente sans dose immédiate)",
                kineticDescription = "Libération purement matricielle continue sans fraction immédiate en surface : montée lente sur 3 à 4h sans pic initial brutal, plateau régulier étalé sur 12h.",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.5, fraction = 0.52, durationStretchFactor = 2.8, plateauHours = 8.0)
                )
            ),
            ReleaseProfile(
                id = "OXY_LP_24H",
                shortLabel = "Oxycodone LP 24h",
                fullTitle = "Oxycodone LP 24h / Targinact (Libération matricielle continue 24 heures)",
                kineticDescription = "Formulation à libération continue sur 24 heures (1 prise par jour).",
                totalDurationHours = 24.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.15, durationStretchFactor = 1.2),
                    ReleaseWave(delayHours = 1.5, fraction = 0.85, durationStretchFactor = 4.2, plateauHours = 16.0)
                )
            )
        ),
        "methylphenidate" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Ritaline LI 10mg",
                fullTitle = "Ritaline LI 10 mg (Comprimé sécable — 100% immédiat, 3-4h)",
                kineticDescription = "100% de la dose libérée immédiatement : pic haut à +1h-1h15, descente rapide en 3 à 4h."
            ),
            ReleaseProfile(
                id = "RITALINE_LP_50_50",
                shortLabel = "Ritaline LP 8h",
                fullTitle = "Ritaline LP / Medikinet LM 8h (Bimodale : 50% immédiat + 50% à +4h)",
                kineticDescription = "Microgranules : 50% libéré immédiatement (1er pic à 1h15) et 50% libéré 4h plus tard par microgranules entériques (2nd pic à +5h15, durée 8h).",
                totalDurationHours = 8.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.50, durationStretchFactor = 1.0),
                    ReleaseWave(delayHours = 3.6, fraction = 0.50, durationStretchFactor = 1.0)
                )
            ),
            ReleaseProfile(
                id = "QUASYM_LP_30_70",
                shortLabel = "Quasym LP 8h",
                fullTitle = "Quasym LP 8h (Microgranules : 30% immédiat + 70% prolongé après-midi)",
                kineticDescription = "30% libéré le matin et 70% étalé culminant l'après-midi vers +3h30-4h30.",
                totalDurationHours = 8.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.30, durationStretchFactor = 1.0),
                    ReleaseWave(delayHours = 1.2, fraction = 0.70, durationStretchFactor = 1.8, plateauHours = 1.5)
                )
            ),
            ReleaseProfile(
                id = "CONCERTA_LP_22_78",
                shortLabel = "Concerta LP (OROS)",
                fullTitle = "Concerta LP OROS 12h (Système osmotique : 22% immédiat + 78% OROS sur 12h)",
                kineticDescription = "22% libéré immédiatement par l'enrobage, puis 78% poussé régulièrement par la pompe osmotique OROS sur 12h.",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.22, durationStretchFactor = 0.9),
                    ReleaseWave(delayHours = 0.6, fraction = 0.78, durationStretchFactor = 2.6, plateauHours = 6.0)
                )
            )
        ),
        "morphine" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Actiskénan LI",
                fullTitle = "Morphine LI (Actiskénan / Sevredol / Oramorph — 100% immédiat, 4-5h)",
                kineticDescription = "100% de la dose libérée immédiatement (montée en 30-45 min, pic à 1h15, durée 4-5h)."
            ),
            ReleaseProfile(
                id = "MORPHINE_LP_12H",
                shortLabel = "Skénan LP 12h",
                fullTitle = "Morphine LP 12h (Skénan LP / Moscontin — Microgranules LP sur 12h)",
                kineticDescription = "Microgranules à libération prolongée sur 12h (2 prises par jour à heures fixes).",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.25, durationStretchFactor = 1.0),
                    ReleaseWave(delayHours = 1.0, fraction = 0.75, durationStretchFactor = 2.4, plateauHours = 7.5)
                )
            ),
            ReleaseProfile(
                id = "MORPHINE_LP_24H",
                shortLabel = "Kapanol LP 24h",
                fullTitle = "Morphine LP 24h (Kapanol LP / Kadian — Microgranules 24 heures)",
                kineticDescription = "Microgranules polymériques libérant la morphine en continu sur 24 heures (1 prise unique quotidienne).",
                totalDurationHours = 24.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.15, durationStretchFactor = 1.2),
                    ReleaseWave(delayHours = 1.5, fraction = 0.85, durationStretchFactor = 4.2, plateauHours = 16.0)
                )
            )
        ),
        "tramadol" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Topalgic LI",
                fullTitle = "Tramadol LI 50 mg (Topalgic / Contramal — 100% immédiat, durée 5-7h)",
                kineticDescription = "100% libéré immédiatement : pic à 2h, durée 5 à 7 heures."
            ),
            ReleaseProfile(
                id = "TRAMADOL_LP_12H",
                shortLabel = "Topalgic LP 12h",
                fullTitle = "Tramadol LP 12h (Topalgic LP / Contramal LP / Biodalgic — 2 prises/j)",
                kineticDescription = "Comprimé matriciel sur 12h : montée progressive sur 2h30 puis plateau antalgique stable.",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.30, durationStretchFactor = 1.0),
                    ReleaseWave(delayHours = 0.8, fraction = 0.70, durationStretchFactor = 2.2, plateauHours = 6.0)
                )
            ),
            ReleaseProfile(
                id = "TRAMADOL_LP_24H",
                shortLabel = "Monoalgic LP 24h",
                fullTitle = "Tramadol LP 24h (Monoalgic LP / Monocrixo LP / Zamadol — 1 prise/j)",
                kineticDescription = "Libération matricielle très lente étalée sur 24 heures en une prise matinale.",
                totalDurationHours = 24.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.15, durationStretchFactor = 1.2),
                    ReleaseWave(delayHours = 1.5, fraction = 0.85, durationStretchFactor = 4.0, plateauHours = 16.0)
                )
            )
        ),
        "hydromorphone" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Hydromorphone LI",
                fullTitle = "Hydromorphone LI (100% immédiat — 4-5h)",
                kineticDescription = "Action antalgique immédiate et puissante pour les accès douloureux."
            ),
            ReleaseProfile(
                id = "SOPHIDONE_LP_12H",
                shortLabel = "Sophidone LP 12h",
                fullTitle = "Sophidone LP 12h (Microgranules à libération prolongée 12h)",
                kineticDescription = "Microgranules enrobés libérant l'hydromorphone sur 12 heures (2 prises quotidiennes).",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.25, durationStretchFactor = 1.0),
                    ReleaseWave(delayHours = 1.0, fraction = 0.75, durationStretchFactor = 2.4, plateauHours = 7.5)
                )
            ),
            ReleaseProfile(
                id = "JURNISTA_LP_24H",
                shortLabel = "Jurnista LP (OROS)",
                fullTitle = "Jurnista LP 24h (Système osmotique OROS Push-Pull sur 24 heures)",
                kineticDescription = "Pompe osmotique OROS délivrant l'hydromorphone de manière continue sur 24 heures sans pic.",
                totalDurationHours = 24.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.15, durationStretchFactor = 1.2),
                    ReleaseWave(delayHours = 1.5, fraction = 0.85, durationStretchFactor = 4.2, plateauHours = 16.0)
                )
            )
        ),
        "amphetamine" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Dexedrine LI",
                fullTitle = "Amphétamine LI / Dexedrine (100% immédiat — 4-6h)",
                kineticDescription = "100% libéré immédiatement en 30-45 min avec pic franc et net."
            ),
            ReleaseProfile(
                id = "ADDERALL_XR",
                shortLabel = "Adderall XR 12h",
                fullTitle = "Adderall XR 12h (Microbilles bimodales : 50% immédiat + 50% retardé à +4h)",
                kineticDescription = "50% immédiat et 50% retardé à +4h par microbilles entériques (double pic franc).",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.50, durationStretchFactor = 1.0),
                    ReleaseWave(delayHours = 3.8, fraction = 0.50, durationStretchFactor = 1.0)
                )
            )
        ),
        "ketoprofen" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Prophénid LI",
                fullTitle = "Prophénid LI / Toprec (Kétoprofène immédiat — 4-6h)",
                kineticDescription = "Libération immédiate pour les douleurs aiguës."
            ),
            ReleaseProfile(
                id = "BIPROFENID_LP_12H",
                shortLabel = "Bi-Prophénid LP 12h",
                fullTitle = "Bi-Prophénid LP 150 mg (Comprimé sécable bicouche : 50% LI + 50% LP sur 12h)",
                kineticDescription = "Bicouche : 50% immédiat (couche blanche) et 50% prolongé sur 12h (couche jaune).",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.50, durationStretchFactor = 0.9),
                    ReleaseWave(delayHours = 0.6, fraction = 0.50, durationStretchFactor = 2.2, plateauHours = 6.0)
                )
            ),
            ReleaseProfile(
                id = "PROFENID_LP_24H",
                shortLabel = "Prophénid LP 24h",
                fullTitle = "Prophénid LP 200 mg (Gélule de microgranules LP sur 24 heures)",
                kineticDescription = "Microgranules à libération prolongée lente sur 24 heures (1 prise unique/j).",
                totalDurationHours = 24.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.15, durationStretchFactor = 1.2),
                    ReleaseWave(delayHours = 1.5, fraction = 0.85, durationStretchFactor = 4.0, plateauHours = 16.0)
                )
            )
        ),
        "diclofenac" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Voltarène LI 50mg",
                fullTitle = "Voltarène LI 50 mg (Comprimé gastro-résistant immédiat)",
                kineticDescription = "Absorption rapide avec pic à 1h30-2h (durée 6 heures)."
            ),
            ReleaseProfile(
                id = "VOLTARENE_LP_75",
                shortLabel = "Voltarène LP 75mg",
                fullTitle = "Voltarène LP 75 mg (Comprimé matriciel à libération prolongée 12h)",
                kineticDescription = "Matrice hydrophile libérant le diclofénac de manière continue sur 12 heures.",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.25, durationStretchFactor = 1.0),
                    ReleaseWave(delayHours = 1.0, fraction = 0.75, durationStretchFactor = 2.4, plateauHours = 7.0)
                )
            ),
            ReleaseProfile(
                id = "VOLTARENE_LP_100",
                shortLabel = "Voltarène LP 100mg",
                fullTitle = "Voltarène LP 100 mg (Comprimé à libération prolongée sur 24 heures)",
                kineticDescription = "Dose journalière complète délivrée sur 24 heures (1 prise le soir au repas).",
                totalDurationHours = 24.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.15, durationStretchFactor = 1.2),
                    ReleaseWave(delayHours = 1.5, fraction = 0.85, durationStretchFactor = 4.0, plateauHours = 16.0)
                )
            )
        ),
        "alprazolam" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Xanax LI",
                fullTitle = "Xanax LI (Comprimé sécable — 100% immédiat, 5-7h)",
                kineticDescription = "100% de la dose libérée immédiatement (montée en 20-40 min, pic net)."
            ),
            ReleaseProfile(
                id = "XANAX_XR_12H",
                shortLabel = "Xanax XR 12h",
                fullTitle = "Xanax XR / Alprazolam LP 12h (Matrice hydrophile à libération prolongée)",
                kineticDescription = "Montée progressive sur 3h et maintien d'une concentration stable sur 12h sans pic brutal.",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.25, durationStretchFactor = 1.2),
                    ReleaseWave(delayHours = 1.0, fraction = 0.75, durationStretchFactor = 2.6, plateauHours = 7.0)
                )
            )
        ),
        "zolpidem" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Stilnox LI 10mg",
                fullTitle = "Stilnox LI 10 mg (100% immédiat — inducteur de sommeil)",
                kineticDescription = "Pic rapide en 20-30 min, durée courte 3-4h sans somnolence résiduelle."
            ),
            ReleaseProfile(
                id = "STILNOX_CR",
                shortLabel = "Stilnox CR (Bicouche)",
                fullTitle = "Stilnox CR / Ambien CR (Comprimé bicouche : 60% LI + 40% LP)",
                kineticDescription = "Bicouche : 60% immédiat pour l'endormissement et 40% sur 6h pour prévenir les réveils nocturnes.",
                totalDurationHours = 7.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.60, durationStretchFactor = 0.9),
                    ReleaseWave(delayHours = 0.75, fraction = 0.40, durationStretchFactor = 1.8, plateauHours = 3.5)
                )
            )
        ),
        "melatonin" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Mélatonine LI",
                fullTitle = "Mélatonine LI (Compléments alimentaires / gouttes — immédiat)",
                kineticDescription = "Pic rapide en 20-40 min, élimination rapide en 2-3h."
            ),
            ReleaseProfile(
                id = "CIRCADIN_LP_8H",
                shortLabel = "Circadin LP 8h",
                fullTitle = "Circadin LP 2 mg / Slenyto (Matrice à libération prolongée 8 heures)",
                kineticDescription = "Matrice hydrophile mimant fidèlement le profil de sécrétion nocturne de mélatonine sur 8h.",
                totalDurationHours = 8.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.25, durationStretchFactor = 1.1),
                    ReleaseWave(delayHours = 0.8, fraction = 0.75, durationStretchFactor = 2.0, plateauHours = 4.5)
                )
            )
        ),
        "venlafaxine" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Effexor LI",
                fullTitle = "Effexor LI (Comprimé conventionnel — 2 à 3 prises/j)",
                kineticDescription = "Absorption rapide avec demi-vie courte nécessitant des prises fractionnées."
            ),
            ReleaseProfile(
                id = "EFFEXOR_LP_24H",
                shortLabel = "Effexor LP 24h",
                fullTitle = "Effexor LP 24h (Gélule de microgranules à libération prolongée 24h)",
                kineticDescription = "Microgranules à membrane polymérique libérant la venlafaxine de façon stable sur 24h (1 prise le matin).",
                totalDurationHours = 24.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.15, durationStretchFactor = 1.2),
                    ReleaseWave(delayHours = 1.5, fraction = 0.85, durationStretchFactor = 4.0, plateauHours = 16.0)
                )
            )
        ),
        "bupropion" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Wellbutrin IR",
                fullTitle = "Wellbutrin IR (Libération immédiate — 3 prises/jour)",
                kineticDescription = "Forme immédiate nécessitant un fractionnement strict."
            ),
            ReleaseProfile(
                id = "ZYBAN_LP_12H",
                shortLabel = "Zyban LP 12h",
                fullTitle = "Zyban LP 12h / Wellbutrin SR (Comprimé matriciel à libération ralentie 12h)",
                kineticDescription = "Matrice hydrophile étalant la diffusion sur 12 heures (2 prises par jour espacées d'au moins 8h).",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.30, durationStretchFactor = 1.0),
                    ReleaseWave(delayHours = 1.0, fraction = 0.70, durationStretchFactor = 2.4, plateauHours = 7.0)
                )
            ),
            ReleaseProfile(
                id = "WELLBUTRIN_XL_24H",
                shortLabel = "Wellbutrin XL 24h",
                fullTitle = "Wellbutrin XL 24h (Comprimé à libération prolongée sur 24 heures)",
                kineticDescription = "Membrane semi-perméable assurant une diffusion continue sur 24 heures en prise unique matinale.",
                totalDurationHours = 24.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.15, durationStretchFactor = 1.2),
                    ReleaseWave(delayHours = 1.5, fraction = 0.85, durationStretchFactor = 4.2, plateauHours = 16.0)
                )
            )
        ),
        "quetiapine" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Xeroquel LI",
                fullTitle = "Xeroquel LI / Séroquel (Comprimé conventionnel — 2 prises/j)",
                kineticDescription = "Pic sédatif rapide en 1h à 1h30, durée courte nécessitant 2 prises par jour."
            ),
            ReleaseProfile(
                id = "XEROQUEL_LP_24H",
                shortLabel = "Xeroquel LP 24h",
                fullTitle = "Xeroquel LP 24h / Seroquel XR (Matrice à libération prolongée 24h)",
                kineticDescription = "Matrice hydrophile étalant la diffusion sur 24 heures sans pic de somnolence brutal (1 prise au coucher).",
                totalDurationHours = 24.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.15, durationStretchFactor = 1.2),
                    ReleaseWave(delayHours = 1.5, fraction = 0.85, durationStretchFactor = 4.0, plateauHours = 16.0)
                )
            )
        ),
        "lithium" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Téralithe 250 LI",
                fullTitle = "Téralithe 250 mg (Carbonate de lithium à libération immédiate)",
                kineticDescription = "Absorption rapide avec pic plasmatique en 1-2h (2 à 3 prises quotidiennes)."
            ),
            ReleaseProfile(
                id = "TERALITHE_LP_400",
                shortLabel = "Téralithe LP 400",
                fullTitle = "Téralithe LP 400 mg (Comprimé sécable à libération prolongée 12h-24h)",
                kineticDescription = "Matrice inerte libérant le lithium régulièrement sur 12 à 24 heures, stabilisant la lithémie en 1-2 prises/j.",
                totalDurationHours = 18.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.25, durationStretchFactor = 1.2),
                    ReleaseWave(delayHours = 1.0, fraction = 0.75, durationStretchFactor = 2.8, plateauHours = 10.0)
                )
            )
        ),
        "valproate" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Dépakine LI",
                fullTitle = "Dépakine LI (Valproate de sodium — comprimé gastro-résistant)",
                kineticDescription = "Pic plasmatique en 2 à 3h, fluctuations journalières nécessitant 2 à 3 prises."
            ),
            ReleaseProfile(
                id = "DEPAKINE_CHRONO_12H",
                shortLabel = "Dépakine Chrono LP",
                fullTitle = "Dépakine Chrono 500 mg LP (Matrice sécable à libération prolongée 12h)",
                kineticDescription = "Comprimé matriciel sécable à dissolution lente assurant une concentration stable sur 12 à 24h.",
                totalDurationHours = 16.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.25, durationStretchFactor = 1.1),
                    ReleaseWave(delayHours = 1.0, fraction = 0.75, durationStretchFactor = 2.6, plateauHours = 8.0)
                )
            )
        ),
        "carbamazepine" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Tégrétol LI 200",
                fullTitle = "Tégrétol LI (Comprimé conventionnel — 3 prises/j)",
                kineticDescription = "Absorption avec pics pouvant entraîner vertiges et diplopie."
            ),
            ReleaseProfile(
                id = "TEGRETOL_LP_12H",
                shortLabel = "Tégrétol LP 12h",
                fullTitle = "Tégrétol LP 200/400 mg (Comprimé sécable à libération prolongée 12h)",
                kineticDescription = "Matrice inerte réduisant les pics plasmatiques et maintenant des taux stables (2 prises/j).",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.25, durationStretchFactor = 1.1),
                    ReleaseWave(delayHours = 1.0, fraction = 0.75, durationStretchFactor = 2.5, plateauHours = 7.0)
                )
            )
        ),
        "propranolol" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Avlocardyl LI 40",
                fullTitle = "Avlocardyl LI 40 mg (Comprimé sécable à libération immédiate)",
                kineticDescription = "Pic bêta-bloquant en 1 à 2h, durée de 4 à 6h (2 à 3 prises/j)."
            ),
            ReleaseProfile(
                id = "AVLOCARDYL_LP_160",
                shortLabel = "Avlocardyl LP 160",
                fullTitle = "Avlocardyl LP 160 mg (Gélule de microgranules à libération prolongée 24h)",
                kineticDescription = "Microgranules à diffusion continue assurant une couverture hémodynamique stable sur 24h (1 prise le matin).",
                totalDurationHours = 24.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.15, durationStretchFactor = 1.2),
                    ReleaseWave(delayHours = 1.5, fraction = 0.85, durationStretchFactor = 4.0, plateauHours = 16.0)
                )
            )
        ),
        "pregabalin" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Lyrica LI",
                fullTitle = "Lyrica LI (Gélule standard — 2 à 3 prises par jour)",
                kineticDescription = "Absorption rapide avec pic plasmatique en 1 heure (biodisponibilité >90%)."
            ),
            ReleaseProfile(
                id = "LYRICA_CR_24H",
                shortLabel = "Lyrica CR 24h",
                fullTitle = "Lyrica CR 24h (Comprimé matriciel gastro-rétentif à libération prolongée)",
                kineticDescription = "Formulation qui gonfle dans l'estomac et libère la prégabaline lentement sur 24 heures (1 prise le soir).",
                totalDurationHours = 24.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.15, durationStretchFactor = 1.2),
                    ReleaseWave(delayHours = 1.5, fraction = 0.85, durationStretchFactor = 4.0, plateauHours = 16.0)
                )
            )
        ),
        "dihydrocodeine" to listOf(
            ReleaseProfile(
                id = "DICODIN_LP_12H",
                shortLabel = "Dicodin LP 12h",
                fullTitle = "Dicodin LP 60 mg (Comprimé à libération prolongée sur 12 heures)",
                kineticDescription = "Matrice enrobée libérant la dihydrocodéine de manière continue sur 12 heures (2 prises quotidiennes).",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.25, durationStretchFactor = 1.0),
                    ReleaseWave(delayHours = 1.0, fraction = 0.75, durationStretchFactor = 2.4, plateauHours = 7.5)
                )
            )
        ),
        "lisdexamfetamine" to listOf(
            ReleaseProfile(
                id = "VYVANSE_PRODRUG",
                shortLabel = "Vyvanse / Elvanse",
                fullTitle = "Vyvanse / Elvanse (Prodrogue à activation érythrocytaire continue sur 12-14h)",
                kineticDescription = "Prodrogue enzymatique activée par les globules rouges, libération lisse sur 12 à 14 heures sans pic abrupt.",
                totalDurationHours = 14.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.20, durationStretchFactor = 1.2),
                    ReleaseWave(delayHours = 1.0, fraction = 0.80, durationStretchFactor = 2.8, plateauHours = 8.0)
                )
            )
        ),
        "paroxetine" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Déroxat LI",
                fullTitle = "Déroxat LI (Comprimé pelliculé sécable — 100% immédiat)",
                kineticDescription = "Forme conventionnelle à libération immédiate (prise unique matinale)."
            ),
            ReleaseProfile(
                id = "PAXIL_CR",
                shortLabel = "Paxil CR",
                fullTitle = "Paxil CR / Déroxat LP (Matrice géomatrice multicouche à libération contrôlée)",
                kineticDescription = "Matrice multicouche Geomatrix régulant la libération dans l'intestin grêle.",
                totalDurationHours = 18.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.25, durationStretchFactor = 1.1),
                    ReleaseWave(delayHours = 1.0, fraction = 0.75, durationStretchFactor = 2.6, plateauHours = 8.0)
                )
            )
        ),
        "baclofen" to listOf(
            immediateDefault.copy(
                id = "IR",
                shortLabel = "Liorésal LI",
                fullTitle = "Liorésal LI (Comprimé sécable 10-25 mg — 100% immédiat)",
                kineticDescription = "100% libéré immédiatement : pic en 1-2h, nécessite 3 à 4 prises par jour."
            ),
            ReleaseProfile(
                id = "BACLOCUR_LP",
                shortLabel = "Baclocur LP 12h",
                fullTitle = "Baclocur LP 12h (Comprimé matriciel à libération prolongée)",
                kineticDescription = "Matrice assurant une diffusion étalée sur 12 heures, limitant les pics de somnolence.",
                totalDurationHours = 12.0,
                waves = listOf(
                    ReleaseWave(delayHours = 0.0, fraction = 0.25, durationStretchFactor = 1.0),
                    ReleaseWave(delayHours = 1.0, fraction = 0.75, durationStretchFactor = 2.4, plateauHours = 7.0)
                )
            )
        )
    )

    fun getProfilesForSubstance(substanceName: String, route: AdministrationRoute): List<ReleaseProfile> {
        if (route != AdministrationRoute.ORAL) {
            return listOf(immediateDefault)
        }
        return specificProfilesBySubstance[substanceName.lowercase()] ?: listOf(immediateDefault)
    }
}
