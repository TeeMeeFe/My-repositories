const findTheOldest = function(arr) {
    const today = new Date().getFullYear();
    return arr.reduce((prevPerson, currPerson) => {
        let prevAge = (prevPerson.yearOfDeath ?? today) - prevPerson.yearOfBirth
        let currAge = (currPerson.yearOfDeath ?? today) - currPerson.yearOfBirth
        return prevAge > currAge ? prevPerson : currPerson
    });
};

// Do not edit below this line
module.exports = findTheOldest;
