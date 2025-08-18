// FILE: src/index.js


const fs = require("fs/promises");
const path = require("path");
const simpleGit = require("simple-git");
const {
    getChangedFilesSinceLastCommit,
} = require("./core/git_diff_detector.js");
const {
    findFunctionsAndClasses,
    getSourceCode,
    findExistingTests,
} = require("./core/function_locator.js");
const { createJestPrompt } = require("./core/prompt_template.js");
const { generateTestCode } = require("./core/llm_integration.js");

const git = simpleGit();
require("dotenv").config();

async function main() {
  console.log("Starting AI Unit Test Generator...");

  const changedFilesRelative = await getChangedFilesSinceLastCommit();

  if (changedFilesRelative.length === 0) {
    console.log("No .js files were changed in the last commit. Exiting.");
    return;
  }

  const changedFiles = changedFilesRelative.map((file) =>
    path.resolve(process.cwd(), file)
  );

  console.log(`Found changed files in last commit: ${changedFiles.join(", ")}`);

  for (const filePath of changedFiles) {
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      const baseName = path.basename(filePath, ".js");
      const testFileName = `${baseName}.test.js`;
      const testFilePath = path.join(path.dirname(filePath), testFileName);

      const { functions } = findFunctionsAndClasses(fileContent);
      if (functions.length === 0) {
        console.log(`No functions found in '${filePath}'.`);
        continue;
      }

      let alreadyTestedFunctions = [];
      let isNewTestFile = true;
      try {
        const testFileContent = await fs.readFile(testFilePath, "utf-8");
        isNewTestFile = false;
        alreadyTestedFunctions = findExistingTests(testFileContent);
      } catch (error) {
        // Test file doesn't exist, which is fine.
      }

      const functionsToTest = functions.filter(
        (func) => !alreadyTestedFunctions.includes(func)
      );

      if (functionsToTest.length === 0) {
        console.log(
          `No new functions to test in ${baseName}.js. Everything is up to date.`
        );
        continue;
      }

      console.log(
        `New functions to test in ${baseName}.js: ${functionsToTest.join(", ")}`
      );
      let newTestsContent = "";

      for (const itemName of functionsToTest) {
        const itemCode = getSourceCode(fileContent, itemName);
        if (!itemCode) continue;

        const prompt = createJestPrompt(itemCode, itemName, baseName + ".js");
        console.log(`Generating tests for new function '${itemName}'...`);
        const generatedTest = await generateTestCode(prompt);
        newTestsContent += "\n" + generatedTest + "\n";
      }

      if (newTestsContent) {
        if (isNewTestFile) {
          const initialContent = `const { ${functions.join(
            ", "
          )} } = require('./${baseName}.js');\n`;
          await fs.writeFile(
            testFilePath,
            initialContent + newTestsContent.trim()
          );
        } else {
          await fs.appendFile(testFilePath, newTestsContent);
        }
        console.log(
          `✅ Successfully created/updated test file at: ${testFilePath}`
        );

        console.log("\nStarting Git operations...");
        await git.add(testFilePath);
        await git.commit(`feat: Add AI-generated tests for ${baseName}`);
        await git.push("origin", "main");
        console.log(`✅ Git: Successfully pushed test updates to origin/main.`);
      }
    } catch (error) {
      console.error(`Failed to process file '${filePath}':`, error);
    }
  }

  console.log("\nProcess finished.");
}

main();
