import { useCallback, useEffect, useState } from 'react';
import type { CravingBackend } from '../storage/cravingBackend';
import type { CravingEvent } from '../types';

export function useCravingEvents(backend: CravingBackend) {
  const [events, setEvents] = useState<CravingEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    backend.getCravingEvents().then((e) => {
      if (cancelled) return;
      setEvents(e);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [backend]);

  const logEvent = useCallback(
    (event: Omit<CravingEvent, 'id'>) => {
      const newEvent: CravingEvent = { ...event, id: crypto.randomUUID() };
      setEvents((prev) => [...prev, newEvent]);
      void backend.addCravingEvent(newEvent);
      return newEvent;
    },
    [backend],
  );

  const removeEvent = useCallback(
    async (id: string) => {
      await backend.deleteCravingEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    },
    [backend],
  );

  const resetEvents = useCallback(async () => {
    await backend.clearCravingEvents();
    setEvents([]);
  }, [backend]);

  const importEvents = useCallback(
    async (imported: CravingEvent[]) => {
      await Promise.all(imported.map((e) => backend.addCravingEvent(e)));
      setEvents((prev) => [...prev, ...imported]);
    },
    [backend],
  );

  return { events, loading, logEvent, removeEvent, resetEvents, importEvents };
}
