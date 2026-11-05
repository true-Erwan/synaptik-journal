// App state. Everything is stored ON THE DEVICE ONLY (localStorage). No account, no server.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Lang, Ingestion } from './logic/types';

// A recurring daily treatment (e.g. Sertraline 50 mg every day at 08:00).
export interface Treatment {
  id: string;
  substanceName: string; // canonical EN name
  route: string;
  dose: number | null;
  unit: string;
  hour: number; // 0-23
  minute: number; // 0-59
}

export interface AppState {
  lang: Lang;
  name: string;
  ingestions: Ingestion[];
  // Recurring daily treatments shown every day in Aujourd'hui.
  treatments: Treatment[];
  // Background therapies / risk factors the user has enabled (canonical EN keys).
  riskFactors: string[];
  // Public URL for the "Share the app" QR code (set after deploy).
  publicUrl: string;

  setLang: (l: Lang) => void;
  toggleLang: () => void;
  setName: (n: string) => void;
  setPublicUrl: (u: string) => void;
  addIngestion: (i: Omit<Ingestion, 'id'>) => void;
  removeIngestion: (id: string) => void;
  addTreatment: (t: Omit<Treatment, 'id'>) => void;
  removeTreatment: (id: string) => void;
  toggleRiskFactor: (key: string) => void;
  loadDemo: () => void;
  clearData: () => void;
}

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      lang: 'fr',
      name: 'Léa',
      ingestions: [],
      treatments: [],
      // No background risk factors enabled by default — the user opts in from
      // Profil. This prevents false alerts (e.g. Ibuprofen vs Lithium in the demo).
      riskFactors: [],
      publicUrl: '',

      setLang: (l) => set({ lang: l }),
      toggleLang: () => set((s) => ({ lang: s.lang === 'fr' ? 'en' : 'fr' })),
      setName: (n) => set({ name: n }),
      setPublicUrl: (u) => set({ publicUrl: u }),
      addIngestion: (i) => set((s) => ({ ingestions: [...s.ingestions, { ...i, id: uid() }] })),
      removeIngestion: (id) => set((s) => ({ ingestions: s.ingestions.filter((x) => x.id !== id) })),
      addTreatment: (t) => set((s) => ({ treatments: [...s.treatments, { ...t, id: uid() }] })),
      removeTreatment: (id) => set((s) => ({ treatments: s.treatments.filter((x) => x.id !== id) })),
      toggleRiskFactor: (key) =>
        set((s) => ({
          riskFactors: s.riskFactors.includes(key)
            ? s.riskFactors.filter((k) => k !== key)
            : [...s.riskFactors, key],
        })),

      // Demo profile "Léa": a daily Sertraline treatment + Paracetamol taken today.
      // Paracetamol is used (rather than Ibuprofen) so the home card can honestly
      // read "Aucun mélange à risque": Sertraline + NSAID is a real caution
      // (bleeding risk), while Sertraline + Paracetamol is not. Paracetamol still
      // has a 4h minimum delay, so the "next dose possible" row is shown.
      // Adding Tramadol then escalates to the high-risk alert with Sertraline.
      loadDemo: () =>
        set(() => ({
          name: 'Léa',
          riskFactors: [],
          treatments: [
            { id: uid(), substanceName: 'Sertraline', route: 'oral', dose: 50, unit: 'mg', hour: 8, minute: 0 },
          ],
          ingestions: [
            // Taken ~90 min ago so it's reliably still "active" whenever the
            // demo is loaded, with a visible next-dose-possible time.
            { id: uid(), substanceName: 'Paracetamol', route: 'oral', dose: 1000, unit: 'mg', time: Date.now() - 90 * 60_000 },
          ],
        })),

      clearData: () =>
        set(() => ({
          name: 'Léa',
          ingestions: [],
          treatments: [],
          riskFactors: [],
        })),
    }),
    { name: 'synaptik-v2' },
  ),
);
