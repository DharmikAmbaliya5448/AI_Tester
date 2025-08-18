// FILE: src/core/llm_integration.js
// This module has been updated to use the official @google/generative-ai library
// and load the API key from environment variables.

const { GoogleGenerativeAI } = require("@google/generative-ai");

// The API key is now loaded from the .env file via process.env
const API_KEY = process.env.GEMINI_API_KEY;

// Initialize the Google Generative AI client with your API key.
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Sends a prompt to the Gemini model and returns the generated test code.
 * @param {string} prompt - The prompt to send to the AI model.
 * @returns {Promise<string>} A promise that resolves to the generated test code.
 */
async function generateTestCode(prompt) {
  if (!API_KEY) {
    console.error("GEMINI_API_KEY not found. Please set it in your .env file.");
    return `// MOCK RESPONSE: API Key not configured.\ndescribe('mockTest', () => { test('should pass', () => { expect(true).toBe(true); }); });`;
  }

  try {
    // Get the generative model. 'gemini-1.5-flash' is a fast and capable model.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("Sending request to Gemini model via official library...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Successfully received response from model.");

    // Clean the response to remove markdown code fences.
    return text
      .replace(/```javascript/g, "")
      .replace(/```/g, "")
      .trim();
  } catch (error) {
    console.error("Error generating test code:", error);
    return `// An error occurred during test generation: ${error.message}`;
  }
}

module.exports = { generateTestCode };
