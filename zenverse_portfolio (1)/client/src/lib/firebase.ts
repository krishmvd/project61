import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9--9gvj1Vby-JiGXtd0PDxhihO44W5ak",
  authDomain: "portfolio61.firebaseapp.com",
  projectId: "portfolio61",
  storageBucket: "portfolio61.firebasestorage.app",
  messagingSenderId: "944195827757",
  appId: "1:944195827757:web:d6b5ca5c93e641c30ae0a4",
  measurementId: "G-W9K0WVZ8ZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.log('The current browser does not support all of the features required to enable persistence');
  }
});

// Initialize Storage
export const storage = getStorage(app);

export default app;
