import { inputClass, labelClass } from '../../styles/formStyles';

interface ProfileStepData {
  age: string;
  bodyConditions: string[];
  quitDateTime: string;
  cigarettesPerDay: string;
  pricePerPack: string;
  cigarettesPerPack: string;
}

interface Props {
  data: ProfileStepData;
  onChange: (updates: Partial<ProfileStepData>) => void;
}

const BODY_CONDITION_OPTIONS = ['무릎', '허리'];

export function ProfileStep({ data, onChange }: Props) {
  const toggleCondition = (condition: string) => {
    const next = data.bodyConditions.includes(condition)
      ? data.bodyConditions.filter((c) => c !== condition)
      : [...data.bodyConditions, condition];
    onChange({ bodyConditions: next });
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-headline-lg-mobile text-primary">기본 정보를 알려주세요</h2>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>나이</span>
        <input
          type="number"
          min={1}
          value={data.age}
          onChange={(e) => onChange({ age: e.target.value })}
          className={inputClass}
          placeholder="예: 45"
        />
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className={labelClass}>불편한 신체 부위 (해당 시 선택)</legend>
        <div className="flex gap-4">
          {BODY_CONDITION_OPTIONS.map((condition) => (
            <label key={condition} className="text-body-lg flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.bodyConditions.includes(condition)}
                onChange={() => toggleCondition(condition)}
                className="text-primary h-5 w-5"
              />
              {condition}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>금연 시작 일시</span>
        <input
          type="datetime-local"
          value={data.quitDateTime}
          onChange={(e) => onChange({ quitDateTime: e.target.value })}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>하루 평균 흡연량 (개비)</span>
        <input
          type="number"
          min={1}
          value={data.cigarettesPerDay}
          onChange={(e) => onChange({ cigarettesPerDay: e.target.value })}
          className={inputClass}
          placeholder="예: 10"
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>한 갑 가격 (원)</span>
          <input
            type="number"
            min={1}
            value={data.pricePerPack}
            onChange={(e) => onChange({ pricePerPack: e.target.value })}
            className={inputClass}
            placeholder="예: 4500"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>한 갑당 개비 수</span>
          <input
            type="number"
            min={1}
            value={data.cigarettesPerPack}
            onChange={(e) => onChange({ cigarettesPerPack: e.target.value })}
            className={inputClass}
            placeholder="20"
          />
        </label>
      </div>
    </div>
  );
}

export function isProfileStepValid(data: ProfileStepData): boolean {
  return (
    Number(data.age) > 0 &&
    data.quitDateTime.trim() !== '' &&
    Number(data.cigarettesPerDay) > 0 &&
    Number(data.pricePerPack) > 0 &&
    Number(data.cigarettesPerPack) > 0
  );
}

export type { ProfileStepData };
