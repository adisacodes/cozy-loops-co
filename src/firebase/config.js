import {initializeApp} from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIIFExvrQhmOOHLEzKg7Dpfocf6qgl2Jc",
  authDomain: "cozy-loops-co.firebaseapp.com",
  projectId: "cozy-loops-co",
  storageBucket: "cozy-loops-co.firebasestorage.app",
  messagingSenderId: "2705388469",
  appId: "1:2705388469:web:3cd368a0af89f2f2841ffc"
};
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;