import { useState } from 'react';

interface Props {
  onMigrate: () => Promise<void>;
  onSkip: () => void;
}

export function MigratePrompt({ onMigrate, onSkip }: Props) {
  const [migrating, setMigrating] = useState(false);

  const handleMigrate = async () => {
    setMigrating(true);
    await onMigrate();
    setMigrating(false);
  };

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-6 p-6 text-center">
      <span className="text-4xl">📦</span>
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">게스트로 쓰던 기록이 있어요</h2>
      <p className="text-gray-600 dark:text-gray-400">
        이 기기에 저장된 금연 기록을 계정으로 가져올까요? 가져오면 다른 기기에서도 이어서 볼 수 있어요.
      </p>
      <div className="flex w-full flex-col gap-3">
        <button
          type="button"
          onClick={handleMigrate}
          disabled={migrating}
          className="rounded-2xl bg-green-600 py-4 text-lg font-semibold text-white disabled:opacity-40"
        >
          {migrating ? '가져오는 중...' : '가져오기'}
        </button>
        <button
          type="button"
          onClick={onSkip}
          disabled={migrating}
          className="text-gray-500 disabled:opacity-40 dark:text-gray-400"
        >
          건너뛰기 (새로 시작)
        </button>
      </div>
    </div>
  );
}
