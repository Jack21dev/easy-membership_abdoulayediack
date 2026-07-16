// Logique d'accès à Firestore pour la collection "events"

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

function getEventsRef() {
  if (!db) return null;
  return collection(db, "events");
}

export async function getEvents() {
  if (!db) return [];

  const eventsRef = getEventsRef();
  const q = query(eventsRef, orderBy("date", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

export async function addEvent(event) {
  if (!db) return null;
  return addDoc(getEventsRef(), event);
}

export async function updateEvent(id, event) {
  if (!db) return null;
  const eventDoc = doc(db, "events", id);
  return updateDoc(eventDoc, event);
}

export async function deleteEvent(id) {
  if (!db) return null;
  const eventDoc = doc(db, "events", id);
  return deleteDoc(eventDoc);
}
