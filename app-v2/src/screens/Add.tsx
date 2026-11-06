import { useEffect, useMemo, useState } from 'react';
import { useStore } from '../store';
import type { T } from '../i18n';
import type { Substance } from '../logic/types';
import { getSubstanceByName } from '../logic/data';
import { searchSubstances } from '../logic/search';
import { availableRoutes, roaLabel, ROA_COLORS } from '../logic/routes';
import { isDivertible, getPrescribedDoses } from '../logic/dosing';
import { preCheck, type PreCheckResult } from '../logic/precheck';
import { buildTodayIngestions } from '../logic/today';
import {
  hasMultipleForms,
  getImmediateForm,
  getExtendedForms,
  formShort,
  formBadge,
  formDesc,
  type ReleaseForm,
} from '../logic/releaseForms';
import { SearchIcon, CheckIcon } from '../ui/icons';
import { formatTime } from '../ui/format';

type When = 'earlier' | 'now' | 'later';

const AMBER = '#B8860B';
const AMBER_BG = '#FBF0DA';
const AMBER_BORDER = '#E6A817';

export interface AddResult {
  action: 'saved' | 'alert';
  payload?: {
    a: string;
    b: string;
    level: 'high' | 'caution';
    reason: string;
    pending: { substanceName: string; route: string; dose: number | null; unit: string; time: number; releaseProfileId?: string };
    fiche: string;
  };
}

export default function Add({ t, onCancel, onResult }: { t: T; onCancel: () => void; onResult: (r: AddResult) => void }) {
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
  const [customTime, setCustomTime] = useState<string>('');
  const [warnings, setWarnings] = useState<PreCheckResult | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Release form state
  const [releaseMode, setReleaseMode] = useState<'IR' | 'ER'>('IR');
  const [erFormId, setErFormId] = useState<string>('');

  const hits = useMemo(() => (selected ? [] : searchSubstances(query, lang, 8)), [query, lang, selected]);

  const routes = selected ? availableRoutes(selected) : ['oral'];
  const divertible = isDivertible(selected || undefined);
  const prescribedDoses = selected && !divertible ? getPrescribedDoses(selected.name) : [];

  // Release forms
  const multiForm = selected ? hasMultipleForms(selected.name) : false;
  const irForm = selected ? getImmediateForm(selected.name) : null;
  const erForms = selected ? getExtendedForms(selected.name) : [];
  const selectedForm: ReleaseForm | null = !multiForm
    ? null
    : releaseMode === 'IR'
      ? irForm
      : erForms.find((f) => f.id === erFormId) || erForms[0] || null;
  const releaseProfileId = selectedForm ? selectedForm.id : undefined;

  // Default the ER dropdown to the first extended form when switching to ER.
  useEffect(() => {
    if (releaseMode === 'ER' && !erFormId && erForms.length > 0) setErFormId(erForms[0].id);
  }, [releaseMode, erFormId, erForms]);

  const unit = useMemo(() => {
    if (selected && !divertible) {
      const ds = getPrescribedDoses(selected.name);
      if (ds.length) return ds[0].units;
    }
    if (!selected) return 'mg';
    const roa = (selected.roas || []).find((r) => r.name === route) || (selected.roas || [])[0];
    return roa?.dose?.units || 'mg';
  }, [selected, route, divertible]);

  function pickSubstance(s: Substance) {
    const canonical = getSubstanceByName(s.name, 'en') || s;
    setSelected(canonical);
    setQuery(s.name);
    const rts = availableRoutes(canonical);
    setRoute(rts[0]);
    setWarnings(null);
    setReleaseMode('IR');
    setErFormId('');
    if (!isDivertible(canonical)) {
      const ds = getPrescribedDoses(canonical.name);
      setDose(ds.length ? ds[ds.length - 1].value : null);
    } else {
      setDose(null);
    }
  }

  function resetSearch() {
    setSelected(null);
    setDose(null);
    setQuery('');
    setWarnings(null);
    setReleaseMode('IR');
    setErFormId('');
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

  function handleCheck() {
    if (!selected) return;
    const time = computeTime();
    const effective = buildTodayIngestions(ingestions, treatments, time);
    const result = preCheck(selected.name, route, dose, effective, riskFactors, lang, time, releaseProfileId);
    setWarnings(result);

    const pending = { substanceName: selected.name, route, dose: divertible ? null : dose, unit, time, releaseProfileId };

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
          <div className="h-12 rounded-[14px] bg-white flex items-center gap-2 px-3.5" style={{ border: '2px solid #1E2A5A' }}>
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

          {hits.length > 0 && (
            <div className="mt-2 bg-white rounded-[14px] flex flex-col overflow-hidden">
              {hits.map((h, i) => (
                <button
                  key={h.substance.name}
                  onClick={() => pickSubstance(h.substance)}
                  className={`flex justify-between items-center px-3.5 py-3 text-left ${i < hits.length - 1 ? 'border-b border-hairline' : ''}`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: h.substance.color || '#1E2A5A' }} />
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
                      onClick={() => setRoute(r)}
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

            {/* FORME & LIBÉRATION — only when the substance has multiple forms */}
            {multiForm && selectedForm && (
              <div className="px-4 pt-5">
                <div className="flex items-center justify-between px-1 pb-1.5">
                  <div className="text-[13px] text-muted font-semibold">{t('formRelease')}</div>
                  {/* Header badge: selected brand */}
                  <div
                    className="px-2.5 py-1 rounded-lg text-[12px] font-bold"
                    style={{ background: AMBER_BG, color: AMBER }}
                  >
                    {formBadge(selectedForm, lang)}
                  </div>
                </div>

                {/* LI / LP buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {(['IR', 'ER'] as const).map((mode) => {
                    const active = releaseMode === mode;
                    return (
                      <button
                        key={mode}
                        onClick={() => setReleaseMode(mode)}
                        className="h-11 rounded-[12px] text-[14px] font-semibold"
                        style={{
                          background: active ? AMBER_BG : '#FFFFFF',
                          color: active ? AMBER : '#3A3A40',
                          border: active ? `2px solid ${AMBER_BORDER}` : '2px solid #E5E5EA',
                        }}
                      >
                        {mode === 'IR' ? t('formLI') : t('formLP')}
                      </button>
                    );
                  })}
                </div>

                {/* LP matrix / brand dropdown */}
                {releaseMode === 'ER' && erForms.length > 0 && (
                  <div className="mt-2.5">
                    <label className="text-[12px] font-semibold px-1 pb-1 flex items-center gap-1" style={{ color: AMBER }}>
                      {t('lpMatrix')}
                    </label>
                    <select
                      value={erFormId || erForms[0].id}
                      onChange={(e) => setErFormId(e.target.value)}
                      className="w-full bg-white rounded-xl px-3 py-2.5 text-[14px] font-bold outline-none"
                      style={{ color: AMBER, border: `2px solid ${AMBER_BORDER}` }}
                    >
                      {erForms.map((f) => (
                        <option key={f.id} value={f.id}>
                          {formShort(f, lang)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Description card */}
                <div className="mt-2.5 rounded-[14px] bg-white px-3.5 py-3">
                  <div className="text-[14px] font-bold" style={{ color: AMBER }}>
                    {formShort(selectedForm, lang)}
                  </div>
                  <div className="text-[13px] leading-[1.45] mt-1" style={{ color: '#3A3A40' }}>
                    {formDesc(selectedForm, lang)}
                  </div>
                </div>
              </div>
            )}

            {/* COMBIEN */}
            <div className="px-4 pt-5">
              <div className="text-[13px] text-muted font-semibold px-1 pb-1.5">{t('qHowMuch')}</div>
              {divertible ? (
                <div className="text-[15px] text-muted bg-white rounded-[14px] px-4 py-3">{t('askProfessional')}</div>
              ) : (
                <>
                  {/* Free dose input with unit on the right */}
                  <div className="h-12 rounded-[14px] bg-white flex items-center px-3.5 border border-hairline">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={dose ?? ''}
                      onChange={(e) => setDose(e.target.value === '' ? null : parseFloat(e.target.value))}
                      className="flex-grow border-0 outline-none text-[17px] bg-transparent"
                      placeholder="—"
                    />
                    <span className="text-[15px] text-muted font-medium">{unit}</span>
                  </div>
                  {/* Prescribed-dose quick-pick chips (medicalSchedule only) */}
                  {prescribedDoses.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2.5">
                      {prescribedDoses.map((d) => {
                        const active = dose === d.value;
                        return (
                          <button
                            key={d.value}
                            onClick={() => setDose(d.value)}
                            className="h-9 px-[16px] rounded-[20px] text-[14px]"
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
                  )}
                  <div className="text-[13px] text-muted px-1 pt-2">
                    {prescribedDoses.length > 0 ? `${t('prescribedDose')} · ${t('perPrescription')}` : t('perPrescription')}
                  </div>
                </>
              )}
            </div>

            {/* QUAND */}
            <div className="px-4 pt-5">
              <div className="text-[13px] text-muted font-semibold px-1 pb-1.5">{t('qWhen')}</div>
              <div className="h-10 rounded-[12px] p-[3px] box-border grid grid-cols-3 gap-[3px]" style={{ background: '#E3E3E8' }}>
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
                      style={{ background: active ? '#FFFFFF' : 'transparent', fontWeight: active ? 600 : 400, color: active ? '#1C1C1E' : '#3A3A40' }}
                    >
                      {w === 'earlier' ? t('earlier') : w === 'now' ? t('now') : t('later')}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-2 pt-2 px-1">
                <span className="text-[13px] text-muted">{lang === 'fr' ? 'Heure précise' : 'Exact time'}</span>
                <input type="time" value={customTime} onChange={(e) => setCustomTime(e.target.value)} className="text-[15px] bg-white rounded-lg px-2 py-1 border border-hairline" />
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
