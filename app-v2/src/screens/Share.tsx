import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { useStore } from '../store';
import type { T } from '../i18n';
import { ChevronLeft } from '../ui/icons';

export default function Share({ t, onBack }: { t: T; onBack: () => void }) {
  const lang = useStore((s) => s.lang);
  const publicUrl = useStore((s) => s.publicUrl);
  const setPublicUrl = useStore((s) => s.setPublicUrl);

  const effectiveUrl = publicUrl || window.location.origin;
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    QRCode.toDataURL(effectiveUrl, { width: 440, margin: 1, color: { dark: '#1E2A5A', light: '#FFFFFF' } })
      .then(setDataUrl)
      .catch(() => setDataUrl(''));
  }, [effectiveUrl]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-ios">
      <div className="pt-[60px] px-4 flex items-center">
        <button onClick={onBack} className="h-11 flex items-center gap-1 text-navy text-[17px]">
          <ChevronLeft size={20} />
          {t('tabProfile')}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-8 flex flex-col items-center">
        <h1 className="m-0 mt-2 text-[28px] font-bold tracking-[-0.5px] self-start">
          {lang === 'fr' ? "Partager l'app" : 'Share the app'}
        </h1>
        <p className="text-[15px] text-muted self-start mt-1 leading-[1.45]">
          {lang === 'fr'
            ? "Scannez ce QR code pour ouvrir Synaptik sur un téléphone."
            : 'Scan this QR code to open Synaptik on a phone.'}
        </p>

        <div className="mt-6 bg-white rounded-card-xl p-5 shadow-sm">
          {dataUrl ? (
            <img src={dataUrl} alt="QR code" width={240} height={240} className="block" />
          ) : (
            <div className="w-[240px] h-[240px] flex items-center justify-center text-muted">…</div>
          )}
        </div>

        <div className="mt-4 text-[13px] text-navy font-medium break-all text-center px-2">{effectiveUrl}</div>

        {/* Let the user set the deployed Vercel URL so the QR points to the public link. */}
        <div className="mt-6 w-full bg-white rounded-card p-4 flex flex-col gap-2">
          <div className="text-[13px] text-muted font-semibold">
            {lang === 'fr' ? 'Lien public (Vercel)' : 'Public link (Vercel)'}
          </div>
          <input
            value={publicUrl}
            onChange={(e) => setPublicUrl(e.target.value.trim())}
            placeholder="https://synaptik.vercel.app"
            className="h-11 rounded-xl bg-ios px-3 text-[15px] outline-none"
          />
          <div className="text-[12px] text-muted leading-[1.4]">
            {lang === 'fr'
              ? "Collez l'URL donnée par Vercel après le déploiement : le QR code se met à jour automatiquement."
              : 'Paste the URL Vercel gives you after deployment: the QR code updates automatically.'}
          </div>
        </div>
      </div>
    </div>
  );
}
