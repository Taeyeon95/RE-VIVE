import { primaryButtonClass } from '../../styles/formStyles';

interface Props {
  quitReason: string;
  onProceed: () => void;
  onClose: () => void;
}

export function MotivationScreen({ quitReason, onProceed, onClose }: Props) {
  return (
    <div className="bg-surface flex min-h-svh flex-col justify-between p-6">
      <button type="button" onClick={onClose} className="material-symbols-outlined text-outline self-end text-3xl">
        close
      </button>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <p className="text-body-md text-on-surface-variant">당신이 담배를 끊으려는 이유</p>
        <p className="text-headline-lg text-primary leading-snug">"{quitReason}"</p>
      </div>

      <button type="button" onClick={onProceed} className={primaryButtonClass}>
        운동 시작하기
      </button>
    </div>
  );
}
