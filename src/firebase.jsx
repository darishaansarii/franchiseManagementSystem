import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoqM4ilHERoL9yeuaE2KItsvKCvKffM7s",
  authDomain: "practiceofauthwithreact.firebaseapp.com",
  projectId: "practiceofauthwithreact",
  storageBucket: "practiceofauthwithreact.firebasestorage.app",
  messagingSenderId: "403382712844",
  appId: "1:403382712844:web:55ace882c3ea35bc5dcc29"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);