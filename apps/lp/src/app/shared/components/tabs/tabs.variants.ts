import { cva, type VariantProps } from 'class-variance-authority';

export const tabsListVariants = cva('relative flex shrink-0', {
  variants: {
    nVariant: {
      pills: 'items-center gap-1 bg-muted p-1 rounded-lg',
      line:  '',
      boxed: 'items-stretch overflow-hidden',
    },
    nOrientation: {
      horizontal: 'flex-row',
      vertical:   'flex-col',
    },
  },
  compoundVariants: [
    { nVariant: 'line',  nOrientation: 'horizontal', class: 'border-b border-border' },
    { nVariant: 'line',  nOrientation: 'vertical',   class: 'border-r border-border' },
    { nVariant: 'boxed', nOrientation: 'horizontal', class: 'border border-b-0 border-border rounded-t-lg' },
    { nVariant: 'boxed', nOrientation: 'vertical',   class: 'border border-r-0 border-border rounded-l-lg rounded-tr-none' },
  ],
  defaultVariants: { nVariant: 'pills', nOrientation: 'horizontal' },
});

export const tabsTriggerVariants = cva(
  'relative z-[1] inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
  {
    variants: {
      nVariant: {
        // active bg/shadow removed — animated indicator in TabsListComponent provides it
        pills: [
          'rounded-md px-3 py-1.5 text-muted-foreground',
          'hover:text-foreground',
          'data-[state=active]:text-foreground',
        ],
        // active border removed — animated indicator provides the underline
        line: 'px-3 py-2 text-muted-foreground hover:text-foreground data-[state=active]:text-foreground',
        boxed: [
          'px-4 py-2 bg-muted/50 text-muted-foreground border-border',
          'hover:bg-muted hover:text-foreground',
          'data-[state=active]:bg-background data-[state=active]:text-foreground',
        ],
      },
      nSize: {
        sm:      'text-xs px-2 py-1',
        default: '',
        lg:      'text-base px-4 py-2.5',
      },
      nOrientation: {
        horizontal: '',
        vertical:   '',
      },
    },
    compoundVariants: [
      { nVariant: 'boxed', nOrientation: 'horizontal', class: 'border-r last:border-r-0' },
      { nVariant: 'boxed', nOrientation: 'vertical',   class: 'border-b last:border-b-0' },
    ],
    defaultVariants: { nVariant: 'pills', nSize: 'default', nOrientation: 'horizontal' },
  },
);

export type TabsVariants = VariantProps<typeof tabsListVariants>;
export type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>;
