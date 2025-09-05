// Query some selectors and initialize a variable
const gameBox = document.querySelector(".game-box");
const inputContainer = document.querySelector(".input-container");
const inputBox = document.querySelector(".input-box");
let inputValue = 6; //Default grid value that can cover the gameBox container without looking too ugly

// A mouse event and its handler
gameBox.onmouseover = gameBox.onmouseout = handler;

// An event handler function to gray paint any element with id=pixel
function handler(event) {
  // Get the id of the HTML element
  const target = event.target
  const elID = target.id;

  if (event.type == "mouseover" && elID == "pixel") {
    event.target.style.background = "gray";
  }
};

inputContainer.addEventListener("click", (event) => {
  // Get either the class, id or tag of the HTML element
  function str(el) {
    if (!el) return "null";
    return el.className || el.id || el.tagName;
  };

  const tagName = str(event.target);

  switch (tagName) {
    case "apply-button":
      return applyFromInputBox();
    case "reset-button":
      return generateFlexPixelsFromInput(inputValue);
  }
});

function applyFromInputBox() {
  inputValue = parseInt(inputBox.value);
  inputBox.value = "";

  if (isNaN(inputValue) || inputValue < 6 || inputValue > 100) {
    alert("You must insert a number between 6 and 100");
    return;
  }

  return generateFlexPixelsFromInput(inputValue);
};

function generateFlexPixelsFromInput(input) {
  resetChanges();
  const sqInput = input * input; //Square this

  // Create new pixels
  for (let i = 0; i < sqInput; i++) {
    const pixel = document.createElement("div");
    pixel.setAttribute("id", "pixel");
    gameBox.appendChild(pixel);
  }

  setFlexWidth(input);
};

function resetChanges() {
  const pixels = Array.from(document.querySelectorAll("#pixel"));

  // Remove any pixels on the box
  for (const pixel of pixels) {
    gameBox.removeChild(pixel);
  }
};

generateFlexPixelsFromInput(inputValue);

// A function to set the width of a flex item according to the gap and padding of the container box
function setFlexWidth(flexItems) {
  const pixels = document.querySelectorAll("#pixel");
  const container = window.getComputedStyle(gameBox);
  const containerProperties = {
    width: container.getPropertyValue("width"),
    padding: container.getPropertyValue("padding"),
    gap: container.getPropertyValue("gap"),
  };

  for (let i = 0; i < pixels.length; i++) {
    pixels[i].style.width = ((parseInt(containerProperties.width) - (parseInt(containerProperties.padding) * 2) - (parseInt(containerProperties.gap) * (flexItems - 1))) / flexItems) + "px";
  }
};
