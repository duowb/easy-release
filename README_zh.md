# easy-release
轻松发布新版本并推送。

### 注意:
因为changelog使用的是 `conventional-changelog` 所以,请先安装 `conventional-changelog`:
  ```sh
 npm i --save-dev conventional-changelog
  ```

## 安装 `easy-release`
```
npm i --save-dev easy-release
```
添加 [`npm run script`](https://docs.npmjs.com/cli/run-script) 到你的 `package.json`:

```json
{
  "scripts": {
    "release": "easy-release"
  }
}
```

## 配置

1. `--dry`:
   - 描述: 跳过 `git add` `git commit` `npm publish` `git tag` `git tag push` `git push`
   - 类型: `boolean`
   - 默认: `false`
   - 示例: `easy-release --dry`
  
2. `--pre`:
   - 描述: `beta` `alpha` ...
   - 类型: `string`
   - 默认: `''`
   - 示例: `easy-release --pre=beta`
    
3. `--sb`:
   - 描述: 跳过编译不运行 `npm run build`
   - 类型: `boolean`
   - 默认: `false`
   - 示例: `easy-release --sb`

4. `--sc`:
   - 描述: 跳过生成更新日志
   - 类型: `boolean`
   - 默认: `false`
   - 示例: `easy-release --sc`

5. `--sp`:
   - 描述: 跳过发布npm
   - 类型: `boolean`
   - 默认: `false`
   - 示例: `easy-release --sp`

6. `tag`:
   - 描述: npm publish --tag xxx
   - 类型: `string`
   - 默认: `''` if `--pre` value
   - 示例: `easy-release --tag=beta`


## Thank
modeled after the [vue release](https://github.com/vuejs/vue/blob/main/scripts/release.js). thank [vue](https://github.com/vuejs/vue)