export type FontSize = 'normal' | 'large' | 'xlarge';

export interface AccessibilitySettings {
  fontSize: FontSize;
  simplifiedUI: boolean;
}

export interface UserProfile {
  quitDateTime: string;
  age: number;
  bodyConditions: string[];
  selectedExerciseId: string;
  quitReason: string;
  cigarettesPerDay: number;
  pricePerPack: number;
  cigarettesPerPack: number;
  accessibility: AccessibilitySettings;
}

export type GoalItemStatus = 'active' | 'achieved';

export interface GoalItem {
  id: string;
  name: string;
  targetPrice: number;
  photoDataUrl: string;
  status: GoalItemStatus;
  createdAt: string;
  achievedAt?: string;
}

export interface CravingEvent {
  id: string;
  timestamp: string;
  completed: boolean;
  moneySaved: number;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  steps: string[];
  durationSec: number;
  tags: string[];
  unsuitableFor: string[];
}
