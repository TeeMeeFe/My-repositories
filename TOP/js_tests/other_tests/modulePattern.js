// Module pattern

//const module = (function () {})();
const Formatter = (function() {
    console.log("Start");
    const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
    const makeUppercase = (text) => {
        log("Making uppercase");
        return text.toUpperCase();
    };

    return {
        makeUppercase,
    };
})();

const hello = Formatter.makeUppercase("Hello");
console.log(hello);