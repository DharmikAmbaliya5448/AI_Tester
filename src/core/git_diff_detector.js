const simpleGit = require("simple-git");
const git = simpleGit();

async function getChangedFilesSinceLastCommit() {
  try {
    // This command compares the last commit with the one before it.
    const diff = await git.diff(["HEAD~1", "HEAD", "--name-only"]);
    if (!diff) {
      console.log("No changes found between the last two commits.");
      return [];
    }
    // Returns an array of file names that were changed.
    return diff.split("\n").filter((file) => file.endsWith(".js") && file);
  } catch (error) {
    console.error("Error detecting Git diff between last two commits:", error);
    console.log(
      "This can happen if there is only one commit in the repository's history."
    );
    return [];
  }
}

module.exports = { getChangedFilesSinceLastCommit };
