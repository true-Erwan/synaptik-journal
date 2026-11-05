import type { T } from '../i18n';
import { HomeTab, JournalTab, SearchTab, ProfileTab } from './icons';

export type Tab = 'today' | 'journal' | 'substances' | 'profile';

const ACTIVE = '#1E2A5A';
const INACTIVE = '#6C6C72';

export default function TabBar({
  active,
  onChange,
  t,
}: {
  active: Tab;
  onChange: (tab: Tab) => void;
  t: T;
}) {
  const items: { key: Tab; label: string; Icon: (p: { color: string }) => JSX.Element }[] = [
    { key: 'today', label: t('tabToday'), Icon: HomeTab },
    { key: 'journal', label: t('tabJournal'), Icon: JournalTab },
    { key: 'substances', label: t('tabSubstances'), Icon: SearchTab },
    { key: 'profile', label: t('tabProfile'), Icon: ProfileTab },
  ];
  return (
    <nav
      className="h-[84px] box-border bg-white border-t border-hairline grid grid-cols-4"
      style={{ padding: '8px 12px 24px 12px' }}
    >
      {items.map(({ key, label, Icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="flex flex-col items-center gap-[3px]"
            style={{ color: isActive ? ACTIVE : INACTIVE, fontSize: 11, fontWeight: isActive ? 600 : 500 }}
          >
            <Icon color={isActive ? ACTIVE : INACTIVE} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
