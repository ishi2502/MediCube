
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, collection, doc, addDoc, getDocs, query, where, updateDoc, onSnapshot, orderBy, arrayUnion,arrayRemove } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider, signInWithPopup, FacebookAuthProvider
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWbxqGizFON_5h8cJlReKiAKO3vjSjCWE",
  authDomain: "medicube-6b691.firebaseapp.com",
  projectId: "medicube-6b691",
  storageBucket: "medicube-6b691.appspot.com",
  messagingSenderId: "739784646269",
  appId: "1:739784646269:web:6abd23f8bf9bb0f16d5b14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
export const auth = getAuth();
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithPopup,

  signOut,
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  onSnapshot,
  orderBy,
  arrayUnion,
  arrayRemove,

  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
  app
};

