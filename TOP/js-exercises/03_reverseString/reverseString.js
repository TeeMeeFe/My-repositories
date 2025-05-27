const reverseString = function(str) {
    // Split the string into several substrings
    const splitString = str.split("");
    // Reverse these strings 
    const reversedString = splitString.reverse();
    // Join them back together into a single string again
    const joinedString = reversedString.join("");

    return joinedString;
};

reverseString('hello');

// Do not edit below this line
module.exports = reverseString;
