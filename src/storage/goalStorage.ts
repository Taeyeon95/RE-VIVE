import type { GoalItem } from '../types';

const KEY = 'quit-app:goals';

export function getGoals(): GoalItem[] {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as GoalItem[]) : [];
  } catch {
    return [];
  }
}

function saveGoals(goals: GoalItem[]): void {
  localStorage.setItem(KEY, JSON.stringify(goals));
}

export function getActiveGoals(): GoalItem[] {
  return getGoals().filter((g) => g.status === 'active');
}

export function addGoal(goal: Omit<GoalItem, 'id' | 'status' | 'createdAt'>): GoalItem {
  const newGoal: GoalItem = {
    ...goal,
    id: crypto.randomUUID(),
    status: 'active',
    createdAt: new Date().toISOString(),
  };
  saveGoals([...getGoals(), newGoal]);
  return newGoal;
}

export function setGoal(goal: GoalItem): void {
  const goals = getGoals();
  const exists = goals.some((g) => g.id === goal.id);
  saveGoals(exists ? goals.map((g) => (g.id === goal.id ? goal : g)) : [...goals, goal]);
}

export function updateGoal(id: string, updates: Partial<GoalItem>): void {
  const goals = getGoals().map((g) => (g.id === id ? { ...g, ...updates } : g));
  saveGoals(goals);
}

export function markGoalAchieved(id: string): void {
  updateGoal(id, { status: 'achieved', achievedAt: new Date().toISOString() });
}

export function deleteGoal(id: string): void {
  saveGoals(getGoals().filter((g) => g.id !== id));
}

export function clearGoals(): void {
  localStorage.removeItem(KEY);
}
