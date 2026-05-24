import type { ComponentRegistry } from './types';

export const primitivesRegistry: ComponentRegistry[] = [
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
    name: 'badge',
    basePath: 'components/badge',
    registryDependencies: ['utils'],
    dependencies: ['class-variance-authority'],
    files: ['badge.component.ts', 'badge.variants.ts', 'index.ts'],
  },
  {
    name: 'separator',
    basePath: 'components/separator',
    registryDependencies: ['utils'],
    dependencies: ['class-variance-authority'],
    files: ['separator.component.ts', 'separator.variants.ts', 'index.ts'],
  },
  {
    name: 'skeleton',
    basePath: 'components/skeleton',
    registryDependencies: ['utils'],
    files: ['skeleton.component.ts', 'index.ts'],
  },
  {
    name: 'avatar',
    basePath: 'components/avatar',
    registryDependencies: ['utils', 'badge'],
    dependencies: ['class-variance-authority', '@angular/common'],
    files: [
      'avatar.component.ts',
      'avatar-group.component.ts',
      'avatar.variants.ts',
      'index.ts',
    ],
  },
  {
    name: 'image',
    basePath: 'components/image',
    registryDependencies: ['utils'],
    dependencies: ['class-variance-authority', '@angular/common'],
    files: ['image.component.ts', 'image.variants.ts', 'index.ts'],
  },
  {
    name: 'label',
    basePath: 'components/label',
    registryDependencies: ['utils'],
    files: ['label.component.ts', 'index.ts'],
  },
  {
    name: 'card',
    basePath: 'components/card',
    registryDependencies: ['utils'],
    dependencies: ['class-variance-authority'],
    files: ['card.component.ts', 'card.variants.ts', 'index.ts'],
  },
];
