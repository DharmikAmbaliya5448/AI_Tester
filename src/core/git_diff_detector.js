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
    // Get the staged diff with content
    const diffResult = await git.diff(["--cached", "--unified=0"]);
    if (!diffResult) {
      console.log("No changes in the Git staging area.");
      return { files: [], changes: {} };
    }

    // Parse the diff to get both files and their changes
    const files = [];
    const changes = {};
    
    const diffLines = diffResult.split('\n');
    let currentFile = null;
    
    for (const line of diffLines) {
      if (line.startsWith('diff --git')) {
        // New file in diff
        currentFile = line.split(' b/')[1];
        if (currentFile.endsWith('.js')) {
          files.push(currentFile);
          changes[currentFile] = { added: [], modified: [] };
        }
      } else if (currentFile && currentFile.endsWith('.js')) {
        // Track added/modified lines
        if (line.startsWith('+') && !line.startsWith('+++')) {
          changes[currentFile].added.push(line.substring(1));
        } else if (line.startsWith('-') && !line.startsWith('---')) {
          changes[currentFile].modified.push(line.substring(1));
        }
      }
    }

    return { files: files.filter(f => f.endsWith('.js')), changes };
  } catch (error) {
    console.error("Error detecting Git diff:", error);
    return { files: [], changes: {} };
  }
}

module.exports = { getStagedFiles };
