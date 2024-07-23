import {
  auth,
  app,
  collection,
  where,
  doc,
  getDocs,
  database,
  onAuthStateChanged,
  updateDoc,
  query,
  getStorage,
  getDownloadURL,
  ref,
  uploadString,
  arrayUnion,
  arrayRemove,
} from "./config.js";

const user = auth.currentUser;
var pname, pemail, typeofreport, file, timenow, noofreports;
var urlrep, labname;

const plus = document.querySelector("#newreport img");
const inputElement = document.querySelector("#inputElement");
inputElement.style.display = "none";

const inputelement2 = document.getElementById("inputElement2");
inputelement2.style.display = "none";

const inputs = document.querySelectorAll("#inputElement input");
const element2 = document.querySelectorAll("#inputelement2 input");

plus.addEventListener("click", () => {
  if (
    inputElement.style.display == "none" &&
    inputelement2.style.display == "none"
  ) {
    inputElement.style.display = "flex";
    plus.src = "assets/close.png";
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  } else if (inputElement.style.display == "none") {
    inputelement2.style.display = "none";
    plus.src = "assets/plus1.png";
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
    for (let i = 0; i < element2.length; i++) {
      element2[i].value = "";
    }
  } else {
    inputElement.style.display = "none";
    plus.src = "assets/plus1.png";
  }
});

const inputbtn = document.querySelector(".inputbtn");
inputbtn.addEventListener("click", () => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      alert("Please enter the fields");
      return;
    }
  }
  pname = inputs[0].value;
  pemail = inputs[1].value;
  checkuser(pname, pemail);
});

const upload = document.querySelector(".upload");

upload.addEventListener("click", () => {
  onAuthStateChanged(auth, async (user) => {
    var now = new Date();
    timenow =
      now.getMonth() +
      1 +
      "-" +
      now.getDate() +
      "-" +
      now.getFullYear() +
      " " +
      now.getHours() +
      ":" +
      (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) +
      ":" +
      (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds());

    for (let i = 0; i < element2.length; i++) {
      if (element2[i].value == "") {
        alert("Please enter the fields");
        return;
      }
    }
    file = document.querySelector("input[type=file]").files[0];
    typeofreport = document.querySelector("#reportType").value;

    const q = await query(
      collection(database, "labs"),
      where("uid", "==", user.uid)
    );
    await getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach(async (docdata) => {
        const docRef = await doc(database, "labs", docdata.id);
        labname = docdata.data().name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (event) => {
          const imageData = event.target.result;
          const userreportDocRef = docRef;
          const storageRef = await getStorage();
          const ReportRef = await ref(
            storageRef,
            `reports/${user.uid}+${timenow}/labreport.pdf`
          );
          setTimeout(() => {
            const uploadTask = uploadString(ReportRef, imageData, "data_url")
              .then(async () => {
                getDownloadURL(ReportRef).then(async (url) => {
                  urlrep = url;
                  console.log(urlrep);
                  await updateDoc(userreportDocRef, {
                    reports: arrayUnion({
                      pname,
                      pemail,
                      typeofreport,
                      url,
                      timenow,
                    }),
                  });
                });
              })
              .catch((error) => {
                console.log(error.message);
              });
          }, 500);
        };
      });
    });

    setTimeout(() => {
      const q1 = query(
        collection(database, "users"),
        where("pid", "==", pname + pemail)
      );
      getDocs(q1).then((snap) => {
        snap.forEach(async (docdata) => {
          console.log(urlrep);
          const docRef = doc(database, "users", docdata.id);
          await updateDoc(docRef, {
            [typeofreport]: arrayUnion({
              labname,
              urlrep,
              timenow
            })
          })
            .then(docRef => {
              console.log("t");
            })
            .catch(error => {
              console.log(error);
            })

        })
      })
    }, 8000);
    inputelement2.style.display = "none";
    plus.src = "assets/plus1.png";
    for (let i = 0; i < element2.length; i++) {
      element2[i].value = "";
    }
    addReport();
  });
});

const reportElements = document.getElementById("reportElements");

function addReport() {
  const div1 = document.createElement("div");
  div1.classList.add("reportElement");
  reportElements.prepend(div1);
  const div2 = document.createElement("div");
  div2.style.flexGrow = "2";
  const p1 = document.createElement("p");
  p1.classList.add("Pname");
  p1.innerText = "Patient name : " + pname;
  const p2 = document.createElement("p");
  p2.classList.add("Pemail");
  p2.innerText = "Patient email : " + pemail;
  const p3 = document.createElement("p");
  p3.classList.add("type");
  p3.innerText = "Type of test : " + typeofreport;
  const p4 = document.createElement("p");
  p4.classList.add("time");
  p4.style.fontSize = "10px";
  p4.innerText = "Uploaded at : " + timenow;
  const p5 = document.createElement("p");
  p5.innerText = urlrep;
  p5.style.display = "none";
  div2.appendChild(p1);
  div2.appendChild(p2);
  div2.appendChild(p3);
  div2.appendChild(p4);
  div2.appendChild(p5);
  const div3 = document.createElement("div");
  const img1 = document.createElement("img");
  img1.src = "assets/eye.png";
  const img2 = document.createElement("img");
  img2.src = "assets/delete 2.png";
  div3.appendChild(img1);
  div3.appendChild(img2);
  div1.appendChild(div2);
  div1.appendChild(div3);
  img1.addEventListener("click", async () => {
    onAuthStateChanged(auth, async (user) => {
      const q = await query(
        collection(database, "labs"),
        where("uid", "==", user.uid)
      );
      await getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach(async (docdata) => {
          noofreports = docdata.data().reports.length;
          // console.log(docdata.data().reports[noofreports-1].url);
          let cuurl = docdata.data().reports[noofreports - 1].url;
          urll=cuurl;
          window.open(cuurl, "_blank");
        });
      });
    });
  });
  img1.style.cursor = "pointer";
  img2.addEventListener("click",(e)=>{
    const parentEle=e.target.parentElement.parentElement;
    onAuthStateChanged(auth,(user) => {
      const q1 = query(
        collection(database, "labs"),
        where("uid", "==",user.uid)
      );
      getDocs(q1).then((querySnapshot) => {
        querySnapshot.forEach( (docdata1) => {
          const q = query(
            collection(database, "users"),
            where("pid", "==",pname+pemail)
          );
          getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach( (docdata) => {
              const docRefreport = doc(database, "users",docdata.id);
              console.log(docdata.id);
              const nlab=docdata1.data().name;
              updateDoc(docRefreport, {
                [typeofreport]: arrayRemove({labname:nlab,timenow:timenow,urlrep:urlrep})
              }).then(()=>{
                console.log("updated");
              })
            });
          });
          const docRefreportlab = doc(database, "labs",docdata1.id);
          updateDoc(docRefreportlab, {
            reports: arrayRemove({pemail:pemail,pname:pname,timenow:timenow,typeofreport:typeofreport,url:urlrep})
          });
        });

      })
    });
    parentEle.remove();
  });
  img2.style.cursor = "pointer";
}

onAuthStateChanged(auth, async (user) => {
  const q = await query(
    collection(database, "labs"),
    where("uid", "==", user.uid)
  );
  await getDocs(q).then((querySnapshot) => {
    querySnapshot.forEach(async (docdata) => {
      let reports = docdata.data().reports;
      let len = docdata.data().reports.length;
      for (let i = 0; i < len; i++) {
        addReport2(
          reports[i].pname,
          reports[i].pemail,
          reports[i].typeofreport,
          reports[i].timenow,
          reports[i].url
        );
      }
    });
  });
});

function addReport2(name, email, typereport, time, urlreport) {
  const div1 = document.createElement("div");
  div1.classList.add("reportElement");
  reportElements.prepend(div1);
  const div2 = document.createElement("div");
  div2.style.flexGrow = "1";
  const p1 = document.createElement("p");
  p1.classList.add("Pname");
  p1.innerText = "Patient name : " + name;
  const p2 = document.createElement("p");
  p2.classList.add("Pemail");
  p2.innerText = "Patient email : " + email;
  const p3 = document.createElement("p");
  p3.classList.add("type");
  p3.innerText = "Type of test : " + typereport;
  const p4 = document.createElement("p");
  p4.classList.add("time");
  p4.style.fontSize = "10px";
  p4.innerText = "Uploaded at : " + time;
  div2.appendChild(p1);
  div2.appendChild(p2);
  div2.appendChild(p3);
  div2.appendChild(p4);
  const div3 = document.createElement("div");
  const img1 = document.createElement("img");
  img1.src ="assets/eye.png";
  const img2 = document.createElement("img");
  img2.src = "assets/delete 2.png";
  div3.appendChild(img1);
  div3.appendChild(img2);
  div1.appendChild(div2);
  div1.appendChild(div3);
  img1.addEventListener("click", async () => {
    window.open(urlreport, "_blank");
  });
  img1.style.cursor = "pointer";
  img2.addEventListener("click",(e)=>{
    const parentEle=e.target.parentElement.parentElement;
    onAuthStateChanged(auth,(user) => {
      const q1 = query(
        collection(database, "labs"),
        where("uid", "==",user.uid)
      );
      getDocs(q1).then((querySnapshot) => {
        querySnapshot.forEach( (docdata1) => {
          const q = query(
            collection(database, "users"),
            where("pid", "==",name+email)
          );
          getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach( (docdata) => {
              const docRefreport = doc(database, "users",docdata.id);
              console.log(docdata.id);
              const nlab=docdata1.data().name;
              updateDoc(docRefreport, {
                [typereport]: arrayRemove({labname:nlab,timenow:time,urlrep:urlreport})
              }).then(()=>{
                console.log("updated");
              })
            });
          });
          const docRefreportlab = doc(database, "labs",docdata1.id);
          updateDoc(docRefreportlab, {
            reports: arrayRemove({pemail:email,pname:name,timenow:time,typeofreport:typereport,url:urlreport})
          });
        });

      })
    });
    parentEle.remove();
  });
}

function checkuser() {
  const q = query(
    collection(database, "users"),
    where("pid", "==", pname + pemail)
  );
  getDocs(q).then((querySnapshot) => {
    if (querySnapshot.empty) {
      alert("Patient Not Found");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
      }
      // window.location.href="../reportpageforlab.html";
    } else {
      inputElement.style.display = "none";
      inputelement2.style.display = "flex";
    }
  });
}
