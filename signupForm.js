import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

let files = [];
const reader = new FileReader();

const namebox = document.getElementById("namebox");
const proglab = document.getElementById("upprogress");
const myimg = document.getElementById("myimg");

const input = document.createElement("input");
input.type = "file";

input.onchange = (e) => {
  files = e.target.files;
  const file = files[0];
  const extension = file.name.split(".").pop();
  namebox.value = file.name.replace("." + extension, "");
  reader.readAsDataURL(file);
};

reader.onload = () => {
  myimg.src = reader.result;
};

document.getElementById("selbtn").onclick = () => input.click();

async function UploadProcess() {
  return new Promise((resolve, reject) => {
    const file = files[0];
    const fileName = namebox.value + "." + file.name.split(".").pop();
    const fileRef = sRef(storage, "Images/" + fileName);

    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state-changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        proglab.textContent = `Uploaded: ${progress.toFixed(2)}%`;
      },
      reject,
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const imgURL = await UploadProcess();

    const data = {
      contact_no: document.getElementById("phone").value,
      FullName: document.getElementById("name1").value,
      Age: document.getElementById("age").value,
      Gender: document.querySelector('input[name="gender"]:checked').value,
      Languages: Array.from(document.querySelectorAll('input[name="language"]:checked')).map(cb => cb.value),
      MyTown: document.getElementById("city").value,
      Address: document.getElementById("address").value,
      Budget: document.getElementById("budget").value,
      InstituteName: document.getElementById("college").value,
      Department: document.getElementById("branch").value,
      Diet: Array.from(document.querySelectorAll('input[name="diet"]:checked')).map(cb => cb.value),
      Hobbies: document.getElementById("hobs").value,
      image: imgURL,
    };

    await addDoc(collection(db, "users"), data);

    alert("User added successfully! Now you can log in.");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Failed to submit the form: " + error.message);
  }
});

