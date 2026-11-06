import { useState } from 'react';
import { useStore } from './store';
import { makeT } from './i18n';
import PhoneFrame from './ui/PhoneFrame';
import TabBar, { type Tab } from './ui/TabBar';
import Today from './screens/Today';
import Add, { type AddResult } from './screens/Add';
import Alert from './screens/Alert';
import Journal from './screens/Journal';
import Substances from './screens/Substances';
import Fiche from './screens/Fiche';
import Profile from './screens/Profile';
import Share from './screens/Share';

export interface PendingIntake {
  substanceName: string;
  route: string;
  dose: number | null;
  unit: string;
  time: number;
  releaseProfileId?: string;
}

type Route =
  | { kind: 'tab'; tab: Tab }
  | { kind: 'add' }
  | {
      kind: 'alert';
      a: string;
      b: string;
      level: 'high' | 'caution';
      reason: string;
      pending: PendingIntake;
      fiche: string;
    }
  | { kind: 'fiche'; name: string; from: Tab }
  | { kind: 'share' };

export default function App() {
  const lang = useStore((s) => s.lang);
  const t = makeT(lang);
  const [route, setRoute] = useState<Route>({ kind: 'tab', tab: 'today' });

  const activeTab: Tab = route.kind === 'tab' ? route.tab : route.kind === 'fiche' ? route.from : 'today';
  const goTab = (tab: Tab) => setRoute({ kind: 'tab', tab });

  function handleAddResult(r: AddResult) {
    if (r.action === 'saved') {
      setRoute({ kind: 'tab', tab: 'today' });
    } else if (r.action === 'alert' && r.payload) {
      const p = r.payload;
      setRoute({ kind: 'alert', a: p.a, b: p.b, level: p.level, reason: p.reason, pending: p.pending, fiche: p.fiche });
    }
  }

  let screen: JSX.Element;
  switch (route.kind) {
    case 'add':
      screen = <Add t={t} onCancel={() => goTab('today')} onResult={handleAddResult} />;
      break;
    case 'alert':
      screen = (
        <Alert
          t={t}
          a={route.a}
          b={route.b}
          level={route.level}
          reason={route.reason}
          pending={route.pending}
          onBack={() => goTab('today')}
          onFiche={(name) => setRoute({ kind: 'fiche', name, from: 'today' })}
          onSavedAnyway={() => goTab('today')}
        />
      );
      break;
    case 'fiche':
      screen = <Fiche t={t} name={route.name} onBack={() => goTab(route.from)} />;
      break;
    case 'share':
      screen = <Share t={t} onBack={() => goTab('profile')} />;
      break;
    case 'tab':
    default: {
      const tab = route.kind === 'tab' ? route.tab : 'today';
      switch (tab) {
        case 'today':
          screen = <Today t={t} onAdd={() => setRoute({ kind: 'add' })} />;
          break;
        case 'journal':
          screen = <Journal t={t} />;
          break;
        case 'substances':
          screen = <Substances t={t} onOpen={(name) => setRoute({ kind: 'fiche', name, from: 'substances' })} />;
          break;
        case 'profile':
          screen = <Profile t={t} onShare={() => setRoute({ kind: 'share' })} />;
          break;
        default:
          screen = <Today t={t} onAdd={() => setRoute({ kind: 'add' })} />;
      }
    }
  }

  const showTabBar = route.kind === 'tab' || route.kind === 'fiche';

  return (
    <PhoneFrame>
      <div className="flex-1 min-h-0">{screen}</div>
      {showTabBar && <TabBar active={activeTab} onChange={goTab} t={t} />}
    </PhoneFrame>
  );
}
