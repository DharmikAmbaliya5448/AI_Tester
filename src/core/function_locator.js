// FILE: src/core/function_locator.js
// This module parses a given string of code to find function and class names.

/**
 * Extracts function and class definitions from a string of code.
 * This is a simplified implementation using regular expressions.
 * @param {string} code - The source code content as a string.
 * @returns {{functions: string[], classes: string[]}} An object containing arrays of found function and class names.
 */
function findFunctionsAndClasses(code, changes = null) {
  const functions = new Set();
  const classes = new Set();
  const newFunctions = new Set();
  const newClasses = new Set();

  // Regex to find function declarations: function functionName(...)
  const functionRegex = /function\s+([a-zA-Z0-9_]+)\s*\(/g;
  let match;

  // If we have diff changes, check which functions are new
  if (changes && changes.added) {
    changes.added.forEach(line => {
      while ((match = functionRegex.exec(line)) !== null) {
        newFunctions.add(match[1]);
      }
    });
  }

  // Find all functions in the code
  while ((match = functionRegex.exec(code)) !== null) {
    functions.add(match[1]);
  }

  // Regex to find class declarations: class ClassName { ... }
  const classRegex = /class\s+([a-zA-Z0-9_]+)\s*\{/g;
  
  // If we have diff changes, check which classes are new
  if (changes && changes.added) {
    changes.added.forEach(line => {
      while ((match = classRegex.exec(line)) !== null) {
        newClasses.add(match[1]);
      }
    });
  }

  // Find all classes in the code
  while ((match = classRegex.exec(code)) !== null) {
    classes.add(match[1]);
  }

  return {
    functions: Array.from(functions),
    classes: Array.from(classes),
    newFunctions: Array.from(newFunctions),
    newClasses: Array.from(newClasses)
  };
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
