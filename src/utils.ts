import { execaCommand } from "execa";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { args } from "./command";
import { logColor, log } from "./log";
import { PackageInfo } from "./types";

const isDryRun = args.dry;
export const run = (command: string, opts = {}) =>
  execaCommand(command, { stdio: "inherit", ...opts });

export const dryRun = async (command: string, opts = {}) => {
  console.log();
  log(`[dryRun] ${command}`, logColor.FgBlue);
  log(`[options] ${JSON.stringify(opts)}`, logColor.FgYellow);
};

export const runIfNotDry = isDryRun ? dryRun : run;

export const step = (msg: string) => {
  console.log();
  log(msg, logColor.BgMagenta);
};

const pkgPath = path.resolve(process.cwd(), "package.json");

export function getPkgInfo() {
  try {
    const { version, name } = JSON.parse(
      readFileSync(pkgPath, "utf-8")
    ) as PackageInfo;
    return {
      version,
      name,
    };
  } catch (error) {
    throw new Error("not package info...");
  }
}

export function updatePkgInfo(version: string) {
  const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
  pkg.version = version;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
}
