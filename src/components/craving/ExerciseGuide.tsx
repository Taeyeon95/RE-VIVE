import { useEffect, useState } from 'react';
import { primaryButtonClass, secondaryButtonClass } from '../../styles/formStyles';
import type { Exercise } from '../../types';

interface Props {
  exercise: Exercise;
  onComplete: () => void;
  onAbandon: () => void;
}

export function ExerciseGuide({ exercise, onComplete, onAbandon }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(exercise.durationSec);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const isDone = secondsLeft === 0;

  return (
    <div className="bg-surface flex min-h-svh flex-col justify-between p-6">
      <button type="button" onClick={onAbandon} className="material-symbols-outlined text-outline self-end text-3xl">
        close
      </button>

      <div className="flex flex-1 flex-col gap-6">
        <div className="text-center">
          <h2 className="text-headline-lg text-primary">{exercise.name}</h2>
          <div className="text-display-lg text-secondary mt-2">{secondsLeft}초</div>
        </div>

        <ol className="flex flex-col gap-3">
          {exercise.steps.map((step, i) => (
            <li key={step} className="bg-surface-container-low text-body-lg text-on-surface rounded-xl p-4">
              {i + 1}. {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-3">
        {isDone ? (
          <button type="button" onClick={onComplete} className={primaryButtonClass}>
            운동 완료했어요
          </button>
        ) : (
          <button type="button" onClick={onAbandon} className={secondaryButtonClass}>
            그만두기
          </button>
        )}
      </div>
    </div>
  );
}
