import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "stratus-1657e.firebaseapp.com",
  projectId: "stratus-1657e",
  storageBucket: "stratus-1657e.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MSG_SENDER,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };