export type CommandArgs = {
  dry?: string;
  preid?: string;
  skipBuild?: boolean;
  skipChangelog?: boolean;
  skipPublish?: boolean;
  tag?: string;
};

export type PackageInfo = {
  name: string;
  version: string;
};

export interface ChangelogConfig {
  types: Record<string, {
      title: string;
  }>;
  scopeMap: Record<string, string>;
  github: string;
  from: string;
  to: string;
}


export type EasyReleaseOptions = {
  /** skip `git add` `git commit` `npm publish` `git tag` `git tag push` `git push` */
  dry?: string;
  /** example `beta` `alpha` ... */
  preid?: string;
  /** skip `npm run build`  */
  skipBuild?: boolean;
  /** does not generate changelog  */
  skipChangelog?: boolean;
  /** skip `npm publish`  */
  skipPublish?: boolean;
  /** `npm publish --tag xxx`
   * 
   *  default: `''` if `--pre` value */
  tag?: string;

  changelogConfig: Partial<ChangelogConfig>
}