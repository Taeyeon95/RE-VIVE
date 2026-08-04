interface Props {
  daysSinceQuit: number;
  totalCompletedCount: number;
  totalSaved: number;
  achievedGoalCount: number;
}

export function StatsSummary({ daysSinceQuit, totalCompletedCount, totalSaved, achievedGoalCount }: Props) {
  const items = [
    { label: '금연 유지 일수', value: daysSinceQuit },
    { label: '총 참은 횟수', value: totalCompletedCount },
    { label: '총 절약 금액(원)', value: totalSaved.toLocaleString() },
    { label: '달성한 목표 물건 수', value: achievedGoalCount },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{item.value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
