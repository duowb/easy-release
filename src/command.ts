import minimist from "minimist";
import { CommandArgs } from "./types";

export const args = minimist<CommandArgs>(process.argv.slice(2), {
  alias: {
    dry: "dry",
    pre: "preid",
    sb: "skipBuild",
    sc: "skipChangelog",
    sp: "skipPublish",
  },
  default: {
    dry: false,
    pre: undefined,
    sb: false,
    sc: false,
    sp: false,
  },
});
