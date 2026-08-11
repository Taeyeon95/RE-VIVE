import type { CravingEvent } from '../types';

export function totalCompletedCount(events: CravingEvent[]): number {
  return events.filter((e) => e.completed).length;
}

export function totalSaved(events: CravingEvent[]): number {
  return events.filter((e) => e.completed).reduce((sum, e) => sum + e.moneySaved, 0);
}

export function daysSinceQuit(quitDateTime: string): number {
  const elapsedMs = Date.now() - new Date(quitDateTime).getTime();
  return Math.max(0, Math.floor(elapsedMs / (1000 * 60 * 60 * 24)));
}

export function toLocalDateKey(isoString: string): string {
  const d = new Date(isoString);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export interface DailySavingsPoint {
  date: string;
  amount: number;
}

export function todayCount(events: CravingEvent[]): number {
  const todayKey = toLocalDateKey(new Date().toISOString());
  return events.filter((e) => e.completed && toLocalDateKey(e.timestamp) === todayKey).length;
}
