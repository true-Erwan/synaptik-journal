package com.isaakhanimann.journal.data.substances.classes.roa

data class OpioidEquianalgesicProfile(
    val substanceName: String,
    val oralPotencyVsMorphineOral: Double,
    val oralPotencyVsOxycodoneOral: Double,
    val ivPotencyVsMorphineIv: Double?,
    val oralBioavailabilityRangePercent: IntRange?,
    val oralHeavyThresholdMg: Double?,
    val ivHeavyThresholdMg: Double?,
    val preservesPsychonautWikiThresholdsForAtypicalToxicity: Boolean = false,
    val atypicalRiskNote: String? = null
)

object OpioidEquianalgesicReference {

    const val ORAL_REFERENCE_SUBSTANCE = "Oxycodone"
    const val ORAL_REFERENCE_HEAVY_MG = 40.0

    const val IV_REFERENCE_SUBSTANCE = "Morphine"
    const val IV_REFERENCE_HEAVY_MG = 15.0

    val profilesBySubstance: Map<String, OpioidEquianalgesicProfile> = mapOf(
        "oxycodone" to OpioidEquianalgesicProfile(
            substanceName = "Oxycodone",
            oralPotencyVsMorphineOral = 1.75,
            oralPotencyVsOxycodoneOral = 1.0,
            ivPotencyVsMorphineIv = 1.0,
            oralBioavailabilityRangePercent = 60..87,
            oralHeavyThresholdMg = 40.0,
            ivHeavyThresholdMg = 15.0
        ),
        "morphine" to OpioidEquianalgesicProfile(
            substanceName = "Morphine",
            oralPotencyVsMorphineOral = 1.0,
            oralPotencyVsOxycodoneOral = 0.57,
            ivPotencyVsMorphineIv = 1.0,
            oralBioavailabilityRangePercent = 20..30,
            oralHeavyThresholdMg = 70.0, // Fourchette 60 à 80 mg (biodisponibilité 20-30% vs ~80% pour l'oxycodone)
            ivHeavyThresholdMg = 15.0
        ),
        "hydromorphone" to OpioidEquianalgesicProfile(
            substanceName = "Hydromorphone",
            oralPotencyVsMorphineOral = 5.0,
            oralPotencyVsOxycodoneOral = 3.3,
            ivPotencyVsMorphineIv = 7.5,
            oralBioavailabilityRangePercent = 20..25,
            oralHeavyThresholdMg = 12.0,
            ivHeavyThresholdMg = 2.0
        ),
        "fentanyl" to OpioidEquianalgesicProfile(
            substanceName = "Fentanyl",
            oralPotencyVsMorphineOral = 50.0,
            oralPotencyVsOxycodoneOral = 30.0,
            ivPotencyVsMorphineIv = 100.0,
            oralBioavailabilityRangePercent = 30..35,
            oralHeavyThresholdMg = null,
            ivHeavyThresholdMg = 0.12 // 120 µg IV
        ),
        "codeine" to OpioidEquianalgesicProfile(
            substanceName = "Codeine",
            oralPotencyVsMorphineOral = 0.15,
            oralPotencyVsOxycodoneOral = 0.09,
            ivPotencyVsMorphineIv = null,
            oralBioavailabilityRangePercent = 70..90,
            oralHeavyThresholdMg = 240.0,
            ivHeavyThresholdMg = null,
            atypicalRiskNote = "Prodrogue CYP2D6 avec saturation enzymatique et relargage histaminique sévère au-delà de 240-300 mg."
        ),
        "dihydrocodeine" to OpioidEquianalgesicProfile(
            substanceName = "Dihydrocodeine",
            oralPotencyVsMorphineOral = 0.20,
            oralPotencyVsOxycodoneOral = 0.12,
            ivPotencyVsMorphineIv = null,
            oralBioavailabilityRangePercent = 20..30,
            oralHeavyThresholdMg = 180.0,
            ivHeavyThresholdMg = null
        ),
        "oxymorphone" to OpioidEquianalgesicProfile(
            substanceName = "Oxymorphone",
            oralPotencyVsMorphineOral = 3.0,
            oralPotencyVsOxycodoneOral = 1.75,
            ivPotencyVsMorphineIv = 10.0,
            oralBioavailabilityRangePercent = 10..15,
            oralHeavyThresholdMg = 30.0,
            ivHeavyThresholdMg = 1.5
        ),
        "tramadol" to OpioidEquianalgesicProfile(
            substanceName = "Tramadol",
            oralPotencyVsMorphineOral = 0.20,
            oralPotencyVsOxycodoneOral = 0.11,
            ivPotencyVsMorphineIv = 0.10,
            oralBioavailabilityRangePercent = 70..90,
            oralHeavyThresholdMg = 300.0,
            ivHeavyThresholdMg = 150.0,
            preservesPsychonautWikiThresholdsForAtypicalToxicity = true,
            atypicalRiskNote = "Paliers PsychonautWiki conservés (Heavy oral = 300 mg) en raison du risque convulsif majeur et du syndrome sérotoninergique dès 300-400 mg."
        ),
        "tapentadol" to OpioidEquianalgesicProfile(
            substanceName = "Tapentadol",
            oralPotencyVsMorphineOral = 0.40,
            oralPotencyVsOxycodoneOral = 0.23,
            ivPotencyVsMorphineIv = null,
            oralBioavailabilityRangePercent = 30..35,
            oralHeavyThresholdMg = 150.0,
            ivHeavyThresholdMg = null,
            preservesPsychonautWikiThresholdsForAtypicalToxicity = true,
            atypicalRiskNote = "Paliers PsychonautWiki conservés (Heavy oral = 150 mg) en raison de la surcharge noradrénergique, délirante et pro-convulsivante à haute dose."
        )
    )

    fun getProfile(substanceName: String): OpioidEquianalgesicProfile? =
        profilesBySubstance[substanceName.lowercase()]
}

