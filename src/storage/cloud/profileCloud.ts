import { apiFetch } from '../../lib/api';
import type { UserProfile } from '../../types';

export async function getProfile(): Promise<UserProfile | null> {
  const res = await apiFetch('/api/profile');
  const data = await res.json();
  return data.profile;
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  await apiFetch('/api/profile', { method: 'PUT', body: JSON.stringify(profile) });
}

export async function clearProfile(): Promise<void> {
  await apiFetch('/api/profile', { method: 'DELETE' });
}
