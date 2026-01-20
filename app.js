import { db } from "./firebase.js";
import {
  collection, addDoc, onSnapshot, query, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const messagesRef = collection(db, "messages");

document.getElementById("send").onclick = async () => {
  const text = input.value.trim();
  if (!text) return;

  await addDoc(messagesRef, {
    text,
    timestamp: serverTimestamp(),
    userId: window.USER_ID
  });

  input.value = "";
};

onSnapshot(
  query(messagesRef, orderBy("timestamp")),
  snap => {
    messages.innerHTML = "";
    snap.forEach(doc => {
      const m = doc.data();
      messages.innerHTML += `
        <div class="msg">
          <span class="uid">#${m.userId}</span>
          ${m.text}
        </div>
      `;
    });
  }
);
