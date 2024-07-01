import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlhvRMNRGmp8JkO2OJyWIWzevEEpFaUDU",
    authDomain: "super-useful-demo.firebaseapp.com",
    databaseURL: "https://super-useful-demo-default-rtdb.firebaseio.com",
    projectId: "super-useful-demo",
    storageBucket: "super-useful-demo.appspot.com",
    messagingSenderId: "665268642446",
    appId: "1:665268642446:web:0c95c31f137c0d5730dfdf",
    measurementId: "G-RM9JTGY57L"
  };

// Initialize Firebase with the provided configuration
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const firebase_auth = getAuth(app);
