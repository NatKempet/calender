import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWIAfZn-YjKZnlsEGqWanBgJxm2a9uIwM",
  authDomain: "calender-558fa.firebaseapp.com",
  projectId: "calender-558fa",
  storageBucket: "calender-558fa.appspot.com",
  messagingSenderId: "1043249697194",
  appId: "1:1043249697194:web:e19f7eae185b0a2d001bd3",
  measurementId: "G-BVZFJQKME2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);