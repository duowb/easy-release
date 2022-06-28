import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    "./src/index"
  ],
  externals: [
    'chalk', 'semver', 'enquirer', 'execa', 'yargs', 'conventional-changelog'
  ],
  clean: true,
  declaration: false,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
})