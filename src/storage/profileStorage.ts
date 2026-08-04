import type { UserProfile } from '../types';

const KEY = 'quit-app:profile';

export function getProfile(): UserProfile | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(KEY, JSON.stringify(profile));
}

export function clearProfile(): void {
  localStorage.removeItem(KEY);
}

export function isOnboarded(): boolean {
  return getProfile() !== null;
}
