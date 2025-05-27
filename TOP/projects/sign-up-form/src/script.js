// Declare them object variables
const userName = {
    fname : document.querySelector("#fname"),
    lname : document.querySelector("#lname")
};
const passWord = {
    pwdf1 : document.querySelector("#pwd"),
    pwdf2 : document.querySelector("#c-pwd")
};
const emailAddress = document.querySelector("#email");
const phoneNumber = document.querySelector("#phone");
const errorFields = {
    uname : { field1 : document.querySelector("#fname-underlabel"),
              field2 : document.querySelector("#lname-underlabel") },
    email : document.querySelector("#email-underlabel"),
    phone : document.querySelector("#phone-underlabel"),
    pswrd : { field1 : document.querySelector("#pwd-underlabel"),
              field2 : document.querySelector("#c-pwd-underlabel") }
};

// A function expression to validate our inputs
const isValid = (t) => {
    
};