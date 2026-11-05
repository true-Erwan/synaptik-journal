# Synaptik — Design brief for the new app (v2)

## Goal
Rebuild the Synaptik user interface as a simple, iPhone-style mobile app that can be deployed online.
The OLD INTERFACE is replaced. The DATA and LOGIC are kept: they are the product's main asset.

## Keep (do not delete or rewrite)
- The substances data (379 substances, French + English, brand names, routes of administration, kinetics).
- The interaction checker (NSAID stacking, lithium + NSAID, serotonin syndrome, QT risk, respiratory depression, liver toxicity, alcohol as a risk factor).
- The effect-curve calculation (dome-shaped curves, multi-dose stacking).
- The comparative profiles (164 molecules).
- The minimum delay between doses and the 24 h caps.

Where they live in this repo:
- `simulateur_synaptik.html`: the current bilingual web simulator. It embeds the substances data and the JavaScript logic (interactions, curves, delays). This is the main source to extract from.
- `psychonautwiki-journal-android-main/`: the original Android app (Kotlin) that Synaptik is based on (PsychonautWiki Journal, GPL-3.0 licence). Use it only as a reference.
- `MODIFICATIONS.md`: the list of everything changed compared with the original app.

Extract the data into clean JSON files and the logic into TypeScript modules, then build the new interface on top. Do not copy-paste the old UI. Keep the GPL-3.0 licence notice and credit the original project in an "À propos" section.

## Replace
Everything visual: layout, screens, navigation, styles.

## Tech stack
- React + Vite + TypeScript + Tailwind CSS.
- Progressive Web App (PWA): installable on iPhone from Safari ("Add to Home Screen"), works offline.
- Data stored on the phone only (localStorage / IndexedDB). No account, no server for now.
- Deploy on Vercel.

## Look and feel (iOS style)
- Font: system font stack `-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif`.
- Background: #F2F2F7 (iOS grouped grey). Cards: white, radius 18–24 px, no borders, no shadows.
- Primary color (buttons, titles): navy #1E2A5A.
- Accent "all good": turquoise #2BB6A8 (as fill only; text on light background uses #0E6158).
- Caution: orange fill #FDEBDA with text #8A4A0F. Danger: red border #E5484D, fill #FCE4E4, text #B4262B.
- Large titles (34 px bold), body 15–17 px, secondary text #5E5E66.
- Touch targets at least 44 px. One main action per screen.
- Bottom tab bar with 4 tabs: Aujourd'hui, Journal, Substances, Profil.
- FR / EN toggle (pill at top right), French by default.

## Screens
1. **Aujourd'hui (home)**
   - Date and "Bonjour [prénom]".
   - Status card (navy): "Aucun mélange à risque" + number of active substances, or a red/orange state if a risk exists.
   - "Mes prises du jour": list of doses with status pills: "Pris" (turquoise), "Attendre" (orange) with the time the next dose is possible.
   - Big button "Ajouter une prise".
2. **Ajouter une prise** (4 simple questions)
   - QUOI ? Search with autocomplete by molecule or brand name.
   - COMMENT ? Segmented control for the route of administration.
   - COMBIEN ? Dose pills. For medicines, show prescription-based doses only ("Selon votre ordonnance").
   - QUAND ? Plus tôt / Maintenant / Plus tard.
   - Button "Vérifier le mélange" → runs the interaction checker against active substances.
3. **Alerte de mélange** (only if a risk is found)
   - Level label (RISQUE ÉLEVÉ / PRUDENCE), the two substances, one plain-language sentence explaining why.
   - "Ce que vous pouvez faire": ask a pharmacist or doctor; emergency signs + "appelez le 15".
   - Buttons: "Ne pas prendre" (primary), "En savoir plus sur ce mélange" (secondary).
4. **Journal**
   - Effect-over-time chart for today (06:00–24:00), one curve per substance, "maintenant" line, orange dot for "prochaine prise possible", pinch/zoom.
   - History list (time, substance, peak and end time).
5. **Fiche substance**
   - Name, family, brand names, route.
   - "Bon à savoir" card.
   - "Mélanges à surveiller" list with level pills (Élevé / Prudence).
   - Link to the comparative profile.

The 5 reference screens are in the `maquette-reference/` folder (HTML files). Match them closely.

## Safety and wording rules
- Never suggest doses for misuse or non-medical use in the interface.
- Always neutral, kind, never moralising, never encouraging use.
- Every alert gives a next step (pharmacist, doctor, 15).
- Footer note in Profil: "Synaptik ne remplace pas un avis médical."

## Done when
- The 5 screens work on an iPhone-sized screen (390 × 844) and in Safari.
- Adding a dose updates Aujourd'hui and Journal; a risky mix opens the alert.
- The app installs on the home screen and works offline.
- It is deployed on Vercel with a public link.
