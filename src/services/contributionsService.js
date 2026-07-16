// Logique d'accès à Firestore pour la collection "contributions" (cotisations)

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

function getContributionsRef() {
  if (!db) return null;
  return collection(db, "contributions");
}

export async function getContributions() {
  if (!db) return [];

  const contributionsRef = getContributionsRef();
  const q = query(contributionsRef, orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

export async function addContribution(contribution) {
  if (!db) return null;
  return addDoc(getContributionsRef(), contribution);
}

export async function deleteContribution(id) {
  if (!db) return null;
  const contributionDoc = doc(db, "contributions", id);
  return deleteDoc(contributionDoc);
}
