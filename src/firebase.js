// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
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

async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + ".png");
  
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);

  const photoURL = await getDownloadURL(fileRef)

  updateProfile(currentUser, {photoURL})
  setLoading(false);

  alert("Upload success!");
}

export {db, auth, storage, upload}