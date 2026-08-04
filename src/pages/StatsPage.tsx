import { StatsSummary } from '../components/stats/StatsSummary';
import { SavingsChart } from '../components/stats/SavingsChart';
import { GoalGallery } from '../components/stats/GoalGallery';
import { CravingHistoryList } from '../components/stats/CravingHistoryList';
import { daysSinceQuit, dailySavingsSeries, totalCompletedCount, totalSaved } from '../utils/statsCalc';
import type { CravingEvent, GoalItem, UserProfile } from '../types';

interface Props {
  profile: UserProfile;
  events: CravingEvent[];
  achievedGoals: GoalItem[];
  onDeleteEvent: (id: string) => void;
}

export function StatsPage({ profile, events, achievedGoals, onDeleteEvent }: Props) {
  return (
    <div className="flex flex-col gap-6 p-5 pb-24">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">통계</h1>

      <StatsSummary
        daysSinceQuit={daysSinceQuit(profile.quitDateTime)}
        totalCompletedCount={totalCompletedCount(events)}
        totalSaved={totalSaved(events)}
        achievedGoalCount={achievedGoals.length}
      />

      <section className="flex flex-col gap-2">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">일별 절약 금액</h2>
        <SavingsChart data={dailySavingsSeries(events)} />
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">달성한 목표 물건</h2>
        <GoalGallery achievedGoals={achievedGoals} />
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">기록</h2>
        <CravingHistoryList events={events} onDelete={onDeleteEvent} />
      </section>
    </div>
  );
}
