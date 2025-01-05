// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBPcA-8vKG-q8m2r1H19j9BZF-Di56aqs",
  authDomain: "form2-48c48.firebaseapp.com",
  databaseURL: "https://form2-48c48-default-rtdb.firebaseio.com",
  projectId: "form2-48c48",
  storageBucket: "form2-48c48.appspot.com",
  messagingSenderId: "417327730558",
  appId: "1:417327730558:web:0018d990db6a80e9e56d2f",
  measurementId: "G-3NX52G29K5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app); // Initialize Realtime Database

// Get the form element
const form = document.getElementById("registerForm");

// Function to handle user registration
const RegisterUser = (evt) => {
  evt.preventDefault();

  // Get form input values
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("PassWord").value;
  const usernameInput = document.getElementById("username").value;

  // Create a new user with email and password
  createUserWithEmailAndPassword(auth, emailInput, passwordInput)
    .then((credentials) => {
      // Save additional user information to Realtime Database
      const userId = credentials.user.uid;
      set(ref(db, "UsersAuthList/" + userId), {
        username: usernameInput,
        email: emailInput,
      });

      // Notify user of successful registration
      alert("User registered successfully!");
      console.log("Registered user:", credentials.user);

      // Redirect to login or home page
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    })
    .catch((error) => {
      // Handle registration errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error registering user:", errorCode, errorMessage);
      alert("Error: " + errorMessage);
    });
};

// Add submit event listener to the form
form.addEventListener("submit", RegisterUser);
