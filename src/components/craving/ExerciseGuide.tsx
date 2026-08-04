import { useEffect, useState } from 'react';
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
    <div className="flex min-h-svh flex-col justify-between p-6">
      <button type="button" onClick={onAbandon} className="self-end text-2xl text-gray-400">
        ✕
      </button>

      <div className="flex flex-1 flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{exercise.name}</h2>
          <div className="mt-2 text-4xl font-bold text-green-600">{secondsLeft}초</div>
        </div>

        <ol className="flex flex-col gap-3">
          {exercise.steps.map((step, i) => (
            <li
              key={step}
              className="rounded-lg bg-gray-100 p-4 text-lg text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            >
              {i + 1}. {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-3">
        {isDone ? (
          <button
            type="button"
            onClick={onComplete}
            className="w-full rounded-2xl bg-green-600 py-4 text-xl font-semibold text-white"
          >
            운동 완료했어요
          </button>
        ) : (
          <button
            type="button"
            onClick={onAbandon}
            className="w-full rounded-2xl border border-gray-300 py-4 text-lg text-gray-600 dark:border-gray-600 dark:text-gray-300"
          >
            그만두기
          </button>
        )}
      </div>
    </div>
  );
}
