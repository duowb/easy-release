# easy-release
Easily publish new versions and push, modeled after the [vue release](https://github.com/vuejs/vue/blob/main/scripts/release.js). thank [vue](https://github.com/vuejs/vue)

### Notice:
because changelog use `conventional-changelog` so please install `conventional-changelog`:
  ```sh
 npm i --save-dev conventional-changelog
  ```

## Installing `easy-release`
```
npm i --save-dev easy-release
```
Add an [`npm run` script](https://docs.npmjs.com/cli/run-script) to your `package.json`:

```json
{
  "scripts": {
    "release": "easy-release"
  }
}
```

## Help

``` sh
npm run release --help
```

## Configuration

1. `--dry`:
   - describe: skip `git add` `git commit` `npm publish` `git tag` `git tag push` `git push`
   - type: boolean
   - default: false
   - example: `easy-release --dry`
  
2. `--pre`:
   - describe: example `beta` `alpha` ...
   - type: string
   - default: ''
   - example: `easy-release --pre=beta`
    
3. `--sb`:
   - describe: skip build
   - type: boolean
   - default: false
   - example: `easy-release --sb`