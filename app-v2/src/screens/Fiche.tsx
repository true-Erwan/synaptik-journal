import { useState } from 'react';
import { useStore } from '../store';
import type { T } from '../i18n';
import { getSubstanceByName, displayName } from '../logic/data';
import { availableRoutes, roaLabel } from '../logic/routes';
import { catLabel } from './Substances';
import { ChevronLeft } from '../ui/icons';
import LangToggle from '../ui/LangToggle';

// Substances whose interaction lists are worth surfacing as "mixes to watch".
// We scan this substance's own dangerous/unsafe lists and show the named ones.
function getMixes(name: string, lang: 'fr' | 'en') {
  const s = getSubstanceByName(name, 'en');
  if (!s || !s.interactions) return [];
  const out: { name: string; level: 'high' | 'caution'; why: string }[] = [];
  const seen = new Set<string>();
  const push = (n: string, level: 'high' | 'caution') => {
    if (seen.has(n)) return;
    seen.add(n);
    // Only show entries that look like concrete substances/classes (skip empties).
    out.push({ name: localizedOrRaw(n, lang), level, why: whyFor(s, n, lang) });
  };
  (s.interactions.dangerous || []).forEach((n) => push(n, 'high'));
  (s.interactions.unsafe || []).forEach((n) => push(n, 'caution'));
  return out.slice(0, 8);
}

function localizedOrRaw(n: string, lang: 'fr' | 'en'): string {
  const s = getSubstanceByName(n, 'en');
  return s ? displayName(n, lang) : n;
}

function whyFor(_s: unknown, otherName: string, lang: 'fr' | 'en'): string {
  const other = getSubstanceByName(otherName, 'en');
  const cats = (other?.categories || []).map((c) => c.toLowerCase());
  const fr = lang === 'fr';
  if (cats.includes('antidepressant') || ['Tramadol', 'MDMA', 'Sumatriptan'].includes(otherName))
    return fr ? 'Risque de syndrome sérotoninergique' : 'Serotonin syndrome risk';
  if (cats.includes('opioid') || cats.includes('benzodiazepine') || cats.includes('depressant'))
    return fr ? 'Risque de dépression respiratoire' : 'Respiratory depression risk';
  if (otherName === 'Lithium') return fr ? 'Taux de lithium augmenté' : 'Raised lithium levels';
  if (otherName === 'Alcohol' || otherName === 'Alcool') return fr ? 'Somnolence, à limiter' : 'Drowsiness, limit it';
  return fr ? 'Association à surveiller' : 'Combination to watch';
}

function extractComparative(summary: string | undefined): string | null {
  if (!summary) return null;
  const idx = summary.indexOf('⚖️');
  if (idx === -1) return null;
  return summary.slice(idx).replace('⚖️', '').trim();
}

function goodToKnow(summary: string | undefined, dosageRemark: string | undefined): string {
  if (dosageRemark) return dosageRemark;
  if (!summary) return '';
  const idx = summary.indexOf('⚖️');
  const base = idx === -1 ? summary : summary.slice(0, idx);
  return base.trim().split('\n')[0];
}

export default function Fiche({
  t,
  name,
  onBack,
}: {
  t: T;
  name: string;
  onBack: () => void;
}) {
  const lang = useStore((s) => s.lang);
  const s = getSubstanceByName(name, lang);
  const [showComparative, setShowComparative] = useState(false);

  if (!s) {
    return (
      <div className="flex flex-col h-full bg-ios">
        <div className="pt-[60px] px-4">
          <button onClick={onBack} className="h-11 flex items-center gap-1 text-navy text-[17px]">
            <ChevronLeft size={20} /> {t('tabSubstances')}
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center text-muted">—</div>
      </div>
    );
  }

  const disp = displayName(name, lang);
  const primaryCat = (s.categories || [])[0];
  const brands = (s.commonNames || []).filter((c) => c !== s.name && c !== disp).slice(0, 3);
  const routes = availableRoutes(s);
  const mixes = getMixes(name, lang);
  const comparative = extractComparative(s.summary);
  const gtk = goodToKnow(s.summary, s.dosageRemark);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-ios">
      {/* Top bar */}
      <div className="pt-[60px] px-4 flex items-center justify-between">
        <button onClick={onBack} className="h-11 flex items-center gap-1 text-navy text-[17px]">
          <ChevronLeft size={20} />
          {t('tabSubstances')}
        </button>
        <LangToggle />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
        {/* Title + tags */}
        <div className="px-5 pt-2 flex flex-col gap-2">
          <h1 className="m-0 text-[32px] font-bold tracking-[-0.5px]">{disp}</h1>
          <div className="flex gap-2 flex-wrap">
            {primaryCat && (
              <div className="px-2.5 py-1.5 rounded-[10px] text-[13px] font-semibold" style={{ background: '#E3E6F3', color: '#1E2A5A' }}>
                {catLabel(primaryCat, lang)}
              </div>
            )}
            {brands.map((b) => (
              <div key={b} className="px-2.5 py-1.5 rounded-[10px] text-[13px] bg-white" style={{ color: '#3A3A40' }}>
                {b}
              </div>
            ))}
            {routes.slice(0, 2).map((r) => (
              <div key={r} className="px-2.5 py-1.5 rounded-[10px] text-[13px] bg-white" style={{ color: '#3A3A40' }}>
                {roaLabel(r, lang)}
              </div>
            ))}
          </div>
        </div>

        {/* Good to know */}
        {gtk && (
          <div className="mt-[18px] mx-4 p-4 rounded-card bg-white flex flex-col gap-1.5">
            <div className="text-[13px] text-muted font-semibold">{t('goodToKnow')}</div>
            <div className="text-[15px] leading-[1.45]">{gtk}</div>
          </div>
        )}

        {/* Mixes to watch */}
        {mixes.length > 0 && (
          <>
            <div className="pt-[22px] px-5 pb-2 text-[20px] font-bold">{t('mixesToWatch')}</div>
            <div className="mx-4 bg-white rounded-card flex flex-col">
              {mixes.map((m, idx) => (
                <div key={m.name} className={`flex items-center gap-3 px-4 py-[14px] ${idx < mixes.length - 1 ? 'border-b border-hairline' : ''}`}>
                  <div className="flex-grow flex flex-col gap-0.5 min-w-0">
                    <div className="text-[16px] font-semibold truncate">{m.name}</div>
                    <div className="text-[13px] text-muted truncate">{m.why}</div>
                  </div>
                  <div
                    className="px-2.5 py-1.5 rounded-xl text-[13px] font-bold"
                    style={
                      m.level === 'high'
                        ? { background: '#FCE4E4', color: '#B4262B' }
                        : { background: '#FDEBDA', color: '#8A4A0F' }
                    }
                  >
                    {m.level === 'high' ? t('levelHigh') : t('levelCaution')}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Comparative profile */}
        {comparative && (
          <div className="mt-3.5 mx-4 rounded-card bg-white overflow-hidden">
            <button
              onClick={() => setShowComparative((v) => !v)}
              className="w-full px-4 py-3.5 flex items-center justify-between"
            >
              <div className="flex flex-col gap-0.5 text-left">
                <div className="text-[16px] font-semibold">⚖️ {t('comparativeProfile')}</div>
                <div className="text-[13px] text-muted">{t('comparativeSub')}</div>
              </div>
              <span className="text-muted text-[18px]">{showComparative ? '▾' : '▸'}</span>
            </button>
            {showComparative && (
              <div className="px-4 pb-4 text-[15px] leading-[1.5]" style={{ color: '#2C2C30' }}>
                {comparative}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
