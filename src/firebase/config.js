import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBwoiJNHEQNjfzZmT7CVlKjfbfUvir1lPg",
  authDomain: "chat-app-9efa3.firebaseapp.com",
  projectId: "chat-app-9efa3",
  storageBucket: "chat-app-9efa3.appspot.com",
  messagingSenderId: "637952738558",
  appId: "1:637952738558:web:967b0805de764186fa51af",
  measurementId: "G-8PJ9GQMCP9",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
auth.useEmulator("http://localhost:9099");
if (window.location.hostname === "localhost") {
  db.useEmulator("localhost", "8080");
}
export { db, auth };
export default firebase;
