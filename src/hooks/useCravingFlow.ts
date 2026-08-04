import { useCallback, useState } from 'react';
import { pricePerCigarette } from '../utils/moneyCalc';
import { progressPercent } from '../utils/goalProgress';
import { totalSaved } from '../utils/statsCalc';
import type { CravingEvent, GoalItem, UserProfile } from '../types';

export type FlowStep = 'idle' | 'motivation' | 'exercise' | 'result';

export interface CravingFlowResult {
  completed: boolean;
  moneySaved: number;
  achievedGoalNames: string[];
}

interface UseCravingFlowArgs {
  profile: UserProfile;
  activeGoals: GoalItem[];
  events: CravingEvent[];
  logEvent: (event: Omit<CravingEvent, 'id'>) => CravingEvent;
  achieveGoal: (id: string) => void;
}

export function useCravingFlow({ profile, activeGoals, events, logEvent, achieveGoal }: UseCravingFlowArgs) {
  const [step, setStep] = useState<FlowStep>('idle');
  const [result, setResult] = useState<CravingFlowResult | null>(null);

  const start = useCallback(() => {
    setResult(null);
    setStep('motivation');
  }, []);

  const proceedToExercise = useCallback(() => setStep('exercise'), []);

  const completeExercise = useCallback(() => {
    const moneySaved = pricePerCigarette(profile);
    logEvent({ timestamp: new Date().toISOString(), completed: true, moneySaved });

    const totalSavedAfter = totalSaved([
      ...events,
      { id: '', timestamp: new Date().toISOString(), completed: true, moneySaved },
    ]);

    const achievedGoalNames: string[] = [];
    for (const goal of activeGoals) {
      if (progressPercent(goal, totalSavedAfter) >= 100) {
        achievedGoalNames.push(goal.name);
        achieveGoal(goal.id);
      }
    }

    setResult({ completed: true, moneySaved, achievedGoalNames });
    setStep('result');
  }, [profile, activeGoals, events, logEvent, achieveGoal]);

  const abandonExercise = useCallback(() => {
    logEvent({ timestamp: new Date().toISOString(), completed: false, moneySaved: 0 });
    setResult({ completed: false, moneySaved: 0, achievedGoalNames: [] });
    setStep('result');
  }, [logEvent]);

  const reset = useCallback(() => {
    setStep('idle');
    setResult(null);
  }, []);

  return { step, result, start, proceedToExercise, completeExercise, abandonExercise, reset };
}
