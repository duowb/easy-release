
[中文](./README_zh.md)

# easy-release
Easily publish new versions and push.

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

## Configuration

1. `--dry`:
   - describe: skip `git add` `git commit` `npm publish` `git tag` `git tag push` `git push`
   - type: `boolean`
   - default: `false`
   - example: `easy-release --dry`
  
2. `--pre`:
   - describe: example `beta` `alpha` ...
   - type: `string`
   - default: `''`
   - example: `easy-release --pre=beta`
    
3. `--sb`:
   - describe: skip build
   - type: `boolean`
   - default: `false`
   - example: `easy-release --sb`

4. `--sc`:
   - describe: skip changelog
   - type: `boolean`
   - default: `false`
   - example: `easy-release --sc`

5. `--sp`:
   - describe: skip publish
   - type: `boolean`
   - default: `false`
   - example: `easy-release --sp`

6. `tag`:
   - describe: npm publish --tag xxx
   - type: `string`
   - default: `''` if `--pre` value
   - example: `easy-release --tag=beta`


## Thank
modeled after the [vue release](https://github.com/vuejs/vue/blob/main/scripts/release.js). thank [vue](https://github.com/vuejs/vue)