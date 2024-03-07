// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9LdvptViWffpe8aZM5EuAp94NDrKlUqY",
  authDomain: "todo-app-f43bd.firebaseapp.com",
  projectId: "todo-app-f43bd",
  storageBucket: "todo-app-f43bd.appspot.com",
  messagingSenderId: "71779485619",
  appId: "1:71779485619:web:79fe24b3e90f537d89edc6",
  measurementId: "G-LRXMJ7JM7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {db, auth}