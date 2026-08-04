import { useState } from 'react';

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
    <div className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-4 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">회원가입</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        className="rounded-lg border border-gray-300 px-4 py-3 text-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호 (6자 이상)"
        className="rounded-lg border border-gray-300 px-4 py-3 text-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
      />
      <input
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="비밀번호 확인"
        className="rounded-lg border border-gray-300 px-4 py-3 text-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
      />
      {mismatch && <p className="text-red-600">비밀번호가 일치하지 않아요.</p>}
      {authError && <p className="text-red-600">{authError}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting || !canSubmit}
        className="rounded-lg bg-green-600 py-3 text-lg font-semibold text-white disabled:opacity-40"
      >
        {submitting ? '가입 중...' : '회원가입'}
      </button>
      <button type="button" onClick={onBack} className="text-gray-500 dark:text-gray-400">
        뒤로
      </button>
    </div>
  );
}
