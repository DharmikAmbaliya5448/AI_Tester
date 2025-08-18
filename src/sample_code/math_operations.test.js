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

const { div } = require('./math_operations.js');

describe('div', () => {
  test('should correctly divide two positive numbers', () => {
    expect(div(10, 2)).toBe(5);
  });

  test('should handle division with zero as the numerator', () => {
    expect(div(0, 5)).toBe(0);
  });

  test('should throw an error when dividing by zero', () => {
    expect(() => div(5, 0)).toThrow();
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

  test('should handle division with floating-point numbers', () => {
    expect(div(10.5, 2.5)).toBe(4.2);
  });


  test('should return Infinity when dividing a number by zero', () => {
    expect(div(10,0)).toBe(Infinity);
  });


  test('should return -Infinity when dividing a negative number by zero', () => {
    expect(div(-10,0)).toBe(-Infinity);
  });

  test('should return NaN when dividing zero by zero', () => {
    expect(div(0,0)).toBe(NaN);
  });

  test('should handle null values correctly', () => {
    expect(() => div(null, 5)).toThrow();
    expect(() => div(5, null)).toThrow();
    expect(() => div(null, null)).toThrow();
  });

  test('should handle undefined values correctly', () => {
    expect(() => div(undefined, 5)).toThrow();
    expect(() => div(5, undefined)).toThrow();
    expect(() => div(undefined, undefined)).toThrow();
  });
});

const { pow } = require('./math_operations.js');

describe('pow', () => {
  test('should correctly calculate power of positive numbers', () => {
    expect(pow(2, 3)).toBe(8);
    expect(pow(5, 2)).toBe(25);
  });

  test('should handle power of zero', () => {
    expect(pow(0, 2)).toBe(0);
    expect(pow(5, 0)).toBe(1);
    expect(pow(0,0)).toBe(1);
  });

  test('should handle power with negative base', () => {
    expect(pow(-2, 3)).toBe(-8);
    expect(pow(-2, 2)).toBe(4);
  });

  test('should handle power with negative exponent', () => {
    expect(pow(2, -2)).toBe(0.25);
    expect(pow(4,-1)).toBe(0.25);

  });

  test('should handle edge cases', () => {
    expect(pow(1,1)).toBe(1);
    expect(pow(1,0)).toBe(1);
    expect(pow(0,1)).toBe(0);

  });


  test('should handle non-number inputs', () => {
    expect(() => pow(null, 2)).toThrow();
    expect(() => pow(2, null)).toThrow();
    expect(() => pow('a',2)).toThrow();
    expect(() => pow(2,'a')).toThrow();
    expect(() => pow(undefined, 2)).toThrow();
    expect(() => pow(2,undefined)).toThrow();

  });
});

const { mod } = require('./math_operations.js');

describe('mod', () => {
  test('should correctly calculate the modulo of two positive numbers', () => {
    expect(mod(10, 3)).toBe(1);
  });

  test('should handle modulo with zero as the divisor', () => {
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

  test('should handle modulo with zero as the dividend', () => {
    expect(mod(0, 3)).toBe(0);
  });

  test('should handle modulo where the dividend is equal to the divisor', () => {
    expect(mod(10,10)).toBe(0);
  });

  test('should handle modulo where the dividend is less than the divisor', () => {
    expect(mod(5,10)).toBe(5);
  });


  test('should handle null values', () => {
    expect(() => mod(null, 5)).toThrow();
  });

  test('should handle undefined values', () => {
    expect(() => mod(undefined, 5)).toThrow();
  });

});