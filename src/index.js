// FILE: src/index.js
// This file is updated to automatically add, commit, and push the generated test file to Git.

require("dotenv").config(); // Load environment variables at the top.

const fs = require("fs/promises");
const path = require("path");
const simpleGit = require("simple-git"); // Import simple-git
const { getStagedFiles } = require("./core/git_diff_detector.js");
const {
  findFunctionsAndClasses,
  getSourceCode,
} = require("./core/function_locator.js");
const { createJestPrompt } = require("./core/prompt_template.js");
const { generateTestCode } = require("./core/llm_integration.js");

const git = simpleGit(); // Initialize simple-git

async function main() {
  console.log("Starting AI Unit Test Generator...");

  // Using path.resolve with __dirname to create a reliable, absolute path.
  const changedFiles = [
    path.resolve(__dirname, "sample_code/math_operations.js"),
  ];

  if (changedFiles.length === 0) {
    console.log("No new/changed JavaScript files to test.");
    return;
  }

  console.log(`Found changed files: ${changedFiles.join(", ")}`);

  for (const filePath of changedFiles) {
    try {
      // 1. Read the content of the changed file.
      const fileContent = await fs.readFile(filePath, "utf-8");
      const baseName = path.basename(filePath, ".js");

      // 2. Find all functions and classes in the file.
      const { functions, classes } = findFunctionsAndClasses(fileContent);
      const itemsToTest = [...functions, ...classes];

      if (itemsToTest.length === 0) {
        console.log(`No functions or classes found in '${filePath}'.`);
        continue;
      }

      console.log(
        `Found items to test in '${filePath}': ${itemsToTest.join(", ")}`
      );
      let allTestsContent = "";

      for (const itemName of itemsToTest) {
        // 3. Get the source code for each item.
        const itemCode = getSourceCode(fileContent, itemName);
        if (!itemCode) continue;

        // 4. Create a prompt for the AI model.
        const prompt = createJestPrompt(itemCode, itemName, baseName + ".js");

        // 5. Call the AI model to generate the test code.
        console.log(`Generating tests for '${itemName}'...`);
        const generatedTest = await generateTestCode(prompt);
        allTestsContent += generatedTest + "\n\n";
      }

      // 6. Write the generated tests to a new file.
      if (allTestsContent) {
        const testFileName = `${baseName}.test.js`;
        const testFilePath = path.join(path.dirname(filePath), testFileName);
        await fs.writeFile(testFilePath, allTestsContent.trim());
        console.log(`✅ Successfully created test file at: ${testFilePath}`);

        // 7. NEW: Automatically add, commit, and push the file to Git.
        console.log("\nStarting Git operations...");
        try {
          // Git Add
          await git.add(testFilePath);
          console.log(`Git: Added '${testFileName}' to the staging area.`);

          // Git Commit
          const commitMessage = `feat: Add AI-generated tests for ${baseName}`;
          await git.commit(commitMessage);
          console.log(`Git: Committed with message "${commitMessage}"`);

          // Git Push
          // NOTE: This assumes your remote is named 'origin' and branch is 'main'.
          await git.push("origin", "main");
          console.log(`✅ Git: Successfully pushed changes to origin/main.`);
        } catch (gitError) {
          console.error("❌ Git operation failed:", gitError.message);
          console.error(
            "Please ensure your repository is configured correctly (e.g., remote 'origin' exists) and you have the necessary permissions."
          );
        }
      }
    } catch (error) {
      console.error(`Failed to process file '${filePath}':`, error);
    }
  }

  console.log("\nProcess finished.");
}

main();
