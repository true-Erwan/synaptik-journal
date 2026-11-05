import { useState } from 'react';
import { useStore } from './store';
import { makeT } from './i18n';
import PhoneFrame from './ui/PhoneFrame';
import TabBar, { type Tab } from './ui/TabBar';
import Today from './screens/Today';

// Route = either a bottom tab, or a pushed modal screen with optional params.
type Route =
  | { kind: 'tab'; tab: Tab }
  | { kind: 'add' }
  | { kind: 'alert'; a: string; b: string; level: 'high' | 'caution'; reason: string }
  | { kind: 'fiche'; name: string };

export default function App() {
  const lang = useStore((s) => s.lang);
  const t = makeT(lang);
  const [route, setRoute] = useState<Route>({ kind: 'tab', tab: 'today' });

  const activeTab: Tab = route.kind === 'tab' ? route.tab : 'today';

  const goTab = (tab: Tab) => setRoute({ kind: 'tab', tab });

  let screen: JSX.Element;
  switch (route.kind) {
    case 'add':
      screen = <Placeholder title={t('newIntake')} />;
      break;
    case 'alert':
      screen = <Placeholder title={t('riskHigh')} />;
      break;
    case 'fiche':
      screen = <Placeholder title={route.name} />;
      break;
    case 'tab':
    default:
      switch (route.tab) {
        case 'today':
          screen = <Today t={t} onAdd={() => setRoute({ kind: 'add' })} />;
          break;
        case 'journal':
          screen = <Placeholder title={t('tabJournal')} />;
          break;
        case 'substances':
          screen = <Placeholder title={t('tabSubstances')} />;
          break;
        case 'profile':
          screen = <Placeholder title={t('tabProfile')} />;
          break;
      }
  }

  const showTabBar = route.kind === 'tab';

  return (
    <PhoneFrame>
      <div className="flex-1 min-h-0">{screen}</div>
      {showTabBar && <TabBar active={activeTab} onChange={goTab} t={t} />}
    </PhoneFrame>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex h-full items-center justify-center text-muted text-[15px]">
      {title} — à venir
    </div>
  );
}
