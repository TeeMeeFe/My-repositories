const email = document.querySelector("#mail");
const button = document.querySelector("button");

// Add a minimum length of 10 characters and be required
email.setAttribute("minlength","10");
email.setAttribute("required","");

email.addEventListener("input",() => {
    if( email.validity.valueMissing ) {
        email.setCustomValidity("You must enter an email address!");
    }
    else if( email.validity.typeMismatch ) {
        email.setCustomValidity("You must enter a valid email address!");
    }
    else if( email.validity.tooShort ) {
        email.setCustomValidity("The email address must be longer than 10 characters!");
    }
    else {
        email.setCustomValidity("");
    }
});

button.addEventListener("submit", (event) => {
    if( !email.checkValidity() ) {
        event.preventDefault();
        reportValidity();
    }
});