import { useStore } from '../store';
import type { T } from '../i18n';
import type { PendingIntake } from '../App';
import { ChevronLeft, WarningIcon, PhoneIcon, CrossSmall } from '../ui/icons';
import { formatTime } from '../ui/format';

export default function Alert({
  t,
  a,
  b,
  level,
  reason,
  pending,
  onBack,
  onFiche,
  onSavedAnyway,
}: {
  t: T;
  a: string;
  b: string;
  level: 'high' | 'caution';
  reason: string;
  pending: PendingIntake;
  onBack: () => void;
  onFiche: (name: string) => void;
  onSavedAnyway: (p: PendingIntake) => void;
}) {
  const lang = useStore((s) => s.lang);
  const addIngestion = useStore((s) => s.addIngestion);

  const high = level === 'high';
  const borderColor = high ? '#E5484D' : '#F0A35A';
  const badgeBg = high ? '#FCE4E4' : '#FDEBDA';
  const badgeText = high ? '#B4262B' : '#8A4A0F';
  const levelLabel = high ? t('riskHigh') : t('riskCaution');

  function addAnyway() {
    addIngestion(pending);
    onSavedAnyway(pending);
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-ios">
      {/* Top bar */}
      <div className="pt-[60px] px-4 flex items-center">
        <button onClick={onBack} className="h-11 flex items-center gap-1 text-navy text-[17px]">
          <ChevronLeft size={20} />
          {t('back')}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Alert card */}
        <div
          className="mt-2 mx-4 px-5 py-[22px] rounded-card-xl bg-white flex flex-col gap-3.5"
          style={{ border: `2px solid ${borderColor}` }}
        >
          <div className="flex items-center gap-3">
            <div className="w-[52px] h-[52px] rounded-[26px] flex items-center justify-center flex-shrink-0" style={{ background: badgeBg }}>
              <WarningIcon size={28} color={badgeText} />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-[13px] font-bold tracking-[0.4px]" style={{ color: badgeText }}>
                {levelLabel}
              </div>
              <div className="text-[22px] font-bold leading-tight">
                {a} + {b}
              </div>
            </div>
          </div>
          <div className="text-[16px] leading-[1.45]" style={{ color: '#2C2C30' }}>
            {reason}
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="px-2.5 py-1.5 rounded-[10px] text-[13px]" style={{ background: '#F2F2F7', color: '#3A3A40' }}>
              {b} · {lang === 'fr' ? 'déjà actif' : 'already active'}
            </div>
            <div className="px-2.5 py-1.5 rounded-[10px] text-[13px]" style={{ background: '#F2F2F7', color: '#3A3A40' }}>
              {a} {pending.dose != null ? `${pending.dose} ${pending.unit} · ` : ''}
              {formatTime(pending.time)}
            </div>
          </div>
        </div>

        {/* What you can do */}
        <div className="pt-[22px] px-5 pb-2 text-[20px] font-bold">{t('whatYouCanDo')}</div>
        <div className="mx-4 bg-white rounded-card flex flex-col">
          <div className="flex gap-3 px-4 py-[14px] border-b border-hairline items-center">
            <CrossSmall size={24} color="#1E2A5A" />
            <div className="text-[15px] leading-[1.4]">{t('askPharmacist')}</div>
          </div>
          <div className="flex gap-3 px-4 py-[14px] items-center">
            <PhoneIcon size={24} color="#B4262B" />
            <div className="text-[15px] leading-[1.4]">{t('emergency15')}</div>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="px-4 pb-10 pt-2 flex flex-col gap-2.5">
        <button
          onClick={onBack}
          className="h-14 rounded-2xl text-white flex items-center justify-center text-[17px] font-semibold"
          style={{ background: '#1E2A5A' }}
        >
          {t('dontTake')}
        </button>
        <button
          onClick={() => onFiche(pending.substanceName)}
          className="h-12 rounded-2xl flex items-center justify-center text-[16px] font-semibold text-navy"
        >
          {t('learnMore')}
        </button>
        <button onClick={addAnyway} className="h-8 text-[13px] text-muted self-center">
          {lang === 'fr' ? 'Ajouter quand même' : 'Add anyway'}
        </button>
      </div>
    </div>
  );
}
