import { useEffect, useState } from 'react';
import { ExerciseStep } from '../onboarding/ExerciseStep';
import { inputClass, labelClass, primaryButtonClass } from '../../styles/formStyles';
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

  useEffect(() => {
    setQuitDateTime(toDatetimeLocal(profile.quitDateTime));
  }, [profile.quitDateTime]);

  const handleRestart = () => {
    const confirmed = window.confirm(
      '오늘부터 금연을 다시 시작할까요? 지금까지의 기록은 목표 달성에 계속 반영되고, 금연 일수와 참은 횟수만 새로 시작해요.',
    );
    if (confirmed) onRestartQuitDate();
  };

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
      <label className="flex flex-col gap-2">
        <span className={labelClass}>금연 시작 일시</span>
        <input
          type="datetime-local"
          value={quitDateTime}
          onChange={(e) => setQuitDateTime(e.target.value)}
          className={inputClass}
        />
      </label>
      <button type="button" onClick={handleRestart} className="text-label-sm text-secondary self-start underline">
        금연에 실패했나요? 오늘부터 다시 시작하기
      </button>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>나이</span>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className={inputClass} />
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className={labelClass}>불편한 신체 부위</legend>
        <div className="flex gap-4">
          {BODY_CONDITION_OPTIONS.map((condition) => (
            <label key={condition} className="text-body-md flex items-center gap-2">
              <input
                type="checkbox"
                checked={bodyConditions.includes(condition)}
                onChange={() => toggleCondition(condition)}
                className="text-primary h-5 w-5"
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

      <label className="flex flex-col gap-2">
        <span className={labelClass}>금연 이유</span>
        <textarea
          value={quitReason}
          onChange={(e) => setQuitReason(e.target.value)}
          rows={3}
          className="text-body-lg border-outline-variant focus:border-primary focus:ring-primary/30 rounded-xl border bg-white px-4 py-3 outline-none focus:ring-2"
        />
      </label>

      <div className="grid grid-cols-3 gap-3">
        <label className="flex flex-col gap-2">
          <span className="text-label-sm text-primary">하루 흡연량</span>
          <input
            type="number"
            value={cigarettesPerDay}
            onChange={(e) => setCigarettesPerDay(e.target.value)}
            className="border-outline-variant focus:border-primary focus:ring-primary/30 text-body-md h-12 rounded-xl border bg-white px-3 outline-none focus:ring-2"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-label-sm text-primary">갑당 가격</span>
          <input
            type="number"
            value={pricePerPack}
            onChange={(e) => setPricePerPack(e.target.value)}
            className="border-outline-variant focus:border-primary focus:ring-primary/30 text-body-md h-12 rounded-xl border bg-white px-3 outline-none focus:ring-2"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-label-sm text-primary">갑당 개비수</span>
          <input
            type="number"
            value={cigarettesPerPack}
            onChange={(e) => setCigarettesPerPack(e.target.value)}
            className="border-outline-variant focus:border-primary focus:ring-primary/30 text-body-md h-12 rounded-xl border bg-white px-3 outline-none focus:ring-2"
          />
        </label>
      </div>

      <button type="button" onClick={handleSave} className={primaryButtonClass}>
        저장
      </button>
    </div>
  );
}
