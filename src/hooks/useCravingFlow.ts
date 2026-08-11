import { useCallback, useState } from 'react';
import { pricePerCigarette } from '../utils/moneyCalc';
import type { CravingEvent, UserProfile } from '../types';

export type FlowStep = 'idle' | 'motivation' | 'exercise' | 'result';

export interface CravingFlowResult {
  completed: boolean;
  moneySaved: number;
}

interface UseCravingFlowArgs {
  profile: UserProfile;
  logEvent: (event: Omit<CravingEvent, 'id'>) => CravingEvent;
}

export function useCravingFlow({ profile, logEvent }: UseCravingFlowArgs) {
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
    setResult({ completed: true, moneySaved });
    setStep('result');
  }, [profile, logEvent]);

  const abandonExercise = useCallback(() => {
    logEvent({ timestamp: new Date().toISOString(), completed: false, moneySaved: 0 });
    setResult({ completed: false, moneySaved: 0 });
    setStep('result');
  }, [logEvent]);

  const reset = useCallback(() => {
    setStep('idle');
    setResult(null);
  }, []);

  return { step, result, start, proceedToExercise, completeExercise, abandonExercise, reset };
}
