const palindromes = function (str) {
    const original = (string) => string.toLowerCase().split(", ").join();
    const reversed = (string) => string.toLowerCase().split(", ").reverse().join();
    for( let i = 1; i <= str.length; i++) {
        let spliced = str.substr(0, i) + str.substr(i + 1);
        if( original(spliced) === reversed(spliced) ) { return true };
    }
    return false;
};

// Debug stuff!
const stringy = "Animal loots foliated detail of stool lamina."

console.log(palindromes(stringy));
console.log(stringy.toLowerCase().split(", ").join());
console.log(stringy.toLowerCase().split(", ").reverse().join());

// Do not edit below this line
module.exports = palindromes;
