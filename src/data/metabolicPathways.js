const ENZYME_CATALOG = {
  "CYP3A4": {
    "id": "CYP3A4",
    "group": "CYP450",
    "nameFr": "CYP3A4 / CYP3A5 (Cytochrome 3A4/5)",
    "nameEn": "CYP3A4 / CYP3A5 (Cytochrome 3A4/5)",
    "descFr": "Voie hépatique et intestinale majeure (~50% des médicaments : Oxycodone, Alprazolam, Zolpidem, Quétiapine, Fentanyl, Buprénorphine, Kétamine). Fortement inhibée par le pamplemousse et les macrolides.",
    "descEn": "Major hepatic & intestinal pathway (~50% of drugs: Oxycodone, Alprazolam, Zolpidem, Quetiapine, Fentanyl, Buprenorphine, Ketamine). Strongly inhibited by grapefruit and macrolides.",
    "mutationsFr": "Polymorphismes rares : CYP3A4*22 (métaboliseur lent), CYP3A5*1 (expresseur rapide)",
    "mutationsEn": "Rare polymorphisms: CYP3A4*22 (slow metabolizer), CYP3A5*1 (fast expresser)"
  },
  "CYP2D6": {
    "id": "CYP2D6",
    "group": "CYP450",
    "nameFr": "CYP2D6 (Cytochrome 2D6)",
    "nameEn": "CYP2D6 (Cytochrome 2D6)",
    "descFr": "Enzyme très polymorphe (7-10% de métaboliseurs lents caucasiens, jusqu'à 29% d'ultra-rapides selon l'ethnie). Clé pour Oxycodone, Tramadol, Codéine, DXM, Venlafaxine, Paroxétine, Rispéridone, MDMA, Propranolol.",
    "descEn": "Highly polymorphic enzyme (7-10% Caucasian poor metabolizers, up to 29% ultra-rapid). Key for Oxycodone, Tramadol, Codeine, DXM, Venlafaxine, Paroxetine, Risperidone, MDMA, Propranolol.",
    "mutationsFr": "Variants : *3, *4, *5, *6 (Déficit PM), *10, *17, *41 (Lent IM), Duplication *1xN / *2xN (Ultra-rapide UM)",
    "mutationsEn": "Variants: *3, *4, *5, *6 (Null PM), *10, *17, *41 (Slow IM), Gene duplication *1xN / *2xN (Ultra-rapid UM)"
  },
  "CYP2C19": {
    "id": "CYP2C19",
    "group": "CYP450",
    "nameFr": "CYP2C19 (Cytochrome 2C19)",
    "nameEn": "CYP2C19 (Cytochrome 2C19)",
    "descFr": "Métabolise le Diazépam, Clobazam, Escitalopram, Citalopram, Sertraline, Amitriptyline, Clomipramine, Carisoprodol et Phénobarbital.",
    "descEn": "Metabolizes Diazepam, Clobazam, Escitalopram, Citalopram, Sertraline, Amitriptyline, Clomipramine, Carisoprodol and Phenobarbital.",
    "mutationsFr": "Variants : *2, *3 (Perte de fonction PM : 2-5% Europe, 15% Asie), *17 (Gain de fonction Ultra-rapide UM)",
    "mutationsEn": "Variants: *2, *3 (Loss of function PM: 2-5% Europe, 15% Asia), *17 (Gain of function Ultra-rapid UM)"
  },
  "CYP2C9": {
    "id": "CYP2C9",
    "group": "CYP450",
    "nameFr": "CYP2C9 (Cytochrome 2C9)",
    "nameEn": "CYP2C9 (Cytochrome 2C9)",
    "descFr": "Voie principale des AINS (Ibuprofène, Naproxène, Diclofénac, Célécoxib, Méloxicam, Piroxicam, Flurbiprofène), du THC (Cannabis) et du Valproate.",
    "descEn": "Primary pathway for NSAIDs (Ibuprofen, Naproxen, Diclofenac, Celecoxib, Meloxicam, Piroxicam, Flurbiprofen), THC (Cannabis) and Valproate.",
    "mutationsFr": "Variants : CYP2C9*2 (activité -30 à -40%), CYP2C9*3 (activité -75 à -85% : élimination très ralentie des AINS et du THC)",
    "mutationsEn": "Variants: CYP2C9*2 (-30 to -40% activity), CYP2C9*3 (-75 to -85% activity: markedly slowed clearance of NSAIDs and THC)"
  },
  "CYP1A2": {
    "id": "CYP1A2",
    "group": "CYP450",
    "nameFr": "CYP1A2 (Cytochrome 1A2)",
    "nameEn": "CYP1A2 (Cytochrome 1A2)",
    "descFr": "Élimine la Caféine (>90%), Mélatonine, Olanzapine, Clozapine, Duloxétine, Tizanidine, Agomélatine et Mirtazapine. Induit par le tabac, inhibé par la fluvoxamine.",
    "descEn": "Clears Caffeine (>90%), Melatonin, Olanzapine, Clozapine, Duloxetine, Tizanidine, Agomelatine and Mirtazapine. Induced by smoking, inhibited by fluvoxamine.",
    "mutationsFr": "Variants : CYP1A2*1F (Inductibilité ultra-rapide), CYP1A2*1C / *1K (Métaboliseur lent)",
    "mutationsEn": "Variants: CYP1A2*1F (Ultra-rapid inducibility), CYP1A2*1C / *1K (Slow metabolizer)"
  },
  "CYP2B6": {
    "id": "CYP2B6",
    "group": "CYP450",
    "nameFr": "CYP2B6 (Cytochrome 2B6)",
    "nameEn": "CYP2B6 (Cytochrome 2B6)",
    "descFr": "Voie majeure pour la Kétamine, le Bupropion, la S-Méthadone, l'Efavirenz et la Sélégiline.",
    "descEn": "Major pathway for Ketamine, Bupropion, S-Methadone, Efavirenz and Selegiline.",
    "mutationsFr": "Variants : CYP2B6*6, *18 (Activité réduite de 50-75% -> demi-vie doublée pour Kétamine/Méthadone), *4 (Rapide)",
    "mutationsEn": "Variants: CYP2B6*6, *18 (50-75% reduced activity -> doubled half-life for Ketamine/Methadone), *4 (Rapid)"
  },
  "CYP2A6": {
    "id": "CYP2A6",
    "group": "CYP450",
    "nameFr": "CYP2A6 (Cytochrome 2A6)",
    "nameEn": "CYP2A6 (Cytochrome 2A6)",
    "descFr": "Responsable à 80% de l'élimination de la Nicotine en cotinine et impliqué dans le métabolisme du Valproate.",
    "descEn": "Responsible for 80% of Nicotine clearance to cotinine and involved in Valproate metabolism.",
    "mutationsFr": "Variants : CYP2A6*2, *4 (Délétion complète PM), *9 (Lent)",
    "mutationsEn": "Variants: CYP2A6*2, *4 (Whole gene deletion PM), *9 (Slow)"
  },
  "CYP2E1": {
    "id": "CYP2E1",
    "group": "CYP450",
    "nameFr": "CYP2E1 (Cytochrome 2E1)",
    "nameEn": "CYP2E1 (Cytochrome 2E1)",
    "descFr": "Système oxydatif inductible par l'Alcool chronique ; convertit ~8% du Paracétamol en métabolite hépatotoxique NAPQI.",
    "descEn": "Microsomal ethanol-inducible enzyme; converts ~8% of Paracetamol into hepatotoxic NAPQI.",
    "mutationsFr": "Variants : CYP2E1*1D (Hyper-inductible), *5B (RsaI/PstI)",
    "mutationsEn": "Variants: CYP2E1*1D (Hyper-inducible), *5B (RsaI/PstI)"
  },
  "CYP2C8": {
    "id": "CYP2C8",
    "group": "CYP450",
    "nameFr": "CYP2C8 (Cytochrome 2C8)",
    "nameEn": "CYP2C8 (Cytochrome 2C8)",
    "descFr": "Impliqué dans la N-désalkylation de la Buprénorphine, de la Morphine (mineur) et d'anti-inflammatoires.",
    "descEn": "Involved in N-dealkylation of Buprenorphine, Morphine (minor) and anti-inflammatory agents.",
    "mutationsFr": "Variants : CYP2C8*2, *3, *4 (Activité réduite)",
    "mutationsEn": "Variants: CYP2C8*2, *3, *4 (Reduced activity)"
  },
  "CES1": {
    "id": "CES1",
    "group": "NON_CYP",
    "nameFr": "CES1 (Carboxylestérase 1 hépatique)",
    "nameEn": "CES1 (Hepatic Carboxylesterase 1)",
    "descFr": "Hydrolyse >80% du Méthylphénidate (Ritaline/Concerta), la Cocaïne, la Péthidine et l'Héroïne. Inhibée compétitivement par l'Alcool (transestérification en éthylphénidate).",
    "descEn": "Hydrolyzes >80% of Methylphenidate (Ritalin/Concerta), Cocaine, Pethidine and Heroin. Competitively inhibited by Alcohol (transesterification to ethylphenidate).",
    "mutationsFr": "Mutation rare : CES1 p.Gly143Glu (rs71647871) — perte d'activité de 75-85% sur le Méthylphénidate",
    "mutationsEn": "Rare mutation: CES1 p.Gly143Glu (rs71647871) — 75-85% loss of Methylphenidate hydrolysis"
  },
  "BChE": {
    "id": "BChE",
    "group": "NON_CYP",
    "nameFr": "BChE (Butyrylcholinestérase / Pseudocholinestérase)",
    "nameEn": "BChE (Butyrylcholinesterase / Pseudocholinesterase)",
    "descFr": "Estérase plasmatique dégradant la Cocaïne, l'Héroïne (en 6-MAM puis Morphine) et l'Aspirine.",
    "descEn": "Plasma esterase hydrolyzing Cocaine, Heroin (to 6-MAM then Morphine) and Aspirin.",
    "mutationsFr": "Mutations rares : Variant Atypique Asp70Gly (rs1799807), variant K, allèle silencieux (déficit sévère en pseudocholinestérase)",
    "mutationsEn": "Rare mutations: Atypical variant Asp70Gly (rs1799807), K-variant, silent allele (severe pseudocholinesterase deficiency)"
  },
  "ADH_ALDH2": {
    "id": "ADH_ALDH2",
    "group": "NON_CYP",
    "nameFr": "ADH1B / ALDH2 / SSADH (Alcool & GHB Déshydrogénases)",
    "nameEn": "ADH1B / ALDH2 / SSADH (Alcohol & GHB Dehydrogenases)",
    "descFr": "Oxyde l'Éthanol (Alcool), le 1,4-Butanediol et le GHB/GBL (cinétique saturable d'ordre zéro). Bloquée par le Disulfirame.",
    "descEn": "Oxidizes Ethanol (Alcohol), 1,4-Butanediol and GHB/GBL (saturable zero-order kinetics). Blocked by Disulfiram.",
    "mutationsFr": "Mutations : ALDH2*2 (rs671 — déficit sévère en acétaldéhyde déshydrogénase), ADH1B*2 (His48Arg ultra-rapide), déficit rare en SSADH",
    "mutationsEn": "Mutations: ALDH2*2 (rs671 — severe aldehyde dehydrogenase deficiency), ADH1B*2 (His48Arg ultra-rapid), rare SSADH deficiency"
  },
  "MAOA": {
    "id": "MAOA",
    "group": "NON_CYP",
    "nameFr": "MAO-A (Monoamine Oxydase A)",
    "nameEn": "MAO-A (Monoamine Oxidase A)",
    "descFr": "Désamine les Triptans (Sumatriptan, Rizatriptan, Zolmitriptan), la Sérotonine, la DMT, la 5-MeO-DMT et la Psilocine (~30%). Bloquée par les IMAO (Moclobémide, Phénelzine, Ayahuasca).",
    "descEn": "Deaminates Triptans (Sumatriptan, Rizatriptan, Zolmitriptan), Serotonin, DMT, 5-MeO-DMT and Psilocin (~30%). Blocked by MAOIs (Moclobemide, Phenelzine, Ayahuasca).",
    "mutationsFr": "Polymorphismes : MAOA-uVNTR (2R/3R basse activité vs 3.5R/4R haute activité), Syndrome rare de Brunner",
    "mutationsEn": "Polymorphisms: MAOA-uVNTR (2R/3R low activity vs 3.5R/4R high activity), rare Brunner syndrome"
  },
  "MAOB": {
    "id": "MAOB",
    "group": "NON_CYP",
    "nameFr": "MAO-B (Monoamine Oxydase B)",
    "nameEn": "MAO-B (Monoamine Oxidase B)",
    "descFr": "Désamine la Dopamine, les Phénéthylamines (2C-B, Mescaline). Inhibée sélectivement par la Sélégiline.",
    "descEn": "Deaminates Dopamine and Phenethylamines (2C-B, Mescaline). Selectively inhibited by Selegiline.",
    "mutationsFr": "Polymorphisme : MAOB intron 13 A644G (rs1799836)",
    "mutationsEn": "Polymorphism: MAOB intron 13 A644G (rs1799836)"
  },
  "COMT": {
    "id": "COMT",
    "group": "NON_CYP",
    "nameFr": "COMT (Catéchol-O-Méthyltransférase)",
    "nameEn": "COMT (Catechol-O-Methyltransferase)",
    "descFr": "Méthyle les catécholamines, l'Apomorphine, la MDMA (métabolites catéchols) et les Amphétamines.",
    "descEn": "Methylates catecholamines, Apomorphine, MDMA (catechol metabolites) and Amphetamines.",
    "mutationsFr": "Polymorphisme fréquent : Val158Met (rs4680) — homozygote Met/Met = activité COMT réduite de ~40% à 37°C",
    "mutationsEn": "Common polymorphism: Val158Met (rs4680) — Met/Met homozygote = ~40% lower COMT activity at 37°C"
  },
  "RBC_PEPTIDASE": {
    "id": "RBC_PEPTIDASE",
    "group": "NON_CYP",
    "nameFr": "Peptidases Érythrocytaires & Estérases Sériques",
    "nameEn": "Red Blood Cell Peptidases & Serum Esterases",
    "descFr": "Hydrolyse sanguine limitante activant les prodrogues comme la Lisdexamfétamine (Elvanse/Vyvanse) et les lysergamides 1-acylés (1P-LSD, 1cP-LSD, ALD-52).",
    "descEn": "Rate-limiting blood hydrolysis activating prodrugs such as Lisdexamfetamine (Elvanse/Vyvanse) and 1-acyl lysergamides (1P-LSD, 1cP-LSD, ALD-52).",
    "mutationsFr": "Cinétique très stable d'un individu à l'autre (indépendante des cytochromes hépatiques)",
    "mutationsEn": "Highly stable kinetics across individuals (independent of hepatic cytochromes)"
  },
  "UGT2B7": {
    "id": "UGT2B7",
    "group": "PHASE_II",
    "nameFr": "UGT2B7 (Glucuronosyltransférase 2B7)",
    "nameEn": "UGT2B7 (UDP-Glucuronosyltransferase 2B7)",
    "descFr": "Voie majeure des Opioïdes (Morphine >70%, Hydromorphone, Oxymorphone, Tapentadol, Buprénorphine), des Benzos \"LOT\" (Lorazépam, Oxazépam, Témazépam) et des AINS (Kétoprofène, Naproxène, Diclofénac, Ibuprofène) + Valproate.",
    "descEn": "Major pathway for Opioids (Morphine >70%, Hydromorphone, Oxymorphone, Tapentadol, Buprenorphine), \"LOT\" Benzos (Lorazepam, Oxazepam, Temazepam) and NSAIDs (Ketoprofen, Naproxen, Diclofenac, Ibuprofen) + Valproate.",
    "mutationsFr": "Polymorphismes : UGT2B7*2 (His268Tyr, rs7439366), promoteur -161C>T",
    "mutationsEn": "Polymorphisms: UGT2B7*2 (His268Tyr, rs7439366), promoter -161C>T"
  },
  "UGT1A1_1A9": {
    "id": "UGT1A1_1A9",
    "group": "PHASE_II",
    "nameFr": "UGT1A1 / 1A4 / 1A6 / 1A9 (Glucuronidation — Syndrome de Gilbert)",
    "nameEn": "UGT1A1 / 1A4 / 1A6 / 1A9 (Glucuronidation — Gilbert Syndrome)",
    "descFr": "Élimine ~55% du Paracétamol, la Lamotrigine (UGT1A4, inhibée par le Valproate !), la Psilocine (UGT1A9/1A10) et le Tapentadol.",
    "descEn": "Clears ~55% of Paracetamol, Lamotrigine (UGT1A4, strongly inhibited by Valproate!), Psilocin (UGT1A9/1A10) and Tapentadol.",
    "mutationsFr": "Syndrome de Gilbert : UGT1A1*28 (TA7/TA7, 5-10% de la population) ou UGT1A6*2 — glucuronidation ralentie de 30 à 50%",
    "mutationsEn": "Gilbert Syndrome: UGT1A1*28 (TA7/TA7, 5-10% of population) or UGT1A6*2 — 30 to 50% slower glucuronidation"
  },
  "SULT1A1": {
    "id": "SULT1A1",
    "group": "PHASE_II",
    "nameFr": "SULT1A1 / SULT1A3 (Sulfotransférases)",
    "nameEn": "SULT1A1 / SULT1A3 (Sulfotransferases)",
    "descFr": "Conjugue ~30% du Paracétamol (voie saturable à haute dose), le Tapentadol et l'Apomorphine.",
    "descEn": "Conjugates ~30% of Paracetamol (saturable at high doses), Tapentadol and Apomorphine.",
    "mutationsFr": "Polymorphisme : SULT1A1*2 (Arg213His, activité réduite) et variation du nombre de copies (CNV)",
    "mutationsEn": "Polymorphism: SULT1A1*2 (Arg213His, lower activity) and copy number variation (CNV)"
  },
  "NAT2": {
    "id": "NAT2",
    "group": "PHASE_II",
    "nameFr": "NAT2 (N-Acétyltransférase 2)",
    "nameEn": "NAT2 (N-Acetyltransferase 2)",
    "descFr": "Acétyle les métabolites aminés des nitro-benzodiazépines (Clonazépam, Nitrazépam, Flunitrazépam) et du Métamizole.",
    "descEn": "Acetylates amino metabolites of nitro-benzodiazepines (Clonazepam, Nitrazepam, Flunitrazepam) and Metamizole.",
    "mutationsFr": "Polymorphisme classique : Acétyleur Lent (NAT2*5, *6, *7 : ~50% des Européens) vs Acétyleur Rapide (*4)",
    "mutationsEn": "Classic polymorphism: Slow Acetylator (NAT2*5, *6, *7: ~50% of Europeans) vs Rapid Acetylator (*4)"
  },
  "RENAL_GFR": {
    "id": "RENAL_GFR",
    "group": "RENAL",
    "nameFr": "Filtration Glomérulaire Rénale (DFG / eGFR — Créatinine)",
    "nameEn": "Renal Glomerular Filtration (GFR / eGFR — Creatinine)",
    "descFr": "Élimination rénale directe sous forme inchangée dans les urines : Prégabaline (~98%), Gabapentine (100%), Lithium (95%), Baclofène (80%), Acamprosate (100%), Amisulpride (90%), Tiapride (90%), Lévétiracétam (66%), Topiramate (70%), Mémantine (75%), Piracétam (95%).",
    "descEn": "Direct unchanged urinary excretion: Pregabalin (~98%), Gabapentin (100%), Lithium (95%), Baclofen (80%), Acamprosate (100%), Amisulpride (90%), Tiapride (90%), Levetiracetam (66%), Topiramate (70%), Memantine (75%), Piracetam (95%).",
    "mutationsFr": "Dépend directement du Débit de Filtration Glomérulaire (DFG en mL/min/1.73m² calculé via la créatinine sanguine) et de l'hémodynamique rénale (ralentie par les AINS)",
    "mutationsEn": "Directly governed by Glomerular Filtration Rate (eGFR in mL/min/1.73m² from serum creatinine) and renal hemodynamics (reduced by NSAIDs)"
  },
  "RENAL_OAT": {
    "id": "RENAL_OAT",
    "group": "RENAL",
    "nameFr": "Sécrétion Tubulaire Rénale OAT1 / OAT3 (Anions Organiques)",
    "nameEn": "Renal Tubular Secretion OAT1 / OAT3 (Organic Anions)",
    "descFr": "Transporteurs tubulaires proximaux sécrétant les acides faibles (AINS, Barbituriques, Métabolites glucuronides). Forte compétition mutuelle entre AINS.",
    "descEn": "Proximal tubular transporters secreting weak acids (NSAIDs, Barbiturates, Glucuronide metabolites). Strong mutual competition among NSAIDs.",
    "mutationsFr": "Compétition tubulaire directe (ex. cumul d'AINS ou Probenecide) et variants SLCO / SLC22A6",
    "mutationsEn": "Direct tubular competition (e.g. NSAID stacking or Probenecid) and SLC22A6/8 variants"
  },
  "RENAL_OCT2": {
    "id": "RENAL_OCT2",
    "group": "RENAL",
    "nameFr": "Sécrétion Tubulaire Rénale OCT2 / MATE1 (Cations Organiques)",
    "nameEn": "Renal Tubular Secretion OCT2 / MATE1 (Organic Cations)",
    "descFr": "Transporteurs tubulaires sécrétant les bases organiques (Mémantine, Amisulpride, Tiapride, Amphétamines, Métabolites actifs de la Morphine M6G et du Tramadol).",
    "descEn": "Tubular transporters secreting organic bases (Memantine, Amisulpride, Tiapride, Amphetamines, active Morphine M6G & Tramadol metabolites).",
    "mutationsFr": "Polymorphisme SLC22A2 (Ala270Ser) et compétition entre cations organiques",
    "mutationsEn": "SLC22A2 polymorphism (Ala270Ser) and competition between organic cations"
  },
  "PULMONARY": {
    "id": "PULMONARY",
    "group": "OTHER",
    "nameFr": "Excrétion Pulmonaire Alvéolaire (Air expiré)",
    "nameEn": "Pulmonary Alveolar Excretion (Exhaled air)",
    "descFr": "Élimination gazeuse directe par les poumons sans métabolisme hépatique (Protoxyde d'azote >99%).",
    "descEn": "Direct alveolar gas elimination via the lungs without hepatic metabolism (Nitrous oxide >99%).",
    "mutationsFr": "Indépendant des enzymes hépatiques et des reins",
    "mutationsEn": "Independent of hepatic enzymes and kidneys"
  }
};

const RECEPTOR_TOLERANCE_CLASSES = {
  "MOR": {
    "id": "MOR",
    "nameFr": "Récepteurs Opioïdes μ (MOR)",
    "nameEn": "μ-Opioid Receptors (MOR)",
    "recoveryTauHours": 96,
    "maxAttenuation": 0.65,
    "durationShrink": 0.22
  },
  "GABAA_BZD": {
    "id": "GABAA_BZD",
    "nameFr": "Récepteurs GABA-A (Benzodiazépines & Z-Drugs)",
    "nameEn": "GABA-A Receptors (Benzodiazepines & Z-Drugs)",
    "recoveryTauHours": 144,
    "maxAttenuation": 0.6,
    "durationShrink": 0.2
  },
  "GABAB": {
    "id": "GABAB",
    "nameFr": "Récepteurs GABA-B (Baclofène, GHB/GBL, Phénibut)",
    "nameEn": "GABA-B Receptors (Baclofen, GHB/GBL, Phenibut)",
    "recoveryTauHours": 84,
    "maxAttenuation": 0.55,
    "durationShrink": 0.18
  },
  "ALPHA2DELTA": {
    "id": "ALPHA2DELTA",
    "nameFr": "Canaux Calciques α2δ (Prégabaline, Gabapentine)",
    "nameEn": "α2δ Calcium Channels (Pregabalin, Gabapentin)",
    "recoveryTauHours": 72,
    "maxAttenuation": 0.5,
    "durationShrink": 0.15
  },
  "DAT_NET": {
    "id": "DAT_NET",
    "nameFr": "Transporteurs Dopamine / Noradrénaline (Stimulants)",
    "nameEn": "Dopamine / Norepinephrine Transporters (Stimulants)",
    "recoveryTauHours": 60,
    "maxAttenuation": 0.55,
    "durationShrink": 0.2
  },
  "SERT_ENTACTOGEN": {
    "id": "SERT_ENTACTOGEN",
    "nameFr": "Système Sérotoninergique VMAT2/SERT (Entactogènes / MDMA)",
    "nameEn": "Serotonergic VMAT2/SERT System (Entactogens / MDMA)",
    "recoveryTauHours": 240,
    "maxAttenuation": 0.75,
    "durationShrink": 0.3
  },
  "HT2A": {
    "id": "HT2A",
    "nameFr": "Récepteurs 5-HT2A (Psychédéliques — Tachyphylaxie rapide)",
    "nameEn": "5-HT2A Receptors (Psychedelics — Rapid tachyphylaxis)",
    "recoveryTauHours": 120,
    "maxAttenuation": 0.8,
    "durationShrink": 0.25
  },
  "NMDA": {
    "id": "NMDA",
    "nameFr": "Récepteurs Glutamate NMDA (Dissociatifs)",
    "nameEn": "NMDA Glutamate Receptors (Dissociatives)",
    "recoveryTauHours": 120,
    "maxAttenuation": 0.55,
    "durationShrink": 0.18
  },
  "CB1": {
    "id": "CB1",
    "nameFr": "Récepteurs Cannabinoïdes CB1 (Cannabis / THC)",
    "nameEn": "CB1 Cannabinoid Receptors (Cannabis / THC)",
    "recoveryTauHours": 72,
    "maxAttenuation": 0.6,
    "durationShrink": 0.2
  },
  "ADENOSINE": {
    "id": "ADENOSINE",
    "nameFr": "Récepteurs Adénosine A1/A2A (Caféine / Xanthines)",
    "nameEn": "Adenosine A1/A2A Receptors (Caffeine / Xanthines)",
    "recoveryTauHours": 48,
    "maxAttenuation": 0.5,
    "durationShrink": 0.15
  },
  "HISTAMINE_H1": {
    "id": "HISTAMINE_H1",
    "nameFr": "Récepteurs Histaminiques H1 (Antihistaminiques sédatifs)",
    "nameEn": "H1 Histamine Receptors (Sedating antihistamines)",
    "recoveryTauHours": 72,
    "maxAttenuation": 0.55,
    "durationShrink": 0.15
  }
};

const SUBSTANCE_PK_DB = {
  "1-Hydroxymidazolam": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.55,
      "RENAL_GFR": 0.45
    },
    "toleranceClass": "GABA_A",
    "halfLifeHours": 3.5,
    "summaryFr": "Métabolite actif majeur du Midazolam formé par le CYP3A4 (~75%), conjugué par UGT2B7 et éliminé par filtration rénale (s'accumule fortement en insuffisance rénale).",
    "summaryEn": "Primary active metabolite of Midazolam formed via CYP3A4 (~75%), conjugated by UGT2B7 and cleared via renal filtration (accumulates in renal failure)."
  },
  "1,4-Butanediol": {
    "verified": true,
    "pathways": {
      "ADH_ALDH2": 0.95,
      "RENAL_GFR": 0.05
    },
    "prodrug": {
      "enzyme": "ADH_ALDH2",
      "activeMetabolite": "GHB",
      "weight": 0.95,
      "noteFr": "Prodrogue convertie en 2 étapes par l'Alcool Déshydrogénase (ADH) puis l'Aldéhyde Déshydrogénase (ALDH2) en GHB : la co-ingestion d'Alcool bloque sa transformation puis déclenche un rebond retardé dangereux.",
      "noteEn": "Prodrug converted in 2 steps by Alcohol Dehydrogenase (ADH) and Aldehyde Dehydrogenase (ALDH2) into GHB: Alcohol co-ingestion blocks conversion and causes dangerous delayed rebound."
    },
    "toleranceClass": "GABAB",
    "halfLifeHours": 1.2,
    "summaryFr": "Converti en GHB puis éliminé par ADH1B et ALDH2/SSADH (compétition directe avec l'Éthanol).",
    "summaryEn": "Converted to GHB and cleared via ADH1B and ALDH2/SSADH (direct competition with Ethanol)."
  },
  "11-OH-THC": {
    "verified": true,
    "pathways": {
      "CYP2C9": 0.65,
      "UGT1A1_1A9": 0.35
    },
    "toleranceClass": "CB1",
    "halfLifeHours": 5.5,
    "summaryFr": "Métabolite psychoactif majeur du Δ9-THC (1.5 à 2x plus puissant sur CB1), formé et oxydé en THC-COOH principalement par le CYP2C9 (ralenti de 70% chez les porteurs CYP2C9*3).",
    "summaryEn": "Primary psychoactive metabolite of Δ9-THC (1.5-2x more potent at CB1), formed and oxidized to THC-COOH mainly via CYP2C9 (70% slower in CYP2C9*3 carriers)."
  },
  "1cP-LSD": {
    "verified": true,
    "pathways": {
      "RBC_PEPTIDASE": 0.3,
      "CYP2D6": 0.25,
      "CYP3A4": 0.25,
      "CYP1A2": 0.1,
      "CYP2C9": 0.1
    },
    "prodrug": {
      "enzyme": "RBC_PEPTIDASE",
      "activeMetabolite": "LSD",
      "weight": 0.95,
      "noteFr": "Prodrogue 1-cyclopropionylée hydrolysée par les estérases sériques en LSD.",
      "noteEn": "1-cyclopropionyl prodrug hydrolyzed by serum esterases to LSD."
    },
    "toleranceClass": "HT2A",
    "halfLifeHours": 4.2,
    "summaryFr": "Prodrogue hydrolysée en LSD par les estérases sériques puis éliminée par CYP2D6/3A4.",
    "summaryEn": "Prodrug hydrolyzed to LSD by serum esterases then cleared via CYP2D6/3A4."
  },
  "1P-LSD": {
    "verified": true,
    "pathways": {
      "RBC_PEPTIDASE": 0.3,
      "CYP2D6": 0.25,
      "CYP3A4": 0.25,
      "CYP1A2": 0.1,
      "CYP2C9": 0.1
    },
    "prodrug": {
      "enzyme": "RBC_PEPTIDASE",
      "activeMetabolite": "LSD",
      "weight": 0.95,
      "noteFr": "Prodrogue hydrolysée rapidement par les estérases sériques humaines en LSD actif.",
      "noteEn": "Prodrug rapidly hydrolyzed by human serum esterases into active LSD."
    },
    "toleranceClass": "HT2A",
    "halfLifeHours": 4,
    "summaryFr": "Hydrolysé dans le sérum humain en LSD, puis métabolisé par CYP2D6 et CYP3A4.",
    "summaryEn": "Hydrolyzed in human serum to LSD, then metabolized via CYP2D6 and CYP3A4."
  },
  "1V-LSD": {
    "verified": true,
    "pathways": {
      "RBC_PEPTIDASE": 0.3,
      "CYP2D6": 0.25,
      "CYP3A4": 0.25,
      "CYP1A2": 0.1,
      "CYP2C9": 0.1
    },
    "prodrug": {
      "enzyme": "RBC_PEPTIDASE",
      "activeMetabolite": "LSD",
      "weight": 0.95,
      "noteFr": "Prodrogue 1-valéroylée hydrolysée en LSD dans le sérum humain.",
      "noteEn": "1-valeroyl prodrug hydrolyzed to LSD in human serum."
    },
    "toleranceClass": "HT2A",
    "halfLifeHours": 4.5,
    "summaryFr": "Prodrogue lipophile hydrolysée en LSD par les estérases sériques puis métabolisée par CYP2D6/3A4.",
    "summaryEn": "Lipophilic prodrug hydrolyzed to LSD by serum esterases then metabolized via CYP2D6/3A4."
  },
  "2C-B": {
    "verified": true,
    "pathways": {
      "MAOA": 0.4,
      "MAOB": 0.35,
      "CYP2D6": 0.2,
      "RENAL_GFR": 0.05
    },
    "toleranceClass": "HT2A",
    "halfLifeHours": 2.5,
    "summaryFr": "O-déméthylée par le CYP2D6 puis désaminée par MAO-A et MAO-B.",
    "summaryEn": "O-demethylated via CYP2D6 followed by oxidative deamination via MAO-A and MAO-B."
  },
  "3-Hydroxyphenazepam": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.85,
      "RENAL_GFR": 0.15
    },
    "toleranceClass": "GABA_A",
    "halfLifeHours": 26,
    "summaryFr": "Métabolite 3-hydroxylé actif du Phénazépam (et du Cinazépam) : conjugué directement par glucuronidation (UGT2B7) avant élimination rénale.",
    "summaryEn": "Active 3-hydroxylated metabolite of Phenazepam (and Cinazepam): directly conjugated via UGT2B7 glucuronidation prior to renal excretion."
  },
  "4-AcO-DMT": {
    "verified": true,
    "pathways": {
      "UGT1A1_1A9": 0.65,
      "MAOA": 0.25,
      "RENAL_GFR": 0.1
    },
    "prodrug": {
      "enzyme": "BChE",
      "activeMetabolite": "Psilocin",
      "weight": 0.9,
      "noteFr": "O-acétylpsilocine désacétylée par les estérases en Psilocine.",
      "noteEn": "O-acetylpsilocin deacetylated by esterases to Psilocin."
    },
    "toleranceClass": "HT2A",
    "halfLifeHours": 3,
    "summaryFr": "Désacétylée en Psilocine puis éliminée par UGT1A9/1A10 (~65%) et MAO-A (~25%).",
    "summaryEn": "Deacetylated to Psilocin then cleared via UGT1A9/1A10 (~65%) and MAO-A (~25%)."
  },
  "4F-MPH": {
    "verified": true,
    "pathways": {
      "CES1": 0.75,
      "RENAL_GFR": 0.2
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 5.5,
    "summaryFr": "Analogue para-fluoré du méthylphénidate hydrolysé plus lentement par la CES1.",
    "summaryEn": "Para-fluorinated methylphenidate analogue hydrolyzed more slowly by CES1."
  },
  "5-MeO-DMT": {
    "verified": true,
    "pathways": {
      "MAOA": 0.75,
      "CYP2D6": 0.2,
      "RENAL_GFR": 0.05
    },
    "toleranceClass": "HT2A",
    "halfLifeHours": 0.35,
    "summaryFr": "Désaminée par la MAO-A (~75%) et O-déméthylée en bufoténine active par le CYP2D6 (~20%).",
    "summaryEn": "Deaminated by MAO-A (~75%) and O-demethylated to active bufotenin by CYP2D6 (~20%)."
  },
  "7-Hydroxymitragynine": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.55,
      "UGT2B7": 0.35,
      "RENAL_GFR": 0.1
    },
    "inhibits": {
      "CYP2D6": 0.45,
      "CYP3A4": 0.25
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 3.5,
    "summaryFr": "Métabolite actif majeur de la mitragynine (Kratom) formé par le CYP3A4 (~10x plus puissant sur les récepteurs μ-opioïdes), éliminé par CYP3A4 et glucuronidation UGT2B7.",
    "summaryEn": "Primary active metabolite of mitragynine (Kratom) formed via CYP3A4 (~10x more potent at μ-opioid receptors), cleared via CYP3A4 and UGT2B7 glucuronidation."
  },
  "Acamprosate": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 1
    },
    "halfLifeHours": 20,
    "summaryFr": "Excrété à 100% sous forme inchangée par filtration glomérulaire rénale (aucun métabolisme hépatique).",
    "summaryEn": "100% excreted unchanged via renal glomerular filtration (zero hepatic metabolism)."
  },
  "Acetylfentanyl": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.75,
      "CYP2D6": 0.15,
      "RENAL_GFR": 0.1
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 3.5,
    "summaryFr": "N-désalkylation en norfentanyl par CYP3A4 et hydroxylation par CYP2D6.",
    "summaryEn": "N-dealkylation to norfentanyl via CYP3A4 and hydroxylation via CYP2D6."
  },
  "Adrafinil": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.4,
      "CES1": 0.45,
      "RENAL_GFR": 0.1
    },
    "prodrug": {
      "enzyme": "CES1",
      "activeMetabolite": "Modafinil",
      "weight": 0.8,
      "noteFr": "Prodrogue N-hydroxylée convertie dans le foie en Modafinil actif.",
      "noteEn": "N-hydroxylated prodrug converted in the liver to active Modafinil."
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 13.5,
    "summaryFr": "Prodrogue convertie dans le foie en Modafinil puis en acide modafinilique.",
    "summaryEn": "Prodrug converted in the liver to Modafinil and modafinil acid."
  },
  "Agomelatine": {
    "verified": true,
    "pathways": {
      "CYP1A2": 0.9,
      "CYP2C9": 0.05,
      "CYP2C19": 0.05
    },
    "halfLifeHours": 1.8,
    "summaryFr": "Métabolisée à ~90% par le CYP1A2 (contre-indiquée avec les inhibiteurs puissants du CYP1A2 comme la fluvoxamine).",
    "summaryEn": "~90% metabolized by CYP1A2 (contraindicated with strong CYP1A2 inhibitors such as fluvoxamine)."
  },
  "Alcohol": {
    "verified": true,
    "pathways": {
      "ADH_ALDH2": 0.85,
      "CYP2E1": 0.1,
      "RENAL_GFR": 0.02,
      "PULMONARY": 0.03
    },
    "inhibits": {
      "ADH_ALDH2": 0.85,
      "CES1": 0.65,
      "CYP2E1": 0.5
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 1.5,
    "summaryFr": "Oxydé à ~85% par ADH1B et ALDH2 (cinétique saturable ~7-10g/h) et ~10% par CYP2E1. Inhibe compétitivement la CES1 (Méthylphénidate/Cocaïne) et l'ADH (1,4-BD / GHB).",
    "summaryEn": "~85% oxidized via ADH1B and ALDH2 (saturable zero-order kinetics ~7-10g/h) and ~10% via CYP2E1. Competitively inhibits CES1 (Methylphenidate/Cocaine) and ADH (1,4-BD / GHB)."
  },
  "ALD-52": {
    "verified": true,
    "pathways": {
      "RBC_PEPTIDASE": 0.3,
      "CYP2D6": 0.25,
      "CYP3A4": 0.25,
      "CYP1A2": 0.1,
      "CYP2C9": 0.1
    },
    "prodrug": {
      "enzyme": "RBC_PEPTIDASE",
      "activeMetabolite": "LSD",
      "weight": 0.95,
      "noteFr": "1-acétyl-LSD désacétylé par les estérases sériques en LSD.",
      "noteEn": "1-acetyl-LSD deacetylated by serum esterases to LSD."
    },
    "toleranceClass": "HT2A",
    "halfLifeHours": 3.8,
    "summaryFr": "Désacétylé en LSD puis éliminé par CYP2D6 et CYP3A4.",
    "summaryEn": "Deacetylated to LSD then cleared via CYP2D6 and CYP3A4."
  },
  "Alimemazine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.55,
      "CYP3A4": 0.3,
      "RENAL_GFR": 0.1
    },
    "inhibits": {
      "CYP2D6": 0.4
    },
    "toleranceClass": "HISTAMINE_H1",
    "halfLifeHours": 5.5,
    "summaryFr": "Phénothiazine antihistaminique métabolisée par CYP2D6 et CYP3A4.",
    "summaryEn": "Phenothiazine antihistamine metabolized via CYP2D6 and CYP3A4."
  },
  "Alpha-Hydroxyetizolam": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.7,
      "CYP3A4": 0.3
    },
    "toleranceClass": "GABA_A",
    "halfLifeHours": 8.2,
    "summaryFr": "Métabolite actif de l'Étizolam formé par CYP2C19/CYP3A4 (demi-vie ~8.2h prolongeant l'effet sédatif), éliminé par glucuronidation UGT2B7.",
    "summaryEn": "Active metabolite of Etizolam formed via CYP2C19/CYP3A4 (half-life ~8.2h extending sedation), cleared via UGT2B7 glucuronidation."
  },
  "Alprazolam": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.85,
      "RENAL_GFR": 0.15
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 11.2,
    "summaryFr": "Hydroxylé à >85% par le CYP3A4 en 4-hydroxyalprazolam et α-hydroxyalprazolam. Très sensible aux inhibiteurs du CYP3A4 (pamplemousse, macrolides, antifongiques).",
    "summaryEn": "Hydroxylated >85% by CYP3A4 to 4-hydroxyalprazolam and α-hydroxyalprazolam. Highly sensitive to CYP3A4 inhibitors."
  },
  "Amisulpride": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.7,
      "RENAL_OCT2": 0.22
    },
    "halfLifeHours": 12,
    "summaryFr": "Benzamide éliminé à >90% par les reins sous forme inchangée (filtration glomérulaire et sécrétion tubulaire cationique OCT2), sans métabolisme CYP450.",
    "summaryEn": "Benzamide >90% cleared unchanged by the kidneys (glomerular filtration and OCT2 cationic tubular secretion), zero CYP450 metabolism."
  },
  "Amitriptyline": {
    "verified": true,
    "pathways": {
      "CYP2C19": 0.45,
      "CYP2D6": 0.4,
      "CYP3A4": 0.1
    },
    "inhibits": {
      "CYP2D6": 0.3,
      "CYP2C19": 0.25
    },
    "halfLifeHours": 20,
    "summaryFr": "N-déméthylée en Nortriptyline active par le CYP2C19, et hydroxylée (inactivation) par le CYP2D6.",
    "summaryEn": "N-demethylated to active Nortriptyline by CYP2C19, and hydroxylated (inactivated) by CYP2D6."
  },
  "Amoxapine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.6,
      "CYP3A4": 0.3,
      "RENAL_GFR": 0.1
    },
    "toleranceClass": "SERT_SNRI",
    "halfLifeHours": 9,
    "summaryFr": "Métabolite actif N-déméthylé de la Loxapine et antidépresseur tétracyclique (Défanyl) : hydroxylé par le CYP2D6 et le CYP3A4 en 7-OH et 8-OH-amoxapine.",
    "summaryEn": "Active N-demethylated metabolite of Loxapine and tetracyclic antidepressant (Asendin): hydroxylated by CYP2D6 and CYP3A4 to 7-OH and 8-OH-amoxapine."
  },
  "Amphetamine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.35,
      "MAOA": 0.1,
      "RENAL_GFR": 0.4,
      "RENAL_OCT2": 0.1
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 10,
    "summaryFr": "Éliminée à ~40% inchangée dans les urines (dépend du DFG et du pH urinaire) et métabolisée dans le foie par CYP2D6 (4-hydroxyamphétamine) et FMO3/désamination.",
    "summaryEn": "~40% excreted unchanged in urine (GFR and urinary pH dependent) and hepatically metabolized via CYP2D6 (4-hydroxyamphetamine) and deamination."
  },
  "Aniracetam": {
    "verified": true,
    "pathways": {
      "BChE": 0.5,
      "CES1": 0.35,
      "RENAL_GFR": 0.15
    },
    "halfLifeHours": 1.5,
    "summaryFr": "Hydrolysé rapidement au premier passage en N-anisoyl-GABA, acide p-anisique et 2-pyrrolidinone.",
    "summaryEn": "Rapidly hydrolyzed on first pass to N-anisoyl-GABA, p-anisic acid and 2-pyrrolidinone."
  },
  "Apomorphine": {
    "verified": true,
    "pathways": {
      "SULT1A1": 0.5,
      "COMT": 0.3,
      "UGT2B7": 0.15,
      "CYP3A4": 0.05
    },
    "halfLifeHours": 0.75,
    "summaryFr": "Conjuguée par sulfatation (SULT1A1), O-méthylée par la COMT et glucuronidée.",
    "summaryEn": "Conjugated via sulfation (SULT1A1), O-methylated by COMT and glucuronidated."
  },
  "Aripiprazole": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.55,
      "CYP3A4": 0.45
    },
    "halfLifeHours": 75,
    "summaryFr": "Déshydrogéné et hydroxylé conjointement par le CYP2D6 (~55%) et le CYP3A4 (~45%). Demi-vie doublée (~146h) chez les métaboliseurs lents CYP2D6.",
    "summaryEn": "Dehydrogenated and hydroxylated jointly by CYP2D6 (~55%) and CYP3A4 (~45%). Half-life doubles (~146h) in CYP2D6 poor metabolizers."
  },
  "Armodafinil": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.4,
      "CES1": 0.45,
      "RENAL_GFR": 0.1
    },
    "inhibits": {
      "CYP2C19": 0.65
    },
    "induces": {
      "CYP3A4": 0.35
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 15,
    "summaryFr": "Énantiomère R du modafinil (éliminé plus lentement que l'énantiomère S) via amidases et CYP3A4 ; inhibiteur du CYP2C19.",
    "summaryEn": "R-enantiomer of modafinil cleared via amidases and CYP3A4; inhibits CYP2C19."
  },
  "Aspirin": {
    "verified": true,
    "pathways": {
      "BChE": 0.35,
      "UGT1A1_1A9": 0.35,
      "RENAL_OAT": 0.2,
      "RENAL_GFR": 0.1
    },
    "inhibits": {
      "RENAL_OAT": 0.55
    },
    "nephroDynamicEffect": "NSAID_GFR_REDUCTION",
    "halfLifeHours": 3.2,
    "summaryFr": "Hydrolysée rapidement par les estérases (BChE/CES) en acide salicylique, conjuguée à la glycine/UGT et sécrétée par les transporteurs tubulaires rénaux OAT.",
    "summaryEn": "Rapidly hydrolyzed by esterases (BChE/CES) to salicylic acid, conjugated via glycine/UGT and secreted by renal OAT transporters."
  },
  "Atomoxetine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.85,
      "CYP2C19": 0.1,
      "RENAL_GFR": 0.05
    },
    "toleranceClass": null,
    "halfLifeHours": 5.2,
    "summaryFr": "4-hydroxylée à >85% par le CYP2D6 : sa demi-vie passe de ~5h chez un métaboliseur normal à ~21h chez un métaboliseur lent CYP2D6.",
    "summaryEn": ">85% 4-hydroxylated by CYP2D6: half-life increases from ~5h in normal metabolizers to ~21h in CYP2D6 poor metabolizers."
  },
  "Ayahuasca": {
    "verified": true,
    "pathways": {
      "MAOA": 0.5,
      "CYP2D6": 0.35,
      "CYP1A2": 0.15
    },
    "inhibits": {
      "MAOA": 1.45,
      "CYP2D6": 0.5
    },
    "toleranceClass": "HT2A",
    "halfLifeHours": 4.5,
    "summaryFr": "Synergie pharmacocinétique : les β-carbolines (harmine, harmaline — inhibiteurs réversibles de la MAO-A métabolisés par CYP2D6 et CYP1A2) bloquent la dégradation de la DMT.",
    "summaryEn": "Pharmacokinetic synergy: β-carbolines (harmine, harmaline — reversible MAO-A inhibitors metabolized via CYP2D6 and CYP1A2) block DMT degradation."
  },
  "Baclofen": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.8,
      "RENAL_OAT": 0.05
    },
    "toleranceClass": "GABAB",
    "halfLifeHours": 3.8,
    "summaryFr": "Excrété à 75-85% sous forme inchangée par les reins (filtration glomérulaire) et ~15% désaminé dans le foie. Risque majeur d'accumulation en cas de baisse du DFG.",
    "summaryEn": "75-85% excreted unchanged by the kidneys (glomerular filtration) with ~15% hepatic deamination. High accumulation risk when eGFR decreases."
  },
  "Benzydamine": {
    "verified": true,
    "pathways": {
      "CYP1A2": 0.3,
      "CYP3A4": 0.3,
      "RENAL_GFR": 0.4
    },
    "halfLifeHours": 10,
    "summaryFr": "N-oxydée dans le foie (FMO / CYP) et excrétée à ~40-50% dans les urines.",
    "summaryEn": "Hepatically N-oxidized (FMO / CYP) and ~40-50% excreted in urine."
  },
  "Biperiden": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.6,
      "CYP3A4": 0.3,
      "UGT2B7": 0.1
    },
    "halfLifeHours": 21,
    "summaryFr": "Hydroxylé dans le foie principalement par CYP2D6 et CYP3A4.",
    "summaryEn": "Hepatically hydroxylated primarily via CYP2D6 and CYP3A4."
  },
  "Bromazepam": {
    "verified": true,
    "pathways": {
      "CYP1A2": 0.5,
      "CYP3A4": 0.3,
      "UGT2B7": 0.15,
      "RENAL_GFR": 0.05
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 17,
    "summaryFr": "3-hydroxylation hépatique principalement par CYP1A2 et CYP3A4 suivie d'une glucuronidation.",
    "summaryEn": "Hepatic 3-hydroxylation primarily via CYP1A2 and CYP3A4 followed by glucuronidation."
  },
  "Bufotenin": {
    "verified": true,
    "pathways": {
      "MAOA": 0.6,
      "UGT1A1_1A9": 0.35,
      "RENAL_GFR": 0.05
    },
    "toleranceClass": "HT2A",
    "halfLifeHours": 1.5,
    "summaryFr": "Désaminée par la MAO-A en 5-HIAA et conjuguée par glucuronidation.",
    "summaryEn": "Deaminated by MAO-A to 5-HIAA and conjugated via glucuronidation."
  },
  "Buprenorphine": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.5,
      "CYP2C8": 0.15,
      "UGT2B7": 0.2,
      "UGT1A1_1A9": 0.15
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 32,
    "summaryFr": "N-désalkylation en norbuprénorphine par CYP3A4 (~50%) et CYP2C8 (~15%), conjuguée par UGT2B7 et UGT1A1 (~35%). Élimination biliaire/fécale prédominante (peu affectée par l'insuffisance rénale).",
    "summaryEn": "N-dealkylation to norbuprenorphine by CYP3A4 (~50%) and CYP2C8 (~15%), conjugated by UGT2B7/1A1 (~35%). Predominantly biliary/fecal excretion."
  },
  "Bupropion": {
    "verified": true,
    "pathways": {
      "CYP2B6": 0.75,
      "CYP2C19": 0.1,
      "RENAL_GFR": 0.1
    },
    "inhibits": {
      "CYP2D6": 1.15
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 21,
    "summaryFr": "Substrat de référence du CYP2B6 (hydroxylé en hydroxybupropion actif) et réductases carbonylées. Très puissant inhibiteur du CYP2D6 (convertit un métaboliseur normal en métaboliseur lent CYP2D6 !).",
    "summaryEn": "Reference CYP2B6 substrate (hydroxylated to active hydroxybupropion) and carbonyl reductases. Potent CYP2D6 inhibitor (phenoconverts normal metabolizers into CYP2D6 poor metabolizers!)."
  },
  "Buspirone": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.9,
      "RENAL_GFR": 0.05
    },
    "toleranceClass": null,
    "halfLifeHours": 2.5,
    "summaryFr": "Substrat à très fort effet de premier passage du CYP3A4 (>90%) formant la 1-pyrimidinylpipérazine (1-PP).",
    "summaryEn": "High first-pass CYP3A4 substrate (>90%) forming 1-pyrimidinylpiperazine (1-PP)."
  },
  "Caffeine": {
    "verified": true,
    "pathways": {
      "CYP1A2": 0.92,
      "CYP2E1": 0.03,
      "NAT2": 0.03,
      "RENAL_GFR": 0.02
    },
    "inhibits": {
      "CYP1A2": 0.15
    },
    "toleranceClass": "ADENOSINE",
    "halfLifeHours": 5,
    "summaryFr": "N-déméthylée à >90% par le CYP1A2 en paraxanthine (84%), théobromine (12%) et théophylline (4%). Substrat de référence du CYP1A2.",
    "summaryEn": ">90% N-demethylated by CYP1A2 into paraxanthine (84%), theobromine (12%) and theophylline (4%). Reference probe substrate for CYP1A2."
  },
  "Cannabidiol": {
    "verified": true,
    "pathways": {
      "CYP2C19": 0.45,
      "CYP3A4": 0.35,
      "UGT1A1_1A9": 0.15,
      "UGT2B7": 0.05
    },
    "inhibits": {
      "CYP2C19": 0.95,
      "CYP2C9": 0.55,
      "CYP3A4": 0.4,
      "UGT1A1_1A9": 0.4,
      "UGT2B7": 0.4
    },
    "halfLifeHours": 18,
    "summaryFr": "7-hydroxylé par le CYP2C19 et le CYP3A4 ; puissant inhibiteur du CYP2C19 (triple les taux du métabolite actif du Clobazam et ralentit le Diazépam).",
    "summaryEn": "7-hydroxylated by CYP2C19 and CYP3A4; potent CYP2C19 inhibitor (triples active Clobazam metabolite levels and slows Diazepam)."
  },
  "Cannabis": {
    "verified": true,
    "pathways": {
      "CYP2C9": 0.65,
      "CYP3A4": 0.25,
      "UGT1A1_1A9": 0.1
    },
    "inhibits": {
      "CYP2C9": 0.35,
      "CYP2C19": 0.25
    },
    "toleranceClass": "CB1",
    "halfLifeHours": 4,
    "summaryFr": "Le Δ9-THC est 11-hydroxylé à ~65% par le CYP2C9 en 11-OH-THC psychoactif puis en THC-COOH. Les porteurs de CYP2C9*3 ont une élimination du THC réduite de ~70% (durée et intensité accrues, surtout par voie orale).",
    "summaryEn": "Δ9-THC is ~65% 11-hydroxylated by CYP2C9 to psychoactive 11-OH-THC then THC-COOH. CYP2C9*3 carriers have ~70% lower THC clearance (prolonged and stronger effects, especially orally)."
  },
  "Carbamazepine": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.75,
      "CYP2C8": 0.15,
      "UGT2B7": 0.1
    },
    "induces": {
      "CYP3A4": 1.1,
      "CYP2B6": 0.75,
      "CYP2C9": 0.6,
      "CYP1A2": 0.5,
      "UGT1A1_1A9": 0.75,
      "UGT2B7": 0.6
    },
    "halfLifeHours": 16,
    "summaryFr": "Oxydée en 10,11-époxyde actif par le CYP3A4 (~75%). Très puissant auto-inducteur et inducteur du CYP3A4, CYP2B6 et des UGT (accélère la dégradation des opioïdes, benzos et lamotrigine).",
    "summaryEn": "Oxidized to active 10,11-epoxide via CYP3A4 (~75%). Potent auto-inducer and inducer of CYP3A4, CYP2B6 and UGTs (accelerates clearance of opioids, benzos and lamotrigine)."
  },
  "Carbamazepine-10,11-epoxide": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.5,
      "UGT2B7": 0.5
    },
    "halfLifeHours": 9,
    "summaryFr": "Métabolite époxyde actif et neurotoxique de la Carbamazépine (formé par CYP3A4), hydraté par l'époxyde hydrolase (fortement inhibée par le Valproate !) et excrété par les reins.",
    "summaryEn": "Active and neurotoxic epoxide metabolite of Carbamazepine (formed via CYP3A4), hydrated by epoxide hydrolase (strongly inhibited by Valproate!) and excreted renally."
  },
  "Carisoprodol": {
    "verified": true,
    "pathways": {
      "CYP2C19": 0.8,
      "RENAL_GFR": 0.15
    },
    "prodrug": {
      "enzyme": "CYP2C19",
      "activeMetabolite": "Meprobamate",
      "weight": 0.5,
      "noteFr": "Désalkylé par le CYP2C19 en méprobamate actif (les métaboliseurs lents CYP2C19 ont une exposition quadruplée au carisoprodol mère).",
      "noteEn": "Dealkylated by CYP2C19 into active meprobamate (CYP2C19 poor metabolizers experience 4-fold higher parent carisoprodol exposure)."
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 2.5,
    "summaryFr": "Métabolisé à ~80% par le CYP2C19 en méprobamate.",
    "summaryEn": "~80% metabolized via CYP2C19 to meprobamate."
  },
  "Cathinone": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.35,
      "MAOB": 0.25,
      "RENAL_GFR": 0.3
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 2,
    "summaryFr": "Réduite par les carbonyle-réductases en cathine/noréphédrine, métabolisée par CYP2D6 et éliminée par les reins.",
    "summaryEn": "Reduced by carbonyl reductases to cathine/norephedrine, metabolized by CYP2D6 and excreted renally."
  },
  "Celecoxib": {
    "verified": true,
    "pathways": {
      "CYP2C9": 0.78,
      "CYP3A4": 0.17,
      "RENAL_OAT": 0.05
    },
    "inhibits": {
      "CYP2D6": 0.55,
      "RENAL_OAT": 0.45
    },
    "nephroDynamicEffect": "NSAID_GFR_REDUCTION",
    "halfLifeHours": 11,
    "summaryFr": "Métabolisé à ~78% par le CYP2C9 (réduction de dose de 50% recommandée chez les métaboliseurs lents CYP2C9*3) et inhibiteur modéré du CYP2D6.",
    "summaryEn": "~78% metabolized by CYP2C9 (50% dose reduction recommended in CYP2C9*3 poor metabolizers) and moderate CYP2D6 inhibitor."
  },
  "Cetirizine": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.7,
      "RENAL_OAT": 0.2,
      "CYP3A4": 0.1
    },
    "toleranceClass": "HISTAMINE_H1",
    "halfLifeHours": 8.3,
    "summaryFr": "Métabolite carboxylique actif de l'Hydroxyzine (~55% via ADH) et antihistaminique H1 (Zyrtec) : éliminé à ~70-90% sous forme inchangée par filtration glomérulaire rénale et sécrétion tubulaire OAT.",
    "summaryEn": "Active carboxylic acid metabolite of Hydroxyzine (~55% via ADH) and H1 antihistamine (Zyrtec): ~70-90% excreted unchanged via renal glomerular filtration and OAT tubular secretion."
  },
  "Chlordiazepoxide": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.55,
      "CYP2C19": 0.35,
      "UGT2B7": 0.1
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 20,
    "summaryFr": "Métabolisé par CYP3A4 et CYP2C19 en desméthylchlordiazépoxide, démoxépam et nordiazépam.",
    "summaryEn": "Metabolized by CYP3A4 and CYP2C19 into desmethylchlordiazepoxide, demoxepam and nordiazepam."
  },
  "Chlorpromazine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.6,
      "CYP1A2": 0.25,
      "CYP3A4": 0.15
    },
    "inhibits": {
      "CYP2D6": 0.65
    },
    "halfLifeHours": 30,
    "summaryFr": "7-hydroxylée par CYP2D6 et N-déméthylée par CYP1A2 ; inhibiteur notable du CYP2D6.",
    "summaryEn": "7-hydroxylated by CYP2D6 and N-demethylated by CYP1A2; notable CYP2D6 inhibitor."
  },
  "Cinolazepam": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.7,
      "CYP3A4": 0.15,
      "RENAL_GFR": 0.15
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 9,
    "summaryFr": "Conjugaison prédominante par glucuronidation UGT2B7 et excrétion urinaire.",
    "summaryEn": "Predominantly cleared by UGT2B7 glucuronidation and urinary excretion."
  },
  "Citalopram": {
    "verified": true,
    "pathways": {
      "CYP2C19": 0.55,
      "CYP3A4": 0.3,
      "CYP2D6": 0.1
    },
    "inhibits": {
      "CYP2D6": 0.25
    },
    "halfLifeHours": 35,
    "summaryFr": "Mélange racémique métabolisé à ~55% par le CYP2C19 et ~30% par le CYP3A4.",
    "summaryEn": "Racemic mixture metabolized ~55% by CYP2C19 and ~30% by CYP3A4."
  },
  "Clobazam": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.45,
      "CYP2C19": 0.5,
      "RENAL_GFR": 0.05
    },
    "inhibits": {
      "CYP2D6": 0.3
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 24,
    "summaryFr": "Déméthylé par CYP3A4 en N-desméthylclobazam actif, lequel est éliminé spécifiquement par le CYP2C19 (accumulation majeure chez les métaboliseurs lents CYP2C19).",
    "summaryEn": "Demethylated by CYP3A4 to active N-desmethylclobazam, which is specifically cleared by CYP2C19 (marked accumulation in CYP2C19 poor metabolizers)."
  },
  "Clomipramine": {
    "verified": true,
    "pathways": {
      "CYP2C19": 0.45,
      "CYP2D6": 0.4,
      "CYP1A2": 0.1
    },
    "inhibits": {
      "CYP2D6": 0.35
    },
    "halfLifeHours": 24,
    "summaryFr": "Déméthylée par CYP2C19/CYP1A2 et hydroxylée par CYP2D6.",
    "summaryEn": "Demethylated by CYP2C19/CYP1A2 and hydroxylated by CYP2D6."
  },
  "Clonazepam": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.55,
      "NAT2": 0.4,
      "RENAL_GFR": 0.05
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 34,
    "summaryFr": "Nitro-réduction par CYP3A4 en 7-aminoclonazépam suivie d'une N-acétylation polymorphe par NAT2 (Acétyleurs lents vs rapides).",
    "summaryEn": "Nitroreduction by CYP3A4 to 7-aminoclonazepam followed by polymorphic N-acetylation via NAT2 (Slow vs Rapid acetylators)."
  },
  "Clonidine": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.6,
      "CYP2D6": 0.25,
      "CYP3A4": 0.15
    },
    "halfLifeHours": 12,
    "summaryFr": "Éliminée à ~60% sous forme inchangée dans les urines par filtration rénale et ~40% hydroxylée dans le foie (CYP2D6/3A4).",
    "summaryEn": "~60% excreted unchanged in urine via renal filtration and ~40% hepatically hydroxylated (CYP2D6/3A4)."
  },
  "Clorazepate": {
    "verified": true,
    "pathways": {
      "CYP2C19": 0.5,
      "CYP3A4": 0.4,
      "UGT2B7": 0.1
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 48,
    "summaryFr": "Prodrogue décarboxylée dans l'estomac en nordiazépam actif, éliminé par CYP2C19 et CYP3A4.",
    "summaryEn": "Prodrug decarboxylated in the stomach to active nordiazepam, cleared via CYP2C19 and CYP3A4."
  },
  "Clotiazepam": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.65,
      "CYP2C19": 0.25,
      "UGT2B7": 0.1
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 4.5,
    "summaryFr": "Thiiénodiazépine à demi-vie courte métabolisée par hydroxylation et déméthylation via CYP3A4/CYP2C19.",
    "summaryEn": "Short-acting thienodiazepine metabolized by hydroxylation and demethylation via CYP3A4/CYP2C19."
  },
  "Clozapine": {
    "verified": true,
    "pathways": {
      "CYP1A2": 0.65,
      "CYP3A4": 0.2,
      "CYP2C19": 0.1,
      "CYP2D6": 0.05
    },
    "toleranceClass": "HISTAMINE_H1",
    "halfLifeHours": 14,
    "summaryFr": "N-déméthylée en norclozapine principalement par le CYP1A2 (~65%) et CYP3A4 (~20%).",
    "summaryEn": "N-demethylated to norclozapine primarily by CYP1A2 (~65%) and CYP3A4 (~20%)."
  },
  "Cocaine": {
    "verified": true,
    "pathways": {
      "BChE": 0.45,
      "CES1": 0.42,
      "CYP3A4": 0.1,
      "RENAL_GFR": 0.03
    },
    "inhibits": {
      "CYP2D6": 0.7
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 1.2,
    "summaryFr": "Hydrolysée à ~87% par la Butyrylcholinestérase plasmatique (BChE -> ecgonine méthyl ester) et la Carboxylestérase 1 hépatique (CES1 -> benzoylecgonine), et N-déméthylée par CYP3A4 en norcocaïne. Puissant inhibiteur du CYP2D6.",
    "summaryEn": "~87% hydrolyzed by plasma Butyrylcholinesterase (BChE) and hepatic Carboxylesterase 1 (CES1), plus CYP3A4 N-demethylation to norcocaine. Strong CYP2D6 inhibitor."
  },
  "Codeine": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.65,
      "CYP3A4": 0.15,
      "CYP2D6": 0.1,
      "RENAL_GFR": 0.1
    },
    "prodrug": {
      "enzyme": "CYP2D6",
      "activeMetabolite": "Morphine",
      "weight": 0.85,
      "noteFr": "Prodrogue pure : nécessite impérativement le CYP2D6 pour être O-déméthylée en Morphine (~5-10%). Inefficace chez les métaboliseurs lents CYP2D6 ; risque de surdosage morphinique chez les ultra-rapides.",
      "noteEn": "Strict prodrug: requires CYP2D6 O-demethylation to Morphine (~5-10%) for analgesia. Ineffective in CYP2D6 poor metabolizers; toxicity risk in ultra-rapid metabolizers."
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 3,
    "summaryFr": "Prodrogue activée en Morphine par CYP2D6 (~10%), inactivée par UGT2B7 (~65%) et CYP3A4 (~15% en norcodéine).",
    "summaryEn": "Prodrug activated to Morphine by CYP2D6 (~10%), inactivated by UGT2B7 (~65%) and CYP3A4 (~15% to norcodeine)."
  },
  "Cyamemazine": {
    "verified": true,
    "pathways": {
      "CYP1A2": 0.4,
      "CYP2D6": 0.3,
      "CYP3A4": 0.3
    },
    "toleranceClass": "HISTAMINE_H1",
    "halfLifeHours": 10,
    "summaryFr": "Phénothiazine N-déméthylée et sulfoxydée par CYP1A2, CYP2D6 et CYP3A4.",
    "summaryEn": "Phenothiazine N-demethylated and sulfoxidized via CYP1A2, CYP2D6 and CYP3A4."
  },
  "Cyclobenzaprine": {
    "verified": true,
    "pathways": {
      "CYP1A2": 0.5,
      "CYP3A4": 0.25,
      "CYP2D6": 0.15,
      "UGT2B7": 0.1
    },
    "halfLifeHours": 18,
    "summaryFr": "N-déméthylée principalement par CYP1A2 (~50%), CYP3A4 (~25%) et CYP2D6 (~15%).",
    "summaryEn": "N-demethylated primarily via CYP1A2 (~50%), CYP3A4 (~25%) and CYP2D6 (~15%)."
  },
  "Delorazepam": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.65,
      "CYP2C19": 0.2,
      "UGT2B7": 0.15
    },
    "toleranceClass": "GABA_A",
    "halfLifeHours": 78,
    "summaryFr": "Métabolite actif N-déméthylé du Diclazépam (analogue 2'-chloré du Nordiazépam) à demi-vie très longue (~78h), partiellement 3-hydroxylé par le CYP3A4 en Lorazépam.",
    "summaryEn": "Active N-demethylated metabolite of Diclazepam (2'-chloro analogue of Nordiazepam) with a ~78h half-life, partially 3-hydroxylated by CYP3A4 into Lorazepam."
  },
  "Desalkylflurazepam": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.55,
      "UGT2B7": 0.35,
      "RENAL_GFR": 0.1
    },
    "toleranceClass": "GABA_A",
    "halfLifeHours": 74,
    "summaryFr": "Métabolite actif à demi-vie ultra-longue (~74h, 40-120h) du Flurazépam/Quazépam et RC (Norflurazépam), éliminé lentement par hydroxylation CYP3A4 et glucuronidation UGT2B7.",
    "summaryEn": "Ultra-long-acting active metabolite (~74h, 40-120h) of Flurazepam/Quazepam and standalone RC (Norflurazepam), slowly cleared via CYP3A4 hydroxylation and UGT2B7 glucuronidation."
  },
  "Desipramine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.85,
      "UGT2B7": 0.1,
      "RENAL_GFR": 0.05
    },
    "inhibits": {
      "CYP2D6": 0.35
    },
    "toleranceClass": "SERT_SNRI",
    "halfLifeHours": 22,
    "summaryFr": "Métabolite actif N-déméthylé de l'Imipramine (et tricyclique Pertofran) : éliminé à ~85% par 2-hydroxylation via le CYP2D6 (demi-vie doublée chez les métaboliseurs lents CYP2D6).",
    "summaryEn": "Active N-demethylated metabolite of Imipramine (and TCA Pertofran): ~85% cleared via CYP2D6 2-hydroxylation (half-life doubled in CYP2D6 poor metabolizers)."
  },
  "Desmethylclomipramine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.85,
      "UGT2B7": 0.15
    },
    "inhibits": {
      "CYP2D6": 0.45
    },
    "toleranceClass": "SERT_SNRI",
    "halfLifeHours": 36,
    "summaryFr": "Métabolite actif noradrénergique majeur de la Clomipramine (demi-vie ~36h), éliminé à ~85% par hydroxylation via le CYP2D6.",
    "summaryEn": "Major noradrenergic active metabolite of Clomipramine (half-life ~36h), ~85% cleared via CYP2D6 hydroxylation."
  },
  "Desvenlafaxine": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.45,
      "RENAL_GFR": 0.45,
      "CYP3A4": 0.1
    },
    "toleranceClass": "SERT_SNRI",
    "halfLifeHours": 11,
    "summaryFr": "Métabolite actif majeur (O-desméthylvenlafaxine, Pristiq) formé à ~65% par le CYP2D6 à partir de la Venlafaxine ; éliminé par glucuronidation UGT (~45%) et filtration rénale directe (~45%).",
    "summaryEn": "Major active metabolite (O-desmethylvenlafaxine, Pristiq) formed at ~65% via CYP2D6 from Venlafaxine; cleared by UGT conjugation (~45%) and direct renal filtration (~45%)."
  },
  "Dextroamphetamine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.35,
      "MAOA": 0.1,
      "RENAL_GFR": 0.4,
      "RENAL_OCT2": 0.1
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 10.2,
    "summaryFr": "Énantiomère dextrogyre éliminé par CYP2D6 (~35%) et excrétion rénale inchangée (~40%).",
    "summaryEn": "Dextro-enantiomer cleared via CYP2D6 (~35%) and unchanged renal excretion (~40%)."
  },
  "Dextromethorphan": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.8,
      "CYP3A4": 0.15,
      "RENAL_GFR": 0.05
    },
    "prodrug": {
      "enzyme": "CYP2D6",
      "activeMetabolite": "Dextrorphan (DXO)",
      "weight": 0.5,
      "noteFr": "Substrat de référence du CYP2D6 : converti en Dextrorphane (DXO, antagoniste NMDA dissociatif puissant). Chez les métaboliseurs lents CYP2D6, la demi-vie passe de ~3-4h à >24-30h avec prédominance des effets sérotoninergiques de la molécule mère.",
      "noteEn": "Gold-standard CYP2D6 probe: converted to Dextrorphan (DXO, potent NMDA antagonist). In CYP2D6 poor metabolizers, half-life extends from ~3-4h to >24-30h."
    },
    "toleranceClass": "NMDA",
    "halfLifeHours": 3.5,
    "summaryFr": "O-déméthylé à ~80% par le CYP2D6 en dextrorphane (DXO) et N-déméthylé à ~15% par le CYP3A4 en 3-méthoxymorphinane.",
    "summaryEn": "~80% O-demethylated by CYP2D6 to dextrorphan (DXO) and ~15% N-demethylated by CYP3A4 to 3-methoxymorphinan."
  },
  "Dextropropoxyphene": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.8,
      "RENAL_GFR": 0.1
    },
    "inhibits": {
      "CYP2D6": 0.7,
      "CYP3A4": 0.55,
      "CYP2C9": 0.4
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 14,
    "summaryFr": "N-déméthylé par CYP3A4 en norpropoxyphène cardiotoxique ; puissant inhibiteur de CYP2D6, CYP3A4 et CYP2C9.",
    "summaryEn": "N-demethylated by CYP3A4 to cardiotoxic norpropoxyphene; potent inhibitor of CYP2D6, CYP3A4 and CYP2C9."
  },
  "Dextrorphan": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.75,
      "RENAL_GFR": 0.2,
      "CYP3A4": 0.05
    },
    "toleranceClass": "NMDA",
    "halfLifeHours": 4,
    "summaryFr": "Métabolite actif dissociatif (DXO) du Dextrométhorphane formé par le CYP2D6 : conjugué à ~75% par l'UGT2B7 en 3-glucuronide et éliminé par filtration rénale.",
    "summaryEn": "Active dissociative metabolite (DXO) of Dextromethorphan formed via CYP2D6: ~75% conjugated by UGT2B7 to 3-glucuronide and excreted renally."
  },
  "Diazepam": {
    "verified": true,
    "pathways": {
      "CYP2C19": 0.5,
      "CYP3A4": 0.4,
      "UGT2B7": 0.1
    },
    "inhibits": {
      "CYP2C19": 0.2
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 36,
    "summaryFr": "N-déméthylé en nordiazépam actif par CYP2C19 (~50%) et CYP3A4, puis hydroxylé en témazépam/oxazépam conjugués par UGT2B7. Demi-vie doublée chez les métaboliseurs lents CYP2C19.",
    "summaryEn": "N-demethylated to active nordiazepam by CYP2C19 (~50%) and CYP3A4, then hydroxylated to temazepam/oxazepam and conjugated by UGT2B7. Half-life doubles in CYP2C19 poor metabolizers."
  },
  "Diclazepam": {
    "verified": true,
    "pathways": {
      "CYP2C19": 0.45,
      "CYP3A4": 0.45,
      "UGT2B7": 0.1
    },
    "toleranceClass": "GABA_A",
    "halfLifeHours": 42,
    "summaryFr": "2'-chlorodiazépam métabolisé par CYP2C19 et CYP3A4 en trois benzodiazépines actives : Délorazépam (t½ ~78h), Lormétazépam (t½ ~10.5h) et Lorazépam (t½ ~12h).",
    "summaryEn": "2'-chlorodiazepam metabolized by CYP2C19 and CYP3A4 into three active benzodiazepines: Delorazepam (t½ ~78h), Lormetazepam (t½ ~10.5h) and Lorazepam (t½ ~12h)."
  },
  "Diclofenac": {
    "verified": true,
    "pathways": {
      "CYP2C9": 0.6,
      "UGT2B7": 0.3,
      "CYP3A4": 0.05,
      "RENAL_OAT": 0.05
    },
    "inhibits": {
      "RENAL_OAT": 0.65,
      "CYP2C9": 0.25
    },
    "nephroDynamicEffect": "NSAID_GFR_REDUCTION",
    "halfLifeHours": 1.9,
    "summaryFr": "4'-hydroxylé par le CYP2C9 (~60%) et glucuronidé par UGT2B7 (~30%).",
    "summaryEn": "4'-hydroxylated by CYP2C9 (~60%) and glucuronidated by UGT2B7 (~30%)."
  },
  "Dihydrocodeine": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.55,
      "CYP3A4": 0.2,
      "CYP2D6": 0.1,
      "RENAL_GFR": 0.15
    },
    "prodrug": {
      "enzyme": "CYP2D6",
      "activeMetabolite": "Dihydromorphine",
      "weight": 0.35,
      "noteFr": "Molécule mère active directement, avec formation additionnelle de dihydromorphine par CYP2D6.",
      "noteEn": "Active parent opioid with additional conversion to dihydromorphine via CYP2D6."
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 4,
    "summaryFr": "Glucuronidation UGT2B7 (~55%), N-déméthylation CYP3A4 (~20%), O-déméthylation CYP2D6 (~10%) et élimination rénale (~15%).",
    "summaryEn": "UGT2B7 glucuronidation (~55%), CYP3A4 N-demethylation (~20%), CYP2D6 O-demethylation (~10%) and renal clearance (~15%)."
  },
  "Diphenhydramine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.5,
      "CYP1A2": 0.2,
      "CYP2C9": 0.15,
      "CYP2C19": 0.15
    },
    "inhibits": {
      "CYP2D6": 0.75
    },
    "toleranceClass": "HISTAMINE_H1",
    "halfLifeHours": 8.5,
    "summaryFr": "N-déméthylée par CYP2D6, CYP1A2 et CYP2C9/2C19 ; inhibiteur significatif du CYP2D6 (peut réduire l'activation de la Codéine/Tramadol).",
    "summaryEn": "N-demethylated by CYP2D6, CYP1A2 and CYP2C9/2C19; significant CYP2D6 inhibitor (can blunt Codeine/Tramadol activation)."
  },
  "Disulfiram": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.35,
      "CYP2B6": 0.25,
      "UGT2B7": 0.25
    },
    "inhibits": {
      "ADH_ALDH2": 1.5,
      "CYP2E1": 1.25,
      "CYP2C9": 0.65
    },
    "halfLifeHours": 60,
    "summaryFr": "Inhibiteur irréversible puissant de l'ALDH2 (effet antabuse) et du CYP2E1.",
    "summaryEn": "Potent irreversible inhibitor of ALDH2 (antabuse effect) and CYP2E1."
  },
  "DMT": {
    "verified": true,
    "pathways": {
      "MAOA": 0.85,
      "CYP2D6": 0.1,
      "RENAL_GFR": 0.05
    },
    "toleranceClass": "HT2A",
    "halfLifeHours": 0.25,
    "summaryFr": "Désaminée ultra-rapidement par la Monoamine Oxydase A (MAO-A, ~85%) en acide indole-3-acétique (inactive par voie orale sauf en présence d'un IMAO-A).",
    "summaryEn": "Ultra-rapidly deaminated by Monoamine Oxidase A (MAO-A, ~85%) to indole-3-acetic acid (orally inactive unless combined with an MAO-A inhibitor)."
  },
  "Doxepin": {
    "verified": true,
    "pathways": {
      "CYP2C19": 0.5,
      "CYP2D6": 0.4,
      "CYP3A4": 0.1
    },
    "halfLifeHours": 17,
    "summaryFr": "N-déméthylée en nordoxépine par CYP2C19 et hydroxylée par CYP2D6.",
    "summaryEn": "N-demethylated to nordoxepin by CYP2C19 and hydroxylated by CYP2D6."
  },
  "Doxylamine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.35,
      "CYP1A2": 0.2,
      "CYP2C9": 0.15,
      "RENAL_GFR": 0.3
    },
    "toleranceClass": "HISTAMINE_H1",
    "halfLifeHours": 10,
    "summaryFr": "N-déméthylée par CYP2D6/1A2/2C9 (~70%) et excrétée à ~30% sous forme inchangée dans les urines.",
    "summaryEn": "N-demethylated via CYP2D6/1A2/2C9 (~70%) and ~30% excreted unchanged in urine."
  },
  "Duloxetine": {
    "verified": true,
    "pathways": {
      "CYP1A2": 0.65,
      "CYP2D6": 0.3
    },
    "inhibits": {
      "CYP2D6": 0.65
    },
    "halfLifeHours": 12,
    "summaryFr": "Oxydée principalement par le CYP1A2 (~65%) et le CYP2D6 (~30%) ; inhibiteur modéré du CYP2D6.",
    "summaryEn": "Oxidized primarily via CYP1A2 (~65%) and CYP2D6 (~30%); moderate CYP2D6 inhibitor."
  },
  "Efavirenz": {
    "verified": true,
    "pathways": {
      "CYP2B6": 0.85,
      "CYP2A6": 0.1,
      "UGT2B7": 0.05
    },
    "induces": {
      "CYP2B6": 0.7,
      "CYP3A4": 0.65,
      "CYP2C19": 0.45
    },
    "inhibits": {
      "CYP2C9": 0.4,
      "CYP2C19": 0.4
    },
    "halfLifeHours": 45,
    "summaryFr": "8-hydroxylé à ~85% par le CYP2B6 (les porteurs de CYP2B6*6 ont des concentrations triplées et des effets centraux prolongés).",
    "summaryEn": "~85% 8-hydroxylated by CYP2B6 (CYP2B6*6 homozygotes show 3-fold higher concentrations and prolonged CNS effects)."
  },
  "Ephedrine": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.75,
      "MAOA": 0.15,
      "CYP2D6": 0.1
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 6,
    "summaryFr": "Excrétée à ~75% sous forme inchangée dans les urines (résistante à la MAO grâce au groupe α-méthyle).",
    "summaryEn": "~75% excreted unchanged in urine (resistant to MAO due to α-methyl group)."
  },
  "Escitalopram": {
    "verified": true,
    "pathways": {
      "CYP2C19": 0.55,
      "CYP3A4": 0.3,
      "CYP2D6": 0.1
    },
    "inhibits": {
      "CYP2D6": 0.25
    },
    "halfLifeHours": 30,
    "summaryFr": "Déméthylé majoritairement par le CYP2C19 (~55%) et le CYP3A4 (~30%). Recommandation CPIC de réduction de dose de 50% chez les métaboliseurs lents CYP2C19.",
    "summaryEn": "Demethylated primarily by CYP2C19 (~55%) and CYP3A4 (~30%). CPIC guidelines recommend 50% dose reduction in CYP2C19 poor metabolizers."
  },
  "Eslicarbazepine": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.65,
      "UGT2B7": 0.35
    },
    "induces": {
      "CYP3A4": 0.35
    },
    "inhibits": {
      "CYP2C19": 0.35
    },
    "halfLifeHours": 10.5,
    "summaryFr": "Métabolite actif MHD (licarbazépine, Zebinix) assurant >90% de l'effet de l'Oxcarbazépine : éliminé à ~65% par filtration rénale et ~35% par glucuronidation UGT2B7.",
    "summaryEn": "Active MHD metabolite (licarbazepine, Zebinix) mediating >90% of Oxcarbazepine activity: cleared ~65% via renal filtration and ~35% via UGT2B7 glucuronidation."
  },
  "Estazolam": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.85,
      "RENAL_GFR": 0.1
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 15,
    "summaryFr": "Métabolisé principalement par le CYP3A4 en 4-hydroxy-estazolam et 1-oxo-estazolam.",
    "summaryEn": "Metabolized primarily via CYP3A4 to 4-hydroxy-estazolam and 1-oxo-estazolam."
  },
  "Eszopiclone": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.65,
      "CYP2E1": 0.2,
      "RENAL_GFR": 0.1
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 6,
    "summaryFr": "Énantiomère S de la zopiclone métabolisé par CYP3A4 et CYP2E1.",
    "summaryEn": "S-enantiomer of zopiclone metabolized via CYP3A4 and CYP2E1."
  },
  "Ethylmorphine": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.55,
      "CYP2D6": 0.2,
      "CYP3A4": 0.15,
      "RENAL_GFR": 0.1
    },
    "prodrug": {
      "enzyme": "CYP2D6",
      "activeMetabolite": "Morphine",
      "weight": 0.7,
      "noteFr": "O-déséthylée en Morphine par le CYP2D6.",
      "noteEn": "O-deethylated to Morphine via CYP2D6."
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 3.2,
    "summaryFr": "O-déséthylation en morphine par CYP2D6, N-déméthylation par CYP3A4 et glucuronidation UGT2B7.",
    "summaryEn": "O-deethylation to morphine via CYP2D6, N-demethylation via CYP3A4 and UGT2B7 glucuronidation."
  },
  "Ethylphenidate": {
    "verified": true,
    "pathways": {
      "CES1": 0.8,
      "RENAL_GFR": 0.15
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 2.5,
    "summaryFr": "Hydrolysé par la Carboxylestérase 1 (CES1) en acide ritalinique.",
    "summaryEn": "Hydrolyzed by Carboxylesterase 1 (CES1) to ritalinic acid."
  },
  "Etifoxine": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.5,
      "CYP2C19": 0.3,
      "UGT2B7": 0.15
    },
    "halfLifeHours": 6,
    "summaryFr": "Métabolisée dans le foie en déséthyl-étifoxine active par CYP3A4 et CYP2C19.",
    "summaryEn": "Hepatically metabolized into active desethyl-etifoxine via CYP3A4 and CYP2C19."
  },
  "Etizolam": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.55,
      "CYP2C19": 0.35,
      "UGT2B7": 0.1
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 6,
    "summaryFr": "Hydroxylé en α-hydroxyétizolam par CYP3A4 et CYP2C19 (pharmacocinétique documentée : les métaboliseurs lents CYP2C19 ont une clairance réduite de moitié).",
    "summaryEn": "Hydroxylated to α-hydroxyetizolam via CYP3A4 and CYP2C19 (documented human PK: CYP2C19 poor metabolizers show ~50% reduced clearance)."
  },
  "Etoricoxib": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.6,
      "CYP2C9": 0.15,
      "CYP2D6": 0.1,
      "CYP1A2": 0.1,
      "RENAL_OAT": 0.05
    },
    "nephroDynamicEffect": "NSAID_GFR_REDUCTION",
    "halfLifeHours": 22,
    "summaryFr": "6'-méthyl-hydroxylé principalement par le CYP3A4 (~60%) avec participation de CYP2C9, CYP2D6 et CYP1A2.",
    "summaryEn": "6'-methyl-hydroxylated primarily via CYP3A4 (~60%) with CYP2C9, CYP2D6 and CYP1A2 contributions."
  },
  "F-Phenibut": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.65
    },
    "toleranceClass": "GABAB",
    "halfLifeHours": 4.5,
    "summaryFr": "Analogue fluoré du phénibut (intermédiaire entre phénibut et baclofène) éliminé principalement par voie rénale.",
    "summaryEn": "Fluorinated phenibut analogue (intermediate between phenibut and baclofen) cleared primarily via renal excretion."
  },
  "Fenethylline": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.45,
      "CYP3A4": 0.35,
      "CYP1A2": 0.2
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 4.5,
    "summaryFr": "Codrogue (Captagon) clivée par oxydation hépatique en Amphétamine active (~24.5%) et Théophylline (~13.7%).",
    "summaryEn": "Codrug (Captagon) hepatically cleaved into active Amphetamine (~24.5%) and Theophylline (~13.7%)."
  },
  "Fentanyl": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.85,
      "RENAL_GFR": 0.1
    },
    "inhibits": {
      "CYP3A4": 0.25
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 4,
    "summaryFr": "N-désalkylation hépatique rapide et massive en norfentanyl inactif par le CYP3A4 (~85%). Très sensible aux inhibiteurs du CYP3A4.",
    "summaryEn": "Rapid and extensive hepatic N-dealkylation to inactive norfentanyl via CYP3A4 (~85%). Highly sensitive to CYP3A4 inhibitors."
  },
  "Flunitrazepam": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.55,
      "CYP2C19": 0.2,
      "NAT2": 0.25
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 22,
    "summaryFr": "N-déméthylé par CYP3A4/CYP2C19 et nitro-réduit puis acétylé par NAT2.",
    "summaryEn": "N-demethylated by CYP3A4/CYP2C19 and nitroreduced then acetylated by NAT2."
  },
  "Fluoxetine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.55,
      "CYP2C9": 0.25,
      "CYP2C19": 0.15
    },
    "inhibits": {
      "CYP2D6": 1.35,
      "CYP2C19": 0.65,
      "CYP3A4": 0.3,
      "CYP2C9": 0.3
    },
    "halfLifeHours": 72,
    "summaryFr": "N-déméthylée en norfluoxétine active par CYP2D6, CYP2C9 et CYP2C19. Inhibiteur mécanisme-dépendant extrêmement puissant du CYP2D6 et modéré du CYP2C19.",
    "summaryEn": "N-demethylated to active norfluoxetine by CYP2D6, CYP2C9 and CYP2C19. Extremely potent CYP2D6 inhibitor and moderate CYP2C19 inhibitor."
  },
  "Flurbiprofen": {
    "verified": true,
    "pathways": {
      "CYP2C9": 0.75,
      "UGT2B7": 0.2,
      "RENAL_OAT": 0.05
    },
    "inhibits": {
      "CYP2C9": 0.3,
      "RENAL_OAT": 0.6
    },
    "nephroDynamicEffect": "NSAID_GFR_REDUCTION",
    "halfLifeHours": 4.7,
    "summaryFr": "Substrat de référence du CYP2C9 (~75% 4'-hydroxylé) et glucuronidé par UGT2B7.",
    "summaryEn": "Probe substrate of CYP2C9 (~75% 4'-hydroxylated) and glucuronidated by UGT2B7."
  },
  "Fluvoxamine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.55,
      "CYP1A2": 0.35
    },
    "inhibits": {
      "CYP1A2": 1.45,
      "CYP2C19": 1.25,
      "CYP2C9": 0.55,
      "CYP3A4": 0.5,
      "CYP2D6": 0.3
    },
    "halfLifeHours": 15.6,
    "summaryFr": "Métabolisée par CYP2D6 et CYP1A2 ; inhibiteur majeur de référence du CYP1A2 (bloque Caféine, Mélatonine, Tizanidine, Olanzapine) et du CYP2C19.",
    "summaryEn": "Metabolized by CYP2D6 and CYP1A2; gold-standard potent inhibitor of CYP1A2 (blocks Caffeine, Melatonin, Tizanidine, Olanzapine) and CYP2C19."
  },
  "Gabapentin": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 1
    },
    "toleranceClass": "ALPHA2DELTA",
    "halfLifeHours": 6,
    "summaryFr": "Excrétée à 100% sous forme inchangée par filtration glomérulaire rénale (aucune biotransformation hépatique). Absorption intestinale saturable (transporteur LAT1).",
    "summaryEn": "100% excreted unchanged via renal glomerular filtration (no hepatic biotransformation). Saturable intestinal absorption (LAT1 transporter)."
  },
  "Galantamine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.4,
      "CYP3A4": 0.35,
      "RENAL_GFR": 0.25
    },
    "halfLifeHours": 7,
    "summaryFr": "O-déméthylée par le CYP2D6 (~40%), N-déméthylée par le CYP3A4 (~35%) et excrétée à ~25% inchangée par les reins.",
    "summaryEn": "O-demethylated by CYP2D6 (~40%), N-demethylated by CYP3A4 (~35%) and ~25% excreted unchanged by the kidneys."
  },
  "GBL": {
    "verified": true,
    "pathways": {
      "ADH_ALDH2": 0.95,
      "RENAL_GFR": 0.05
    },
    "prodrug": {
      "enzyme": "BChE",
      "activeMetabolite": "GHB",
      "weight": 0.95,
      "noteFr": "Lactone hydrolysée en quelques minutes dans le sang par les lactonases sériques (PON1) / estérases en GHB actif.",
      "noteEn": "Lactone hydrolyzed within minutes in blood by serum lactonases (PON1) / esterases into active GHB."
    },
    "toleranceClass": "GABAB",
    "halfLifeHours": 0.8,
    "summaryFr": "Prodrogue rapidement convertie par les lactonases sériques en GHB, puis éliminée par le système GHB-déshydrogénase / SSADH.",
    "summaryEn": "Prodrug rapidly converted by serum lactonases to GHB, then cleared via the GHB dehydrogenase / SSADH pathway."
  },
  "GHB": {
    "verified": true,
    "pathways": {
      "ADH_ALDH2": 0.95,
      "RENAL_GFR": 0.05
    },
    "inhibits": {
      "ADH_ALDH2": 0.45
    },
    "toleranceClass": "GABAB",
    "halfLifeHours": 0.7,
    "summaryFr": "Oxydé à >95% par la GHB-déshydrogénase et la succinique semialdéhyde déshydrogénase (SSADH) vers le cycle de Krebs (cinétique saturable d'ordre zéro en compétition avec l'Alcool).",
    "summaryEn": ">95% oxidized by GHB dehydrogenase and succinic semialdehyde dehydrogenase (SSADH) into the Krebs cycle (saturable zero-order kinetics competing with Alcohol)."
  },
  "Guanfacine": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.35,
      "RENAL_OCT2": 0.15,
      "CYP3A4": 0.5
    },
    "halfLifeHours": 17,
    "summaryFr": "Excrétée à ~50% sous forme inchangée par les reins (filtration et sécrétion tubulaire OCT2) et ~50% oxydée par le CYP3A4.",
    "summaryEn": "~50% excreted unchanged by the kidneys (filtration and OCT2 tubular secretion) and ~50% oxidized by CYP3A4."
  },
  "Haloperidol": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.5,
      "CYP3A4": 0.3,
      "CYP2D6": 0.2
    },
    "inhibits": {
      "CYP2D6": 0.55
    },
    "halfLifeHours": 18,
    "summaryFr": "Glucuronidé par UGT2B7 (~50%), N-désalkylé par CYP3A4 (~30%) et oxydé par CYP2D6 (~20%). Inhibiteur modéré du CYP2D6.",
    "summaryEn": "Glucuronidated by UGT2B7 (~50%), N-dealkylated by CYP3A4 (~30%) and oxidized by CYP2D6 (~20%). Moderate CYP2D6 inhibitor."
  },
  "Heroin": {
    "verified": true,
    "pathways": {
      "BChE": 0.4,
      "CES1": 0.2,
      "UGT2B7": 0.35,
      "RENAL_GFR": 0.05
    },
    "prodrug": {
      "enzyme": "BChE",
      "activeMetabolite": "6-MAM & Morphine",
      "weight": 0.9,
      "noteFr": "Diacétylmorphine hydrolysée en quelques minutes par la BChE et la CES1 en 6-monoacétylmorphine (6-MAM) puis en Morphine, éliminée ensuite par UGT2B7.",
      "noteEn": "Diacetylmorphine rapidly hydrolyzed within minutes by BChE and CES1 to 6-MAM and Morphine, then cleared via UGT2B7."
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 2.5,
    "summaryFr": "Hydrolyse rapide en 6-MAM et Morphine par BChE/CES1, suivie d'une glucuronidation par UGT2B7.",
    "summaryEn": "Rapid hydrolysis to 6-MAM and Morphine via BChE/CES1, followed by UGT2B7 glucuronidation."
  },
  "Hydrocodone": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.5,
      "CYP2D6": 0.3,
      "UGT2B7": 0.1,
      "RENAL_GFR": 0.1
    },
    "prodrug": {
      "enzyme": "CYP2D6",
      "activeMetabolite": "Hydromorphone",
      "weight": 0.45,
      "noteFr": "Converti en Hydromorphone active par CYP2D6 et en Norhydrocodone inactive par CYP3A4.",
      "noteEn": "Converted to active Hydromorphone by CYP2D6 and inactive Norhydrocodone by CYP3A4."
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 3.8,
    "summaryFr": "N-déméthylation par CYP3A4 (~50%) et O-déméthylation par CYP2D6 (~30% en hydromorphone).",
    "summaryEn": "N-demethylation via CYP3A4 (~50%) and O-demethylation via CYP2D6 (~30% to hydromorphone)."
  },
  "Hydromorphone": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.82,
      "RENAL_GFR": 0.1
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 2.6,
    "summaryFr": "Glucuronidation directe en hydromorphone-3-glucuronide par UGT2B7 (>80%), quasi indépendante des cytochromes P450.",
    "summaryEn": "Direct glucuronidation to hydromorphone-3-glucuronide via UGT2B7 (>80%), minimal CYP450 involvement."
  },
  "Hydroxybupropion": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.6,
      "RENAL_GFR": 0.4
    },
    "inhibits": {
      "CYP2D6": 1.1
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 24,
    "summaryFr": "Métabolite actif majeur du Bupropion formé par le CYP2B6 (AUC 10x supérieure au Bupropion mère, demi-vie ~24h) : puissant inhibiteur du CYP2D6 éliminé par UGT et les reins.",
    "summaryEn": "Primary active metabolite of Bupropion formed via CYP2B6 (10x higher AUC than parent Bupropion, half-life ~24h): potent CYP2D6 inhibitor cleared via UGT and kidneys."
  },
  "Hydroxyzine": {
    "verified": true,
    "pathways": {
      "ADH_ALDH2": 0.6,
      "CYP3A4": 0.25,
      "RENAL_GFR": 0.15
    },
    "prodrug": {
      "enzyme": "ADH_ALDH2",
      "activeMetabolite": "Cetirizine",
      "weight": 0.45,
      "noteFr": "Oxydée à ~45-60% par l'alcool déshydrogénase en Cétirizine (antihistaminique H1 actif éliminé par les reins).",
      "noteEn": "~45-60% oxidized by alcohol dehydrogenase to Cetirizine (active H1 antihistamine cleared by the kidneys)."
    },
    "toleranceClass": "HISTAMINE_H1",
    "halfLifeHours": 20,
    "summaryFr": "Convertie par l'alcool déshydrogénase en Cétirizine active (éliminée par filtration rénale) et par CYP3A4.",
    "summaryEn": "Converted by alcohol dehydrogenase to active Cetirizine (renally filtered) and via CYP3A4."
  },
  "Ibogaine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.85,
      "CYP2C19": 0.1,
      "CYP3A4": 0.05
    },
    "prodrug": {
      "enzyme": "CYP2D6",
      "activeMetabolite": "Noribogaine",
      "weight": 0.55,
      "noteFr": "O-déméthylée à ~85% par le CYP2D6 en Noribogaine active à longue demi-vie (les métaboliseurs lents CYP2D6 ont une exposition deux fois plus élevée à l'ibogaïne mère cardiotoxique).",
      "noteEn": "~85% O-demethylated by CYP2D6 to long-acting active Noribogaine (CYP2D6 poor metabolizers show 2-fold higher exposure to cardiotoxic parent ibogaine)."
    },
    "halfLifeHours": 7.5,
    "summaryFr": "Métabolisée à ~85% par le CYP2D6 en noribogaine.",
    "summaryEn": "~85% metabolized by CYP2D6 to noribogaine."
  },
  "Ibuprofen": {
    "verified": true,
    "pathways": {
      "CYP2C9": 0.65,
      "UGT2B7": 0.25,
      "RENAL_OAT": 0.1
    },
    "inhibits": {
      "RENAL_OAT": 0.65,
      "CYP2C9": 0.2
    },
    "nephroDynamicEffect": "NSAID_GFR_REDUCTION",
    "halfLifeHours": 2.1,
    "summaryFr": "Oxydé à ~65% par le CYP2C9 (clairance réduite de 50-70% chez les porteurs de CYP2C9*3) et conjugué par UGT2B7. Inhibe les prostaglandines rénales (réduit l'élimination rénale du Lithium de ~35%) et entre en compétition sur les OAT rénaux.",
    "summaryEn": "~65% oxidized by CYP2C9 (50-70% reduced clearance in CYP2C9*3 carriers) and conjugated by UGT2B7. Inhibits renal prostaglandins (reducing Lithium clearance by ~35%) and competes at renal OATs."
  },
  "Imipramine": {
    "verified": true,
    "pathways": {
      "CYP2C19": 0.45,
      "CYP2D6": 0.4,
      "CYP1A2": 0.1
    },
    "inhibits": {
      "CYP2D6": 0.3
    },
    "halfLifeHours": 18,
    "summaryFr": "N-déméthylée en désipramine par CYP2C19/CYP1A2 et 2-hydroxylée par CYP2D6.",
    "summaryEn": "N-demethylated to desipramine by CYP2C19/CYP1A2 and 2-hydroxylated by CYP2D6."
  },
  "Isopropylphenidate": {
    "verified": true,
    "pathways": {
      "CES1": 0.7,
      "CYP2D6": 0.15,
      "RENAL_GFR": 0.15
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 4.2,
    "summaryFr": "Ester isopropylique plus résistant à l'hydrolyse par la CES1 que le méthylphénidate, prolongeant sa demi-vie.",
    "summaryEn": "Isopropyl ester more resistant to CES1 hydrolysis than methylphenidate, extending its half-life."
  },
  "Ketamine": {
    "verified": true,
    "pathways": {
      "CYP2B6": 0.55,
      "CYP3A4": 0.35,
      "CYP2C9": 0.05,
      "RENAL_GFR": 0.05
    },
    "toleranceClass": "NMDA",
    "halfLifeHours": 2.5,
    "summaryFr": "N-déméthylée en norkétamine (30% de puissance) principalement par le CYP2B6 (~55% : clairance très ralentie chez les porteurs de l'allèle CYP2B6*6) et le CYP3A4 (~35%).",
    "summaryEn": "N-demethylated to norketamine primarily by CYP2B6 (~55%: markedly slowed clearance in CYP2B6*6 carriers) and CYP3A4 (~35%)."
  },
  "Ketoprofen": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.75,
      "CYP2C9": 0.1,
      "RENAL_OAT": 0.15
    },
    "inhibits": {
      "RENAL_OAT": 0.7
    },
    "nephroDynamicEffect": "NSAID_GFR_REDUCTION",
    "halfLifeHours": 2.2,
    "summaryFr": "Acyl-glucuronidation prédominante par UGT2B7 (~75%) et excrétion tubulaire rénale OAT1/OAT3. Réduit la clairance rénale du Lithium et du Méthotrexate.",
    "summaryEn": "Predominant acyl-glucuronidation via UGT2B7 (~75%) and renal OAT1/OAT3 tubular secretion. Reduces renal clearance of Lithium and Methotrexate."
  },
  "Kratom": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.6,
      "CYP2D6": 0.2,
      "UGT2B7": 0.15,
      "RENAL_GFR": 0.05
    },
    "inhibits": {
      "CYP2D6": 0.65,
      "CYP3A4": 0.35
    },
    "prodrug": {
      "enzyme": "CYP3A4",
      "activeMetabolite": "7-Hydroxymitragynine",
      "weight": 0.55,
      "noteFr": "La mitragynine est oxydée par le CYP3A4 en 7-hydroxymitragynine (agoniste μ beaucoup plus puissant) et inhibe fortement le CYP2D6.",
      "noteEn": "Mitragynine is oxidized by CYP3A4 into potent 7-hydroxymitragynine and strongly inhibits CYP2D6."
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 4.5,
    "summaryFr": "Mitragynine métabolisée par CYP3A4 (~60%), CYP2D6 (~20%) et UGT ; inhibiteur notable du CYP2D6.",
    "summaryEn": "Mitragynine metabolized by CYP3A4 (~60%), CYP2D6 (~20%) and UGT; notable CYP2D6 inhibitor."
  },
  "Lamotrigine": {
    "verified": true,
    "pathways": {
      "UGT1A1_1A9": 0.75,
      "UGT2B7": 0.15,
      "RENAL_GFR": 0.1
    },
    "halfLifeHours": 29,
    "summaryFr": "N2-glucuronidée à ~90% par UGT1A4 et UGT2B7. Sa demi-vie passe de ~29h à >60h en présence de Valproate (inhibiteur UGT) et chute à ~14h avec la Carbamazépine (inducteur).",
    "summaryEn": "~90% N2-glucuronidated by UGT1A4 and UGT2B7. Half-life increases from ~29h to >60h with Valproate (UGT inhibitor) and drops to ~14h with Carbamazepine."
  },
  "Levetiracetam": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.66,
      "BChE": 0.24
    },
    "halfLifeHours": 7,
    "summaryFr": "Excrété à 66% inchangé par filtration glomérulaire rénale et 24% par hydrolyse enzymatique sanguine de son groupe acétamide (aucune implication des CYP450).",
    "summaryEn": "66% excreted unchanged via renal glomerular filtration and 24% hydrolyzed by blood amidases/esterases (zero CYP450 involvement)."
  },
  "Levomepromazine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.55,
      "CYP3A4": 0.35,
      "UGT2B7": 0.1
    },
    "inhibits": {
      "CYP2D6": 0.7
    },
    "toleranceClass": "HISTAMINE_H1",
    "halfLifeHours": 20,
    "summaryFr": "Métabolisée par CYP2D6 et CYP3A4 ; inhibiteur fort du CYP2D6.",
    "summaryEn": "Metabolized via CYP2D6 and CYP3A4; potent CYP2D6 inhibitor."
  },
  "Lisdexamfetamine": {
    "verified": true,
    "pathways": {
      "RBC_PEPTIDASE": 0.35,
      "CYP2D6": 0.3,
      "RENAL_GFR": 0.35
    },
    "prodrug": {
      "enzyme": "RBC_PEPTIDASE",
      "activeMetabolite": "Dextroamphetamine",
      "weight": 0.95,
      "noteFr": "Prodrogue clivée progressivement par les peptidases des globules rouges (érythrocytes) en L-lysine et Dextroamphétamine active, laquelle est ensuite éliminée par le CYP2D6 et les reins.",
      "noteEn": "Prodrug gradually cleaved by red blood cell peptidases into L-lysine and active Dextroamphetamine, which is then cleared via CYP2D6 and the kidneys."
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 10.5,
    "summaryFr": "Activation érythrocytaire limitante (RBC_PEPTIDASE) puis élimination de la dextroamphétamine par CYP2D6 (~30%) et filtration rénale pH-dépendante (~35-40%).",
    "summaryEn": "Rate-limiting red blood cell peptidase activation followed by dextroamphetamine clearance via CYP2D6 (~30%) and pH-dependent renal excretion (~35-40%)."
  },
  "Lithium": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.96
    },
    "halfLifeHours": 22,
    "summaryFr": "Ion monovalent éliminé à >95% par filtration glomérulaire rénale (aucun métabolisme hépatique). Réabsorbé à 80% dans le tube proximal en compétition avec le sodium : les AINS réduisent sa clairance de 25 à 40% !",
    "summaryEn": "Monovalent ion >95% cleared by renal glomerular filtration (zero hepatic metabolism). 80% reabsorbed in proximal tubule: NSAIDs reduce its renal clearance by 25 to 40%!"
  },
  "Loprazolam": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.8,
      "UGT2B7": 0.15,
      "RENAL_GFR": 0.05
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 8,
    "summaryFr": "N-oxydation sur le cycle pipérazine et réduction du groupe nitro par CYP3A4.",
    "summaryEn": "Piperazine N-oxidation and nitro reduction via CYP3A4."
  },
  "Lorazepam": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.88,
      "RENAL_GFR": 0.12
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 12,
    "summaryFr": "Benzodiazépine \"LOT\" : 3-O-glucuronidation directe par UGT2B7 (~88%) sans passer par les cytochromes P450.",
    "summaryEn": "\"LOT\" Benzodiazepine: direct 3-O-glucuronidation via UGT2B7 (~88%) bypassing CYP450 oxidation."
  },
  "Lormetazepam": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.85,
      "CYP3A4": 0.1,
      "RENAL_GFR": 0.05
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 10.5,
    "summaryFr": "Glucuronidation directe en position 3 par UGT2B7 (~85%), quasi indépendante des CYP450.",
    "summaryEn": "Direct 3-O-glucuronidation via UGT2B7 (~85%), minimal CYP450 dependence."
  },
  "Loxapine": {
    "verified": true,
    "pathways": {
      "CYP1A2": 0.45,
      "CYP3A4": 0.3,
      "CYP2D6": 0.15,
      "UGT1A1_1A9": 0.1
    },
    "halfLifeHours": 8,
    "summaryFr": "8-hydroxylée par CYP1A2 en 8-OH-loxapine et N-déméthylée en amoxapine par CYP3A4/CYP2D6.",
    "summaryEn": "8-hydroxylated by CYP1A2 to 8-OH-loxapine and N-demethylated to amoxapine via CYP3A4/CYP2D6."
  },
  "LSD": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.35,
      "CYP3A4": 0.35,
      "CYP1A2": 0.15,
      "CYP2C9": 0.15
    },
    "toleranceClass": "HT2A",
    "halfLifeHours": 3.6,
    "summaryFr": "Oxydé en 2-oxo-3-hydroxy-LSD (O-H-LSD) par CYP2D6, CYP3A4, CYP1A2 et CYP2C9. Étude clinique humaine (Vizeli et al., 2021) : les métaboliseurs lents CYP2D6 ont une exposition (+75% AUC) et une durée d'effet significativement allongées.",
    "summaryEn": "Oxidized to 2-oxo-3-hydroxy-LSD by CYP2D6, CYP3A4, CYP1A2 and CYP2C9. Human clinical data (Vizeli et al., 2021): CYP2D6 poor metabolizers show +75% higher AUC and prolonged duration."
  },
  "MCPP": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.85,
      "RENAL_GFR": 0.15
    },
    "inhibits": {
      "CYP2D6": 0.35
    },
    "toleranceClass": "SERT_SNRI",
    "halfLifeHours": 6,
    "summaryFr": "Métabolite actif pipérazinique de la Trazodone (et RC), éliminé à ~85% par p-hydroxylation via le CYP2D6 (accumulation majeure chez les métaboliseurs lents CYP2D6).",
    "summaryEn": "Active piperazine metabolite of Trazodone (and RC), ~85% cleared via CYP2D6 p-hydroxylation (major accumulation in CYP2D6 poor metabolizers)."
  },
  "MDA": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.5,
      "COMT": 0.25,
      "MAOA": 0.1,
      "RENAL_GFR": 0.15
    },
    "inhibits": {
      "CYP2D6": 1.1
    },
    "toleranceClass": "SERT_ENTACTOGEN",
    "halfLifeHours": 10.5,
    "summaryFr": "O-déméthylénée par le CYP2D6 en α-méthyldopamine puis méthylée par la COMT et éliminée par les reins.",
    "summaryEn": "O-demethylenated by CYP2D6 to α-methyldopamine then methylated by COMT and renally excreted."
  },
  "MDEA": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.5,
      "CYP3A4": 0.25,
      "COMT": 0.15,
      "RENAL_GFR": 0.1
    },
    "inhibits": {
      "CYP2D6": 1
    },
    "toleranceClass": "SERT_ENTACTOGEN",
    "halfLifeHours": 7.5,
    "summaryFr": "O-déméthylénée par CYP2D6 et N-déséthylée en MDA par CYP3A4/2B6.",
    "summaryEn": "O-demethylenated by CYP2D6 and N-deethylated to MDA via CYP3A4/2B6."
  },
  "MDMA": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.5,
      "COMT": 0.25,
      "CYP1A2": 0.1,
      "CYP2B6": 0.05,
      "CYP3A4": 0.05,
      "RENAL_GFR": 0.05
    },
    "inhibits": {
      "CYP2D6": 1.4
    },
    "toleranceClass": "SERT_ENTACTOGEN",
    "halfLifeHours": 8,
    "summaryFr": "O-déméthylénée par le CYP2D6 puis méthylée par la COMT. Particularité clinique : la MDMA forme un complexe quasi-irréversible qui auto-inhibe 90% du CYP2D6 en 1h (phénoconversion en métaboliseur lent pendant ~5 à 10 jours !).",
    "summaryEn": "O-demethylenated by CYP2D6 then methylated by COMT. Clinical feature: MDMA forms a mechanism-based complex that autoinhibits ~90% of CYP2D6 within 1h (phenoconverting users into CYP2D6 poor metabolizers for 5-10 days!)."
  },
  "Mefenamic acid": {
    "verified": true,
    "pathways": {
      "CYP2C9": 0.7,
      "UGT1A1_1A9": 0.2,
      "UGT2B7": 0.1
    },
    "inhibits": {
      "CYP2C9": 0.35,
      "RENAL_OAT": 0.55
    },
    "nephroDynamicEffect": "NSAID_GFR_REDUCTION",
    "halfLifeHours": 2.5,
    "summaryFr": "Oxydé en 3'-hydroxyméthyl par le CYP2C9 (~70%) et conjugué par UGT1A9/2B7.",
    "summaryEn": "Oxidized to 3'-hydroxymethyl via CYP2C9 (~70%) and conjugated by UGT1A9/2B7."
  },
  "Melatonin": {
    "verified": true,
    "pathways": {
      "CYP1A2": 0.85,
      "CYP2C19": 0.1,
      "SULT1A1": 0.05
    },
    "halfLifeHours": 0.8,
    "summaryFr": "6-hydroxylée à ~85% par le CYP1A2 puis sulfatée/glucuronidée en 6-sulfatoxymélatonine (la fluvoxamine ou la caféine ralentissent fortement sa dégradation).",
    "summaryEn": "~85% 6-hydroxylated by CYP1A2 then sulfated/glucuronidated to 6-sulfatoxymelatonin (fluvoxamine or caffeine strongly slow its clearance)."
  },
  "Meloxicam": {
    "verified": true,
    "pathways": {
      "CYP2C9": 0.7,
      "CYP3A4": 0.25,
      "RENAL_OAT": 0.05
    },
    "nephroDynamicEffect": "NSAID_GFR_REDUCTION",
    "halfLifeHours": 20,
    "summaryFr": "Oxydé à ~70% par le CYP2C9 (demi-vie très prolongée chez les porteurs de CYP2C9*3) et ~25% par le CYP3A4.",
    "summaryEn": "~70% oxidized by CYP2C9 (markedly prolonged half-life in CYP2C9*3 carriers) and ~25% by CYP3A4."
  },
  "Memantine": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.55,
      "RENAL_OCT2": 0.25,
      "UGT2B7": 0.15
    },
    "toleranceClass": "NMDA",
    "halfLifeHours": 65,
    "summaryFr": "Excrétée à ~75-80% sous forme inchangée par les reins (filtration glomérulaire et sécrétion tubulaire cationique active OCT2/MATE1), sans implication des CYP450.",
    "summaryEn": "~75-80% excreted unchanged by the kidneys (glomerular filtration and active OCT2/MATE1 tubular secretion), zero CYP450 involvement."
  },
  "Meprobamate": {
    "verified": true,
    "pathways": {
      "CYP2C19": 0.5,
      "CYP3A4": 0.35,
      "RENAL_GFR": 0.15
    },
    "toleranceClass": "GABA_A",
    "halfLifeHours": 10.5,
    "summaryFr": "Métabolite actif majeur du Carisoprodol (~80% via CYP2C19) et anxiolytique carbamate (Equanil) : oxydé dans le foie (CYP2C19/3A4) et excrété à ~15% inchangé par les reins.",
    "summaryEn": "Primary active metabolite of Carisoprodol (~80% via CYP2C19) and carbamate anxiolytic (Equanil): oxidized hepatically (CYP2C19/3A4) and ~15% excreted unchanged renally."
  },
  "Mescaline": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.58,
      "MAOB": 0.25,
      "MAOA": 0.12
    },
    "toleranceClass": "HT2A",
    "halfLifeHours": 6,
    "summaryFr": "Excrétée à ~55-60% sous forme inchangée dans les urines par filtration rénale et ~35-40% désaminée en acide 3,4,5-triméthoxyphénylacétique (TMPA) par les amine-oxydases.",
    "summaryEn": "~55-60% excreted unchanged in urine via renal filtration and ~35-40% deaminated to 3,4,5-trimethoxyphenylacetic acid (TMPA)."
  },
  "Metamizole": {
    "verified": true,
    "pathways": {
      "CYP2B6": 0.3,
      "CYP2C19": 0.25,
      "CYP3A4": 0.15,
      "NAT2": 0.25,
      "RENAL_GFR": 0.05
    },
    "induces": {
      "CYP2B6": 0.5,
      "CYP3A4": 0.45
    },
    "halfLifeHours": 3.5,
    "summaryFr": "Prodrogue hydrolysée en 4-MAA actif, puis N-déméthylée par CYP2B6/2C19/3A4 en 4-AA et acétylée par NAT2.",
    "summaryEn": "Prodrug hydrolyzed to active 4-MAA, then N-demethylated via CYP2B6/2C19/3A4 to 4-AA and acetylated by NAT2."
  },
  "Methadone": {
    "verified": true,
    "pathways": {
      "CYP2B6": 0.42,
      "CYP3A4": 0.35,
      "CYP2C19": 0.1,
      "CYP2D6": 0.05,
      "RENAL_GFR": 0.08
    },
    "inhibits": {
      "CYP2D6": 0.45,
      "CYP3A4": 0.25
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 28,
    "summaryFr": "N-déméthylation en EDDP principalement par CYP2B6 (stéréosélectif S-méthadone) et CYP3A4, avec contribution de CYP2C19. Inhibiteur modéré du CYP2D6.",
    "summaryEn": "N-demethylation to EDDP primarily via CYP2B6 (stereoselective for S-methadone) and CYP3A4, with CYP2C19 contribution. Moderate CYP2D6 inhibitor."
  },
  "Methamphetamine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.42,
      "RENAL_GFR": 0.43,
      "RENAL_OCT2": 0.1
    },
    "inhibits": {
      "CYP2D6": 0.25
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 10.5,
    "summaryFr": "N-déméthylée en amphétamine et 4-hydroxylée par CYP2D6 (~42%), et excrétée à ~43% sous forme inchangée par les reins.",
    "summaryEn": "N-demethylated to amphetamine and 4-hydroxylated by CYP2D6 (~42%), with ~43% excreted unchanged renally."
  },
  "Methcathinone": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.45,
      "RENAL_GFR": 0.4
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 2.3,
    "summaryFr": "N-déméthylée et réduite en éphédrine, avec participation du CYP2D6 et excrétion urinaire.",
    "summaryEn": "N-demethylated and reduced to ephedrine, with CYP2D6 involvement and urinary excretion."
  },
  "Methocarbamol": {
    "verified": true,
    "pathways": {
      "CYP2C19": 0.35,
      "UGT2B7": 0.4,
      "SULT1A1": 0.15,
      "RENAL_GFR": 0.1
    },
    "halfLifeHours": 1.5,
    "summaryFr": "Désalkylé, hydroxylé et conjugué par glucuronidation (UGT) et sulfatation (SULT).",
    "summaryEn": "Dealkylated, hydroxylated and conjugated via glucuronidation (UGT) and sulfation (SULT)."
  },
  "Methylphenidate": {
    "verified": true,
    "pathways": {
      "CES1": 0.85,
      "CYP2D6": 0.05,
      "RENAL_GFR": 0.1
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 2.8,
    "summaryFr": "Désestérification hépatique rapide (>80%) par la Carboxylestérase 1 (CES1) en acide ritalinique inactif. Quasi indépendant des CYP450 ; inhibé compétitivement par l'Alcool (formation d'éthylphénidate).",
    "summaryEn": "Rapid hepatic de-esterification (>80%) by Carboxylesterase 1 (CES1) to inactive ritalinic acid. Minimal CYP450 involvement; competitively inhibited by Alcohol (forming ethylphenidate)."
  },
  "Mianserin": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.45,
      "CYP1A2": 0.25,
      "CYP3A4": 0.25
    },
    "toleranceClass": "HISTAMINE_H1",
    "halfLifeHours": 21,
    "summaryFr": "Hydroxylée et N-déméthylée par CYP2D6, CYP1A2 et CYP3A4.",
    "summaryEn": "Hydroxylated and N-demethylated via CYP2D6, CYP1A2 and CYP3A4."
  },
  "Midazolam": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.92,
      "UGT2B7": 0.08
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 2.3,
    "summaryFr": "Substrat de référence absolu du CYP3A4 (>90% hydroxylé en 1-hydroxymidazolam).",
    "summaryEn": "Gold-standard probe substrate of CYP3A4 (>90% hydroxylated to 1-hydroxymidazolam)."
  },
  "Milnacipran": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.55,
      "UGT2B7": 0.3,
      "CYP3A4": 0.1
    },
    "halfLifeHours": 8,
    "summaryFr": "Excrété à ~55% inchangé par les reins et ~30% par glucuronidation directe (peu d'implication des CYP450).",
    "summaryEn": "~55% excreted unchanged renally and ~30% via direct glucuronidation (minimal CYP450 involvement)."
  },
  "Mirtazapine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.35,
      "CYP3A4": 0.35,
      "CYP1A2": 0.25
    },
    "toleranceClass": "HISTAMINE_H1",
    "halfLifeHours": 26,
    "summaryFr": "8-hydroxylée par CYP2D6/CYP1A2 et N-déméthylée/N-oxydée par CYP3A4.",
    "summaryEn": "8-hydroxylated by CYP2D6/CYP1A2 and N-demethylated/N-oxidized by CYP3A4."
  },
  "Moclobemide": {
    "verified": true,
    "pathways": {
      "CYP2C19": 0.6,
      "CYP2D6": 0.25
    },
    "inhibits": {
      "MAOA": 1.4,
      "CYP2C19": 0.55,
      "CYP2D6": 0.45,
      "CYP1A2": 0.4
    },
    "halfLifeHours": 2,
    "summaryFr": "Inhibiteur réversible de la MAO-A (IMAO-A) ; métabolisé par le CYP2C19 et inhibiteur de MAO-A, CYP2C19 et CYP2D6.",
    "summaryEn": "Reversible MAO-A inhibitor (RIMA); metabolized by CYP2C19 and inhibits MAO-A, CYP2C19 and CYP2D6."
  },
  "Modafinil": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.35,
      "CES1": 0.5,
      "RENAL_GFR": 0.1
    },
    "inhibits": {
      "CYP2C19": 0.65
    },
    "induces": {
      "CYP3A4": 0.35,
      "CYP2B6": 0.25,
      "CYP1A2": 0.2
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 13.5,
    "summaryFr": "Hydrolysé par les amidases/estérases en acide modafinilique (~50%) et sulfoxydé par CYP3A4 (~35%). Inhibiteur fort du CYP2C19 et inducteur modéré du CYP3A4.",
    "summaryEn": "Hydrolyzed by amidases/esterases to modafinil acid (~50%) and sulfoxidized by CYP3A4 (~35%). Potent CYP2C19 inhibitor and moderate CYP3A4 inducer."
  },
  "Morphine": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.75,
      "RENAL_GFR": 0.12,
      "RENAL_OCT2": 0.08
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 2.5,
    "summaryFr": "Glucuronidation hépatique massive par UGT2B7 (~60% en M3G inactif et ~10-15% en M6G analgésique puissant éliminé par les reins). Risque d'accumulation de M6G en cas d'insuffisance rénale.",
    "summaryEn": "Extensive hepatic glucuronidation by UGT2B7 (~60% to inactive M3G and ~10-15% to potent analgesic M6G cleared renally). M6G accumulates in renal impairment."
  },
  "Morphine-6-glucuronide": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.95,
      "RENAL_OAT": 0.05
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 3.2,
    "summaryFr": "Métabolite actif majeur de la Morphine (1.5 à 2x plus puissant sur les récepteurs μ centraux), éliminé à >95% inchangé par filtration glomérulaire rénale (DFG). Accumulation mortelle en insuffisance rénale.",
    "summaryEn": "Major active metabolite of Morphine (1.5-2x more potent at central μ-receptors), >95% excreted unchanged via renal glomerular filtration (GFR). Life-threatening accumulation in renal failure."
  },
  "Nalmefene": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.75,
      "CYP3A4": 0.15,
      "RENAL_GFR": 0.1
    },
    "halfLifeHours": 12.5,
    "summaryFr": "Conjugué principalement par UGT2B7 en nalméfène-3-O-glucuronide.",
    "summaryEn": "Primarily conjugated by UGT2B7 to nalmefene-3-O-glucuronide."
  },
  "Naloxone": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.85,
      "CYP3A4": 0.1,
      "RENAL_GFR": 0.05
    },
    "halfLifeHours": 1.2,
    "summaryFr": "Glucuronidation hépatique ultra-rapide de premier passage par UGT2B7 en naloxone-3-glucuronide.",
    "summaryEn": "Ultra-rapid hepatic first-pass glucuronidation via UGT2B7 to naloxone-3-glucuronide."
  },
  "Naltrexone": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.6,
      "RENAL_GFR": 0.25
    },
    "halfLifeHours": 4,
    "summaryFr": "Réduite par l'aldo-céto réductase (AKR1C4) en 6β-naltrexol et conjuguée par UGT2B7, éliminée par les reins.",
    "summaryEn": "Reduced by cytosolic aldo-keto reductase (AKR1C4) to 6β-naltrexol and conjugated by UGT2B7, excreted renally."
  },
  "Naproxen": {
    "verified": true,
    "pathways": {
      "CYP2C9": 0.55,
      "CYP1A2": 0.1,
      "UGT2B7": 0.25,
      "RENAL_OAT": 0.1
    },
    "inhibits": {
      "RENAL_OAT": 0.65
    },
    "nephroDynamicEffect": "NSAID_GFR_REDUCTION",
    "halfLifeHours": 14,
    "summaryFr": "6-O-déméthylé par CYP2C9 (~55%) et CYP1A2 (~10%) puis acyl-glucuronidé par UGT2B7 ; inhibe l'élimination rénale du Lithium.",
    "summaryEn": "6-O-demethylated by CYP2C9 (~55%) and CYP1A2 (~10%) then acyl-glucuronidated by UGT2B7; inhibits renal Lithium clearance."
  },
  "Nefopam": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.4,
      "CYP3A4": 0.4,
      "RENAL_GFR": 0.1
    },
    "halfLifeHours": 4.5,
    "summaryFr": "N-déméthylé et hydroxylé dans le foie par CYP2D6 et CYP3A4.",
    "summaryEn": "Hepatically N-demethylated and hydroxylated via CYP2D6 and CYP3A4."
  },
  "Nicotine": {
    "verified": true,
    "pathways": {
      "CYP2A6": 0.78,
      "CYP2B6": 0.08,
      "UGT2B7": 0.06,
      "RENAL_GFR": 0.08
    },
    "toleranceClass": null,
    "halfLifeHours": 2,
    "summaryFr": "C-oxydée à ~80% en cotinine par le CYP2A6 (avec contribution mineure de CYP2B6 et UGT2B10).",
    "summaryEn": "~80% C-oxidized to cotinine via CYP2A6 (with minor CYP2B6 and UGT contributions)."
  },
  "Nitrazepam": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.5,
      "NAT2": 0.45,
      "RENAL_GFR": 0.05
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 26,
    "summaryFr": "Nitro-réduction en 7-aminonitrazépam suivie d'une acétylation polymorphe par NAT2.",
    "summaryEn": "Nitroreduction to 7-aminonitrazepam followed by polymorphic NAT2 acetylation."
  },
  "Nitrous": {
    "verified": true,
    "pathways": {
      "PULMONARY": 0.99
    },
    "toleranceClass": "NMDA",
    "halfLifeHours": 0.08,
    "summaryFr": "Éliminé à >99% sous forme inchangée par exhalation pulmonaire en quelques minutes (aucun métabolisme hépatique ni rénal).",
    "summaryEn": ">99% eliminated unchanged via pulmonary exhalation within minutes (zero hepatic or renal metabolism)."
  },
  "Norbuprenorphine": {
    "verified": true,
    "pathways": {
      "UGT1A1_1A9": 0.5,
      "UGT2B7": 0.4,
      "RENAL_GFR": 0.1
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 40,
    "summaryFr": "Métabolite actif agoniste μ plein de la Buprénorphine (formé par CYP3A4/2C8, demi-vie ~40h), conjugué par UGT1A1/1A3/2B7 et excrété par voie biliaire.",
    "summaryEn": "Full μ-agonist active metabolite of Buprenorphine (formed via CYP3A4/2C8, half-life ~40h), conjugated by UGT1A1/1A3/2B7 and excreted biliarily."
  },
  "Norclobazam": {
    "verified": true,
    "pathways": {
      "CYP2C19": 0.85,
      "CYP3A4": 0.15
    },
    "toleranceClass": "GABA_A",
    "halfLifeHours": 75,
    "summaryFr": "Métabolite actif majeur du Clobazam (demi-vie ~75h) éliminé spécifiquement à ~85% par le CYP2C19 (accumulation 3x à 5x chez les métaboliseurs lents CYP2C19 ou sous Cannabidiol).",
    "summaryEn": "Major active metabolite of Clobazam (half-life ~75h) specifically cleared ~85% via CYP2C19 (3-to-5-fold accumulation in CYP2C19 poor metabolizers or with Cannabidiol)."
  },
  "Nordiazepam": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.5,
      "CYP2C19": 0.4,
      "UGT2B7": 0.1
    },
    "toleranceClass": "GABA_A",
    "halfLifeHours": 65,
    "summaryFr": "Métabolite actif central du Diazépam, Prazépam, Clorazépate et Chlordiazépoxide (et médicament Nordaz) : demi-vie très longue (~65h, 40-100h), 3-hydroxylé par le CYP3A4 et le CYP2C19 en Oxazépam.",
    "summaryEn": "Central active metabolite of Diazepam, Prazepam, Clorazepate and Chlordiazepoxide (and medication Nordaz): very long half-life (~65h, 40-100h), 3-hydroxylated via CYP3A4 and CYP2C19 to Oxazepam."
  },
  "Norfluoxetine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.4,
      "CYP3A4": 0.35,
      "UGT2B7": 0.25
    },
    "inhibits": {
      "CYP2D6": 1.25,
      "CYP3A4": 0.55,
      "CYP2C19": 0.5,
      "CYP2C9": 0.4
    },
    "toleranceClass": "SERT_SNRI",
    "halfLifeHours": 216,
    "summaryFr": "Métabolite actif majeur de la Fluoxétine à demi-vie ultra-longue (~9 jours / 216h) : inhibiteur très puissant du CYP2D6 et de SERT persistant 3 à 5 semaines après l'arrêt.",
    "summaryEn": "Major active metabolite of Fluoxetine with an ultra-long half-life (~9 days / 216h): potent CYP2D6 and SERT inhibitor persisting 3 to 5 weeks after stopping."
  },
  "Noribogaine": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.7,
      "RENAL_GFR": 0.3
    },
    "toleranceClass": "SERT_SNRI",
    "halfLifeHours": 36,
    "summaryFr": "Métabolite actif O-déméthylé de l'Ibogaïne formé par le CYP2D6 (demi-vie ~36h, persiste 4 à 7 jours), conjugué par glucuronidation UGT2B7 et éliminé par les reins.",
    "summaryEn": "Active O-demethylated metabolite of Ibogaine formed via CYP2D6 (half-life ~36h, persists 4-7 days), conjugated by UGT2B7 and excreted renally."
  },
  "Norketamine": {
    "verified": true,
    "pathways": {
      "CYP2B6": 0.5,
      "CYP2A6": 0.2,
      "UGT2B7": 0.2,
      "RENAL_GFR": 0.1
    },
    "toleranceClass": "NMDA",
    "halfLifeHours": 5,
    "summaryFr": "Métabolite actif N-déméthylé de la Kétamine (formé par CYP2B6/3A4, demi-vie ~5h vs 2.5h), hydroxylé ensuite par CYP2B6/2A6 en hydroxynorkétamine et glucuronidé.",
    "summaryEn": "Active N-demethylated metabolite of Ketamine (formed via CYP2B6/3A4, half-life ~5h vs 2.5h), further hydroxylated by CYP2B6/2A6 to hydroxynorketamine and glucuronidated."
  },
  "Norpethidine": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.85,
      "CES1": 0.15
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 18,
    "summaryFr": "Métabolite neurotoxique pro-convulsivant de la Péthidine (formé par CYP2B6/3A4, demi-vie ~18h vs 3.5h), éliminé à ~85% par filtration rénale (DFG).",
    "summaryEn": "Pro-convulsant neurotoxic metabolite of Pethidine (formed via CYP2B6/3A4, half-life ~18h vs 3.5h), ~85% cleared via renal filtration (GFR)."
  },
  "Nortilidine": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.6,
      "CYP2C19": 0.25,
      "RENAL_GFR": 0.15
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 4.5,
    "summaryFr": "Métabolite actif essentiel de la Tilidine (formé au premier passage par CYP3A4/2C19), dégradé ensuite en bis-nortilidine par CYP3A4 (~60%) et CYP2C19 (~25%).",
    "summaryEn": "Essential active metabolite of Tilidine (formed on first pass by CYP3A4/2C19), subsequently cleared to bisnortilidine via CYP3A4 (~60%) and CYP2C19 (~25%)."
  },
  "Nortriptyline": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.85,
      "CYP2C19": 0.1
    },
    "inhibits": {
      "CYP2D6": 0.25
    },
    "halfLifeHours": 28,
    "summaryFr": "10-hydroxylée à ~85% par le CYP2D6 (polymorphisme majeur nécessitant un ajustement de dose selon le génotype CYP2D6).",
    "summaryEn": "~85% 10-hydroxylated by CYP2D6 (major polymorphism requiring dose adjustment by CYP2D6 genotype)."
  },
  "O-Desmethyltramadol": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.55,
      "UGT1A1_1A9": 0.15,
      "RENAL_GFR": 0.3
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 7.4,
    "summaryFr": "Métabolite actif M1 du tramadol : directement actif sans besoin du CYP2D6, éliminé par glucuronidation (UGT2B7/1A8) et excrétion rénale (~30%).",
    "summaryEn": "Active M1 metabolite of tramadol: directly active without CYP2D6, cleared by glucuronidation (UGT2B7/1A8) and renal excretion (~30%)."
  },
  "Olanzapine": {
    "verified": true,
    "pathways": {
      "CYP1A2": 0.55,
      "UGT1A1_1A9": 0.3,
      "CYP2D6": 0.1
    },
    "toleranceClass": "HISTAMINE_H1",
    "halfLifeHours": 30,
    "summaryFr": "Métabolisée par le CYP1A2 (~55%, induite par le tabac et inhibée par la fluvoxamine) et par glucuronidation directe UGT1A4 (~30%).",
    "summaryEn": "Metabolized via CYP1A2 (~55%, induced by smoking and inhibited by fluvoxamine) and direct UGT1A4 glucuronidation (~30%)."
  },
  "Opium": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.65,
      "CYP3A4": 0.15,
      "CYP2D6": 0.1,
      "RENAL_GFR": 0.1
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 3,
    "summaryFr": "Alcaloïdes principaux (Morphine ~10-12%, Codéine ~1-3%) éliminés majoritairement par UGT2B7 et CYP2D6/3A4.",
    "summaryEn": "Primary alkaloids (Morphine ~10-12%, Codeine ~1-3%) cleared predominantly via UGT2B7 and CYP2D6/3A4."
  },
  "Oxazepam": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.9,
      "RENAL_GFR": 0.1
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 8,
    "summaryFr": "Benzodiazépine \"LOT\" : glucuronidation directe par UGT2B7 (~90%) en métabolite inactif éliminé dans les urines.",
    "summaryEn": "\"LOT\" Benzodiazepine: direct UGT2B7 glucuronidation (~90%) to an inactive urinary metabolite."
  },
  "Oxcarbazepine": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.55,
      "RENAL_GFR": 0.3,
      "CYP3A4": 0.1
    },
    "induces": {
      "CYP3A4": 0.45
    },
    "inhibits": {
      "CYP2C19": 0.4
    },
    "halfLifeHours": 9,
    "summaryFr": "Réduite par les réductases cytosoliques en MHD actif (licarbazépine), éliminé par glucuronidation (UGT2B7) et excrétion rénale (~30%). Inducteur modéré du CYP3A4 et inhibiteur du CYP2C19.",
    "summaryEn": "Reduced by cytosolic reductases to active MHD, cleared via UGT2B7 glucuronidation and renal excretion (~30%). Moderate CYP3A4 inducer and CYP2C19 inhibitor."
  },
  "Oxiracetam": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.85
    },
    "halfLifeHours": 8,
    "summaryFr": "Excrété à ~85% sous forme inchangée par les reins.",
    "summaryEn": "~85% excreted unchanged by the kidneys."
  },
  "Oxycodone": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.47,
      "CYP2D6": 0.13,
      "UGT2B7": 0.18,
      "RENAL_GFR": 0.12
    },
    "inhibits": {
      "CYP2D6": 0.2,
      "CYP3A4": 0.15
    },
    "prodrug": {
      "enzyme": "CYP2D6",
      "activeMetabolite": "Oxymorphone",
      "weight": 0.22,
      "noteFr": "Molécule mère déjà très active sur les récepteurs μ ; le CYP2D6 en convertit ~11% en Oxymorphone (10x plus puissante) tandis que le CYP3A4 l'inactive en Noroxycodone.",
      "noteEn": "Parent drug is directly active at μ-receptors; CYP2D6 converts ~11% to Oxymorphone (10x more potent) while CYP3A4 inactivates ~47% to Noroxycodone."
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 3.8,
    "summaryFr": "N-déméthylation majeure par CYP3A4 (~47%, inactivante), O-déméthylation par CYP2D6 (~13% en oxymorphone active), glucuronidation UGT2B7 (~18%) et excrétion rénale (~12%).",
    "summaryEn": "Major N-demethylation via CYP3A4 (~47%, inactivating), O-demethylation via CYP2D6 (~13% to active oxymorphone), UGT2B7 glucuronidation (~18%) and renal excretion (~12%)."
  },
  "Oxymorphone": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.8,
      "RENAL_GFR": 0.1
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 7.5,
    "summaryFr": "Conjuguée principalement par UGT2B7 en 3-glucuronide et réduite en 6-OH-oxymorphone.",
    "summaryEn": "Primarily conjugated via UGT2B7 to 3-glucuronide and reduced to 6-OH-oxymorphone."
  },
  "Paliperidone": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.6,
      "RENAL_OCT2": 0.2,
      "CYP3A4": 0.1,
      "UGT2B7": 0.1
    },
    "halfLifeHours": 23,
    "summaryFr": "9-hydroxyrispéridone éliminée à ~80% par les reins (~60% inchangée par filtration et sécrétion tubulaire cationique), quasi indépendante du CYP2D6.",
    "summaryEn": "9-hydroxyrisperidone ~80% cleared renally (~60% unchanged via filtration and cationic tubular secretion), minimal CYP2D6 involvement."
  },
  "Paracetamol": {
    "verified": true,
    "pathways": {
      "UGT1A1_1A9": 0.55,
      "SULT1A1": 0.32,
      "CYP2E1": 0.08,
      "RENAL_GFR": 0.05
    },
    "halfLifeHours": 2.3,
    "summaryFr": "Conjugué à ~55% par glucuronidation (UGT1A1/1A6/1A9 — ralentie dans le syndrome de Gilbert), ~32% par sulfatation (SULT1A1 — saturable à haute dose) et ~8% oxydé par CYP2E1 en NAPQI hépatotoxique (neutralisé par le glutathion / N-acétylcystéine).",
    "summaryEn": "~55% glucuronidated (UGT1A1/1A6/1A9 — slowed in Gilbert syndrome), ~32% sulfated (SULT1A1 — saturable) and ~8% oxidized by CYP2E1 to hepatotoxic NAPQI."
  },
  "Paraxanthine": {
    "verified": true,
    "pathways": {
      "CYP1A2": 0.6,
      "CYP2A6": 0.2,
      "RENAL_GFR": 0.2
    },
    "toleranceClass": "ADENOSINE",
    "halfLifeHours": 4.5,
    "summaryFr": "Métabolite actif majeur (~84%) de la Caféine formé par le CYP1A2 : déméthylé par le CYP1A2 (~60%), 8-hydroxylé par le CYP2A6 (~20%) et excrété par les reins.",
    "summaryEn": "Major active metabolite (~84%) of Caffeine formed via CYP1A2: demethylated by CYP1A2 (~60%), 8-hydroxylated by CYP2A6 (~20%) and excreted renally."
  },
  "Paroxetine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.8,
      "CYP3A4": 0.15
    },
    "inhibits": {
      "CYP2D6": 1.4,
      "CYP2B6": 0.45
    },
    "halfLifeHours": 21,
    "summaryFr": "Substrat et inhibiteur suicide (mécanisme-dépendant) le plus puissant du CYP2D6 : auto-inhibe son propre métabolisme et bloque l'activation de la Codéine/Tramadol.",
    "summaryEn": "Substrate and most potent mechanism-based suicide inhibitor of CYP2D6: autoinhibits its own clearance and blocks Codeine/Tramadol activation."
  },
  "PCP": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.55,
      "CYP2B6": 0.25,
      "CYP2C19": 0.1,
      "RENAL_GFR": 0.1
    },
    "toleranceClass": "NMDA",
    "halfLifeHours": 21,
    "summaryFr": "Hydroxylée sur les cycles cyclohexyle et pipéridine par CYP3A4 et CYP2B6 (~90%) et ~10% excrétée inchangée dans les urines.",
    "summaryEn": "Hydroxylated on cyclohexyl and piperidine rings via CYP3A4 and CYP2B6 (~90%) with ~10% unchanged urinary excretion."
  },
  "Pentobarbital": {
    "verified": true,
    "pathways": {
      "CYP2B6": 0.45,
      "CYP2C19": 0.35,
      "CYP3A4": 0.15,
      "RENAL_OAT": 0.05
    },
    "induces": {
      "CYP3A4": 0.6,
      "CYP2B6": 0.6,
      "UGT2B7": 0.4
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 22,
    "summaryFr": "Hydroxylation hépatique de la chaîne latérale par CYP2B6/2C19/3A4 ; inducteur enzymatique puissant.",
    "summaryEn": "Hepatic side-chain hydroxylation via CYP2B6/2C19/3A4; potent enzyme inducer."
  },
  "Pethidine": {
    "verified": true,
    "pathways": {
      "CES1": 0.55,
      "CYP2B6": 0.25,
      "CYP3A4": 0.15,
      "RENAL_GFR": 0.05
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 3.5,
    "summaryFr": "Hydrolysée par CES1 en acide péthidinique et N-déméthylée par CYP2B6/CYP3A4 en norpéthidine neurotoxique (éliminée par les reins).",
    "summaryEn": "Hydrolyzed by CES1 to pethidinic acid and N-demethylated by CYP2B6/CYP3A4 to neurotoxic norpethidine (renally excreted)."
  },
  "Phenazepam": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.7,
      "CYP2C19": 0.2,
      "UGT2B7": 0.1
    },
    "toleranceClass": "GABA_A",
    "halfLifeHours": 60,
    "summaryFr": "Benzodiazépine à très longue demi-vie (~60h) 3-hydroxylée par le CYP3A4 en 3-Hydroxyphénazépam actif (t½ ~26h).",
    "summaryEn": "Ultra-long-acting benzodiazepine (t½ ~60h) 3-hydroxylated by CYP3A4 into active 3-Hydroxyphenazepam (t½ ~26h)."
  },
  "Phenelzine": {
    "verified": true,
    "pathways": {
      "MAOA": 0.5,
      "NAT2": 0.35
    },
    "inhibits": {
      "MAOA": 1.5,
      "MAOB": 1.5
    },
    "halfLifeHours": 11.6,
    "summaryFr": "Inhibiteur irréversible non sélectif de MAO-A et MAO-B ; substrat de la MAO et acétylation mineure par NAT2.",
    "summaryEn": "Irreversible non-selective MAO-A and MAO-B inhibitor; MAO substrate with minor NAT2 acetylation."
  },
  "Phenibut": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.68
    },
    "toleranceClass": "GABAB",
    "halfLifeHours": 5.3,
    "summaryFr": "Excrété majoritairement sous forme inchangée par les reins (~65-70%).",
    "summaryEn": "Predominantly excreted unchanged by the kidneys (~65-70%)."
  },
  "Phenobarbital": {
    "verified": true,
    "pathways": {
      "CYP2C9": 0.4,
      "CYP2C19": 0.25,
      "UGT2B7": 0.1,
      "RENAL_GFR": 0.25
    },
    "induces": {
      "CYP3A4": 0.8,
      "CYP2B6": 0.8,
      "CYP2C9": 0.6,
      "UGT2B7": 0.5
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 80,
    "summaryFr": "Parahydroxylation par CYP2C9/CYP2C19 (~65%) et excrétion rénale inchangée (~25%). Puissant inducteur enzymatique.",
    "summaryEn": "Parahydroxylation via CYP2C9/CYP2C19 (~65%) and unchanged renal excretion (~25%). Potent enzyme inducer."
  },
  "Phenylpiracetam": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.65,
      "CYP3A4": 0.2,
      "UGT2B7": 0.15
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 4.5,
    "summaryFr": "Éliminé à ~60-65% inchangé dans les urines et partiellement hydroxylé.",
    "summaryEn": "~60-65% excreted unchanged in urine and partially hydroxylated."
  },
  "Phloroglucinol": {
    "verified": true,
    "pathways": {
      "UGT1A1_1A9": 0.6,
      "SULT1A1": 0.3,
      "RENAL_GFR": 0.1
    },
    "halfLifeHours": 1.7,
    "summaryFr": "Conjugué rapidement par glucuronidation et sulfatation hépatiques puis éliminé dans les urines.",
    "summaryEn": "Rapidly conjugated via hepatic glucuronidation and sulfation and excreted in urine."
  },
  "Piracetam": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.96
    },
    "halfLifeHours": 5,
    "summaryFr": "Excrété à >95% sous forme inchangée dans les urines par filtration glomérulaire rénale (aucun métabolisme hépatique).",
    "summaryEn": ">95% excreted unchanged in urine via renal glomerular filtration (zero hepatic metabolism)."
  },
  "Piroxicam": {
    "verified": true,
    "pathways": {
      "CYP2C9": 0.85,
      "UGT2B7": 0.1,
      "RENAL_OAT": 0.05
    },
    "nephroDynamicEffect": "NSAID_GFR_REDUCTION",
    "halfLifeHours": 50,
    "summaryFr": "5'-hydroxylé à ~85% par le CYP2C9 : demi-vie déjà très longue (~50h) pouvant dépasser 150h chez les métaboliseurs lents CYP2C9.",
    "summaryEn": "~85% 5'-hydroxylated by CYP2C9: long baseline half-life (~50h) can exceed 150h in CYP2C9 poor metabolizers."
  },
  "Pitolisant": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.45,
      "CYP3A4": 0.4,
      "UGT2B7": 0.1,
      "RENAL_GFR": 0.05
    },
    "inhibits": {
      "CYP2D6": 0.2
    },
    "halfLifeHours": 11,
    "summaryFr": "Métabolisé conjointement par CYP2D6 et CYP3A4 (aucose d'exposition doublée chez les métaboliseurs lents CYP2D6).",
    "summaryEn": "Co-metabolized by CYP2D6 and CYP3A4 (~2-fold higher exposure in CYP2D6 poor metabolizers)."
  },
  "Prazepam": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.45,
      "CYP2C19": 0.45,
      "UGT2B7": 0.1
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 50,
    "summaryFr": "Prodrogue convertie au premier passage en nordiazépam par CYP3A4/CYP2C19.",
    "summaryEn": "Prodrug converted during first-pass metabolism to nordiazepam via CYP3A4/CYP2C19."
  },
  "Prednisolone": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.65,
      "UGT2B7": 0.2,
      "RENAL_GFR": 0.15
    },
    "induces": {
      "CYP3A4": 0.3
    },
    "halfLifeHours": 3.2,
    "summaryFr": "Métabolisée par la 11β-HSD et le CYP3A4 (~65%), conjuguée et excrétée à ~15% inchangée dans les urines.",
    "summaryEn": "Metabolized by 11β-HSD and CYP3A4 (~65%), conjugated and ~15% excreted unchanged in urine."
  },
  "Pregabalin": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.98
    },
    "toleranceClass": "ALPHA2DELTA",
    "halfLifeHours": 6.3,
    "summaryFr": "Élimination rénale pure (~98% excrétée inchangée dans les urines par filtration glomérulaire, aucun métabolisme hépatique CYP450). Sa durée dépend directement du DFG / taux de créatinine.",
    "summaryEn": "Pure renal elimination (~98% excreted unchanged in urine via glomerular filtration, zero CYP450 hepatic metabolism). Duration is directly governed by eGFR / serum creatinine."
  },
  "Prochlorperazine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.55,
      "CYP3A4": 0.35,
      "UGT2B7": 0.1
    },
    "halfLifeHours": 8,
    "summaryFr": "Métabolisée dans le foie par CYP2D6 et CYP3A4.",
    "summaryEn": "Hepatically metabolized by CYP2D6 and CYP3A4."
  },
  "Progesterone": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.5,
      "CYP2C19": 0.25,
      "UGT2B7": 0.25
    },
    "halfLifeHours": 5,
    "summaryFr": "Réduite par les 5α/5β-réductases en alloprégnanolone (neurostéroïde GABA-A actif), hydroxylée par CYP3A4/2C19 et glucuronidée.",
    "summaryEn": "Reduced by 5α/5β-reductases to allopregnanolone (active GABA-A neurosteroid), hydroxylated by CYP3A4/2C19 and glucuronidated."
  },
  "Promethazine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.65,
      "CYP2B6": 0.2,
      "RENAL_GFR": 0.1
    },
    "inhibits": {
      "CYP2D6": 0.45
    },
    "toleranceClass": "HISTAMINE_H1",
    "halfLifeHours": 12,
    "summaryFr": "Hydroxylée principalement par le CYP2D6 (~65%) et sulfoxydée ; inhibiteur modéré du CYP2D6.",
    "summaryEn": "Hydroxylated primarily by CYP2D6 (~65%) and sulfoxidized; moderate CYP2D6 inhibitor."
  },
  "Propranolol": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.45,
      "CYP1A2": 0.35,
      "UGT1A1_1A9": 0.15,
      "CYP2C19": 0.05
    },
    "inhibits": {
      "CYP2D6": 0.25,
      "CYP1A2": 0.2
    },
    "halfLifeHours": 4.5,
    "summaryFr": "Hydroxylé sur le cycle par CYP2D6 (~45%), N-désisopropylée par CYP1A2 (~35%) et directement glucuronidé (~15%).",
    "summaryEn": "Ring-hydroxylated by CYP2D6 (~45%), side-chain N-deisopropylated by CYP1A2 (~35%) and directly glucuronidated (~15%)."
  },
  "Propylhexedrine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.45,
      "RENAL_GFR": 0.45
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 4,
    "summaryFr": "Métabolisée par le CYP2D6 (hydroxylation et N-déméthylation) et éliminée par les reins.",
    "summaryEn": "Metabolized via CYP2D6 (hydroxylation and N-demethylation) and excreted renally."
  },
  "Psilocin": {
    "verified": true,
    "pathways": {
      "UGT1A1_1A9": 0.65,
      "MAOA": 0.25,
      "RENAL_GFR": 0.1
    },
    "toleranceClass": "HT2A",
    "halfLifeHours": 2.8,
    "summaryFr": "Glucuronidée à ~65% en psilocine-O-glucuronide par UGT1A10 (intestin) et UGT1A9 (foie) et oxydée à ~25% par la MAO-A en acide 4-hydroxy-indole-3-acétique.",
    "summaryEn": "~65% glucuronidated to psilocin-O-glucuronide via UGT1A10/1A9 and ~25% oxidized by MAO-A to 4-HIAA."
  },
  "Psilocybin mushrooms": {
    "verified": true,
    "pathways": {
      "UGT1A1_1A9": 0.65,
      "MAOA": 0.25,
      "RENAL_GFR": 0.1
    },
    "toleranceClass": "HT2A",
    "halfLifeHours": 3,
    "summaryFr": "La psilocybine est rapidement déphosphorylée par la phosphatase alcaline en Psilocine active, laquelle est glucuronidée à ~65% par UGT1A10/UGT1A9 et désaminée à ~25% par la MAO-A.",
    "summaryEn": "Psilocybin is rapidly dephosphorylated by alkaline phosphatase to active Psilocin, which is ~65% glucuronidated by UGT1A10/1A9 and ~25% deaminated by MAO-A."
  },
  "Pyrazolam": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.85,
      "UGT2B7": 0.15
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 17,
    "summaryFr": "Particularité pharmacocinétique : peu ou pas de métabolisme oxydatif hépatique, éliminé principalement inchangé dans les urines par filtration rénale.",
    "summaryEn": "Pharmacokinetic particularity: minimal hepatic oxidative metabolism, excreted largely unchanged in urine via renal filtration."
  },
  "Quetiapine": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.85,
      "CYP2D6": 0.1,
      "RENAL_GFR": 0.05
    },
    "toleranceClass": "HISTAMINE_H1",
    "halfLifeHours": 6.5,
    "summaryFr": "Sulfoxydée et N-désalkylée en norquétiapine active à ~85% par le CYP3A4.",
    "summaryEn": "Sulfoxidized and N-dealkylated to active norquetiapine ~85% via CYP3A4."
  },
  "Risperidone": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.7,
      "CYP3A4": 0.2,
      "RENAL_GFR": 0.1
    },
    "prodrug": {
      "enzyme": "CYP2D6",
      "activeMetabolite": "9-Hydroxyrisperidone (Paliperidone)",
      "weight": 0.5,
      "noteFr": "9-hydroxylée par le CYP2D6 en Palipéridone équi-active (la fraction active totale dépend ensuite de l'élimination rénale).",
      "noteEn": "9-hydroxylated by CYP2D6 into equipotent Paliperidone (total active moiety is then cleared renally)."
    },
    "halfLifeHours": 6,
    "summaryFr": "9-hydroxylée à ~70% par le CYP2D6 en palipéridone active, laquelle est excrétée par les reins.",
    "summaryEn": "~70% 9-hydroxylated by CYP2D6 into active paliperidone, which is renally excreted."
  },
  "Rizatriptan": {
    "verified": true,
    "pathways": {
      "MAOA": 0.75,
      "RENAL_GFR": 0.15,
      "RENAL_OCT2": 0.1
    },
    "halfLifeHours": 2,
    "summaryFr": "Désaminé à ~75% par la MAO-A (le Propranolol inhibe son métabolisme de premier passage et augmente son exposition de 70%).",
    "summaryEn": "~75% deaminated by MAO-A (Propranolol inhibits its first-pass metabolism, increasing exposure by 70%)."
  },
  "Salvinorin A": {
    "verified": true,
    "pathways": {
      "BChE": 0.65,
      "UGT2B7": 0.25,
      "CYP2D6": 0.1
    },
    "halfLifeHours": 0.4,
    "summaryFr": "Diterpène ester hydrolysé rapidement par les carboxylesterases/butyrylcholinestérase (BChE) en salvinorine B inactive et glucuronidé par UGT2B7.",
    "summaryEn": "Diterpene ester rapidly hydrolyzed by esterases/BChE to inactive salvinorin B and glucuronidated by UGT2B7."
  },
  "Secobarbital": {
    "verified": true,
    "pathways": {
      "CYP2B6": 0.45,
      "CYP2C19": 0.35,
      "CYP3A4": 0.15,
      "RENAL_GFR": 0.05
    },
    "induces": {
      "CYP3A4": 0.55,
      "CYP2B6": 0.55
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 28,
    "summaryFr": "Oxydation hépatique par CYP2B6, CYP2C19 et CYP3A4.",
    "summaryEn": "Hepatic oxidation via CYP2B6, CYP2C19 and CYP3A4."
  },
  "Selegiline": {
    "verified": true,
    "pathways": {
      "CYP2B6": 0.55,
      "CYP2C19": 0.25,
      "CYP2D6": 0.15
    },
    "inhibits": {
      "MAOB": 1.45,
      "MAOA": 0.35
    },
    "halfLifeHours": 2,
    "summaryFr": "Inhibiteur irréversible sélectif de la MAO-B ; N-désalkylée par CYP2B6 et CYP2C19 en L-méthamphétamine et L-amphétamine.",
    "summaryEn": "Selective irreversible MAO-B inhibitor; N-dealkylated via CYP2B6 and CYP2C19 to L-methamphetamine and L-amphetamine."
  },
  "Sertraline": {
    "verified": true,
    "pathways": {
      "CYP2C19": 0.45,
      "CYP2B6": 0.25,
      "CYP3A4": 0.15,
      "CYP2D6": 0.1
    },
    "inhibits": {
      "CYP2D6": 0.35,
      "CYP2B6": 0.3
    },
    "halfLifeHours": 26,
    "summaryFr": "N-déméthylée principalement par le CYP2C19 (~45%, exposition doublée chez les PM CYP2C19) et CYP2B6/3A4.",
    "summaryEn": "N-demethylated primarily via CYP2C19 (~45%, doubled exposure in CYP2C19 poor metabolizers) and CYP2B6/3A4."
  },
  "Solriamfetol": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.7,
      "RENAL_OCT2": 0.2
    },
    "toleranceClass": "DAT_NET",
    "halfLifeHours": 7.1,
    "summaryFr": "Excrété à ~90% sous forme inchangée dans les urines par filtration glomérulaire et sécrétion tubulaire active OCT2/MATE1.",
    "summaryEn": "~90% excreted unchanged in urine via glomerular filtration and active OCT2/MATE1 tubular secretion."
  },
  "Sufentanil": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.88,
      "RENAL_GFR": 0.05
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 2.7,
    "summaryFr": "Métabolisé à ~88% par N-désalkylation et O-déméthylation via le CYP3A4.",
    "summaryEn": "~88% metabolized via N-dealkylation and O-demethylation by CYP3A4."
  },
  "Sumatriptan": {
    "verified": true,
    "pathways": {
      "MAOA": 0.8,
      "RENAL_GFR": 0.2
    },
    "halfLifeHours": 2.2,
    "summaryFr": "Désaminé à ~80% par la Monoamine Oxydase A (MAO-A) en acide indole-acétique inactif et ~20% éliminé par les reins (strictement contre-indiqué avec les IMAO-A).",
    "summaryEn": "~80% deaminated by Monoamine Oxidase A (MAO-A) to inactive indole acetic acid and ~20% excreted renally (contraindicated with MAO-A inhibitors)."
  },
  "Tapentadol": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.4,
      "UGT1A1_1A9": 0.3,
      "SULT1A1": 0.15,
      "CYP2C9": 0.1,
      "RENAL_GFR": 0.05
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 4,
    "summaryFr": "Éliminé à 85% par conjugaison directe (UGT2B7/UGT1A9 ~70% et sulfatation SULT1A1 ~15%) sans métabolite actif.",
    "summaryEn": "85% cleared by direct Phase II conjugation (UGT2B7/UGT1A9 ~70% and SULT1A1 sulfation ~15%) with no active metabolites."
  },
  "Temazepam": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.85,
      "CYP3A4": 0.1,
      "RENAL_GFR": 0.05
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 10,
    "summaryFr": "Conjugaison directe par UGT2B7 (~85%) avec déméthylation mineure en oxazépam.",
    "summaryEn": "Direct UGT2B7 conjugation (~85%) with minor demethylation to oxazepam."
  },
  "Theacrine": {
    "verified": true,
    "pathways": {
      "CYP1A2": 0.8,
      "RENAL_GFR": 0.15
    },
    "toleranceClass": "ADENOSINE",
    "halfLifeHours": 20,
    "summaryFr": "Purine méthylée éliminée lentement par le CYP1A2 et excrétion rénale.",
    "summaryEn": "Methylated purine slowly cleared via CYP1A2 and renal excretion."
  },
  "Tianeptine": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.15
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 2.5,
    "summaryFr": "Éliminée principalement par bêta-oxydation mitochondriale de sa chaîne latérale (analogue aux acides gras, indépendante des CYP450) ; métabolite actif MC5 éliminé par les reins.",
    "summaryEn": "Cleared primarily via mitochondrial beta-oxidation of its side chain (independent of CYP450); active MC5 metabolite is renally excreted."
  },
  "Tianeptine MC5": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.8,
      "UGT2B7": 0.2
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 7.2,
    "summaryFr": "Métabolite actif pentanoïque (MC5) de la Tianeptine formé par bêta-oxydation mitochondriale (demi-vie ~7.2h vs 2.5h), éliminé à ~80% par les reins (DFG).",
    "summaryEn": "Active pentanoic acid (MC5) metabolite of Tianeptine formed via mitochondrial beta-oxidation (half-life ~7.2h vs 2.5h), ~80% cleared renally (GFR)."
  },
  "Tiapride": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.75,
      "RENAL_OCT2": 0.15
    },
    "halfLifeHours": 3.5,
    "summaryFr": "Excrété à ~90% sous forme inchangée dans les urines par filtration glomérulaire et sécrétion tubulaire.",
    "summaryEn": "~90% excreted unchanged in urine via glomerular filtration and tubular secretion."
  },
  "Tiaprofenic acid": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.6,
      "RENAL_GFR": 0.25,
      "RENAL_OAT": 0.15
    },
    "inhibits": {
      "RENAL_OAT": 0.65
    },
    "nephroDynamicEffect": "NSAID_GFR_REDUCTION",
    "halfLifeHours": 2,
    "summaryFr": "Conjugué en acyl-glucuronide par UGT2B7 (~60%) et éliminé par filtration et sécrétion tubulaire rénale.",
    "summaryEn": "Acyl-glucuronidated via UGT2B7 (~60%) and cleared by renal filtration and tubular secretion."
  },
  "Tilidin": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.65,
      "CYP2C19": 0.25,
      "RENAL_GFR": 0.1
    },
    "prodrug": {
      "enzyme": "CYP3A4",
      "activeMetabolite": "Nortilidine",
      "weight": 0.85,
      "noteFr": "Prodrogue N-déméthylée au premier passage hépatique en Nortilidine active par CYP3A4 et CYP2C19.",
      "noteEn": "Prodrug N-demethylated during first-pass metabolism into active Nortilidine via CYP3A4 and CYP2C19."
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 4,
    "summaryFr": "Prodrogue activée puis éliminée en bis-nortilidine par CYP3A4 (~65%) et CYP2C19 (~25%).",
    "summaryEn": "Prodrug activated and cleared to bisnortilidine via CYP3A4 (~65%) and CYP2C19 (~25%)."
  },
  "Tizanidine": {
    "verified": true,
    "pathways": {
      "CYP1A2": 0.95,
      "RENAL_GFR": 0.05
    },
    "halfLifeHours": 2.5,
    "summaryFr": "Substrat ultra-sensible du CYP1A2 (~95%) : les inhibiteurs du CYP1A2 (fluvoxamine, ciprofloxacine) multiplient sa concentration par 10 à 33x.",
    "summaryEn": "Ultra-sensitive CYP1A2 substrate (~95%): CYP1A2 inhibitors (fluvoxamine, ciprofloxacin) increase exposure 10- to 33-fold."
  },
  "Topiramate": {
    "verified": true,
    "pathways": {
      "RENAL_GFR": 0.7,
      "CYP3A4": 0.2,
      "UGT2B7": 0.1
    },
    "inhibits": {
      "CYP2C19": 0.35
    },
    "induces": {
      "CYP3A4": 0.3
    },
    "halfLifeHours": 21,
    "summaryFr": "Éliminé à ~70% sous forme inchangée dans les urines par filtration rénale.",
    "summaryEn": "~70% excreted unchanged in urine via renal filtration."
  },
  "Tramadol": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.4,
      "CYP3A4": 0.22,
      "CYP2B6": 0.08,
      "RENAL_GFR": 0.3
    },
    "inhibits": {
      "CYP2D6": 0.2
    },
    "prodrug": {
      "enzyme": "CYP2D6",
      "activeMetabolite": "O-Desmethyltramadol (M1)",
      "weight": 0.65,
      "noteFr": "Action bimodale : le Tramadol mère inhibe la recapture de la sérotonine/noradrénaline, tandis que son métabolite M1 (O-DSMT, produit par CYP2D6) assure l'effet opioïde μ (200x plus d'affinité).",
      "noteEn": "Dual mechanism: parent Tramadol inhibits 5-HT/NE reuptake, while CYP2D6 forms M1 (O-DSMT) responsible for μ-opioid analgesia (200x higher affinity)."
    },
    "toleranceClass": "MOR",
    "halfLifeHours": 6,
    "summaryFr": "Activation en O-DSMT (M1) par CYP2D6 (~40%), N-déméthylation en M2 inactif par CYP3A4/CYP2B6 (~30%) et excrétion rénale directe (~30%, + élimination rénale de M1).",
    "summaryEn": "Activation to O-DSMT (M1) via CYP2D6 (~40%), N-demethylation to inactive M2 via CYP3A4/CYP2B6 (~30%) and direct renal excretion (~30%, plus renal clearance of M1)."
  },
  "Tranylcypromine": {
    "verified": true,
    "pathways": {
      "CYP2C19": 0.4,
      "MAOA": 0.4
    },
    "inhibits": {
      "MAOA": 1.5,
      "MAOB": 1.5,
      "CYP2A6": 0.85,
      "CYP2C19": 0.55
    },
    "halfLifeHours": 2.5,
    "summaryFr": "Inhibiteur irréversible de MAO-A et MAO-B ; inhibe également fortement le CYP2A6 et le CYP2C19.",
    "summaryEn": "Irreversible MAO-A and MAO-B inhibitor; also strongly inhibits CYP2A6 and CYP2C19."
  },
  "Trazodone": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.75,
      "CYP2D6": 0.2
    },
    "halfLifeHours": 7.5,
    "summaryFr": "Convertie par CYP3A4 en mCPP (méta-chlorophénylpipérazine), lequel est ensuite éliminé par le CYP2D6.",
    "summaryEn": "Converted by CYP3A4 to mCPP, which is subsequently cleared by CYP2D6."
  },
  "Triazolam": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.9,
      "UGT2B7": 0.1
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 2.5,
    "summaryFr": "Hydroxylé à ~90% par le CYP3A4 ; contre-indiqué avec les inhibiteurs forts du CYP3A4.",
    "summaryEn": "~90% hydroxylated by CYP3A4; contraindicated with strong CYP3A4 inhibitors."
  },
  "Trihexyphenidyl": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.55,
      "CYP3A4": 0.35,
      "RENAL_GFR": 0.1
    },
    "halfLifeHours": 10,
    "summaryFr": "Hydroxylé par les cytochromes hépatiques (CYP2D6/3A4).",
    "summaryEn": "Hydroxylated by hepatic cytochromes (CYP2D6/3A4)."
  },
  "Tropatepine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.5,
      "CYP3A4": 0.4,
      "RENAL_GFR": 0.1
    },
    "halfLifeHours": 38,
    "summaryFr": "Anticholinergique antiparkinsonien métabolisé dans le foie par CYP2D6 et CYP3A4.",
    "summaryEn": "Anticholinergic antiparkinsonian hepatically metabolized via CYP2D6 and CYP3A4."
  },
  "Valproate": {
    "verified": true,
    "pathways": {
      "UGT2B7": 0.45,
      "UGT1A1_1A9": 0.1,
      "CYP2C9": 0.12,
      "CYP2A6": 0.05,
      "RENAL_GFR": 0.03
    },
    "inhibits": {
      "UGT1A1_1A9": 1.15,
      "UGT2B7": 0.75,
      "CYP2C9": 0.55
    },
    "halfLifeHours": 14,
    "summaryFr": "Éliminé par glucuronidation UGT2B7/1A6 (~55%), bêta-oxydation mitochondriale (~30%) et CYP2C9 (~12%). Puissant inhibiteur des UGT (double la demi-vie de la Lamotrigine et du Lorazépam) et du CYP2C9.",
    "summaryEn": "Cleared by UGT2B7/1A6 glucuronidation (~55%), mitochondrial beta-oxidation (~30%) and CYP2C9 (~12%). Potent inhibitor of UGTs (doubles Lamotrigine and Lorazepam half-life) and CYP2C9."
  },
  "Venlafaxine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.65,
      "CYP3A4": 0.2,
      "CYP2C19": 0.1,
      "RENAL_GFR": 0.05
    },
    "prodrug": {
      "enzyme": "CYP2D6",
      "activeMetabolite": "O-Desmethylvenlafaxine (Desvenlafaxine)",
      "weight": 0.5,
      "noteFr": "Convertie par le CYP2D6 en O-desméthylvenlafaxine (Desvenlafaxine) équi-active, éliminée ensuite par UGT et les reins.",
      "noteEn": "Converted by CYP2D6 into equipotent O-desmethylvenlafaxine (Desvenlafaxine), which is then cleared via UGT and renal excretion."
    },
    "halfLifeHours": 5,
    "summaryFr": "O-déméthylée à ~65% par le CYP2D6 en desvenlafaxine active et N-déméthylée par CYP3A4/CYP2C19.",
    "summaryEn": "~65% O-demethylated by CYP2D6 to active desvenlafaxine and N-demethylated by CYP3A4/CYP2C19."
  },
  "Vortioxetine": {
    "verified": true,
    "pathways": {
      "CYP2D6": 0.65,
      "CYP3A4": 0.15,
      "CYP2C9": 0.1,
      "UGT2B7": 0.1
    },
    "halfLifeHours": 66,
    "summaryFr": "Oxydée principalement par le CYP2D6 (les métaboliseurs lents CYP2D6 ont une exposition doublée).",
    "summaryEn": "Oxidized primarily by CYP2D6 (CYP2D6 poor metabolizers have 2-fold higher exposure)."
  },
  "Zaleplon": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.3,
      "ADH_ALDH2": 0.65,
      "RENAL_GFR": 0.05
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 1.1,
    "summaryFr": "Oxydé principalement par l'aldéhyde oxydase (AOX1 / déshydrogénases) en 5-oxo-zaléplon et par le CYP3A4 (~30%).",
    "summaryEn": "Oxidized primarily by aldehyde oxidase (AOX1) to 5-oxo-zaleplon and by CYP3A4 (~30%)."
  },
  "Zolmitriptan": {
    "verified": true,
    "pathways": {
      "CYP1A2": 0.6,
      "MAOA": 0.3,
      "RENAL_GFR": 0.1
    },
    "halfLifeHours": 3,
    "summaryFr": "Converti par le CYP1A2 (~60%) en métabolite N-desméthyl actif, lequel est ensuite éliminé par la MAO-A (~30%).",
    "summaryEn": "Converted by CYP1A2 (~60%) to active N-desmethyl metabolite, which is subsequently cleared by MAO-A (~30%)."
  },
  "Zolpidem": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.62,
      "CYP2C9": 0.22,
      "CYP1A2": 0.12,
      "CYP2D6": 0.04
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 2.4,
    "summaryFr": "Oxydé en métabolites carboxyliques inactifs par CYP3A4 (~62%), CYP2C9 (~22%) et CYP1A2 (~12%).",
    "summaryEn": "Oxidized to inactive carboxylic acid metabolites via CYP3A4 (~62%), CYP2C9 (~22%) and CYP1A2 (~12%)."
  },
  "Zopiclone": {
    "verified": true,
    "pathways": {
      "CYP3A4": 0.65,
      "CYP2C8": 0.2,
      "RENAL_GFR": 0.1
    },
    "toleranceClass": "GABAA_BZD",
    "halfLifeHours": 5,
    "summaryFr": "N-déméthylée et N-oxydée par CYP3A4 (~65%) et CYP2C8 (~20%).",
    "summaryEn": "N-demethylated and N-oxidized via CYP3A4 (~65%) and CYP2C8 (~20%)."
  }
};

const ACTIVE_METABOLITES_LINKS = {
  "1,4-Butanediol": [
    {
      "name": "GHB",
      "directUse": "rc",
      "formationEnzyme": "ADH_ALDH2",
      "conversionFraction": 0.95,
      "potencyRelative": 1,
      "halfLifeHours": 0.8,
      "peakDelayHours": 0.6,
      "tailWeight": 0.12,
      "renalDependent": false,
      "color": "#A89AF4"
    }
  ],
  "1B-LSD": [
    {
      "name": "LSD",
      "directUse": "rc",
      "formationEnzyme": "RBC_PEPTIDASE",
      "conversionFraction": 0.95,
      "potencyRelative": 1,
      "halfLifeHours": 3.6,
      "peakDelayHours": 0.9,
      "tailWeight": 0.14,
      "renalDependent": false,
      "color": "#9327EC"
    }
  ],
  "1cP-AL-LAD": [
    {
      "name": "AL-LAD",
      "directUse": "rc",
      "formationEnzyme": "RBC_PEPTIDASE",
      "conversionFraction": 0.95,
      "potencyRelative": 1,
      "halfLifeHours": 3.4,
      "peakDelayHours": 0.8,
      "tailWeight": 0.14,
      "renalDependent": false,
      "color": "#9B68DE"
    }
  ],
  "1cP-LSD": [
    {
      "name": "LSD",
      "directUse": "rc",
      "formationEnzyme": "RBC_PEPTIDASE",
      "conversionFraction": 0.95,
      "potencyRelative": 1,
      "halfLifeHours": 3.6,
      "peakDelayHours": 0.8,
      "tailWeight": 0.12,
      "renalDependent": false,
      "color": "#9327EC"
    }
  ],
  "1cP-MiPLA": [
    {
      "name": "MiPLA",
      "directUse": "rc",
      "formationEnzyme": "RBC_PEPTIDASE",
      "conversionFraction": 0.95,
      "potencyRelative": 1,
      "halfLifeHours": 3,
      "peakDelayHours": 0.7,
      "tailWeight": 0.14,
      "renalDependent": false,
      "color": "#EC27C3"
    }
  ],
  "1P-ETH-LAD": [
    {
      "name": "ETH-LAD",
      "directUse": "rc",
      "formationEnzyme": "RBC_PEPTIDASE",
      "conversionFraction": 0.95,
      "potencyRelative": 1,
      "halfLifeHours": 3.8,
      "peakDelayHours": 0.9,
      "tailWeight": 0.14,
      "renalDependent": false,
      "color": "#CF8AEF"
    }
  ],
  "1P-LSD": [
    {
      "name": "LSD",
      "directUse": "rc",
      "formationEnzyme": "RBC_PEPTIDASE",
      "conversionFraction": 0.95,
      "potencyRelative": 1,
      "halfLifeHours": 3.6,
      "peakDelayHours": 0.8,
      "tailWeight": 0.12,
      "renalDependent": false,
      "color": "#9327EC"
    }
  ],
  "1V-LSD": [
    {
      "name": "LSD",
      "directUse": "rc",
      "formationEnzyme": "RBC_PEPTIDASE",
      "conversionFraction": 0.95,
      "potencyRelative": 1,
      "halfLifeHours": 3.6,
      "peakDelayHours": 1.2,
      "tailWeight": 0.14,
      "renalDependent": false,
      "color": "#9327EC"
    }
  ],
  "4-AcO-DET": [
    {
      "name": "4-HO-DET",
      "directUse": "rc",
      "formationEnzyme": "BChE",
      "conversionFraction": 0.9,
      "potencyRelative": 1,
      "halfLifeHours": 2.5,
      "peakDelayHours": 0.5,
      "tailWeight": 0.14,
      "renalDependent": false,
      "color": "#F49AE2"
    }
  ],
  "4-AcO-DiPT": [
    {
      "name": "4-HO-DiPT",
      "directUse": "rc",
      "formationEnzyme": "BChE",
      "conversionFraction": 0.9,
      "potencyRelative": 1,
      "halfLifeHours": 2.2,
      "peakDelayHours": 0.4,
      "tailWeight": 0.14,
      "renalDependent": false,
      "color": "#DF8AEF"
    }
  ],
  "4-AcO-DMT": [
    {
      "name": "Psilocin",
      "directUse": "rc",
      "formationEnzyme": "BChE",
      "conversionFraction": 0.9,
      "potencyRelative": 1,
      "halfLifeHours": 2.8,
      "peakDelayHours": 0.5,
      "tailWeight": 0.12,
      "renalDependent": false,
      "color": "#EF8AC7"
    }
  ],
  "4-AcO-MET": [
    {
      "name": "4-HO-MET",
      "directUse": "rc",
      "formationEnzyme": "BChE",
      "conversionFraction": 0.9,
      "potencyRelative": 1,
      "halfLifeHours": 2.8,
      "peakDelayHours": 0.5,
      "tailWeight": 0.14,
      "renalDependent": false,
      "color": "#BB68DE"
    }
  ],
  "4-AcO-MiPT": [
    {
      "name": "4-HO-MiPT",
      "directUse": "rc",
      "formationEnzyme": "BChE",
      "conversionFraction": 0.9,
      "potencyRelative": 1,
      "halfLifeHours": 2.8,
      "peakDelayHours": 0.5,
      "tailWeight": 0.14,
      "renalDependent": false,
      "color": "#6B27EC"
    }
  ],
  "5-MeO-DMT": [
    {
      "name": "Bufotenin",
      "directUse": "rc",
      "formationEnzyme": "CYP2D6",
      "conversionFraction": 0.08,
      "potencyRelative": 0.65,
      "halfLifeHours": 1.5,
      "peakDelayHours": 0.3,
      "tailWeight": 0.08,
      "renalDependent": false,
      "color": "#CC0CE9"
    }
  ],
  "Adrafinil": [
    {
      "name": "Modafinil",
      "directUse": "medication",
      "formationEnzyme": "CES1",
      "conversionFraction": 0.8,
      "potencyRelative": 1,
      "halfLifeHours": 13.5,
      "peakDelayHours": 2,
      "tailWeight": 0.22,
      "renalDependent": false,
      "color": "#F4B39A"
    }
  ],
  "ALD-52": [
    {
      "name": "LSD",
      "directUse": "rc",
      "formationEnzyme": "RBC_PEPTIDASE",
      "conversionFraction": 0.95,
      "potencyRelative": 1,
      "halfLifeHours": 3.6,
      "peakDelayHours": 0.7,
      "tailWeight": 0.12,
      "renalDependent": false,
      "color": "#9327EC"
    }
  ],
  "Amitriptyline": [
    {
      "name": "Nortriptyline",
      "directUse": "medication",
      "formationEnzyme": "CYP2C19",
      "secondaryFormationEnzyme": "CYP3A4",
      "conversionFraction": 0.55,
      "potencyRelative": 0.9,
      "halfLifeHours": 28,
      "peakDelayHours": 5,
      "tailWeight": 0.24,
      "renalDependent": false,
      "color": "#97EF8A"
    }
  ],
  "Buprenorphine": [
    {
      "name": "Norbuprenorphine",
      "directUse": "endogenous_only",
      "formationEnzyme": "CYP3A4",
      "secondaryFormationEnzyme": "CYP2C8",
      "conversionFraction": 0.45,
      "potencyRelative": 0.35,
      "halfLifeHours": 40,
      "peakDelayHours": 4,
      "tailWeight": 0.2,
      "renalDependent": false,
      "specificInteractions": {
        "residualWindowHours": 96,
        "alertClasses": [
          "Benzodiazepines",
          "Alcohol",
          "Opioids"
        ],
        "noteFr": "La Buprénorphine et son métabolite agoniste plein Norbuprénorphine (t½ ~40h) persistent 72h à 96h : toute prise de benzodiazépine ou d'alcool durant cette fenêtre expose à une dépression respiratoire synergique.",
        "noteEn": "Buprenorphine and its full-agonist metabolite Norbuprenorphine (t½ ~40h) persist for 72-96h: co-ingestion of benzodiazepines or alcohol during this window carries a synergistic respiratory depression risk."
      },
      "color": "#F99939"
    }
  ],
  "Bupropion": [
    {
      "name": "Hydroxybupropion",
      "directUse": "endogenous_only",
      "formationEnzyme": "CYP2B6",
      "conversionFraction": 0.7,
      "potencyRelative": 0.65,
      "halfLifeHours": 24,
      "peakDelayHours": 4,
      "tailWeight": 0.28,
      "renalDependent": true,
      "specificInteractions": {
        "residualWindowHours": 72,
        "alertClasses": [
          "Tramadol",
          "Stimulants",
          "Codeine",
          "Dextromethorphan"
        ],
        "noteFr": "L'Hydroxybupropion (t½ ~24h) atteint une concentration 10x supérieure au Bupropion mère : il inhibe fortement le CYP2D6 et abaisse le seuil épileptogène pendant 48 à 72h.",
        "noteEn": "Hydroxybupropion (t½ ~24h) reaches 10x higher plasma levels than parent Bupropion: it strongly inhibits CYP2D6 and lowers the seizure threshold for 48 to 72h."
      },
      "color": "#FC8F5F"
    }
  ],
  "Caffeine": [
    {
      "name": "Paraxanthine",
      "directUse": "rc",
      "formationEnzyme": "CYP1A2",
      "conversionFraction": 0.84,
      "potencyRelative": 1,
      "halfLifeHours": 4.5,
      "peakDelayHours": 3,
      "tailWeight": 0.2,
      "renalDependent": false,
      "color": "#F4A79A"
    }
  ],
  "Cannabis": [
    {
      "name": "11-OH-THC",
      "directUse": "endogenous_only",
      "formationEnzyme": "CYP2C9",
      "secondaryFormationEnzyme": "CYP3A4",
      "conversionFraction": 0.35,
      "potencyRelative": 1.6,
      "halfLifeHours": 5.5,
      "peakDelayHours": 1.5,
      "tailWeight": 0.18,
      "renalDependent": false,
      "color": "#39F946"
    }
  ],
  "Carbamazepine": [
    {
      "name": "Carbamazepine-10,11-epoxide",
      "directUse": "endogenous_only",
      "formationEnzyme": "CYP3A4",
      "conversionFraction": 0.22,
      "potencyRelative": 1,
      "halfLifeHours": 9,
      "peakDelayHours": 4,
      "tailWeight": 0.16,
      "renalDependent": true,
      "specificInteractions": {
        "residualWindowHours": 36,
        "alertClasses": [
          "Valproate"
        ],
        "noteFr": "INTERACTION ÉPOXYDE : Le Valproate (Dépakine) bloque l'époxyde hydrolase et double la concentration du métabolite actif Carbamazépine-10,11-époxyde (risque d'ataxie, diplopie et neurotoxicité même si le dosage sanguin de Carbamazépine mère semble normal).",
        "noteEn": "EPOXIDE INTERACTION: Valproate blocks epoxide hydrolase and doubles active Carbamazepine-10,11-epoxide levels (causing ataxia, diplopia and neurotoxicity even when parent Carbamazepine blood levels appear normal)."
      },
      "color": "#A08AEF"
    }
  ],
  "Carisoprodol": [
    {
      "name": "Meprobamate",
      "directUse": "medication",
      "formationEnzyme": "CYP2C19",
      "conversionFraction": 0.8,
      "potencyRelative": 0.85,
      "halfLifeHours": 10.5,
      "peakDelayHours": 2.5,
      "tailWeight": 0.25,
      "renalDependent": false,
      "specificInteractions": {
        "residualWindowHours": 36,
        "alertClasses": [
          "Opioids",
          "Benzodiazepines",
          "Alcohol"
        ],
        "noteFr": "Le Carisoprodol est converti à ~80% en Méprobamate (Equanil, t½ ~10.5h), un modulateur GABA-A de type barbiturique qui prolonge fortement le risque de coma et de dépression respiratoire avec les opioïdes, benzodiazépines et l'alcool.",
        "noteEn": "Carisoprodol is ~80% converted into Meprobamate (t½ ~10.5h), a barbiturate-like GABA-A modulator that markedly extends coma and respiratory depression risk with opioids, benzodiazepines and alcohol."
      },
      "color": "#6884DE"
    }
  ],
  "Chlordiazepoxide": [
    {
      "name": "Nordiazepam",
      "directUse": "medication",
      "formationEnzyme": "CYP3A4",
      "secondaryFormationEnzyme": "CYP2C19",
      "conversionFraction": 0.45,
      "potencyRelative": 0.8,
      "halfLifeHours": 65,
      "peakDelayHours": 6,
      "tailWeight": 0.25,
      "renalDependent": false,
      "color": "#68A7DE"
    },
    {
      "name": "Oxazepam",
      "directUse": "medication",
      "isSubMetabolite": true,
      "precursorMetabolites": [
        "Nordiazepam"
      ],
      "formationEnzyme": "CYP3A4",
      "conversionFraction": 0.2,
      "potencyRelative": 0.5,
      "halfLifeHours": 8,
      "peakDelayHours": 10,
      "tailWeight": 0.12,
      "renalDependent": false,
      "color": "#27D6EC"
    }
  ],
  "Clobazam": [
    {
      "name": "Norclobazam",
      "directUse": "endogenous_only",
      "formationEnzyme": "CYP3A4",
      "secondaryFormationEnzyme": "CYP2C19",
      "conversionFraction": 0.7,
      "potencyRelative": 0.5,
      "halfLifeHours": 75,
      "peakDelayHours": 8,
      "tailWeight": 0.24,
      "renalDependent": false,
      "specificInteractions": {
        "residualWindowHours": 144,
        "alertClasses": [
          "Opioids",
          "Alcohol",
          "Cannabidiol"
        ],
        "noteFr": "Le Norclobazam actif (t½ ~75h) s'accumule fortement (jusqu'à 5x le taux du Clobazam) et est éliminé par le CYP2C19 (le Cannabidiol ou un profil métaboliseur lent CYP2C19 triple sa concentration).",
        "noteEn": "Active Norclobazam (t½ ~75h) strongly accumulates (up to 5x parent Clobazam levels) and is cleared via CYP2C19 (Cannabidiol or CYP2C19 poor metabolizer status triples its levels)."
      },
      "color": "#5F7AFC"
    }
  ],
  "Clomipramine": [
    {
      "name": "Desmethylclomipramine",
      "directUse": "endogenous_only",
      "formationEnzyme": "CYP2C19",
      "secondaryFormationEnzyme": "CYP1A2",
      "conversionFraction": 0.6,
      "potencyRelative": 0.85,
      "halfLifeHours": 36,
      "peakDelayHours": 6,
      "tailWeight": 0.25,
      "renalDependent": false,
      "color": "#57F939"
    }
  ],
  "Clorazepate": [
    {
      "name": "Nordiazepam",
      "directUse": "medication",
      "formationEnzyme": "RBC_PEPTIDASE",
      "conversionFraction": 0.95,
      "potencyRelative": 1,
      "halfLifeHours": 65,
      "peakDelayHours": 1.5,
      "tailWeight": 0.28,
      "renalDependent": false,
      "color": "#68A7DE",
      "specificInteractions": {
        "residualWindowHours": 120,
        "alertClasses": [
          "Opioids",
          "Alcohol",
          "Depressants"
        ],
        "noteFr": "Le Clorazépate (Tranxène) est intégralement converti en Nordiazépam actif (t½ ~65h) qui s'accumule dans le sang sur 3 à 5 jours.",
        "noteEn": "Clorazepate is completely converted into active Nordiazepam (t½ ~65h), which accumulates in blood over 3 to 5 days."
      }
    },
    {
      "name": "Oxazepam",
      "directUse": "medication",
      "isSubMetabolite": true,
      "precursorMetabolites": [
        "Nordiazepam"
      ],
      "formationEnzyme": "CYP3A4",
      "conversionFraction": 0.22,
      "potencyRelative": 0.55,
      "halfLifeHours": 8,
      "peakDelayHours": 8,
      "tailWeight": 0.13,
      "renalDependent": false,
      "color": "#27D6EC"
    }
  ],
  "Codeine": [
    {
      "name": "Morphine",
      "directUse": "medication",
      "formationEnzyme": "CYP2D6",
      "conversionFraction": 0.1,
      "potencyRelative": 8.5,
      "halfLifeHours": 2.5,
      "peakDelayHours": 1,
      "tailWeight": 0.2,
      "renalDependent": true,
      "color": "#E9B80C"
    },
    {
      "name": "Morphine-6-glucuronide",
      "directUse": "endogenous_only",
      "isSubMetabolite": true,
      "precursorMetabolites": [
        "Morphine"
      ],
      "formationEnzyme": "UGT2B7",
      "conversionFraction": 0.015,
      "potencyRelative": 12,
      "halfLifeHours": 3.2,
      "peakDelayHours": 2.5,
      "tailWeight": 0.13,
      "renalDependent": true,
      "color": "#DEAC68"
    }
  ],
  "Delorazepam": [
    {
      "name": "Lorazepam",
      "directUse": "medication",
      "formationEnzyme": "CYP3A4",
      "conversionFraction": 0.3,
      "potencyRelative": 1,
      "halfLifeHours": 12,
      "peakDelayHours": 6,
      "tailWeight": 0.18,
      "renalDependent": false,
      "color": "#5FE2FC"
    }
  ],
  "Dextromethorphan": [
    {
      "name": "Dextrorphan",
      "directUse": "rc",
      "formationEnzyme": "CYP2D6",
      "conversionFraction": 0.8,
      "potencyRelative": 1.25,
      "halfLifeHours": 4,
      "peakDelayHours": 1.8,
      "tailWeight": 0.2,
      "renalDependent": true,
      "color": "#5FE2FC"
    }
  ],
  "Diazepam": [
    {
      "name": "Nordiazepam",
      "directUse": "medication",
      "formationEnzyme": "CYP2C19",
      "secondaryFormationEnzyme": "CYP3A4",
      "conversionFraction": 0.55,
      "potencyRelative": 0.65,
      "halfLifeHours": 65,
      "peakDelayHours": 6,
      "tailWeight": 0.28,
      "renalDependent": false,
      "color": "#68A7DE",
      "specificInteractions": {
        "residualWindowHours": 120,
        "alertClasses": [
          "Opioids",
          "Alcohol",
          "Depressants"
        ],
        "noteFr": "Présence résiduelle de Nordiazépam (t½ ~65h), Témazépam (t½ ~10h) et Oxazépam (t½ ~8h) issus du Diazépam : même après disparition du ressenti anxiolytique aigu (6h), l'imprégnation GABA-A persiste plusieurs jours et majore le risque de dépression respiratoire avec les opioïdes ou l'alcool.",
        "noteEn": "Residual active Nordiazepam (t½ ~65h), Temazepam (t½ ~10h) and Oxazepam (t½ ~8h) from Diazepam: even after the 6h subjective anxiolytic effect fades, GABA-A occupancy persists for days and potentiates respiratory depression with opioids or alcohol."
      }
    },
    {
      "name": "Temazepam",
      "directUse": "medication",
      "formationEnzyme": "CYP3A4",
      "conversionFraction": 0.15,
      "potencyRelative": 0.75,
      "halfLifeHours": 10,
      "peakDelayHours": 3.5,
      "tailWeight": 0.14,
      "renalDependent": false,
      "color": "#5FA5FC"
    },
    {
      "name": "Oxazepam",
      "directUse": "medication",
      "isSubMetabolite": true,
      "precursorMetabolites": [
        "Nordiazepam",
        "Temazepam"
      ],
      "formationEnzyme": "CYP3A4",
      "conversionFraction": 0.22,
      "potencyRelative": 0.5,
      "halfLifeHours": 8,
      "peakDelayHours": 8,
      "tailWeight": 0.14,
      "renalDependent": false,
      "color": "#27D6EC"
    }
  ],
  "Diclazepam": [
    {
      "name": "Delorazepam",
      "directUse": "rc",
      "formationEnzyme": "CYP2C19",
      "secondaryFormationEnzyme": "CYP3A4",
      "conversionFraction": 0.45,
      "potencyRelative": 0.9,
      "halfLifeHours": 78,
      "peakDelayHours": 6,
      "tailWeight": 0.28,
      "renalDependent": false,
      "color": "#8AE2EF",
      "specificInteractions": {
        "residualWindowHours": 144,
        "alertClasses": [
          "Opioids",
          "Alcohol",
          "Depressants"
        ],
        "noteFr": "Le Diclazépam génère du Délorazépam (t½ ~78h), du Lormétazépam et du Lorazépam actifs : l'imprégnation sédative et le risque de dépression respiratoire persistent 4 à 6 jours.",
        "noteEn": "Diclazepam forms active Delorazepam (t½ ~78h), Lormetazepam and Lorazepam: sedative occupancy and respiratory depression risk persist for 4 to 6 days."
      }
    },
    {
      "name": "Lormetazepam",
      "directUse": "medication",
      "formationEnzyme": "CYP3A4",
      "conversionFraction": 0.3,
      "potencyRelative": 1.1,
      "halfLifeHours": 10.5,
      "peakDelayHours": 3.5,
      "tailWeight": 0.18,
      "renalDependent": false,
      "color": "#6887DE"
    },
    {
      "name": "Lorazepam",
      "directUse": "medication",
      "isSubMetabolite": true,
      "precursorMetabolites": [
        "Delorazepam",
        "Lormetazepam"
      ],
      "formationEnzyme": "CYP3A4",
      "conversionFraction": 0.2,
      "potencyRelative": 1,
      "halfLifeHours": 12,
      "peakDelayHours": 8,
      "tailWeight": 0.15,
      "renalDependent": false,
      "color": "#5FE2FC"
    }
  ],
  "Dihydrocodeine": [
    {
      "name": "Morphine",
      "directUse": "medication",
      "formationEnzyme": "CYP2D6",
      "conversionFraction": 0.1,
      "potencyRelative": 4.5,
      "halfLifeHours": 2.5,
      "peakDelayHours": 1.2,
      "tailWeight": 0.16,
      "renalDependent": true,
      "color": "#E9B80C"
    },
    {
      "name": "Morphine-6-glucuronide",
      "directUse": "endogenous_only",
      "isSubMetabolite": true,
      "precursorMetabolites": [
        "Morphine"
      ],
      "formationEnzyme": "UGT2B7",
      "conversionFraction": 0.015,
      "potencyRelative": 7.5,
      "halfLifeHours": 3.2,
      "peakDelayHours": 2.5,
      "tailWeight": 0.11,
      "renalDependent": true,
      "color": "#DEAC68"
    }
  ],
  "Ethylmorphine": [
    {
      "name": "Morphine",
      "directUse": "medication",
      "formationEnzyme": "CYP2D6",
      "conversionFraction": 0.18,
      "potencyRelative": 4,
      "halfLifeHours": 2.5,
      "peakDelayHours": 1.2,
      "tailWeight": 0.19,
      "renalDependent": true,
      "color": "#E9B80C"
    },
    {
      "name": "Morphine-6-glucuronide",
      "directUse": "endogenous_only",
      "isSubMetabolite": true,
      "precursorMetabolites": [
        "Morphine"
      ],
      "formationEnzyme": "UGT2B7",
      "conversionFraction": 0.02,
      "potencyRelative": 6.5,
      "halfLifeHours": 3.2,
      "peakDelayHours": 2.6,
      "tailWeight": 0.12,
      "renalDependent": true,
      "color": "#DEAC68"
    }
  ],
  "Etizolam": [
    {
      "name": "Alpha-Hydroxyetizolam",
      "directUse": "endogenous_only",
      "formationEnzyme": "CYP2C19",
      "secondaryFormationEnzyme": "CYP3A4",
      "conversionFraction": 0.55,
      "potencyRelative": 0.6,
      "halfLifeHours": 8.2,
      "peakDelayHours": 3,
      "tailWeight": 0.16,
      "renalDependent": false,
      "color": "#0CA2E9"
    }
  ],
  "Fenethylline": [
    {
      "name": "Amphetamine",
      "directUse": "medication",
      "formationEnzyme": "CYP2D6",
      "secondaryFormationEnzyme": "CYP3A4",
      "conversionFraction": 0.28,
      "potencyRelative": 1.65,
      "halfLifeHours": 10,
      "peakDelayHours": 1.8,
      "tailWeight": 0.24,
      "renalDependent": true,
      "color": "#E9430C"
    },
    {
      "name": "Paraxanthine",
      "directUse": "rc",
      "isSubMetabolite": true,
      "precursorMetabolites": [
        "Theophylline"
      ],
      "formationEnzyme": "CYP1A2",
      "conversionFraction": 0.2,
      "potencyRelative": 0.45,
      "halfLifeHours": 4.5,
      "peakDelayHours": 3.5,
      "tailWeight": 0.14,
      "renalDependent": false,
      "color": "#F4A79A"
    }
  ],
  "Fluoxetine": [
    {
      "name": "Norfluoxetine",
      "directUse": "endogenous_only",
      "formationEnzyme": "CYP2D6",
      "secondaryFormationEnzyme": "CYP2C9",
      "conversionFraction": 0.75,
      "potencyRelative": 1,
      "halfLifeHours": 216,
      "peakDelayHours": 12,
      "tailWeight": 0.3,
      "renalDependent": false,
      "specificInteractions": {
        "residualWindowHours": 336,
        "alertClasses": [
          "MAOI",
          "MDMA",
          "Tramadol",
          "Dextromethorphan",
          "Triptans",
          "Codeine"
        ],
        "noteFr": "PERSISTANCE PROLONGÉE (Norfluoxétine, t½ ~9 jours) : Même plusieurs jours ou semaines après l'arrêt de la Fluoxétine, la Norfluoxétine bloque puissamment SERT et le CYP2D6 (danger de syndrome sérotoninergique avec IMAO/MDMA/Tramadol/DXM et inefficacité de la Codéine).",
        "noteEn": "ULTRA-LONG WASHOUT (Norfluoxetine, t½ ~9 days): Even days or weeks after stopping Fluoxetine, Norfluoxetine potently blocks SERT and CYP2D6 (serotonin syndrome hazard with MAOIs/MDMA/Tramadol/DXM and loss of Codeine efficacy)."
      },
      "color": "#ADF939"
    }
  ],
  "GBL": [
    {
      "name": "GHB",
      "directUse": "rc",
      "formationEnzyme": "BChE",
      "conversionFraction": 0.95,
      "potencyRelative": 1,
      "halfLifeHours": 0.8,
      "peakDelayHours": 0.25,
      "tailWeight": 0.1,
      "renalDependent": false,
      "color": "#A89AF4"
    }
  ],
  "Heroin": [
    {
      "name": "Morphine",
      "directUse": "medication",
      "formationEnzyme": "BChE",
      "secondaryFormationEnzyme": "CES1",
      "conversionFraction": 0.9,
      "potencyRelative": 0.85,
      "halfLifeHours": 2.5,
      "peakDelayHours": 0.5,
      "tailWeight": 0.24,
      "renalDependent": true,
      "color": "#E9B80C"
    },
    {
      "name": "Morphine-6-glucuronide",
      "directUse": "endogenous_only",
      "isSubMetabolite": true,
      "precursorMetabolites": [
        "Morphine"
      ],
      "formationEnzyme": "UGT2B7",
      "conversionFraction": 0.12,
      "potencyRelative": 1.5,
      "halfLifeHours": 3.2,
      "peakDelayHours": 2,
      "tailWeight": 0.17,
      "renalDependent": true,
      "color": "#DEAC68"
    }
  ],
  "Hydrocodone": [
    {
      "name": "Hydromorphone",
      "directUse": "medication",
      "formationEnzyme": "CYP2D6",
      "conversionFraction": 0.12,
      "potencyRelative": 4,
      "halfLifeHours": 2.6,
      "peakDelayHours": 1.2,
      "tailWeight": 0.15,
      "renalDependent": false,
      "color": "#F4E79A"
    }
  ],
  "Hydroxyzine": [
    {
      "name": "Cetirizine",
      "directUse": "medication",
      "formationEnzyme": "ADH_ALDH2",
      "conversionFraction": 0.55,
      "potencyRelative": 0.65,
      "halfLifeHours": 8.3,
      "peakDelayHours": 3,
      "tailWeight": 0.18,
      "renalDependent": true,
      "color": "#39E6F9"
    }
  ],
  "Ibogaine": [
    {
      "name": "Noribogaine",
      "directUse": "endogenous_only",
      "formationEnzyme": "CYP2D6",
      "conversionFraction": 0.85,
      "potencyRelative": 0.6,
      "halfLifeHours": 36,
      "peakDelayHours": 6,
      "tailWeight": 0.28,
      "renalDependent": false,
      "specificInteractions": {
        "residualWindowHours": 120,
        "alertClasses": [
          "Opioids",
          "SSRIs",
          "SNRIs",
          "MAOI",
          "Stimulants"
        ],
        "noteFr": "La Noribogaïne active (t½ ~36h) persiste 4 à 7 jours après l'Ibogaïne : elle prolonge l'intervalle QT cardiaque, inhibe la recapture de la sérotonine et resensibilise les récepteurs opioïdes (risque de surdosage mortel aux doses habituelles d'opioïdes).",
        "noteEn": "Active Noribogaine (t½ ~36h) persists for 4-7 days after Ibogaine: it prolongs cardiac QT interval, inhibits serotonin reuptake and resets opioid tolerance (fatal overdose risk at previous opioid doses)."
      },
      "color": "#5FF2FC"
    }
  ],
  "Imipramine": [
    {
      "name": "Desipramine",
      "directUse": "medication",
      "formationEnzyme": "CYP2C19",
      "secondaryFormationEnzyme": "CYP1A2",
      "conversionFraction": 0.65,
      "potencyRelative": 0.95,
      "halfLifeHours": 22,
      "peakDelayHours": 4.5,
      "tailWeight": 0.25,
      "renalDependent": false,
      "color": "#D3F49A"
    }
  ],
  "Ketamine": [
    {
      "name": "Norketamine",
      "directUse": "rc",
      "formationEnzyme": "CYP2B6",
      "secondaryFormationEnzyme": "CYP3A4",
      "conversionFraction": 0.65,
      "potencyRelative": 0.33,
      "halfLifeHours": 5,
      "peakDelayHours": 1.2,
      "tailWeight": 0.18,
      "renalDependent": false,
      "color": "#68B0DE"
    }
  ],
  "Kratom": [
    {
      "name": "7-Hydroxymitragynine",
      "directUse": "rc",
      "formationEnzyme": "CYP3A4",
      "conversionFraction": 0.12,
      "potencyRelative": 4.5,
      "halfLifeHours": 3.5,
      "peakDelayHours": 1.2,
      "tailWeight": 0.18,
      "renalDependent": false,
      "color": "#F98C39"
    }
  ],
  "Lisdexamfetamine": [
    {
      "name": "Dextroamphetamine",
      "directUse": "medication",
      "formationEnzyme": "RBC_PEPTIDASE",
      "conversionFraction": 0.95,
      "potencyRelative": 1,
      "halfLifeHours": 10.5,
      "peakDelayHours": 2.5,
      "tailWeight": 0.18,
      "renalDependent": true,
      "color": "#F97A39"
    }
  ],
  "Lormetazepam": [
    {
      "name": "Lorazepam",
      "directUse": "medication",
      "formationEnzyme": "CYP3A4",
      "conversionFraction": 0.12,
      "potencyRelative": 0.9,
      "halfLifeHours": 12,
      "peakDelayHours": 4.5,
      "tailWeight": 0.12,
      "renalDependent": false,
      "color": "#5FE2FC"
    }
  ],
  "Loxapine": [
    {
      "name": "Amoxapine",
      "directUse": "medication",
      "formationEnzyme": "CYP3A4",
      "secondaryFormationEnzyme": "CYP1A2",
      "conversionFraction": 0.25,
      "potencyRelative": 0.75,
      "halfLifeHours": 9,
      "peakDelayHours": 3,
      "tailWeight": 0.15,
      "renalDependent": false,
      "color": "#7FE90C"
    }
  ],
  "MDEA": [
    {
      "name": "MDA",
      "directUse": "rc",
      "formationEnzyme": "CYP3A4",
      "secondaryFormationEnzyme": "CYP2B6",
      "conversionFraction": 0.08,
      "potencyRelative": 1.25,
      "halfLifeHours": 10.5,
      "peakDelayHours": 3,
      "tailWeight": 0.11,
      "renalDependent": true,
      "color": "#E90C79"
    }
  ],
  "MDMA": [
    {
      "name": "MDA",
      "directUse": "rc",
      "formationEnzyme": "CYP2B6",
      "secondaryFormationEnzyme": "CYP3A4",
      "conversionFraction": 0.09,
      "potencyRelative": 1.2,
      "halfLifeHours": 10.5,
      "peakDelayHours": 3.5,
      "tailWeight": 0.12,
      "renalDependent": true,
      "color": "#E90C79"
    }
  ],
  "Methamphetamine": [
    {
      "name": "Amphetamine",
      "directUse": "medication",
      "formationEnzyme": "CYP2D6",
      "conversionFraction": 0.18,
      "potencyRelative": 0.65,
      "halfLifeHours": 10,
      "peakDelayHours": 4,
      "tailWeight": 0.13,
      "renalDependent": true,
      "color": "#E9430C"
    }
  ],
  "Methcathinone": [
    {
      "name": "Ephedrine",
      "directUse": "medication",
      "formationEnzyme": "ADH_ALDH2",
      "conversionFraction": 0.2,
      "potencyRelative": 0.35,
      "halfLifeHours": 6,
      "peakDelayHours": 2,
      "tailWeight": 0.1,
      "renalDependent": true,
      "color": "#DE8868"
    }
  ],
  "Midazolam": [
    {
      "name": "1-Hydroxymidazolam",
      "directUse": "endogenous_only",
      "formationEnzyme": "CYP3A4",
      "conversionFraction": 0.75,
      "potencyRelative": 0.65,
      "halfLifeHours": 2,
      "peakDelayHours": 0.8,
      "tailWeight": 0.15,
      "renalDependent": true,
      "color": "#39E6F9"
    }
  ],
  "Morphine": [
    {
      "name": "Morphine-6-glucuronide",
      "directUse": "endogenous_only",
      "formationEnzyme": "UGT2B7",
      "conversionFraction": 0.12,
      "potencyRelative": 1.75,
      "halfLifeHours": 3.2,
      "peakDelayHours": 2,
      "tailWeight": 0.18,
      "renalDependent": true,
      "specificInteractions": {
        "residualWindowHours": 24,
        "renalAmplification": true,
        "alertClasses": [
          "Benzodiazepines",
          "Alcohol",
          "Depressants"
        ],
        "noteFr": "La Morphine génère de la Morphine-6-glucuronide (M6G, 1.5 à 2x plus puissante), éliminée exclusivement par les reins : en cas de prises répétées ou de DFG réduit, la M6G s'accumule et prolonge le risque de dépression respiratoire.",
        "noteEn": "Morphine forms Morphine-6-glucuronide (M6G, 1.5-2x more potent), cleared exclusively by the kidneys: with repeated dosing or reduced eGFR, M6G accumulates and prolongs respiratory depression risk."
      },
      "color": "#DEAC68"
    }
  ],
  "Nordiazepam": [
    {
      "name": "Oxazepam",
      "directUse": "medication",
      "formationEnzyme": "CYP3A4",
      "conversionFraction": 0.25,
      "potencyRelative": 0.75,
      "halfLifeHours": 8,
      "peakDelayHours": 6,
      "tailWeight": 0.15,
      "renalDependent": false,
      "color": "#27D6EC"
    }
  ],
  "Opium": [
    {
      "name": "Morphine",
      "directUse": "medication",
      "formationEnzyme": "CYP2D6",
      "conversionFraction": 0.75,
      "potencyRelative": 1,
      "halfLifeHours": 2.5,
      "peakDelayHours": 1,
      "tailWeight": 0.22,
      "renalDependent": true,
      "color": "#E9B80C"
    },
    {
      "name": "Morphine-6-glucuronide",
      "directUse": "endogenous_only",
      "isSubMetabolite": true,
      "precursorMetabolites": [
        "Morphine"
      ],
      "formationEnzyme": "UGT2B7",
      "conversionFraction": 0.1,
      "potencyRelative": 1.75,
      "halfLifeHours": 3.2,
      "peakDelayHours": 2.5,
      "tailWeight": 0.16,
      "renalDependent": true,
      "color": "#DEAC68"
    }
  ],
  "Oxcarbazepine": [
    {
      "name": "Eslicarbazepine",
      "directUse": "medication",
      "formationEnzyme": "RBC_PEPTIDASE",
      "conversionFraction": 0.95,
      "potencyRelative": 1,
      "halfLifeHours": 10.5,
      "peakDelayHours": 2,
      "tailWeight": 0.25,
      "renalDependent": true,
      "color": "#0C0CE9"
    }
  ],
  "Oxycodone": [
    {
      "name": "Oxymorphone",
      "directUse": "medication",
      "formationEnzyme": "CYP2D6",
      "conversionFraction": 0.11,
      "potencyRelative": 2.25,
      "halfLifeHours": 7.5,
      "peakDelayHours": 1.5,
      "tailWeight": 0.16,
      "renalDependent": false,
      "color": "#F9E139"
    }
  ],
  "Pethidine": [
    {
      "name": "Norpethidine",
      "directUse": "endogenous_only",
      "formationEnzyme": "CYP2B6",
      "secondaryFormationEnzyme": "CYP3A4",
      "conversionFraction": 0.45,
      "potencyRelative": 0.5,
      "halfLifeHours": 18,
      "peakDelayHours": 3,
      "tailWeight": 0.22,
      "renalDependent": true,
      "specificInteractions": {
        "residualWindowHours": 48,
        "alertClasses": [
          "MAOI",
          "SSRIs",
          "SNRIs",
          "Stimulants",
          "Tramadol"
        ],
        "noteFr": "DANGER NEUROTOXIQUE : La Péthidine génère de la Norpéthidine (t½ ~18h, éliminée par les reins), un métabolite pro-convulsivant et sérotoninergique qui s'accumule sur 24-48h.",
        "noteEn": "NEUROTOXIC HAZARD: Pethidine forms Norpethidine (t½ ~18h, renally cleared), a pro-convulsant and serotonergic metabolite that accumulates over 24-48h."
      },
      "color": "#EFDE8A"
    }
  ],
  "Phenazepam": [
    {
      "name": "3-Hydroxyphenazepam",
      "directUse": "rc",
      "formationEnzyme": "CYP3A4",
      "conversionFraction": 0.3,
      "potencyRelative": 0.75,
      "halfLifeHours": 26,
      "peakDelayHours": 6,
      "tailWeight": 0.22,
      "renalDependent": false,
      "color": "#8AABEF"
    }
  ],
  "Prazepam": [
    {
      "name": "Nordiazepam",
      "directUse": "medication",
      "formationEnzyme": "CYP3A4",
      "secondaryFormationEnzyme": "CYP2C19",
      "conversionFraction": 0.9,
      "potencyRelative": 1,
      "halfLifeHours": 65,
      "peakDelayHours": 3,
      "tailWeight": 0.28,
      "renalDependent": false,
      "color": "#68A7DE",
      "specificInteractions": {
        "residualWindowHours": 120,
        "alertClasses": [
          "Opioids",
          "Alcohol",
          "Depressants"
        ],
        "noteFr": "Le Prazépam (Lysanxia) est une prodrogue du Nordiazépam (t½ ~65h) : son imprégnation dépressive respiratoire persiste plusieurs jours après la dernière prise.",
        "noteEn": "Prazepam is a prodrug of Nordiazepam (t½ ~65h): its respiratory depressant footprint persists for several days after the last dose."
      }
    },
    {
      "name": "Oxazepam",
      "directUse": "medication",
      "isSubMetabolite": true,
      "precursorMetabolites": [
        "Nordiazepam"
      ],
      "formationEnzyme": "CYP3A4",
      "conversionFraction": 0.2,
      "potencyRelative": 0.55,
      "halfLifeHours": 8,
      "peakDelayHours": 9,
      "tailWeight": 0.13,
      "renalDependent": false,
      "color": "#27D6EC"
    }
  ],
  "Psilocybin mushrooms": [
    {
      "name": "Psilocin",
      "directUse": "rc",
      "formationEnzyme": "BChE",
      "conversionFraction": 0.95,
      "potencyRelative": 1,
      "halfLifeHours": 2.8,
      "peakDelayHours": 0.5,
      "tailWeight": 0.12,
      "renalDependent": false,
      "color": "#EF8AC7"
    }
  ],
  "Risperidone": [
    {
      "name": "Paliperidone",
      "directUse": "medication",
      "formationEnzyme": "CYP2D6",
      "secondaryFormationEnzyme": "CYP3A4",
      "conversionFraction": 0.7,
      "potencyRelative": 1,
      "halfLifeHours": 23,
      "peakDelayHours": 4,
      "tailWeight": 0.25,
      "renalDependent": true,
      "color": "#965FFC"
    }
  ],
  "Selegiline": [
    {
      "name": "Methamphetamine",
      "directUse": "rc",
      "formationEnzyme": "CYP2B6",
      "secondaryFormationEnzyme": "CYP2C19",
      "conversionFraction": 0.45,
      "potencyRelative": 0.28,
      "halfLifeHours": 10,
      "peakDelayHours": 2,
      "tailWeight": 0.14,
      "renalDependent": true,
      "color": "#EF908A"
    },
    {
      "name": "Amphetamine",
      "directUse": "medication",
      "isSubMetabolite": true,
      "precursorMetabolites": [
        "Methamphetamine"
      ],
      "formationEnzyme": "CYP2D6",
      "conversionFraction": 0.2,
      "potencyRelative": 0.42,
      "halfLifeHours": 10,
      "peakDelayHours": 4.5,
      "tailWeight": 0.12,
      "renalDependent": true,
      "color": "#E9430C"
    }
  ],
  "Temazepam": [
    {
      "name": "Oxazepam",
      "directUse": "medication",
      "formationEnzyme": "CYP3A4",
      "conversionFraction": 0.08,
      "potencyRelative": 0.7,
      "halfLifeHours": 8,
      "peakDelayHours": 4,
      "tailWeight": 0.11,
      "renalDependent": false,
      "color": "#27D6EC"
    }
  ],
  "Tianeptine": [
    {
      "name": "Tianeptine MC5",
      "directUse": "endogenous_only",
      "formationEnzyme": "CYP3A4",
      "conversionFraction": 0.45,
      "potencyRelative": 0.7,
      "halfLifeHours": 7.2,
      "peakDelayHours": 1.8,
      "tailWeight": 0.2,
      "renalDependent": true,
      "color": "#F4ED9A"
    }
  ],
  "Tilidin": [
    {
      "name": "Nortilidine",
      "directUse": "endogenous_only",
      "formationEnzyme": "CYP3A4",
      "secondaryFormationEnzyme": "CYP2C19",
      "conversionFraction": 0.85,
      "potencyRelative": 1,
      "halfLifeHours": 4.5,
      "peakDelayHours": 0.8,
      "tailWeight": 0.18,
      "renalDependent": true,
      "color": "#FCC15F"
    }
  ],
  "Tramadol": [
    {
      "name": "O-Desmethyltramadol",
      "directUse": "rc",
      "formationEnzyme": "CYP2D6",
      "conversionFraction": 0.28,
      "potencyRelative": 2.3,
      "halfLifeHours": 7.4,
      "peakDelayHours": 2,
      "tailWeight": 0.22,
      "renalDependent": true,
      "specificInteractions": {
        "residualWindowHours": 24,
        "alertClasses": [
          "Benzodiazepines",
          "Alcohol",
          "Opioids"
        ],
        "noteFr": "Le métabolite M1 (O-DSMT, t½ ~7.4h) formé par le CYP2D6 possède 200x plus d'affinité μ-opioïde que le Tramadol mère et prolonge la dépression respiratoire au-delà de l'effet sérotoninergique initial.",
        "noteEn": "The M1 metabolite (O-DSMT, t½ ~7.4h) formed by CYP2D6 has 200x higher μ-opioid affinity than parent Tramadol and extends respiratory depression beyond the initial serotonergic phase."
      },
      "color": "#DED968"
    }
  ],
  "Trazodone": [
    {
      "name": "MCPP",
      "directUse": "rc",
      "formationEnzyme": "CYP3A4",
      "conversionFraction": 0.12,
      "potencyRelative": 0.5,
      "halfLifeHours": 6,
      "peakDelayHours": 2.5,
      "tailWeight": 0.1,
      "renalDependent": false,
      "specificInteractions": {
        "residualWindowHours": 24,
        "alertClasses": [
          "SSRIs",
          "SNRIs",
          "MAOI",
          "MDMA"
        ],
        "noteFr": "La Trazodone est partiellement convertie par le CYP3A4 en mCPP (agoniste 5-HT2C éliminé par le CYP2D6) : sous inhibiteur du CYP2D6 (Fluoxétine, Paroxétine, Bupropion), le mCPP s'accumule et provoque anxiété, céphalées et surcharge sérotoninergique.",
        "noteEn": "Trazodone is partially converted via CYP3A4 into mCPP (5-HT2C agonist cleared by CYP2D6): with CYP2D6 inhibitors (Fluoxetine, Paroxetine, Bupropion), mCPP accumulates causing anxiety, migraines and serotonergic overload."
      },
      "color": "#F96739"
    }
  ],
  "Venlafaxine": [
    {
      "name": "Desvenlafaxine",
      "directUse": "medication",
      "formationEnzyme": "CYP2D6",
      "conversionFraction": 0.65,
      "potencyRelative": 1,
      "halfLifeHours": 11,
      "peakDelayHours": 3,
      "tailWeight": 0.25,
      "renalDependent": true,
      "color": "#B8EF8A"
    }
  ]
};

Object.entries(ACTIVE_METABOLITES_LINKS).forEach(([parentName, metabolites]) => {
  if (!SUBSTANCE_PK_DB[parentName]) {
    SUBSTANCE_PK_DB[parentName] = {
      verified: false,
      halfLifeHours: null,
      pathways: {},
      summaryFr: 'Cinétique enzymatique humaine de la molécule mère non établie scientifiquement dans la littérature clinique (aucune voie CYP/rénale inventée), mais sa conversion en métabolite actif est modélisée.',
      summaryEn: 'Human enzymatic clearance of the parent molecule is not scientifically established in clinical literature (no CYP/renal pathways invented), while its active metabolite conversion is modeled.'
    };
  }
  SUBSTANCE_PK_DB[parentName].activeMetabolites = metabolites;
});

const METABOLIC_PATHWAYS = SUBSTANCE_PK_DB;

const SUBSTANCE_PK_DB_LOWER = Object.fromEntries(
  Object.entries(SUBSTANCE_PK_DB).map(([k, v]) => [k.toLowerCase(), v])
);

const BACKGROUND_HABIT_ENZYME_MODS = {
  "Alcohol": {
    "nameFr": "Consommation d'Alcool associée",
    "nameEn": "Concurrent Alcohol intake",
    "inhibits": {
      "ADH_ALDH2": 0.75,
      "CES1": 0.55,
      "CYP2E1": 0.45
    },
    "noteFr": "Compétition enzymatique directe sur ADH/ALDH2 et la Carboxylestérase 1 (CES1 — Méthylphénidate, Cocaïne).",
    "noteEn": "Direct enzymatic competition on ADH/ALDH2 and Carboxylesterase 1 (CES1 — Methylphenidate, Cocaine)."
  },
  "Grapefruit": {
    "nameFr": "Jus de pamplemousse (Bergamottine)",
    "nameEn": "Grapefruit juice (Bergamottin)",
    "inhibits": {
      "CYP3A4": 1.15
    },
    "noteFr": "Inhibiteur suicide du CYP3A4 intestinal et hépatique : ralentit l'élimination de l'Oxycodone, l'Alprazolam, la Quétiapine, le Fentanyl, la Kétamine...",
    "noteEn": "Suicide inhibitor of CYP3A4: slows clearance of Oxycodone, Alprazolam, Quetiapine, Fentanyl, Ketamine..."
  },
  "NSAIDs": {
    "nameFr": "Prise régulière d'AINS (Anti-inflammatoires)",
    "nameEn": "Regular NSAID intake",
    "inhibits": {
      "RENAL_OAT": 0.65
    },
    "nephroDynamicEffect": "NSAID_GFR_REDUCTION",
    "noteFr": "Réduit la filtration rénale du Lithium (-35%) et entre en compétition sur les transporteurs tubulaires OAT1/OAT3.",
    "noteEn": "Reduces renal Lithium filtration (-35%) and competes at OAT1/OAT3 tubular transporters."
  },
  "SNRIs": {
    "nameFr": "Traitement de fond IRSNa (Duloxétine, Venlafaxine)",
    "nameEn": "Background SNRI therapy",
    "inhibits": {
      "CYP2D6": 0.45
    },
    "noteFr": "Inhibition modérée du CYP2D6.",
    "noteEn": "Moderate CYP2D6 inhibition."
  },
  "SSRIs": {
    "nameFr": "Traitement de fond ISRS (Fluoxétine, Paroxétine, Sertraline...)",
    "nameEn": "Background SSRI therapy",
    "inhibits": {
      "CYP2D6": 0.9,
      "CYP2C19": 0.45
    },
    "noteFr": "Inhibition forte du CYP2D6 et modérée du CYP2C19.",
    "noteEn": "Strong CYP2D6 inhibition and moderate CYP2C19 inhibition."
  }
};

const EMPTY_PK_PROFILE = Object.freeze({
  verified: false,
  pathways: {},
  inhibits: {},
  induces: {},
  prodrug: null,
  toleranceClass: null,
  halfLifeHours: null,
  summaryFr: 'Aucune substance sélectionnée.',
  summaryEn: 'No substance selected.'
});

const UNVERIFIED_PK_PROFILE = Object.freeze({
  verified: false,
  pathways: {},
  inhibits: {},
  induces: {},
  prodrug: null,
  toleranceClass: null,
  halfLifeHours: null,
  summaryFr: 'Cinétique enzymatique humaine non établie scientifiquement dans la littérature clinique (aucune enzyme ni fraction rénale inventée). Vous pouvez toutefois étalonner sa durée personnelle.',
  summaryEn: 'Human enzymatic kinetics not scientifically established in clinical literature (no enzymes or renal fractions invented). You can still calibrate its personal duration.'
});

function getSubstancePKProfile(substanceName) {
  if (!substanceName) return EMPTY_PK_PROFILE;
  return SUBSTANCE_PK_DB[substanceName] || SUBSTANCE_PK_DB_LOWER[substanceName.toLowerCase()] || UNVERIFIED_PK_PROFILE;
}
