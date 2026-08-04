import { useCallback, useEffect, useState } from 'react';
import type { ProfileBackend } from '../storage/profileBackend';
import type { UserProfile } from '../types';

export function useProfile(backend: ProfileBackend) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    backend.getProfile().then((p) => {
      if (cancelled) return;
      setProfile(p);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [backend]);

  const saveProfile = useCallback(
    async (next: UserProfile) => {
      await backend.saveProfile(next);
      setProfile(next);
    },
    [backend],
  );

  const updateProfile = useCallback(
    async (updates: Partial<UserProfile>) => {
      setProfile((prev) => {
        if (!prev) return prev;
        const next = { ...prev, ...updates };
        void backend.saveProfile(next);
        return next;
      });
    },
    [backend],
  );

  const resetProfile = useCallback(async () => {
    await backend.clearProfile();
    setProfile(null);
  }, [backend]);

  return {
    profile,
    loading,
    isOnboarded: profile !== null,
    saveProfile,
    updateProfile,
    resetProfile,
  };
}
