// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdGqoOe8sfVOTtMMXlOybGl5m-wdjcKi0",
  authDomain: "upv-sora.firebaseapp.com",
  projectId: "upv-sora",
  storageBucket: "upv-sora.firebasestorage.app",
  messagingSenderId: "163919735342",
  appId: "1:163919735342:web:3f91080d26ab5c20614dbf",
  measurementId: "G-ZVT4MCD4P0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);