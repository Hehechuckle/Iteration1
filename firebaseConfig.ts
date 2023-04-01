import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAO0CXcd2ec3M1fGIGQ-qGQk7hddAQwfMg",
    authDomain: "iteration1-59614.firebaseapp.com",
    projectId: "iteration1-59614",
    storageBucket: "iteration1-59614.appspot.com",
    messagingSenderId: "414722973669",
    appId: "1:414722973669:web:2765d8c4c5e28102b5d90c",
    measurementId: "G-2L7X00QVWD"
};

// const app = initializeApp(firebaseConfig);
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);