import { useCallback, useEffect, useState } from 'react';
import type { GoalBackend } from '../storage/goalBackend';
import type { GoalItem } from '../types';

export function useGoal(backend: GoalBackend) {
  const [goals, setGoals] = useState<GoalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const activeGoals = goals.filter((g) => g.status === 'active');
  const achievedGoals = goals.filter((g) => g.status === 'achieved');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    backend.getGoals().then((g) => {
      if (cancelled) return;
      setGoals(g);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [backend]);

  const createGoal = useCallback(
    async (goal: Omit<GoalItem, 'id' | 'status' | 'createdAt'>) => {
      const created = await backend.addGoal(goal);
      setGoals((prev) => [...prev, created]);
      return created;
    },
    [backend],
  );

  const editGoal = useCallback(
    async (id: string, updates: Partial<GoalItem>) => {
      await backend.updateGoal(id, updates);
      setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));
    },
    [backend],
  );

  const removeGoal = useCallback(
    async (id: string) => {
      await backend.deleteGoal(id);
      setGoals((prev) => prev.filter((g) => g.id !== id));
    },
    [backend],
  );

  const achieveGoal = useCallback(
    async (id: string) => {
      await backend.markGoalAchieved(id);
      setGoals((prev) =>
        prev.map((g) => (g.id === id ? { ...g, status: 'achieved', achievedAt: new Date().toISOString() } : g)),
      );
    },
    [backend],
  );

  const resetGoals = useCallback(async () => {
    await backend.clearGoals();
    setGoals([]);
  }, [backend]);

  const importGoals = useCallback(
    async (imported: GoalItem[]) => {
      await Promise.all(imported.map((g) => backend.setGoal(g)));
      setGoals((prev) => [...prev, ...imported]);
    },
    [backend],
  );

  return {
    goals,
    loading,
    activeGoals,
    achievedGoals,
    createGoal,
    editGoal,
    removeGoal,
    achieveGoal,
    resetGoals,
    importGoals,
  };
}
