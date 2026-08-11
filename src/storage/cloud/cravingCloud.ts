import { apiFetch } from '../../lib/api';
import type { CravingEvent } from '../../types';

export async function getCravingEvents(): Promise<CravingEvent[]> {
  const res = await apiFetch('/api/cravings');
  const data = await res.json();
  return data.events;
}

export async function addCravingEvent(event: CravingEvent): Promise<void> {
  await apiFetch('/api/cravings', { method: 'POST', body: JSON.stringify(event) });
}

export async function deleteCravingEvent(id: string): Promise<void> {
  await apiFetch(`/api/cravings/${id}`, { method: 'DELETE' });
}

export async function clearCravingEvents(): Promise<void> {
  await apiFetch('/api/cravings', { method: 'DELETE' });
}
