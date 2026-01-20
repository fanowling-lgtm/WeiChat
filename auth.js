import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc, getDoc, setDoc, updateDoc, arrayUnion
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function assignPermanentID(uid) {
  const metaRef = doc(db, "meta", "ids");
  const metaSnap = await getDoc(metaRef);

  let used = metaSnap.exists() ? metaSnap.data().used : [];
  for (let i = 1; i <= 1000; i++) {
    if (!used.includes(i)) {
      await updateDoc(metaRef, { used: arrayUnion(i) });
      await setDoc(doc(db, "users", uid), {
        id: i,
        createdAt: Date.now()
      });
      return i;
    }
  }
  throw "No IDs available";
}

onAuthStateChanged(auth, async user => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await assignPermanentID(user.uid);
  }
});
