import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBQsaxjXAvFDr_Qwqti5jpfXPP9qY-L0gA",
  authDomain: "givcare-17001.firebaseapp.com",
  databaseURL: "https://givcare-17001-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "givcare-17001",
  storageBucket: "givcare-17001.firebasestorage.app",
  messagingSenderId: "996444869436",
  appId: "1:996444869436:web:c6dba954e848ff924b8439"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);