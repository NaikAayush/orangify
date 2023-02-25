import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfRun0lTPhv2TdoluCjlS4tuM_FL5Q-SQ",
  authDomain: "orangify-4ece4.firebaseapp.com",
  projectId: "orangify-4ece4",
  storageBucket: "orangify-4ece4.appspot.com",
  messagingSenderId: "839285414269",
  appId: "1:839285414269:web:3981e572f5298a70879414",
  measurementId: "G-KP60CKT50Q",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
