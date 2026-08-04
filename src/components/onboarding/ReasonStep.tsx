interface Props {
  quitReason: string;
  onChange: (value: string) => void;
}

export function ReasonStep({ quitReason, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-headline-lg-mobile text-primary">금연을 결심한 이유를 적어주세요</h2>
      <p className="text-body-md text-on-surface-variant">
        흡연 충동이 올 때 이 문구를 보여드려요. 예: "아이 앞에서 담배 피우기 싫어서"
      </p>
      <textarea
        value={quitReason}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="text-body-lg border-outline-variant focus:border-primary focus:ring-primary/30 rounded-xl border bg-white px-4 py-3 outline-none focus:ring-2"
        placeholder="담배를 끊으려는 이유를 자유롭게 적어주세요"
      />
    </div>
  );
}
