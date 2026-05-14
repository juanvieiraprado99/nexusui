import { cva, type VariantProps } from 'class-variance-authority';

export const contextMenuContentVariants = cva(
  [
    'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
    'animate-in fade-in-0 zoom-in-95',
  ],
  {
    variants: {
      nSize: {
        sm: 'text-xs',
        default: 'text-sm',
      },
    },
    defaultVariants: { nSize: 'default' },
  },
);

export type ContextMenuContentVariants = VariantProps<typeof contextMenuContentVariants>;

export const contextMenuItemVariants = cva(
  [
    'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none transition-colors',
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
      nInset: {
        true: 'pl-8',
        false: '',
      },
    },
    defaultVariants: { nVariant: 'default', nInset: false },
  },
);

export type ContextMenuItemVariants = VariantProps<typeof contextMenuItemVariants>;
