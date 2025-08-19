const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

async function generateTestCode(prompt) {
  if (!API_KEY) {
    console.error("GEMINI_API_KEY not found. Please set it in your .env file.");
    return `// MOCK RESPONSE: API Key not configured.`;
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log("Sending request to Gemini model...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Successfully received response from model.");
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
