import cc from "conventional-changelog";
import fs from "fs";

const CWD = process.cwd();
const changeLogPath = `${CWD}/CHANGELOG.md`;
const START_OF_LAST_RELEASE_PATTERN = /(^#+ \[?\d+\.\d+\.\d+|<a name=)/m;

export default async function changelog() {
  const releaseCount = fs.existsSync(changeLogPath) ? 1 : 0;
  let content = "",
    oldContent = "";
  if (releaseCount === 1) {
    oldContent = fs.readFileSync(changeLogPath, "utf-8");
    const oldContentStart = oldContent.search(START_OF_LAST_RELEASE_PATTERN);
    // find the position of the last release and remove header:
    if (oldContentStart !== -1) {
      oldContent = oldContent.substring(oldContentStart);
    }
  }
  return new Promise((res, rej) => {
    cc({
      preset: {
        name: "conventionalcommits",
        types: [
          { type: "feat", section: "Features" },
          { type: "fix", section: "Bug Fixes" },
          { type: "chore", hidden: true },
          { type: "docs", hidden: true },
          { type: "style", hidden: true },
          { type: "refactor", hidden: true },
          { type: "perf", hidden: true },
          { type: "test", hidden: true },
        ],
      } as any,
      releaseCount,
    })
      .on("error", function (err) {
        console.error(err.toString());
        rej();
        process.exit(1);
      })
      .on("data", (buffer) => {
        content += buffer.toString();
      })
      .on("end", () => {
        fs.writeFileSync(changeLogPath, content + oldContent, "utf8");
        res(true);
      });
  });
}

changelog()