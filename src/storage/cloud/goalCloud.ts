import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { requireDb } from '../../lib/firebase';
import type { GoalItem } from '../../types';

function goalsCollectionRef(uid: string) {
  return collection(requireDb(), 'users', uid, 'goals');
}

export async function getGoals(uid: string): Promise<GoalItem[]> {
  const snap = await getDocs(goalsCollectionRef(uid));
  return snap.docs.map((d) => d.data() as GoalItem);
}

export async function addGoal(
  uid: string,
  goal: Omit<GoalItem, 'id' | 'status' | 'createdAt'>,
): Promise<GoalItem> {
  const newGoal: GoalItem = {
    ...goal,
    id: crypto.randomUUID(),
    status: 'active',
    createdAt: new Date().toISOString(),
  };
  await setDoc(doc(goalsCollectionRef(uid), newGoal.id), newGoal);
  return newGoal;
}

export async function setGoal(uid: string, goal: GoalItem): Promise<void> {
  await setDoc(doc(goalsCollectionRef(uid), goal.id), goal);
}

export async function updateGoal(uid: string, id: string, updates: Partial<GoalItem>): Promise<void> {
  await setDoc(doc(goalsCollectionRef(uid), id), updates, { merge: true });
}

export async function markGoalAchieved(uid: string, id: string): Promise<void> {
  await updateGoal(uid, id, { status: 'achieved', achievedAt: new Date().toISOString() });
}

export async function deleteGoal(uid: string, id: string): Promise<void> {
  await deleteDoc(doc(goalsCollectionRef(uid), id));
}

export async function clearGoals(uid: string): Promise<void> {
  const snap = await getDocs(goalsCollectionRef(uid));
  await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
}
