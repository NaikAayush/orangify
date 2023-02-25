import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfRun0lTPhv2TdoluCjlS4tuM_FL5Q-SQ",
  authDomain: "orangify-4ece4.firebaseapp.com",
  projectId: "orangify-4ece4",
  storageBucket: "orangify-4ece4.appspot.com",
  messagingSenderId: "839285414269",
  appId: "1:839285414269:web:3981e572f5298a70879414",
  measurementId: "G-KP60CKT50Q",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
