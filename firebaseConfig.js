// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA602IyJMeWzESALmy993MG2Jli8ungh4",
  authDomain: "time-tracker-app-b973e.firebaseapp.com",
  projectId: "time-tracker-app-b973e",
  storageBucket: "time-tracker-app-b973e.appspot.com",
  messagingSenderId: "809035655216",
  appId: "1:809035655216:web:08a350de3896578f7da5f5",
  measurementId: "G-NFD18P0EWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const analytics = getAnalytics(app);