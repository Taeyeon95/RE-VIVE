import { cardClass } from '../../styles/formStyles';
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

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-8 w-14 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-surface-container-high'}`}
    >
      <span
        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export function AccessibilitySettingsForm({ accessibility, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <fieldset className="flex flex-col gap-2">
        <legend className="text-label-lg text-primary">글씨 크기</legend>
        <div className="flex gap-2">
          {FONT_SIZE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ fontSize: opt.value })}
              className={`text-label-lg flex-1 rounded-xl border-2 py-2 transition-colors ${
                accessibility.fontSize === opt.value
                  ? 'border-primary bg-primary-container/10 text-primary'
                  : 'border-outline-variant text-on-surface-variant'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className={`${cardClass} flex items-center justify-between px-4 py-3`}>
        <span className="text-label-lg text-on-surface">화면 단순화 모드</span>
        <ToggleSwitch
          checked={accessibility.simplifiedUI}
          onChange={(checked) => onChange({ simplifiedUI: checked })}
        />
      </div>
    </div>
  );
}
