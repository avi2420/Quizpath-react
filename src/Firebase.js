 import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAxVuoxVU62Mj_xySqhrb93iJxR2JwZvPc",
    authDomain: "quizpath-27d0f.firebaseapp.com",
    projectId: "quizpath-27d0f",
    storageBucket: "quizpath-27d0f.appspot.com",
    messagingSenderId: "543106543719",
    appId: "1:543106543719:web:92805205c3615cf8e3a4c2",
    measurementId: "G-4ELN26X3VN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth , storage};
