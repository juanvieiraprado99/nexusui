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
  {
    name: 'combobox',
    basePath: 'components/combobox',
    registryDependencies: ['utils'],
    dependencies: ['class-variance-authority', '@angular/forms', '@angular/cdk'],
    devDependencies: [],
    files: [
      'combobox.component.ts',
      'combobox-trigger.component.ts',
      'combobox-content.component.ts',
      'combobox-item.component.ts',
      'combobox-group.component.ts',
      'combobox-empty.component.ts',
      'combobox.tokens.ts',
      'combobox.variants.ts',
      'index.ts',
    ],
  },
  {
    name: 'checkbox',
    basePath: 'components/checkbox',
    registryDependencies: ['utils'],
    dependencies: ['class-variance-authority', '@angular/forms'],
    files: ['checkbox.component.ts', 'checkbox.variants.ts', 'index.ts'],
  },
  {
    name: 'skeleton',
    basePath: 'components/skeleton',
    registryDependencies: ['utils'],
    files: ['skeleton.component.ts', 'index.ts'],
  },
  {
    name: 'dropdown-menu',
    basePath: 'components/dropdown-menu',
    registryDependencies: ['utils'],
    dependencies: ['class-variance-authority', '@angular/cdk'],
    files: [
      'dropdown-menu.component.ts',
      'dropdown-menu-trigger.directive.ts',
      'dropdown-menu-content.component.ts',
      'dropdown-menu-item.component.ts',
      'dropdown-menu-label.component.ts',
      'dropdown-menu-separator.component.ts',
      'dropdown-menu-group.component.ts',
      'dropdown-menu-shortcut.component.ts',
      'dropdown-menu-sub.component.ts',
      'dropdown-menu-sub-trigger.component.ts',
      'dropdown-menu-sub-content.component.ts',
      'dropdown-menu.variants.ts',
      'dropdown-menu.tokens.ts',
      'index.ts',
    ],
  },
];
