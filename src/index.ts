import prompts from "prompts";
import { prerelease, inc, valid } from "semver";
import type { ReleaseType } from "semver";
import { getPkgInfo, run, step, updatePkgInfo, runIfNotDry } from "./utils";
import { args } from "./command";
import changelog from "./changelog";
import { log, logColor } from "./log";

const { name: publishedName, version: currentVersion } = getPkgInfo();
const preId = (args.preid ||
  (prerelease(currentVersion) && prerelease(currentVersion)![0])) as
  | string
  | undefined;

const preArr: Partial<ReleaseType>[] = preId
  ? ["prepatch", "preminor", "premajor", "prerelease"]
  : [];

const versionIncrements: Partial<ReleaseType>[] = [
  "patch",
  "minor",
  "major",
  ...preArr,
];

const main = async () => {
  let targetVersion = args._[0] as string;

  if (!targetVersion) {
    // 没有指定版本，就提供选择
    const { release } = await prompts({
      type: "select",
      name: "release",
      message: `Select ${publishedName} release type`,
      choices: versionIncrements.map((i) => {
        const ic = inc(currentVersion, i, preId);
        return {
          title: `${i} (${ic})`,
          value: `${ic}`,
        };
      }),
    });
    targetVersion = release;
  }
  if (!valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`);
  }

  const { yes } = await prompts({
    type: "confirm",
    name: "yes",
    message: `Releasing ${publishedName} v${targetVersion}. Confirm?`,
  });

  if (!yes) {
    return;
  }

  step("\nUpdating package versions...");
  updatePkgInfo(targetVersion);

  if (!args.skipBuild) {
    step("\nBuilding...");
    await run("npm run build");
  }

  step("\nGenerating changelog...");

  await changelog();

  const { stdout } = await run("git diff", { stdio: "pipe" });
  if (stdout) {
    step("\nCommitting changes...");
    await runIfNotDry("git add -A");
    // Use slash escape because it contains spaces
    await runIfNotDry(`git commit -m release:\\ v${targetVersion}`);
  } else {
    console.log("No changes to commit.");
  }
  // publish packages
  step("\nPublishing packages...");

  try {
    await runIfNotDry("npm publish", { stdio: "pipe" });
    console.log(
      log(
        `Successfully published ${publishedName}@${targetVersion}`,
        logColor.green
      )
    );
  } catch (error) {
    log(`Skipping already published: ${publishedName}`, logColor.red);
  }

  step("\nPushing to Git...");
  await runIfNotDry(`git tag v${targetVersion}`);
  await runIfNotDry(`git push origin refs/tags/v${targetVersion}`);
  await runIfNotDry("git push");
};

main();
