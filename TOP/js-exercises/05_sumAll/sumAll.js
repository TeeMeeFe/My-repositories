const sumAll = function(startIndex, endIndex) {
    if( startIndex < 0 || endIndex < 0 || !Number.isInteger(startIndex) || !Number.isInteger(endIndex) ) { 
        return 'ERROR' 
    };

    const start = Math.min(startIndex, endIndex);
    const end = Math.max(startIndex, endIndex);
    let i = start;
    let num = start;

    do { 
        num += start + i;
        i++; 
    } 
    while( i < end );

    return num;
};

const result = sumAll(1, 4000);
console.log(result);

// Do not edit below this line
module.exports = sumAll;
