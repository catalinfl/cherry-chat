// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "chat-app-9d858.firebaseapp.com",
  projectId: "chat-app-9d858",
  storageBucket: "chat-app-9d858.appspot.com",
  messagingSenderId: "438819764526",
  appId: "1:438819764526:web:cbbb63ee4bfb8c1dc462bf"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
