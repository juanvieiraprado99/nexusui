export interface NavItem {
  label: string;
  path?: string;
  badge?: 'new' | 'soon';
  disabled?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Sections',
    items: [
      { label: 'Get Started', path: '/get-started' },
      { label: 'Components', path: '/components' },
    ],
  },
  {
    title: 'Get Started',
    items: [
      { label: 'Installation', path: '/installation' },
      { label: 'CLI', path: '/cli', badge: 'new' },
      { label: 'components.json', disabled: true },
      { label: 'Dark Mode', path: '/dark-mode' },
      { label: 'Themes', path: '/themes' },
      { label: 'LLMs', disabled: true },
    ],
  },
  {
    title: 'Directives',
    items: [
      { label: 'Ripple', path: '/directives/ripple', badge: 'new' },
      { label: 'Tooltip', path: '/directives/tooltip', badge: 'new' },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Accordion', path: '/components/accordion' },
      { label: 'Alert', path: '/components/alert' },
      { label: 'Avatar', path: '/components/avatar' },
      { label: 'Badge', path: '/components/badge' },
      { label: 'Breadcrumb', path: '/components/breadcrumb' },
      { label: 'Button', path: '/components/button' },
      { label: 'Button Group', path: '/components/button-group' },
      { label: 'Calendar', path: '/components/calendar' },
      { label: 'Card', path: '/components/card' },
      { label: 'Checkbox', path: '/components/checkbox' },
      { label: 'Collapsible', path: '/components/collapsible' },
      { label: 'Combobox', path: '/components/combobox' },
      { label: 'Context Menu', path: '/components/context-menu' },
      { label: 'Data Table', path: '/components/data-table' },
      { label: 'Date Picker', path: '/components/date-picker' },
      { label: 'Dialog', path: '/components/dialog' },
      { label: 'Drawer', path: '/components/drawer' },
      { label: 'Dropdown Menu', path: '/components/dropdown-menu' },
      { label: 'File Upload', path: '/components/file-upload' },
      { label: 'Form', path: '/components/form' },
      { label: 'Image', path: '/components/image' },
      { label: 'Input', path: '/components/input' },
      { label: 'Input Group', path: '/components/input-group' },
      { label: 'Input OTP', path: '/components/input-otp' },
      { label: 'Label', path: '/components/label' },
      { label: 'Pagination', path: '/components/pagination' },
      { label: 'Popover', path: '/components/popover' },
      { label: 'Progress Bar', path: '/components/progress-bar' },
      { label: 'Radio Group', path: '/components/radio-group' },
      { label: 'Select', path: '/components/select' },
      { label: 'Signature', path: '/components/signature', badge: 'new' },
      { label: 'Separator', path: '/components/separator' },
      { label: 'Sidebar', path: '/components/sidebar' },
      { label: 'Skeleton', path: '/components/skeleton' },
      { label: 'Slider', path: '/components/slider' },
      { label: 'Sonner', path: '/components/sonner' },
      { label: 'Switch', path: '/components/switch' },
      { label: 'Table', path: '/components/table' },
      { label: 'Tabs', path: '/components/tabs', badge: 'new' },
      { label: 'Textarea', path: '/components/textarea' },
    ],
  },
];

/** Flat ordered list of navigable doc items — used for prev/next. Skips the
 *  duplicate "Sections" shortcuts and any disabled/path-less entries. */
export const NAV_FLAT: NavItem[] = NAV_SECTIONS
  .filter((s) => s.title !== 'Sections')
  .flatMap((s) => s.items)
  .filter((i): i is NavItem & { path: string } => !!i.path && !i.disabled);
