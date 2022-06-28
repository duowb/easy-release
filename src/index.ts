import enquirer from "enquirer";
import semver, { ReleaseType } from "semver";
import chalk from "chalk";
import { getPkgInfo, run, step, updatePkgInfo, runIfNotDry } from "./utils";
import { args } from "./command";
import changelog from "./changelog";

const { prompt } = enquirer;

const { name: publishedName, version: currentVersion } = getPkgInfo();
const preId = (args.preid ||
  (semver.prerelease(currentVersion) &&
    semver.prerelease(currentVersion)![0])) as string | undefined;

const preArr: Partial<ReleaseType>[] = preId
  ? ["prepatch", "preminor", "premajor", "prerelease"]
  : [];

const versionIncrements: Partial<ReleaseType>[] = [
  "patch",
  "minor",
  "major",
  ...preArr,
];

const inc = (i: ReleaseType) => semver.inc(currentVersion, i, preId);

const main = async () => {
  let targetVersion = args._[0] as string;

  if (!targetVersion) {
    // 没有指定版本，就提供选择
    const { release } = await prompt<{
      release: string;
    }>({
      type: "select",
      name: "release",
      message: `Select ${publishedName} release type`,
      choices: versionIncrements.map((i) => `${i} (${inc(i)})`),
    });
    const matchArray = release.match(/\((.*)\)/);
    if (Array.isArray(matchArray)) {
      targetVersion = matchArray[1];
    }
  }
  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`);
  }

  const { yes } = await prompt<{
    yes: boolean;
  }>({
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
    await run("npm", ["run", "build"]);
  }

  step("\nGenerating changelog...");

  await changelog();

  const { stdout } = await run("git", ["diff"], { stdio: "pipe" });
  if (stdout) {
    step("\nCommitting changes...");
    await runIfNotDry("git", ["add", "-A"]);
    await runIfNotDry("git", ["commit", "-m", `release: v${targetVersion}`]);
  } else {
    console.log("No changes to commit.");
  }
  // publish packages
  step("\nPublishing packages...");

  try {
    await runIfNotDry("npm", ["publish"], { stdio: "pipe" });
    console.log(
      chalk.green(`Successfully published ${publishedName}@${targetVersion}`)
    );
  } catch (error) {
    console.log(chalk.red(`Skipping already published: ${publishedName}`));
  }

  step("\nPushing to Git...");
  await runIfNotDry("git", ["tag", `v${targetVersion}`]);
  await runIfNotDry("git", ["push", "origin", `refs/tags/v${targetVersion}`]);
  await runIfNotDry("git", ["push"]);
};

main();
