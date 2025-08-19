const { add, multiply, sub } = require('./math_operations.js');
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
    expect(add(5, undefined)).toBeNaN();
    expect(add(undefined, 5)).toBeNaN();
    expect(add(undefined, undefined)).toBeNaN();
  });

  test('should handle adding with floating-point numbers', () => {
    expect(add(2.5, 3.5)).toBe(6);
    expect(add(-2.5, 3.5)).toBe(1);
  });

  test('should handle adding large numbers', () => {
    expect(add(1000000, 2000000)).toBe(3000000);
  });

  test('should handle adding strings that can be coerced to numbers', () => {
    expect(add('2', '3')).toBe(5);
    expect(add('2', 3)).toBe(5);
    expect(add(2, '3')).toBe(5);
  })

  test('should handle adding strings that cannot be coerced to numbers', () => {
    expect(add('a', 'b')).toBe('ab');
    expect(add('a', 2)).toBe('a2');
    expect(add(2, 'a')).toBe('2a');
  })

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


  test('should handle floating-point numbers', () => {
    expect(multiply(2.5, 3)).toBeCloseTo(7.5);
    expect(multiply(2, 3.5)).toBeCloseTo(7);
  });

});

const { sub } = require('./math_operations.js');

describe('sub', () => {
  test('should correctly subtract two positive numbers', () => {
    expect(sub(5, 2)).toBe(3);
  });

  test('should handle subtracting with zero', () => {
    expect(sub(5, 0)).toBe(5);
  });

  test('should handle subtracting zero from a number', () => {
    expect(sub(0, 5)).toBe(-5);
  });


  test('should correctly subtract two negative numbers', () => {
    expect(sub(-5, -2)).toBe(-3);
  });

  test('should handle subtracting a negative number from a positive number', () => {
    expect(sub(5, -2)).toBe(7);
  });

  test('should handle subtracting a positive number from a negative number', () => {
    expect(sub(-5, 2)).toBe(-7);
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
});