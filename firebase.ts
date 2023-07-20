// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDve9ZAhTTtiFZjgE8p6C49wmY0kusyp54",
  authDomain: "netflix-clone-d0945.firebaseapp.com",
  projectId: "netflix-clone-d0945",
  storageBucket: "netflix-clone-d0945.appspot.com",
  messagingSenderId: "640880227464",
  appId: "1:640880227464:web:c956e8dc3ff2d7339d9b3d",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
