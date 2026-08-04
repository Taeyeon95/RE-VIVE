import { useState } from 'react';
import { inputClass, primaryButtonClass } from '../../styles/formStyles';

interface Props {
  authError: string;
  onSubmit: (email: string, password: string) => Promise<boolean>;
  onBack: () => void;
}

export function SignupForm({ authError, onSubmit, onBack }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const mismatch = passwordConfirm !== '' && password !== passwordConfirm;
  const canSubmit = email !== '' && password.length >= 6 && password === passwordConfirm;

  const handleSubmit = async () => {
    setSubmitting(true);
    await onSubmit(email, password);
    setSubmitting(false);
  };

  return (
    <div className="bg-surface mx-auto flex min-h-svh max-w-md flex-col justify-center gap-4 p-6">
      <h2 className="text-headline-lg-mobile text-primary">회원가입</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        className={inputClass}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호 (6자 이상)"
        className={inputClass}
      />
      <input
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="비밀번호 확인"
        className={inputClass}
      />
      {mismatch && <p className="text-error text-label-sm">비밀번호가 일치하지 않아요.</p>}
      {authError && <p className="text-error text-label-sm">{authError}</p>}

      <button type="button" onClick={handleSubmit} disabled={submitting || !canSubmit} className={primaryButtonClass}>
        {submitting ? '가입 중...' : '회원가입'}
      </button>
      <button type="button" onClick={onBack} className="text-on-surface-variant">
        뒤로
      </button>
    </div>
  );
}
