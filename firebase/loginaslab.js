import {auth,app,collection,where,doc, getDocs,database,onAuthStateChanged,signInWithEmailAndPassword, signInWithPopup, updateDoc,query } from './config.js';
//............................REFERENCES............................//
const email = document.getElementById("email");
const pswrd = document.getElementById("pswrd");
const login = document.getElementById("login-btn");

//...............................................login USER .........................................//   
function LoginLab() {
        signInWithEmailAndPassword(auth, email.value, pswrd.value)
        .then((userCredential) => {
            // Signed in 
            var uid = userCredential.user.uid;
            alert('Lab logged in');
            setTimeout(()=>{window.location.href="index.html";},400);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode,errorMessage);
        });
}

//.......................................get current user.........................................//
const user = auth.currentUser;
onAuthStateChanged(auth, async(user) => {
    if (user) {
        const uid = user.uid;
        console.log("current lab: ", uid);
    } 
    else {
    }
});

//..................................................ASSIGN THE EVENTS..............................//   
login.addEventListener("click", (e)=>{
    e.preventDefault();
    LoginLab()

});
