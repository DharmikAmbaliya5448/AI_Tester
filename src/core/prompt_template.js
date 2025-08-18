// FILE: src/core/prompt_template.js

/**
 * Creates a prompt to generate a Jest unit test for a given function.
 * @param {string} itemCode - The source code of the function or class to test.
 * @param {string} itemName - The name of the function or class.
 * @param {string} fileName - The name of the file containing the code.
 * @returns {string} A fully formatted prompt for the LLM.
 */
function createJestPrompt(itemCode, itemName, fileName) {
  return `
    **Task**: Generate Jest unit tests for the following JavaScript code using the CommonJS format.

    **Context**:
    - Testing Framework: Jest
    - Module System: CommonJS (use 'require' for imports)
    - File Name: \`${fileName}\`
    - Code to be tested:
    \`\`\`javascript
    ${itemCode}
    \`\`\`

    **Instructions**:
    1.  Write comprehensive unit tests for the function/class \`${itemName}\`.
    2.  Include tests for common cases and edge cases (e.g., null, undefined, zero, negative numbers).
    3.  The response must ONLY contain the Jest test code. Do not add any explanations, introductory text, or markdown formatting like \`\`\`javascript.
    4.  The test code must be complete and ready to execute.
    5.  Import the item correctly using \`require\`. For example: \`const { ${itemName} } = require('./${fileName}');\`

    **Example of a good test**:
    \`\`\`javascript
    const { add } = require('./math_operations.js');

    describe('add', () => {
      test('should correctly add two positive numbers', () => {
        expect(add(2, 3)).toBe(5);
      });

      test('should handle adding with zero', () => {
        expect(add(5, 0)).toBe(5);
      });
    });
    \`\`\`

    Now, generate the Jest tests for the provided code.
  `;
}

module.exports = { createJestPrompt };
