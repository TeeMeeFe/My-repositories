import { greeting } from "./greeting.js";
import "./style.css";
import odinImg from "./img/odin-lined.png";

const image = document.createElement("img");
image.src = odinImg;

document.body.appendChild(image);

console.log(greeting);