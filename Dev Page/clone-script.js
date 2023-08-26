import { execSync } from "child_process";
import { existsSync } from "fs";

const repoUrl = "https://github.com/SavAct/App.git";
const targetFolder = "savact.app";

// Delete the folder if it exists already
if (existsSync(targetFolder)) {
  execSync(
    process.platform === "win32"
      ? `rmdir /s /q "${targetFolder}"`
      : `rm -rf "${targetFolder}"`
  );
}

// Clone the repository
execSync(`git clone ${repoUrl} "${targetFolder}"`);
