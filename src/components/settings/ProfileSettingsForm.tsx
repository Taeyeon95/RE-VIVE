import { useState } from 'react';
import { ExerciseStep } from '../onboarding/ExerciseStep';
import type { UserProfile } from '../../types';

interface Props {
  profile: UserProfile;
  onSave: (updates: Partial<UserProfile>) => void;
  onRestartQuitDate: () => void;
}

function toDatetimeLocal(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const BODY_CONDITION_OPTIONS = ['무릎', '허리'];

export function ProfileSettingsForm({ profile, onSave, onRestartQuitDate }: Props) {
  const [quitDateTime, setQuitDateTime] = useState(toDatetimeLocal(profile.quitDateTime));
  const [age, setAge] = useState(String(profile.age));
  const [bodyConditions, setBodyConditions] = useState<string[]>(profile.bodyConditions);
  const [selectedExerciseId, setSelectedExerciseId] = useState(profile.selectedExerciseId);
  const [quitReason, setQuitReason] = useState(profile.quitReason);
  const [cigarettesPerDay, setCigarettesPerDay] = useState(String(profile.cigarettesPerDay));
  const [pricePerPack, setPricePerPack] = useState(String(profile.pricePerPack));
  const [cigarettesPerPack, setCigarettesPerPack] = useState(String(profile.cigarettesPerPack));

  const toggleCondition = (condition: string) => {
    setBodyConditions((prev) =>
      prev.includes(condition) ? prev.filter((c) => c !== condition) : [...prev, condition],
    );
  };

  const handleSave = () => {
    onSave({
      quitDateTime: new Date(quitDateTime).toISOString(),
      age: Number(age) || profile.age,
      bodyConditions,
      selectedExerciseId,
      quitReason,
      cigarettesPerDay: Number(cigarettesPerDay) || profile.cigarettesPerDay,
      pricePerPack: Number(pricePerPack) || profile.pricePerPack,
      cigarettesPerPack: Number(cigarettesPerPack) || profile.cigarettesPerPack,
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <label className="flex flex-col gap-1">
        <span className="font-medium text-gray-800 dark:text-gray-200">금연 시작 일시</span>
        <input
          type="datetime-local"
          value={quitDateTime}
          onChange={(e) => setQuitDateTime(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />
      </label>
      <button
        type="button"
        onClick={onRestartQuitDate}
        className="self-start text-sm text-green-600 underline"
      >
        지금부터 다시 시작하기 (기록은 유지돼요)
      </button>

      <label className="flex flex-col gap-1">
        <span className="font-medium text-gray-800 dark:text-gray-200">나이</span>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="font-medium text-gray-800 dark:text-gray-200">불편한 신체 부위</legend>
        <div className="flex gap-4">
          {BODY_CONDITION_OPTIONS.map((condition) => (
            <label key={condition} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={bodyConditions.includes(condition)}
                onChange={() => toggleCondition(condition)}
                className="h-5 w-5"
              />
              {condition}
            </label>
          ))}
        </div>
      </fieldset>

      <ExerciseStep
        age={Number(age) || 0}
        bodyConditions={bodyConditions}
        selectedExerciseId={selectedExerciseId}
        onSelect={setSelectedExerciseId}
      />

      <label className="flex flex-col gap-1">
        <span className="font-medium text-gray-800 dark:text-gray-200">금연 이유</span>
        <textarea
          value={quitReason}
          onChange={(e) => setQuitReason(e.target.value)}
          rows={3}
          className="rounded-lg border border-gray-300 px-4 py-3 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />
      </label>

      <div className="grid grid-cols-3 gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">하루 흡연량</span>
          <input
            type="number"
            value={cigarettesPerDay}
            onChange={(e) => setCigarettesPerDay(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">갑당 가격</span>
          <input
            type="number"
            value={pricePerPack}
            onChange={(e) => setPricePerPack(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">갑당 개비수</span>
          <input
            type="number"
            value={cigarettesPerPack}
            onChange={(e) => setCigarettesPerPack(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="rounded-lg bg-green-600 py-3 text-lg font-semibold text-white"
      >
        저장
      </button>
    </div>
  );
}
