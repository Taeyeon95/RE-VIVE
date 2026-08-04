interface Props {
  totalCompletedCount: number;
  totalSaved: number;
}

export function HomeStatsSummary({ totalCompletedCount, totalSaved }: Props) {
  return (
    <div className="grid grid-cols-2 gap-gutter">
      <div className="bg-primary-container shadow-soft flex flex-col justify-center gap-1 rounded-xl p-4 text-on-primary-container">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
          favorite
        </span>
        <span className="text-headline-md font-bold">{totalCompletedCount}회</span>
        <span className="text-label-sm opacity-80">참은 횟수</span>
      </div>
      <div className="shadow-soft border-primary/5 flex flex-col justify-center gap-1 rounded-xl border bg-white p-4">
        <span className="material-symbols-outlined text-secondary">payments</span>
        <span className="text-headline-md text-primary font-bold">{totalSaved.toLocaleString()}원</span>
        <span className="text-label-sm text-on-surface-variant">절약한 금액</span>
      </div>
    </div>
  );
}
