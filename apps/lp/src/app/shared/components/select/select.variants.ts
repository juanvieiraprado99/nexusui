import { cva, type VariantProps } from 'class-variance-authority';

export const selectTriggerVariants = cva(
  [
    'relative flex w-full cursor-default items-center gap-2 rounded-md border border-input bg-background px-3 text-sm ring-offset-background',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
    'data-[invalid]:border-destructive data-[invalid]:focus:ring-destructive',
  ],
  {
    variants: {
      nSize: {
        sm: 'h-8 text-xs',
        default: 'h-10',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: { nSize: 'default' },
  },
);

export type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>;

export const selectContentVariants = cva(
  [
    'z-50 max-h-72 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
    'animate-in fade-in-0 zoom-in-95',
    'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
    'data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2',
  ],
  { variants: {}, defaultVariants: {} },
);

export const selectItemVariants = cva(
  [
    'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
    'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    '[&_svg]:size-4 [&_svg]:shrink-0',
  ],
  {
    variants: {
      nVariant: {
        default: '',
        destructive:
          'text-destructive data-[highlighted]:bg-destructive data-[highlighted]:text-destructive-foreground',
      },
    },
    defaultVariants: { nVariant: 'default' },
  },
);

export type SelectItemVariants = VariantProps<typeof selectItemVariants>;
