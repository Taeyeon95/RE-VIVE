import type { AccessibilitySettings, FontSize } from '../../types';

interface Props {
  accessibility: AccessibilitySettings;
  onChange: (updates: Partial<AccessibilitySettings>) => void;
}

const FONT_SIZE_OPTIONS: { value: FontSize; label: string }[] = [
  { value: 'normal', label: '보통' },
  { value: 'large', label: '크게' },
  { value: 'xlarge', label: '아주 크게' },
];

export function AccessibilitySettingsForm({ accessibility, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <fieldset className="flex flex-col gap-2">
        <legend className="font-medium text-gray-800 dark:text-gray-200">글씨 크기</legend>
        <div className="flex gap-2">
          {FONT_SIZE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ fontSize: opt.value })}
              className={`flex-1 rounded-lg border-2 py-2 ${
                accessibility.fontSize === opt.value
                  ? 'border-green-600 bg-green-50 dark:bg-green-950'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="flex items-center justify-between rounded-lg bg-gray-100 px-4 py-3 dark:bg-gray-800">
        <span className="font-medium text-gray-800 dark:text-gray-200">화면 단순화 모드</span>
        <input
          type="checkbox"
          checked={accessibility.simplifiedUI}
          onChange={(e) => onChange({ simplifiedUI: e.target.checked })}
          className="h-6 w-6"
        />
      </label>
    </div>
  );
}
