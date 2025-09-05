const ul = document.querySelector("ul");
const input = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener("click", addItem);

function addItem() {
    const inStr = input.value;
    input.value = "";

    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");

    span.textContent = inStr;
    button.textContent = "Delete";

    button.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);

    input.focus();
}

