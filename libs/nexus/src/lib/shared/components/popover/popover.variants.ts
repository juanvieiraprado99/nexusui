import { cva, type VariantProps } from 'class-variance-authority';

export const popoverContentVariants = cva(
  [
    'relative z-50 rounded-md border bg-popover text-popover-foreground shadow-md outline-none',
    'animate-in fade-in-0 zoom-in-95',
    'data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:slide-in-from-top-2',
    'data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2',
  ],
  {
    variants: {
      nSize: {
        sm: 'w-48 p-3 text-sm',
        default: 'w-72 p-4 text-sm',
        lg: 'w-96 p-5 text-base',
      },
    },
    defaultVariants: { nSize: 'default' },
  },
);

export type PopoverContentVariants = VariantProps<typeof popoverContentVariants>;
