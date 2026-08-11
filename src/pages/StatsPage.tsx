import { StatsSummary } from '../components/stats/StatsSummary';
import { SavingsChart } from '../components/stats/SavingsChart';
import { GoalGallery } from '../components/stats/GoalGallery';
import { CravingHistoryList } from '../components/stats/CravingHistoryList';
import { daysSinceQuit, totalCompletedCount } from '../utils/statsCalc';
import { moneySavedSinceQuit, dailySavingsSeriesSinceQuit } from '../utils/moneyCalc';
import type { CravingEvent, GoalItem, UserProfile } from '../types';

interface Props {
  profile: UserProfile;
  events: CravingEvent[];
  achievedGoals: GoalItem[];
  onDeleteEvent: (id: string) => void;
}

export function StatsPage({ profile, events, achievedGoals, onDeleteEvent }: Props) {
  const completedCount = totalCompletedCount(events);
  // 충동 대응 횟수가 아니라 금연 시작일로부터 지난 일수 × 평소 흡연량으로 계산한다.
  const saved = moneySavedSinceQuit(profile);

  return (
    <div className="px-container-margin flex flex-col gap-gutter pt-unit pb-28">
      <div className="bg-primary text-on-primary shadow-soft flex flex-col gap-2 rounded-xl p-6">
        <h2 className="text-headline-lg-mobile">당신이 참아낸 {completedCount}번의 순간들</h2>
        <p className="text-body-md opacity-90">
          그 모든 유혹을 이겨낸 당신은 이미 승리자입니다. 오늘의 기록이 내일의 건강이 됩니다.
        </p>
      </div>

      <div className="border-primary/5 shadow-soft flex flex-col gap-2 rounded-xl border bg-white p-6">
        <div className="flex items-center justify-between">
          <span className="text-label-sm text-on-surface-variant">총 절약 금액</span>
          <span className="material-symbols-outlined text-secondary">payments</span>
        </div>
        <span className="text-headline-lg text-primary font-bold">{saved.toLocaleString()}원</span>
      </div>

      <StatsSummary daysSinceQuit={daysSinceQuit(profile.quitDateTime)} achievedGoalCount={achievedGoals.length} />

      <section className="flex flex-col gap-2">
        <h2 className="text-label-lg text-primary">일별 절약 금액</h2>
        <SavingsChart data={dailySavingsSeriesSinceQuit(profile)} />
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-label-lg text-primary">달성한 목표 물건</h2>
        <GoalGallery achievedGoals={achievedGoals} />
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-label-lg text-primary">기록</h2>
        <CravingHistoryList events={events} onDelete={onDeleteEvent} />
      </section>
    </div>
  );
}
