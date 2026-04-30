import { cva, type VariantProps } from 'class-variance-authority';

export const dropdownMenuContentVariants = cva(
  [
    'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
    'animate-in fade-in-0 zoom-in-95',
    'data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:slide-in-from-top-2',
    'data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2',
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

export type DropdownMenuContentVariants = VariantProps<typeof dropdownMenuContentVariants>;

export const dropdownMenuItemVariants = cva(
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

export type DropdownMenuItemVariants = VariantProps<typeof dropdownMenuItemVariants>;
