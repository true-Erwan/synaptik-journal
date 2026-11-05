import { useStore } from '../store';

export default function LangToggle() {
  const lang = useStore((s) => s.lang);
  const toggle = useStore((s) => s.toggleLang);
  return (
    <button
      aria-label="Changer de langue / Switch language"
      onClick={toggle}
      className="h-8 px-3 rounded-2xl border-0 bg-white text-navy text-[13px] font-semibold"
    >
      {lang === 'fr' ? 'FR · EN' : 'EN · FR'}
    </button>
  );
}
