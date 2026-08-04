interface Props {
  quitReason: string;
  onProceed: () => void;
  onClose: () => void;
}

export function MotivationScreen({ quitReason, onProceed, onClose }: Props) {
  return (
    <div className="flex min-h-svh flex-col justify-between p-6">
      <button type="button" onClick={onClose} className="self-end text-2xl text-gray-400">
        ✕
      </button>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <p className="text-gray-500 dark:text-gray-400">당신이 담배를 끊으려는 이유</p>
        <p className="text-3xl leading-snug font-bold text-gray-900 dark:text-gray-100">
          "{quitReason}"
        </p>
      </div>

      <button
        type="button"
        onClick={onProceed}
        className="w-full rounded-2xl bg-green-600 py-4 text-xl font-semibold text-white"
      >
        운동 시작하기
      </button>
    </div>
  );
}
