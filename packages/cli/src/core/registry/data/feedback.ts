import type { ComponentRegistry } from './types';

export const feedbackRegistry: ComponentRegistry[] = [
  {
    name: 'alert',
    version: '1.0.0',
    basePath: 'components/alert',
    registryDependencies: ['utils'],
    dependencies: ['class-variance-authority'],
    files: ['alert.component.ts', 'alert.variants.ts', 'index.ts'],
  },
  {
    name: 'sonner',
    version: '1.0.0',
    basePath: 'components/sonner',
    registryDependencies: ['utils'],
    dependencies: ['class-variance-authority', 'ngx-sonner'],
    files: ['sonner.component.ts', 'sonner.variants.ts', 'index.ts'],
  },
  {
    name: 'progress-bar',
    version: '1.1.0',
    basePath: 'components/progress-bar',
    registryDependencies: ['utils'],
    dependencies: ['class-variance-authority'],
    files: ['progress-bar.component.ts', 'progress-bar.variants.ts', 'index.ts'],
  },
];
