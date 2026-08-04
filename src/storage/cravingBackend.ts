import * as local from './cravingStorage';
import * as cloud from './cloud/cravingCloud';
import type { CravingEvent } from '../types';

export interface CravingBackend {
  getCravingEvents(): Promise<CravingEvent[]>;
  addCravingEvent(event: CravingEvent): Promise<void>;
  deleteCravingEvent(id: string): Promise<void>;
  clearCravingEvents(): Promise<void>;
}

export function createLocalCravingBackend(): CravingBackend {
  return {
    getCravingEvents: () => Promise.resolve(local.getCravingEvents()),
    addCravingEvent: (event) => {
      local.addCravingEvent(event);
      return Promise.resolve();
    },
    deleteCravingEvent: (id) => {
      local.deleteCravingEvent(id);
      return Promise.resolve();
    },
    clearCravingEvents: () => {
      local.clearCravingEvents();
      return Promise.resolve();
    },
  };
}

export function createCloudCravingBackend(uid: string): CravingBackend {
  return {
    getCravingEvents: () => cloud.getCravingEvents(uid),
    addCravingEvent: (event) => cloud.addCravingEvent(uid, event),
    deleteCravingEvent: (id) => cloud.deleteCravingEvent(uid, id),
    clearCravingEvents: () => cloud.clearCravingEvents(uid),
  };
}
