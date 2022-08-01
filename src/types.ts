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
