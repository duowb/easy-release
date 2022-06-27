import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const args = yargs(hideBin(process.argv))
  .option("dry", {
    describe: "is dry run?",
    type: "boolean",
  })
  .option("preid", {
    alias: "pre",
    describe: "pre",
    type: 'string',
  })
  .option("skipBuild", {
    alias: "sb",
    describe: "skip build",
    type: 'boolean',
  })
  .help()
  .parseSync();
