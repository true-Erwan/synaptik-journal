# Notes de mise à jour — Synaptik Journal

Ce document récapitule, de manière simple et sans terme informatique, **tout ce qui a été ajouté ou amélioré par rapport à la version de base de l'application** (*PsychonautWiki Journal v11.17.2*).

---

## 1. Ouverture de l'application aux traitements psychoactifs et aux médicaments courants à horaires stricts (+90 nouvelles molécules)

L'application ne se limite plus aux substances récréatives : **90 médicaments** très utilisés au quotidien (en psychiatrie, neurologie, médecine générale et traitement de la douleur) ont été ajoutés avec leurs descriptions, leurs délais minimum à respecter entre deux prises, leurs plafonds sur 24 heures, leurs risques et leurs interactions.

Vous pouvez les rechercher aussi bien par le **nom de la molécule** (avec ou sans accents) que par leur **nom commercial en pharmacie** (*Doliprane, Advil, Profenid, Seroplex, Effexor, Tercian, Lysanxia, Atarax, Lamictal, Téralithe*, etc.).

### Comment ont été réglés les paliers de doses ?
Deux logiques distinctes ont été appliquées selon la nature du médicament :
- **Médicaments sans potentiel de détournement** (paracétamol, anti-inflammatoires, antimigraineux, antidépresseurs classiques, régulateurs de l'humeur, neuroleptiques non détournés, etc.) : le palier de dose le plus élevé (**Dose maximale / Heavy**) correspond exactement à la **dose maximale autorisée en une seule prise**. Dépasser ce seuil signale immédiatement une prise unitaire excessive.
- **Médicaments ayant un potentiel de détournement ou de mésusage** (certains antidouleurs comme l'opium ou le néfopam, anxiolytiques benzodiazépines, somnifères, correcteurs anticholinergiques, certains antihistaminiques sédatifs, bupropion, etc.) : les paliers de doses ont été **adaptés aux quantités réellement observées chez les personnes qui les détournent**, tout en rappelant clairement dans la fiche les doses médicales normales et les seuils de danger (convulsions, arrêt respiratoire, délire, surdosage au paracétamol associé).

---

### Détail des 90 nouvelles molécules ajoutées par famille

#### A. Antidouleurs, anti-inflammatoires (AINS), corticoïde, antispasmodique et décontractants musculaires (25 molécules)
Chaque fiche indique clairement le **temps d'attente obligatoire entre deux prises** et la **dose maximale sur 24 heures** :
- **Antidouleurs courants et antispasmodique (sans détournement — palier max = dose maximale par prise)** :
  - **Paracétamol** (*Doliprane, Dafalgan, Efferalgan*) — max **1 000 mg (1 g) par prise**, attendre **4 h à 6 h** minimum entre deux prises (max 3 g à 4 g par 24 h).
  - **Métamizole / Dipyrone** (*Novalgine, Nolotil*) — max **1 000 mg par prise**, attendre **6 h à 8 h**.
  - **Phloroglucinol** (*Spasfon, Spasfon Lyoc*) — max **160 mg par prise** (2 comprimés de 80 mg), attendre **2 h minimum** (max 6 comprimés par 24 h).
- **12 Anti-inflammatoires non stéroïdiens / AINS (sans détournement — palier max = dose maximale par prise, ne jamais cumuler deux AINS entre eux)** :
  - **Ibuprofène** (*Advil, Nurofen, Spedifen, Antarène*) — max **400 mg par prise**, attendre **6 h minimum**.
  - **Kétoprofène** (*Profenid, Ketum, Toprec*) — max **100 mg par prise**, attendre **6 h à 8 h**.
  - **Naproxène** (*Apranax, Antadys, Aleve*) — max **550 mg par prise**, attendre **8 h à 12 h**.
  - **Diclofénac** (*Voltarène, Flector*) — max **50 mg par prise**, attendre **6 h à 8 h**.
  - **Aspirine / Acide acétylsalicylique** (*Aspégic, Kardégic, Aspirine UPSA*) — max **1 000 mg par prise**, attendre **4 h minimum**.
  - **Célécoxib** (*Celebrex*) — max **200 mg par prise** (toutes les 12 h ou 1 fois/jour).
  - **Étoricoxib** (*Arcoxia*) — max **120 mg par prise** (1 seule prise toutes les 24 h).
  - **Méloxicam** (*Mobic*) — max **15 mg par prise** (1 seule prise toutes les 24 h).
  - **Piroxicam** (*Feldène, Brexin*) — max **20 mg par prise** (1 seule prise toutes les 24 h).
  - **Flurbiprofène** (*Antadys, Cebutid, Strefen*) — max **100 mg par prise**, attendre **6 h à 8 h**.
  - **Acide tiaprofénique** (*Surgam*) — max **200 mg par prise**, attendre **6 h à 8 h**.
  - **Acide méfénamique** (*Ponstyl*) — max **500 mg par prise**, attendre **6 h à 8 h**.
- **Corticoïde oral (sans détournement)** :
  - **Prednisolone** (*Solupred*) — max **80 mg par prise** (prise matinale recommandée).
- **Antidouleurs avec potentiel de détournement (paliers adaptés au mésusage)** :
  - **Néfopam** (*Acupan*) — paliers renseignés en injection intramusculaire et par voie orale (pratique fréquente de l'ampoule bue sur un sucre), avec alerte sur les risques de tachycardie, confusion et convulsions.
  - **Opium** (*Lamaline, Izalgi*) — paliers adaptés aux usages détournés en équivalent poudre d'opium, avec **alerte majeure sur la toxicité mortelle pour le foie du paracétamol** présent dans chaque gélule de *Lamaline* (300 mg) et d'*Izalgi* (500 mg).
- **Antimigraineux de la famille des Triptans (sans détournement — délai strict d'au moins 2 h avant une éventuelle 2e prise en cas de récidive)** :
  - **Sumatriptan** (*Imigrane* — comprimé max **100 mg** et stylo injectable sous-cutané max **6 mg**).
  - **Zolmitriptan** (*Zomig, Zomigoro* — max **5 mg par prise**).
  - **Rizatriptan** (*Maxalt* — max **10 mg par prise**).
- **Décontractants musculaires (sans détournement — palier max = dose unitaire maximale)** :
  - **Méthocarbamol** (*Lumirelax* — max **1 500 mg par prise**, toutes les 6 h à 8 h).
  - **Thiocolchicoside** (*Miorel, Coltramyl* — max **8 mg par prise**, **12 h strictes** entre deux prises en raison du risque convulsif).
  - **Tizanidine** (*Sirdalud* — max **12 mg par prise**, toutes les 6 h à 8 h).
  - **Cyclobenzaprine** (*Flexeril* — max **10 mg par prise**, toutes les 8 h).

#### B. Antidépresseurs (23 molécules)
- **ISRS (sans détournement — palier max = dose unitaire maximale, 1 prise/jour)** :
  - **Fluoxétine** (*Prozac* — max 60 mg), **Sertraline** (*Zoloft* — max 200 mg), **Escitalopram** (*Seroplex* — max 20 mg), **Citalopram** (*Seropram* — max 40 mg), **Paroxétine** (*Deroxat* — max 60 mg), **Fluvoxamine** (*Floxyfral* — max 150 mg par prise).
- **IRSNa (sans détournement — palier max = dose unitaire maximale)** :
  - **Venlafaxine** (*Effexor* — max 150 mg par prise), **Duloxétine** (*Cymbalta* — max 120 mg), **Milnacipran** (*Ixel* — max 100 mg par prise, matin et soir).
- **Tricycliques (sans détournement — utilisés aussi contre les douleurs neuropathiques)** :
  - **Amitriptyline** (*Laroxyl, Elavil* — max 100 mg), **Clomipramine** (*Anafranil* — max 100 mg), **Imipramine** (*Tofranil* — max 100 mg), **Nortriptyline** (*Pamelor* — max 75 mg), **Doxépine** (*Quitaxon* — max 100 mg).
- **IMAO (sans détournement — interactions alimentaires et médicamenteuses strictes détaillées)** :
  - **Moclobémide** (*Moclamine* — max 300 mg par prise), **Sélégiline** (*Déprényl* — max 10 mg), **Phénelzine** (*Nardil* — max 30 mg par prise), **Tranylcypromine** (*Parnate* — max 20 mg par prise).
- **Autres antidépresseurs** :
  - **Bupropion** (*Zyban, Wellbutrin* — **avec potentiel de détournement** : paliers adaptés à la voie orale et à la prise sniffée détournée, avec alerte sur le risque élevé de crise d'épilepsie).
  - **Trazodone** (*Desyrel* — max 150 mg), **Miansérine** (*Athymil* — max 60 mg), **Vortioxétine** (*Brintellix* — max 20 mg), **Agomélatine** (*Valdoxan* — max 50 mg).

#### C. Régulateurs de l'humeur et antiépileptiques (7 molécules — sans détournement, horaires réguliers stricts)
- **Lithium** (*Téralithe* — max **500 mg par prise** en forme standard, alerte vitale en cas de déshydratation ou de prise d'anti-inflammatoires).
- **Lamotrigine** (*Lamictal* — max **200 mg par prise**, alerte sur la montée progressive des doses et l'association avec la *Dépakine*).
- **Valproate / Divalproate / Valpromide** (*Dépakine, Dépakote, Dépamide* — max **1 000 mg par prise**).
- **Carbamazépine** (*Tégrétol* — max **400 mg par prise**).
- **Oxcarbazépine** (*Trileptal* — max **600 mg par prise**).
- **Topiramate** (*Epitomax* — max **200 mg par prise**).
- **Lévétiracétam** (*Keppra* — max **1 500 mg par prise**, toutes les 12 h).

#### D. Antipsychotiques / neuroleptiques et correcteurs (13 molécules)
- **Antipsychotiques sans usage détourné (palier max = dose maximale par prise)** :
  - **Olanzapine** (*Zyprexa* — max 20 mg), **Aripiprazole** (*Abilify* — max 30 mg), **Clozapine** (*Leponex* — max 300 mg par prise), **Loxapine** (*Loxapac* — max 100 mg par prise), **Lévomépromazine** (*Nozinan* — max 100 mg par prise), **Amisulpride** (*Solian* — max 400 mg par prise), **Palipéridone** (*Invega* — max 12 mg), **Chlorpromazine** (*Largactil* — max 100 mg par prise), **Tiapride** (*Tiapridal* — max 200 mg par prise).
- **Antipsychotique à potentiel de mésusage sédatif** :
  - **Cyamémazine** (*Tercian* — paliers adaptés de la petite dose anxiolytique jusqu'aux fortes doses détournées).
- **Correcteurs des effets secondaires des neuroleptiques (fort potentiel de détournement anticholinergique / hallucinogène)** :
  - **Trihexyphénidyle** (*Artane, Parkinane*), **Tropatépine** (*Lepticur*), **Bipéridène** (*Akineton*) — paliers adaptés aux usages détournés avec avertissement sur le syndrome confusionnel et cardiaque.

#### E. Anxiolytiques, benzodiazépines, somnifères, antihistaminiques et bêta-bloquant (14 molécules)
- **Benzodiazépines et somnifère apparenté (potentiel de détournement — paliers adaptés aux usages réels)** :
  - **Prazépam** (*Lysanxia*), **Clorazépate** (*Tranxène*), **Clobazam** (*Urbanyl*), **Loprazolam** (*Havlane*), **Lormétazépam** (*Noctamide*), **Nitrazépam** (*Mogadon*), **Estazolam** (*Nuctalon*), **Clotiazépam** (*Veratran*), **Zaleplon** (*Sonata* — voie orale et sniffée).
- **Antihistaminiques sédatifs détournables (paliers adaptés jusqu'aux surdoses délirantes)** :
  - **Doxylamine** (*Donormyl, Lidène*), **Alimémazine** (*Théralène*).
- **Anxiolytiques non benzodiazépines et bêta-bloquant du stress (sans détournement — palier max = dose unitaire maximale)** :
  - **Hydroxyzine** (*Atarax* — max 100 mg par prise), **Étifoxine** (*Stresam* — max 100 mg par prise), **Propranolol** (*Avlocardyl* — max 80 mg par prise).

#### F. TDAH, éveil / narcolepsie et médicaments d'accompagnement des addictions (8 molécules)
- **TDAH non stimulants et éveil** :
  - **Atomoxétine** (*Strattera* — sans détournement, max 100 mg), **Guanfacine** (*Intuniv* — sans détournement, max 4 mg), **Pitolisant** (*Wakix* — sans détournement, max 36 mg), **Solriamfétol** (*Sunosi* — léger potentiel de détournement stimulant, paliers adaptés jusqu'à 225 mg).
- **Addictologie (sans détournement — alertes vitales intégrées)** :
  - **Naltrexone** (*Revia* — max 50 mg) et **Nalméfène** (*Selincro* — max 18 mg) : bloquent les opiacés et déclenchent un manque brutal et sévère si un opioïde est encore présent dans le corps.
  - **Acamprosate** (*Aotal* — max 666 mg par prise, soit 2 comprimés de 333 mg trois fois par jour).
  - **Disulfirame** (*Espéral* — max 500 mg, réaction violente et dangereuse à la moindre goutte d'alcool, même dans une sauce ou un bain de bouche).

---

## 2. Mise à niveau d'environ 30 médicaments déjà présents dans la version de base

Plusieurs médicaments existaient déjà dans l'application d'origine mais avaient des fiches incomplètes, erronées ou mal adaptées à un usage médical :
- **Correction intégrale de la Buspirone (*Buspar*)** : dans la version de base, cette fiche contenait par erreur les surnoms de la *DMT* et n'avait ni doses, ni durées d'action, ni interactions. Elle est désormais entièrement corrigée.
- **Adaptation médicale de la Mirtazapine (*Norset*)** : ajout des dosages thérapeutiques usuels (7,5 mg à 45 mg) et de sa courbe d'action complète.
- **Ajout des noms commerciaux français** sur les médicaments déjà présents pour faciliter la recherche : *Xanax, Lexomil, Valium, Temesta, Séresta, Rivotril, Stilnox, Imovane, Lyrica, Neurontin, Liorésal, Xeroquel, Risperdal, Haldol, Stablon, Ritaline, Concerta, Quasym, Medikinet, Elvanse, Modiodal, Topalgic, Contramal, Ixprim, Zaldiar, Codoliprane, Klipal, Dicodin, Oxynorm, Skénan, Actiskénan, Suboxone*, etc.
- **Avertissements de sécurité sur les médicaments combinés au paracétamol** (*Codoliprane, Dafalgan Codéiné, Klipal, Ixprim, Zaldiar*) : rappel explicite dans la fiche de toujours comptabiliser le paracétamol contenu dans ces comprimés pour ne jamais dépasser 1 g par prise.

---

## 3. Graphiques d'effets fonctionnels pour toutes les molécules

Dans la version d'origine, de nombreux médicaments (*Valium, Temesta, Séresta, Rivotril, Imovane, Oxycodone, Neurontin, Xeroquel, Risperdal, Haldol, Norset*, etc.) n'avaient pas toutes leurs phases de durée renseignées, ce qui empêchait l'application de tracer leur courbe d'effet complète.

- **Courbes complètes sur 100 % des médicaments (nouveaux comme anciens)** : chaque médicament affiche désormais une courbe précise (début d'action, montée, plateau d'efficacité et descente) calée sur sa durée réelle et sur le temps à attendre avant la prise suivante (par exemple 4 h à 6 h pour le paracétamol, 6 h à 8 h pour l'ibuprofène ou le kétoprofène, 8 h à 12 h pour le naproxène ou le lithium, ~24 h pour les traitements en une prise quotidienne).
- **Graphique d'effet théorique intégré dans chaque fiche molécule** : lorsque vous consultez les détails d'une molécule (dans la liste ou la recherche), sa courbe d'action clinique théorique s'affiche directement sous forme de graphique avec les repères temporels (T=0, début d'action, pic d'efficacité, fin d'effet) pour visualiser immédiatement son profil pharmacologique.
- **Courbe pharmacodynamique naturelle et sommet en dôme (sans coupure horizontale)** : la formule de tracé a été retravaillée pour adopter un modèle continu et progressif. Auparavant, la période de plateau était tracée sous la forme d'un segment parfaitement horizontal et rectiligne qui donnait l'impression visuelle d'une courbe « coupée » ou « rabotée » en haut par un plafond invisible. Désormais, la courbe forme un **vrai dôme arrondi naturel** culminant au point d'effet maximal (sommet), avant de redescendre en pente douce, sans aucun angle vif ni ligne plate.
- **Dimensionnement optimisé et lisibilité sans coupure** : la hauteur des graphiques (dans le journal et dans la fiche molécule) et les marges intérieures ont été agrandies pour laisser un espace confortable au sommet. Le sommet de la courbe (le plateau/pic) et les libellés indicateurs ne sont plus jamais masqués, coupés ou cachés par les blocs ou en-têtes adjacents.
- **Cumul visuel des prises rapprochées** : si vous notez deux prises trop proches l'une de l'autre dans le journal, leurs courbes se superposent et s'additionnent sur le graphique, permettant de visualiser immédiatement un chevauchement avant l'heure prévue.

---

## 4. Nouvelles catégories de recherche et de filtrage

Pour retrouver rapidement un traitement parmi les 379 substances désormais présentes, **11 nouvelles familles médicales colorées** ont été ajoutées dans les filtres de recherche :
- **Antalgiques / Antidouleurs** (*Analgesic*)
- **Anti-inflammatoires non stéroïdiens** (*NSAID*)
- **Antimigraineux Triptans** (*Triptan*)
- **Anxiolytiques** (*Anxiolytic*)
- **Antihistaminiques** (*Antihistamine*)
- **Antidépresseurs ISRS** (*SSRI*)
- **Antidépresseurs IRSNa** (*SNRI*)
- **Antidépresseurs tricycliques** (*TCA*)
- **Antidépresseurs IMAO** (*MAOI*)
- **Régulateurs de l'humeur** (*Mood-stabilizer*)
- **Antiépileptiques / Anticonvulsivants** (*Anticonvulsant*)

---

## 5. Détection des interactions médicamenteuses améliorée et fiabilisée

Le vérificateur automatique d'interactions (qui vous prévient lorsque vous enregistrez une prise incompatible avec vos prises récentes ou vos traitements habituels) a été profondément amélioré :
- **Prise en compte des grandes règles de sécurité médicale** :
  - Alerte en cas de cumul de **deux anti-inflammatoires entre eux** (ou anti-inflammatoire + aspirine / corticoïde).
  - Alerte de **danger élevé** entre **Lithium + anti-inflammatoires** (risque d'intoxication grave au lithium).
  - Alerte de risque hémorragique entre **antidépresseurs (ISRS / IRSNa) + anti-inflammatoires ou aspirine**.
  - Alerte de **syndrome sérotoninergique ou de convulsions** entre **Tramadol / Néfopam / Triptans / Bupropion** et les différents **antidépresseurs**.
  - Alerte de **risque cardiaque (allongement du QT)** sur les associations contre-indiquées comme **Escitalopram / Citalopram + Hydroxyzine (*Atarax*) ou Amisulpride / Cyamémazine (*Tercian*)**.
  - Alerte de **dépression respiratoire** entre **calmants, benzodiazépines, somnifères, prégabaline/gabapentine, opiacés et alcool**, tout en distinguant correctement une simple prudence de somnolence (ex. neuroleptique ou *Atarax* + benzodiazépine) d'un danger vital.
  - Alerte de **perte d'efficacité de la contraception hormonale** avec certains antiépileptiques inducteurs (*Carbamazépine / Tégrétol, Oxcarbazépine / Trileptal, Topiramate / Epitomax*).
  - Alerte de **cumul toxique pour le foie** entre l'**alcool** et les traitements sollicitant le foie (*Paracétamol, Valproate / Dépakine, Agomélatine / Valdoxan*, etc.).
- **Correction de fausses alertes présentes dans la version de base** : correction d'un défaut du moteur de vérification qui confondait parfois le mot « antidépresseur » avec « dépresseur » ou « antidépresseur tricyclique », ce qui pouvait déclencher de fausses alertes entre un antidépresseur classique (ex. *Sertraline* ou *Escitalopram*) et un anxiolytique courant (ex. *Temesta, Séresta, Xanax*).
- **Nouveaux traitements de fond activables dans les Réglages** : dans le menu des combinaisons permanentes à surveiller, vous pouvez désormais cocher **Anti-inflammatoires (*NSAIDs*)**, **Benzodiazépines** et **Opioïdes** en plus des options déjà existantes (*Alcool, Lithium, Antidépresseurs ISRS / IRSNa / Tricycliques / IMAO, Contraception hormonale, Pamplemousse*, etc.).

---

## 6. Option de langue française et traductions intégrales

Dans la version de base, l'application était uniquement disponible en anglais et en chinois. Une prise en charge complète du **français** a été ajoutée :
- **Bouton de bascule de langue instantané (🇫🇷 / 🇬🇧)** :
  - Accessible directement dans l'en-tête du téléphone et dans l'onglet **Réglages**.
  - Permet de basculer en un clic entre le français et l'anglais sans recharger l'application.
- **Traduction intégrale de l'interface utilisateur** :
  - Tous les onglets, boutons, menus, fenêtres de confirmation, filtres et formats de dates sont traduits en français courant et naturel.
- **Traduction des fiches médicales et des messages d'alerte sur 100 % des molécules** :
  - **379 molécules intégralement en français** : toutes les substances de la base (médicaments courants comme substances psychoactives telles que le *2C-B, 1,4-Butanediol, 1P-LSD, DMT, MDMA, Kétamine*, etc.) disposent désormais de leur description complète, de leurs avertissements posologiques, de leurs résumés d'effets, de leurs risques généraux/long terme et de leur potentiel d'addiction traduits en français clair et soigné.
  - Les descriptions des **32 familles et catégories** sont également traduites en français.
  - La base de données en français a également été intégrée aux ressources natives de l'application Android (`values-fr/strings.xml` et `raw-fr/substances.json`).

---

## 7. Profils comparatifs explicites bilingues (FR / EN) pour 164 molécules rares, dérivés et analogues (RCs)

Pour permettre aux utilisateurs de comprendre instantanément le profil pharmacologique d'une molécule rare, d'un produit de recherche (RC) ou d'un dérivé synthétique, **une section comparative explicite (`⚖️ Profil comparatif` en français / `⚖️ Comparative profile` en anglais)** a été ajoutée dans la fiche de **164 molécules de la base**.

Que l'application soit configurée en français (`🇫🇷 FR`) ou en anglais (`🇬🇧 EN`), la comparaison s'affiche dans la langue choisie. Chaque profil compare directement la molécule à sa molécule parente ou de référence la plus connue (LSD, MDMA, amphétamine, kétamine, diazépam, morphine, tramadol, GHB, psilocybine, etc.) en détaillant :
- **La puissance relative par milligramme** (ex: *« 10 fois plus puissant à dose égale »*, *« 1 mg équivaut à 10 mg de diazépam »*).
- **La rapidité de montée et la durée d'action** (ex: *« Montée plus lente (45-60 min) car métabolisé par le foie, mais durée allongée »*, *« Durée doublée (7-10h au lieu de 4h) »*).
- **La dominante des effets ressentis** (ex: *« Effet plus sédatif et décontractant, avec moins d'excitation motrice que... »*, *« Visuels géométriques beaucoup plus spectaculaires mais introspection mentale moins anxiogène que... »*).
- **Les différences de profil de sécurité et de risques** (ex: *« Contrairement au tramadol, n'inhibe pas la recapture de sérotonine, éliminant ainsi le risque de convulsions et de syndrome sérotoninergique »*, *« Risque de tolérance et de perte de contrôle beaucoup plus rapide que... »*).

### Familles couvertes par les profils comparatifs :
- **Analogues du LSD & Lysergamides RCs (15 molécules) :** *1P-LSD, 1B-LSD, 1cP-LSD, 1V-LSD, AL-LAD, ALD-52, ETH-LAD, 1P-ETH-LAD, 1cP-AL-LAD, 1cP-MiPLA, LSA, LSM-775, LSZ, PARGY-LAD, PRO-LAD*.
- **Stimulants fluorés et dérivés d'amphétamines (18 molécules) :** *2-FA, 2-FEA, 2-FMA, 3-FA, 3-FEA, 3-FMA, 4-FA, 4-FMA, 3-FPM, 3,4-CTMP, Éthylphénidate, Isopropylphénidate, Propylhexédrine, Prolintane, Éphédrine*, etc.
- **Cathinones de synthèse (12 molécules) :** *3-MMC, 4-MMC (Méphédrone), Méthylone, Butylone, Éthylone, Hexédrone (Hexen), NEP, Pentedrone, Mexédrone, MDPV, A-PVP, A-PHP*.
- **Benzofuranes entactogènes (7 molécules) :** *6-APB, 5-APB, 5-MAPB, 6-APDB, MDA, MDEA, MDAI*.
- **Phényléthylamines 2C-x, DOx et analogues de mescaline (23 molécules) :** *2C-B-FLY, 2C-C, 2C-D, 2C-E, 2C-I, 2C-P, 2C-T-2, 2C-T-7, βk-2C-B, Allylescaline, Escaline, Méthallylescaline, Proscaline, 3C-E, 3C-P, DOB, DOC, DOI, DOM, TMA-2, TMA-6, Bromo-DragonFLY*.
- **Série des NBOMe et NBOH (7 molécules) :** *25B-NBOMe, 25C-NBOH, 25C-NBOMe, 25D-NBOMe, 25I-NBOH, 25I-NBOMe, 25N-NBOMe*.
- **Analogues de psilocybine et tryptamines 4-substituées (12 molécules) :** *4-AcO-DMT, 4-HO-MET, 4-AcO-MET, 4-AcO-MiPT, 4-HO-MiPT, 4-AcO-DET, 4-HO-DET, 4-AcO-DiPT, 4-HO-DiPT, 4-HO-DPT, 4-HO-EPT, 4-HO-MPT*.
- **Dérivés de DMT et tryptamines 5-substituées (12 molécules) :** *5-MeO-DMT, 5-MeO-MiPT, 5-MeO-DiPT, 5-MeO-DALT, DPT, DiPT, DET, MET, MiPT, MPT, αMT*.
- **Anesthésiques dissociatifs (dérivés de kétamine et PCP) (14 molécules) :** *Deschlorokétamine (DCK), 2-FDCK, 3-HO-PCE, 3-HO-PCP, 3-MeO-PCE, 3-MeO-PCP, 3-MeO-PCMo, 4-MeO-PCP, O-PCE, PCE, Diphénidine, Éphénidine, Méthoxphénidine (MXP), Rolicyclidine*.
- **Benzodiazépines et thiénodiazépines de recherche (12 molécules) :** *Étizolam, Deschloroétizolam, Métizolam, Clonazolam, Diclazépam, Flualprazolam, Flubromazépam, Flubromazolam, Pyrazolam, Nifoxipam, Phénazépam, Cinolazépam*.
- **Opioïdes de recherche et dérivés d'opioïdes (11 molécules) :** *O-Desméthyltramadol (O-DSMT), Acétylfentanyl, U-47700, Tapentadol, Dihydrocodéine, Éthylmorphine, Hydrocodone, Hydromorphone, Oxymorphone, Kratom, Néfopam*.
- **Sédatifs et modulateurs GABAergiques (5 molécules) :** *1,4-Butanediol (1,4-BD), GBL, Carisoprodol, Phénibut, 2M2B*.
- **Cannabinoïdes synthétiques puissants (7 molécules) :** *5F-AKB48, 5F-PB-22, AB-FUBINACA, APICA, STS-135, THJ-018, THJ-2201*.
- **Nootropiques et racétams (8 molécules) :** *Aniracétam, Oxiracétam, Pramiracétam, Phénylpiracétam, Coluracétam, Ombéracétam (Noopept), Adrafinil, Bromantane*.

---

## 8. Filtrage et recherche stricte sur les noms de molécules et marques

Le mécanisme de filtrage textuel des substances a été strictement recentré :
- **Périmètre strict de recherche :** la saisie de l'utilisateur inspecte désormais **exclusivement** le nom principal de la substance (`name`) ainsi que la liste de ses synonymes et noms commerciaux en pharmacie (`commonNames`).
- **Exclusion formelle :** les résumés cliniques (`summary`, `effectsSummary`), les avertissements posologiques (`dosageRemark`) et les textes d'interactions (`interactions`) sont totalement exclus du filtre de recherche, évitant ainsi l'apparition de molécules non souhaitées lors de la saisie d'un terme clinique ou d'un nom de médicament mentionné uniquement dans une mise en garde.
- **Normalisation insensible aux accents et à la typographie :** la recherche tolère l'absence d'accents (ex: *paracetamol* trouve *Paracétamol*, *etizolam* trouve *Étizolam*), les majuscules/minuscules ainsi que les espaces et tirets (ex: *2cb* trouve *2C-B*).
- **Synchronisation :** la modification est appliquée tant au niveau du code natif Android (`SearchRepository.kt`, `SearchViewModel.kt`) que dans le simulateur web bilingue (`simulateur_synaptik.html`).

---

## 9. Repositionnement de la cellule d'avertissement (`Warning`) sous la durée d'action

Dans l'écran de présentation détaillée de chaque molécule :
- **Nouvel ordre de présentation verticale :**
  1. Description & Catégories / Usages
  2. Paliers de dosage
  3. Durée d'action clinique (cinétique et graphique de courbe d'effet)
  4. **Cellule d'avertissement (`Warning` / `dosageRemark`) :** placée immédiatement en dessous de la durée d'action clinique avec icône d'alerte et mise en valeur visuelle.
  5. Interactions clés et sections associées.
- **Synchronisation :** appliquée sur l'application native Android ([`SubstanceScreen.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/search/substance/SubstanceScreen.kt)) et sur le simulateur web bilingue ([`simulateur_synaptik.html`](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)).

---

## 10. Nuancier chromatique par famille chimique et sous-classes

Une palette de couleurs cohérente, différenciée et perceptible à l'œil nu a été mise en place pour l'ensemble des 379 substances du projet :
- **Couleurs de base par grande famille pharmacologique :**
  - **Psychédéliques :** Teinte violet / pourpre (`#8B5CF6`) avec nuances distinctes : *Lysergamides* (`#8B5CF6`), *Tryptamines* (`#6366F1`), *2C-x & Mescalines* (`#D946EF`), *DOx & dérivés* (`#7E22CE`), *NBOMe* (`#A855F7`).
  - **Dissociatifs :** Teinte cyan / turquoise (`#06B6D4`) avec nuances : *Kétamines* (`#06B6D4`), *PCP/PCE* (`#0E7490`), *DXM & morphinanes* (`#38BDF8`).
  - **Stimulants :** Teinte orange vif (`#F97316`) avec nuances : *Amphétamines* (`#F97316`), *Cathinones* (`#EA580C`), *Méthylphénidates* (`#D97706`), *Alcaloïdes & cocaïne* (`#FB923C`).
  - **Entactogènes :** Teinte rose vif (`#EC4899`) avec nuances : *MDMA* (`#EC4899`), *Benzofuranes (6-APB)* (`#DB2777`), *Empathogènes légers* (`#F43F5E`).
  - **Opioïdes :** Teinte marron havane ambré (`#B45309`) avec nuances : *Opiacés naturels/semi-synthétiques* (`#B45309`), *Opioïdes de synthèse (Tramadol, O-DSMT)* (`#92400E`), *Fentaniloïdes* (`#78350F`), *Kratom* (`#854D0E`).
  - **Benzodiazépines :** Teinte bleu roi (`#2563EB`) avec nuances : *Benzos classiques* (`#2563EB`), *Z-drugs* (`#1D4ED8`), *RC benzos* (`#1E40AF`).
  - **Dépresseurs & GABA :** Teinte sarcelle canard (`#0D9488`) avec nuances : *GHB / 1,4-BD* (`#0D9488`), *Barbituriques* (`#115E59`), *Alcool* (`#475569`).
  - **Cannabinoïdes :** Teinte vert émeraude (`#10B981`) avec nuance : *Synthétiques (Spice)* (`#047857`).
  - **Antidépresseurs :** Teinte vert menthe d'eau (`#14B8A6`) avec nuances : *ISRS* (`#14B8A6`), *IRSNa* (`#059669`), *Tricycliques* (`#65A30D`), *IMAO* (`#84CC16`).
  - **Antipsychotiques / Neuroleptiques :** Teinte magenta foncé / prune (`#A21CAF`) avec nuance : *Sédatifs (Tercian, Nozinan)* (`#86198F`).
  - **Thymorégulateurs :** Teinte indigo lavande (`#6366F1`) avec nuance : *Lithium* (`#6366F1`), *Antiépileptiques* (`#4F46E5`).
  - **Antalgiques & AINS :** Teinte rouge cramoisi (`#EF4444`) avec nuances : *Paracétamol* (`#EF4444`), *AINS (Advil, Ibuprofène)* (`#DC2626`), *Triptans* (`#B91C1C`), *Néfopam* (`#991B1B`).
  - **Nootropiques :** Teinte jaune ambré / or (`#CA8A04` / `#EAB308`).
- **Liaison graphique et écran Journal :**
  - **Courbes théoriques :** Chaque courbe de cinétique d'effet adopte la couleur propre et le dégradé spécifique de sa molécule.
  - **Liste des prises du Journal :** Chaque prise affiche un carré plein (`w-3.5 h-3.5`) à la couleur exacte de la substance, positionné immédiatement à gauche du bouton Supprimer.
  - **Architecture Android :** Ajout de [`SubstanceColorPalette.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/SubstanceColorPalette.kt) pour assigner par défaut la couleur de la famille chimique dans `FinishIngestionScreenViewModel.kt`.

### 11. Restructuration des familles chimiques, séparation AINS/AIS & Filtres bilingues dynamiques

- **Classification cohérente (chimique vs thérapeutique selon détournement) :**
  - **Molécules psychoactives / à potentiel de détournement :** Regroupées par familles chimiques et pharmacologiques d'action (opioid, enzodiazepine, stimulant, phenethylamine, psychedelic, dissociative, entactogen, cannabinoid, depressant).
  - **Regroupement des antidépresseurs :** Unification de toutes les sous-classes (ssri, snri, 	ca, maoi) sous une seule et même famille « **Antidépresseurs** » (\alphantidepressant, 25 substances). Les badges distincts de sous-classes ont été retirés du carrousel de filtres pour simplifier la navigation utilisateur.
  - **Distinction stricte AINS / AIS :**
    - **AINS** (
said) : Anti-inflammatoires non stéroïdiens (Ibuprofène, Kétoprofène, Naproxène, Diclofénac...).
    - **Corticoïdes / AIS** (corticosteroid) : Anti-inflammatoires stéroïdiens (Prednisolone, Solupred, etc.), dotés d'une catégorie et couleur propre (#BE185D).
    - **Antalgiques non-opioïdes** (\alphanalgesic) : Débarrassés des étiquettes mixtes d'opioïdes et d'AINS pour ne conserver que les analgésiques purs (Paracétamol, Néfopam, Phloroglucinol).
  - **Ajustements de molécules spécifiques :**
    - *Tilidine* : classée en opioid.
    - *Nalméfène* : classé en opioid (antagoniste opioïde / modulateur).
    - *Acamprosate* : classé en depressant (GABAergique/glutamatergique).
- **Carrousel de filtres bilingue et dynamique :**
  - Les pilules de filtres se recalculent et se traduisent instantanément lors du basculement de langue (FR 🇫🇷 ↔ EN 🇬🇧) via initCategoryPills() invoqué dans setLanguage().
  - Noms français et anglais harmonisés (Opioïdes / Opioids, Benzodiazépines / Benzodiazepines, Antidépresseurs / Antidepressants, AINS / NSAIDs, Corticoïdes (AIS) / Corticosteroids (SAIDs), Antalgiques (non-opioïdes) / Non-opioid Analgesics...).

### 12. Gestion des voies d'administration (ROA), posologies/cinétiques multi-voies & Norme couleur par voie

- **Enrichissement et complétude des voies d'administration (
aw/substances.json & 
aw-fr/substances.json) :**
  - **200 nouvelles voies d'administration ajoutées** et **19 voies incomplètes corrigées** (0 substance sans ROA, 0 ROA sans paliers de doses ou sans cinétiques complètes onset, comeup, peak, offset, 	otal).
  - **Alignement PsychonautWiki API, TripSit & pratique médicale/détournement documenté :**
    - *Opioïdes* : Morphine (oral, insufflated, 
ectal, intravenous, intramuscular, subcutaneous), Oxycodone (oral, insufflated, 
ectal, intravenous, smoked), Héroïne (oral, insufflated, 
ectal, intravenous, intramuscular, smoked), Hydromorphone, Oxymorphone, Fentanyl, Sufentanil, Buprénorphine, Méthadone, Tramadol, O-DSMT, Codéine, Dihydrocodéine, Péthidine, U-47700, Opium, Désomorphine.
    - *Stimulants & Entactogènes* : MDMA (oral, insufflated, 
ectal, intravenous), MDA, MDEA, Cocaïne (oral, insufflated, 
ectal, intravenous, smoked/crack), Amphétamine, Dextroamphétamine, Méthylphénidate (oral, sublingual, insufflated, 
ectal, intravenous), Éthylphénidate, 4F-MPH, Méphédrone (4-MMC), 3-MMC, Méthylone, MDPV, 2-FA, 3-FA, 4-FA, 3-FMA, 4-FMA, 5-MAPB, 5-APB, 6-APB.
    - *Dissociatifs* : Kétamine (oral, sublingual, insufflated, 
ectal, intravenous, intramuscular), 2-FDCK, DCK, MXE, 3-HO-PCP, 3-HO-PCE, O-PCE, Éphénidine, MXP.
    - *Psychédéliques* : LSD & analogues (sublingual, oral), DMT (smoked, insufflated, 
ectal, intravenous, intramuscular), 5-MeO-DMT, 5-MeO-MiPT, 5-MeO-DiPT, série 2C-x (oral, insufflated, 
ectal), 4-AcO-DMT, 4-HO-MET, 4-HO-MiPT, EPT, MPT, Bufoténine.
    - *Benzodiazépines, Hypnotiques & Médicaments cliniques* : Alprazolam (oral, sublingual), Diazépam (oral, sublingual, 
ectal, intravenous, intramuscular), Clonazépam, Lorazépam, Midazolam (oral, sublingual, insufflated, intravenous, intramuscular), Triazolam (oral, sublingual, insufflated), Flunitrazépam, Zolpidem (oral, sublingual, insufflated), Paracétamol (oral, 
ectal, intravenous), Kétoprofène (oral, 
ectal, intravenous, intramuscular), Diclofénac, Néfopam, Sumatriptan (oral, insufflated, subcutaneous), Zolmitriptan, Rizatriptan, Loxapine, Cyamémazine, Halopéridol, Olanzapine, Rispéridone, Aripiprazole, Tianeptine (oral, intravenous), Poppers (inhaled).
- **Norme de couleur universelle par voie d'administration (ROA_NORM_CONFIG & AdministrationRoute.kt) :**
  - **Orale (oral)** : Bleu Azur #3B82F6 (AdaptiveColor.BLUE)
  - **Sublinguale (sublingual)** : Cyan #06B6D4 (AdaptiveColor.CYAN)
  - **Buccale (uccal)** : Menthe #34D399 (AdaptiveColor.MINT)
  - **Nasale / Insufflée (insufflated)** : Violet Améthyste #A855F7 (AdaptiveColor.PURPLE)
  - **Rectale (
ectal)** : Orange Ambré #F97316 (AdaptiveColor.ORANGE)
  - **Intraveineuse (intravenous - IV)** : Rouge Vif #EF4444 (AdaptiveColor.RED)
  - **Intramusculaire (intramuscular - IM)** : Rose / Magenta #EC4899 (AdaptiveColor.PINK)
  - **Sous-cutanée (subcutaneous - SC)** : Sarcelle #14B8A6 (AdaptiveColor.TEAL)
  - **Inhalée / Fumée / Vaporisée (smoked)** : Vert Émeraude #10B981 (AdaptiveColor.GREEN)
  - **Inhalée Gaz / Volatil (inhaled)** : Jaune Or #EAB308 (AdaptiveColor.YELLOW)
  - **Transdermique (	ransdermal - Patch)** : Indigo #6366F1 (AdaptiveColor.INDIGO)
- **Affichage multi-courbes et légende dédiée dans la fiche molécule (SubstanceScreen.kt & simulateur_synaptik.html) :**
  - Superposition des courbes cinétiques de toutes les voies d'administration de la molécule sur le graphique, chacune tracée avec la couleur normalisée de sa voie.
  - Intégration d'une **légende interactive dédiée** immédiatement sous le graphique permettant de cibler/mettre en avant une voie d'administration tout en rappelant le standard de couleurs universel ROA.

### 13. Boutons de basculement dynamique de mode d'administration & Déchargement visuel de la fiche molécule

- **Positionnement du sélecteur de mode d'administration :**
  - Ajout d'une barre de boutons ergonomiques (modal-roa-selector-box) positionnée **strictement au-dessus du bloc « Paliers de doses »**.
  - Affiche pour chaque substance les boutons pastillés des différentes voies disponibles (Orale, Nasale, Rectale, IV, IM, Inhalée...).
  - Mise en évidence visuelle de la voie active avec lueur/halo de sa couleur normalisée (ox-shadow), bordure vive et typographie contrastée.
- **Déchargement visuel & Synchronisation dynamique :**
  - **Paliers de doses :** La carte affiche désormais **exclusivement les 4 paliers de posologie** (Léger, Commun, Fort, Très fort), l'unité et la biodisponibilité de la voie sélectionnée. Fin de l'empilement vertical de toutes les voies qui alourdissait la vue.
  - **Durée d'action clinique & Courbe théorique :**
    - La courbe principale du graphique se redessine immédiatement avec la cinétique et la couleur de la voie choisie.
    - Le badge sommet du dôme affiche le plateau propre à la voie (ex: Plateau (Nasale), Plateau (Orale)).
    - Les autres voies restent suggérées en arrière-plan en lignes pointillées discrètes pour permettre une comparaison visuelle instantanée des montées et durées sans surcharger.
    - La section textuelle de durée n'affiche que les 4 phases (Début, Montée, Plateau, Descente + durée totale) de la voie active.
  - **Interconnexion de la légende :** Les pastilles de voies de la légende sous le graphique permettent également de basculer instantanément d'un mode à l'autre d'un simple clic.
  - **Architecture Android (SubstanceScreen.kt) :** Implémentation d'un état réactif selectedRoaRoute avec carte de sélection par puces au-dessus des posologies et filtrage contextuel des doses et cinétiques.

### 14. Intégration et enrichissement du Baclofène (Baclofen)

- **Bases de données (
aw/substances.json et 
aw-fr/substances.json) :**
  - **Noms communs & marques enregistrées :** Baclofène, Baclofen, Liorésal, Lioresal, Baclocur, Zentiva.
  - **Classification & Couleur :** Famille des dépresseurs & modulateurs GABAergiques (depressant, #0D9488).
  - **Posologies & Voie orale :** Paliers complets (Léger: 5 mg, Commun: 20 mg, Fort: 50 mg, Très fort: 100 mg), biodisponibilité de 70-85%.
  - **Cinétique clinique :** Début en 30-75 min, montée en 1-1.5 h, plateau en 1-2 h, descente en 1.5-2.5 h, durée totale 8-14 h.
  - **Avertissement posologique strict (dosageRemark) :** Alerte majeure sur l'interdiction d'arrêt brutal (risque vital de syndrome de sevrage aigu sévère : délire, convulsions, hyperthermie maligne). Nécessité d'une décroissance très progressive.
  - **Effets comparatifs :** Positionné par rapport au Phénibut et à la Prégabaline (analogue direct du GABA, puissance 5 à 10 fois supérieure au Phénibut, sélectivité GABA-B prédominante, effet plus myorelaxant et moins euphorisant).
- **Intégration au Simulateur & Journal :**
  - **Journal (saisie rapide) :** Ajouté directement dans les molécules prioritaires de saisie rapide (priorityNames) avec ses noms commerciaux (Baclofen (Liorésal)).
  - **Réglages (Traitements de fond) :** Ajout de l'interrupteur « Traitement par Baclofène (Liorésal, Baclocur) » déclenchant automatiquement la détection des interactions dangereuses (ex. avec l'Alcool, les Opioïdes, les Benzodiazépines).

### 15. Suppression des calques secondaires & Calibrage optimal plein format de la courbe par voie

- **Suppression des calques secondaires sur le graphique :**
  - Élimination complète du tracé en arrière-plan des autres voies d'administration. Le canvas n'affiche désormais **que la courbe unique du mode d'administration sélectionné**.
- **Dimensionnement et échelle temporelle auto-ajustée (	otalGraphMin) :**
  - L'axe horizontal n'est plus étiré sur la durée maximale arbitraire de l'ensemble des voies de la molécule, mais est **strictement calibré sur la durée de la voie choisie** (	otalGraphMin = Math.max(primaryModel.tEnd * 1.25, 10)).
  - **Bénéfice visuel direct :**
    - Les voies rapides (ex: *Inhalée / Fumée* ou *IV* d'une durée de 20 à 45 minutes) ne sont plus tassées dans un coin étriqué à gauche, mais se déploient harmonieusement sur toute la largeur du canvas.
    - Les voies longues (ex: *Orale* de 8 à 14 heures) conservent leur lisibilité naturelle avec un dôme doux, un plateau aéré et des jalons (T=0, Début, Plateau, Fin) idéalement positionnés.
  - **Android (SubstanceScreen.kt) :** Le composant AllTimelines filtre également sur selectedRoaRoute pour n'afficher que la courbe propre à la voie sélectionnée.

### 16. Nuancier par familles chimiques, familles unifiées, antalgiques purs & filtre Gabapentinoïdes

- **Localisation et architecture des couleurs et familles :**
  - **Android :**
    - SubstanceColorPalette.kt : Mappage exhaustif des 379 substances et de toutes les familles chimiques/thérapeutiques vers les teintes AdaptiveColor distinctes et leurs nuances.
    - AdaptiveColor.kt & SubstanceColor.kt : Prise en charge des nuances chromatiques (Teal, Light Sea Green, Mint, Fire Engine Red, Fuchsia, Dark Magenta, Deep Lavender, Coral, Cinnabar, etc.).
    - ExperienceRow.kt (ColorRectangle) & FinishIngestionScreenViewModel.kt : Attribution automatique de la couleur de famille chimique au carré visuel de l'expérience du Journal et aux cartes de prises.
    - ExperienceViewModel.kt & AllTimelines.kt : Exploitation de la couleur de la substance pour tracer les courbes de pharmacocinétique dans le graphique du Journal.
  - **Simulateur HTML & Datasets bilingues :**
    - 
aw/substances.json et 
aw-fr/substances.json : Intégration des attributs color (#HEX) et colorArgb (entier ARGB Android) pour chaque molécule.
    - uild_bilingual_simulator.py, simulateur_synaptik.html, simulator.html.
- **Palette chromatique par famille chimique avec nuances perceptibles à l'œil humain :**
  - **Opioïdes** (#F59E0B - Ambre / Safran) : nuances pour Morphine, Oxycodone, Fentanyl, Codéine, Tramadol, Buprénorphine, Méthadone.
  - **Benzodiazépines** (#3B82F6 - Bleu Azur / Saphir) : nuances pour Alprazolam, Diazépam, Clonazépam, Lorazépam, Midazolam, Oxazépam, Bromazépam.
  - **Antidépresseurs unifiés** (#22C55E - Vert Émeraude) : Famille unifiée unique (retrait des filtres et sous-classes morcelées ISRS, IRSN, NaSSA, Tricycliques, IMAO). Nuances subtiles entre Sertraline, Fluoxétine, Escitalopram, Venlafaxine, Amitriptyline, Duloxétine, etc.
  - **AINS unifiés** (#EF4444 - Rouge Vermillon) : Ibuprofène, Kétoprofène, Diclofénac, Naproxène, Célécoxib.
  - **Corticoïdes / AIS unifiés** (#BE185D - Carmin / Fuchsia foncé) : Prednisolone, Méthylprednisolone, Dexaméthasone, Bétaméthasone.
  - **Antipsychotiques unifiés** (#A21CAF - Violet Impérial / Magenta) : Halopéridol, Olanzapine, Rispéridone, Quétiapine, Aripiprazole, Cyamémazine.
  - **Anxiolytiques non-benzodiazépines unifiés** (#6366F1 - Indigo / Lavande profond) : Hydroxyzine, Buspirone, Étifoxine.
  - **Antalgiques non opioïdes purs** (#F43F5E - Rose Corail) : Nettoyage strict de la catégorie pour ne garder que les **vrais antalgiques purs** : *Paracétamol*, *Néfopam*, *Métamizole*. Retrait des myorelaxants, antispasmodiques, triptans et antiépileptiques de cette catégorie.
  - **Gabapentinoïdes** (#0D9488 - Sarcelle / Canard profond) : Création de la catégorie dédiée regroupant *Prégabaline*, *Gabapentine*, *Phénibut*, *F-Phénibut* et *Baclofène*.
  - **Stimulants** (#F97316 - Orange Vif / Mandarine) : Amphétamine, Dextroamphétamine, Méthylphénidate, Cocaïne, 4-MMC, 3-MMC.
  - **Psychédéliques** (#8B5CF6 - Violet Électrique / Pourpre) : LSD, Champignons / Psilocybine, DMT, 2C-B, 4-HO-MET, Mescaline.
  - **Dissociatifs** (#06B6D4 - Cyan Turquoise) : Kétamine, DCK, 2-FDCK, MXE, 3-HO-PCP, O-PCE.
  - **Entactogènes** (#EC4899 - Rose Fuchsia) : MDMA, MDA, 5-MAPB.
  - **Cannabinoïdes** (#10B981 - Vert Menthe / Jade) : THC, CBD, CBN, Cannabinoïdes de synthèse.
  - **Sédatifs & Somnifères GABA** (#64748B - Bleu Ardoise / Gris perle) : Zolpidem, Zopiclone, Barbituriques, GHB, GBL.
- **Exploitation de la couleur des substances sur le graphique et le carré visuel du Journal :**
  - **Graphique Journal (drawTimeline()) :** Tracé multi-courbes individualisé où chaque molécule ingérée s'affiche avec la couleur propre à sa famille chimique (s.color), avec dôme en dégradé lumineux, courbe haute fidélité et jalon d'ingestion sur la ligne de base.
  - **Carré visuel du Journal (
enderIngestions() & ExperienceRow.kt) :** Affichage d'un carré plein (w-3.5 h-3.5 / ColorRectangle) reprenant exactement la teinte chimique de la molécule immédiatement à gauche du bouton de suppression.
  - **Filtres de recherche dynamiques et bilingues :**
    - Suppression des filtres fragmentés d'antidépresseurs dans l'interface pour tout regrouper sous « Antidépresseurs » (Antidepressants).
    - Ajout du filtre « Gabapentinoïdes » (Gabapentinoids (5)) avec comptage en temps réel et bascule linguistique instantanée.


### 17. Graphique du Journal : Intégration du composant de la fiche molécule, superposition multi-courbes, proportionnalité à la dose et graduations 1h

- **Remplacement par le composant graphique de la fiche molécule (`AllTimelines.kt` & `drawTimeline()`) :**
  - **Android (`JournalScreen.kt`, `JournalViewModel.kt`, `AllTimelines.kt`) :** Intégration directe du composant `AllTimelines` (utilisé dans `SubstanceScreen.kt`) en tête de l'écran Journal (`active_session_timeline`), affichant les prises actives de la session/journée.
  - **Simulateur Web (`simulateur_synaptik.html` & `simulator.html`) :** Remplacement de l'ancien canvas basique du Journal par le moteur haute résolution de la fiche molécule (courbes en cloche continue $\sin^2 / \cos^2$ à 160 échantillons, dégradé lumineux 3-stops, jalons de prise/sommet/fin, badges pilules au sommet avec anti-collision et légende dynamique `#journal-timeline-legend` sous le graphique).
- **1. Superposition multi-courbes et couleurs propres par molécule :**
  - Affichage simultané sur un seul et même graphique de toutes les prises enregistrées de la session/journée.
  - Chaque courbe adopte strictement la couleur attribuée à sa molécule (`s.color` dans le simulateur, `SubstanceColorPalette.getDefaultSubstanceColor` / `getSubstanceColor()` dans Android).
- **2. Proportionnalité stricte de la hauteur (Axe Y) :**
  - Calcul de l'amplitude verticale de chaque courbe (`doseRatio = dose / heavyRef` dans `drawTimeline()` et `getStrengthRelativeToCommonDose.kt` + normalisation ancrée dans `AllTimelinesModel.kt`) strictement proportionnelle à la quantité (dose) administrée par rapport au palier de dosage de la molécule (`lightMin`, `commonMin`, `strongMin`, `heavyMin`).
  - Affichage de repères horizontaux subtils des paliers (`Léger 25%`, `Commun 50%`, `Fort 75%`, `Très fort 100%`) sur l'axe vertical.
- **3. Graduation temporelle toutes les 1 heure (Axe X) :**
  - **Android (`AxisDrawable.kt` & `AllTimelines.kt`) :** Génération des graduations horaires avec `stepSizeInHours = 1L` et tracé d'une **barre verticale d'indication toutes les 1 heure** sur toute la hauteur du graphique + tiret de graduation sur la ligne de base et étiquette horaire (`HHh`).
  - **Simulateur (`drawTimeline()`) :** Fenêtre temporelle dynamique calée sur des heures pleines avec tracé d'une **barre verticale d'indication toutes les 1 heure** (`hr += 1`), tiret franc sur l'axe horizontal et étiquettes horaires claires (`0h`, `+1h`, `+2h`, `+3h`...).


### 18. Courbe d'effet en temps réel : Barre de dézoom sur l'axe X uniquement & Infobulle tactile passé/futur

- **Barre de navigation et de dézoom sur l'axe des X uniquement (`#timeline-x-nav-bar` & `AllTimelines.kt`) :**
  - Ajout d'une barre de contrôle dédiée sous le graphique d'effet en temps réel comprenant un curseur progressif (`1.0x` à `4.0x`), des boutons `−` / `+`, un indicateur d'échelle et un bouton de réinitialisation `1x`.
  - Le dézoom agit **exclusivement sur l'axe temporel X** (élargissant la plage horaire passée et future pour visualiser ensemble molécules courtes et molécules à longue demi-vie) sans jamais déformer ni réduire l'échelle verticale Y.
- **Interaction tactile & pointeur avec calcul du temps passé / futur :**
  - Lors d'un toucher, clic ou glissement sur le graphique (`pointerdown`, `pointermove`, `touchstart`, `touchmove` sur `#timeline-canvas` et `detectTapGestures` / `detectHorizontalDragGestures` dans `AllTimelines.kt`) :
    - Affichage d'un repère vertical lumineux à l'abscisse pointée et de points d'intersection sur chacune des courbes actives.
    - Affichage d'une infobulle haute lisibilité indiquant :
      - **Dans le futur (`t > 0`)** : le temps qu'il faudra pour atteindre ce point (**« Dans Xh Ymin »** / `In Xh Ymin`).
      - **Dans le passé (`t < 0`)** : il y a combien de temps l'on était à ce point (**« Il y a Xh Ymin »** / `Xh Ymin ago`).
      - **À l'instant présent (`T = 0`)** : **« Maintenant (T=0) »** (`Now (T=0)`), accompagné du pourcentage d'intensité et de la phase pharmacocinétique de la molécule à cet instant.


### 19. Zoom bidirectionnel complet sur l'axe X (Zoom avant & Dézoom panoramique)

- **Capacité de Zoom avant étendu sur l'axe temporel X :**
  - Le contrôle d'échelle temporelle permet désormais non seulement de dézoomer (vue panoramique jusqu'à `0.25x` ou `4x` plus large), mais également de **zoomer en gros plan jusqu'à `4.0x`**.
  - **Zoom avant (`> 1.0x`) :** La fenêtre temporelle se resserre autour de l'activité présente (`T=0` et prises actives). Les courbes s'étirent horizontalement sur toute la largeur de l'écran, ce qui permet d'analyser en détail les montées rapides (`Comeup`) et les plateaux (`Peak`) des molécules à courte durée d'action (ex. voies inhalées, IV, ou psychotropes rapides).
  - **Dézoom arrière (`< 1.0x`) :** Élargissement de la fenêtre temporelle pour embrasser la session entière ou des molécules à très longue demi-vie (Diazépam, Buprénorphine) sur 24h à 48h.
  - **Hauteur Y strictement préservée :** Le zoom s'effectue **exclusivement sur l'axe des X**, sans aucune distorsion de la proportionnalité des doses sur l'axe vertical Y.
- **Interactions gestuelles enrichies :**
  - **Molette de souris (`wheel`) :** Zoom avant et arrière fluide en survolant le canvas.
  - **Pincement tactile (`pinch-to-zoom`) :** Geste naturel à deux doigts sur écran tactile permettant de zoomer ou dézoomer dynamiquement.
  - **Boutons de contrôle & Réinitialisation instantanée `1x` :** Boutons `+`, `−`, curseur glissant continu et bouton de retour immédiat au zoom standard `1x`.


### 20. Enregistrement rapide : Barre de recherche avec autocomplétion instantanée & sélection directe vers la saisie de dose

- **Remplacement de l'ancien menu déroulant statique par une recherche textuelle dynamique :**
  - Suppression de la liste déroulante statique `<select id="quick-substance">` au profit d'une interface en deux étapes fluides et réactives (`#quick-step-search` et `#quick-step-dose`).
  - **Étape 1 : Barre de recherche et suggestions instantanées (`#quick-search-input`) :**
    - Champ texte avec icône loupe, placeholder contextuel bilingue (`Rechercher molécule ou marque (ex: Doliprane, Xanax, Tramadol...)`) et bouton d'effacement rapide `✕`.
    - **Suggestions en temps réel (`renderQuickSuggestions()`) :** Dès la saisie du premier caractère, filtrage multi-critères instantané croisant le nom de la substance, ses noms commerciaux/marques (`commonNames` ex. Dafalgan, Valium, Rivotril, Subutex...) et ses classes thérapeutiques.
    - **Suggestions fréquentes / Sans saisie :** Dès le focus sur le champ vide, affichage d'une liste ordonnée des molécules courantes et prioritaires pour une sélection en un clic sans saisie obligatoire.
    - **Rendu visuel enrichi de chaque suggestion :** Pastille de couleur de la famille chimique (`s.color`), nom de la molécule, marques commerciales associées entre parenthèses, tag de catégorie et chevron interactif avec feedback visuel au survol.
- **Étape 2 : Bascule immédiate sur la saisie de la dose (`selectQuickSubstance()`) :**
  - Un clic sur n'importe quelle suggestion de molécule sélectionne automatiquement la substance et fait basculer instantanément l'interface vers l'étape de posologie (`#quick-step-dose`), masquant la recherche.
  - **En-tête de la molécule sélectionnée :** Affichage de la pastille de couleur, du nom officiel, des marques principales et de la classe chimique, accompagné d'un bouton « Changer » (`resetQuickSearch()`) pour revenir immédiatement à la recherche si souhaité.
  - **Sélecteur de voie d'administration dynamique (`#quick-roa-container`) :** Pour les molécules disposant de plusieurs voies (orale, sublinguale, nasale...), affichage de boutons d'accès rapide avec leurs codes couleurs respectifs permettant d'adapter la posologie à la voie choisie.
  - **Champ de dose et paliers posologiques en 1 clic :**
    - Le champ de saisie `#quick-dose` est automatiquement pré-rempli avec la dose commune ou thérapeutique de référence de la voie choisie, avec focus automatique.
    - Affichage de boutons pilules interactifs cliquables pour chaque palier de dosage disponible (`Seuil`, `Léger`, `Commun`, `Fort`, `Très fort` avec valeur et unité), permettant de régler la dose en un clic.
  - **Sécurité et alertes d'interactions en temps réel :** Évaluation instantanée des interactions avec les prises de la journée et les traitements de fond actifs avant validation.
  - **Validation fluide :** Clic sur « Valider et ajouter au journal » ajoute la prise à l'historique, met à jour le graphique multi-courbes et réinitialise élégamment le formulaire vers l'étape de recherche pour une nouvelle saisie.
- **Harmonisation Android (`AddIngestionSearchScreen.kt`) :**
  - Simplification du parcours : le clic sur une suggestion de molécule dans la liste de recherche (`SubstanceRowAddIngestion`) bascule désormais directement sur l'écran de saisie de la dose (`navigateToDose(substance.name, AdministrationRoute.ORAL)`).



### 21. Requalification de l'alcool & Harmonisation des alertes de risque (« À risque avec l'alcool »)

- **Suppression du statut erroné de « traitement de fond » pour l'alcool :**
  - L'alcool (éthanol) n'est en aucun cas un traitement médical ni un traitement de fond. Son statut est formellement requalifié comme substance psychoactive récréative / occasionnelle et facteur de risque de co-consommation.
  - Reclassification du bloc de profil et des réglages en **« Traitements de fond & Facteurs de risque »** (*Ongoing therapies & Risk factors*), avec un libellé explicite : **« Alcool (consommation fréquente / co-ingestion) »** (*Alcohol (frequent intake / co-use)*).
- **Harmonisation des bandeaux d'avertissement et alertes (`checkPreIngestionAlert()`) :**
  - Remplacement de l'ancien message inapproprié *« Interaction NON SÉCURISÉE avec votre traitement de fond : Alcohol ! »* par une formulation clinique claire et exacte :
    - **Risque d'interaction non sécurisée :** **« ⚠️ À risque avec l'alcool (interaction NON SÉCURISÉE) ! »** (*⚠️ At risk with alcohol (UNSAFE interaction)!*)
    - **Risque d'interaction dangereuse :** **« ⚠️ À risque avec l'alcool (interaction DANGEREUSE) ! »** (*⚠️ At risk with alcohol (DANGEROUS interaction)!*)
  - Cette règle s'applique de façon uniforme que l'alcool provienne d'une prise enregistrée dans la journée (`ingestions`), du profil de risque actif (`enabledSettings`), ou d'une saisie directe.
- **Préservation intégrale des alertes pharmacologiques critiques :**
  - Maintien rigoureux de toutes les détections de synergie toxique et de dépression respiratoire du système nerveux central (association alcool avec benzodiazépines, opioïdes, barbituriques, GHB/GBL, antihistaminiques sédatifs, kétoprofène/AINS et risques hépatiques avec le paracétamol).


### 22. Enregistrement des prises : Sélection obligatoire de la voie d'administration, horodatage passé/futur, badge de palier de dose et classification thérapeutique des médicaments non détournables

- **1. Choix systématique de la méthode d'administration avant validation :**
  - Le sélecteur de voie d'administration (`#quick-roa-container`) est désormais **systématiquement visible et interactif** pour toutes les molécules à l'étape de saisie de la dose.
  - Affichage de boutons d'accès rapide avec pastille colorée normalisée (`ROA_COLORS`) pour chaque voie disponible (Oral, Sublingual, Nasal, Rectal, Intraveineux...).
  - Mise en valeur visuelle de la voie active (halo lumineux, fond contrasté, bordure colorée).
  - Le changement de voie réactualise instantanément l'unité (`mg`, `µg`...), la posologie par défaut et les paliers de dose cliquables associés à la méthode choisie.
- **2. Affichage à droite du dosage du palier correspondant dans l'historique :**
  - Dans la liste des prises de la journée (`renderIngestions()`), intégration d'un **badge dynamique** placé immédiatement à droite de la dose (`dose unit`) indiquant la qualification exacte de la quantité ingérée (`getDoseTierInfo()`) :
    - *Molécules non détournables :* `Dose faible` (émeraude), `Dose standard` (bleu), `Dose max / prise` (ambre) ou `Dépassement max` (rose/rouge).
    - *Molécules psychoactives :* `Seuil` (gris), `Léger` (émeraude), `Commun` (bleu), `Fort` (ambre), `Très fort` (rose/rouge).
  - Ajout d'une étiquette rappelant la voie d'administration utilisée (ex. `[ORAL]`, `[IV]`, `[SUBLINGUAL]`) avec sa pastille de couleur.
- **3. Reclassification posologique médicale des molécules non détournables :**
  - Remplacement du vocabulaire récréatif/psychonaute inadapté (*« Seuil, Léger, Commun, Fort, Très lourd / Heavy »*) par une **classification posologique médicale rigoureuse** (`NON_DIVERTIBLE_DOSES`) pour les molécules thérapeutiques non psychoactives ou non détournées (Paracétamol, Ibuprofène, Kétoprofène, Phloroglucinol, Naproxène, Aspirine, Néfopam, Propranolol, Prednisolone...) :
    - **Paracétamol oral :** Dose standard à **1000 mg** (Doliprane adulte standard), Dose faible à **500 mg**, Dose maximale par prise à **1000 mg** (suppression de l'étiquette « Très lourd » pour 1000 mg / 1 g).
    - **Ibuprofène :** Dose faible **200 mg**, Dose standard **400 mg**, Dose maximale par prise **600 mg**.
    - **Kétoprofène :** Dose faible **50 mg**, Dose standard **100 mg**, Dose maximale par prise **100 mg**.
    - **Phloroglucinol (Spasfon) :** Dose standard **80 mg** (1 cp), Dose maximale par prise **160 mg** (2 cp).
    - **Néfopam (Acupan) :** Dose standard **20 mg**, Dose maximale par prise **20 mg**.
  - Ces paliers sont directement exploitables via les boutons pilules à 1 clic dans le formulaire rapide et dans la table des posologies de la fiche molécule.
- **4. Horodatage flexible des prises (passé, présent et futur) :**
  - Ajout d'un sélecteur d'heure complet dans le formulaire d'enregistrement :
    - Champ d'heure native (`input type="time" id="quick-time-input"`).
    - Raccourcis rapides à 1 clic : **« Maintenant »** (`0 min`), **« -30 min »**, **« -1 h »**, **« -2 h »**, **« -4 h »** (prises antérieures oubliées), et **« +1 h (futur) »**, **« +2 h (futur) »** (prises planifiées à l'avance).
    - Indicateur relatif dynamique en temps réel (*« À l'instant »*, *« Il y a 1h30 (passé) »*, *« Dans 1h00 (futur) »*).
  - **Prise en compte dans le graphique et l'historique :**
    - `timeOffsetMinutes` est sauvegardé et exploité directement par le moteur graphique multi-courbes (`drawTimeline()`), positionnant le départ de la courbe précisément dans le passé ou dans le futur.
    - L'historique affiche l'heure exacte et l'écart relatif (*« Il y a 1h30 (17:15) »*, *« Planifié dans 2h (20:45) »*).


### 23. Actualisation clinique du Néfopam (Comprimés oraux 30 mg sous AMM) & Restriction stricte des Gabapentinoïdes (Gabapentine, Phenibut, Prégabaline)

- **1. Actualisation clinique et réglementaire du Néfopam (Acupan) :**
  - **Mise à jour de la description officielle (`summary`) dans les bases de données ([`substances.json (FR)`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json) & [`substances.json (EN)`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json)) :**
    - Intégration de l'existence et de l'autorisation de mise sur le marché (**AMM**) des **comprimés pelliculés de 30 mg** de néfopam par voie orale (notamment en France avec les spécialités Néfopam Biogaran / Viatris / Arrow 30 mg).
    - Clarification historique : la voie orale n'est plus cantonnée au détournement hors-AMM de l'ampoule injectable bue sur un sucre, mais constitue désormais une présentation pharmaceutique orale officiellement autorisée.
  - **Ajustement des paliers posologiques oraux :**
    - **Dose standard :** **30 mg** (1 comprimé de 30 mg par prise).
    - **Dose maximale / prise :** **60 mg** (2 comprimés de 30 mg par prise, sans dépasser 120 mg/jour).
    - Mise à jour cohérente dans le référentiel des doses thérapeutiques (`NON_DIVERTIBLE_DOSES`) et dans le moteur de suggestions instantanées.

- **2. Restriction stricte de la classe des Gabapentinoïdes :**
  - Conformément à la pharmacologie des ligands alpha-2-delta, la famille des **Gabapentinoïdes** est désormais strictement restreinte aux **3 molécules** cibles :
    1. **Gabapentine** (*Neurontin*)
    2. **Phenibut**
    3. **Prégabaline** (*Lyrica*)
  - **Exclusion des autres substances :**
    - Retrait de la catégorie `gabapentinoid` pour le **Baclofène** (GABA-B agoniste / myorelaxant pur) et pour le **F-Phenibut**.
    - Les filtres de recherche par classe du simulateur bilingue et de l'application Android affichent désormais exactement ces 3 substances clés sous le libellé « Gabapentinoïdes (3) » (*Gabapentinoids (3)*).
  - Harmonisation du nuancier de couleurs dans [`SubstanceColorPalette.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/SubstanceColorPalette.kt).


---

### 24. Restauration et enrichissement du choix de la voie d'administration (Orale, Sublinguale, Nasale, IV...)

- **1. Application Android (`psychonautwiki-journal-android-main`) :**
  - **Parcours depuis la recherche instantanée ([`AddIngestionSearchScreen.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/journal/addingestion/search/AddIngestionSearchScreen.kt)) :**
    - Suppression du raccourci forcé `navigateToDose(..., AdministrationRoute.ORAL)`. Le clic sur une molécule dans la liste des résultats oriente désormais vers l'écran dédié de sélection de la voie d'administration [`ChooseRouteScreen.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/journal/addingestion/route/ChooseRouteScreen.kt) (`navigateToChooseRoute(substance.name)`).
    - L'utilisateur visualise de grandes fiches pour chaque voie documentée (Orale, Sublinguale, Nasale / Insufflation, Rectale, Intraveineuse, Intramusculaire...) avec leurs descriptions et les avertissements de sécurité (RDR injection).
  - **Sélecteur de voie direct sur l'écran de dosage ([`ChooseDoseScreen.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/journal/addingestion/dose/ChooseDoseScreen.kt)) :**
    - Ajout d'une rangée de puces de filtrage interactives (`FilterChip`) sous la barre de progression, permettant de basculer d'une voie à l'autre sans jamais devoir revenir en arrière.
    - Mise à jour réactive du modèle de vue ([`ChooseDoseViewModel.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/journal/addingestion/dose/ChooseDoseViewModel.kt)) : la voie sélectionnée recalcule instantanément les paliers de dosage (`roaDose`) et les unités (`mg`, `µg`, `ml`).
    - Transmission de la voie choisie au graphe de navigation ([`addIngestionGraph.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/main/navigation/graphs/addIngestionGraph.kt)) et à l'étape finale d'horodatage (`FinishIngestionRoute`).

- **2. Simulateur interactif ([`simulateur_synaptik.html`](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)) & Artefact :**
  - **Correction du bug d'initialisation :** Déclaration de la table des couleurs `ROA_COLORS` et des libellés bilingues `ROA_LABELS` (Orale, Sublinguale, Nasale, Rectale, Intraveineuse, Intramusculaire, Fumée, etc.) qui empêchait l'affichage des boutons pilules.
  - **Interface utilisateur enrichie (`#quick-roa-container`) :**
    - Conteneur stylisé avec en-tête explicite et icône d'action.
    - Boutons pilules cliquables avec pastille de couleur dédiée, libellé traduit et badge de sélection actif `✓`.
    - Clic instantané (`selectQuickRoa()`) : bascule la voie d'administration sans réinitialiser la recherche, recharge immédiatement les paliers posologiques spécifiques à la voie et adapte les unités de mesure.


---

### 25. Tri dynamique par classe : Alphabétique (A-Z) vs Puissance relative

- **1. Indice numérique de puissance relative dans la structure de données :**
  - Ajout des champs `relativePotency: Double` (puissance relative principale) et `classPotencies: Map<String, Double>` (puissance spécifique par classe thérapeutique pour les molécules multi-classes) sur les **379 substances** dans [`substances.json (FR)`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json) et [`substances.json (EN)`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json).
  - Étalonnage pharmacologique par famille :
    - **Opioïdes** (Étalon Morphine orale = `1.0x`) : *Kratom* (`0.05x`), *Codéine* (`0.15x`), *Tramadol / Dihydrocodéine* (`0.2x`), *Tapentadol* (`0.4x`), *Morphine / Hydrocodone* (`1.0x`), *Oxycodone* (`1.5x`), *Héroïne* (`2.5x`), *Méthadone* (`4.0x`), *Hydromorphone* (`5.0x`), *Oxymorphone* (`7.0x`), *Buprénorphine* (`30.0x`), *Fentanyl* (`100.0x`), *Sufentanil* (`500.0x`).
    - **Benzodiazépines & apparentés** (Étalon Diazépam 10 mg = `1.0x`) : *Chlordiazépoxide* (`0.4x`), *Oxazépam / Zolpidem* (`0.5x`), *Clorazépate / Prazépam / Zopiclone* (`0.67x`), *Diazépam / Nitrazépam* (`1.0x`), *Bromazépam* (`1.67x`), *Loprazolam / Lormétazépam* (`5.0x`), *Lorazépam / Alprazolam / Étizolam* (`10.0x`), *Clonazépam / Triazolam* (`20.0x`), *Clonazolam* (`40.0x`), *Flubromazolam* (`50.0x`).
    - **Gabapentinoïdes** (Étalon Gabapentine = `1.0x`) : *Gabapentine* (`1.0x`), *Phenibut* (`1.2x`), *Prégabaline* (`6.0x`).
    - **Antalgiques non-opioïdes** (Étalon Paracétamol = `1.0x`) : *Paracétamol* (`1.0x`), *Métamizole* (`1.5x`), *Néfopam* (`3.0x`).
    - **AINS** (Étalon Ibuprofène 400 mg = `1.0x`) : *Aspirine* (`0.5x`), *Naproxène* (`0.8x`), *Ibuprofène* (`1.0x`), *Célécoxib* (`2.0x`), *Kétoprofène / Flurbiprofène* (`4.0x`), *Diclofénac* (`8.0x`), *Piroxicam* (`20.0x`), *Méloxicam* (`26.7x`).
    - **Antidépresseurs** (Étalon Fluoxétine / Paroxétine / Citalopram 20 mg = `1.0x`) : *Moclobémide* (`0.07x`), *Bupropion* (`0.1x`), *Milnacipran / Fluvoxamine* (`0.2x`), *Venlafaxine* (`0.27x`), *Amitriptyline / Clomipramine* (`0.3x`), *Duloxétine* (`0.33x`), *Sertraline* (`0.4x`), *Mirtazapine / Miansérine* (`0.67x`), *Fluoxétine / Paroxétine / Citalopram* (`1.0x`), *Tianeptine* (`1.6x`), *Escitalopram / Vortioxétine* (`2.0x`).
    - **Antipsychotiques** (Étalon Chlorpromazine 100 mg = `1.0x`) : *Amisulpride* (`0.25x`), *Quétiapine* (`0.33x`), *Clozapine / Tiapride* (`0.5x`), *Chlorpromazine / Cyamémazine* (`1.0x`), *Loxapine* (`2.0x`), *Aripiprazole* (`6.7x`), *Olanzapine* (`10.0x`), *Halopéridol* (`20.0x`), *Rispéridone* (`25.0x`).
  - Modélisation Kotlin dans [`Substance.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/classes/Substance.kt), [`SubstanceParser.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/parse/SubstanceParser.kt), [`SubstanceModel.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/search/SubstanceModel.kt) et [`SubstanceWithCategories.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/classes/SubstanceWithCategories.kt) avec la méthode `getPotencyForCategory(categoryName)`.

- **2. Sélecteur de tri dans l'interface et tri dynamique dans les ViewModels :**
  - **Énumération [`SubstanceSortOrder`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/search/SubstanceModel.kt) :** `ALPHABETICAL` (*« Alphabétique (A-Z) »*) et `RELATIVE_POTENCY` (*« Puissance relative »*).
  - **Catalogue & Recherche par classe ([`SearchViewModel.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/search/SearchViewModel.kt) & [`SearchScreen.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/search/SearchScreen.kt)) :**
    - Ajout de `sortOrderFlow` et `onSortOrderChange(sortOrder)` dans `SearchViewModel`.
    - Barre de puces `FilterChip` permettant de basculer en 1 clic entre le tri alphabétique A-Z et le tri par puissance relative décroissante au sein de la classe filtrée.
  - **Vue dédiée d'une classe ([`CategoryViewModel.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/search/substance/category/CategoryViewModel.kt) & [`CategoryScreen.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/search/substance/category/CategoryScreen.kt)) :**
    - Affichage de toutes les molécules appartenant à la classe sélectionnée avec le sélecteur de tri dynamique (`Alphabétique (A-Z)` vs `Puissance relative`) et navigation directe vers la fiche de la substance.
  - **Badge de puissance sur chaque ligne ([`SubstanceRow.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/search/substancerow/SubstanceRow.kt)) :**
    - Affichage du badge `Puissance : Xx` adapté à la classe active sur chaque carte de molécule.
  - **Simulateur interactif ([`simulateur_synaptik.html`](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)) :**
    - Intégration de la barre de tri (`Alphabétique (A-Z)` / `⚡ Puissance relative`) dans l'onglet Catalogue, tri dynamique instantané par classe et affichage du badge `⚡ Puissance : Xx`.


---

### 26. Rubrique Dépendance et Addiction (Scores 0 à 10 : Craving & Dépendance physique)

- **1. Modélisation et renseignement des scores (0 à 10) pour les 379 molécules :**
  - Ajout de deux champs entiers (`0` à `10`) dans [`substances.json (FR)`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json), [`substances.json (EN)`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json), [`Substance.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/classes/Substance.kt) et [`SubstanceParser.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/parse/SubstanceParser.kt) :
    - **`addictionScore` (Indice d'addiction / Craving, 0 à 10) :**
      - `0/10` : Aucun craving psychologique (Paracétamol, AINS, ISRS/IRSNa, Antipsychotiques classiques, Thymorégulateurs, Triptans).
      - `1-2/10` : Craving très faible à quasi nul (Psychédéliques sérotoninergiques classiques, Modafinil, Néfopam).
      - `3-4/10` : Craving léger à modéré (Caféine `3`, Gabapentine `4`).
      - `5-6/10` : Craving modéré à marqué (Codéine/Tramadol `5`, Cannabis `5`, Prégabaline `6`, Phenibut `6`, Diazépam/Bromazépam/Clonazépam/Lorazépam `6`, Kétamine `6`, MDMA `6`, Tianeptine `6`).
      - `7-8/10` : Craving élevé (Alprazolam `7`, Amphétamine `7`, Alcool `8`, GHB/GBL `8`, Morphine `8`, Oxycodone `8`).
      - `9-10/10` : Compulsion de reconsommation maximale (Cocaïne `9`, Héroïne `9`, Fentanyl/Hydromorphone/Oxymorphone `9`, Nicotine `9`, 3-MMC/4-MMC `9`, Méthamphétamine `10`, MDPV/Alpha-PVP `10`).
    - **`physicalDependenceScore` (Indice de dépendance physique, 0 à 10) :**
      - `0/10` : Aucune dépendance physique (Paracétamol, AINS, Psychédéliques classiques).
      - `1-3/10` : Dépendance physique faible / rebond de fatigue (Stimulants `2-3`, Cannabis `2`, Caféine `2`, ISRS à demi-vie moyenne/longue `2-3`).
      - `4-5/10` : Dépendance physique modérée / syndrome d'arrêt marqué (Paroxétine/Venlafaxine `4`, Nicotine `4`, Codéine/Tramadol/Dihydrocodéine `5`, Corticoïdes `5`).
      - `6-7/10` : Dépendance physique forte — sevrage somatique sévère mais non létal chez l'adulte sain (**Opioïdes majeurs** : Morphine/Oxycodone/Hydrocodone/Buprénorphine `6`, Héroïne/Fentanyl/Hydromorphone/Oxymorphone/Méthadone `7`, Gabapentine `7`, Zolpidem/Zopiclone `7`).
      - `8/10` : Dépendance physique critique avec risque élevé de délirium / convulsions au sevrage brutal (**Prégabaline `8`**, **Phenibut `8`**, **Baclofène `8`**, Oxazépam/Prazépam/Clorazépate `8`).
      - `9-10/10` : Sevrage aigu potentiellement létal — risque vital de delirium tremens ou d'état de mal convulsif (**Alcool `10`**, **Barbituriques `10`**, **Benzodiazépines majeures / RC** : Alprazolam/Clonazépam/Lorazépam/Diazépam/Bromazépam `9`, Clonazolam/Flubromazolam `10`, GHB/GBL `9`).

- **2. Rendu visuel dans l'interface de présentation de la substance :**
  - **Application Android ([`SubstanceScreen.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/search/substance/SubstanceScreen.kt)) :**
    - Composant [`DependenceScoreGauge`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/search/substance/SubstanceScreen.kt#L788-L838) affichant le titre, le badge `X / 10`, une jauge `LinearProgressIndicator` colorée selon le niveau de risque (émeraude `0-2`, ambre `3-5`, orange `6-7`, rouge `8-10`) et le libellé clinique explicatif (`getCravingScoreDescription`, `getPhysicalDependenceScoreDescription`).
  - **Simulateur interactif ([`simulateur_synaptik.html`](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)) :**
    - Carte dédiée `#modal-dependence-box` dans la fiche descriptive de chaque molécule avec barres de progression animées, badges `X / 10` et alertes cliniques de sevrage aigu (bilingue FR/EN).


---

### 27. Sélection des formes à Libération Prolongée / Modifiée (LI / LP / LM) & Adaptation multi-vagues du graphique pharmacocinétique
* **Catalogue galénique par molécule et par laboratoire (`ReleaseProfileCatalog` & `RELEASE_PROFILES_CATALOG`)** :
  * **[`ReleaseProfile.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/classes/roa/ReleaseProfile.kt)** : Modélisation des profils de libération par superposition de vagues pharmacocinétiques (`ReleaseWave(delayHours, fraction, durationStretchFactor, plateauHours)`) avec méthode `expandToEffectLines()` pour les courbes Android (`AllTimelinesModel`).
  * **Profils spécifiques par spécialité et durée (12h vs 24h)** :
    * **Oxycodone** :
      * *LI (OxyNorm / OxyNormOro)* : `100 %` immédiat (~4–6 h).
      * *OxyContin LP 12h (AcroContin)* : Biphasique **`30 %` libéré immédiatement** + **`70 %` sur 12 h**.
      * *Générique LP 12h* : Matrice continue (`20 %` initial + `80 %` sur 12 h).
      * *LP 24h* : `15 %` initial + `85 %` sur 24 h (1 prise/jour).
    * **Méthylphénidate** :
      * *Ritaline LI* : `100 %` immédiat (3–4 h).
      * *Ritaline LP / Medikinet LM 8h* : Bimodale **`50 %` libéré immédiatement ($T=0$)** + **`50 %` libéré 4 h plus tard ($T=+4\text{ h}$)** (courbe à double pic).
      * *Quasym LP 8h* : **`30 %` immédiat** + **`70 %` prolongé**.
      * *Concerta LP OROS 12h* : **`22 %` immédiat** (enrobage externe) + **`78 %` délivré équitablement** par système osmotique sur 10–12 h.
    * **Tramadol** :
      * *LI (Topalgic / Contramal LI)* : `100 %` immédiat (5–7 h).
      * *LP 12h (Topalgic LP / Contramal LP 12h)* : 2 prises/jour (`25 %` initial + `75 %` sur 12 h).
      * *LP 24h (Monoalgic LP / Monocrixo LP 24h)* : 1 prise/jour (couverture matricielle sur 24 h).
    * **Morphine, Hydromorphone, Kétoprofène, Alprazolam & Profils génériques oraux** : *Skénan/Moscontin LP 12h* vs *Kapanol LP 24h*, *Sophidone LP 12h* vs *Jurnista LP 24h (OROS)*, *Bi-Profénid LP 12h (50/50)* vs *Profénid LP 24h*, *Xanax XR 12h*, ainsi que les profils génériques oraux (*LI 100 %*, *LP 12h 30/70*, *LP Bimodale 50/50 à +4h*, *LP Osmotique 22/78 12h*, *LP 24h*).
* **Interface Android & Simulateur Web** :
  * **[`ChooseDoseViewModel.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/journal/addingestion/dose/ChooseDoseViewModel.kt)** & **[`ChooseDoseScreen.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/journal/addingestion/dose/ChooseDoseScreen.kt)** : Sélecteur `FilterChip` des formes galéniques (`LI / LP / LM`) avec encadré détaillant la répartition cinétique des fractions libérées.
  * **[`simulateur_synaptik.html`](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)** : Sélecteur `#quick-release-container` lors de l'ajout d'une prise, badge `⏱ LP/LM` dans l'historique des prises de la journée, et moteur graphique multi-vagues dans `drawTimeline()` adaptant automatiquement la forme du dôme (double pic bimodal à $+4\text{ h}$, plateau biphasique 12 h ou 24 h) et l'horizon temporel de l'axe X.


---

### 28. Harmonisation des équivalences morphiniques, de la biodisponibilité et des dosages opioïdes (Étalons Oxycodone PO & Morphine IV)
* **Correction des incohérences de biodisponibilité et d'équianalgésie dans [`raw-fr/substances.json`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json) & [`raw/substances.json`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json)** :
  1. **Étalon de référence Oral — Oxycodone PO** (*biodisponibilité `60–87 %`, moyenne ~75–80 %*) :
     * Paliers per os : `Seuil : 2,5 mg` | `Léger : 5 mg` | `Commun : 10 mg` | `Fort : 25 mg` | **`Très fort (Heavy) : 40 mg`**.
  2. **Correction de la Morphine Orale & Étalon de référence Intraveineux — Morphine IV** :
     * **Morphine Orale** (*biodisponibilité corrigée à `20–30 %` en raison de l'important effet de premier passage hépatique, soit une puissance orale ~1,5× à 2× inférieure à l'Oxycodone*) : `Seuil : 5 mg` | `Léger : 10 mg` | `Commun : 20 mg` | `Fort : 40 mg` | **`Très fort (Heavy) : 70 mg`** (*fourchette de 60 à 80 mg, au lieu de 30 mg auparavant*).
     * **Morphine IV (Étalon IV, biodisponibilité `100 %`)** : `Seuil : 1,5 mg` | `Léger : 2,5 mg` | `Commun : 5 mg` | `Fort : 10 mg` | **`Très fort (Heavy) : 15 mg`**.
  3. **Alignement des autres opioïdes selon leurs ratios de puissance relative et leur biodisponibilité par voie** :
     * **Hydromorphone** (*correction de l'incohérence majeure où l'oral et l'IV avaient les mêmes paliers malgré une biodisponibilité orale de `20–25 %` contre `100 %` en IV et `50–60 %` en intranasal*) :
       * *Orale (~5× Morphine PO)* : `Léger : 2 mg` | `Commun : 4 mg` | `Fort : 8 mg` | **`Heavy : 12 mg`**.
       * *Intraveineuse (~7,5× Morphine IV)* : `Léger : 0,3 mg` | `Commun : 0,75 mg` | `Fort : 1,5 mg` | **`Heavy : 2 mg`** (*au lieu de 6 mg*).
       * *Insufflée / Nasale (~55 %)* : `Léger : 1 mg` | `Commun : 2 mg` | `Fort : 4 mg` | **`Heavy : 6 mg`**.
     * **Fentanyl** (*~100× Morphine IV, différenciation par biodisponibilité de voie au lieu de valeurs identiques*) :
       * *Intraveineuse (100 %)* : `Léger : 15 µg` | `Commun : 35 µg` | `Fort : 75 µg` | **`Heavy : 120 µg`**.
       * *Insufflée (75–89 %)* : `Léger : 20 µg` | `Commun : 45 µg` | `Fort : 90 µg` | **`Heavy : 140 µg`**.
       * *Sublinguale / Transmuqueuse (50–65 %)* : `Léger : 25 µg` | `Commun : 60 µg` | `Fort : 110 µg` | **`Heavy : 175 µg`**.
     * **Codéine & Dihydrocodéine** :
       * *Codéine Orale (~0,15× Morphine PO, biodisponibilité `70–90 %`, plafond CYP2D6 / relargage histaminique)* : `Léger : 30 mg` | `Commun : 75 mg` | `Fort : 150 mg` | **`Heavy : 240 mg`**.
       * *Dihydrocodéine Orale (~0,20× Morphine PO)* : `Léger : 30 mg` | `Commun : 60 mg` | `Fort : 120 mg` | **`Heavy : 180 mg`**.
     * **Oxymorphone, Hydrocodone, Héroïne, Méthadone, Acétylfentanyl & Sufentanil** : Harmonisés sur les mêmes étalons PO et IV.
  4. **Conservation stricte des paliers PsychonautWiki pour les opioïdes à risques toxiques particuliers (non-opioïdes)** :
     * **Tramadol** : Paliers PsychonautWiki conservés (**`Heavy oral = 300 mg`**, `Léger : 25 mg`, `Commun : 100 mg`, `Fort : 250 mg`) en raison du **risque convulsif majeur** et du **syndrome sérotoninergique** dès 300–400 mg.
     * **Tapentadol** : Paliers PsychonautWiki conservés (**`Heavy oral = 150 mg`**, `Léger : 12,5 mg`, `Commun : 50 mg`, `Fort : 75 mg`) en raison de la **toxicité noradrénergique, délirante et pro-convulsivante** à forte dose.
* **Modélisation Kotlin ([`OpioidEquianalgesicReference.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/classes/roa/OpioidEquianalgesicReference.kt))** :
  * Classe [`OpioidEquianalgesicProfile`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/classes/roa/OpioidEquianalgesicReference.kt#L3-L13) et singleton [`OpioidEquianalgesicReference`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/classes/roa/OpioidEquianalgesicReference.kt#L15-L115) référençant les étalons PO/IV, les ratios de puissance, les fourchettes de biodisponibilité et le drapeau `preservesPsychonautWikiThresholdsForAtypicalToxicity`.


---

### 29. Pondération de la hauteur des courbes selon la puissance pharmacologique intrinsèque de la molécule
* **Problème corrigé** : Auparavant, la hauteur de chaque courbe était calculée uniquement par le ratio linéaire `dose / heavyMin` propre à chaque molécule. Ainsi, `1000 mg` de Paracétamol (dose maximale = `100 %` de son plafond) s'affichait tout en haut du graphique (`1.00`), alors que `5 à 10 mg` de Morphine orale (`lightMin = 10 mg`, `heavyMin = 70 mg`) s'affichaient tout en bas (`0.07` à `0.14`).
* **Nouveau modèle d'amplitude (`tierResponse × substancePowerFactor`)** implémenté dans [`getStrengthRelativeToCommonDose.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/journal/experience/components/getStrengthRelativeToCommonDose.kt), [`ExperienceViewModel.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/journal/experience/ExperienceViewModel.kt) et [`simulateur_synaptik.html`](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html) :
  1. **Interpolation par paliers cliniques (`computeTierResponse`)** : Associe chaque palier (`threshold` $\rightarrow 0.42$, `lightMin` $\rightarrow 0.56$, `commonMin` $\rightarrow 0.74$, `strongMin` $\rightarrow 0.88$, `heavyMin` $\rightarrow 1.00$) afin qu'une dose légère/normale ne soit pas écrasée visuellement.
  2. **Facteur de puissance pharmacologique intrinsèque (`getSubstancePharmacologicalPowerFactor`)** :
     * **Antalgiques périphériques non-opioïdes / AINS / Antispasmodiques** : Plafond d'intensité bas (`Paracetamol` : **`0.18`**, `Phloroglucinol` : **`0.12`**, `Aspirin` : **`0.18`**, `Ibuprofen` : **`0.22`**, `Ketoprofen` : **`0.25`**). Ainsi, **1 g de Paracétamol** (dose max) culmine à **`0.18`** (et 500 mg à `0.11`).
     * **Antalgiques centraux & Opioïdes faibles (Palier II)** : `Nefopam` (**`0.42`**), `Codeine` / `Dihydrocodeine` / `Tramadol` (**`0.73–0.76`**).
     * **Opioïdes majeurs (Palier III) & Psychoactifs puissants** : Pondérés selon $\text{clamp}(1.05 + 0.12 \log_{10}(\text{relativePotency}), 0.65, 1.35)$ (`Morphine` : **`1.05`**, `Oxycodone` : **`1.12`**, `Hydromorphone` : **`1.20`**, `Fentanyl` : **`1.30`**).
     * **Résultat comparatif sur le graphique** :
       * `1000 mg` de **Paracétamol** (dose max) $\rightarrow$ hauteur **`0.18`**
       * `5 mg` de **Morphine orale** $\rightarrow$ hauteur **`0.44`** (**~2,5× plus haut que 1 g de Paracétamol**)
       * `10 mg` de **Morphine orale** $\rightarrow$ hauteur **`0.59`** (**~3,3× plus haut que 1 g de Paracétamol**)
       * `20 mg` de **Morphine orale** $\rightarrow$ hauteur **`0.78`** (**~4,3× plus haut que 1 g de Paracétamol**)
       * `10 mg` d'**Oxycodone orale** $\rightarrow$ hauteur **`0.83`**


---

### 30. Lissage C¹ des courbes pharmacocinétiques, différenciation galénique par marque (OxyContin LP vs Oxycodone LP Générique), addition des courbes d'une même molécule et cumul des prises dans l'historique
* **Correction visuelle et mathématique des courbes (`evalSmoothWave`)** :
  * Suppression de la discontinuité d'amplitude (`1.00` $\rightarrow$ `0.92`) entre la fin de la montée et le début du plateau qui donnait un décroché anguleux aux courbes.
  * Pour les formes à libération immédiate (`LI`, `plateauMin = 0`), la montée et la descente forment une cloche pharmacocinétique continue et lisse ($\sin^2$ puis $\cos^2$ à dérivée nulle au sommet).
  * Pour les formes à libération prolongée (`LP`, `plateauMin > 0`), le raccord entre la montée, le dôme du plateau ($1.0 + 0.035 \sin(\tau \pi)$) et la descente est $C^1$-continu sans aucune cassure.
* **Différenciation franche des profils LP selon la marque / galénique** ([`ReleaseProfile.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/classes/roa/ReleaseProfile.kt) & [`simulateur_synaptik.html`](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)) :
  * **OxyContin LP 12h (*AcroContin biphasique : 30 % LI + 70 % LP*)** : La fraction immédiate (30 %) provoque une montée rapide dès 20–30 min et un **pic initial ("high") nettement plus haut vers +1h15–1h30** (`~0,82 × doseRatio`), suivi d'un plateau prolongé jusqu'à 12 h.
  * **Oxycodone LP Générique 12h (*Matrice continue lente sans dose immédiate*)** : Aucune fraction immédiate ; la montée est **beaucoup plus lente** (`onsetScale: 1.8`, `riseScale: 2.8`, mettant **3 à 4 h** pour atteindre son plateau), sans pic initial et avec une hauteur de plateau plus basse (`~0,52 × doseRatio`) étalée sur 12 h.
  * Même distinction appliquée entre *Ritaline LP / Medikinet LM* (double pic franc 50 % à $T=0$ + 50 % à $+4\text{ h}$), *Quasym LP* (30 % LI + 70 % LP culminant l'après-midi), *Concerta LP OROS* (22 % LI + rampe osmotique 78 % sur 12 h), *Bi-Profénid LP 12h* (bicouche 50/50) vs *Profénid LP 24h*, et *Tramadol LP 12h* vs *LP 24h*.
* **Addition des courbes de la même molécule sur le graphique** ([`AllTimelinesModel.kt`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/journal/experience/timeline/AllTimelinesModel.kt) & `drawTimeline()` dans [`simulateur_synaptik.html`](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)) :
  * Toutes les prises d'une même molécule (`substanceName`) sont désormais **additionnées** à chaque instant $t$ en **une seule courbe cumulée par molécule** ($\text{Effect}_{\text{cumul}}(t) = \sum_i \text{Effect}_i(t)$) au lieu de superposer plusieurs courbes de la même couleur.
* **Cumul automatique des dosages dans l'historique des prises (`logIngestion()` & `renderIngestions()`)** :
  * Lorsque l'utilisateur enregistre plusieurs prises de la **même molécule**, par la **même voie** et avec la **même forme/marque de délivrance** (`releaseProfileId`), la ligne correspondante dans **Prises de la journée** cumule automatiquement le dosage total (ex. `40 mg` avec badge `∑ Cumul 2 prises (20mg + 20mg)`) et recalcule le palier de dose sur le total cumulé, tout en conservant l'horaire exact de chaque sous-prise pour l'addition sur le graphique.


---

## 31. Pourcentage d'effet actif vs High (Courbes d'effet) & Pourcentage restant dans le corps (Prises de la journée)

### Objectif
Afficher deux indicateurs pharmacocinétiques et pharmacodynamiques complémentaires directement à droite du grammage :
1. **Dans « Courbes d'effet en temps réel »** (à droite du grammage dans la légende et sur le badge de la courbe) : afficher le **pourcentage de l'effet actuel vis-à-vis du pic maximal (« high ») des effets** (`activeEffectPctVsHigh = Math.round((effAtRef / grp.peakVal) * 100)`). Par exemple, si l'effet instantané est à `40%` de sa puissance maximale, affiche `40%`.
2. **Dans « Prises de la journée »** (à droite du grammage dans l'historique des prises) : afficher le **pourcentage de la molécule qu'il reste encore dans le corps** (fraction non éliminée / encore active via `getRemainingBodyPercentage(ing)`). Par exemple, si `70%` de la molécule est éliminée ou inactive, affiche `30%`.

### Fichiers modifiés
- [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)
- [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html)


---

## 32. Adaptation Dynamique de la Hauteur du Graphique (Axe Y) sur la Molécule la Plus Forte / la Plus Dosée

### Objectif
Faire en sorte que l'échelle verticale (axe Y) du graphique s'adapte dynamiquement au sommet (`maxPeakOnGraph` / `maxGroupHeight`) de la molécule la plus forte ou la plus dosée présente sur le graphique :
- **Si une seule molécule est présente** (même à faible dose ou de faible puissance intrinsèque, comme `1 g` de Paracétamol ou une prise isolée en LP), sa courbe occupe désormais **100 % de la hauteur utile du graphique** au lieu de rester écrasée en bas.
- **Si plusieurs molécules sont présentes**, la molécule ayant le pic pondéré le plus élevé occupe **100 % de la hauteur utile** (`100% (Max)`), et les autres courbes sont mises à l'échelle proportionnellement par rapport à cette molécule dominante.

### Fichiers modifiés
- [AllTimelinesModel.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/journal/experience/timeline/AllTimelinesModel.kt)
- [GroupDrawable.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/journal/experience/timeline/drawables/GroupDrawable.kt)
- [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)
- [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html)


---

## 33. Adaptation Dynamique de l'Indice d'Addiction (Craving) selon la Voie d'Administration (ROA)

### Objectif
Permettre à l'**Indice d'addiction (Craving, 0 à 10)** de changer dynamiquement en fonction de la **voie d'administration sélectionnée** (`selectedRoaRoute` / `selectedModalRoaName`) afin de ne plus biaiser la note par la seule voie IV ou par une moyenne trompeuse :
- **Par voie orale (`oral`)** :
  - **Oxycodone** : `8/10` (biodisponibilité orale élevée de 60–87 % et euphorie orale marquée) > **Morphine orale** (`7/10`, biodisponibilité de 20–30 %) et **Hydromorphone orale** (`7/10`, profil oral plus froid/sédatif).
- **Par voie intraveineuse (`intravenous`) / fumée (`smoked`) / nasale (`insufflated`)** :
  - **Hydromorphone** : `7/10` (Orale) → `8/10` (Rectale) → `9/10` (Nasale/IM/SC) → **`10/10` (IV)** (rush IV fulgurant et durée courte de 2–3h générant un craving de réinjection maximal).
  - **Héroïne** : `7/10` (Orale) → `8/10` (Rectale) → `9/10` (Nasale/IM) → **`10/10` (Fumée / IV)**.
  - **Fentanyl** : `7/10` (Patch transdermique / Orale) → `9/10` (Sublinguale / Nasale) → **`10/10` (Fumé / IV)**.
  - **Oxycodone** : `8/10` (Orale / Sublinguale / Rectale) → `9/10` (Nasale / IV).
  - **Morphine** : `7/10` (Orale) → `8/10` (Rectale / Nasale / IM / SC) → `9/10` (IV).
  - **Cocaïne** : `6/10` (Orale) → `9/10` (Nasale) → **`10/10` (Fumée Crack / IV)**.
  - **Méthylphénidate** : `6/10` (Orale) → `8/10` (Nasale) → `9/10` (IV).
- Ajout de pastilles comparatives interactives (`Par voie : Orale : 7/10 • Nasale : 9/10 • IV : 10/10`) sous la jauge de craving permettant de comparer et basculer d'une voie à l'autre en un clic.

### Fichiers modifiés
- [Roa.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/classes/roa/Roa.kt)
- [Substance.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/classes/Substance.kt)
- [SubstanceParser.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/parse/SubstanceParser.kt)
- [SubstanceScreen.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/search\substance\SubstanceScreen.kt)
- [raw-fr/substances.json](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json)
- [raw/substances.json](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json)
- [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)
- [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html)


---

## 34. Affichage et Renseignement Systématique de la Biodisponibilité par Voie d'Administration

### Objectif
Permettre d'indiquer et d'afficher clairement la **biodisponibilité systémique (%)** pour **chaque moyen d'administration** lorsque celui-ci est documenté médicalement, au lieu de n'avoir que la voie orale :
1. **Enrichissement de la base de données (`substances.json` FR & EN)** :
   - Renseignement des pourcentages de biodisponibilité pour les différentes voies :
     - **Opioïdes** :
       - *Oxycodone* : Orale (`60–87 %`), Sublinguale (`60–80 %`), Nasale (`50–70 %`), Rectale (`60–80 %`), Fumée (`30–50 %`), IV (`100 %`).
       - *Morphine* : Orale (`20–30 %`), Sublinguale (`18–25 %`), Nasale (`15–30 %`), Rectale (`35–70 %`), IM (`85–100 %`), SC (`80–100 %`), IV (`100 %`).
       - *Hydromorphone* : Orale (`20–25 %`), Nasale (`50–60 %`), Rectale (`35–50 %`), IM (`85–100 %`), IV (`100 %`).
       - *Oxymorphone* : Orale (`10–15 %`), Nasale (`40–45 %`), Rectale (`10–15 %`), IV (`100 %`).
       - *Héroïne* : Orale (`30–40 %`), Nasale (`50–60 %`), Fumée (`50–60 %`), Rectale (`50–70 %`), IM (`85–100 %`), IV (`100 %`).
       - *Fentanyl* : Transdermique (`90–95 %`), Sublinguale (`50–65 %`), Buccale (`65–75 %`), Nasale (`75–89 %`), Fumée (`55–70 %`), IV (`100 %`).
       - *Buprenorphine* : Orale (`10–15 %`), Sublinguale (`30–35 %`), Buccale (`45–55 %`), Nasale (`45–55 %`), Rectale (`50–60 %`), Transdermique (`50–60 %`), IV (`100 %`).
       - *Codéine* : Orale (`70–90 %`), Rectale (`80–90 %`), IM/IV (`100 %`).
       - *Méthadone* : Orale (`80–90 %`), Rectale/Nasale (`75–85 %`), IV (`100 %`).
     - **Stimulants & Autres** :
       - *Cocaïne* : Orale (`30–35 %`), Nasale (`60–80 %`), Fumée/Crack (`70–80 %`), Rectale (`60–70 %`), IV (`100 %`).
       - *Amphétamine / D-Amphétamine* : Orale (`75–85 %`), Nasale (`75–85 %`), Rectale (`90–95 %`), IV (`100 %`).
       - *Méthamphétamine* : Orale (`65–70 %`), Nasale (`79 %`), Fumée (`70–90 %`), Rectale (`90–95 %`), IV (`100 %`).
       - *Méthylphénidate* : Orale (`11–52 %`, moy. `30 %`), Sublinguale (`30–40 %`), Nasale (`60–70 %`), Rectale (`60–75 %`), IV (`100 %`).
       - *MDMA* : Orale (`80–90 %`), Nasale (`70–80 %`), Rectale (`80–90 %`), IV (`100 %`).
       - *Kétamine* : Orale (`15–20 %`), Sublinguale (`20–30 %`), Nasale (`45–50 %`), Rectale (`25–35 %`), IM (`90–93 %`), IV (`100 %`).
       - *Nicotine* : Transdermique (`80–90 %`), Sublinguale/Gommes (`50–60 %`), Fumée/Vapotée (`80–90 %`), Nasale (`60–70 %`), Orale (`20–40 %`).
       - *Benzodiazépines* (Diazépam `95–100 %`, Alprazolam `85–92 %`, Lorazépam `90–95 %`, Midazolam oral `35–50 %` vs sublingual `70–75 %` vs nasal `55–75 %`).
     - Règle universelle appliquée : toute administration par voie **Intraveineuse (IV)** bénéficie de `100 %` de biodisponibilité par définition pharmacologique.
2. **Interface utilisateur (Android & Simulateur Web)** :
   - Affichage d'un badge de biodisponibilité stylisé directly sur chaque pastille/sélecteur de voie (`Orale ⚡ 60-87%`, `Nasale ⚡ 50-70%`, `IV ⚡ 100%`).
   - Badge mis en valeur dans l'en-tête de la section Posologie/Doses (`⚡ Biodisp. 60 à 87%`).
   - Mention du pourcentage dans la légende des voies sous les graphiques de cinétique et dans les sélecteurs de prise rapide.

### Fichiers modifiés
- [SubstanceScreen.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/search/substance/SubstanceScreen.kt)
- [raw-fr/substances.json](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json)
- [raw/substances.json](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json)
- [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)
- [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html)


---

## 35. Retrait des Benzodiazépines de la Catégorie « Anxiolytiques (non-benzo) »

### Objectif
Séparer strictement les benzodiazépines de la catégorie **« Anxiolytiques (non-benzo) »** (`anxiolytic`) afin que cette catégorie ne contienne plus que les anxiolytiques non benzodiazépiniques :
1. **Nettoyage des 20 benzodiazépines** qui contenaient encore l'étiquette `anxiolytic` :
   - *Alprazolam*, *Bromazepam*, *Chlordiazepoxide*, *Cinolazepam*, *Clobazam*, *Clonazepam*, *Clorazepate*, *Clotiazepam*, *Diazepam*, *Estazolam*, *Flunitrazepam*, *Loprazolam*, *Lorazepam*, *Lormetazepam*, *Midazolam*, *Nitrazepam*, *Oxazepam*, *Prazepam*, *Temazepam*, *Triazolam*.
   - Ces molécules restent répertoriées dans la catégorie dédiée **Benzodiazépines** (`benzodiazepine`).
2. **Composition finale de la catégorie « Anxiolytiques (non-benzo) » (8 molécules)** :
   - *Buspirone*, *Cyamémazine* (Tercian), *Étifoxine* (Stresam), *Guanfacine*, *Hydroxyzine* (Atarax), *Phénelzine*, *Prégabaline*, *Propranolol*.

### Fichiers modifiés
- [raw-fr/substances.json](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json)
- [raw/substances.json](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json)
- [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)
- [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html)


---

## 36. Correction et Reclassification des Molécules Mal Étiquetées

### Objectif
Auditer et corriger les erreurs de classification pharmacologique héritées de l'indexation brute de PsychonautWiki :
1. **Buspirone** :
   - *Retrait* : `psychedelic` (la buspirone est un agoniste partiel $5\text{-HT}_{1\text{A}}$ sans affinité $5\text{-HT}_{2\text{A}}$, sans aucun effet hallucinogène/psychédélique).
   - *Maintien* : `anxiolytic` (Anxiolytiques non-benzo).
2. **Mémantine** :
   - *Retrait* : `deliriant` (la mémantine est un antagoniste NMDA dissociatif/nootropique sans composante anticholinergique centrale type scopolamine/datura).
   - *Maintien / Ajout* : `dissociative`, `nootropic`.
3. **Salvinorine A** :
   - *Retrait* : `deliriant`, `depressant` (la salvinorine A est un agoniste sélectif des récepteurs opioïdes Kappa [KOR], hallucinogène atypique/dissociatif intense, et non un dépresseur sédatif ni un délirigène anticholinergique).
   - *Maintien* : `dissociative`, `hallucinogen`.
4. **Datura** (Stramoine / Alcaloïdes tropaniques) :
   - *Retrait* : `depressant` (anticholinergique pur antimuscarinique provoquant tachycardie, hyperthermie, agitation et délire aigu, à l'opposé d'un dépresseur du SNC).
   - *Maintien* : `deliriant`.
5. **Bromantane** (Ladasten) :
   - *Retrait* : `depressant` (l'adamantane est un psychostimulant actoprotecteur et nootropique stimulant la synthèse de dopamine, et non un dépresseur du SNC).
   - *Maintien / Ajout* : `stimulant`, `nootropic`, `anxiolytic`.
6. **Nicotine** :
   - *Retrait* : `depressant` (agoniste nicotinique stimulant la libération d'adrénaline et de dopamine, psychostimulant et nootropique).
   - *Maintien* : `stimulant`, `nootropic`.
7. **Ibogaïne** :
   - *Retrait* : `opioid`, `depressant` (alcaloïde indolique psychédélique, dissociatif et anti-addictif agissant sur NMDA/sigma/sérotonine, ne provoquant ni analgésie ni dépression respiratoire opioïde).
   - *Maintien* : `psychedelic`, `dissociative`.
8. **Benzydamine** :
   - *Retrait* : `stimulant` (AINS / analgésique topique à effets délirigènes à forte dose, non stimulant).
   - *Maintien / Ajout* : `deliriant`, `nsaid`, `analgesic`.
9. **Néfopam** (Acupan) :
   - *Retrait* : `stimulant` (antalgique central non-opioïde inhibiteur de recapture, sans usage psychostimulant).
   - *Maintien* : `analgesic`.
10. **Éfavirenz** (Sustiva) :
    - *Retrait* : `psychedelic` (antirétroviral inhibiteur non nucléosidique de la transcriptase inverse du VIH, provoquant parfois des cauchemars mais n'étant pas un psychédélique récréatif).

### Fichiers modifiés
- [raw-fr/substances.json](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json)
- [raw/substances.json](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json)
- [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)
- [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html)
- [MODIFICATIONS.md](file:///c:/Users/droll/Desktop/synaptik%20journal/MODIFICATIONS.md)


---

## 37. Traduction Intégrale en Français de Toutes les Fiches Molécules (Résolution des Textes en Anglais)

### Objectif
Traduire intégralement en français médical rigoureux tous les champs descriptifs qui subsistaient en anglais dans la base de données francophone ([raw-fr/substances.json](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json)) :
1. **Résumés de présentation (`summary`)** :
   - *Salvinorine A* : Traduction complète et détaillée (alcaloïde diterpénique de la *Salvia divinorum*, agoniste sélectif KOR, cinétique et caractéristiques de l'expérience dissociative/onirogène).
   - *Bromazolam*, *Flunitrazolam*, *LSZ*, *Triazolam*.
2. **Effets subjectifs et cliniques (`effectsSummary`)** :
   - Traduction pour *Bipéridène*, *Cyamémazine*, *Disulfirame*, *Lévétiracétam*, *Métamizole*, *Néfopam*, *Oxcarbazépine*, *Phénelzine*, *Sumatriptan*, *Valproate*, *Venlafaxine*.
3. **Remarques posologiques (`dosageRemark`)** :
   - *Mescaline* (variabilité selon les cactus et espèces).
4. **Risques généraux et à long terme (`generalRisks` et `longtermRisks`)** :
   - Traduction intégrale pour l'ensemble des molécules médicamenteuses et substances (AINS, benzodiazépines, neuroleptiques, antidépresseurs ISRS/IRSNa/tricycliques, barbituriques, agonistes dopaminergiques, etc.).
   - Le scan de vérification confirme désormais **0 champ résiduel en anglais** sur l'ensemble des 379 fiches de la base française.

### Fichiers modifiés
- [raw-fr/substances.json](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json)
- [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)
- [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html)
- [MODIFICATIONS.md](file:///c:/Users/droll/Desktop/synaptik%20journal/MODIFICATIONS.md)


---

## 38. Défilement Intégral sans Limite dans la Liste des Molécules (Toutes & Catégories)

### Objectif
Permettre à l'utilisateur de **faire défiler la liste des molécules jusqu'au bout sans aucune restriction artificielle** (`list.slice(0, 60)` supprimé) :
1. **Suppression du plafond de 60 molécules dans le simulateur web** :
   - L'affichage précédent tronquait la liste à 60 molécules (`list.slice(0, 60)`) en affichant un message bloquant.
   - Désormais, **l'intégralité des 379 molécules** s'affiche en continu dans l'onglet « Toutes », ainsi que l'ensemble complet des molécules de chaque catégorie (ex. les 94 psychédéliques, les 85 sédatifs, les 80 stimulants, etc.).
   - Un marqueur élégant `✓ 379 molécules affichées • Fin de la liste` est apposé tout en bas.
   - Ajout d'une marge de défilement inférieure (`pb-16`) pour que les dernières cartes ne soient jamais masquées par la barre de navigation.
2. **Optimisation Android Compose (`SearchScreen.kt` & `CategoryScreen.kt`)** :
   - Ajustement du `contentPadding` de la `LazyColumn` à `PaddingValues(top = 8.dp, bottom = 80.dp)` pour garantir que le défilement jusqu'au dernier élément sur mobile laisse toujours la dernière molécule entièrement dégagée au-dessus de la barre de navigation.

### Fichiers modifiés
- [SearchScreen.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/search/SearchScreen.kt)
- [CategoryScreen.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/search/substance/category/CategoryScreen.kt)
- [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)
- [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html)
- [MODIFICATIONS.md](file:///c:/Users/droll/Desktop/synaptik%20journal/MODIFICATIONS.md)


---

## 39. Harmonisation Pharmacologique des Scores d'Addiction (Craving) & Easter Egg 11/10 pour l'A-PVP

### Objectif
Réajuster et harmoniser l'intégralité de l'échelle d'addiction / craving psychologique (`addictionScore`) pour éliminer les distorsions d'échelle entre les familles pharmacologiques (éviter qu'une prise orale de Morphine soit notée plus addictive que la 3-MMC ou l'héroïne orale) et intégrer un **Easter egg exclusif attribuant 11 / 10 à la molécule la plus compulsive de l'application : l'A-PVP (Flakka)**.

### Principes Pharmacologiques & RDR appliqués
1. **Dissociation nette entre Dépendance Somatique et Craving / Compulsion** :
   - *Dépendance physique (`physicalDependenceScore`)* : Reste concentrée sur le syndrome de sevrage somatique avec risque vital ou sévère (Alcool à 10, Barbituriques à 10, GBL/GHB à 9, Benzodiazépines fortes à 9-10, Prégabaline à 8, Opioïdes majeurs à 6-7, Stimulants à 2-3, Psychédéliques à 0).
   - *Craving / Indice d'addiction (`addictionScore`)* : Reflète la compulsion psychologique de redosage immédiat, le bingeing et l'intensité du flash/rush dopaminergique.
2. **Échelonnement cohérent inter-familles** :
   - **Sommet absolu / Easter Egg (11/10)** : `A-PVP` (Flakka) — base 11 (voie fumée/IV : 11, sniff : 10, orale : 9). Jauge néon cramoisi (`#ff0055`), badge clignotant `11 / 10 🚨 (Easter Egg : Hors-échelle)`.
   - **Compulsions extrêmes (9 à 10/10)** : `A-PHP` (base 9, sniff/fumée 10), `MDPV` (base 9, sniff/fumée 10), `Cocaïne` (base 7, fumée/crack 10, IV 10), `Méthamphétamine` (base 8, fumée 10, IV 10).
   - **Cathinones de synthèse (5 à 8/10)** :
     - `3-MMC` : base 6 (oral 6, sniff 8, IV 9).
     - `Méphédrone (4-MMC)` : base 7 (oral 7, sniff 8, rectal 8, IV 9).
     - `NEP` / `N-Éthylhexédrone` : base 7 (oral 6, sniff 8, fumé 9).
     - `Méthylone`, `Butylone`, `Éthylone`, `Mexédrone` : base 5 (oral 5, sniff 6).
   - **Opioïdes (3 à 7/10 en base)** :
     - `Fentanyl`, `Sufentanil`, `Héroïne` : base 7 (orale 5, sniff 8, fumée/IV 10).
     - `Oxycodone` : base 7 (orale 7, sniff 8, IV 9).
     - `Hydromorphone`, `Oxymorphone`, `Hydrocodone` : base 6 (orale 5-6, sniff 7-8, IV 10).
     - `Morphine` : base 5 (orale 5, sniff 6, IV 9). *Résout l'incohérence : la morphine orale (5) est désormais bien inférieure à la 3-MMC sniffée (8) ou orale (6).*
     - `Méthadone` : base 5.
     - `Codéine`, `Tramadol`, `Opium` : base 4.
     - `Kratom` : base 3.
   - **Stimulants classiques** :
     - `Amphétamine` : base 6 (orale 6, sniff 7, IV 9).
     - `Méthylphénidate` : base 5 (oral 5, sniff 7, IV 8).
     - `MDMA`, `MDA`, `5-MAPB`, `6-APB` : base 5 (oral 5, sniff 6).
     - `Nicotine` : base 7 (inhalée/fumée 8, orale 4, patch 3).
     - `Caféine` : base 3.
     - `Modafinil`, `Bromantane` : base 2.
   - **Sédatifs, Alcool & Benzodiazépines** :
     - `GHB` / `GBL` / `1,4-BDO` : base 8 (compulsion redosage horaire).
     - `Alcool` : base 7.
     - `Alprazolam`, `Clonazolam`, `Flualprazolam` : base 7.
     - `Clonazépam`, `Lorazépam`, `Midazolam`, `Zolpidem` : base 6.
     - `Diazépam`, `Oxazépam`, `Prégabaline` : base 5.
   - **Dissociatifs** :
     - `Kétamine` : base 5 (sniff 5, IM/IV 6, oral 3).
     - `PCP` : base 6 (sniff 6, fumé 7).
     - `DXM` : base 3.
     - `Protoxyde d'azote` : base 5 (compulsion de redose en séance).
   - **Psychédéliques (Craving 0 à 1, Dépendance somatique 0)** :
     - Correction d'anomalies majeures : `Ibogaine` (était à 8, corrigée à 0 addiction / 0 physique), `Psilocine` (était à 6, corrigée à 1), `Ayahuasca` (corrigée à 1).
     - `LSD`, `Psilocybine`, `DMT`, `Mescaline`, `Salvinorine A` : score 0 ou 1.
     - `2C-B` : score 3 (oral 3, sniff 4).
     - `aMT` : score 5 (hybride psychédélique / SNDRA libérateur de monoamines).
   - **Médicaments non-psychoactifs & AINS** :
     - `Paracétamol`, `Ibuprofène`, `Aspirine`, `Kétoprofène`, `Diclofénac`, `Phloroglucinol`, `Prednisolone` : score 0.
     - `Néfopam` : score 2.

3. **Prise en charge de la note 11 dans le code applicatif** :
   - Mise à jour du parsing Android (`SubstanceParser.kt`) : déplafonnement de `coerceIn(0, 10)` à `coerceIn(0, 11)` pour `addictionScore` global et par ROA.
   - Mise à jour du modèle (`Substance.kt`) : support d'un plafond à 11 pour l'A-PVP dans `getAddictionScoreForRoute`.
   - UI Android (`SubstanceScreen.kt`) : affichage d'un badge distinctif `11 / 10 🚨 (Easter Egg)` avec jauge néon cramoisi (`0xFFFF0055`) et description personnalisée.
   - Simulateur web (`build_bilingual_simulator.py`) : intégration de la couleur `#ff0055`, du badge clignotant `11 / 10 🔥 (Easter Egg)` et de la description RDR bilingue.

### Fichiers modifiés
- [substances.json (FR)](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json)
- [substances.json (EN)](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json)
- [SubstanceParser.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/parse/SubstanceParser.kt)
- [Substance.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/classes/Substance.kt)
- [SubstanceScreen.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/search/substance/SubstanceScreen.kt)
- [build_bilingual_simulator.py](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/scratch/build_bilingual_simulator.py)
- [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)
- [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html)
- [MODIFICATIONS.md](file:///c:/Users/droll/Desktop/synaptik%20journal/MODIFICATIONS.md)


---

## 40. Intégration Complète des Cathinones Courantes Manquantes (4-MMC, 2-MMC, 3-CMC, 4-CMC, etc.) en Français et Anglais

### Objectif
Répondre à la forte demande en RDR en intégrant l'ensemble des cathinones de synthèse et naturelles courantes en Europe et à l'international qui manquaient ou étaient mal référencées dans la base de données, avec **100% des données cliniques, posologiques, cinétiques, d'interactions et de RDR intégralement disponibles en français et en anglais**.

### Molécules Ajoutées et Mises à Jour (Total : 388 substances)
1. **4-MMC (Méphédrone / 4-Methylmethcathinone)** :
   - Renommage du titre principal de `Mephedrone` vers `4-MMC` afin d'apparaître directement aux côtés de la `2-MMC` et de la `3-MMC` dans l'ordre alphabétique et les recherches.
   - Préservation des alias complets dans `commonNames` : `["4-MMC", "Méphédrone", "Mephedrone", "4-Methylmethcathinone", "Drone", "M-CAT", "Meow Meow", "Miaou Miaou"]`.
   - Ajout des champs manquants en anglais et français (`dosageRemark`, `longtermRisks`).
   - AddictionScore : **7/10** (voie fumée/IV : 9-10, sniff : 8, oral : 7), Dépendance physique : **2/10**.

2. **2-MMC (2-Méthylméthcathinone / 2-Methylmethcathinone)** :
   - Substitut stimulant majeur de la 3-MMC post-interdiction (profil principalement dopaminergique et noradrénergique NDRA/NDRI, très peu sérotoninergique).
   - Données complètes pour les voies orale (30-220+ mg), nasale (15-110+ mg) et rectale (25-160+ mg).
   - AddictionScore : **6/10** (sniff : 7, oral : 6), Dépendance physique : **2/10**.

3. **3-CMC (3-Chlorométhcathinone / Clophedrone)** :
   - Cathinone chlorée dominante en Europe. Triple libérateur monoaminergique avec alertes RDR spécifiques sur la neurotoxicité sérotoninergique axonale suspectée (analogie 4-CA) et l'extrême causticité pour les muqueuses.
   - Données complètes orale (40-240+ mg), sniff (20-140+ mg) et rectale (30-180+ mg).
   - AddictionScore : **6/10** (sniff : 8, oral : 6), Dépendance physique : **2/10**.

4. **4-CMC (4-Chlorométhcathinone / Clephedrone)** :
   - Analogue para-chloré plus empathogène et sérotoninergique que la 3-CMC.
   - Données complètes orale (40-220+ mg), sniff (20-130+ mg), rectale (30-170+ mg).
   - AddictionScore : **6/10** (sniff : 8, oral : 6), Dépendance physique : **2/10**.

5. **2-CMC (2-Chlorométhcathinone)** :
   - Dérivé ortho-chloré à visée stimulante pure, éveillante, sans empathie marquée.
   - AddictionScore : **5/10** (sniff : 7, oral : 5), Dépendance physique : **2/10**.

6. **4-MEC (4-Méthyléthcathinone)** :
   - Analogue historique N-éthyl de la méphédrone, à composante entactogène sédative / stoning.
   - AddictionScore : **5/10** (sniff : 7, oral : 5), Dépendance physique : **2/10**.

7. **Eutylone (bk-EBDB / N-Ethylbutylone)** :
   - Méthylènedioxy-cathinone à longue durée d'action (5-8h), fréquente comme adultérant dans les faux comprimés d'ecstasy.
   - AddictionScore : **5/10** (sniff : 6, oral : 5), Dépendance physique : **2/10**.

8. **Cathinone (Khat / Cathinone naturelle)** :
   - Alcaloïde naturel fondateur issu de *Catha edulis*. Profil amphétaminique dopaminergique.
   - AddictionScore : **5/10** (oral : 5), Dépendance physique : **2/10**.

9. **A-PiHP (alpha-PiHP / α-PiHP)** :
   - Pyrrolidinophénone de synthèse ultra-puissante (famille α-PVP / α-PHP), induisant un rush dopaminergique violent, une compulsion de redosage frénétique et un risque élevé de psychose paranoïde aiguë.
   - Voies orale, sniff, fumée/vaporisée et IV.
   - AddictionScore : **9/10** (fumée/IV/sniff : 10, oral : 8), Dépendance physique : **3/10**.

10. **Dipentylone (Diméthylpentylone / bk-DMBDP)** :
    - Cathinone stimulante prolongée, remplaçante récente de l'eutylone.
    - AddictionScore : **5/10** (sniff : 6, oral : 5), Dépendance physique : **2/10**.

11. **Enrichissement de la 3-MMC** :
    - Ajout des champs descriptifs complets qui manquaient (`effectsSummary`, `dosageRemark`, `generalRisks`, `longtermRisks`, `saferUse`).

### Adaptations du Code Applicatif & RDR
- **InteractionChecker.kt** : Intégration de `"4-MMC"`, `"3-MMC"`, `"4-CMC"`, `"3-CMC"`, `"4-MEC"`, `"Eutylone"` dans la liste des libérateurs sérotoninergiques (`serotoninReleasers`) pour déclencher automatiquement les avertissements de syndrome sérotoninergique en cas de combinaison avec des antidépresseurs (IMAO, ISRS, IRSNa, Tramadol, DXM).
- **SubstanceColorPalette.kt** : Prise en charge des nouveaux suffixes et familles (`cmc`, `mec`, `pihp`, `eutylone`) dans la palette standardisée cathinones/stimulantes (`AdaptiveColor.ORANGE_RED` / `#FB923C`).
- **Simulateur Web Bilingue** : Régénération intégrale de [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html) et synchronisation sur l'artefact [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html) (388 molécules au total, défilement illimité fluide, switch FR/EN instantané).

### Fichiers modifiés
- [substances.json (FR)](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json)
- [substances.json (EN)](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json)
- [InteractionChecker.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/journal/addingestion/interactions/InteractionChecker.kt)
- [SubstanceColorPalette.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/SubstanceColorPalette.kt)
- [apply_harmonization_and_easter_egg.py](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/scratch/apply_harmonization_and_easter_egg.py)
- [build_bilingual_simulator.py](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/scratch/build_bilingual_simulator.py)
- [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)
- [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html)
- [MODIFICATIONS.md](file:///c:/Users/droll/Desktop/synaptik%20journal/MODIFICATIONS.md)


---

## 41. Consécration de la MDPV au Sommet Hors-Échelle (11/10) & Suppression de la Mention Littérale « Easter Egg »

### Justification Pharmacologique & RDR (MDPV vs α-PVP)
D'un point de vue neurobiologique, toxicologique et comportemental, la **MDPV (3,4-méthylènedioxypyrovalérone)** est scientifiquement reconnue comme ayant le potentiel d'addiction psychologique le plus dévastateur de toute l'histoire des Research Chemicals :
1. **Affinité DAT 3 fois supérieure** : La MDPV présente une affinité nanomolaire pour le transporteur de la dopamine (IC50 ~4 nM) environ 3 fois plus puissante que l'α-PVP (IC50 ~12-14 nM) et ~50 fois plus puissante que la cocaïne.
2. **Lipophilie et cinétique d'accumulation** : Son pont méthylènedioxy lui confère une très forte lipophilie. La MDPV pénètre massivement la barrière hémato-encéphalique avec une stimulation résiduelle tenace (6 à 12h+).
3. **Le phénomène de « fiending » et de descente anxiogène** : Contrairement à l'α-PVP dont le pic est plus explosif mais plus bref (crash rapide), la descente de la MDPV s'accompagne d'une dysphorie paranoïaque et d'un état d'hyper-vigilance insupportable, déclenchant un craving obsessionnel (« MDPV fiending ») poussant à des binges continus pouvant durer plusieurs jours jusqu'à épuisement complet.

### Décisions & Modifications Appliquées
1. **La MDPV au Sommet Hors-Échelle (`11 / 10`)** :
   - Note de base : **11 / 10** (la seule molécule de l'application à dépasser le plafond standard).
   - Voies d'administration : Sniff (**11/10**), Fumée (**11/10**), Rectale (**11/10**), IV (**11/10**), Orale (**10/10**).
2. **Calibrage de l'α-PVP au Plafond Standard (`10 / 10`)** :
   - L'A-PVP est calibrée à **10 / 10 en base** (voie fumée/sniff/IV : 10/10, orale : 9/10).
3. **Maintien du Rendu Hors-Échelle mais Retrait de la Mention « Easter Egg »** :
   - Le score **11 / 10** est conservé avec l'intégralité de ses attributs visuels distinctifs (jauge néon cramoisi `0xFFFF0055` / `#ff0055`, animation lumineuse, description clinique de compulsion maximale).
   - En revanche, la mention littérale `(Easter Egg)` est retirée de l'interface pour afficher sobrement : `11 / 10 🚨 (Hors-échelle)` / `11 / 10 🔥 (Off-scale)`.
4. **Mise à jour du Code Android & Simulateur** :
   - `SubstanceParser.kt` & `Substance.kt` : Borne de clampage maintenue à `.coerceIn(0, 11)` pour autoriser la note 11.
   - `SubstanceScreen.kt` : Jauge néon et badge `11 / 10 🚨 (Hors-échelle)` sans libellé ludique.
   - `build_bilingual_simulator.py` : Affichage de `11 / 10 🔥 (Hors-échelle)` et `11 / 10 🔥 (Off-scale)`, régénération de [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html) et mise à jour de l'artefact [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html).

### Fichiers modifiés
- [substances.json (FR)](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json)
- [substances.json (EN)](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json)
- [SubstanceParser.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/parse/SubstanceParser.kt)
- [Substance.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/data/substances/classes/Substance.kt)
- [SubstanceScreen.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/search/substance/SubstanceScreen.kt)
- [build_bilingual_simulator.py](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/scratch/build_bilingual_simulator.py)
- [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)
- [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html)
- [MODIFICATIONS.md](file:///c:/Users/droll/Desktop/synaptik%20journal/MODIFICATIONS.md)


---

## 42. Intégration Systématique des Profils Comparatifs (⚖️) sur l'Ensemble des Cathinones (FR & EN)

### Objectif
Ajouter la rubrique standardisée **« ⚖️ Profil comparatif »** en français et **« ⚖️ Comparative profile »** en anglais dans le résumé (`summary`) de toutes les cathinones qui en étaient dépourvues (notamment les nouvelles cathinones ajoutées et celles qui n'avaient pas encore fait l'objet d'une mise en relation pharmacologique comparative).

### Profils Comparatifs Intégrés (12 substances enrichies)
1. **2-MMC** :
   - *FR* : « ⚖️ Profil comparatif : Par rapport à la 3-MMC, la 2-MMC est nettement moins entactogène (faible libération de sérotonine) et produit une stimulation dopaminergique plus pure et fonctionnelle, avec une durée similaire (3-5h) mais un risque d'escalade des doses chez les usagers cherchant une euphorie introuvable. »
   - *EN* : « ⚖️ Comparative profile: Compared to 3-MMC, 2-MMC is significantly less entactogenic (minimal serotonin release) and delivers cleaner, more functional dopaminergic stimulation with a similar duration (3-5h), though carrying high overdose risks when users escalate doses searching for missing empathy. »
2. **3-CMC** :
   - *FR* : « ⚖️ Profil comparatif : Par rapport à la 3-MMC, la 3-CMC (clophédrone) est légèrement moins puissante au milligramme, beaucoup plus caustique pour les muqueuses nasales, et présente une suspicion toxicologique majeure de neurotoxicité sérotoninergique directe analogue à la 4-chloroamphétamine (4-CA). »
   - *EN* : « ⚖️ Comparative profile: Compared to 3-MMC, 3-CMC (clophedrone) is slightly less potent by weight, much more caustic to nasal tissue, and carries a major toxicological suspicion of direct serotonergic axon neurotoxicity analogous to 4-chloroamphetamine (4-CA). »
3. **4-CMC** :
   - *FR* : « ⚖️ Profil comparatif : Par rapport à la 4-MMC (Méphédrone), la 4-CMC (cléphédrone) procure une euphorie empathogène chaleureuse comparable mais une puissance légèrement moindre, une causticité nasale sévère et une préoccupation accrue de neurotoxicité sérotoninergique liée à sa substitution chlorée. »
   - *EN* : « ⚖️ Comparative profile: Compared to 4-MMC (Mephedrone), 4-CMC (clephedrone) produces a similarly warm empathogenic euphoria but requires slightly higher doses, causes severe nasal irritation, and raises major neurotoxicity concerns due to its chlorinated structure. »
4. **2-CMC** :
   - *FR* : « ⚖️ Profil comparatif : Par rapport à la 3-CMC, la 2-CMC est un psychostimulant presque exclusivement dopaminergique/noradrénergique, dénué de chaleur empathogène, avec une charge adrénergique périphérique marquée et une envie de redoser rapide. »
   - *EN* : « ⚖️ Comparative profile: Compared to 3-CMC, 2-CMC acts as a nearly pure dopaminergic/noradrenergic psychostimulant devoid of empathogenic warmth, with prominent peripheral adrenergic load and rapid redosing urge. »
5. **4-MEC** :
   - *FR* : « ⚖️ Profil comparatif : Par rapport à la 4-MMC, la 4-MEC produit une euphorie entactogène plus sédative et cotonneuse ('stoning'), avec une stimulation physique dopaminergique nettement moins explosive et une puissance inférieure nécessitant des doses plus élevées. »
   - *EN* : « ⚖️ Comparative profile: Compared to 4-MMC, 4-MEC produces a more sedating, dreamy entactogenic euphoria ('stoning'), with a much less explosive physical stimulant push and lower potency requiring higher doses. »
6. **Eutylone** :
   - *FR* : « ⚖️ Profil comparatif : Par rapport à la MDMA et à la méthylone, l'eutylone (bk-EBDB) possède une durée de stimulation résiduelle beaucoup plus longue (5 à 8 heures), une euphorie empathogène brève qui s'estompe vite et une forte charge cardiovasculaire (tachycardie persistante). »
   - *EN* : « ⚖️ Comparative profile: Compared to MDMA and methylone, eutylone (bk-EBDB) features a substantially longer residual stimulation (5 to 8 hours), a brief euphoric peak that fades quickly, and heavy cardiovascular strain (persistent tachycardia). »
7. **Cathinone** :
   - *FR* : « ⚖️ Profil comparatif : Par rapport à l'amphétamine classique, la cathinone naturelle possède un mécanisme pharmacologique très similaire (libération de dopamine et noradrénaline) mais une puissance environ 2 fois inférieure et une demi-vie plus courte, se traduisant traditionnellement par une stimulation douce et sociable lors de la mastication des feuilles de khat. »
   - *EN* : « ⚖️ Comparative profile: Compared to classic amphetamine, natural cathinone shares a very similar pharmacological mechanism (dopamine/norepinephrine release) but is roughly half as potent with a shorter half-life, traditionally resulting in smooth, social stimulation during khat leaf chewing. »
8. **A-PiHP** :
   - *FR* : « ⚖️ Profil comparatif : Par rapport à l'alpha-PHP et à l'alpha-PVP, l'alpha-PiHP offre une vaporisation plus fluide et un rush dopaminergique tout aussi violent et addictif, avec une propension extrême au redosage compulsif immédiat et un déclenchement très rapide d'épisodes paranoïdes aigus. »
   - *EN* : « ⚖️ Comparative profile: Compared to alpha-PHP and alpha-PVP, alpha-PiHP vaporizes more smoothly and delivers an equally intense, addictive dopaminergic rush, with an extreme compulsion for immediate redosing and rapid induction of acute paranoid episodes. »
9. **Dipentylone** :
   - *FR* : « ⚖️ Profil comparatif : Par rapport à l'eutylone, la dipenthylone (bk-DMBDP) présente un profil stimulant prolongé similaire (4 à 7 heures) avec une composante empathogène minime, favorisant l'insomnie tenace et l'anxiété en cas de redosages successifs. »
   - *EN* : « ⚖️ Comparative profile: Compared to eutylone, dipentylone (bk-DMBDP) displays a similar prolonged stimulant profile (4 to 7 hours) with minimal empathogenic warmth, leading to stubborn insomnia and anxiety when redosed consecutively. »
10. **N-Ethylhexedrone (Hexen)** :
    - *FR* : « ⚖️ Profil comparatif : Par rapport à la cocaïne, la N-éthylhexédrone (Hexen) délivre un rush nasal plus caustique et une stimulation physique plus longue et agressive, avec une descente nettement plus brutale poussant au redosage compulsif. »
    - *EN* : « ⚖️ Comparative profile: Compared to cocaine, N-ethylhexedrone (Hexen) delivers a more caustic nasal rush and longer, more aggressive physical stimulation, paired with a harsher crash driving compulsive redosing. »
11. **Ephylone (bk-EBDP)** :
    - *FR* : « ⚖️ Profil comparatif : Par rapport à l'éthylone et à la MDMA, l'éphylone possède une durée d'action beaucoup plus longue (6 à 10 heures), avec une montée euphorique initiale rapidement remplacée par une stimulation adrénergique persistante et un risque accru de psychose en cas de redosages répétés. »
    - *EN* : « ⚖️ Comparative profile: Compared to ethylone and MDMA, ephylone has a much longer duration of action (6 to 10 hours), with the initial empathogenic euphoria quickly giving way to persistent adrenergic stimulation and severe insomnia. »
12. **ETH-CAT (Ethcathinone)** :
    - *FR* : « ⚖️ Profil comparatif : Par rapport à la méphédrone et à la méthcathinone, l'éthcathinone est un stimulant beaucoup plus modéré et moins euphorique, avec une action principalement éveillante et anorexigène, plus proche de la caféine concentrée ou du bupropion. »
    - *EN* : « ⚖️ Comparative profile: Compared to mephedrone and methcathinone, ethcathinone is a significantly milder and less euphoric stimulant, producing predominantly wakefulness and appetite suppression similar to high-dose caffeine or bupropion. »

### Fichiers modifiés
- [substances.json (FR)](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json)
- [substances.json (EN)](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json)
- [build_bilingual_simulator.py](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/scratch/build_bilingual_simulator.py)
- [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)
- [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html)
- [MODIFICATIONS.md](file:///c:/Users/droll/Desktop/synaptik%20journal/MODIFICATIONS.md)


---

## 43. Rédaction Complète de la Fiche Alpha-PVP (Flakka) & Actualisation du Profil Comparatif (MDPV vs α-PVP)

### Objectif
1. Combler le manque de description complète sur la fiche de l'**Alpha-PVP** (qui ne comportait qu'un court fragment comparatif sans résumé clinique, ni effets, ni remarques posologiques, ni risques généraux / long terme, ni conseils RDR).
2. Actualiser et synchroniser réciproquement le **profil comparatif** entre la **MDPV** et l'**Alpha-PVP** dans les deux langues (FR et EN), en reflétant la supériorité de puissance et de durée de la MDPV.

### Données Rédigées & Mises à Jour
1. **Alpha-PVP (Flakka)** :
   - *Description (`summary`)* : Présentation détaillée de l'α-PVP (famille des pyrrolidinophénones, puissance stimulante, NDRI hautement sélectif, association fréquente aux tableaux de délire agité et de paranoïa aiguë).
   - *Profil comparatif actualisé* :
     - **FR** : « ⚖️ Profil comparatif : Par rapport à la MDPV (qui demeure environ 2 à 3 fois plus puissante au milligramme et dont la stimulation résiduelle tenace dure plus longtemps avec un craving insidieux sur plusieurs jours), l'alpha-PVP possède un pic plus bref et plus brutal (chute abrupte après 30-45 min), induisant un redosage frénétique à la minute et un déclenchement particulièrement rapide d'accès de démence et de paranoïa aiguë. »
     - **EN** : « ⚖️ Comparative profile: Compared to MDPV (which remains 2-3 times more potent by milligram dose and has a much longer-lasting residual stimulation with multi-day compulsive fiending), alpha-PVP has a slightly lower absolute receptor affinity and a shorter, sharper peak (rapid crash after 30-45 min), driving frantic minute-by-minute redosing and rapid onset of acute paranoid delirium. »
   - *Effets cliniques (`effectsSummary`)* : Rush dopaminergique immédiat, euphorie éphémère, stimulation physique extrême, loquacité désinhibée, tachycardie immédiate, paranoïa aiguë et bruxisme.
   - *Posologie (`dosageRemark`)* : Alerte rouge sur la balance au milligramme (0,001 g) requise et contre-indication absolue de la voie fumée.
   - *Risques & Complications (`generalRisks`, `longtermRisks`)* : Syndrome d'agitation délirante (excited delirium), hyperthermie maligne (>40°C), rhabdomyolyse, arrêt cardiaque, séquelles psychotiques durables.
   - *Conseils RDR (`saferUse`)* : Présence obligatoire d'un tiers, interdiction des réserves accessibles, sédatifs d'urgence à portée de main, hydratation.

2. **MDPV** :
   - Enrichissement complet symétrique (`effectsSummary`, `dosageRemark`, `generalRisks`, `longtermRisks`, `saferUse`) et actualisation du profil comparatif mettant en avant sa puissance supérieure (2-3x) et son craving obsessionnel étalé sur plusieurs jours (« MDPV fiending »).

### Fichiers modifiés
- [substances.json (FR)](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json)
- [substances.json (EN)](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json)
- [build_bilingual_simulator.py](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/scratch/build_bilingual_simulator.py)
- [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)
- [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html)
- [MODIFICATIONS.md](file:///c:/Users/droll/Desktop/synaptik%20journal/MODIFICATIONS.md)


---

## 44. Rectification Pharmacologique des Scores de Compulsion par Voie d'Administration (MDPV)

### Problématique & Réfutation du 11/10 en Voie Rectale
L'attribution initiale de la note hors-échelle `11 / 10` à la voie rectale pour la **MDPV** constituait une surestimation cinétique. En neuropharmacologie et en toxicologie des addictions :
1. **La cinétique du flash vs diffusion progressive** : Le score `11 / 10` (hors-échelle) qualifie la perte de contrôle préfrontale foudroyante causée par un **flash dopaminergique en quelques secondes**. Cette dynamique d'inhibition subite du DAT ($IC_{50} \sim 4.5	ext{ nM}$) avec pente d'élévation concentrationnelle maximale ($rac{dC}{dt}$) est l'apanage exclusif des voies **fumée/vaporisée** (inhalation alvéolaire vers circulation artérielle cérébrale en 7 à 10 secondes) et **intraveineuse** (bolus direct en 15 secondes).
2. **Pharmacocinétique rectale (plugging)** : Bien que la biodisponibilité rectale soit élevée (~75-85 %) et court-circuite partiellement le premier passage hépatique, l'absorption à travers la muqueuse rectale prend **5 à 15 minutes** pour monter, avec un pic plasmatique étalé sur **20 à 40 minutes**.
3. **Absence de rush compulsif instantané** : Il n'existe aucun « flash » instantané en voie rectale. De plus, la logistique d'administration (dissolution aqueuse, seringue sans aiguille, position allongée) rend impossible le « fiending » de minute en minute propre à la pipe à vapo.

### Calibrage Harmonisé des Voies de la MDPV
- **Fumée / Vapo (`smoked`)** : **11 / 10** 🚨 (L'unique voie hors-échelle : flash alvéolaire instantané, boucle de redrop incontrôlable à la minute, risque paranoïde paroxystique).
- **Nasale / Sniff (`insufflated`)** : **10 / 10** (Plafond standard maximal : absorption muqueuse en 2-5 min, stimulation aiguë très compulsive).
- **Rectale (`rectal`)** : **10 / 10** (Plafond standard maximal : biodisponibilité élevée, montée progressive en 10-20 min, forte puissance sans flash instantané).
- **Orale (`oral`)** : **9 / 10** (Craving sévère : absorption digestive progressive sur 20-40 min, premier passage hépatique partiel, alignée sur l'α-PVP).
- **Score Global de la MDPV** : **11 / 10** 🚨 (maintien au sommet absolu de l'application, reflétant le risque maximal lié à la voie fumée).

### Fichiers modifiés
- [substances.json (FR)](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json)
- [substances.json (EN)](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json)
- [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)
- [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html)
- [MODIFICATIONS.md](file:///c:/Users/droll/Desktop/synaptik%20journal/MODIFICATIONS.md)


---

## 45. Écrasement Clinique des Indices de Dépendance Physique & Descriptions Différenciées par Classe (GABAergiques vs Opioïdes vs Stimulants)

### Objectif & Fondement Médical / RDR
Créer une rupture visuelle et conceptuelle absolue entre les deux réalités somatiques du sevrage :
1. **Le sevrage aux Opioïdes (Morphine, Héroïne, Fentanyls, Méthadone, Codéine)** : Atrocement douloureux et éprouvant sur le plan viscéral et musculaire, mais **NON mortel en soi** (aucun orage convulsif primaire ; risque létal indirect uniquement en cas de déshydratation absolue par manque d'eau).
2. **Le sevrage aux modulateurs GABAergiques et Gabapentinoïdes (Alcool, Benzos, GHB, Prégabaline)** : Risque vital **direct et foudroyant** par levée brutale du frein GABA-A, emballement glutamatergique, convulsions généralisées tonico-cloniques et *delirium tremens*.
3. **Différenciation interne essentielle entre modulateurs GABA** : L'usager ne doit pas confondre l'arrêt de la prégabaline (risque convulsif sous fortes doses >600mg mais sans effondrement autonome immédiat) avec l'arrêt de l'alcool/GHB (urgence vitale absolue en 24-72h).

### Nouvelle Échelle Écrasée & Stratifiée (388 molécules)
- **10 / 10 — Urgence Vitale Absolue (Létalité directe élevée)** :
  - *Substances* : Alcool, Barbituriques (Phénobarbital, Sécobarbital, Pentobarbital), Triazolo/thiénobenzodiazépines ultra-puissantes (Clonazolam, Flualprazolam, Flubromazolam, Flunitrazolam).
  - *Mécanisme* : Orage glutamatergique massif, delirium tremens, hyperthermie maligne et état de mal épileptique fatal en 24 à 72h. Hospitalisation et sevrage médicalisé stricts obligatoires.
- **9 / 10 — Sevrage Critique Potentiellement Létal** :
  - *Substances* : Benzodiazépines classiques (Alprazolam, Diazépam, Clonazépam, Lorazépam, Bromazépam, Etizolam...), GHB, GBL, 1,4-BD.
  - *Mécanisme* : Risque élevé de crises comitiales tonico-cloniques et de psychose aiguë délirante (foudroyante en 2 à 4h pour le GHB). Arrêt brutal formellement proscrit : décroissance lente par paliers sous contrôle médical.
- **8 / 10 — Sevrage Neurovégétatif Sévère (Risque Convulsif sous Fortes Doses)** :
  - *Substances* : Prégabaline (Lyrica), Phénibut, F-Phénibut, Baclofène, et benzos légères (Chlordiazépoxide, Clobazam, Oxazépam...).
  - *Mécanisme* : Risque convulsif avéré sous fortes doses (>600mg Lyrica, >2g Phénibut), anxiété paroxystique et désorientation, sans l'effondrement autonome immédiat de l'alcool/GHB.
- **7 / 10 — Sevrage Marqué avec Rebond d'Hyperexcitabilité** :
  - *Substances* : Gabapentine, Z-drugs (Zolpidem, Zopiclone, Eszopiclone, Zaleplon), Carisoprodol, Méthaqualone.
  - *Mécanisme* : Insomnie sévère de rebond, tremblements et anxiété marquée. Crises convulsives rares mais possibles lors d'arrêts brutaux de doses massives.
- **5 / 10 — Opioïdes Majeurs & Puissants (Sevrage Somatique Éprouvant mais NON Mortel)** :
  - *Substances* : Héroïne, Fentanyls, Morphine, Oxycodone, Méthadone, Hydromorphone, Oxymorphone, Sufentanil, Desomorphine, Buprenorphine.
  - *Mécanisme* : Douleurs viscérales et osseuses intenses, diarrhées profuses, vomissements, insomnie ("cold turkey"), sans risque convulsif primaire ni orage neurovégétatif fatal. TSO ou décroissance progressive conseillée.
- **4 / 10 — Opioïdes Modérés & Rebond Somatique** :
  - *Substances* : Codéine, Dihydrocodéine, Tramadol, O-DSMT, Hydrocodone, Opium, Tilidine, Tianeptine, antidépresseurs à fort syndrome d'arrêt (Paroxétine, Venlafaxine).
- **2 à 3 / 10 — Dépendance Physique Légère (Rebond Autonome Bénin)** :
  - *Substances* : Nicotine (3/10), Kratom (3/10), Caféine (2/10), ISRS/SNRI classiques.
- **0 à 1 / 10 — Dépendance Physique Somatique Absente** :
  - *Substances* : Stimulants (Cocaïne, Amphétamines, MDPV, Cathinones à 1/10), Psychédéliques, Dissociatifs, Cannabinoïdes.

### Enrichissement Dynamique sous l'Indice de Dépendance
Dans l'application Android ([SubstanceScreen.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/search/substance/SubstanceScreen.kt)) et le simulateur ([simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)), le texte d'explication sous la jauge s'adapte contextuellement à la molécule et à sa classe pour expliciter clairement les risques vitaux, les mécanismes (orage glutamatergique, crises comitiales) et la distinction clinique capitale entre opioïdes et GABAergiques.

### Fichiers modifiés
- [substances.json (FR)](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json) (105 molécules recalibrées)
- [substances.json (EN)](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json) (105 molécules recalibrées)
- [SubstanceScreen.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/tabs/search/substance/SubstanceScreen.kt)
- [build_bilingual_simulator.py](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/scratch/build_bilingual_simulator.py)
- [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)
- [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html)
- [MODIFICATIONS.md](file:///c:/Users/droll/Desktop/synaptik%20journal/MODIFICATIONS.md)


---

## 46. Passage en Version V1 (v1.0.0) & Automatisation Dynamique du Compteur de Molécules

### Objectif
1. **Passage officiel en Version V1 (`v1.0.0`)** sur l'ensemble de la plateforme (application Android et simulateur web), en remplacement des anciennes mentions de version amont (`v11.17.2`).
2. **Actualisation et calcul dynamique du nombre de substances** : Corriger l'affichage statique résiduel de `379 molécules` qui n'était plus à jour depuis l'ajout des 9 nouvelles cathinones (la base compte désormais exactement **388 molécules**).
3. **Automatisation en temps réel** : Faire en sorte que le compteur ne soit plus jamais codé en dur, mais calculé dynamiquement à partir de la longueur réelle de la liste des substances (`SUBSTANCES_DATA.length`), garantissant que toute future addition ou suppression s'ajuste instantanément.

### Modifications Appliquées
1. **Code Android** :
   - [Constants.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/Constants.kt) : `VERSION_NAME` fixé à `"1.0.0"`.
   - [build.gradle.kts](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/build.gradle.kts) : `versionName` fixé à `"1.0.0"`.
2. **Simulateur Bilingue & Générateur (`build_bilingual_simulator.py`)** :
   - Header de l'application : Le sous-titre sous *Synaptik Journal* affiche désormais dynamiquement `v1.0.0 — 388 molécules` en français et `v1.0.0 — 388 substances` en anglais via `I18N[lang].appSubtitle(SUBSTANCES_DATA.length)`.
   - Bouton de catégorie « Toutes » : Texte dynamique `Toutes (388)` / `All (388)` via `I18N[lang].allCategory(SUBSTANCES_DATA.length)`.
   - Compteur de recherche du catalogue : `388 molécules répertoriées` / `388 substances indexed`.
   - Section « À propos » : `Base locale : 388 molécules` / `Local database: 388 substances` et mention officielle de la `Version 1.0.0 (Synaptik Journal)`.
3. **Synchronisation des Livrables** :
   - [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html) régénéré et validé via script de test Node.js.
   - Artefact [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html) mis à jour.

### Fichiers modifiés
- [Constants.kt](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/java/com/isaakhanimann/journal/ui/Constants.kt)
- [build.gradle.kts](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/build.gradle.kts)
- [build_bilingual_simulator.py](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/scratch/build_bilingual_simulator.py)
- [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)
- [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html)
- [MODIFICATIONS.md](file:///c:/Users/droll/Desktop/synaptik%20journal/MODIFICATIONS.md)

---

## 47. Refonte Complète de la Puissance Relative : Modèle à 3 Paramètres (Intensité Intrinsèque, Dosage Pondéral, Cohérence Clinique)

### Problématique Résolue
Auparavant, le calcul de la puissance relative (`relativePotency`) reposait sur des ratios intra-classes fragmentés et parfois simplistes (par exemple division brute par la dose unitaire sans distinction de nature d'action). Cela entraînait des aberrations cliniques critiques en vue globale et inter-classes :
- La **Mélatonine** apparaissait à `200.0x` (en raison d'une dose de 1 mg) — supérieure au Fentanyl (`100.0x`) !
- La **Nicotine** apparaissait à `8.33x` (et jusqu'à `66.67x` en nootropique / `33.33x` en dépresseur) — classée au-dessus de la Morphine (`1.0x`), de l'Oxycodone (`1.5x`), du Tramadol (`0.2x`), de la Codéine (`0.15x`), et des pyros surpuissants (MDPV à `3.12x`, a-PVP à `2.5x`) !
- Le **Paracétamol** apparaissait à `1.0x` (étalon analgésique non-opioïde) — classé à égalité avec la Morphine (`1.0x`) et 5 fois plus puissant que le Tramadol (`0.2x`) !

Cette distorsion contredisait le bon sens pharmacologique et les principes de réduction des risques et de clarté clinique.

### Le Nouveau Modèle Tri-Paramétrique
La puissance relative de l'ensemble des **388 molécules** de la base (FR et EN) et du simulateur a été intégralement recalculée selon un modèle pharmacologique à **3 paramètres obligatoires** :

1. **Paramètre 1 : Puissance absolue des effets ($E \in [0.1, 10.0]$)**
   - *Intensité intrinsèque de l'action neuropsychologique et perturbation physiologique maximale à dose efficace.*
   - **Niveau Extrême ($9.8 - 10.0$)** : Tempête neurochimique cataclysmique (saturation réceptorielle massive, décharge dopaminergique ou dépression respiratoire fulgurante). Exemples : **MDPV** ($10.0$), **$\alpha$-PVP** ($9.8$), **Fentanyl** ($10.0$), **Carfentanil** ($10.0$), **Clonazolam** ($10.0$), **LSD** ($9.8$).
   - **Niveau Majeur ($8.0 - 9.0$)** : Drogues dures, opioïdes et benzos fortes, stimulants lourds. Exemples : Héroïne ($9.0$), Oxycodone ($8.5$), Morphine ($8.0$), Alprazolam ($8.5$), Méthamphétamine ($9.5$), Cocaïne ($8.5$), MDMA ($8.0$).
   - **Niveau Modéré à Fort ($5.0 - 7.5$)** : Psychotropes d'ordonnance notables, sédatifs, cannabinoïdes. Exemples : Diazépam ($6.0$), Prégabaline ($6.0$), Zolpidem ($5.5$), THC ($5.0$).
   - **Niveau Léger / Pivot ($3.5 - 4.9$)** : Opioïdes faibles et benzodiazépines douces. Exemples : Codéine ($4.2$), Tramadol ($4.5$), Oxazépam ($4.0$), Chlordiazépoxide ($3.8$), Gabapentine ($3.8$).
   - **Niveau Stimulants doux d'usage courant ($1.5 - 2.5$)** : Action sympathomimétique/adénosinergique brève, sans perturbation cognitive majeure. Exemples : Nicotine ($2.0$), Caféine ($1.5$).
   - **Niveau Périphérique / Régulateur ($0.1 - 0.5$)** : Aucune propriété stupéfiante centrale. Exemples : Paracétamol ($0.3$), AINS ($0.3$), Mélatonine ($0.1$), Phloroglucinol ($0.1$).

2. **Paramètre 2 : Dosage actif pondéral ($D \propto (60.0 / d_{	ext{mg}})^{0.60}$)**
   - *Plus la dose active ou commune est faible, plus ce paramètre pondéral est élevé.*
   - Microgrammes ($\mu	ext{g}$) : Carfentanil ($2\ \mu	ext{g}$), Fentanyl ($60\ \mu	ext{g}$), LSD ($75\ \mu	ext{g}$), Clonazolam ($200\ \mu	ext{g}$) $\implies$ facteur multiplicateur massif ($40	ext{x}$ à $500	ext{x}$).
   - Doses milligrammiques faibles ($1$ à $10$ mg) : MDPV ($3-8$ mg), Alprazolam ($0.5$ mg), Diazépam ($5$ mg) $\implies$ facteur fort ($3	ext{x}$ à $18	ext{x}$).
   - Doses milligrammiques modérées ($20$ à $100$ mg) : Morphine ($20$ mg), Codéine ($60-75$ mg), Tramadol ($100$ mg), MDMA ($100$ mg), Caféine ($50-100$ mg) $\implies$ facteur pivot ($0.7	ext{x}$ à $2.0	ext{x}$).
   - Doses en centaines de milligrammes à plusieurs grammes : Paracétamol ($500-1000$ mg), GHB ($1-2$ g), Alcool ($20$ g) $\implies$ facteur atténuateur ($0.03	ext{x}$ à $0.28	ext{x}$).

3. **Paramètre 3 : Logique clinique / Hiérarchie catégorielle ($L$)**
   - *Garde-fou catégoriel absolu empêchant formellement toute aberration clinique.*
   - **Règle d'or** : Le Paracétamol, la Mélatonine et la Nicotine ne peuvent **JAMAIS** être considérés comme aussi puissants qu'un opioïde faible ou une benzodiazépine faible.
   - Les molécules périphériques et compléments sont plafonnées à $0.08	ext{x}$.
   - Les stimulants usuels doux (Caféine, Nicotine) sont plafonnés à $0.35	ext{x}$.
   - Le plancher pivot des opioïdes et benzodiazépines faibles démarre à $0.80	ext{x} - 1.2	ext{x}$.

### Échelle de Puissance Relative Comparée
| Famille / Substance | Puissance Relative | Dose Référence | Justification Pharmacologique & Clinique |
| :--- | :---: | :---: | :--- |
| **Mélatonine** | **0.01x** | 1 mg | Hormone circadienne non stupéfiante, régulation physiologique pure |
| **Paracétamol** | **0.03x** | 500 mg | Antalgique périphérique sans action psychotrope centrale |
| **Aspirine / Ibuprofène** | **0.03x - 0.04x** | 200-500 mg | AINS périphériques |
| **Caféine** | **0.20x** | 50-100 mg | Stimulant doux d'usage courant (antagoniste des récepteurs à l'adénosine) |
| **Nicotine** | **0.30x** | 1-3 mg | Stimulant doux bref — **STRICTEMENT inférieur aux opioïdes et benzos faibles** |
| *Chlordiazépoxide* | *0.80x* | 20 mg | Benzodiazépine légère de prescription |
| **Codéine** | **1.0x** | 60-75 mg | **L'étalon pivot des opioïdes faibles** |
| **Oxazépam** | **1.0x** | 15-30 mg | **L'étalon pivot des benzodiazépines faibles** |
| **Tramadol** | **1.1x** | 100 mg | Opioïde faible de palier II (agoniste mu + recapture 5-HT/NA) |
| **Alcool** | **0.50x** | 20 000 mg | Fort effet sédatif mais dose pondérale massive (dizaines de grammes) |
| **GHB** | **2.50x** | 1 000 mg | Sédatif GABA-B / GHB récepteur à action centrale puissante |
| **Diazépam** | **3.50x** | 5-10 mg | Benzodiazépine anxiolytique et myorelaxante classique |
| **Prégabaline** | **4.0x** | 150 mg | Modulateur des canaux calciques voltage-dépendants |
| **Morphine** | **8.0x** | 20 mg | Opioïde majeur de palier III |
| **MDMA** | **8.0x** | 100 mg | Empathogène sérotoninergique majeur |
| **Kétamine** | **12.0x** | 100 mg | Dissociatif anesthésique antagoniste NMDA |
| **Amphétamine** | **15.0x** | 10-20 mg | Stimulant dopaminergique majeur |
| **Oxycodone** | **16.0x** | 10-15 mg | Opioïde semi-synthétique majeur (~2x la morphine) |
| **Cocaïne** | **18.0x** | 50-75 mg | Stimulant majeur triple recapture |
| **Alprazolam / Clonazépam** | **25.0x** | 0.5-1 mg | Benzodiazépines de forte puissance |
| **Héroïne** | **30.0x** | 15 mg | Opioïde diacétylé majeur |
| **Méthamphétamine** | **35.0x** | 10 mg | Stimulant neurotoxique à puissance dopaminergique extrême |
| **Hydromorphone** | **50.0x** | 4 mg | Opioïde morphinique surpuissant |
| **$\alpha$-PVP** | **140.0x** | 5-10 mg | Pyrrolidinophénone / pyro surpuissant, blocage DAT violent |
| **MDPV** | **180.0x** | 3-8 mg | **Puissance absolue extrême — supérieur à l'$\alpha$-PVP, décharge dopaminergique maximale** |
| **Clonazolam** | **250.0x** | 200 µg | Benzodiazépine de recherche ultra-puissante en microgrammes |
| **LSD** | **350.0x** | 75 µg | Psychédélique majeur actif à dose infime |
| **Fentanyl** | **500.0x** | 60 µg | Opioïde synthétique de puissance léthale fulgurante |
| **Sufentanil** | **2500.0x** | 12 µg | Opioïde anesthésique 5 à 10 fois plus puissant que le fentanyl |
| **Carfentanil** | **5000.0x** | 2 µg | Opioïde vétérinaire à puissance létale animale |

### Synchronisation des Données et Livrables
- **Bases de données JSON** :
  - [`substances.json (FR)`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json) : 388 substances mises à jour avec `relativePotency` et `classPotencies` harmonisées.
  - [`substances.json (EN)`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json) : 388 substances mises à jour à l'identique.
- **Simulateur Web & Artefact** :
  - [`build_bilingual_simulator.py`](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/scratch/build_bilingual_simulator.py) exécuté.
  - [`simulateur_synaptik.html`](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html) et artefact [`simulator.html`](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html) régénérés (2,24 Mo).
- **Vérifications automatisées** :
  - Tests Node.js et Python confirmant le tri global, le tri par catégorie (Stimulants, Opioïdes, etc.), l'ordre strict des 3 paramètres et l'absence totale d'anomalies sur les 388 substances.

### Fichiers modifiés
- [substances.json (FR)](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json)
- [substances.json (EN)](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json)
- [build_bilingual_simulator.py](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/scratch/build_bilingual_simulator.py)
- [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)
- [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html)
- [MODIFICATIONS.md](file:///c:/Users/droll/Desktop/synaptik%20journal/MODIFICATIONS.md)

---

## 48. Correction Pharmacologique de l'Opium (Puissance Relative & Doses Orale vs Fumée)

### Problématiques Résolues
Deux incohérences pharmacologiques majeures subsistaient sur la fiche de l'**Opium** :
1. **Puissance relative aberrante supérieure à la morphine** : L'opium possédait une `relativePotency` calculée à `9.9x`, le plaçant artificiellement au-dessus de la **Morphine** pure (`8.0x`). Or, la poudre d'opium officinale ou l'extrait brut de pavot ne titre qu'à environ **10% de morphine anhydre** (100 mg d'opium = 10 mg de morphine). Il était cliniquement et pharmacologiquement absurde que l'extrait brut non purifié soit noté comme plus puissant que son principe actif pur extrait.
2. **Inversion des doses entre voie orale et voie fumée** : La dose très forte (*heavy*) fumée était fixée à `200 mg` alors que l'orale était à `100 mg`, en totale contradiction avec la pharmacocinétique :
   - La voie fumée/inhalée (chandoo/vaporisation) possède une biodisponibilité alvéolaire bien supérieure (**40 à 60%** contre 25 à 40% par voie orale).
   - La voie fumée court-circuite le premier passage hépatique et pénètre le cerveau en quelques secondes (biodisponibilité cérébrale foudroyante). Les doses inhalées requises pour une forte intensité sont donc **bien inférieures** aux doses ingérées.

### Corrections Appliquées
1. **Recalibrage de la puissance relative (`relativePotency: 0.80x`)** :
   - Fixation à **`0.80x`** (et `classPotencies: 0.80x`), soit exactement **10% de la puissance de la Morphine pure (`8.0x`)**, reflétant la teneur exacte de 10% de morphine dans l'opium standardisé.
   - L'opium se positionne désormais logiquement aux côtés des opioïdes faibles de palier II (Codéine à `1.0x`, Tramadol à `1.1x`, Kratom à `0.6x`) et nettement en-dessous de la Morphine (`8.0x`) et de l'Oxycodone (`16.0x`).

2. **Réajustement pharmacocinétique des paliers de dosage** :
   - **Voie Orale** (biodisponibilité 25-40%, premier passage hépatique sévère, 10% de morphine) :
     - *Seuil/Léger* : `50 mg` (soit ~5 mg de morphine orale)
     - *Commun* : `100 mg` (soit ~10-15 mg de morphine orale)
     - *Fort* : `200 mg` (soit ~20-25 mg de morphine orale)
     - *Très fort (Heavy)* : `350 mg` (soit ~35 mg de morphine orale)
   - **Voie Fumée / Inhalée** (biodisponibilité 40-60%, absorption alvéolo-pulmonaire immédiate, absence de premier passage) :
     - *Seuil/Léger* : `15 mg` (soit ~1.5 mg de morphine vaporisée)
     - *Commun* : `30 mg` (soit ~3 mg de morphine vaporisée)
     - *Fort* : `60 mg` (soit ~6 mg de morphine vaporisée)
     - *Très fort (Heavy)* : `100 mg` (soit ~10 mg de morphine vaporisée foudroyante)
   - **Voie Rectale** (biodisponibilité 30-45%) :
     - `40 mg` / `80 mg` / `150 mg` / `250 mg`

### Synchronisation des Livrables
- [`substances.json (FR)`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json) : Opium mis à jour (`relativePotency: 0.80`, doses orales et fumées corrigées).
- [`substances.json (EN)`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json) : Opium mis à jour à l'identique.
- [`build_bilingual_simulator.py`](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/scratch/build_bilingual_simulator.py) : Exécuté.
- [`simulateur_synaptik.html`](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html) et artefact [`simulator.html`](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html) : Synchronisés.

### Fichiers modifiés
- [substances.json (FR)](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json)
- [substances.json (EN)](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json)
- [simulateur_synaptik.html](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html)
- [simulator.html](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html)
- [MODIFICATIONS.md](file:///c:/Users/droll/Desktop/synaptik%20journal/MODIFICATIONS.md)



---

## 49. Enrichissement Intégral : Descriptions, Usages et Profils Comparatifs (100% des 388 Substances en FR & EN)

### Problématiques Résolues
À la suite d'un audit complet de la base de données après la mise à jour des cathinones et des médicaments :
1. **Descriptions et Usages manquants** : 48 substances ne disposaient d'aucun résumé clinique ni de description d'usage (`summary`), privant l'utilisateur de toute information essentielle sur leur pharmacologie, leurs indications médicales ou leurs modes d'usage récréatif. Quatre molécules supplémentaires présentaient un résumé manquant dans la version anglaise (Buspirone, Haloperidol, Mirtazapine, Risperidone).
2. **Profils comparatifs manquants** : 164 substances (dont l'Opium révisé) ne possédaient pas la section standardisée `⚖️ Profil comparatif : ...` / `⚖️ Comparative profile: ...`, empêchant de comparer directement la molécule à ses homologues de référence au sein de sa classe thérapeutique.
3. **Données de Réduction des Risques (RdR) incomplètes** : 193 substances historiques issues de PsychonautWiki ne comportaient pas les champs structurés `effectsSummary` et `saferUse`.

### Enrichissements Appliqués
1. **Complétion des 48 substances dépourvues de description** :
   - Rédaction de monographies bilingues complètes (FR et EN) détaillant : mécanisme d'action, indications thérapeutiques, profil récréatif, posologie/remarques, risques aigus et chroniques, conseils de RdR et profil comparatif intégré.
   - Molécules enrichies : *Lisdexamfétamine (Vyvanse), Dextroamphétamine, Chlordiazépoxide (Librium), Désomorphine (Krokodil), Tilidine, Naloxone, Protoxyde d'azote, Cannabidiol (CBD), Méthoxétamine (MXE), JWH-018, Poppers (Nitrites), 5-HTP, L-Théanine, N-Acétylcystéine (NAC), Créatine, L-Tyrosine, Alpha-GPC, Citicoline, Choline bitartrate, SAM-e, Galantamine, F-Phénibut, 4F-MPH, 4F-EPH, Fénétylline (Captagon), Méthiopropamine, Méthylnaphthidate, Désoxypipradrol, Cyclazodone, Flmodafinil, HXE, MXiPr, JWH-073, Étomidate, Gaboxadol, Apomorphine, Bufoténine, LAE-32, MiPLA, Myristicine, PMMA, Éfavirenz, Prochlorpérazine, Progestérone, 2,5-DMA, Dichloropane, Méphénaqualone, Méclofénoxate*.
2. **Harmonisation et injection des 164 Profils Comparatifs bilingues** :
   - Chaque profil comparatif analyse rigoureusement les différences de puissance, de pharmacocinétique (latence, pic, durée), de tolérance et de risques de dépendance par rapport à l'étalon de la classe (ex. Morphine pour les opioïdes, Diazépam pour les benzodiazépines, Ritaline/Amphétamine pour les stimulants, Kétamine pour les dissociatifs, LSD/Psilocybine pour les psychédéliques).
   - Profil comparatif dédié rédigé pour l'**Opium** (teneur à 10% de morphine, synergie d'alcaloïdes, puissance équivalente à 0.80x, et biodisponibilité alvéolaire fumée vs orale).
3. **Harmonisation systématique de `effectsSummary` et `saferUse`** :
   - Déploiement de synthèses cliniques et de consignes de réduction des risques basées sur la pharmacologie pour l'ensemble des substances restantes sans données (Set & Setting pour les psychédéliques, hydratation/pause pour les stimulants, interdiction absolue des mélanges dépresseurs pour les GABA/opioïdes, protection vésicale pour les dissociatifs, surveillance psychiatrique pour les neuroleptiques).

### Métriques Finales de Couverture (Audit à 100%)
- **Total des substances** : 388 / 388 (100.0%)
- **Substances avec description clinique (`summary`)** : 388 / 388 en FR (100%) et 388 / 388 en EN (100%)
- **Substances avec profil comparatif explicite (`⚖️ Profil comparatif`)** : 388 / 388 en FR (100%) et 388 / 388 en EN (100%)
- **Substances avec résumé des effets (`effectsSummary`)** : 388 / 388 en FR (100%) et 388 / 388 en EN (100%)
- **Substances avec consignes RdR (`saferUse`)** : 388 / 388 en FR (100%) et 388 / 388 en EN (100%)

### Synchronisation des Livrables
- [`substances.json (FR)`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw-fr/substances.json) : 388 substances enrichies à 100%.
- [`substances.json (EN)`](file:///c:/Users/droll/Desktop/synaptik%20journal/psychonautwiki-journal-android-main/psychonautwiki-journal-android-main/app/src/main/res/raw/substances.json) : 388 substances enrichies à 100% de manière symétrique.
- [`simulateur_synaptik.html`](file:///c:/Users/droll/Desktop/synaptik%20journal/simulateur_synaptik.html) et artefact [`simulator.html`](file:///C:/Users/droll/.gemini/antigravity/brain/4d71d2db-7ecc-4fb0-9da8-047c03f36ad5/simulator.html) : Recompilés et synchronisés.
