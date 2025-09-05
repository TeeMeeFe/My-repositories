// Get them selectors
const form = document.querySelector("form");

const uname = document.querySelector("#uname");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const comment = document.querySelector("#comment");
const button = document.querySelector("button");

// Create a div that shows the user about any validation errors
const error = document.createElement("div");
error.setAttribute("class", "error");

form.appendChild(error); // Add the div to the form 

// Convert email and phone to their respective HTML types
email.setAttribute("type", "email");
phone.setAttribute("type", "tel");

// Append required tags to the HTML inputs
email.setAttribute("required", "");
phone.setAttribute("required", "");
uname.setAttribute("required", "");
comment.setAttribute("required", "");

// Clear the comment textarea field
comment.textContent = "";

// Disable client-side validation bubble to the form
form.setAttribute("novalidate", "");

// Set the minimum length for username
uname.setAttribute("minlength", "5");

// Set the button to be submit type
button.setAttribute("type", "submit");

// Validate any inputs in the form
function isValid(t) {
    const tag = t.tagName;
    const len = t.value.length;
    const val = t.value;
    const atr = t.getAttribute("type");
    const min = t.getAttribute("minlength");
    //const max = t.getAttribute("maxlength");

    // As per the HTML Specification on regular expressions
    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@bigcorp.eu$/;
    // New in task 2
    // A single lowercase char followed by a single dot followed by 3 or more lowercase letters or digits 
    const unameRegExp = /^[a-z]+\.+[a-z0-9]{3,}$/;  
    const phoneRegExp = /^[+]+((\d{1,3}))+[ ]?\(?(\d{2,4})\)?[- ]?(\d{6,8})$/;

    if( tag == "INPUT" ) {
        switch(atr) {
            case "text":
                // If the username is below the minlength or above maxlength
                if( len < min || len > 20 ) {
                    error.textContent = `You must enter an username whose length is between 5 and 20 characters.\n 
                                        (You're at ${len} character${len === 1 ? "" : "s"})`;
                }
                // If the username doesn't match our regular expression
                else if( unameRegExp.test(val) === false ) {
                    error.textContent = `You must write a valid username \n 
                                         (A single lowercase char followed by a single dot followed by 3 or more lowercase letters or digits)`;
                }
                else { return true; }
            return false;
            case "email":
                // If the email field is empty
                if( len === 0 ) {
                    error.textContent = "You need to enter an email address.";
                }
                // If the field is not a valid email
                else if ( emailRegExp.test(val) === false ) {
                    error.textContent = `Entered value needs to be a valid email address. \n
                                        (Must be a @bigcorp.eu account)`;
                }
                else { return true; }
            return false;
            case "tel":
                // If the phone field is empty 
                if( len === 0 ) {
                    error.textContent = "You must enter a phone number.";
                }
                // If its not valid
                else if( phoneRegExp.test(val) === false ) {
                    error.textContent = `Entered value is not a valid phone number. \n
                                        (Number must be like e.g +1 2345-678901)`;
                }
                else { return true; }
            return false;
        }
    }
    else if( tag == "TEXTAREA" ) {
        // Validate the comment if its empty or its above its maximum allowed limit of characters to send
        if( len === 0 ) { 
            error.textContent = "You must enter a comment(max characters 200)";
        }
        else if( len > 200 ) {
            error.textContent = `Your comment is exceeding the maximum limit of 200 characters.\n
                                (You're at ${len} characters)`;
        }
        else { return true; }
    }
    return false;
}

// This defines what happens when the user types in the fields in CSS
[uname, email, phone, comment].forEach((element) => {
    element.addEventListener("input", () => {
        switch(element) { // Check the validity for each input field
            case uname:
                uname.className = isValid(uname) ? "valid" : "invalid";
            break
            case email:
                email.className = isValid(email) ? "valid" : "invalid";
            break
            case phone:
                phone.className = isValid(phone) ? "valid" : "invalid";
            break
            case comment:
                comment.className = isValid(comment) ? "valid" : "invalid";
            break
        };
        error.textContent = ""; // Remove the message content
        error.className = "error"; // Remove the active class
    });
});

// Define the behavior of the error div when the user submits the data 
form.addEventListener("submit", (event) => {
    if( !isValid(uname) ) {
        uname.className = "invalid";
        error.className = "error active"
        event.preventDefault(); // Stops the form from submitting 
        return ;
    }
    else {
        uname.className = "valid";
        error.textContent = "";
        error.className = "error";
    }
    if( !isValid(email) ) {
        email.className = "invalid";
        error.className = "error active"
        event.preventDefault(); 
        return ;
    }
    else {
        email.className = "valid";
        error.textContent = "";
        error.className = "error";
    }
    if( !isValid(phone) ) {
        phone.className = "invalid";
        error.className = "error active"
        event.preventDefault(); 
        return ;
    }
    else {
        phone.className = "valid";
        error.textContent = "";
        error.className = "error";
    }
    if( !isValid(comment) ) {
        comment.className = "invalid";
        error.className = "error active"
        event.preventDefault(); 
        return ;
    }
    else {
        comment.className = "valid";
        error.textContent = "";
        error.className = "error";
    }
});
