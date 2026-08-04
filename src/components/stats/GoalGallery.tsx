import type { GoalItem } from '../../types';

interface Props {
  achievedGoals: GoalItem[];
}

export function GoalGallery({ achievedGoals }: Props) {
  if (achievedGoals.length === 0) {
    return (
      <p className="text-label-sm border-primary/5 shadow-soft rounded-xl border bg-white p-4 text-on-surface-variant">
        아직 달성한 목표 물건이 없어요
      </p>
    );
  }

  return (
    <div className="border-primary/5 shadow-soft grid grid-cols-3 gap-3 rounded-xl border bg-white p-4">
      {achievedGoals.map((goal) => (
        <div key={goal.id} className="flex flex-col items-center gap-1">
          <img src={goal.photoDataUrl} alt={goal.name} className="h-20 w-20 rounded-lg object-cover" />
          <span className="text-label-sm text-center text-on-surface">{goal.name}</span>
        </div>
      ))}
    </div>
  );
}
