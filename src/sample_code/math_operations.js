// FILE: src/sample_code/math_operations.js
// This file has been updated to only include functions, as requested.



function div(a, b) {
  return a / b;
}

function pow(a, b) {
  return Math.pow(a, b);
}

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function sub(a, b) {
  return a - b;
}

function mod(a, b) {
  return a % b;
}

module.exports = {
  add,
  multiply,
  sub,
  mod,
  div,
  pow
};
