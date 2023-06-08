import { execaCommand } from "execa";
import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { args } from "./command";
import { logColor, log } from "./log";
import { PackageInfo } from "./types";

type PackageManage = "npm" | "pnpm" | "yarn" | "bun";
export const LOCKS: Record<string, PackageManage> = {
  "bun.lockb": "bun",
  "pnpm-lock.yaml": "pnpm",
  "yarn.lock": "yarn",
  "package-lock.json": "npm",
  "npm-shrinkwrap.json": "npm",
};

const isDryRun = args.dry;
console.log("🚀 ~ file: utils.ts:18 ~ isDryRun:", isDryRun)
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
    throw new Error(`${pkgPath} not find package info...`);
  }
}

export function updatePkgInfo(version: string) {
  const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
  pkg.version = version;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
}

export function checkNpmPackageManage() {
  const cwd = process.cwd();
  for (const lock in LOCKS) {
    const lockPath = path.resolve(cwd, lock);
    const isExists = existsSync(lockPath);
    if (isExists) {
      return LOCKS[lock]
    }
  }
  return 'npm'
}
