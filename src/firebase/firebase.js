import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    import.meta.env.FIREBASE_API_KEY ||
    "",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    import.meta.env.FIREBASE_AUTH_DOMAIN ||
    "",
  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID ||
    import.meta.env.FIREBASE_PROJECT_ID ||
    "",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    import.meta.env.FIREBASE_STORAGE_BUCKET ||
    "",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    import.meta.env.FIREBASE_MESSAGING_SENDER_ID ||
    "",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    import.meta.env.FIREBASE_APP_ID ||
    "",
};

const hasValidFirebaseConfig = Object.values(firebaseConfig).every(Boolean);

let app = null;
let auth = null;
let db = null;

if (hasValidFirebaseConfig) {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  console.error(
    "Firebase n'est pas correctement configuré. Ajoutez les variables VITE_FIREBASE_* (ou FIREBASE_*) dans Vercel avant le déploiement."
  );
}

export { auth, db };
export default app;