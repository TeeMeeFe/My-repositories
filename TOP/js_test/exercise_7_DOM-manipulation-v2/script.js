const link = document.querySelector("a");

link.textContent = "Mozilla Developer Network";
link.href = "https://developer.mozilla.org";

const sect = document.querySelector("section");
const para = document.createElement("p");
para.textContent = "We hope you enjoyed the ride!";
para.setAttribute("class", "highlight");

sect.appendChild(para);

const text = document.createTextNode(
    " — the premier source for web development knowledge.",
);

const linkPara = document.querySelector("p");
linkPara.appendChild(text);

const linkPara2 = linkPara.cloneNode(true);

sect.removeChild(linkPara);

sect.appendChild(linkPara2);