// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7PUr8yDEc5kt5eaT359mfulqhnbYTTcI",
  authDomain: "crypto-tracker-fd440.firebaseapp.com",
  projectId: "crypto-tracker-fd440",
  storageBucket: "crypto-tracker-fd440.appspot.com",
  messagingSenderId: "540355574092",
  appId: "1:540355574092:web:a4062ce4bb3e6d4e4877e9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
 