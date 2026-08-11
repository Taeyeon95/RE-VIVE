import * as local from './goalStorage';
import * as cloud from './cloud/goalCloud';
import type { GoalItem } from '../types';

export interface GoalBackend {
  getGoals(): Promise<GoalItem[]>;
  addGoal(goal: Omit<GoalItem, 'id' | 'status' | 'createdAt'>): Promise<GoalItem>;
  setGoal(goal: GoalItem): Promise<void>;
  updateGoal(id: string, updates: Partial<GoalItem>): Promise<void>;
  markGoalAchieved(id: string): Promise<void>;
  deleteGoal(id: string): Promise<void>;
  clearGoals(): Promise<void>;
}

export function createLocalGoalBackend(): GoalBackend {
  return {
    getGoals: () => Promise.resolve(local.getGoals()),
    addGoal: (goal) => Promise.resolve(local.addGoal(goal)),
    setGoal: (goal) => {
      local.setGoal(goal);
      return Promise.resolve();
    },
    updateGoal: (id, updates) => {
      local.updateGoal(id, updates);
      return Promise.resolve();
    },
    markGoalAchieved: (id) => {
      local.markGoalAchieved(id);
      return Promise.resolve();
    },
    deleteGoal: (id) => {
      local.deleteGoal(id);
      return Promise.resolve();
    },
    clearGoals: () => {
      local.clearGoals();
      return Promise.resolve();
    },
  };
}

export function createCloudGoalBackend(): GoalBackend {
  return {
    getGoals: () => cloud.getGoals(),
    addGoal: (goal) => cloud.addGoal(goal),
    setGoal: (goal) => cloud.setGoal(goal),
    updateGoal: (id, updates) => cloud.updateGoal(id, updates),
    markGoalAchieved: (id) => cloud.markGoalAchieved(id),
    deleteGoal: (id) => cloud.deleteGoal(id),
    clearGoals: () => cloud.clearGoals(),
  };
}
