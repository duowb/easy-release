import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/index"],
  replace: {
    'import.meta.vitest': 'undefined',
  },
  // externals: ["conventional-changelog"],
  clean: true,
  declaration: false,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
});
