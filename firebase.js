import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDpIn1LYUhngM1xJKfgRpGD_xn8VCBb8to",
  authDomain: "weichat-1aa0b.firebaseapp.com",
  projectId: "1:988747844169:web:800f434c01dcb47d5c4d98"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
