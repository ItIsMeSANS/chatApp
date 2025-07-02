// Your Firebase Config (replace with your config)
const firebaseConfig = {
  apiKey: "AIzaSyBvzBpRHSm9dV08RnUOn6cQuPFy_TuA9yc",
  authDomain: "chatting-app-25590.firebaseapp.com",
  projectId: "chatting-app-25590",
  storageBucket: "chatting-app-25590.firebasestorage.app",
  messagingSenderId: "970531729230",
  appId: "1:970531729230:web:d0928e1b456a338f26781f",
  measurementId: "G-C81FD3Z2PH"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

let currentUsername = "";

// Login Form
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("username").value.trim();
  if (!name) return;

  // Sign in anonymously
  await auth.signInAnonymously();
  currentUsername = name;

  document.getElementById("login-screen").style.display = "none";
  document.getElementById("chat-container").style.display = "flex";

  startChat();
});

function startChat() {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("message-input");
  const messagesDiv = document.getElementById("messages");

  // Send message
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
      await db.collection("messages").add({
        text,
        username: currentUsername,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      input.value = "";
    }
  });

  // Load messages
  db.collection("messages")
    .orderBy("timestamp")
    .onSnapshot(snapshot => {
      messagesDiv.innerHTML = "";
      snapshot.forEach(doc => {
        const data = doc.data();
        const msg = document.createElement("div");
        msg.innerHTML = `<strong>${data.username || "Anonymous"}:</strong> ${data.text}`;
        messagesDiv.appendChild(msg);
      });
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
}
