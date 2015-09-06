
var types = require('node-sass').types;

module.exports = {};

module.exports['pi()'] = function() {
  return types.Number(Math.PI);
};

module.exports['e()'] = function() {
  return new types.Number(Math.E);
};


var trig = function(operation, number) {
  if (number.getUnit() == "deg") {
    return new types.Number(Math[operation](Math.PI * number.getValue() / 180.0));
  } else {
    return new types.Number(Math[operation](number.getValue()));
  }
};

module.exports['sin($a)'] = function(number) {
  return trig('sin', number);
};
module.exports['asin($a)'] = function(number) {
  return trig('asin', number);
};
module.exports['cos($a)'] = function(number) {
  return trig('cos', number);
};
module.exports['acos($a)'] = function(number) {
  return trig('acos', number);
};
module.exports['tan($a)'] = function(number) {
  return trig('tan', number);
};
module.exports['atan($a)'] = function(number) {
  return trig('atan', number);
};

module.exports['logarithm($a, $base)'] = function(number, base) {
  return new types.Number(Math.log(number.getValue()) / Math.log(base.getValue()));
};

module.exports['sqrt($a)'] = function(number) {
  return new types.Number(Math.sqrt(number.getValue()));
};

module.exports['sqrt($a)'] = function(number) {
  return new types.Number(Math.sqrt(number.getValue()));
};

module.exports['pow($a, $b)'] = function(number, exponent) {
  return new types.Number(Math.pow(number.getValue(), exponent.getValue()));
};
