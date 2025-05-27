const body = document.body;

const container = document.createElement("div");
container.setAttribute("id", "container");

body.appendChild(container);

const para = document.createElement("div");
para.style.color = "red";
para.innerText = "Hey i'm red!"

const h3 = document.createElement("h3");
h3.style.color = "blue";
h3.innerText = "I'm a blue h3!";

const boxContainer = document.createElement("div");
boxContainer.setAttribute("class", "box-container");
boxContainer.setAttribute("style", "border: 4px solid #000;");

container.appendChild(para);
container.appendChild(h3);

const h1 = document.createElement('h1');
h1.innerText = "I'm in a div";

const innerPara = document.createElement("p");
innerPara.innerText = "ME TOO!";

boxContainer.appendChild(h1);
boxContainer.appendChild(innerPara);

container.appendChild(boxContainer);