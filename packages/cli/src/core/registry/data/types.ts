export type ComponentRegistry = {
  name: string;
  basePath: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: string[];
};
