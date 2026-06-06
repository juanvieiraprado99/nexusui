export type ComponentRegistry = {
  name: string;
  version: string;
  basePath: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: string[];
};
