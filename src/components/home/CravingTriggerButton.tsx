interface Props {
  onTrigger: () => void;
}

export function CravingTriggerButton({ onTrigger }: Props) {
  return (
    <button
      type="button"
      onClick={onTrigger}
      className="bg-secondary text-on-secondary shadow-active flex h-14 w-full items-center justify-center gap-3 rounded-full transition-all active:scale-95"
    >
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
        warning
      </span>
      <span className="text-label-lg text-lg font-bold">충동이 왔어요</span>
    </button>
  );
}
