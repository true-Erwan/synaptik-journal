import { useMemo, useState } from 'react';
import { useStore } from '../store';
import type { T } from '../i18n';
import { getSubstances, getCategory, displayName } from '../logic/data';
import { searchSubstances } from '../logic/search';
import { SearchIcon, ChevronRight } from '../ui/icons';

// Category filter pills shown in the carousel (keys present in the data).
const FILTER_CATS = [
  'analgesic', 'nsaid', 'triptan', 'antidepressant', 'anxiolytic', 'antihistamine',
  'mood-stabilizer', 'anticonvulsant', 'antipsychotic', 'gabapentinoid', 'opioid',
  'benzodiazepine', 'stimulant', 'psychedelic', 'dissociative', 'entactogen',
  'cannabinoid', 'depressant', 'nootropic',
];

export default function Substances({ t, onOpen }: { t: T; onOpen: (name: string) => void }) {
  const lang = useStore((s) => s.lang);
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<string>('ALL');

  const all = getSubstances(lang);

  const list = useMemo(() => {
    let base = query.trim()
      ? searchSubstances(query, lang, 400).map((h) => h.substance)
      : all;
    if (cat !== 'ALL') base = base.filter((s) => (s.categories || []).includes(cat));
    return [...base].sort((a, b) => displayName(a.name, lang).localeCompare(displayName(b.name, lang)));
  }, [query, cat, all, lang]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="pt-16 px-5 flex flex-col gap-1">
        <h1 className="m-0 text-[34px] font-bold tracking-[-0.5px]">{t('tabSubstances')}</h1>
      </div>

      {/* Search */}
      <div className="px-4 pt-3">
        <div className="h-11 rounded-[12px] bg-white flex items-center gap-2 px-3.5 border border-hairline">
          <SearchIcon size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchSubstances')}
            className="flex-grow border-0 outline-none text-[16px] bg-transparent"
          />
        </div>
      </div>

      {/* Category pills */}
      <div className="pt-3 pb-1">
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4">
          <Pill active={cat === 'ALL'} label={lang === 'fr' ? `Toutes (${all.length})` : `All (${all.length})`} onClick={() => setCat('ALL')} />
          {FILTER_CATS.map((key) => {
            const count = all.filter((s) => (s.categories || []).includes(key)).length;
            if (count === 0) return null;
            const c = getCategory(key, lang);
            const color = c?.color ? argbToHex(c.color) : '#1E2A5A';
            return (
              <Pill
                key={key}
                active={cat === key}
                label={`${catLabel(key, lang)} (${count})`}
                color={color}
                onClick={() => setCat(key)}
              />
            );
          })}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-6">
        <div className="bg-white rounded-card flex flex-col mt-1">
          {list.map((s, idx) => {
            const disp = displayName(s.name, lang);
            const brands = (s.commonNames || []).filter((c) => c !== s.name && c !== disp).slice(0, 2).join(', ');
            const primaryCat = (s.categories || [])[0];
            return (
              <button
                key={s.name}
                onClick={() => onOpen(s.name)}
                className={`flex items-center gap-3 px-4 py-[13px] text-left ${idx < list.length - 1 ? 'border-b border-hairline' : ''}`}
              >
                <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: s.color || '#1E2A5A' }} />
                <div className="flex-grow min-w-0">
                  <div className="text-[16px] font-semibold truncate">{disp}</div>
                  <div className="text-[13px] text-muted truncate">
                    {[primaryCat ? catLabel(primaryCat, lang) : '', brands].filter(Boolean).join(' · ')}
                  </div>
                </div>
                <ChevronRight size={18} />
              </button>
            );
          })}
          {list.length === 0 && <div className="px-4 py-5 text-[15px] text-muted">—</div>}
        </div>
      </div>
    </div>
  );
}

function Pill({ active, label, color = '#1E2A5A', onClick }: { active: boolean; label: string; color?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-9 px-3.5 rounded-full text-[13px] font-semibold whitespace-nowrap flex items-center gap-1.5 flex-shrink-0"
      style={{
        background: active ? color : '#FFFFFF',
        color: active ? '#FFFFFF' : '#1C1C1E',
        border: active ? `1px solid ${color}` : '1px solid #E5E5EA',
      }}
    >
      {!active && <span className="w-2 h-2 rounded-full inline-block" style={{ background: color }} />}
      {label}
    </button>
  );
}

function argbToHex(argb: number): string {
  const r = (argb >> 16) & 255;
  const g = (argb >> 8) & 255;
  const b = argb & 255;
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
}

const CAT_LABELS: Record<string, { fr: string; en: string }> = {
  analgesic: { fr: 'Antalgiques', en: 'Analgesics' },
  nsaid: { fr: 'AINS', en: 'NSAIDs' },
  triptan: { fr: 'Triptans', en: 'Triptans' },
  antidepressant: { fr: 'Antidépresseurs', en: 'Antidepressants' },
  anxiolytic: { fr: 'Anxiolytiques', en: 'Anxiolytics' },
  antihistamine: { fr: 'Antihistaminiques', en: 'Antihistamines' },
  'mood-stabilizer': { fr: "Régulateurs d'humeur", en: 'Mood stabilizers' },
  anticonvulsant: { fr: 'Antiépileptiques', en: 'Anticonvulsants' },
  antipsychotic: { fr: 'Antipsychotiques', en: 'Antipsychotics' },
  gabapentinoid: { fr: 'Gabapentinoïdes', en: 'Gabapentinoids' },
  opioid: { fr: 'Opioïdes', en: 'Opioids' },
  benzodiazepine: { fr: 'Benzodiazépines', en: 'Benzodiazepines' },
  stimulant: { fr: 'Stimulants', en: 'Stimulants' },
  psychedelic: { fr: 'Psychédéliques', en: 'Psychedelics' },
  dissociative: { fr: 'Dissociatifs', en: 'Dissociatives' },
  entactogen: { fr: 'Entactogènes', en: 'Entactogens' },
  cannabinoid: { fr: 'Cannabinoïdes', en: 'Cannabinoids' },
  depressant: { fr: 'Dépresseurs', en: 'Depressants' },
  nootropic: { fr: 'Nootropiques', en: 'Nootropics' },
  common: { fr: 'Courant', en: 'Common' },
  'research-chemical': { fr: 'Produit de recherche', en: 'Research chemical' },
};

export function catLabel(key: string, lang: 'fr' | 'en'): string {
  return CAT_LABELS[key]?.[lang] || key;
}
