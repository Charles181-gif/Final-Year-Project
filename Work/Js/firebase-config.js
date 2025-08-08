import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDE5fisKHXVSRAMQUWAvR3s957H-PNsTVM",
  authDomain: "final-year-project-gctu.firebaseapp.com",
  projectId: "final-year-project-gctu",
  storageBucket: "final-year-project-gctu.firebasestorage.app",
  messagingSenderId: "1092508633220",
  appId: "1:1092508633220:web:5dd2def392b4144c489ad1",
  measurementId: "G-EGDQ6ZVGEK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { 
  auth, db, 
  createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,
  collection, addDoc, getDocs, query, where, doc, setDoc, getDoc, updateDoc
};