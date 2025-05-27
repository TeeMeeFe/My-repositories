const fibonacci = function(a) {
    let f_0 = 0;
    let f_1 = 1;
    let sum;
    const input = parseInt(a);
    if( input < 0 || isNaN(input) ) { return "OOPS" }
    else if( input == 0 ) { return 0 }
    else if( input == 1 || input == 2 ) { return 1 }
    else {
        for( let i = 2; i <= input; i++ ) {
            sum = f_0 + f_1;
            f_0 = f_1;
            f_1 = sum;
        }
    }
    return sum;
};  

// Do not edit below this line
module.exports = fibonacci;
