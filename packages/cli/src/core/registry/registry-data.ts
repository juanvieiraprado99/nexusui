export type ComponentRegistry = {
  name: string;
  basePath: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: string[];
};

export const registry: ComponentRegistry[] = [
  {
    name: 'utils',
    basePath: 'utils',
    dependencies: ['tailwind-merge', 'clsx'],
    files: ['merge-classes.ts', 'number.ts', 'form-control.ts', 'index.ts'],
  },
  {
    name: 'button',
    basePath: 'components/button',
    registryDependencies: ['utils'],
    dependencies: ['class-variance-authority'],
    files: ['button.component.ts', 'button.variants.ts', 'index.ts'],
  },
  {
    name: 'input',
    basePath: 'components/input',
    registryDependencies: ['utils'],
    dependencies: ['class-variance-authority', '@angular/forms'],
    files: ['input.component.ts', 'input.variants.ts', 'index.ts'],
  },
];
