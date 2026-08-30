import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkbNbatPiqhHrxiwW6yIJrNSjepZMhNxU",
  authDomain: "farmhive-34486.firebaseapp.com",
  projectId: "farmhive-34486",
  storageBucket: "farmhive-34486.firebasestorage.app",
  messagingSenderId: "144319246212",
  appId: "1:144319246212:web:f76b4b258189b41bf3b7d1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
