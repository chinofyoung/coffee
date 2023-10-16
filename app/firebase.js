// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjhtW6XIpKPxYf5YSsPXPzYbx5cfAVHwA",
  authDomain: "coffee-1749d.firebaseapp.com",
  projectId: "coffee-1749d",
  storageBucket: "coffee-1749d.appspot.com",
  messagingSenderId: "695808871300",
  appId: "1:695808871300:web:bcc7b536fe1d3100bbebd1",
  measurementId: "G-42H0XJTNK3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
