import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjhtW6XIpKPxYf5YSsPXPzYbx5cfAVHwA",
  authDomain: "coffee-1749d.firebaseapp.com",
  projectId: "coffee-1749d",
  storageBucket: "coffee-1749d.appspot.com",
  messagingSenderId: "695808871300",
  appId: "1:695808871300:web:bcc7b536fe1d3100bbebd1",
  measurementId: "G-42H0XJTNK3",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
