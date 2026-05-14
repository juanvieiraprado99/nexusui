import { cva, type VariantProps } from 'class-variance-authority';

export const sidebarVariants = cva(
  'relative flex flex-col shrink-0 transition-[width] duration-200 ease-in-out overflow-hidden',
  {
    variants: {
      nVariant: {
        sidebar: 'bg-background border-r border-border',
        inset: 'bg-muted/50',
        floating: 'bg-background border border-border rounded-lg shadow-md m-2',
      },
    },
    defaultVariants: {
      nVariant: 'sidebar',
    },
  },
);

export const sidebarMenuButtonVariants = cva(
  [
    'flex w-full items-center gap-2 rounded-md text-sm font-medium',
    'outline-none ring-ring transition-colors duration-150',
    'hover:bg-accent hover:text-accent-foreground',
    'focus-visible:ring-2 focus-visible:ring-offset-1',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&>svg]:size-4 [&>svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      nSize: {
        sm: 'h-7 px-2 py-1 text-xs',
        default: 'h-8 px-2 py-1.5',
        lg: 'h-10 px-3 py-2 text-base',
      },
    },
    defaultVariants: {
      nSize: 'default',
    },
  },
);

export type SidebarVariants = VariantProps<typeof sidebarVariants>;
export type SidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>;
