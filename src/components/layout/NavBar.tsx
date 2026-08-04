export type View = 'home' | 'stats' | 'settings';

interface Props {
  current: View;
  onNavigate: (view: View) => void;
}

const TABS: { view: View; label: string; icon: string }[] = [
  { view: 'home', label: '홈', icon: '🏠' },
  { view: 'stats', label: '통계', icon: '📊' },
  { view: 'settings', label: '설정', icon: '⚙️' },
];

export function NavBar({ current, onNavigate }: Props) {
  return (
    <nav className="fixed inset-x-0 bottom-0 flex border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      {TABS.map((tab) => (
        <button
          key={tab.view}
          type="button"
          onClick={() => onNavigate(tab.view)}
          className={`flex flex-1 flex-col items-center gap-1 py-3 ${
            current === tab.view ? 'text-green-600' : 'text-gray-400'
          }`}
        >
          <span className="text-xl">{tab.icon}</span>
          <span className="text-sm">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
