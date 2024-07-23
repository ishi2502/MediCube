import { app, database, auth, getDocs, query, collection } from "./config.js";

const q = query(collection(database, "labs"));
getDocs(q).then((querySnapshot) => {
  querySnapshot.forEach((docdata) => {
    const name = docdata.data().name;
    const address = docdata.data().address;
    const website = docdata.data().website;
    addlab(name, address, website);
  });
});

function addlab(nm, addr, web) {
  const parentdiv = document.querySelector("#labs-wrap");
  const div = document.createElement("div");
  div.setAttribute("class", "labcov");
  const img = document.createElement("img");
  img.setAttribute("class", "logo");
  img.setAttribute("src", "../assets/logo.png");
  const h2 = document.createElement("h2");
  h2.setAttribute("class", "name");
  h2.innerText = nm;
  const p = document.createElement("p");
  p.setAttribute("class", "address");
  p.innerText = addr;
  const a = document.createElement("a");
  a.setAttribute("class", "website");
  a.setAttribute("href", web);
  div.appendChild(img);
  div.appendChild(h2);
  div.appendChild(p);
  div.appendChild(a);
  parentdiv.appendChild(div);
}
// addlab('Bharat Labs','New delhi, India','');
