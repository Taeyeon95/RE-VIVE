import type { CravingFlowResult } from '../../hooks/useCravingFlow';

interface Props {
  result: CravingFlowResult;
  onClose: () => void;
}

export function CravingResultScreen({ result, onClose }: Props) {
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
