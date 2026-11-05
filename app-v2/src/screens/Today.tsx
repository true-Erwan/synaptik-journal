import { useStore } from '../store';
import type { T } from '../i18n';
import { formatLongDate, formatTime } from '../ui/format';
import LangToggle from '../ui/LangToggle';
import { CheckIcon, PillIcon, ClockIcon, PlusIcon, WarningIcon } from '../ui/icons';
import { getIntakeStatuses, getTodaySummary, buildTodayIngestions, isTreatmentId } from '../logic/today';

export default function Today({ t, onAdd }: { t: T; onAdd: () => void }) {
  const lang = useStore((s) => s.lang);
  const name = useStore((s) => s.name);
  const ingestions = useStore((s) => s.ingestions);
  const treatments = useStore((s) => s.treatments);
  const riskFactors = useStore((s) => s.riskFactors);
  const now = Date.now();

  const todayIngestions = buildTodayIngestions(ingestions, treatments, now);
  const statuses = getIntakeStatuses(todayIngestions, lang, now);
  const summary = getTodaySummary(todayIngestions, riskFactors, lang, now);

  const risk = summary.risk;
  const statusTitle = risk ? (risk.level === 'high' ? t('riskHigh') : t('riskCaution')) : t('noRiskMix');
  const statusSub = risk
    ? `${risk.a} + ${risk.b}`
    : `${summary.activeCount} ${summary.activeCount > 1 ? t('activeSubstancesPlural') : t('activeSubstances')}`;

  const cardBg = risk ? (risk.level === 'high' ? '#B4262B' : '#8A4A0F') : '#1E2A5A';

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="pt-16 px-5 flex flex-col gap-1">
          <div className="text-[15px] text-muted font-medium">{formatLongDate(now, lang)}</div>
          <div className="flex justify-between items-center">
            <h1 className="m-0 text-[34px] font-bold tracking-[-0.5px]">
              {t('greeting')} {name}
            </h1>
            <LangToggle />
          </div>
        </div>

        {/* Status card */}
        <div
          className="mt-5 mx-4 p-[18px] rounded-card-lg text-white flex gap-[14px] items-center"
          style={{ background: cardBg }}
        >
          <div
            className="w-11 h-11 rounded-[22px] flex items-center justify-center flex-shrink-0"
            style={{ background: risk ? 'rgba(255,255,255,0.18)' : '#2BB6A8' }}
          >
            {risk ? <WarningIcon size={24} color="#FFFFFF" /> : <CheckIcon size={24} color="#1E2A5A" />}
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="text-[17px] font-semibold">{statusTitle}</div>
            <div className="text-[14px] text-white/80">{statusSub}</div>
          </div>
        </div>

        {/* Intakes */}
        <div className="pt-6 px-5 pb-2 text-[20px] font-bold">{t('myIntakes')}</div>

        {statuses.length === 0 ? (
          <div className="mx-4 bg-white rounded-card px-4 py-5 text-[15px] text-muted">{t('noIntakesYet')}</div>
        ) : (
          <div className="mx-4 bg-white rounded-card flex flex-col">
            {statuses.map((st, idx) => {
              const taken = st.ingestion.time <= now;
              const showWaitRow = st.waiting && st.nextDoseAt != null;
              const isTreatment = isTreatmentId(st.ingestion.id);
              return (
                <div key={st.ingestion.id}>
                  {/* Taken row */}
                  <div
                    className={`flex items-center gap-3 px-4 py-[14px] ${
                      idx < statuses.length - 1 || showWaitRow ? 'border-b border-hairline' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#E3E6F3' }}>
                      <PillIcon size={22} color={st.color} />
                    </div>
                    <div className="flex-grow flex flex-col gap-0.5 min-w-0">
                      <div className="text-[16px] font-semibold truncate">
                        {st.displayName}
                        {st.ingestion.dose != null ? ` ${st.ingestion.dose} ${st.ingestion.unit}` : ''}
                      </div>
                      <div className="text-[13px] text-muted truncate">
                        {isTreatment
                          ? `${lang === 'fr' ? 'Traitement de fond' : 'Daily treatment'} · ${formatTime(st.ingestion.time)}`
                          : st.isActive
                            ? `${t('taken')} · ${formatTime(st.ingestion.time)}`
                            : formatTime(st.ingestion.time)}
                      </div>
                    </div>
                    <div className="px-[10px] py-1.5 rounded-xl text-[13px] font-semibold" style={{ background: '#DDF4F1', color: '#0E6158' }}>
                      {taken ? t('taken') : t('later')}
                    </div>
                  </div>

                  {/* Next-dose (wait) row */}
                  {showWaitRow && (
                    <div className={`flex items-center gap-3 px-4 py-[14px] ${idx < statuses.length - 1 ? 'border-b border-hairline' : ''}`}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FDEBDA' }}>
                        <ClockIcon size={22} color="#8A4A0F" />
                      </div>
                      <div className="flex-grow flex flex-col gap-0.5 min-w-0">
                        <div className="text-[16px] font-semibold truncate">
                          {st.displayName} · {lang === 'fr' ? 'prochaine prise' : 'next dose'}
                        </div>
                        <div className="text-[13px] text-muted">
                          {t('possibleFrom')} {formatTime(st.nextDoseAt!)}
                        </div>
                      </div>
                      <div className="px-[10px] py-1.5 rounded-xl text-[13px] font-semibold" style={{ background: '#FDEBDA', color: '#8A4A0F' }}>
                        {t('wait')}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Add button */}
        <div className="pt-5 px-4 pb-6">
          <button
            onClick={onAdd}
            className="h-14 w-full rounded-2xl bg-navy text-white flex items-center justify-center gap-2 text-[17px] font-semibold"
          >
            <PlusIcon size={20} color="#FFFFFF" />
            {t('addIntake')}
          </button>
        </div>
      </div>
    </div>
  );
}
