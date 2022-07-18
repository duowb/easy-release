import prompts from "prompts";
import semver from "semver";
import type { ReleaseType } from "semver";
import { args } from "./command";
import { getPkgInfo, step, updatePkgInfo } from "./utils";
import { PackageInfo } from "./types";

const { prerelease, inc, valid } = semver;
const { name: publishedName, version: currentVersion } = getPkgInfo();
let targetVersion = args._[0] as string;
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

export async function selectVersion(): Promise<PackageInfo> {
  if (!targetVersion) {
    // select version
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
  const res = await confirmVersion();
  if (res) {
    step("Updating package versions...");
    updatePkgInfo(targetVersion);
    return { version: targetVersion, name: publishedName };
  } else {
    step("You rejected the current version");
    process.exit(1);
  }
}

export async function confirmVersion() {
  const { yes } = await prompts({
    type: "confirm",
    name: "yes",
    message: `Releasing ${publishedName} v${targetVersion}. Confirm?`,
  });
  return yes as boolean;
}
