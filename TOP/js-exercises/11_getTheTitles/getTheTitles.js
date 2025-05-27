const getTheTitles = function(arr) {
    const books = []
    arr.forEach(element => {
        books.push(element.title)
    });
    return books;
};

// Do not edit below this line
module.exports = getTheTitles;
