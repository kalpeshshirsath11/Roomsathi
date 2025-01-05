import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCBPcA-8vKG-q8m2r1H19j9BZF-Di56aqs",
    authDomain: "form2-48c48.firebaseapp.com",
    databaseURL: "https://form2-48c48-default-rtdb.firebaseio.com",
    projectId: "form2-48c48",
    storageBucket: "form2-48c48.appspot.com",
    messagingSenderId: "417327730558",
    appId: "1:417327730558:web:0018d990db6a80e9e56d2f",
    measurementId: "G-3NX52G29K5"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

let button = document.getElementById("signout");

let signOutUser = () => {
    signOut(auth)
        .then(() => {
            // Sign-out successful.
            sessionStorage.removeItem("user-creds");
            sessionStorage.removeItem("user-info");
            window.location.href = "index.html"; // Redirect to login page
        })
        .catch((error) => {
            // An error happened.
            console.error(error.message);
        });
}

button.addEventListener("click", signOutUser);
