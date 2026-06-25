import { cva, type VariantProps } from 'class-variance-authority';

export const popoverContentVariants = cva(
  'relative z-50 rounded-md border bg-popover text-popover-foreground shadow-md outline-none',
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
