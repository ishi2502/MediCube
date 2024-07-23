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

  const gsBtn = document.getElementById("getstarted");
  gsBtn.addEventListener('click',()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const q = query(
            collection(database, "labs"),
            where("uid", "==", user.uid)
          );
          getDocs(q).then((querySnapshot) => {
            if (querySnapshot.empty) {
              console.log("patient");
              window.location.href = "../reportpageforpatient.html";
            } else {
              console.log("lab");
              window.location.href = "../reportpageforlab.html";
            }
          });
        }
        else{
          alert("Please login first to continue");
          window.location.href="../chooselogin.html";
        }
      });
  })
  