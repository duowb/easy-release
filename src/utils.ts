import { execaCommand } from "execa";
import fs from "fs";
import path from "path";
// 获取运行指令后面的参数
import { args } from "./command";
import { logColor, log } from "./log";

const isDryRun = args.dry;
export const run = (command: string, opts = {}) =>
execaCommand(command, { stdio: "inherit", ...opts });

export const dryRun = async (command: string, opts = {}) =>
  log(
    `[dryRun] ${command}\n[options] ${JSON.stringify(opts)}`,
    logColor.FgBlue
  );

export const runIfNotDry = isDryRun ? dryRun : run;

export const step = (msg: string) => log(msg, logColor.BgMagenta);

const pkgPath = path.resolve(process.cwd(), "package.json");

export const getPkgInfo = () => {
  try {
    const { version, name } = JSON.parse(fs.readFileSync(pkgPath, "utf-8")) as {
      version: string;
      name: string;
    };
    return {
      version,
      name,
    };
  } catch (error) {
    throw new Error("not package info...");
  }
};

export const updatePkgInfo = (version: string) => {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  pkg.version = version;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
};
