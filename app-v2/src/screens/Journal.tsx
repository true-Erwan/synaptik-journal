import { useMemo, useState } from 'react';
import { useStore } from '../store';
import type { T } from '../i18n';
import { formatTime } from '../ui/format';
import { buildTodayIngestions, getIntakeStatuses, isTreatmentId, localizedName } from '../logic/today';
import { buildCurve } from '../logic/effectCurve';
import { getSubstanceByName } from '../logic/data';

const W = 326;
const H = 176;
const TOP = 20;
const BOTTOM = 140;

export default function Journal({ t }: { t: T }) {
  const lang = useStore((s) => s.lang);
  const ingestions = useStore((s) => s.ingestions);
  const treatments = useStore((s) => s.treatments);
  const removeIngestion = useStore((s) => s.removeIngestion);
  const now = Date.now();

  // Zoom: 1 = full day window around the chosen range; >1 zooms in on "now".
  const [zoom, setZoom] = useState(1);

  const todayIngestions = buildTodayIngestions(ingestions, treatments, now);
  const statuses = getIntakeStatuses(todayIngestions, lang, now);

  // Time window. Base: 06:00 -> 24:00 today. Zoom narrows around "now".
  const dayStart = useMemo(() => {
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }, [now]);
  const baseStart = dayStart + 6 * 3600_000;
  const baseEnd = dayStart + 24 * 3600_000;
  const baseSpan = baseEnd - baseStart;
  const span = baseSpan / zoom;
  const nowClamped = Math.min(Math.max(now, baseStart), baseEnd);
  let winStart = nowClamped - span / 2;
  let winEnd = nowClamped + span / 2;
  if (winStart < baseStart) { winStart = baseStart; winEnd = baseStart + span; }
  if (winEnd > baseEnd) { winEnd = baseEnd; winStart = baseEnd - span; }

  const xOf = (ms: number) => ((ms - winStart) / (winEnd - winStart)) * W;
  const yOf = (v: number) => BOTTOM - v * (BOTTOM - TOP);

  // Build one curve per intake.
  const curves = todayIngestions
    .map((ing) => {
      const sub = getSubstanceByName(ing.substanceName, 'en');
      const color = sub?.color || '#1E2A5A';
      const model = buildCurve(ing.substanceName, ing.route, ing.dose, color);
      if (!model) return null;
      const pts: string[] = [];
      const steps = 80;
      for (let i = 0; i <= steps; i++) {
        const ms = winStart + ((winEnd - winStart) * i) / steps;
        const tMin = (ms - ing.time) / 60000;
        const v = tMin > 0 ? model.sampleAt(tMin) : 0;
        pts.push(`${xOf(ms).toFixed(1)},${yOf(Math.min(1, v)).toFixed(1)}`);
      }
      return { ing, color, name: localizedName(ing.substanceName, lang), points: pts.join(' ') };
    })
    .filter(Boolean) as { ing: (typeof todayIngestions)[number]; color: string; name: string; points: string }[];

  // Hour gridlines.
  const gridHours: number[] = [];
  const firstHour = new Date(winStart);
  firstHour.setMinutes(0, 0, 0);
  for (let ms = firstHour.getTime(); ms <= winEnd; ms += 3600_000) {
    if (ms >= winStart) gridHours.push(ms);
  }

  const nextDots = statuses
    .filter((s) => s.nextDoseAt != null && s.nextDoseAt >= winStart && s.nextDoseAt <= winEnd)
    .map((s) => ({ x: xOf(s.nextDoseAt!), color: '#F2994A' }));

  // Legend entries (unique substances).
  const legend = Array.from(new Map(curves.map((c) => [c.ing.substanceName, c])).values());

  // History list (real + treatments), newest first.
  const history = [...statuses].reverse();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="pt-16 px-5 flex flex-col gap-1">
          <div className="text-[15px] text-muted font-medium">
            {lang === 'fr' ? "Aujourd'hui" : 'Today'}, {formatTime(now)}
          </div>
          <h1 className="m-0 text-[34px] font-bold tracking-[-0.5px]">{t('tabJournal')}</h1>
        </div>

        {/* Chart card */}
        <div className="mt-[18px] mx-4 p-4 rounded-card-lg bg-white flex flex-col gap-2.5">
          <div className="flex justify-between items-baseline">
            <div className="text-[17px] font-semibold">{t('effectOverTime')}</div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setZoom((z) => Math.max(1, +(z - 0.5).toFixed(1)))}
                className="w-7 h-7 rounded-full bg-ios text-navy text-[18px] font-bold leading-none"
                aria-label="Dézoomer"
              >
                −
              </button>
              <span className="text-[12px] text-muted w-8 text-center">{zoom.toFixed(1)}x</span>
              <button
                onClick={() => setZoom((z) => Math.min(4, +(z + 0.5).toFixed(1)))}
                className="w-7 h-7 rounded-full bg-ios text-navy text-[18px] font-bold leading-none"
                aria-label="Zoomer"
              >
                +
              </button>
            </div>
          </div>

          {curves.length === 0 ? (
            <div className="h-[176px] flex items-center justify-center text-[14px] text-muted text-center px-6">
              {t('emptyChart')}
            </div>
          ) : (
            <svg width="100%" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t('effectOverTime')}>
              {/* gridlines */}
              {gridHours.map((ms, i) => (
                <line key={i} x1={xOf(ms)} y1={TOP} x2={xOf(ms)} y2={BOTTOM} stroke="#E5E5EA" strokeWidth={1} />
              ))}
              <line x1={0} y1={BOTTOM} x2={W} y2={BOTTOM} stroke="#AEAEB2" strokeWidth={1} />

              {/* curves */}
              {curves.map((c, i) => (
                <g key={i}>
                  <polyline points={`${xOf(winStart)},${BOTTOM} ${c.points} ${xOf(winEnd)},${BOTTOM}`} fill={c.color} fillOpacity={0.18} stroke="none" />
                  <polyline points={c.points} fill="none" stroke={c.color} strokeWidth={2.5} strokeLinejoin="round" />
                </g>
              ))}

              {/* now line */}
              {now >= winStart && now <= winEnd && (
                <>
                  <line x1={xOf(now)} y1={12} x2={xOf(now)} y2={BOTTOM} stroke="#1C1C1E" strokeWidth={1.5} strokeDasharray="3 3" />
                  <text x={Math.min(xOf(now) + 3, W - 60)} y={14} fontSize={11} fill="#1C1C1E" fontWeight={600}>
                    {t('nowLine')}
                  </text>
                </>
              )}

              {/* next-dose dots */}
              {nextDots.map((d, i) => (
                <circle key={i} cx={d.x} cy={BOTTOM} r={5} fill={d.color} />
              ))}

              {/* hour labels */}
              {gridHours.map((ms, i) => (
                <text key={i} x={xOf(ms)} y={158} fontSize={11} fill="#5E5E66" textAnchor="middle">
                  {String(new Date(ms).getHours()).padStart(2, '0')}
                </text>
              ))}
            </svg>
          )}

          {/* legend */}
          {legend.length > 0 && (
            <div className="flex gap-3.5 flex-wrap text-[13px]" style={{ color: '#3A3A40' }}>
              {legend.map((c) => (
                <div key={c.ing.substanceName} className="flex items-center gap-1.5">
                  <span className="w-3.5 h-1 rounded-sm inline-block" style={{ background: c.color }} />
                  {c.name}
                </div>
              ))}
              {nextDots.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#F2994A' }} />
                  {t('nextDosePossible')}
                </div>
              )}
              <div className="text-muted">{t('pinchToZoom')}</div>
            </div>
          )}
        </div>

        {/* History */}
        <div className="pt-[22px] px-5 pb-2 text-[20px] font-bold">{t('history')}</div>
        {history.length === 0 ? (
          <div className="mx-4 bg-white rounded-card px-4 py-5 text-[15px] text-muted mb-6">{t('noIntakesYet')}</div>
        ) : (
          <div className="mx-4 bg-white rounded-card flex flex-col mb-6">
            {history.map((st, idx) => {
              const sub = getSubstanceByName(st.ingestion.substanceName, 'en');
              const curve = buildCurve(st.ingestion.substanceName, st.ingestion.route, st.ingestion.dose, sub?.color || '#1E2A5A');
              const peakMs = curve ? st.ingestion.time + curve.peakMin * 60000 : null;
              const endMs = curve ? st.ingestion.time + curve.endMin * 60000 : null;
              const treatment = isTreatmentId(st.ingestion.id);
              return (
                <div key={st.ingestion.id} className={`flex items-center gap-3 px-4 py-[14px] ${idx < history.length - 1 ? 'border-b border-hairline' : ''}`}>
                  <div className="w-[52px] text-[15px] font-semibold text-navy">{formatTime(st.ingestion.time)}</div>
                  <div className="flex-grow flex flex-col gap-0.5 min-w-0">
                    <div className="text-[16px] font-semibold truncate">
                      {st.displayName}
                      {st.ingestion.dose != null ? ` ${st.ingestion.dose} ${st.ingestion.unit}` : ''}
                    </div>
                    <div className="text-[13px] text-muted truncate">
                      {treatment
                        ? lang === 'fr'
                          ? 'Traitement de fond'
                          : 'Daily treatment'
                        : peakMs && endMs
                          ? `${t('peakAround')} ${formatTime(peakMs)} · ${t('endAround')} ${formatTime(endMs)}`
                          : ''}
                    </div>
                  </div>
                  {!treatment && (
                    <button
                      onClick={() => removeIngestion(st.ingestion.id)}
                      className="text-[13px] font-semibold px-2 py-1 rounded-lg"
                      style={{ color: '#B4262B', background: '#FCE4E4' }}
                      aria-label={lang === 'fr' ? 'Supprimer' : 'Delete'}
                    >
                      {lang === 'fr' ? 'Suppr.' : 'Delete'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
