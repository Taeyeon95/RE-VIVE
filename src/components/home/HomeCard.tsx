import { useState } from 'react';
import type { GoalItem } from '../../types';

interface ActiveGoalProgress {
  goal: GoalItem;
  percentCurrent: number;
  percentBefore: number;
  savedCurrent: number;
  savedBefore: number;
}

interface Props {
  activeGoals: ActiveGoalProgress[];
  onGoToSettings: () => void;
  onBuyGoal: (goal: GoalItem) => void;
}

export function HomeCard({ activeGoals, onGoToSettings, onBuyGoal }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (activeGoals.length === 0) {
    return (
      <div className="shadow-soft border-primary/5 flex flex-col items-center gap-3 rounded-xl border bg-white p-6 text-center">
        <p className="text-body-md text-on-surface-variant">목표 물건을 먼저 설정해보세요!</p>
        <button
          type="button"
          onClick={onGoToSettings}
          className="text-label-lg bg-primary text-on-primary rounded-xl px-4 py-2"
        >
          설정으로 이동
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-gutter">
      {activeGoals.map(({ goal, percentCurrent, percentBefore, savedCurrent, savedBefore }) => {
        const isExpanded = expandedId === goal.id;
        const isBuyable = percentCurrent >= 100;

        return (
          <div
            key={goal.id}
            role="button"
            tabIndex={0}
            onClick={() => setExpandedId(isExpanded ? null : goal.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setExpandedId(isExpanded ? null : goal.id);
            }}
            className="shadow-soft border-primary/5 flex flex-col gap-3 rounded-xl border bg-white p-4 text-left"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-label-sm text-secondary font-bold uppercase">목표</span>
                <h3 className="text-headline-md text-primary mt-1">{goal.name}</h3>
              </div>
              <span className="bg-secondary-fixed text-on-secondary-fixed text-label-sm rounded-full px-3 py-1">
                {Math.floor(percentCurrent)}%
              </span>
            </div>

            <div className="bg-surface-container-low aspect-video w-full overflow-hidden rounded-lg">
              <img src={goal.photoDataUrl} alt={goal.name} className="h-full w-full object-cover" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-label-lg text-primary flex justify-between">
                <span>{Math.floor(savedCurrent).toLocaleString()}원 달성</span>
                <span>{goal.targetPrice.toLocaleString()}원</span>
              </div>
              <div className="bg-surface-container-high h-4 w-full overflow-hidden rounded-full">
                <div
                  className="bg-secondary-container h-full transition-all duration-500"
                  style={{ width: `${percentCurrent}%` }}
                />
              </div>
            </div>

            {isExpanded && isBuyable && (
              <div className="bg-primary-container/10 flex flex-col items-center gap-3 rounded-xl p-4 text-center">
                <p className="text-label-lg text-primary">🎉 이 물건을 살 수 있어요!</p>
                <div className="flex w-full gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedId(null);
                    }}
                    className="border-outline-variant text-on-surface-variant text-label-sm flex-1 rounded-xl border py-2"
                  >
                    다음에 살게요
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onBuyGoal(goal);
                      setExpandedId(null);
                    }}
                    className="bg-primary text-on-primary text-label-sm flex-1 rounded-xl py-2"
                  >
                    구매하기
                  </button>
                </div>
              </div>
            )}

            {isExpanded && (
              <div className="border-outline-variant flex flex-col gap-2 border-t pt-3">
                <span className="text-label-sm text-on-surface-variant">저번 시도</span>
                <div className="bg-surface-container-high h-4 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-outline-variant h-full transition-all duration-500"
                    style={{ width: `${percentBefore}%` }}
                  />
                </div>
                <p className="text-label-sm text-on-surface-variant">
                  {savedBefore > 0
                    ? `저번에는 ${Math.floor(savedBefore).toLocaleString()}원 달성했었어요 (${Math.floor(percentBefore)}%)`
                    : '저번 시도 기록은 아직 없어요'}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
