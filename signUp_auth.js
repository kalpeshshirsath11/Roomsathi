// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
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


// Get the form element
const form = document.getElementById('registerForm');

let RegisterUser = evt => {
    evt.preventDefault();
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('PassWord').value;
    createUserWithEmailAndPassword(auth, emailInput, passwordInput)
        .then((Credentials) => {
            set(ref(db, 'UsersAuthList/' + credentials.user.uid), {
                username: usernameInp.value
            })
            // Signed in
            alert("User registered successfully!");
            const user = Credentials.user;
            alert(user);
            
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Handle errors
            console.error(errorCode, errorMessage);
            alert(errorCode, errorMessage)
        });
}

// Add submit event listener to the form
form.addEventListener('submit', RegisterUser);