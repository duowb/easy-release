import { run, step } from "./utils";
import { args } from "./command";
import changelog from "./changelog";
import { selectVersion } from "./version";
import { gitPush, gitCommit } from "./git";
import { publishPackage } from "./publish";

const main = async () => {
  const info = await selectVersion();

  if (!args.skipBuild) {
    step("Building...");
    await run("npm run build");
  }

  if (!args.skipChangelog) {
    step("Generating changelog...");
    await changelog();
  }

  await gitCommit(info);

  await publishPackage(info);

  await gitPush(info);
};

main();
