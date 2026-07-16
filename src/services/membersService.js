// Toute la logique d'accès à Firestore pour la collection "members"
// est centralisée ici, séparée des composants (bonne pratique).

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

function getMembersRef() {
  if (!db) return null;
  return collection(db, "members");
}

export async function getMembers() {
  if (!db) return [];

  const membersRef = getMembersRef();
  const q = query(membersRef, orderBy("nomComplet", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

export async function addMember(member) {
  if (!db) return null;
  return addDoc(getMembersRef(), member);
}

export async function updateMember(id, member) {
  if (!db) return null;
  const memberDoc = doc(db, "members", id);
  return updateDoc(memberDoc, member);
}

export async function deleteMember(id) {
  if (!db) return null;
  const memberDoc = doc(db, "members", id);
  return deleteDoc(memberDoc);
}
