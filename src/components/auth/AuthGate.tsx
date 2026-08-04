import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { isFirebaseConfigured } from '../../lib/firebase';

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
      <span className="text-5xl">🌱</span>
      <h1 className="text-headline-lg text-primary">금연 트래커</h1>
      <p className="text-body-md text-on-surface-variant">
        로그인하면 여러 기기에서 같은 기록을 볼 수 있어요. 로그인 없이 이 기기에만 저장할 수도 있어요.
      </p>

      {!isFirebaseConfigured && (
        <p className="bg-secondary-fixed text-on-secondary-fixed text-label-sm rounded-xl p-3">
          아직 로그인 기능이 설정되지 않았어요. 지금은 게스트로만 시작할 수 있어요.
        </p>
      )}

      <div className="flex w-full flex-col gap-3">
        <button type="button" onClick={onGuestContinue} className="bg-primary text-on-primary text-label-lg rounded-2xl py-4">
          게스트로 시작하기
        </button>
        <button
          type="button"
          onClick={() => setSubView('login')}
          disabled={!isFirebaseConfigured}
          className="border-outline-variant text-on-surface-variant text-label-lg rounded-2xl border py-4 disabled:opacity-40"
        >
          로그인
        </button>
        <button
          type="button"
          onClick={() => setSubView('signup')}
          disabled={!isFirebaseConfigured}
          className="border-outline-variant text-on-surface-variant text-label-lg rounded-2xl border py-4 disabled:opacity-40"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
