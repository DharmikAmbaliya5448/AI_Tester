// FILE: src/core/function_locator.js
// This module parses a given string of code to find function and class names.

/**
 * Extracts function and class definitions from a string of code.
 * This is a simplified implementation using regular expressions.
 * @param {string} code - The source code content as a string.
 * @returns {{functions: string[], classes: string[]}} An object containing arrays of found function and class names.
 */
function findFunctionsAndClasses(code) {
  const functions = [];
  const classes = [];

  // Regex to find function declarations: function functionName(...)
  const functionRegex = /function\s+([a-zA-Z0-9_]+)\s*\(/g;
  let match;
  while ((match = functionRegex.exec(code)) !== null) {
    functions.push(match[1]);
  }

  // Regex to find class declarations: class ClassName { ... }
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
  // This regex looks for both 'function functionName' and 'class className'.
  const regex = new RegExp(`(?:function|class)\\s+${name}[\\s\\S]*?\\{`);
  const match = code.match(regex);

  if (match) {
    const startIndex = match.index;
    const codeAfterStart = code.substring(startIndex);

    let openBraces = 0;
    let endIndex = -1;

    // Loop through the string to find the matching closing brace.
    for (let i = 0; i < codeAfterStart.length; i++) {
      if (codeAfterStart[i] === "{") {
        openBraces++;
      } else if (codeAfterStart[i] === "}") {
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

module.exports = { findFunctionsAndClasses, getSourceCode };
