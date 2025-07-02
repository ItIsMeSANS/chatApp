// Your Firebase Config (replace this with your actual config from Firebase)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "YOUR_APP_ID"
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
