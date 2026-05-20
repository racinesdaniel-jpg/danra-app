import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCULhl2nyrrJWB9RwnwBkGO6jFPoZP66Y",
  authDomain: "danra-26ea2.firebaseapp.com",
  projectId: "danra-26ea2",
  storageBucket: "danra-26ea2.firebasestorage.app",
  messagingSenderId: "161182433808",
  appId: "1:161182433808:web:8614c0b3dec97d97f84095"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);