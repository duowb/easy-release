import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import type { PromptObject } from "prompts";

afterEach(() => {
  vi.resetModules();
});
describe("version", () => {
  vi.mock("prompts", () => {
    return {
      default: ({ type, name, choices }: PromptObject) => {
        const n = name as string;
        if (type === "select" && choices) {
          let i = 0;
          if(choices.length > 3){
            i = 3
          }
          const v = choices[i].value;
          return {
            [n]: v,
          };
        } else if (type === "confirm") {
          return {
            [n]: true,
          };
        }
      },
    };
  });

  vi.mock("fs", () => {
    return {
      readFileSync: vi.fn().mockReturnValue(
        JSON.stringify({
          version: "0.0.7",
          name: "easy-release",
        })
      ),
      writeFileSync: vi.fn(),
    };
  });

  test("selectVersion", async () => {
    const { selectVersion } = await import("../src/version");
    const info = await selectVersion();
    expect(info.name).toBe("easy-release");
    expect(info.version).toMatchInlineSnapshot('"0.0.8"');
  });

  test("specified version", async () => {
    process.argv = ["123", "321", "0.0.9"];
    const { selectVersion } = await import("../src/version");
    const info = await selectVersion();
    expect(info.version).toMatchInlineSnapshot('"0.0.9"')
    expect(info.name).toMatchInlineSnapshot('"easy-release"')
  });

  
  test("specified pre = beta", async () => {
    process.argv = ["123", "321", "--pre=beta"];
    const { selectVersion } = await import("../src/version");
    const info = await selectVersion();
    expect(info.version).toMatchInlineSnapshot('"0.0.8-beta.0"')
    expect(info.name).toMatchInlineSnapshot('"easy-release"')
  });
});
