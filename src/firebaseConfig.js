// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBWO9YZHJdLptYuAVJqrVzkj55hw7TM-Vs",
  authDomain: "travelmon-devmon.firebaseapp.com",
  projectId: "travelmon-devmon",
  storageBucket: "travelmon-devmon.appspot.com",
  messagingSenderId: "954397794768",
  appId: "1:954397794768:web:64cfb91de24cc3081119d5",
  measurementId: "G-F161G5GE0Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };