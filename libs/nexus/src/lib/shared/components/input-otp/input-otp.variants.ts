import { cva, type VariantProps } from 'class-variance-authority';

export const inputOtpSlotVariants = cva(
  [
    'text-center font-medium border border-input rounded-md',
    'bg-background text-foreground caret-transparent',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'focus-visible:ring-offset-2 focus-visible:border-ring',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'aria-invalid:border-destructive aria-invalid:ring-destructive',
    'data-[filled=true]:border-foreground/30',
  ],
  {
    variants: {
      nSize: {
        sm:      'h-8 w-8 text-xs',
        default: 'h-10 w-10 text-sm',
        lg:      'h-12 w-12 text-base',
      },
    },
    defaultVariants: { nSize: 'default' },
  },
);

export type InputOtpVariants = VariantProps<typeof inputOtpSlotVariants>;
