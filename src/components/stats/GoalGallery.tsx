import type { GoalItem } from '../../types';

interface Props {
  achievedGoals: GoalItem[];
}

export function GoalGallery({ achievedGoals }: Props) {
  if (achievedGoals.length === 0) {
    return <p className="text-gray-400">아직 달성한 목표 물건이 없어요</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {achievedGoals.map((goal) => (
        <div key={goal.id} className="flex flex-col items-center gap-1">
          <img src={goal.photoDataUrl} alt={goal.name} className="h-20 w-20 rounded-lg object-cover" />
          <span className="text-center text-sm text-gray-700 dark:text-gray-300">{goal.name}</span>
        </div>
      ))}
    </div>
  );
}
