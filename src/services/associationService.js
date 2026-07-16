// Stocke les infos de l'association (nom) dans un document Firestore
// "associations/{uid}" lié à l'utilisateur connecté.

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function getAssociation(uid) {
  if (!db) return null;
  const ref = doc(db, "associations", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function saveAssociation(uid, data) {
  if (!db) return null;
  const ref = doc(db, "associations", uid);
  return setDoc(ref, data, { merge: true });
}
