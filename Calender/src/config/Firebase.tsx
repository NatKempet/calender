import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjzD2_qEig3Ikj71kgvK4QcmCD-Wgq2Ig",
  authDomain: "calender-1-a9cb9.firebaseapp.com",
  projectId: "calender-1-a9cb9",
  storageBucket: "calender-1-a9cb9.appspot.com",
  messagingSenderId: "1035987989530",
  appId: "1:1035987989530:web:48702704f465bc3043cda3",
  measurementId: "G-WTR3SXCDP6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);