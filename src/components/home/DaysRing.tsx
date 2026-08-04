interface Props {
  days: number;
}

const MILESTONES = [7, 30, 100, 365];
const RADIUS = 86;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function DaysRing({ days }: Props) {
  const milestone = MILESTONES.find((m) => days < m) ?? MILESTONES[MILESTONES.length - 1];
  const percent = Math.min(100, (days / milestone) * 100);
  const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  return (
    <div className="relative h-48 w-48">
      <svg className="h-full w-full" viewBox="0 0 192 192">
        <circle
          cx="96"
          cy="96"
          r={RADIUS}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="10"
          className="text-surface-container-high"
        />
        <circle
          cx="96"
          cy="96"
          r={RADIUS}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="progress-ring__circle text-secondary-container"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-display-lg leading-none text-primary">{days}</span>
        <span className="text-label-lg mt-1 tracking-widest text-on-surface-variant uppercase">Days</span>
      </div>
    </div>
  );
}
