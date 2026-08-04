import { useState } from 'react';
import { GoalStep } from '../onboarding/GoalStep';
import type { GoalItem } from '../../types';

interface Props {
  activeGoals: GoalItem[];
  onUpdateGoal: (id: string, updates: Partial<GoalItem>) => void;
  onCreateGoal: (goal: Omit<GoalItem, 'id' | 'status' | 'createdAt'>) => void;
  onDeleteGoal: (id: string) => void;
}

interface GoalFormState {
  goalName: string;
  goalTargetPrice: string;
  goalPhotoDataUrl: string;
}

function toFormState(goal?: GoalItem): GoalFormState {
  return {
    goalName: goal?.name ?? '',
    goalTargetPrice: goal ? String(goal.targetPrice) : '',
    goalPhotoDataUrl: goal?.photoDataUrl ?? '',
  };
}

function GoalForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial: GoalFormState;
  submitLabel: string;
  onSubmit: (goal: { name: string; targetPrice: number; photoDataUrl: string }) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  const isValid = form.goalName.trim() !== '' && Number(form.goalTargetPrice) > 0 && form.goalPhotoDataUrl !== '';

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
      <GoalStep
        goalName={form.goalName}
        goalTargetPrice={form.goalTargetPrice}
        goalPhotoDataUrl={form.goalPhotoDataUrl}
        onChange={(updates) => setForm((prev) => ({ ...prev, ...updates }))}
      />
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-lg border border-gray-300 py-2 text-gray-700 dark:border-gray-600 dark:text-gray-300"
        >
          취소
        </button>
        <button
          type="button"
          disabled={!isValid}
          onClick={() =>
            onSubmit({
              name: form.goalName.trim(),
              targetPrice: Number(form.goalTargetPrice),
              photoDataUrl: form.goalPhotoDataUrl,
            })
          }
          className="flex-1 rounded-lg bg-green-600 py-2 font-semibold text-white disabled:opacity-40"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}

export function GoalSettingsForm({ activeGoals, onUpdateGoal, onCreateGoal, onDeleteGoal }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {activeGoals.length === 0 && !creating && (
        <p className="text-gray-400">아직 등록한 목표 물건이 없어요</p>
      )}

      {activeGoals.map((goal) =>
        editingId === goal.id ? (
          <GoalForm
            key={goal.id}
            initial={toFormState(goal)}
            submitLabel="수정 저장"
            onCancel={() => setEditingId(null)}
            onSubmit={(updates) => {
              onUpdateGoal(goal.id, updates);
              setEditingId(null);
            }}
          />
        ) : (
          <div
            key={goal.id}
            className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 dark:border-gray-700"
          >
            <img src={goal.photoDataUrl} alt={goal.name} className="h-14 w-14 rounded-lg object-cover" />
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-gray-100">{goal.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {goal.targetPrice.toLocaleString()}원
              </div>
            </div>
            <button type="button" onClick={() => setEditingId(goal.id)} className="text-green-600">
              수정
            </button>
            <button type="button" onClick={() => onDeleteGoal(goal.id)} className="text-red-500">
              삭제
            </button>
          </div>
        ),
      )}

      {creating ? (
        <GoalForm
          initial={toFormState()}
          submitLabel="목표 등록"
          onCancel={() => setCreating(false)}
          onSubmit={(goal) => {
            onCreateGoal(goal);
            setCreating(false);
          }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="rounded-lg border-2 border-dashed border-gray-300 py-3 text-gray-600 dark:border-gray-600 dark:text-gray-300"
        >
          + 새 목표 추가
        </button>
      )}
    </div>
  );
}
