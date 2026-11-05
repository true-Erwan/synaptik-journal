# Synaptik — app v2

A rebuilt, iPhone-style PWA for Synaptik: track your intakes and check risky mixes.
React + Vite + TypeScript + Tailwind. Data and logic are extracted from the original
simulator; the UI is new.

The app is derived from the open-source **PsychonautWiki Journal** project (GPL-3.0).
Data comes from PsychonautWiki. See the "À propos" section in the app.

> Synaptik ne remplace pas un avis médical.

## What's inside

- `src/data/` — extracted JSON: 388 substances (FR + EN), categories, non-divertible
  medical doses, and a curated medical schedule (min delays + 24h caps).
- `src/logic/` — pure TypeScript: interaction engine, effect-curve maths, dosing rules,
  search, pre-ingestion checks.
- `src/screens/` — the 5 screens: Aujourd'hui, Ajouter, Alerte, Journal, Substances/Fiche,
  Profil, plus a Share (QR) screen.
- Data is stored **on the device only** (localStorage). No account, no server.
- Installable PWA (works offline, "Add to Home Screen" on iPhone).

## Run locally

```bash
cd app-v2
npm install
npm run dev
```

Then open http://localhost:5173/ (use your browser's device toolbar at 390 × 844 for an
iPhone view).

To re-extract the data from the original simulator (read-only source):

```bash
npm run extract
```

## Build

```bash
npm run build      # type-checks then builds to dist/
npm run preview    # serve the production build locally
```

## Deploy on Vercel

1. Push this repo to GitHub (done).
2. On https://vercel.com, click **Add New… → Project** and import the repository.
3. In the project settings, set **Root Directory** to `app-v2`.
   Vercel auto-detects Vite (build `npm run build`, output `dist`). `vercel.json` already
   sets this and the SPA rewrite.
4. Click **Deploy**. You get a public URL like `https://synaptik-xxxx.vercel.app`.
5. Open the app → **Profil → Partager l'app**, paste that URL in the "Lien public" field:
   the QR code then points to the public link for the jury to scan.

CLI alternative:

```bash
npm i -g vercel
cd app-v2
vercel            # first run: link/create project, set root to app-v2
vercel --prod     # production deploy, prints the public URL
```
