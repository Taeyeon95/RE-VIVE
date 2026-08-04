import type { CravingEvent } from '../types';

const KEY = 'quit-app:cravings';

export function getCravingEvents(): CravingEvent[] {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CravingEvent[]) : [];
  } catch {
    return [];
  }
}

function saveCravingEvents(events: CravingEvent[]): void {
  localStorage.setItem(KEY, JSON.stringify(events));
}

export function addCravingEvent(event: CravingEvent): void {
  saveCravingEvents([...getCravingEvents(), event]);
}

export function deleteCravingEvent(id: string): void {
  saveCravingEvents(getCravingEvents().filter((e) => e.id !== id));
}

export function clearCravingEvents(): void {
  localStorage.removeItem(KEY);
}
