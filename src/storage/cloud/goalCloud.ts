import { apiFetch } from '../../lib/api';
import type { GoalItem } from '../../types';

export async function getGoals(): Promise<GoalItem[]> {
  const res = await apiFetch('/api/goals');
  const data = await res.json();
  return data.goals;
}

export async function addGoal(goal: Omit<GoalItem, 'id' | 'status' | 'createdAt'>): Promise<GoalItem> {
  const res = await apiFetch('/api/goals', { method: 'POST', body: JSON.stringify(goal) });
  const data = await res.json();
  return data.goal;
}

export async function setGoal(goal: GoalItem): Promise<void> {
  await apiFetch(`/api/goals/${goal.id}`, { method: 'PUT', body: JSON.stringify(goal) });
}

export async function updateGoal(id: string, updates: Partial<GoalItem>): Promise<void> {
  await apiFetch(`/api/goals/${id}`, { method: 'PATCH', body: JSON.stringify(updates) });
}

export async function markGoalAchieved(id: string): Promise<void> {
  await apiFetch(`/api/goals/${id}/achieve`, { method: 'POST' });
}

export async function deleteGoal(id: string): Promise<void> {
  await apiFetch(`/api/goals/${id}`, { method: 'DELETE' });
}

export async function clearGoals(): Promise<void> {
  await apiFetch('/api/goals', { method: 'DELETE' });
}
