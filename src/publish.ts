import { log, logColor } from "./log";
import { PackageInfo } from "./types";
import { args } from "./command";
import { runIfNotDry, step } from "./utils";

export async function publishPackage({ name, version }: PackageInfo) {
  // publish packages
  step("Publishing packages...");
  let releaseTag = '';
  if (args.tag) {
    releaseTag = args.tag;
  } else if (version.includes("alpha")) {
    releaseTag = "alpha";
  } else if (version.includes("beta")) {
    releaseTag = "beta";
  } else if (version.includes("rc")) {
    releaseTag = "rc";
  }

  try {
    const tag = releaseTag ? `--tag ${releaseTag}` : "";
    await runIfNotDry(`npm publish ${tag}`, { stdio: "pipe" });
    log(`Successfully published ${name}@${version}`, logColor.FgGreen);
  } catch (error) {
    log(`${name} fail published. [error]${error}`, logColor.FgRed);
  }
}
