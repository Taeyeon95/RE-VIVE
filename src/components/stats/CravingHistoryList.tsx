import type { CravingEvent } from '../../types';

interface Props {
  events: CravingEvent[];
  onDelete: (id: string) => void;
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function CravingHistoryList({ events, onDelete }: Props) {
  const sorted = [...events].sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  if (sorted.length === 0) {
    return (
      <p className="text-label-sm border-primary/5 shadow-soft rounded-xl border bg-white p-4 text-on-surface-variant">
        아직 기록이 없어요
      </p>
    );
  }

  return (
    <ul className="border-primary/5 shadow-soft flex flex-col divide-y divide-surface-container-high rounded-xl border bg-white">
      {sorted.map((event) => (
        <li key={event.id} className="flex items-center justify-between px-4 py-3">
          <div>
            <div className="text-body-md text-on-surface">{formatTimestamp(event.timestamp)}</div>
            <div className={`text-label-sm ${event.completed ? 'text-primary' : 'text-on-surface-variant'}`}>
              {event.completed ? `참았어요 · ${Math.floor(event.moneySaved).toLocaleString()}원 절약` : '중도 포기'}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onDelete(event.id)}
            className="material-symbols-outlined text-outline-variant hover:text-error transition-colors"
            aria-label="기록 삭제"
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
}
