// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnllK0r4gstT2DkyRug_U3rMwBiCJjApI",
  authDomain: "task-crud-e781e.firebaseapp.com",
  databaseURL: "https://task-crud-e781e-default-rtdb.firebaseio.com",
  projectId: "task-crud-e781e",
  storageBucket: "task-crud-e781e.appspot.com",
  messagingSenderId: "778485557264",
  appId: "1:778485557264:web:c8ab79ce01a537c95c4295"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;