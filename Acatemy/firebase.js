// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_GwHv3azJQNV2vxbpcX1KPAk6mcRO5D0",
  authDomain: "acatemy-fbedf.firebaseapp.com",
  projectId: "acatemy-fbedf",
  storageBucket: "acatemy-fbedf.firebasestorage.app",
  messagingSenderId: "647923295479",
  appId: "1:647923295479:web:8d0b1463a8154be9309ff2",
  measurementId: "G-2NJQTXJCTF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Storage (if needed)

export { auth, db, storage };