const { div } = require('./math_operations.js');

describe('div', () => {
  test('should correctly divide two positive numbers', () => {
    expect(div(6, 2)).toBe(3);
  });

  test('should correctly divide a positive number by 1', () => {
    expect(div(10, 1)).toBe(10);
  });

  test('should correctly divide a negative number by a positive number', () => {
    expect(div(-10, 2)).toBe(-5);
  });

  test('should correctly divide a positive number by a negative number', () => {
    expect(div(10, -2)).toBe(-5);
  });

  test('should correctly divide two negative numbers', () => {
    expect(div(-10, -2)).toBe(5);
  });


  test('should return Infinity when dividing by zero', () => {
    expect(div(10, 0)).toBe(Infinity);
  });

  test('should return -Infinity when dividing a negative number by zero', () => {
    expect(div(-10, 0)).toBe(-Infinity);
  });

  test('should return NaN when dividing zero by zero', () => {
    expect(div(0, 0)).toBeNaN();
  });

  test('should throw an error when dividing by null', () => {
    expect(() => div(10, null)).toThrow();
  });

  test('should throw an error when dividing by undefined', () => {
    expect(() => div(10, undefined)).toThrow();
  });

  test('should handle dividing zero by a non-zero number', () => {
    expect(div(0, 5)).toBe(0);
  });

});

const { pow } = require('./math_operations.js');

describe('pow', () => {
  test('should correctly calculate power for positive numbers', () => {
    expect(pow(2, 3)).toBe(8);
    expect(pow(5, 2)).toBe(25);
  });

  test('should handle raising to the power of zero', () => {
    expect(pow(5, 0)).toBe(1);
    expect(pow(0, 0)).toBe(1); //Note: this is a mathematical convention, not necessarily intuitive.
  });

  test('should handle raising to a negative power', () => {
    expect(pow(2, -2)).toBe(0.25);
    expect(pow(10, -1)).toBe(0.1);
  });

  test('should handle negative base raised to a positive power', () => {
    expect(pow(-2, 3)).toBe(-8);
    expect(pow(-3, 2)).toBe(9);
  });

  test('should handle negative base raised to a negative power', () => {
    expect(pow(-2, -2)).toBe(0.25);
    expect(pow(-3, -2)).toBe(1/9);
  });


  test('should handle zero base raised to a positive power', () => {
    expect(pow(0, 3)).toBe(0);
    expect(pow(0, 5)).toBe(0);
  });

  test('should return NaN for invalid inputs', () => {
    expect(pow(NaN, 2)).toBe(NaN);
    expect(pow(2, NaN)).toBe(NaN);
    expect(pow(Infinity,2)).toBe(Infinity);
    expect(pow(2,Infinity)).toBe(Infinity)
    expect(pow(-Infinity,2)).toBe(Infinity);
  });

  test('should throw an error for non-numeric inputs', () => {
    expect(() => pow("a", 2)).toThrow();
    expect(() => pow(2, "b")).toThrow();
    expect(() => pow(null, 2)).toThrow();
    expect(() => pow(2, undefined)).toThrow();
    expect(() => pow(undefined, undefined)).toThrow();

  });
});

const { add } = require('./math_operations.js');

describe('add', () => {
  test('should correctly add two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('should handle adding with zero', () => {
    expect(add(5, 0)).toBe(5);
    expect(add(0, 5)).toBe(5);
    expect(add(0, 0)).toBe(0);
  });

  test('should handle adding negative numbers', () => {
    expect(add(-2, 3)).toBe(1);
    expect(add(2, -3)).toBe(-1);
    expect(add(-2, -3)).toBe(-5);
  });

  test('should handle adding with null', () => {
    expect(add(5, null)).toBe(5);
    expect(add(null, 5)).toBe(5);
    expect(add(null, null)).toBe(0);
  });


  test('should handle adding with undefined', () => {
    expect(add(5, undefined)).toBe(NaN);
    expect(add(undefined, 5)).toBe(NaN);
    expect(add(undefined, undefined)).toBe(NaN);
  });

  test('should handle adding with floating point numbers', () => {
    expect(add(2.5, 3.5)).toBe(6);
    expect(add(-2.5, 3.5)).toBe(1);
  });

  test('should handle adding large numbers', () => {
    expect(add(1000000, 2000000)).toBe(3000000);
  });


});

const { multiply } = require('./math_operations.js');

describe('multiply', () => {
  test('should correctly multiply two positive numbers', () => {
    expect(multiply(2, 3)).toBe(6);
  });

  test('should handle multiplying with zero', () => {
    expect(multiply(5, 0)).toBe(0);
    expect(multiply(0, 5)).toBe(0);
  });

  test('should handle multiplying negative numbers', () => {
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(2, -3)).toBe(-6);
    expect(multiply(-2, -3)).toBe(6);
  });

  test('should handle multiplying with one', () => {
    expect(multiply(5, 1)).toBe(5);
    expect(multiply(1, 5)).toBe(5);
  });

  test('should handle multiplying with null', () => {
    expect(multiply(5, null)).toBe(0);
    expect(multiply(null, 5)).toBe(0);
  });

  test('should handle multiplying with undefined', () => {
    expect(multiply(5, undefined)).toBe(NaN);
    expect(multiply(undefined, 5)).toBe(NaN);
  });


  test('should handle multiplying large numbers', () => {
    expect(multiply(1000000, 1000000)).toBe(1000000000000);
  });

  test('should handle multiplying decimals', () => {
    expect(multiply(2.5, 3)).toBeCloseTo(7.5);
    expect(multiply(2, 3.5)).toBeCloseTo(7);
  });

});

const { sub } = require('./math_operations.js');

describe('sub', () => {
  test('should correctly subtract two positive numbers', () => {
    expect(sub(5, 3)).toBe(2);
  });

  test('should handle subtraction with zero', () => {
    expect(sub(5, 0)).toBe(5);
    expect(sub(0, 5)).toBe(-5);
  });

  test('should handle subtraction with negative numbers', () => {
    expect(sub(5, -3)).toBe(8);
    expect(sub(-5, 3)).toBe(-8);
    expect(sub(-5, -3)).toBe(-2);
  });

  test('should handle subtraction with null values', () => {
    expect(sub(5, null)).toBe(NaN);
    expect(sub(null, 5)).toBe(NaN);
    expect(sub(null, null)).toBe(NaN);
  });

  test('should handle subtraction with undefined values', () => {
    expect(sub(5, undefined)).toBe(NaN);
    expect(sub(undefined, 5)).toBe(NaN);
    expect(sub(undefined, undefined)).toBe(NaN);
  });


  test('should handle subtraction of large numbers', () => {
    expect(sub(1000000, 500000)).toBe(500000);
  });

  test('should handle subtraction resulting in zero', () => {
    expect(sub(5,5)).toBe(0);
  });

});

const { mod } = require('./math_operations.js');

describe('mod', () => {
  test('should correctly calculate the modulo of two positive numbers', () => {
    expect(mod(10, 3)).toBe(1);
  });

  test('should handle modulo with zero divisor', () => {
    expect(() => mod(10, 0)).toThrow();
  });

  test('should handle modulo with a negative dividend', () => {
    expect(mod(-10, 3)).toBe(-1);
  });

  test('should handle modulo with a negative divisor', () => {
    expect(mod(10, -3)).toBe(1);
  });

  test('should handle modulo with both negative dividend and divisor', () => {
    expect(mod(-10, -3)).toBe(-1);
  });

  test('should handle modulo where dividend is zero', () => {
    expect(mod(0, 3)).toBe(0);
  });

  test('should handle modulo where divisor is one', () => {
    expect(mod(10, 1)).toBe(0);
  });


  test('should handle modulo where dividend equals divisor', () => {
    expect(mod(10,10)).toBe(0);
  });

  test('should handle modulo with large numbers', () => {
    expect(mod(1000000000, 3)).toBe(1);
  });

  test('should throw an error if either argument is not a number', () => {
    expect(() => mod(null, 3)).toThrow();
    expect(() => mod(10, undefined)).toThrow();
    expect(() => mod("10", 3)).toThrow();
    expect(() => mod(10, "3")).toThrow();

  });
});