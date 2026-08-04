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
    return <p className="text-gray-400">아직 기록이 없어요</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {sorted.map((event) => (
        <li
          key={event.id}
          className="flex items-center justify-between rounded-lg bg-gray-100 px-4 py-3 dark:bg-gray-800"
        >
          <div>
            <div className="text-gray-800 dark:text-gray-200">{formatTimestamp(event.timestamp)}</div>
            <div className={`text-sm ${event.completed ? 'text-green-600' : 'text-gray-500'}`}>
              {event.completed ? `참았어요 · ${Math.floor(event.moneySaved).toLocaleString()}원 절약` : '중도 포기'}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onDelete(event.id)}
            className="text-gray-400 hover:text-red-500"
            aria-label="기록 삭제"
          >
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}
