import type { UserProfile } from '../types';
import { daysSinceQuit, toLocalDateKey, type DailySavingsPoint } from './statsCalc';

export function pricePerCigarette(profile: Pick<UserProfile, 'pricePerPack' | 'cigarettesPerPack'>): number {
  const perPack = profile.cigarettesPerPack > 0 ? profile.cigarettesPerPack : 20;
  const price = profile.pricePerPack > 0 ? profile.pricePerPack : 0;
  return price / perPack;
}

type MoneyProfile = Pick<UserProfile, 'quitDateTime' | 'cigarettesPerDay' | 'pricePerPack' | 'cigarettesPerPack'>;

export function dailySavingsRate(profile: Pick<UserProfile, 'cigarettesPerDay' | 'pricePerPack' | 'cigarettesPerPack'>): number {
  return profile.cigarettesPerDay * pricePerCigarette(profile);
}

// 충동을 참은 횟수가 아니라, 금연 시작일로부터 지난 일수에 평소 흡연량을 곱해 절약 금액을 계산한다.
export function moneySavedSinceQuit(profile: MoneyProfile): number {
  return daysSinceQuit(profile.quitDateTime) * dailySavingsRate(profile);
}

export function dailySavingsSeriesSinceQuit(profile: MoneyProfile): DailySavingsPoint[] {
  const days = daysSinceQuit(profile.quitDateTime);
  const rate = dailySavingsRate(profile);
  const quitStart = new Date(profile.quitDateTime);

  const points: DailySavingsPoint[] = [];
  for (let i = 0; i <= days; i++) {
    const d = new Date(quitStart);
    d.setDate(d.getDate() + i);
    points.push({ date: toLocalDateKey(d.toISOString()), amount: rate });
  }
  return points;
}
