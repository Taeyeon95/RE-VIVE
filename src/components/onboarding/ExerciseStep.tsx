import { recommendExercises } from '../../utils/recommendExercise';

interface Props {
  age: number;
  bodyConditions: string[];
  selectedExerciseId: string;
  onSelect: (id: string) => void;
}

export function ExerciseStep({ age, bodyConditions, selectedExerciseId, onSelect }: Props) {
  const recommended = recommendExercises(age, bodyConditions);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        충동이 올 때 할 운동을 골라주세요
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        입력하신 나이와 신체 조건에 맞춰 추천된 운동이에요. 마음에 드는 것을 하나 선택해주세요.
      </p>

      <div className="flex flex-col gap-3">
        {recommended.map((exercise) => (
          <button
            key={exercise.id}
            type="button"
            onClick={() => onSelect(exercise.id)}
            className={`rounded-xl border-2 p-4 text-left transition ${
              selectedExerciseId === exercise.id
                ? 'border-green-600 bg-green-50 dark:bg-green-950'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <div className="text-lg font-medium text-gray-900 dark:text-gray-100">{exercise.name}</div>
            <div className="text-gray-600 dark:text-gray-400">{exercise.description}</div>
            <div className="mt-1 text-sm text-gray-500">약 {exercise.durationSec}초 소요</div>
          </button>
        ))}
      </div>
    </div>
  );
}
