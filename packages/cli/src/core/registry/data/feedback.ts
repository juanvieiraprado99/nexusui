import type { ComponentRegistry } from './types';

export const feedbackRegistry: ComponentRegistry[] = [
  {
    name: 'alert',
    basePath: 'components/alert',
    registryDependencies: ['utils'],
    dependencies: ['class-variance-authority'],
    files: ['alert.component.ts', 'alert.variants.ts', 'index.ts'],
  },
  {
    name: 'sonner',
    basePath: 'components/sonner',
    registryDependencies: ['utils'],
    dependencies: ['class-variance-authority', 'ngx-sonner'],
    files: ['sonner.component.ts', 'sonner.variants.ts', 'index.ts'],
  },
];
