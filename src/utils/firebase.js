// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVnYovlau8C5-KFDUsu-eIPlrJFCOkrIo",
  authDomain: "blip-trading-34f05.firebaseapp.com",
  projectId: "blip-trading-34f05",
  storageBucket: "blip-trading-34f05.appspot.com",
  messagingSenderId: "717078368715",
  appId: "1:717078368715:web:2b1d54c7e20ca78223264e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
