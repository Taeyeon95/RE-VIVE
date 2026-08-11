import * as local from './profileStorage';
import * as cloud from './cloud/profileCloud';
import type { UserProfile } from '../types';

export interface ProfileBackend {
  getProfile(): Promise<UserProfile | null>;
  saveProfile(profile: UserProfile): Promise<void>;
  clearProfile(): Promise<void>;
}

export function createLocalProfileBackend(): ProfileBackend {
  return {
    getProfile: () => Promise.resolve(local.getProfile()),
    saveProfile: (profile) => {
      local.saveProfile(profile);
      return Promise.resolve();
    },
    clearProfile: () => {
      local.clearProfile();
      return Promise.resolve();
    },
  };
}

export function createCloudProfileBackend(): ProfileBackend {
  return {
    getProfile: () => cloud.getProfile(),
    saveProfile: (profile) => cloud.saveProfile(profile),
    clearProfile: () => cloud.clearProfile(),
  };
}
