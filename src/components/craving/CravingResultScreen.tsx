import type { CravingFlowResult } from '../../hooks/useCravingFlow';

interface Props {
  result: CravingFlowResult;
  onClose: () => void;
  onGoToGoalSettings: () => void;
}

export function CravingResultScreen({ result, onClose, onGoToGoalSettings }: Props) {
  if (!result.completed) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 text-center">
        <span className="text-5xl">💪</span>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">다시 도전해봐요!</p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-2xl bg-green-600 px-8 py-3 text-lg font-semibold text-white"
        >
          확인
        </button>
      </div>
    );
  }

  if (result.achievedGoalNames.length > 0) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 text-center">
        <span className="text-5xl">🎉</span>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          목표 달성! 이제 "{result.achievedGoalNames.join('", "')}" 살 수 있어요!
        </p>
        <button
          type="button"
          onClick={onGoToGoalSettings}
          className="rounded-2xl bg-green-600 px-8 py-3 text-lg font-semibold text-white"
        >
          새 목표 등록하기
        </button>
        <button type="button" onClick={onClose} className="text-gray-500 dark:text-gray-400">
          닫기
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 text-center">
      <span className="text-5xl">✅</span>
      <p className="text-xl text-gray-700 dark:text-gray-300">충동을 잘 이겨냈어요!</p>
      <p className="text-2xl font-bold text-green-600">{Math.floor(result.moneySaved).toLocaleString()}원 절약했어요</p>
      <p className="text-gray-500 dark:text-gray-400">조금만 더 버텨봐요!</p>
      <button
        type="button"
        onClick={onClose}
        className="rounded-2xl bg-green-600 px-8 py-3 text-lg font-semibold text-white"
      >
        확인
      </button>
    </div>
  );
}
