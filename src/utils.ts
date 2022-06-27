import chalk from "chalk";
import execa from "execa";
import fs from "fs";
import path from 'path';
// 获取运行指令后面的参数
import { args } from "./command";

const isDryRun = args.dry;
export const run = (bin: string, arg: string[], opts = {}) =>
  execa(bin, arg, { stdio: "inherit", ...opts });

export const dryRun = async (bin: string, arg: string[], opts = {}) =>
  console.log(chalk.blue(`[dryrun] ${bin} ${arg.join(" ")}`), opts);

export const runIfNotDry = isDryRun ? dryRun : run;

export const step = (msg: unknown) => console.log(chalk.cyan(msg));

const pkgPath = path.resolve(process.cwd(), 'package.json');

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
