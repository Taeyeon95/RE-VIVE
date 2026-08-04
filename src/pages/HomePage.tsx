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
import type { CravingEvent, GoalItem, UserProfile } from '../types';

interface Props {
  profile: UserProfile;
  activeGoals: GoalItem[];
  events: CravingEvent[];
  logEvent: (event: Omit<CravingEvent, 'id'>) => CravingEvent;
  achieveGoal: (id: string) => void;
  onGoToSettings: () => void;
}

export function HomePage({ profile, activeGoals, events, logEvent, achieveGoal, onGoToSettings }: Props) {
  const flow = useCravingFlow({ profile, activeGoals, events, logEvent, achieveGoal });
  const exercise = getExerciseById(profile.selectedExerciseId);
  const savedSoFar = totalSaved(events);
  const goalProgressList = activeGoals.map((goal) => ({ goal, percent: progressPercent(goal, savedSoFar) }));

  if (flow.step !== 'idle') {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-gray-900">
        {flow.step === 'motivation' && (
          <MotivationScreen quitReason={profile.quitReason} onProceed={flow.proceedToExercise} onClose={flow.reset} />
        )}
        {flow.step === 'exercise' && exercise && (
          <ExerciseGuide exercise={exercise} onComplete={flow.completeExercise} onAbandon={flow.abandonExercise} />
        )}
        {flow.step === 'result' && flow.result && (
          <CravingResultScreen
            result={flow.result}
            onClose={flow.reset}
            onGoToGoalSettings={() => {
              flow.reset();
              onGoToSettings();
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 p-5 pb-24">
      <HomeCard activeGoals={goalProgressList} onGoToSettings={onGoToSettings} />
      <CravingTriggerButton onTrigger={flow.start} />
      <HomeStatsSummary
        daysSinceQuit={daysSinceQuit(profile.quitDateTime)}
        totalCompletedCount={totalCompletedCount(events)}
        totalSaved={savedSoFar}
      />
    </div>
  );
}
