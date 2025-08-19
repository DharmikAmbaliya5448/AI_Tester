// FILE: src/core/function_locator.js
// This module is updated with a new function to find existing tests.

/**
 * Extracts function and class names from a source code string.
 * @param {string} code - The source code content.
 * @returns {{functions: string[], classes: string[]}} An object with arrays of names.
 */
function findFunctionsAndClasses(code) {
  const functions = [];
  const classes = [];
  const functionRegex = /function\s+([a-zA-Z0-9_]+)\s*\(/g;
  let match;
  while ((match = functionRegex.exec(code)) !== null) {
    functions.push(match[1]);
  }
  const classRegex = /class\s+([a-zA-Z0-9_]+)\s*\{/g;
  while ((match = classRegex.exec(code)) !== null) {
    classes.push(match[1]);
  }
  return { functions, classes };
}

/**
 * Extracts the full source code block for a specific function or class.
 * @param {string} code - The entire file content.
 * @param {string} name - The name of the function or class to find.
 * @returns {string|null} The source code of the item, or null if not found.
 */
function getSourceCode(code, name) {
  const regex = new RegExp(`(?:function|class)\\s+${name}[\\s\\S]*?\\{`);
  const match = code.match(regex);
  if (match) {
    const startIndex = match.index;
    const codeAfterStart = code.substring(startIndex);
    let openBraces = 0;
    let endIndex = -1;
    for (let i = 0; i < codeAfterStart.length; i++) {
      if (codeAfterStart[i] === "{") openBraces++;
      else if (codeAfterStart[i] === "}") {
        openBraces--;
        if (openBraces === 0) {
          endIndex = startIndex + i + 1;
          break;
        }
      }
    }
    return endIndex !== -1 ? code.substring(startIndex, endIndex) : match[0];
  }
  return null;
}

/**
 * NEW FUNCTION: Finds all functions that are already tested in a Jest file.
 * It looks for `describe('functionName', ...)` blocks.
 * @param {string} testFileContent - The content of the .test.js file.
 * @returns {string[]} An array of function names that already have tests.
 */
function findExistingTests(testFileContent) {
  const testedFunctions = [];
  const describeRegex = /describe\s*\(\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = describeRegex.exec(testFileContent)) !== null) {
    testedFunctions.push(match[1]);
  }
  return testedFunctions;
}

module.exports = {
  findFunctionsAndClasses,
  getSourceCode,
  findExistingTests, // Export the new function
};
