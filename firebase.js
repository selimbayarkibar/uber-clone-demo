import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY, // Your api key
  authDomain: "uber-next-clone-1c97e.firebaseapp.com",
  projectId: "uber-next-clone-1c97e",
  storageBucket: "uber-next-clone-1c97e.firebasestorage.app",
  messagingSenderId: "47327448371",
  appId: "1:47327448371:web:cc4ab22f32528c52d78246",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth };
