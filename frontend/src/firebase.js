// frontend/src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1ViVJ_cjqdZf-MLMlFw4xXloIV1klUYo",
  authDomain: "campus-lend.firebaseapp.com",
  projectId: "campus-lend",
  storageBucket: "campus-lend.firebasestorage.app",
  messagingSenderId: "709333039193",
  appId: "1:709333039193:web:a247c761545918d3905948",
  measurementId: "G-F5Y7SYV332"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };