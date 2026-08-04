import type { CravingFlowResult } from '../../hooks/useCravingFlow';

interface Props {
  result: CravingFlowResult;
  onClose: () => void;
  onGoToGoalSettings: () => void;
}

export function CravingResultScreen({ result, onClose, onGoToGoalSettings }: Props) {
  if (!result.completed) {
    return (
      <div className="bg-surface flex min-h-svh flex-col items-center justify-center gap-6 p-6 text-center">
        <span className="text-5xl">💪</span>
        <p className="text-headline-lg text-primary">다시 도전해봐요!</p>
        <button type="button" onClick={onClose} className="bg-primary text-on-primary text-label-lg rounded-2xl px-8 py-3">
          확인
        </button>
      </div>
    );
  }

  if (result.achievedGoalNames.length > 0) {
    return (
      <div className="bg-surface flex min-h-svh flex-col items-center justify-center gap-6 p-6 text-center">
        <span className="text-5xl">🎉</span>
        <p className="text-headline-lg text-primary">
          목표 달성! 이제 "{result.achievedGoalNames.join('", "')}" 살 수 있어요!
        </p>
        <button
          type="button"
          onClick={onGoToGoalSettings}
          className="bg-primary text-on-primary text-label-lg rounded-2xl px-8 py-3"
        >
          새 목표 등록하기
        </button>
        <button type="button" onClick={onClose} className="text-on-surface-variant">
          닫기
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface flex min-h-svh flex-col items-center justify-center gap-6 p-6 text-center">
      <span className="text-5xl">✅</span>
      <p className="text-body-lg text-on-surface">충동을 잘 이겨냈어요!</p>
      <p className="text-headline-lg text-secondary">{Math.floor(result.moneySaved).toLocaleString()}원 절약했어요</p>
      <p className="text-body-md text-on-surface-variant">조금만 더 버텨봐요!</p>
      <button type="button" onClick={onClose} className="bg-primary text-on-primary text-label-lg rounded-2xl px-8 py-3">
        확인
      </button>
    </div>
  );
}
