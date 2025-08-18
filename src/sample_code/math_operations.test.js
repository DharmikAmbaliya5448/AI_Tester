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

  test('should correctly add negative numbers', () => {
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
    expect(add('5', '5')).toBe('55');
    expect(add(5, '5')).toBe('55');
    expect(add('5', 5)).toBe('55');

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

  test('should handle multiplying negative numbers', () => {
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(2, -3)).toBe(-6);
    expect(multiply(-2, -3)).toBe(6);
  });

  test('should handle multiplying with 1', () => {
    expect(multiply(5, 1)).toBe(5);
    expect(multiply(1, 5)).toBe(5);
  });

  test('should handle multiplying with -1', () => {
    expect(multiply(5, -1)).toBe(-5);
    expect(multiply(-1, 5)).toBe(-5);
  });


  test('should return 0 when one of the arguments is null or undefined', () => {
    expect(multiply(null, 5)).toBe(0);
    expect(multiply(5, null)).toBe(0);
    expect(multiply(undefined, 5)).toBe(0);
    expect(multiply(5, undefined)).toBe(0);
  });

  test('should handle multiplying floating point numbers', () => {
    expect(multiply(2.5, 3)).toBeCloseTo(7.5);
    expect(multiply(2, 3.5)).toBeCloseTo(7);
  });

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

  test('should handle subtracting same numbers', () => {
    expect(sub(5, 5)).toBe(0);
  });


  test('should handle undefined values', () => {
    expect(() => sub(undefined, 5)).toThrow();
    expect(() => sub(5, undefined)).toThrow();
    expect(() => sub(undefined, undefined)).toThrow();
  });

  test('should handle null values', () => {
    expect(() => sub(null, 5)).toThrow();
    expect(() => sub(5, null)).toThrow();
    expect(() => sub(null, null)).toThrow();
  });

  test('should handle NaN values', () => {
    expect(sub(NaN, 5)).toBe(NaN);
    expect(sub(5, NaN)).toBe(NaN);
    expect(sub(NaN, NaN)).toBe(NaN);

  });

});

const { div } = require('./math_operations.js');

describe('div', () => {
  test('should correctly divide two positive numbers', () => {
    expect(div(10, 2)).toBe(5);
  });

  test('should handle division with zero as the dividend', () => {
    expect(div(0, 2)).toBe(0);
  });

  test('should handle division with zero as the divisor', () => {
    expect(() => div(10, 0)).toThrow();
  });


  test('should correctly divide two negative numbers', () => {
    expect(div(-10, -2)).toBe(5);
  });

  test('should correctly divide a positive number by a negative number', () => {
    expect(div(10, -2)).toBe(-5);
  });

  test('should correctly divide a negative number by a positive number', () => {
    expect(div(-10, 2)).toBe(-5);
  });

  test('should handle division with null values', () => {
    expect(() => div(10, null)).toThrow();
    expect(() => div(null, 2)).toThrow();
    expect(() => div(null, null)).toThrow();
  });

  test('should handle division with undefined values', () => {
    expect(() => div(10, undefined)).toThrow();
    expect(() => div(undefined, 2)).toThrow();
    expect(() => div(undefined, undefined)).toThrow();
  });

  test('should handle division with decimal numbers', () => {
    expect(div(10.5, 2.5)).toBe(4.2);
  });

  test('should handle division resulting in a decimal number', () => {
    expect(div(10, 3)).toBe(10/3);
  });
});