import { log, logColor } from "./log";
import { PackageInfo } from "./types";
import { run, runIfNotDry, step } from "./utils";

export async function gitCommit({ version }: PackageInfo) {
  const { stdout } = await run("git diff", { stdio: "pipe" });
  if (stdout) {
    step("Committing changes...");
    await runIfNotDry("git add -A");
    // Use slash escape because it contains spaces
    await runIfNotDry(`git commit -m release:\\ v${version}`);
  } else {
    log("No changes to commit.", logColor.FgRed);
  }
}

export async function gitPush({ version }: PackageInfo) {
  step("Pushing to Git...");
  await runIfNotDry(`git tag v${version}`);
  await runIfNotDry(`git push origin refs/tags/v${version}`);
  await runIfNotDry("git push");
}
