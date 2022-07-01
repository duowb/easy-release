export type CommandArgs = {
  dry?: string;
  preid?: string;
  skipBuild?: boolean;
  skipChangelog?: boolean;
  skipPublish?: boolean;
};

export type PackageInfo = {
  name: string;
  version: string;
};
