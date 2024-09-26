// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfJOn-qgYMmUYdVXm3fHzy15sh9YUdW28",

  authDomain: "blip-trading-d2b38.firebaseapp.com",

  projectId: "blip-trading-d2b38",

  storageBucket: "blip-trading-d2b38.appspot.com",

  messagingSenderId: "491108303646",

  appId: "1:491108303646:web:ff2c5c76a0173c26863f0f",

  measurementId: "G-6J5PB3JCML",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
