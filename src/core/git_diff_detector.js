// FILE: src/core/git_diff_detector.js
// This module is responsible for detecting which files have been changed in Git.

const simpleGit = require("simple-git");

const git = simpleGit();

/**
 * Gets a list of staged files from Git that have been modified.
 * @returns {Promise<string[]>} A promise that resolves to an array of file paths.
 */
async function getStagedFiles() {
  try {
    // Executes 'git diff --cached --name-only' to get staged files.
    const diff = await git.diff(["--cached", "--name-only"]);
    if (!diff) {
      console.log("No changes in the Git staging area.");
      return [];
    }
    // Splits the output into an array of file names and filters for .js files.
    return diff.split("\n").filter((file) => file.endsWith(".js") && file);
  } catch (error) {
    console.error("Error detecting Git diff:", error);
    return [];
  }
}

module.exports = { getStagedFiles };
