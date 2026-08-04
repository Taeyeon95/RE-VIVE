import { useState } from 'react';
import { inputClass, primaryButtonClass } from '../../styles/formStyles';

interface Props {
  authError: string;
  onSubmit: (email: string, password: string) => Promise<boolean>;
  onBack: () => void;
}

export function LoginForm({ authError, onSubmit, onBack }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    await onSubmit(email, password);
    setSubmitting(false);
  };

  return (
    <div className="bg-surface mx-auto flex min-h-svh max-w-md flex-col justify-center gap-4 p-6">
      <h2 className="text-headline-lg-mobile text-primary">로그인</h2>

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
        placeholder="비밀번호"
        className={inputClass}
      />

      {authError && <p className="text-error text-label-sm">{authError}</p>}

      <button type="button" onClick={handleSubmit} disabled={submitting || !email || !password} className={primaryButtonClass}>
        {submitting ? '로그인 중...' : '로그인'}
      </button>
      <button type="button" onClick={onBack} className="text-on-surface-variant">
        뒤로
      </button>
    </div>
  );
}
