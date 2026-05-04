import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'components',
    loadComponent: () =>
      import('./pages/components/components-index.page').then((m) => m.ComponentsIndexPage),
  },
  {
    path: 'components/button',
    loadComponent: () =>
      import('./pages/components/button/button-doc.page').then((m) => m.ButtonDocPage),
  },
  {
    path: 'components/checkbox',
    loadComponent: () =>
      import('./pages/components/checkbox/checkbox-doc.page').then((m) => m.CheckboxDocPage),
  },
  {
    path: 'components/combobox',
    loadComponent: () =>
      import('./pages/components/combobox/combobox-doc.page').then((m) => m.ComboboxDocPage),
  },
  {
    path: 'components/date-picker',
    loadComponent: () =>
      import('./pages/components/date-picker/date-picker-doc.page').then((m) => m.DatePickerDocPage),
  },
  {
    path: 'components/dropdown-menu',
    loadComponent: () =>
      import('./pages/components/dropdown-menu/dropdown-menu-doc.page').then((m) => m.DropdownMenuDocPage),
  },
  {
    path: 'components/input',
    loadComponent: () =>
      import('./pages/components/input/input-doc.page').then((m) => m.InputDocPage),
  },
  {
    path: 'components/label',
    loadComponent: () =>
      import('./pages/components/label/label-doc.page').then((m) => m.LabelDocPage),
  },
  {
    path: 'components/radio-group',
    loadComponent: () =>
      import('./pages/components/radio-group/radio-group-doc.page').then((m) => m.RadioGroupDocPage),
  },
  {
    path: 'components/select',
    loadComponent: () =>
      import('./pages/components/select/select-doc.page').then((m) => m.SelectDocPage),
  },
  {
    path: 'components/separator',
    loadComponent: () =>
      import('./pages/components/separator/separator-doc.page').then((m) => m.SeparatorDocPage),
  },
  {
    path: 'components/skeleton',
    loadComponent: () =>
      import('./pages/components/skeleton/skeleton-doc.page').then((m) => m.SkeletonDocPage),
  },
  { path: '**', redirectTo: '' },
];
