import {
    auth,
    onAuthStateChanged,
    database,
    doc,
    collection,
    query,
    where,
    getDocs,
    signOut,
  } from "./config.js";
  
  const loginBtn = document.getElementById("Login_button");
  const outBtn = document.getElementById("out_Btn");
  //.......................................get current user.........................................//
  
  const user = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loginBtn.style.display = "none";
      outBtn.style.display = "block";
      // ...
    } else {
      // User is signed out
      // ...
      loginBtn.style.display = "block";
      outBtn.style.display = "none";
    }
  });
  
  function logout() {
    signOut(auth)
      .then(() => {
        //   alert("user logged out");
        window.location.href = "../index.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }
  
  outBtn.addEventListener("click", logout);
  loginBtn.addEventListener("click",()=>{
    window.location.href='../chooselogin.html'
  })