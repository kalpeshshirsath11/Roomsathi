import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

import {
    getStorage,
    ref as sRef,
    uploadBytesResumable,
    getDownloadURL,
  } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
 

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
const db = getFirestore(app);

var files = [];
var reader = new FileReader();

var namebox = document.getElementById("namebox");
var extlab = document.getElementById("extlab");
var myimg = document.getElementById("myimg");
var proglab = document.getElementById("upprogress");
var Selbtn = document.getElementById("selbtn");
var Upbtn = document.getElementById("upbtn");
var Downbtn = document.getElementById("downbtn");

var input = document.createElement("input");
input.type = "file";

input.onchange = (e) => {
  files = e.target.files;

  var extension = GetFileExt(files[0]);
  var name = GetFileName(files[0]);

  namebox.value = name;
  extlab.innerHTML = extension;

  reader.readAsDataURL(files[0]);
};

reader.onload = function () {
  myimg.src = reader.result;
};

//Image Selection

Selbtn.onclick = function () {
  input.click();
};

function GetFileExt(file) {
  var temp = file.name.split(".");
  var ext = temp.slice((temp.length - 1), temp.length);
  return "." + ext[0];
}

function GetFileName(file) {
  var temp = file.name.split(".");
  var fname = temp.slice(0, -1).join(".");
  return fname;
}

// UPLOAD PROCESS
let imgURL;

async function UploadProcess() {
  var ImgToUpload = files[0];

  var ImgName = namebox.value + extlab.innerHTML;

  const metaData = {
    contentType: ImgToUpload.type,
  };

  const storage = getStorage();
  const storageRef = sRef(storage, "Images/" + ImgName);

  const UploadTask = uploadBytesResumable(storageRef,ImgToUpload,metaData);

  UploadTask.on(
    "state-changed",
    (snapshot) => {
      var progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      proglab.innerHTML = "Uploaded" + " " + progress + " "+ "%";
    },

    (error) => {
      alert("Error: Image not uploaded");
    },

    () => {
      getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
        imgURL = downloadURL;
        console.log(imgURL); //This downloadURL can store the download URL to the database(16:00)
      });
  }
  );
}
let button1 = document.getElementById('upbtn')
button1 .addEventListener("click", UploadProcess);

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await UploadProcess();
        
        let contact = document.getElementById('phone').value;
        let fullName = document.getElementById('name1').value;
        let Age = document.getElementById('age').value;
        let city = document.getElementById('city').value;
       
        let infogen;
        let male = document.getElementById('maleRadio');
        let female = document.getElementById('femaleRadio');
        if (male.checked) {
            infogen = male.value;
        } else if (female.checked) {
            infogen = female.value;
        }

        let languages = [];
        if (document.getElementById('hindiCheckbox').checked) {
            languages.push(document.getElementById('hindiCheckbox').value);
        }
        if (document.getElementById('englishCheckbox').checked) {
            languages.push(document.getElementById('englishCheckbox').value);
        }
        if (document.getElementById('marathiCheckbox').checked) {
            languages.push(document.getElementById('marathiCheckbox').value);
        }

        let address1 = document.getElementById('address').value;
        let budget1 = document.getElementById('budget').value;
        let college = document.getElementById('college').value;
        
        let department = document.getElementById('branch').value;
        let diet = [];
        let veg1 = document.getElementById('vegCheckbox');
        let nonveg2 = document.getElementById('nonvegCheckbox');

        if (veg1.checked) {
            diet.push(veg1.value);
        }
        if (nonveg2.checked) {
            diet.push(nonveg2.value);
        }

        let hobbies = document.getElementById('hobs').value;
       

        try {
            await addDoc(collection(db, "users"), {
                contact_no: contact, 
                FullName: fullName,
                Age: Age,
                Gender: infogen,
                Langueges: languages,
                MyTown: city,
                Address: address1,
                Budget: budget1,
                InstituteName: college,
                Department: department,
                Diet: diet,
                Hobbies: hobbies,
                image: imgURL
            });
            alert('User added successfully','now you can login');
            window.location.href ="login.html";
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    });
    

    // Add an event listener for form submission (User Registration)
 

