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
      <h2 className="text-headline-lg-mobile text-primary">충동이 올 때 할 운동을 골라주세요</h2>
      <p className="text-body-md text-on-surface-variant">
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
                ? 'border-primary bg-primary-container/10'
                : 'border-outline-variant bg-white'
            }`}
          >
            <div className="text-label-lg text-on-surface">{exercise.name}</div>
            <div className="text-body-md text-on-surface-variant">{exercise.description}</div>
            <div className="text-label-sm text-outline mt-1">약 {exercise.durationSec}초 소요</div>
          </button>
        ))}
      </div>
    </div>
  );
}
