import type { GoalItem } from '../../types';

interface ActiveGoalProgress {
  goal: GoalItem;
  percent: number;
}

interface Props {
  activeGoals: ActiveGoalProgress[];
  onGoToSettings: () => void;
}

export function HomeCard({ activeGoals, onGoToSettings }: Props) {
  if (activeGoals.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <p className="text-gray-700 dark:text-gray-300">목표 물건을 먼저 설정해보세요!</p>
        <button
          type="button"
          onClick={onGoToSettings}
          className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white"
        >
          설정으로 이동
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {activeGoals.map(({ goal, percent }) => (
        <div key={goal.id} className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <img src={goal.photoDataUrl} alt={goal.name} className="h-16 w-16 rounded-lg object-cover" />
            <div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">{goal.name}</div>
              <div className="text-xl font-bold text-green-600">{Math.floor(percent)}% 달성</div>
            </div>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-green-600 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
