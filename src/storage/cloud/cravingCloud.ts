import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { requireDb } from '../../lib/firebase';
import type { CravingEvent } from '../../types';

function cravingsCollectionRef(uid: string) {
  return collection(requireDb(), 'users', uid, 'cravings');
}

export async function getCravingEvents(uid: string): Promise<CravingEvent[]> {
  const snap = await getDocs(cravingsCollectionRef(uid));
  return snap.docs.map((d) => d.data() as CravingEvent);
}

export async function addCravingEvent(uid: string, event: CravingEvent): Promise<void> {
  await setDoc(doc(cravingsCollectionRef(uid), event.id), event);
}

export async function deleteCravingEvent(uid: string, id: string): Promise<void> {
  await deleteDoc(doc(cravingsCollectionRef(uid), id));
}

export async function clearCravingEvents(uid: string): Promise<void> {
  const snap = await getDocs(cravingsCollectionRef(uid));
  await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
}
