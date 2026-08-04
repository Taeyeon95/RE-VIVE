interface Props {
  onResetAll: () => void;
}

export function DataResetSection({ onResetAll }: Props) {
  const handleClick = () => {
    const confirmed = window.confirm(
      '모든 설정과 기록이 삭제됩니다. 정말 초기화할까요?',
    );
    if (confirmed) onResetAll();
  };

  return (
    <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 dark:border-gray-700">
      <h3 className="font-medium text-red-600">위험 구역</h3>
      <button
        type="button"
        onClick={handleClick}
        className="rounded-lg border-2 border-red-500 py-3 text-lg font-semibold text-red-600"
      >
        전체 데이터 초기화
      </button>
    </div>
  );
}
