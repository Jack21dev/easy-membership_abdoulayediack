import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(nomComplet, email, password) {
    if (!auth) {
      throw new Error("Firebase n'est pas initialisé.");
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (nomComplet) {
      await updateProfile(userCredential.user, { displayName: nomComplet });
    }

    if (db && userCredential?.user?.uid) {
      await setDoc(doc(db, "associations", userCredential.user.uid), {
        nom: nomComplet || "Mon Association",
        email: userCredential.user.email,
        createdAt: new Date().toISOString(),
      }, { merge: true });
    }

    return userCredential;
  }

  function login(email, password) {
    if (!auth) {
      return Promise.reject(new Error("Firebase n'est pas initialisé."));
    }

    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    if (!auth) {
      return Promise.resolve();
    }

    return signOut(auth);
  }

  useEffect(() => {
    if (!auth) {
      setCurrentUser(null);
      setLoading(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}