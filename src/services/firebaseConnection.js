import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA9Auo3DjlM0BJFiR899HiDlICQk3x8CvE",
  authDomain: "reactcomfirebase-ace3e.firebaseapp.com",
  projectId: "reactcomfirebase-ace3e",
  storageBucket: "reactcomfirebase-ace3e.appspot.com",
  messagingSenderId: "84164125670",
  appId: "1:84164125670:web:966d829082b287112dac27",
  measurementId: "G-X2T7QM0ES5"
};

const firebaseapp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseapp);
const db = getFirestore(firebaseapp);
const storage = getStorage(firebaseapp);

export { auth, db, storage };