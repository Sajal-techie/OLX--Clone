import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBD4cqY5y4TTlsqia0T-yMgoCXlsAHCz3g",
  authDomain: "olx-2b4da.firebaseapp.com",
  projectId: "olx-2b4da",
  storageBucket: "olx-2b4da.appspot.com",
  messagingSenderId: "263980915527",
  appId: "1:263980915527:web:0cb5eb59f0539478248a62",
  measurementId: "G-WYMT5C66D9"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);