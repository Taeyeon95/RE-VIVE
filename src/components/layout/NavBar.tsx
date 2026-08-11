export type View = 'home' | 'stats' | 'settings' | 'admin';

interface Props {
  current: View;
  onNavigate: (view: View) => void;
  showAdmin?: boolean;
}

const BASE_TABS: { view: View; label: string; icon: string }[] = [
  { view: 'home', label: '홈', icon: 'dashboard' },
  { view: 'stats', label: '통계', icon: 'insights' },
  { view: 'settings', label: '설정', icon: 'person' },
];

const ADMIN_TAB: { view: View; label: string; icon: string } = {
  view: 'admin',
  label: '관리자',
  icon: 'shield_person',
};

export function NavBar({ current, onNavigate, showAdmin }: Props) {
  const tabs = showAdmin ? [...BASE_TABS, ADMIN_TAB] : BASE_TABS;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around rounded-t-xl bg-surface-container px-4 pt-2 pb-4 shadow-md">
      {tabs.map((tab) => {
        const isActive = current === tab.view;
        return (
          <button
            key={tab.view}
            type="button"
            onClick={() => onNavigate(tab.view)}
            className={`flex flex-col items-center justify-center gap-0.5 rounded-full px-4 py-1 transition-transform duration-200 ${
              isActive
                ? 'bg-primary-container text-on-primary-container -translate-y-0.5'
                : 'text-on-surface-variant'
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {tab.icon}
            </span>
            <span className="text-label-sm">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
