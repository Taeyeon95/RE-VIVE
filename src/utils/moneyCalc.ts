import type { UserProfile } from '../types';

export function pricePerCigarette(profile: Pick<UserProfile, 'pricePerPack' | 'cigarettesPerPack'>): number {
  const perPack = profile.cigarettesPerPack > 0 ? profile.cigarettesPerPack : 20;
  const price = profile.pricePerPack > 0 ? profile.pricePerPack : 0;
  return price / perPack;
}
