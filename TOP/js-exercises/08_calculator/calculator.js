const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const sum = function(arr) {
	return arr.reduce((sum, cur) => {return sum + cur}, 0);
};

const multiply = function(arr) {
  return arr.reduce((acc, cur) => {return acc * cur}, 1);
};

const power = function(a, b) {
	return Math.pow(a, b);
};

const factorial = function(a) {
  let acc = 1;
  if( a === 0 ) { return 1; };
	for( let i = 1; a >= i; i++ ) {
    acc *= i;
  }
  return acc;
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
