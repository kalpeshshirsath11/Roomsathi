import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Ensure DOM is loaded before accessing elements
// document.addEventListener("DOMContentLoaded", function() {
    const form1 = document.getElementById('registration');
    
    let signInUser = evt => {
        evt.preventDefault();
        const emailInput = document.getElementById('email').value;
        const passwordInput = document.getElementById('password').value;

        signInWithEmailAndPassword(auth,emailInput,passwordInput)
        .then((Credentials) => {
            console.log(Credentials);
            // Handle successful sign-in
            window.location.href = "multidivs.html"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Handle errors
            console.error(errorCode, errorMessage);
        });
    }

    form1.addEventListener('submit', signInUser);
// });
