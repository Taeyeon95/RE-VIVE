import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

interface Props {
  authError: string;
  onGuestContinue: () => void;
  onLogIn: (email: string, password: string) => Promise<boolean>;
  onSignUp: (email: string, password: string) => Promise<boolean>;
}

type SubView = 'choice' | 'login' | 'signup';

export function AuthGate({ authError, onGuestContinue, onLogIn, onSignUp }: Props) {
  const [subView, setSubView] = useState<SubView>('choice');

  if (subView === 'login') {
    return <LoginForm authError={authError} onSubmit={onLogIn} onBack={() => setSubView('choice')} />;
  }
  if (subView === 'signup') {
    return <SignupForm authError={authError} onSubmit={onSignUp} onBack={() => setSubView('choice')} />;
  }

  return (
    <div className="bg-surface mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-6 p-6 text-center">
      <img src="/auth-logo.png" alt="RE:VIVE 로고" className="h-72 w-72 object-contain" />
      <p className="text-body-md text-on-surface-variant">
        로그인하면 여러 기기에서 같은 기록을 볼 수 있어요. 로그인 없이 이 기기에만 저장할 수도 있어요.
      </p>

      <div className="flex w-full flex-col gap-3">
        <button type="button" onClick={onGuestContinue} className="bg-primary text-on-primary text-label-lg rounded-2xl py-4">
          게스트로 시작하기
        </button>
        <button
          type="button"
          onClick={() => setSubView('login')}
          className="border-outline-variant text-on-surface-variant text-label-lg rounded-2xl border py-4"
        >
          로그인
        </button>
        <button
          type="button"
          onClick={() => setSubView('signup')}
          className="border-outline-variant text-on-surface-variant text-label-lg rounded-2xl border py-4"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
