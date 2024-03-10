// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider } from "firebase/auth"; 
import { addDoc, collection, getDocs, getFirestore, query, setDoc, doc, where } from "firebase/firestore";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

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
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

async function signInWithGoogle() {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid))
    const docs = await getDocs(q);
    if(docs.docs.length === 0){
      setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username: user.displayName,
        authProvider: "google",
        email: user.email
      });
    }
  } catch (err) {
    console.log(err);
    alert(err.message);
  }

}

async function registerWithEmailAndPassword(username, email, password) {
  if(username == "" || email == "" || password == ""){
    alert("Please fill all fields");
    return;
  }
  try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      setDoc(doc(db, 'users', newUser.user.uid), {
          uid: newUser.user.uid,
          username,
          authProvider: "local",
          email
      });
      
  } catch (err){
    console.log(err);
      alert(err.message)
  }
}

async function loginWithEmailAndPassword(email, password) {
  try {
      await signInWithEmailAndPassword(auth, email, password)
      alert(useAuthState(auth.currentUser))
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
}

async function sendPasswordReset(email) {
  try {
      await sendPasswordReset(auth, email);
  } catch (err) {
      console.log(err);
      alert(err.message);
  }
}

function logout() {
  signOut(auth);
}

async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + ".png");
  
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);

  const photoURL = await getDownloadURL(fileRef)

  updateProfile(currentUser, {photoURL})
  setLoading(false);

  alert("Upload success!");
}

export {db, auth, storage, loginWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset, signInWithGoogle, logout, upload}