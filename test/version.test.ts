import { afterEach, describe, expect, test, vi } from "vitest";
import type { PromptObject } from "prompts";

import { selectVersion } from "../src/version";

describe("version", () => {
  vi.mock("prompts", () => {
    return {
      default: ({ type, name, choices }: PromptObject) => {
        const n = name as string;
        if (type === "select") {
          const v = choices![0].value;
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

  test("selectVersion", async  () => {
    const info = await selectVersion()
    expect(info.name).toBe("easy-release");
    expect(info.version).toMatchInlineSnapshot('"0.0.8"')
  });

  afterEach(() => {
    vi.unmock("fs"); // 每次测试运行后清除测试数据
  });
});
