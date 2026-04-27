import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./domain/pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'docs/:name',
    loadComponent: () => import('./domain/pages/component/component.page').then((m) => m.ComponentPage),
  },
  { path: '**', redirectTo: '' },
];
