import minimist from "minimist";


type Args = {
  dry: string
  preid: string
  skipBuild: boolean
}

export const args = minimist<Partial<Args>>(process.argv.slice(2), {
  alias: {
    dry: "dry",
    pre: "preid",
    sb: "skipBuild",
  },
  default: {
    dry: false,
    pre: undefined,
    sb: false,
  }
})
