 import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";
 
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "login-outfitcrate.firebaseapp.com",
  projectId: "login-outfitcrate",
  storageBucket: "login-outfitcrate.firebasestorage.app",
  messagingSenderId: "526838696895",
  appId: "1:526838696895:web:0ba7e3b7c09e074157af0a"
};

 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}

