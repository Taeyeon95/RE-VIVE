import { useCallback, useState } from 'react';
import { pricePerCigarette } from '../utils/moneyCalc';
import { progressPercent } from '../utils/goalProgress';
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
  availablePool: number;
  logEvent: (event: Omit<CravingEvent, 'id'>) => CravingEvent;
}

export function useCravingFlow({ profile, activeGoals, availablePool, logEvent }: UseCravingFlowArgs) {
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

    const poolAfter = availablePool + moneySaved;
    const achievedGoalNames = activeGoals
      .filter((goal) => progressPercent(goal, availablePool) < 100 && progressPercent(goal, poolAfter) >= 100)
      .map((goal) => goal.name);

    setResult({ completed: true, moneySaved, achievedGoalNames });
    setStep('result');
  }, [profile, activeGoals, availablePool, logEvent]);

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
