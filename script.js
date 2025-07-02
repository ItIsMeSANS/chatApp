// Your Firebase Config (replace this with your actual config from Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyBvzBpRHSm9dV08RnUOn6cQuPFy_TuA9yc",
  authDomain: "chatting-app-25590.firebaseapp.com",
  projectId: "chatting-app-25590",
  storageBucket: "chatting-app-25590.firebasestorage.app",
  messagingSenderId: "970531729230",
  appId: "1:970531729230:web:d0928e1b456a338f26781f",
  measurementId: "G-C81FD3Z2PH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM Elements
const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const messagesDiv = document.getElementById("messages");

// Listen for new messages
db.collection("messages")
  .orderBy("timestamp")
  .onSnapshot(snapshot => {
    messagesDiv.innerHTML = ""; // clear messages
    snapshot.forEach(doc => {
      const msg = document.createElement("div");
      msg.textContent = doc.data().text;
      messagesDiv.appendChild(msg);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });

// Send message
form.addEventListener("submit", e => {
  e.preventDefault();
  const text = input.value;
  if (text.trim() !== "") {
    db.collection("messages").add({
      text: text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    input.value = "";
  }
});
