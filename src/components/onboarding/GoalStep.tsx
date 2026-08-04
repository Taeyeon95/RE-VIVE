import { useRef, useState } from 'react';
import { resizeImageFile } from '../../utils/imageResize';
import { inputClass, labelClass } from '../../styles/formStyles';

interface Props {
  goalName: string;
  goalTargetPrice: string;
  goalPhotoDataUrl: string;
  onChange: (updates: { goalName?: string; goalTargetPrice?: string; goalPhotoDataUrl?: string }) => void;
}

export function GoalStep({ goalName, goalTargetPrice, goalPhotoDataUrl, onChange }: Props) {
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (file: File | undefined) => {
    if (!file) return;
    try {
      setError('');
      const dataUrl = await resizeImageFile(file);
      onChange({ goalPhotoDataUrl: dataUrl });
    } catch {
      setError('사진을 불러오지 못했어요. 다른 사진을 시도해주세요.');
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-headline-lg-mobile text-primary">목표 물건을 등록해주세요</h2>
      <p className="text-body-md text-on-surface-variant">담배를 참을 때마다 이 물건의 구매 달성률이 채워져요.</p>

      <div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="border-outline-variant bg-surface-container-low hover:bg-surface-container-high hover:border-primary flex h-48 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-all"
        >
          {goalPhotoDataUrl ? (
            <img src={goalPhotoDataUrl} alt="목표 물건 미리보기" className="h-full w-full rounded-xl object-cover" />
          ) : (
            <>
              <span className="material-symbols-outlined text-outline text-4xl">add_a_photo</span>
              <p className="text-label-lg text-outline">물건 사진 업로드</p>
            </>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handlePhotoUpload(e.target.files?.[0])}
          className="hidden"
        />
        {error && <span className="text-error text-label-sm mt-2 block">{error}</span>}
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>목표 물건 이름</span>
        <input
          type="text"
          value={goalName}
          onChange={(e) => onChange({ goalName: e.target.value })}
          className={inputClass}
          placeholder="예: 에어팟"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>목표 금액 (원)</span>
        <input
          type="number"
          min={1}
          value={goalTargetPrice}
          onChange={(e) => onChange({ goalTargetPrice: e.target.value })}
          className={inputClass}
          placeholder="예: 300000"
        />
      </label>
    </div>
  );
}
