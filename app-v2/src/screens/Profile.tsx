import { useMemo, useState } from 'react';
import { useStore } from '../store';
import type { T } from '../i18n';
import type { Substance } from '../logic/types';
import { getSubstanceByName, displayName } from '../logic/data';
import { searchSubstances } from '../logic/search';
import { isDivertible, getMedicalDoseOptions } from '../logic/dosing';
import { availableRoutes } from '../logic/routes';
import { SearchIcon } from '../ui/icons';

export default function Profile({ t, onShare }: { t: T; onShare: () => void }) {
  const lang = useStore((s) => s.lang);
  const name = useStore((s) => s.name);
  const setName = useStore((s) => s.setName);
  const treatments = useStore((s) => s.treatments);
  const addTreatment = useStore((s) => s.addTreatment);
  const removeTreatment = useStore((s) => s.removeTreatment);
  const loadDemo = useStore((s) => s.loadDemo);
  const clearData = useStore((s) => s.clearData);
  const toggleLang = useStore((s) => s.toggleLang);

  const [adding, setAdding] = useState(false);
  const [query, setQuery] = useState('');
  const [picked, setPicked] = useState<Substance | null>(null);
  const [dose, setDose] = useState<number | null>(null);
  const [time, setTime] = useState('08:00');
  const [confirmClear, setConfirmClear] = useState(false);

  const hits = useMemo(() => (picked ? [] : searchSubstances(query, lang, 6)), [query, lang, picked]);

  function pick(s: Substance) {
    const canonical = getSubstanceByName(s.name, 'en') || s;
    setPicked(canonical);
    setQuery(displayName(canonical.name, lang));
    if (!isDivertible(canonical)) {
      const route = availableRoutes(canonical)[0];
      const opts = getMedicalDoseOptions(canonical.name, route, lang);
      const std = opts.find((o) => o.label.toLowerCase().includes('standard')) || opts[0];
      setDose(std ? std.value : null);
    } else {
      setDose(null);
    }
  }

  function saveTreatment() {
    if (!picked) return;
    const route = availableRoutes(picked)[0];
    const roa = (picked.roas || []).find((r) => r.name === route) || (picked.roas || [])[0];
    const unit = roa?.dose?.units || 'mg';
    const [h, m] = time.split(':').map(Number);
    addTreatment({ substanceName: picked.name, route, dose: isDivertible(picked) ? null : dose, unit, hour: h, minute: m });
    setAdding(false);
    setPicked(null);
    setQuery('');
    setDose(null);
    setTime('08:00');
  }

  const medicalDoses = picked && !isDivertible(picked)
    ? getMedicalDoseOptions(picked.name, availableRoutes(picked)[0], lang)
    : [];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
        <div className="pt-16 px-5">
          <h1 className="m-0 text-[34px] font-bold tracking-[-0.5px]">{t('tabProfile')}</h1>
        </div>

        {/* Name + language */}
        <div className="mt-[18px] mx-4 bg-white rounded-card flex flex-col">
          <div className="flex items-center gap-3 px-4 py-[14px] border-b border-hairline">
            <div className="text-[15px] text-muted w-[90px]">{lang === 'fr' ? 'Prénom' : 'First name'}</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-grow text-[16px] font-semibold outline-none bg-transparent text-right"
              placeholder="Léa"
            />
          </div>
          <div className="flex items-center justify-between px-4 py-[14px]">
            <div className="text-[15px] text-muted">{t('language')}</div>
            <button onClick={toggleLang} className="h-8 px-3 rounded-2xl bg-ios text-navy text-[13px] font-semibold">
              {lang === 'fr' ? 'Français' : 'English'}
            </button>
          </div>
        </div>

        {/* Daily treatments */}
        <div className="pt-[22px] px-5 pb-2 text-[20px] font-bold">
          {lang === 'fr' ? 'Mes traitements quotidiens' : 'My daily treatments'}
        </div>
        <div className="mx-4 bg-white rounded-card flex flex-col">
          {treatments.length === 0 && !adding && (
            <div className="px-4 py-4 text-[15px] text-muted">
              {lang === 'fr' ? 'Aucun traitement de fond.' : 'No daily treatment.'}
            </div>
          )}
          {treatments.map((tr, idx) => {
            const s = getSubstanceByName(tr.substanceName, 'en');
            return (
              <div key={tr.id} className={`flex items-center gap-3 px-4 py-[14px] ${idx < treatments.length - 1 || adding ? 'border-b border-hairline' : ''}`}>
                <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: s?.color || '#1E2A5A' }} />
                <div className="flex-grow min-w-0">
                  <div className="text-[16px] font-semibold truncate">
                    {displayName(tr.substanceName, lang)}
                    {tr.dose != null ? ` ${tr.dose} ${tr.unit}` : ''}
                  </div>
                  <div className="text-[13px] text-muted">
                    {lang === 'fr' ? 'Tous les jours à' : 'Every day at'} {String(tr.hour).padStart(2, '0')}:
                    {String(tr.minute).padStart(2, '0')}
                  </div>
                </div>
                <button onClick={() => removeTreatment(tr.id)} className="text-[13px] font-semibold px-2 py-1 rounded-lg" style={{ color: '#B4262B', background: '#FCE4E4' }}>
                  {lang === 'fr' ? 'Suppr.' : 'Delete'}
                </button>
              </div>
            );
          })}

          {/* Inline add form */}
          {adding && (
            <div className="px-4 py-3 flex flex-col gap-2.5">
              <div className="h-11 rounded-[12px] bg-ios flex items-center gap-2 px-3">
                <SearchIcon size={18} />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (picked) setPicked(null);
                  }}
                  placeholder={t('searchPlaceholder')}
                  className="flex-grow border-0 outline-none text-[15px] bg-transparent"
                  autoFocus
                />
              </div>
              {hits.length > 0 && (
                <div className="bg-ios rounded-[12px] flex flex-col overflow-hidden">
                  {hits.map((h) => (
                    <button key={h.substance.name} onClick={() => pick(h.substance)} className="flex items-center gap-2 px-3 py-2.5 text-left border-b border-hairline last:border-0">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ background: h.substance.color || '#1E2A5A' }} />
                      <span className="text-[15px] font-medium truncate">{h.displayName}</span>
                      {h.brands && <span className="text-[12px] text-muted truncate">· {h.brands}</span>}
                    </button>
                  ))}
                </div>
              )}
              {picked && (
                <>
                  {medicalDoses.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {medicalDoses.map((d) => (
                        <button
                          key={d.label}
                          onClick={() => setDose(d.value)}
                          className="h-9 px-3.5 rounded-full text-[14px]"
                          style={{
                            border: `2px solid ${dose === d.value ? '#1E2A5A' : '#C7C7CC'}`,
                            background: dose === d.value ? '#1E2A5A' : '#FFFFFF',
                            color: dose === d.value ? '#FFFFFF' : '#1C1C1E',
                          }}
                        >
                          {d.value} {d.units}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-muted">{lang === 'fr' ? 'Heure' : 'Time'}</span>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="text-[15px] bg-ios rounded-lg px-2 py-1" />
                  </div>
                </>
              )}
              <div className="flex gap-2">
                <button onClick={saveTreatment} disabled={!picked} className="h-10 flex-grow rounded-xl bg-navy text-white text-[15px] font-semibold disabled:opacity-40">
                  {lang === 'fr' ? 'Enregistrer' : 'Save'}
                </button>
                <button onClick={() => { setAdding(false); setPicked(null); setQuery(''); }} className="h-10 px-4 rounded-xl bg-ios text-navy text-[15px] font-semibold">
                  {t('cancel')}
                </button>
              </div>
            </div>
          )}

          {!adding && (
            <button onClick={() => setAdding(true)} className="px-4 py-[14px] text-[15px] font-semibold text-navy text-left border-t border-hairline">
              + {lang === 'fr' ? 'Ajouter un traitement' : 'Add a treatment'}
            </button>
          )}
        </div>

        {/* Demo / data actions */}
        <div className="pt-[22px] px-4 flex flex-col gap-2.5">
          <button onClick={loadDemo} className="h-12 rounded-2xl bg-turquoise text-white text-[16px] font-semibold">
            {lang === 'fr' ? 'Charger la démo (Léa)' : 'Load the demo (Léa)'}
          </button>
          <button onClick={onShare} className="h-12 rounded-2xl bg-navy text-white text-[16px] font-semibold">
            {lang === 'fr' ? "Partager l'app" : 'Share the app'}
          </button>
          {confirmClear ? (
            <div className="rounded-2xl p-3 flex flex-col gap-2" style={{ background: '#FCE4E4' }}>
              <div className="text-[14px]" style={{ color: '#B4262B' }}>
                {lang === 'fr' ? 'Effacer toutes vos données ?' : 'Erase all your data?'}
              </div>
              <div className="flex gap-2">
                <button onClick={() => { clearData(); setConfirmClear(false); }} className="h-10 flex-grow rounded-xl text-white text-[15px] font-semibold" style={{ background: '#B4262B' }}>
                  {lang === 'fr' ? 'Oui, effacer' : 'Yes, erase'}
                </button>
                <button onClick={() => setConfirmClear(false)} className="h-10 px-4 rounded-xl bg-white text-navy text-[15px] font-semibold">
                  {t('cancel')}
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setConfirmClear(true)} className="h-12 rounded-2xl bg-white text-[16px] font-semibold" style={{ color: '#B4262B' }}>
              {lang === 'fr' ? 'Effacer mes données' : 'Erase my data'}
            </button>
          )}
        </div>

        {/* About */}
        <div className="pt-[22px] px-5 pb-2 text-[20px] font-bold">{t('about')}</div>
        <div className="mx-4 bg-white rounded-card p-4 flex flex-col gap-2">
          <div className="text-[15px] font-semibold">{t('medicalDisclaimer')}</div>
          <div className="text-[13px] text-muted leading-[1.5]">{t('aboutText')}</div>
        </div>
      </div>
    </div>
  );
}
