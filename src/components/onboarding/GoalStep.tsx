import { useState } from 'react';
import { resizeImageFile } from '../../utils/imageResize';

interface Props {
  goalName: string;
  goalTargetPrice: string;
  goalPhotoDataUrl: string;
  onChange: (updates: { goalName?: string; goalTargetPrice?: string; goalPhotoDataUrl?: string }) => void;
}

export function GoalStep({ goalName, goalTargetPrice, goalPhotoDataUrl, onChange }: Props) {
  const [error, setError] = useState('');

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
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        목표 물건을 등록해주세요
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        담배를 참을 때마다 이 물건의 구매 달성률이 채워져요.
      </p>

      <label className="flex flex-col gap-1">
        <span className="font-medium text-gray-800 dark:text-gray-200">목표 물건 이름</span>
        <input
          type="text"
          value={goalName}
          onChange={(e) => onChange({ goalName: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-3 text-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          placeholder="예: 에어팟"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-medium text-gray-800 dark:text-gray-200">목표 금액 (원)</span>
        <input
          type="number"
          min={1}
          value={goalTargetPrice}
          onChange={(e) => onChange({ goalTargetPrice: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-3 text-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          placeholder="예: 300000"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-medium text-gray-800 dark:text-gray-200">사진</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handlePhotoUpload(e.target.files?.[0])}
          className="text-gray-700 dark:text-gray-300"
        />
        {error && <span className="text-red-600">{error}</span>}
        {goalPhotoDataUrl && (
          <img
            src={goalPhotoDataUrl}
            alt="목표 물건 미리보기"
            className="mt-2 h-40 w-40 rounded-lg object-cover"
          />
        )}
      </label>
    </div>
  );
}
