const removeFromArray = function(arr, ...args) {
    // Create a brand spanking new array
    const newArray = [];
 
    // Search for each element existing in the old array and negate its inclusion when pushing to the new array
    arr.forEach((item) => {
        if( !args.includes(item, 0) ) {
            newArray.push(item);
        }
    });

    return newArray;
};

const result = removeFromArray([1, 2, 3, 4], 1, 2);
console.log(result);

// Do not edit below this line
module.exports = removeFromArray;
