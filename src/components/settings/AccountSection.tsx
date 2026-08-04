import { primaryButtonClass, secondaryButtonClass } from '../../styles/formStyles';

interface Props {
  email: string | null;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onLogOut: () => void;
}

export function AccountSection({ email, onOpenLogin, onOpenSignup, onLogOut }: Props) {
  if (email) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-body-md text-on-surface-variant">
          <span className="text-on-surface font-semibold">{email}</span> 계정으로 로그인 중이에요
        </p>
        <button type="button" onClick={onLogOut} className={secondaryButtonClass}>
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-body-md text-on-surface-variant">
        지금은 이 기기에만 기록이 저장돼요. 로그인하면 다른 기기에서도 이어서 볼 수 있어요.
      </p>
      <div className="flex gap-3">
        <button type="button" onClick={onOpenLogin} className={secondaryButtonClass}>
          로그인
        </button>
        <button type="button" onClick={onOpenSignup} className={primaryButtonClass}>
          회원가입
        </button>
      </div>
    </div>
  );
}
