// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaEJL8owYQpb5805A5NxMTrK6wd4YqnJA",
  authDomain: "coolfash-vnese01.firebaseapp.com",
  projectId: "coolfash-vnese01",
  storageBucket: "coolfash-vnese01.appspot.com",
  messagingSenderId: "362575106033",
  appId: "1:362575106033:web:a45be244fe60e59afa3e50",
  measurementId: "G-31XQ107HVR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
