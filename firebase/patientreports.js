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
} from "./config.js";

var reptype = location.search.substring(1);

const type = document.getElementById('typeofrep');
type.innerText = reptype;

onAuthStateChanged(auth, async (user) => {

    const q1 = query(
        collection(database, "users"),
        where("uid", "==", user.uid)
    );
    getDocs(q1).then((snap) => {
        snap.forEach(async (docdata) => {
            const docRef = doc(database, "users", docdata.id);
            const arr = docdata.data()[reptype];
            console.log(docdata.data()[reptype]);
            for (let i = 0; i < arr.length; i++) {
                var lab = arr[i].labname;
                console.log(arr[i].labname);
                var time = arr[i].timenow;
                console.log(arr[i].timenow);
                var url = arr[i].urlrep;
                console.log(arr[i].urlrep);
                displayreport(lab, time, url);
            }
        })
    })
})

const reportElements = document.getElementById("section2");
function displayreport(lab, time, url) {
    const div1 = document.createElement("div");
    div1.classList.add("report");
    reportElements.prepend(div1);
    const div2 = document.createElement("div");
    div2.style.flexGrow = "3";
    const p1 = document.createElement("p");
    p1.classList.add("Lname");
    p1.innerText = lab;
    const p4 = document.createElement("p");
    p4.classList.add("time");
    p4.innerText = "Uploaded at : " + time;
    div2.appendChild(p1);
    div2.appendChild(p4);
    const div3 = document.createElement("div");
    const img1 = document.createElement("img");
    img1.src = "assets/eye.png";
    img1.style.paddingRight = "10px";
    const img2 = document.createElement("img");
    img2.src = "assets/download-circular-button.png";
    var downloadLink = document.createElement("a");
    downloadLink.appendChild(img2);
    img2.addEventListener('click',()=>{
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            var blob = xhr.response;
            var url = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = url;
            link.download = "report";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        xhr.open('GET', url);
        xhr.send();

    })
    div3.style.alignItems = "center";
    div3.appendChild(img1);
    div3.appendChild(downloadLink);
    div1.appendChild(div2);
    div1.appendChild(div3);
    img1.addEventListener("click", async () => {
        window.open(url, "_blank");
    });
    div1.style.cursor="pointer";
}
