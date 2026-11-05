import { useMemo, useState } from 'react';
import { useStore } from '../store';
import type { T } from '../i18n';
import type { Substance } from '../logic/types';
import { getSubstanceByName } from '../logic/data';
import { searchSubstances } from '../logic/search';
import { availableRoutes, roaLabel, ROA_COLORS } from '../logic/routes';
import { isDivertible, getMedicalDoseOptions } from '../logic/dosing';
import { preCheck, type PreCheckResult } from '../logic/precheck';
import { buildTodayIngestions } from '../logic/today';
import { SearchIcon, CheckIcon } from '../ui/icons';
import { formatTime } from '../ui/format';

type When = 'earlier' | 'now' | 'later';

export interface AddResult {
  action: 'saved' | 'alert';
  // populated when action === 'alert'
  payload?: {
    a: string;
    b: string;
    level: 'high' | 'caution';
    reason: string;
    pending: { substanceName: string; route: string; dose: number | null; unit: string; time: number };
    fiche: string;
  };
}

export default function Add({
  t,
  onCancel,
  onResult,
}: {
  t: T;
  onCancel: () => void;
  onResult: (r: AddResult) => void;
}) {
  const lang = useStore((s) => s.lang);
  const ingestions = useStore((s) => s.ingestions);
  const treatments = useStore((s) => s.treatments);
  const riskFactors = useStore((s) => s.riskFactors);
  const addIngestion = useStore((s) => s.addIngestion);

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Substance | null>(null);
  const [route, setRoute] = useState('oral');
  const [dose, setDose] = useState<number | null>(null);
  const [when, setWhen] = useState<When>('now');
  const [customTime, setCustomTime] = useState<string>(''); // HH:MM
  const [warnings, setWarnings] = useState<PreCheckResult | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const hits = useMemo(() => (selected ? [] : searchSubstances(query, lang, 8)), [query, lang, selected]);

  const routes = selected ? availableRoutes(selected) : ['oral'];
  const divertible = isDivertible(selected || undefined);
  const medicalDoses = selected && !divertible ? getMedicalDoseOptions(selected.name, route, lang) : [];

  function pickSubstance(s: Substance) {
    const canonical = getSubstanceByName(s.name, 'en') || s;
    setSelected(canonical);
    setQuery(s.name);
    const rts = availableRoutes(canonical);
    setRoute(rts[0]);
    setWarnings(null);
    // Preselect standard medical dose for non-divertible medicines.
    if (!isDivertible(canonical)) {
      const opts = getMedicalDoseOptions(canonical.name, rts[0], lang);
      const std = opts.find((o) => o.label.toLowerCase().includes('standard')) || opts[0];
      setDose(std ? std.value : null);
    } else {
      setDose(null);
    }
  }

  function resetSearch() {
    setSelected(null);
    setDose(null);
    setQuery('');
    setWarnings(null);
  }

  function computeTime(): number {
    const now = new Date();
    if (customTime) {
      const [h, m] = customTime.split(':').map(Number);
      const d = new Date();
      d.setHours(h, m, 0, 0);
      return d.getTime();
    }
    if (when === 'earlier') return now.getTime() - 60 * 60 * 1000;
    if (when === 'later') return now.getTime() + 60 * 60 * 1000;
    return now.getTime();
  }

  const unit = useMemo(() => {
    if (!selected) return 'mg';
    const roa = (selected.roas || []).find((r) => r.name === route) || (selected.roas || [])[0];
    return roa?.dose?.units || 'mg';
  }, [selected, route]);

  function handleCheck() {
    if (!selected) return;
    const time = computeTime();
    // Include today's daily treatments as active substances for the mix check.
    const effective = buildTodayIngestions(ingestions, treatments, time);
    const result = preCheck(selected.name, route, dose, effective, riskFactors, lang, time);
    setWarnings(result);

    const pending = { substanceName: selected.name, route, dose: divertible ? null : dose, unit, time };

    if (result.mix) {
      onResult({
        action: 'alert',
        payload: {
          a: result.mix.a,
          b: result.mix.b,
          level: result.mix.type === 'DANGEROUS' ? 'high' : 'caution',
          reason: result.mix.reason,
          pending,
          fiche: selected.name,
        },
      });
      return;
    }

    // Non-blocking warnings (delay / cap) are shown inline; the user can still save.
    addIngestion(pending);
    setToast(lang === 'fr' ? 'Ajouté ✓' : 'Added ✓');
    setTimeout(() => onResult({ action: 'saved' }), 650);
  }

  const activeCount = ingestions.length;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-ios">
      {/* Top bar */}
      <div className="pt-[60px] px-4 flex items-center justify-between">
        <button onClick={onCancel} className="h-11 flex items-center text-navy text-[17px]">
          {t('cancel')}
        </button>
        <div className="text-[17px] font-semibold">{t('newIntake')}</div>
        <div className="w-[60px]" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-4">
        {/* QUOI */}
        <div className="px-4 pt-3">
          <label className="block text-[13px] text-muted font-semibold px-1 pb-1.5">{t('qWhat')}</label>
          <div
            className="h-12 rounded-[14px] bg-white flex items-center gap-2 px-3.5"
            style={{ border: '2px solid #1E2A5A' }}
          >
            <SearchIcon size={20} />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (selected) setSelected(null);
              }}
              placeholder={t('searchPlaceholder')}
              className="flex-grow border-0 outline-none text-[17px] bg-transparent text-ink"
            />
            {selected && (
              <button onClick={resetSearch} className="text-navy text-[15px] font-semibold px-1">
                {lang === 'fr' ? 'Changer' : 'Change'}
              </button>
            )}
          </div>

          {/* Suggestions */}
          {hits.length > 0 && (
            <div className="mt-2 bg-white rounded-[14px] flex flex-col overflow-hidden">
              {hits.map((h, i) => (
                <button
                  key={h.substance.name}
                  onClick={() => pickSubstance(h.substance)}
                  className={`flex justify-between items-center px-3.5 py-3 text-left ${
                    i < hits.length - 1 ? 'border-b border-hairline' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-3 h-3 rounded-sm flex-shrink-0"
                      style={{ background: h.substance.color || '#1E2A5A' }}
                    />
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <div className="text-[16px] font-semibold truncate">{h.displayName}</div>
                      {h.brands && <div className="text-[13px] text-muted truncate">{h.brands}</div>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {selected && (
          <>
            {/* COMMENT */}
            <div className="px-4 pt-5">
              <div className="text-[13px] text-muted font-semibold px-1 pb-1.5">{t('qHow')}</div>
              <div className="flex flex-wrap gap-2">
                {routes.map((r) => {
                  const active = r === route;
                  return (
                    <button
                      key={r}
                      onClick={() => {
                        setRoute(r);
                        if (!divertible) {
                          const opts = getMedicalDoseOptions(selected.name, r, lang);
                          const std = opts.find((o) => o.label.toLowerCase().includes('standard')) || opts[0];
                          setDose(std ? std.value : null);
                        }
                      }}
                      className="h-10 px-3.5 rounded-[11px] text-[15px]"
                      style={{
                        background: active ? '#FFFFFF' : '#E3E3E8',
                        fontWeight: active ? 600 : 400,
                        color: active ? '#1C1C1E' : '#3A3A40',
                        border: active ? `2px solid ${ROA_COLORS[r] || '#1E2A5A'}` : '2px solid transparent',
                      }}
                    >
                      {roaLabel(r, lang)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* COMBIEN */}
            <div className="px-4 pt-5">
              <div className="text-[13px] text-muted font-semibold px-1 pb-1.5">{t('qHowMuch')}</div>
              {divertible ? (
                <div className="text-[15px] text-muted bg-white rounded-[14px] px-4 py-3">
                  {t('askProfessional')}
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2">
                    {medicalDoses.map((d) => {
                      const active = dose === d.value;
                      return (
                        <button
                          key={d.label}
                          onClick={() => setDose(d.value)}
                          className="h-11 px-[18px] rounded-[22px] text-[15px]"
                          style={{
                            border: `2px solid ${active ? '#1E2A5A' : '#C7C7CC'}`,
                            background: active ? '#1E2A5A' : '#FFFFFF',
                            color: active ? '#FFFFFF' : '#1C1C1E',
                            fontWeight: active ? 600 : 400,
                          }}
                        >
                          {d.value} {d.units}
                        </button>
                      );
                    })}
                  </div>
                  <div className="text-[13px] text-muted px-1 pt-2">{t('perPrescription')}</div>
                </>
              )}
            </div>

            {/* QUAND */}
            <div className="px-4 pt-5">
              <div className="text-[13px] text-muted font-semibold px-1 pb-1.5">{t('qWhen')}</div>
              <div
                className="h-10 rounded-[12px] p-[3px] box-border grid grid-cols-3 gap-[3px]"
                style={{ background: '#E3E3E8' }}
              >
                {(['earlier', 'now', 'later'] as When[]).map((w) => {
                  const active = when === w && !customTime;
                  return (
                    <button
                      key={w}
                      onClick={() => {
                        setWhen(w);
                        setCustomTime('');
                      }}
                      className="rounded-[9px] text-[15px]"
                      style={{
                        background: active ? '#FFFFFF' : 'transparent',
                        fontWeight: active ? 600 : 400,
                        color: active ? '#1C1C1E' : '#3A3A40',
                      }}
                    >
                      {w === 'earlier' ? t('earlier') : w === 'now' ? t('now') : t('later')}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-2 pt-2 px-1">
                <span className="text-[13px] text-muted">{lang === 'fr' ? 'Heure précise' : 'Exact time'}</span>
                <input
                  type="time"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  className="text-[15px] bg-white rounded-lg px-2 py-1 border border-hairline"
                />
              </div>
            </div>

            {/* Inline non-blocking warnings */}
            {warnings && (warnings.delay || warnings.cap) && (
              <div className="px-4 pt-4 flex flex-col gap-2">
                {warnings.delay && (
                  <div className="rounded-[14px] px-4 py-3 text-[13px]" style={{ background: '#FDEBDA', color: '#8A4A0F' }}>
                    {lang === 'fr'
                      ? `Délai minimum non respecté : prochaine prise conseillée à ${formatTime(warnings.delay.nextPossibleMs)} (toutes les ${warnings.delay.minDelayHours} h).`
                      : `Minimum delay not met: next intake advised at ${formatTime(warnings.delay.nextPossibleMs)} (every ${warnings.delay.minDelayHours} h).`}
                  </div>
                )}
                {warnings.cap && (
                  <div className="rounded-[14px] px-4 py-3 text-[13px]" style={{ background: '#FCE4E4', color: '#B4262B' }}>
                    {lang === 'fr'
                      ? `Plafond 24 h dépassé : ${warnings.cap.projectedTotal} ${warnings.cap.units} prévus pour un maximum de ${warnings.cap.cap} ${warnings.cap.units}.`
                      : `24h cap exceeded: ${warnings.cap.projectedTotal} ${warnings.cap.units} vs a max of ${warnings.cap.cap} ${warnings.cap.units}.`}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom action */}
      <div className="px-4 pb-10 pt-2 flex flex-col gap-2.5">
        <div className="text-[13px] text-muted text-center">{t.checksWith(activeCount)}</div>
        <button
          onClick={handleCheck}
          disabled={!selected}
          className="h-14 rounded-2xl text-white flex items-center justify-center text-[17px] font-semibold disabled:opacity-40"
          style={{ background: '#1E2A5A' }}
        >
          {t('checkMix')}
        </button>
      </div>

      {toast && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
          <div className="bg-navy text-white px-6 py-3 rounded-2xl text-[17px] font-semibold flex items-center gap-2 shadow-xl">
            <CheckIcon size={22} color="#2BB6A8" />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
