"use strict";
let mensaje = "Hola Mundo!";
console.log(mensaje);
// Selecionamos el body de nuestro DOM y creamos un nueva etiqueta h1
const body = document.querySelector("body");
const h1 = document.createElement("h1");
// Creamos un nuevo nodo de texto
const text = document.createTextNode(mensaje);
// Agregamos los elementos creados a sus respectivos nodos y al DOM
h1.appendChild(text);
body.appendChild(h1);
