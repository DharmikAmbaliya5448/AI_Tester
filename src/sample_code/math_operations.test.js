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

  test('should handle adding with strings', () => {
    expect(add('5', '5')).toBe('55'); //string concatenation
    expect(add(5, '5')).toBe('55'); //string concatenation
    expect(add('5', 5)).toBe('55'); //string concatenation

  });

  test('should handle adding with floating point numbers', () => {
    expect(add(2.5, 3.5)).toBe(6);
    expect(add(-2.5, 3.5)).toBe(1);
    expect(add(2.5, -3.5)).toBe(-1);
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

  test('should correctly multiply negative numbers', () => {
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

  test('should handle multiplying with NaN', () => {
    expect(multiply(5, NaN)).toBe(NaN);
    expect(multiply(NaN, 5)).toBe(NaN);
  });

  test('should handle multiplying large numbers', () => {
    expect(multiply(1000000, 1000000)).toBe(1000000000000);
  });

  test('should handle multiplying decimal numbers', () => {
    expect(multiply(2.5, 3)).toBeCloseTo(7.5);
    expect(multiply(2, 3.5)).toBeCloseTo(7);
  })
});

const { sub } = require('./math_operations.js');

describe('sub', () => {
  test('should correctly subtract two positive numbers', () => {
    expect(sub(5, 3)).toBe(2);
  });

  test('should handle subtracting with zero', () => {
    expect(sub(5, 0)).toBe(5);
    expect(sub(0, 5)).toBe(-5);
  });

  test('should handle subtracting negative numbers', () => {
    expect(sub(5, -3)).toBe(8);
    expect(sub(-5, 3)).toBe(-8);
    expect(sub(-5, -3)).toBe(-2);
  });

  test('should handle subtracting with null values', () => {
    expect(sub(5, null)).toBe(NaN);
    expect(sub(null, 5)).toBe(NaN);
    expect(sub(null, null)).toBe(NaN);

  });

  test('should handle subtracting with undefined values', () => {
    expect(sub(5, undefined)).toBe(NaN);
    expect(sub(undefined, 5)).toBe(NaN);
    expect(sub(undefined, undefined)).toBe(NaN);
  });

  test('should handle subtracting large numbers', () => {
    expect(sub(1000000, 500000)).toBe(500000);
  });


});