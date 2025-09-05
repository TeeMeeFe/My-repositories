// Module pattern
// Mocking our document object from browsers
const documentMock = (() => ({
    querySelector : (selector) => ({
        innerHTML: null,
    }),
}))();

//const module = (function () {})();
const Formatter = (function(doc) {
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
    const writeToDOM = (selector, message) => {
        if(!!doc && "querySelector" in doc) {
            doc.querySelector(selector).innerHTML = message;
        }
    };
    
    return {
        makeUppercase,
        writeToDOM,
        timesRun,
    };
})(document || documentMock);

/*console.log(Formatter.makeUppercase("Hello"));
console.log(Formatter.makeUppercase("Tomek"));
console.log(Formatter.makeUppercase("linus"));
console.log(Formatter.timesRun.length);*/