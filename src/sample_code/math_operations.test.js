const { div } = require('./math_operations.js');

describe('div', () => {
  test('should correctly divide two positive numbers', () => {
    expect(div(10, 2)).toBe(5);
  });

  test('should handle division by one', () => {
    expect(div(5, 1)).toBe(5);
  });

  test('should handle division resulting in a decimal', () => {
    expect(div(10, 3)).toBeCloseTo(3.3333333333333335);
  });

  test('should handle division with zero as numerator', () => {
    expect(div(0, 5)).toBe(0);
  });

  test('should throw an error when dividing by zero', () => {
    expect(() => div(5, 0)).toThrow();
  });


  test('should handle division of negative numbers', () => {
    expect(div(-10, 2)).toBe(-5);
  });

  test('should handle division of a positive number by a negative number', () => {
    expect(div(10, -2)).toBe(-5);
  });

  test('should handle division of negative numbers resulting in a positive number', () => {
    expect(div(-10, -2)).toBe(5);
  });

  test('should handle division with null values', () => {
    expect(() => div(null, 5)).toThrow();
    expect(() => div(5, null)).toThrow();
    expect(() => div(null, null)).toThrow();

  });

  test('should handle division with undefined values', () => {
    expect(() => div(undefined, 5)).toThrow();
    expect(() => div(5, undefined)).toThrow();
    expect(() => div(undefined, undefined)).toThrow();
  });
});

const { pow } = require('./math_operations.js');

describe('pow', () => {
  test('should correctly calculate power for positive numbers', () => {
    expect(pow(2, 3)).toBe(8);
    expect(pow(5, 2)).toBe(25);
  });

  test('should handle power with zero', () => {
    expect(pow(0, 2)).toBe(0);
    expect(pow(5, 0)).toBe(1);
    expect(pow(0,0)).toBe(1);
  });

  test('should handle power with negative numbers', () => {
    expect(pow(-2, 3)).toBe(-8);
    expect(pow(2, -3)).toBe(0.125);
    expect(pow(-2, -3)).toBe(-0.125);

  });


  test('should handle edge cases', () => {
    expect(pow(1,1)).toBe(1);
    expect(pow(1,0)).toBe(1);
    expect(pow(0,1)).toBe(0);
    expect(() => pow(NaN,2)).toThrow();
    expect(() => pow(2,NaN)).toThrow();
    expect(() => pow(Infinity,2)).toThrow();
    expect(() => pow(2,Infinity)).toThrow();
    expect(() => pow(-Infinity,2)).toThrow();
    expect(() => pow(2,-Infinity)).toThrow();


  });

  test('should handle null and undefined inputs', () => {
    expect(() => pow(null, 2)).toThrow();
    expect(() => pow(2, null)).toThrow();
    expect(() => pow(undefined, 2)).toThrow();
    expect(() => pow(2, undefined)).toThrow();
  });
});