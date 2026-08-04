import { useState } from 'react';
import { ProfileStep, isProfileStepValid, type ProfileStepData } from './ProfileStep';
import { ExerciseStep } from './ExerciseStep';
import { ReasonStep } from './ReasonStep';
import { GoalStep } from './GoalStep';
import type { GoalItem, UserProfile } from '../../types';

interface Props {
  onComplete: (profile: UserProfile, goal: Omit<GoalItem, 'id' | 'status' | 'createdAt'>) => void;
}

interface WizardData extends ProfileStepData {
  selectedExerciseId: string;
  quitReason: string;
  goalName: string;
  goalTargetPrice: string;
  goalPhotoDataUrl: string;
}

const INITIAL_DATA: WizardData = {
  age: '',
  bodyConditions: [],
  quitDateTime: '',
  cigarettesPerDay: '',
  pricePerPack: '',
  cigarettesPerPack: '20',
  selectedExerciseId: '',
  quitReason: '',
  goalName: '',
  goalTargetPrice: '',
  goalPhotoDataUrl: '',
};

const STEP_TITLES = ['기본 정보', '운동 선택', '금연 이유', '목표 물건'];

export function OnboardingWizard({ onComplete }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<WizardData>(INITIAL_DATA);

  const update = (updates: Partial<WizardData>) => setData((prev) => ({ ...prev, ...updates }));

  const isCurrentStepValid = (): boolean => {
    switch (stepIndex) {
      case 0:
        return isProfileStepValid(data);
      case 1:
        return data.selectedExerciseId !== '';
      case 2:
        return data.quitReason.trim() !== '';
      case 3:
        return data.goalName.trim() !== '' && Number(data.goalTargetPrice) > 0 && data.goalPhotoDataUrl !== '';
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!isCurrentStepValid()) return;
    if (stepIndex < STEP_TITLES.length - 1) {
      setStepIndex(stepIndex + 1);
      return;
    }

    const profile: UserProfile = {
      quitDateTime: new Date(data.quitDateTime).toISOString(),
      age: Number(data.age),
      bodyConditions: data.bodyConditions,
      selectedExerciseId: data.selectedExerciseId,
      quitReason: data.quitReason.trim(),
      cigarettesPerDay: Number(data.cigarettesPerDay),
      pricePerPack: Number(data.pricePerPack),
      cigarettesPerPack: Number(data.cigarettesPerPack),
      accessibility: { fontSize: 'normal', simplifiedUI: false },
    };
    const goal = {
      name: data.goalName.trim(),
      targetPrice: Number(data.goalTargetPrice),
      photoDataUrl: data.goalPhotoDataUrl,
    };
    onComplete(profile, goal);
  };

  const handleBack = () => setStepIndex((i) => Math.max(0, i - 1));

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col justify-between p-6">
      <div>
        <div className="mb-6 flex gap-2">
          {STEP_TITLES.map((title, i) => (
            <div
              key={title}
              className={`h-2 flex-1 rounded-full ${i <= stepIndex ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            />
          ))}
        </div>

        {stepIndex === 0 && <ProfileStep data={data} onChange={update} />}
        {stepIndex === 1 && (
          <ExerciseStep
            age={Number(data.age) || 0}
            bodyConditions={data.bodyConditions}
            selectedExerciseId={data.selectedExerciseId}
            onSelect={(id) => update({ selectedExerciseId: id })}
          />
        )}
        {stepIndex === 2 && <ReasonStep quitReason={data.quitReason} onChange={(v) => update({ quitReason: v })} />}
        {stepIndex === 3 && (
          <GoalStep
            goalName={data.goalName}
            goalTargetPrice={data.goalTargetPrice}
            goalPhotoDataUrl={data.goalPhotoDataUrl}
            onChange={update}
          />
        )}
      </div>

      <div className="mt-6 flex gap-3">
        {stepIndex > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 rounded-lg border border-gray-300 py-3 text-lg font-medium text-gray-700 dark:border-gray-600 dark:text-gray-300"
          >
            이전
          </button>
        )}
        <button
          type="button"
          onClick={handleNext}
          disabled={!isCurrentStepValid()}
          className="flex-1 rounded-lg bg-green-600 py-3 text-lg font-semibold text-white disabled:opacity-40"
        >
          {stepIndex === STEP_TITLES.length - 1 ? '시작하기' : '다음'}
        </button>
      </div>
    </div>
  );
}
