// App state. Everything is stored ON THE DEVICE ONLY (localStorage). No account, no server.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Lang, Ingestion } from './logic/types';

export interface AppState {
  lang: Lang;
  name: string;
  ingestions: Ingestion[];
  // Background therapies / risk factors the user has enabled (canonical EN keys).
  riskFactors: string[];

  setLang: (l: Lang) => void;
  toggleLang: () => void;
  setName: (n: string) => void;
  addIngestion: (i: Omit<Ingestion, 'id'>) => void;
  removeIngestion: (id: string) => void;
  toggleRiskFactor: (key: string) => void;
}

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      lang: 'fr',
      name: 'Inès',
      ingestions: [],
      riskFactors: ['Alcohol', 'Lithium', 'NSAIDs', 'SSRIs'],

      setLang: (l) => set({ lang: l }),
      toggleLang: () => set((s) => ({ lang: s.lang === 'fr' ? 'en' : 'fr' })),
      setName: (n) => set({ name: n }),
      addIngestion: (i) => set((s) => ({ ingestions: [...s.ingestions, { ...i, id: uid() }] })),
      removeIngestion: (id) => set((s) => ({ ingestions: s.ingestions.filter((x) => x.id !== id) })),
      toggleRiskFactor: (key) =>
        set((s) => ({
          riskFactors: s.riskFactors.includes(key)
            ? s.riskFactors.filter((k) => k !== key)
            : [...s.riskFactors, key],
        })),
    }),
    { name: 'synaptik-v2' },
  ),
);
