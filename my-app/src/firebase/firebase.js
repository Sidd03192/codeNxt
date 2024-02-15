// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSn84DdWvh20jTHAkarxRvMPcNL9D9BrY",
  authDomain: "codenext-9a380.firebaseapp.com",
  projectId: "codenext-9a380",
  storageBucket: "codenext-9a380.appspot.com",
  messagingSenderId: "156306711649",
  appId: "1:156306711649:web:38f58fbcfc8dd4ed177620",
  measurementId: "G-VFQNLXHSMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // main app for user and problem functions. 

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


const analytics = getAnalytics(app);