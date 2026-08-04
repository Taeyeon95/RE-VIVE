interface Props {
  onTrigger: () => void;
}

export function CravingTriggerButton({ onTrigger }: Props) {
  return (
    <button
      type="button"
      onClick={onTrigger}
      className="w-full rounded-2xl bg-red-500 py-6 text-xl font-bold text-white shadow-md active:bg-red-600"
    >
      충동이 왔어요
    </button>
  );
}
