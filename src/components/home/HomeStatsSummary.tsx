interface Props {
  daysSinceQuit: number;
  totalCompletedCount: number;
  totalSaved: number;
}

export function HomeStatsSummary({ daysSinceQuit, totalCompletedCount, totalSaved }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3 text-center">
      <div className="rounded-xl bg-gray-100 p-3 dark:bg-gray-800">
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{daysSinceQuit}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">금연 일수</div>
      </div>
      <div className="rounded-xl bg-gray-100 p-3 dark:bg-gray-800">
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalCompletedCount}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">참은 횟수</div>
      </div>
      <div className="rounded-xl bg-gray-100 p-3 dark:bg-gray-800">
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {totalSaved.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">절약(원)</div>
      </div>
    </div>
  );
}
