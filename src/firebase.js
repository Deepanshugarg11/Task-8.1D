// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6kpn6oo_AqX54mzn2IF6UfxHm6ATT4P4",
    authDomain: "my-react-firebase-app-fa282.firebaseapp.com",
    projectId: "my-react-firebase-app-fa282",
    storageBucket: "my-react-firebase-app-fa282.appspot.com",
    messagingSenderId: "260743334055",
    appId: "1:260743334055:web:e45814c5177cec4f2bb382",
    measurementId: "G-24EJK561YS"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firestore and Storage services
export const db = getFirestore(app);
export const storage = getStorage(app);

