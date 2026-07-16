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
import { withFirestoreTimeout } from "../utils/firestoreHelpers";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authEpoch, setAuthEpoch] = useState(0);

  async function signup(nomComplet, email, password) {
    if (!auth) {
      throw new Error("Firebase n'est pas initialisé.");
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    setAuthEpoch((prev) => prev + 1);

    if (nomComplet) {
      await updateProfile(userCredential.user, { displayName: nomComplet });
    }

    if (db && userCredential?.user?.uid) {
      await withFirestoreTimeout(
        setDoc(
          doc(db, "associations", userCredential.user.uid),
          {
            nom: nomComplet || "Mon Association",
            email: userCredential.user.email,
            createdAt: new Date().toISOString(),
          },
          { merge: true }
        ),
        null,
        1500
      );
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
      setAuthEpoch((prev) => prev + 1);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading,
    authEpoch,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}