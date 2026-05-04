import { cva, type VariantProps } from 'class-variance-authority';

export const radioVariants = cva(
  [
    'peer appearance-none shrink-0 rounded-full border bg-background cursor-pointer',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      nSize: {
        sm: 'h-3.5 w-3.5',
        default: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
      nColor: {
        default: 'border-input checked:border-primary focus-visible:ring-ring aria-invalid:border-destructive aria-invalid:ring-destructive',
        destructive: 'border-input checked:border-destructive focus-visible:ring-destructive',
        success: 'border-input checked:border-success focus-visible:ring-success',
      },
    },
    defaultVariants: {
      nSize: 'default',
      nColor: 'default',
    },
  },
);

export type RadioVariants = VariantProps<typeof radioVariants>;

export const radioIndicatorVariants = cva('pointer-events-none absolute inset-0 m-auto rounded-full', {
  variants: {
    nSize: {
      sm: 'h-1.5 w-1.5',
      default: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
    },
    nColor: {
      default: 'bg-primary',
      destructive: 'bg-destructive',
      success: 'bg-success',
    },
  },
  defaultVariants: {
    nSize: 'default',
    nColor: 'default',
  },
});

export const radioCardVariants = cva(
  [
    'flex items-start gap-3 rounded-lg border bg-background p-4 cursor-pointer',
    'transition-colors hover:bg-accent/40',
    'has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-offset-2',
    'has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50',
  ],
  {
    variants: {
      nColor: {
        default: 'border-input has-[input:checked]:border-primary has-[input:checked]:ring-2 has-[input:checked]:ring-primary/20 has-[input:focus-visible]:ring-ring',
        destructive: 'border-input has-[input:checked]:border-destructive has-[input:checked]:ring-2 has-[input:checked]:ring-destructive/20 has-[input:focus-visible]:ring-destructive',
        success: 'border-input has-[input:checked]:border-success has-[input:checked]:ring-2 has-[input:checked]:ring-success/20 has-[input:focus-visible]:ring-success',
      },
    },
    defaultVariants: {
      nColor: 'default',
    },
  },
);
