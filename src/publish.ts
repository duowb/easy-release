import { log, logColor } from "./log";
import { PackageInfo } from "./types";
import { runIfNotDry, step } from "./utils";

export async function publishPackage({ name, version }: PackageInfo) {
  // publish packages
  step("Publishing packages...");

  try {
    await runIfNotDry("npm publish", { stdio: "pipe" });
    log(`Successfully published ${name}@${version}`, logColor.FgGreen);
  } catch (error) {
    log(`${name} fail published. [error]${error}`, logColor.FgRed);
  }
}
