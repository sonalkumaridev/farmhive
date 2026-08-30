import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvq6HTYpeJ8fOGjZXaEVUZowbhK7_i8gw",
  authDomain: "farmhive-b263e.firebaseapp.com",
  projectId: "farmhive-b263e",
  storageBucket: "farmhive-b263e.firebasestorage.app",
  messagingSenderId: "164587841405",
  appId: "1:164587841405:web:c897b69d6a0cfa7cb70e14"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.getElementById("googleBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    alert("Login Successful: " + user.email);
  } catch (error) {
    alert("Login Failed: " + error.message);
  }
});

