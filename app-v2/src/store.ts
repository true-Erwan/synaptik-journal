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

function todayAt(h: number, m: number): number {
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.getTime();
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

      // Demo profile "Léa": a daily Sertraline treatment + an ibuprofen taken today.
      loadDemo: () =>
        set(() => ({
          name: 'Léa',
          riskFactors: [],
          treatments: [
            { id: uid(), substanceName: 'Sertraline', route: 'oral', dose: 50, unit: 'mg', hour: 8, minute: 0 },
          ],
          ingestions: [
            { id: uid(), substanceName: 'Ibuprofen', route: 'oral', dose: 400, unit: 'mg', time: todayAt(12, 10) },
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
