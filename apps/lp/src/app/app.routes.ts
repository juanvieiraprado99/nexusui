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
    path: 'components/input-otp',
    loadComponent: () =>
      import('./pages/components/input-otp/input-otp-doc.page').then((m) => m.InputOtpDocPage),
  },
  {
    path: 'components/label',
    loadComponent: () =>
      import('./pages/components/label/label-doc.page').then((m) => m.LabelDocPage),
  },
  {
    path: 'components/pagination',
    loadComponent: () =>
      import('./pages/components/pagination/pagination-doc.page').then((m) => m.PaginationDocPage),
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
  {
    path: 'components/accordion',
    loadComponent: () =>
      import('./pages/components/accordion/accordion-doc.page').then((m) => m.AccordionDocPage),
  },
  {
    path: 'components/avatar',
    loadComponent: () =>
      import('./pages/components/avatar/avatar-doc.page').then((m) => m.AvatarDocPage),
  },
  {
    path: 'components/breadcrumb',
    loadComponent: () =>
      import('./pages/components/breadcrumb/breadcrumb-doc.page').then((m) => m.BreadcrumbDocPage),
  },
  {
    path: 'components/switch',
    loadComponent: () =>
      import('./pages/components/switch/switch-doc.page').then((m) => m.SwitchDocPage),
  },
  {
    path: 'components/badge',
    loadComponent: () =>
      import('./pages/components/badge/badge-doc.page').then((m) => m.BadgeDocPage),
  },
  {
    path: 'components/slider',
    loadComponent: () =>
      import('./pages/components/slider/slider-doc.page').then((m) => m.SliderDocPage),
  },
  {
    path: 'components/sonner',
    loadComponent: () =>
      import('./pages/components/sonner/sonner-doc.page').then((m) => m.SonnerDocPage),
  },
  {
    path: 'components/textarea',
    loadComponent: () =>
      import('./pages/components/textarea/textarea-doc.page').then((m) => m.TextareaDocPage),
  },
  {
    path: 'components/alert',
    loadComponent: () => import('./pages/components/alert/alert-doc.page').then((m) => m.AlertDocPage),
  },
  {
    path: 'components/card',
    loadComponent: () => import('./pages/components/card/card-doc.page').then((m) => m.CardDocPage),
  },
  {
    path: 'components/collapsible',
    loadComponent: () => import('./pages/components/collapsible/collapsible-doc.page').then((m) => m.CollapsibleDocPage),
  },
  {
    path: 'components/context-menu',
    loadComponent: () => import('./pages/components/context-menu/context-menu-doc.page').then((m) => m.ContextMenuDocPage),
  },
  {
    path: 'components/data-table',
    loadComponent: () => import('./pages/components/data-table/data-table-doc.page').then((m) => m.DataTableDocPage),
  },
  {
    path: 'components/drawer',
    loadComponent: () => import('./pages/components/drawer/drawer-doc.page').then((m) => m.DrawerDocPage),
  },
  {
    path: 'components/popover',
    loadComponent: () => import('./pages/components/popover/popover-doc.page').then((m) => m.PopoverDocPage),
  },
  {
    path: 'components/sidebar',
    loadComponent: () => import('./pages/components/sidebar/sidebar-doc.page').then((m) => m.SidebarDocPage),
  },
  {
    path: 'components/button-group',
    loadComponent: () => import('./pages/components/button-group/button-group-doc.page').then((m) => m.ButtonGroupDocPage),
  },
  {
    path: 'components/dialog',
    loadComponent: () => import('./pages/components/dialog/dialog-doc.page').then((m) => m.DialogDocPage),
  },
  {
    path: 'components/calendar',
    loadComponent: () => import('./pages/components/calendar/calendar-doc.page').then((m) => m.CalendarDocPage),
  },
  {
    path: 'cli',
    loadComponent: () => import('./pages/cli/cli.page').then((m) => m.CliPage),
  },
  {
    path: 'get-started',
    loadComponent: () =>
      import('./pages/get-started/get-started.page').then((m) => m.GetStartedPage),
  },
  {
    path: 'installation',
    loadComponent: () =>
      import('./pages/installation/installation.page').then((m) => m.InstallationPage),
  },
  { path: '**', redirectTo: '' },
];
