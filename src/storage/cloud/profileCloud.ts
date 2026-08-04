import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { requireDb } from '../../lib/firebase';
import type { UserProfile } from '../../types';

function profileDocRef(uid: string) {
  return doc(requireDb(), 'users', uid);
}

export async function getProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(profileDocRef(uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function saveProfile(uid: string, profile: UserProfile): Promise<void> {
  await setDoc(profileDocRef(uid), profile);
}

export async function clearProfile(uid: string): Promise<void> {
  await deleteDoc(profileDocRef(uid));
}
