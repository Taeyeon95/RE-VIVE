interface Props {
  daysSinceQuit: number;
  achievedGoalCount: number;
}

export function StatsSummary({ daysSinceQuit, achievedGoalCount }: Props) {
  const items = [
    { icon: 'calendar_month', label: '금연 유지 일수', value: `${daysSinceQuit}일` },
    { icon: 'military_tech', label: '달성한 목표 물건', value: `${achievedGoalCount}개` },
  ];

  return (
    <div className="grid grid-cols-2 gap-gutter">
      {items.map((item) => (
        <div key={item.label} className="shadow-soft border-primary/5 flex flex-col gap-1 rounded-xl border bg-white p-4">
          <span className="material-symbols-outlined text-primary">{item.icon}</span>
          <span className="text-headline-md text-primary font-bold">{item.value}</span>
          <span className="text-label-sm text-on-surface-variant">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
