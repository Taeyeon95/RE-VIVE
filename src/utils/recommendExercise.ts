import { EXERCISES } from '../data/exercises';
import type { Exercise } from '../types';

export function recommendExercises(age: number, bodyConditions: string[]): Exercise[] {
  const filtered = EXERCISES.filter(
    (ex) => !ex.unsuitableFor.some((condition) => bodyConditions.includes(condition)),
  );

  if (age >= 60) {
    const seated = filtered.filter((ex) => ex.tags.includes('seated'));
    if (seated.length > 0) return seated;
  }

  return filtered.length > 0 ? filtered : EXERCISES.filter((ex) => ex.tags.includes('breathing'));
}
