import {
  app,
  database,
  auth,
  onAuthStateChanged,
  getDocs,
  query,
  where,
  collection,
  addDoc,
} from "./config.js";

const checkusertype = document.getElementById("checkusertype");
console.log("hi");

checkusertype.addEventListener("click", (e) => {
  e.preventDefault();
  const user = auth.currentUser;
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
});
