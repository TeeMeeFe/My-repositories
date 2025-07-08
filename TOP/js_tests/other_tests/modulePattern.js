// Module pattern

//const module = (function () {})();
const Formatter = (function() {
    console.log("Start");
    const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
    const timesRun = [];
    const setTimesRun = () => {
        log("Setting times run...");
        timesRun.push(null);
    };
    const makeUppercase = (text) => {
        log("Making uppercase");
        setTimesRun();
        return text.toUpperCase();
    };
    
    return {
        makeUppercase,
        timesRun,
    };
})();

console.log(Formatter.makeUppercase("Hello"));
console.log(Formatter.makeUppercase("Tomek"));
console.log(Formatter.makeUppercase("linus"));
console.log(Formatter.timesRun.length);