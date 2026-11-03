package com.isaakhanimann.journal.data.substances

import com.isaakhanimann.journal.data.room.experiences.entities.AdaptiveColor
import com.isaakhanimann.journal.data.room.experiences.entities.SubstanceColor
import com.isaakhanimann.journal.data.substances.classes.Substance

object SubstanceColorPalette {

    /**
     * Nuancier standardisé des familles chimiques et pharmacologiques.
     * Chaque famille possède une couleur de base bien distincte, avec des nuances
     * facilement perceptibles pour différencier les sous-classes ou molécules proches.
     * Les antidépresseurs, AINS, AIS, antipsychotiques, anxiolytiques non-benzo et antalgiques purs
     * sont traités comme des familles unifiées.
     */
    fun getDefaultSubstanceColor(substance: Substance?): SubstanceColor {
        if (substance == null) {
            return SubstanceColor.Predefined(AdaptiveColor.BLUE)
        }

        val name = substance.name.lowercase()
        val cats = substance.categories

        // 1. Gabapentinoïdes (Famille dédiée : Sarcelle canard / Teal) - Strictement : Gabapentine, Phenibut, Prégabaline
        if (cats.contains("gabapentinoid") || name.contains("pregabalin") || name.contains("gabapentin") ||
            name == "phenibut") {
            return when {
                name.contains("pregabalin") -> SubstanceColor.Predefined(AdaptiveColor.TEAL)
                name.contains("gabapentin") -> SubstanceColor.Predefined(AdaptiveColor.LIGHT_SEA_GREEN)
                name.contains("phenibut") -> SubstanceColor.Predefined(AdaptiveColor.DARK_TURQUOISE)
                else -> SubstanceColor.Predefined(AdaptiveColor.TEAL)
            }
        }

        // 2. Opioïdes (Famille : Ambre chaud / Brun)
        if (cats.contains("opioid") || name.contains("morphine") || name.contains("fentanyl") ||
            name.contains("codeine") || name.contains("hydrocodone") || name.contains("hydromorphone") ||
            name.contains("oxycodone") || name.contains("oxymorphone") || name.contains("heroin") ||
            name.contains("buprenorphine") || name.contains("tilidin") || name.contains("methadone") ||
            name.contains("tramadol") || name.contains("tapentadol") || name.contains("opium")) {
            return when {
                name.contains("fentanyl") || name.contains("sufentanil") -> SubstanceColor.Predefined(AdaptiveColor.MAROON)
                name.contains("tramadol") || name.contains("tapentadol") || name.contains("methadone") || name.contains("o-dsmt") ->
                    SubstanceColor.Predefined(AdaptiveColor.SADDLE_BROWN)
                name.contains("kratom") -> SubstanceColor.Predefined(AdaptiveColor.DARK_OLIVE_GREEN)
                name.contains("naloxone") || name.contains("naltrexone") || name.contains("nalmefene") ->
                    SubstanceColor.Predefined(AdaptiveColor.BRONZE)
                name.contains("oxycodone") || name.contains("hydromorphone") || name.contains("buprenorphine") ->
                    SubstanceColor.Predefined(AdaptiveColor.AUBURN)
                else -> SubstanceColor.Predefined(AdaptiveColor.BROWN)
            }
        }

        // 3. Benzodiazépines & Z-drugs (Famille : Bleu Roi / Électrique)
        if (cats.contains("benzodiazepine") || name.contains("zepam") || name.contains("zolam") ||
            name.contains("etizolam") || name.contains("zolpidem") || name.contains("zopiclone") || name.contains("zaleplon")) {
            return when {
                name.contains("zolpidem") || name.contains("zopiclone") || name.contains("zaleplon") ->
                    SubstanceColor.Predefined(AdaptiveColor.ROYAL_BLUE)
                name.contains("clonazolam") || name.contains("flualprazolam") || name.contains("flubromazolam") || name.contains("etizolam") ->
                    SubstanceColor.Predefined(AdaptiveColor.DODGER_BLUE)
                else -> SubstanceColor.Predefined(AdaptiveColor.BLUE)
            }
        }

        // 4. Vrais Antalgiques non-opioïdes (Famille unifiée : Rouge Vermillon / Corail)
        // Réservé strictement aux vrais antalgiques (Paracétamol, Néfopam, Métamizole)
        if (cats.contains("analgesic") || name.contains("paracetamol") || name.contains("acetaminophen") ||
            name.contains("nefopam") || name.contains("acupan") || name.contains("metamizole")) {
            return when {
                name.contains("paracetamol") || name.contains("acetaminophen") -> SubstanceColor.Predefined(AdaptiveColor.RED)
                name.contains("nefopam") || name.contains("acupan") -> SubstanceColor.Predefined(AdaptiveColor.CINNABAR)
                else -> SubstanceColor.Predefined(AdaptiveColor.CORAL)
            }
        }

        // 5. AINS (Famille unifiée : Rouge Carmin Vif)
        if (cats.contains("nsaid") || name.contains("ibuprofen") || name.contains("ketoprofen") || name.contains("naproxen") ||
            name.contains("diclofenac") || name.contains("aspirin") || name.contains("celecoxib")) {
            return SubstanceColor.Predefined(AdaptiveColor.FIRE_ENGINE_RED)
        }

        // 6. AIS / Corticoïdes (Famille unifiée : Rose Pourpre / Framboise)
        if (cats.contains("corticosteroid") || name.contains("prednisol") || name.contains("cortisone") || name.contains("dexamethasone")) {
            return SubstanceColor.Predefined(AdaptiveColor.FUCHSIA)
        }

        // 7. Antidépresseurs (Famille unifiée : Vert Céladon / Émeraude doux)
        // Toutes classes confondues (ISRS, IRSNa, TCA, IMAO, NaSSA)
        if (cats.contains("antidepressant") || cats.contains("ssri") || cats.contains("snri") || cats.contains("tca") || cats.contains("maoi") ||
            name.contains("sertraline") || name.contains("citalopram") || name.contains("venlafaxine") || name.contains("fluoxetine") ||
            name.contains("mirtazapine") || name.contains("amitriptyline")) {
            return SubstanceColor.Predefined(AdaptiveColor.MINT)
        }

        // 8. Antipsychotiques / Neuroleptiques (Famille unifiée : Prune / Magenta Sombre)
        if (cats.contains("antipsychotic") || name.contains("cyamemazine") || name.contains("tercian") || name.contains("nozinan") ||
            name.contains("haloperidol") || name.contains("olanzapine") || name.contains("risperidone") || name.contains("quetiapine") ||
            name.contains("loxapine")) {
            return SubstanceColor.Predefined(AdaptiveColor.DARK_MAGENTA)
        }

        // 9. Anxiolytiques non-benzodiazépines (Famille unifiée : Lavande / Indigo Doux)
        if (cats.contains("anxiolytic") || name.contains("hydroxyzine") || name.contains("atarax") ||
            name.contains("etifoxine") || name.contains("buspirone") || name.contains("propranolol")) {
            return SubstanceColor.Predefined(AdaptiveColor.DEEP_LAVENDER)
        }

        // 10. Thymorégulateurs (Famille : Violet Pourpre Foncé)
        if (cats.contains("mood-stabilizer") || cats.contains("anticonvulsant") || name.contains("lithium") ||
            name.contains("valproate") || name.contains("depakine") || name.contains("lamotrigine") || name.contains("carbamazepine")) {
            return SubstanceColor.Predefined(AdaptiveColor.INDIGO)
        }

        // 11. Triptans (Famille : Jaune Ambré / Ocre)
        if (cats.contains("triptan") || name.contains("triptan")) {
            return SubstanceColor.Predefined(AdaptiveColor.DARK_GOLD)
        }

        // 12. Stimulants & Phénéthylamines (Famille : Orange Vif / Électrique)
        if (cats.contains("stimulant") || name.contains("amphetamine") || name.contains("methylphenidate") ||
            name.contains("cocaine") || name.contains("mephedrone") || name.contains("cathinone")) {
            return when {
                name.contains("cocaine") -> SubstanceColor.Predefined(AdaptiveColor.RUST)
                name.contains("methylphenidate") || name.contains("4f-mph") -> SubstanceColor.Predefined(AdaptiveColor.DARK_ORANGE)
                name.contains("mephedrone") || name.contains("mmc") || name.contains("cmc") || name.contains("mec") || name.contains("pihp") || name.contains("eutylone") || name.contains("cathinone") -> SubstanceColor.Predefined(AdaptiveColor.ORANGE_RED)
                name.contains("modafinil") || name.contains("armodafinil") -> SubstanceColor.Predefined(AdaptiveColor.GOLD)
                else -> SubstanceColor.Predefined(AdaptiveColor.ORANGE)
            }
        }

        // 13. Entactogènes (Famille : Fuchsia / Rose Bonbon)
        if (cats.contains("entactogen") || name.contains("mdma") || name.contains("mda") || name.contains("mapb") || name.contains("apb")) {
            return when {
                name.contains("mda") -> SubstanceColor.Predefined(AdaptiveColor.DEEP_PINK)
                name.contains("apb") -> SubstanceColor.Predefined(AdaptiveColor.HOT_PINK)
                else -> SubstanceColor.Predefined(AdaptiveColor.PINK)
            }
        }

        // 14. Psychédéliques (Famille : Violet Profond / Améthyste)
        if (cats.contains("psychedelic")) {
            return when {
                name.contains("lsd") || name.contains("lad") || name.contains("lsz") || name.contains("lsa") ->
                    SubstanceColor.Predefined(AdaptiveColor.DARK_VIOLET)
                name.contains("tryptamine") || name.contains("dmt") || name.contains("psiloc") ->
                    SubstanceColor.Predefined(AdaptiveColor.BLUE_VIOLET)
                name.contains("2c-") || name.contains("mescaline") ->
                    SubstanceColor.Predefined(AdaptiveColor.MAGENTA)
                else -> SubstanceColor.Predefined(AdaptiveColor.PURPLE)
            }
        }

        // 15. Dissociatifs (Famille : Cyan Glacé / Bleu Ciel)
        if (cats.contains("dissociative")) {
            return when {
                name.contains("ketamine") || name.contains("fdck") || name.contains("dck") || name.contains("mxe") ->
                    SubstanceColor.Predefined(AdaptiveColor.CYAN)
                name.contains("pcp") || name.contains("pce") ->
                    SubstanceColor.Predefined(AdaptiveColor.DARK_TURQUOISE)
                else -> SubstanceColor.Predefined(AdaptiveColor.CYAN)
            }
        }

        // 16. Cannabinoïdes (Famille : Vert Émeraude)
        if (cats.contains("cannabinoid") || name.contains("cannabis") || name.contains("thc") || name.contains("cbd")) {
            return if (name.contains("jwh") || name.contains("akb") || name.contains("fubinaca")) {
                SubstanceColor.Predefined(AdaptiveColor.FOREST_GREEN)
            } else {
                SubstanceColor.Predefined(AdaptiveColor.GREEN)
            }
        }

        // 17. Dépresseurs & GABA autres (Famille : Bleu Ardoise / Cobalt Sombre)
        if (cats.contains("depressant") || cats.contains("barbiturate") || name.contains("ghb") || name.contains("gbl") ||
            name.contains("butanediol") || name.contains("alcohol") || name.contains("ethanol")) {
            return SubstanceColor.Predefined(AdaptiveColor.TEAL)
        }

        // 18. Nootropiques (Famille : Jaune Citron / Or)
        if (cats.contains("nootropic") || name.contains("racetam") || name.contains("noopept")) {
            return SubstanceColor.Predefined(AdaptiveColor.YELLOW)
        }

        // 19. Délirigènes
        if (cats.contains("deliriant") || name.contains("datura") || name.contains("scopolamine")) {
            return SubstanceColor.Predefined(AdaptiveColor.MAROON)
        }

        return SubstanceColor.Predefined(AdaptiveColor.BLUE)
    }
}
