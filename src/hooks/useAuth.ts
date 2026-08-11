import { useCallback, useEffect, useState } from 'react';
import { apiFetch, ApiError } from '../lib/api';

export interface AuthUser {
  uid: string;
  email: string;
  isAdmin: boolean;
}

function translateAuthError(error: unknown): string {
  const code = error instanceof ApiError ? error.code : '';
  switch (code) {
    case 'EMAIL_IN_USE':
      return '이미 가입된 이메일이에요.';
    case 'INVALID_EMAIL':
      return '이메일 형식이 올바르지 않아요.';
    case 'WEAK_PASSWORD':
      return '비밀번호는 6자 이상이어야 해요.';
    case 'INVALID_CREDENTIALS':
      return '이메일 또는 비밀번호가 올바르지 않아요.';
    default:
      return '문제가 발생했어요. 잠시 후 다시 시도해주세요.';
  }
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    apiFetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    setAuthError('');
    try {
      const res = await apiFetch('/api/auth/signup', { method: 'POST', body: JSON.stringify({ email, password }) });
      setUser(await res.json());
      return true;
    } catch (error) {
      setAuthError(translateAuthError(error));
      return false;
    }
  }, []);

  const logIn = useCallback(async (email: string, password: string) => {
    setAuthError('');
    try {
      const res = await apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      setUser(await res.json());
      return true;
    } catch (error) {
      setAuthError(translateAuthError(error));
      return false;
    }
  }, []);

  const logOut = useCallback(async () => {
    await apiFetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  }, []);

  return { user, authLoading: user === undefined, authError, signUp, logIn, logOut };
}
