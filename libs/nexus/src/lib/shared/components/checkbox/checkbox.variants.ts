import { cva, type VariantProps } from 'class-variance-authority';

export const checkboxVariants = cva(
  [
    'peer appearance-none shrink-0 rounded border border-input bg-background cursor-pointer',
    'transition-all duration-200',
    'checked:bg-primary checked:border-primary',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'aria-invalid:border-destructive aria-invalid:ring-destructive',
  ],
  {
    variants: {
      nSize: {
        sm: 'h-3.5 w-3.5',
        default: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: { nSize: 'default' },
  },
);

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
