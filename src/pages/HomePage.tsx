import { DaysRing } from '../components/home/DaysRing';
import { HomeCard } from '../components/home/HomeCard';
import { CravingTriggerButton } from '../components/home/CravingTriggerButton';
import { HomeStatsSummary } from '../components/home/HomeStatsSummary';
import { MotivationScreen } from '../components/craving/MotivationScreen';
import { ExerciseGuide } from '../components/craving/ExerciseGuide';
import { CravingResultScreen } from '../components/craving/CravingResultScreen';
import { useCravingFlow } from '../hooks/useCravingFlow';
import { getExerciseById } from '../data/exercises';
import { progressPercent } from '../utils/goalProgress';
import { daysSinceQuit, totalCompletedCount, totalSaved } from '../utils/statsCalc';
import { moneySavedSinceQuit } from '../utils/moneyCalc';
import type { CravingEvent, GoalItem, UserProfile } from '../types';

interface Props {
  profile: UserProfile;
  activeGoals: GoalItem[];
  achievedGoals: GoalItem[];
  events: CravingEvent[];
  logEvent: (event: Omit<CravingEvent, 'id'>) => CravingEvent;
  achieveGoal: (id: string) => void;
  onGoToSettings: () => void;
}

export function HomePage({
  profile,
  activeGoals,
  achievedGoals,
  events,
  logEvent,
  achieveGoal,
  onGoToSettings,
}: Props) {
  const quitStart = new Date(profile.quitDateTime).getTime();
  const eventsBeforeRestart = events.filter((e) => new Date(e.timestamp).getTime() < quitStart);
  const eventsSinceRestart = events.filter((e) => new Date(e.timestamp).getTime() >= quitStart);

  const savedBeforeRestart = totalSaved(eventsBeforeRestart);
  // 충동 대응 횟수가 아니라 금연 시작일로부터 지난 일수 × 평소 흡연량으로 계산한다.
  const savedSinceRestart = moneySavedSinceQuit(profile);

  // 이번 시도 중 구매로 소진된 금액만큼 남은 goal들이 나눠 쓰는 금액에서 제외
  const purchasedThisAttempt = achievedGoals
    .filter((g) => g.achievedAt && new Date(g.achievedAt).getTime() >= quitStart)
    .reduce((sum, g) => sum + g.targetPrice, 0);
  const availablePool = Math.max(0, savedSinceRestart - purchasedThisAttempt);

  const flow = useCravingFlow({ profile, logEvent });
  const exercise = getExerciseById(profile.selectedExerciseId);

  const goalProgressList = activeGoals.map((goal) => ({
    goal,
    percentCurrent: progressPercent(goal, availablePool),
    percentBefore: progressPercent(goal, savedBeforeRestart),
    savedCurrent: availablePool,
    savedBefore: savedBeforeRestart,
  }));

  const handleBuyGoal = (goal: GoalItem) => {
    achieveGoal(goal.id);
  };

  if (flow.step !== 'idle') {
    return (
      <div className="bg-surface fixed inset-0 z-50 overflow-y-auto">
        {flow.step === 'motivation' && (
          <MotivationScreen quitReason={profile.quitReason} onProceed={flow.proceedToExercise} onClose={flow.reset} />
        )}
        {flow.step === 'exercise' && exercise && (
          <ExerciseGuide exercise={exercise} onComplete={flow.completeExercise} onAbandon={flow.abandonExercise} />
        )}
        {flow.step === 'result' && flow.result && <CravingResultScreen result={flow.result} onClose={flow.reset} />}
      </div>
    );
  }

  return (
    <div className="px-container-margin flex flex-col gap-gutter pt-unit pb-28">
      <section className="flex flex-col items-center gap-2 py-8 text-center">
        <DaysRing days={daysSinceQuit(profile.quitDateTime)} />
        <h2 className="text-headline-lg text-primary mt-2">
          금연 {daysSinceQuit(profile.quitDateTime)}일째
        </h2>
        <p className="text-body-md text-on-surface-variant max-w-xs">
          잘하고 있어요. 오늘 하루도 담배 없이 잘 버텨봐요!
        </p>
      </section>

      <HomeCard activeGoals={goalProgressList} onGoToSettings={onGoToSettings} onBuyGoal={handleBuyGoal} />

      <CravingTriggerButton onTrigger={flow.start} />

      <HomeStatsSummary
        totalCompletedCount={totalCompletedCount(eventsSinceRestart)}
        totalSaved={savedSinceRestart}
      />
    </div>
  );
}
