import {
  app,
  database,
  auth,
  createUserWithEmailAndPassword,
  collection,
  addDoc,
} from "./config.js";

//............................REFERENCES............................//
const name = document.getElementById("name");
const phoneno = document.getElementById("phoneno");
const gender = document.getElementById("gender");
const email = document.getElementById("email");
const pswrd = document.getElementById("password");
const cnfrmpswrd = document.getElementById("cnfrmpassword");
const submit = document.getElementById("signup-btn");

function validation() {
  if (pswrd.value != cnfrmpswrd.value) {
    alert("passwords does not match");
    return false;
  }
  if (
    name.value == "" ||
    phoneno.value == "" ||
    gender.value == "" ||
    email.value == "" ||
    pswrd.value == ""
  ) {
    alert("Please fill all the required fields");
    return false;
  }
  return true;
}

//...............................................REGISTER USER TO FIREBASE.........................................//

function RegisterUser() {
  if (!validation()) {
    return false;
  }
  createUserWithEmailAndPassword(auth, name.value + email.value, pswrd.value)
    .then((userCredential) => {
      const user = userCredential.user;

      addDoc(collection(database, "users"), {
        pid: name.value + email.value,
        name: name.value,
        phoneno: phoneno.value,
        gender: gender.value,
        email: email.value,
        uid: user.uid,
        typeof: "patient",
        xray:[],
        mri:[],
        ctscan:[],
        bloodtest:[],
        urinetest:[],
        biopsy:[],
        ultrasound:[],
        ecg:[]
      }).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        alert("user created");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 500);
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
    });
}

//..................................................ASSIGN THE EVENTS..............................//
submit.addEventListener("click", (e) => {
  e.preventDefault();
  RegisterUser();
});
