import {auth,app,collection,where,doc, getDocs,database,onAuthStateChanged,signInWithEmailAndPassword, signInWithPopup, updateDoc,query } from './config.js';
//............................REFERENCES............................//
const email = document.getElementById("email");
const pswrd = document.getElementById("pswrd");
const name=document.getElementById("name");
const login = document.getElementById("login-btn");

//...............................................login USER .........................................//   
function LoginUser() {
        signInWithEmailAndPassword(auth, name.value+email.value, pswrd.value)
        .then((userCredential) => {
            // Signed in 
            var uid = userCredential.user.uid;
            alert('user logged in');
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
        console.log("current user: ", uid);
    } 
    else {
    }
});

//..................................................ASSIGN THE EVENTS..............................//   
login.addEventListener("click", (e)=>{
    e.preventDefault();
    LoginUser()});
