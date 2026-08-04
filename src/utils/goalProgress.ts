import type { GoalItem } from '../types';

export function progressPercent(goal: GoalItem, totalSavedAmount: number): number {
  if (goal.targetPrice <= 0) return 0;
  return Math.min(100, (totalSavedAmount / goal.targetPrice) * 100);
}

export function isGoalAchieved(goal: GoalItem, totalSavedAmount: number): boolean {
  return progressPercent(goal, totalSavedAmount) >= 100;
}
