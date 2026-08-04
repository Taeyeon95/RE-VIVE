interface Props {
  onResetAll: () => void;
}

export function DataResetSection({ onResetAll }: Props) {
  const handleClick = () => {
    const confirmed = window.confirm('모든 설정과 기록이 삭제됩니다. 정말 초기화할까요?');
    if (confirmed) onResetAll();
  };

  return (
    <div className="border-outline-variant flex flex-col gap-2 border-t pt-4">
      <h3 className="text-label-lg text-error">위험 구역</h3>
      <button
        type="button"
        onClick={handleClick}
        className="border-error text-error text-label-lg rounded-xl border-2 py-3"
      >
        전체 데이터 초기화
      </button>
    </div>
  );
}
