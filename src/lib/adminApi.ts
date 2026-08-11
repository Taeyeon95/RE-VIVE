import { apiFetch } from './api';
import type { CravingEvent, GoalItem, UserProfile } from '../types';

export interface AdminUserSummary {
  uid: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  quitDateTime: string | null;
  goalCount: number;
  cravingCount: number;
}

export interface AdminUserDetail {
  user: { uid: string; email: string; isAdmin: boolean; createdAt: string };
  profile: UserProfile | null;
  goals: GoalItem[];
  cravingEvents: CravingEvent[];
}

export async function fetchAdminUsers(): Promise<AdminUserSummary[]> {
  const res = await apiFetch('/api/admin/users');
  const data = await res.json();
  return data.users;
}

export async function fetchAdminUserDetail(uid: string): Promise<AdminUserDetail> {
  const res = await apiFetch(`/api/admin/users/${uid}`);
  return res.json();
}

export async function deleteAdminUser(uid: string): Promise<void> {
  await apiFetch(`/api/admin/users/${uid}`, { method: 'DELETE' });
}
