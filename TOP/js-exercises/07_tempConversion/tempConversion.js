function round(value, precision) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
};

const convertToCelsius = function(num) {
    return round((num - 32) * 0.555556, 1);
};

const convertToFahrenheit = function(num) {
    return round((num * 1.8) + 32, 1);
};

// Do not edit below this line
module.exports = {
  convertToCelsius,
  convertToFahrenheit
};
