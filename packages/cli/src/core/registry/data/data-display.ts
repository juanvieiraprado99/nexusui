import type { ComponentRegistry } from './types';

export const dataDisplayRegistry: ComponentRegistry[] = [
  {
    name: 'data-table',
    basePath: 'components/data-table',
    registryDependencies: ['utils', 'checkbox', 'skeleton', 'dropdown-menu'],
    dependencies: ['class-variance-authority', '@angular/common'],
    files: [
      'data-table.component.ts',
      'data-table-empty.component.ts',
      'data-table-column-toggle.component.ts',
      'data-table.tokens.ts',
      'data-table.types.ts',
      'data-table.variants.ts',
      'index.ts',
    ],
  },
  {
    name: 'accordion',
    basePath: 'components/accordion',
    registryDependencies: ['utils'],
    dependencies: ['class-variance-authority'],
    files: [
      'accordion.component.ts',
      'accordion-item.component.ts',
      'accordion-trigger.component.ts',
      'accordion-content.component.ts',
      'accordion.tokens.ts',
      'accordion.variants.ts',
      'index.ts',
    ],
  },
  {
    name: 'collapsible',
    basePath: 'components/collapsible',
    registryDependencies: ['utils'],
    dependencies: ['class-variance-authority'],
    files: [
      'collapsible.component.ts',
      'collapsible-trigger.component.ts',
      'collapsible-content.component.ts',
      'collapsible.tokens.ts',
      'collapsible.variants.ts',
      'index.ts',
    ],
  },
  {
    name: 'pagination',
    basePath: 'components/pagination',
    registryDependencies: ['utils', 'select'],
    dependencies: ['class-variance-authority'],
    files: ['pagination.component.ts', 'pagination.variants.ts', 'index.ts'],
  },
];
