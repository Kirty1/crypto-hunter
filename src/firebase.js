import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./config/firebaseConfig";

let app;

// Check if any Firebase apps are already initialized
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // use the already initialized app
}

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
