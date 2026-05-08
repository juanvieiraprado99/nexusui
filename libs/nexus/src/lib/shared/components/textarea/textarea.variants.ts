import { cva, type VariantProps } from 'class-variance-authority';

export const textareaVariants = cva(
  [
    'flex w-full rounded-md border border-input bg-background px-3 py-2',
    'text-sm text-foreground placeholder:text-muted-foreground',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-ring',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'aria-invalid:border-destructive aria-invalid:ring-destructive',
  ],
  {
    variants: {
      nSize: {
        sm:      'px-2.5 py-1.5 text-xs',
        default: 'px-3 py-2 text-sm',
        lg:      'px-4 py-3 text-base',
      },
      nResize: {
        none:       'resize-none',
        vertical:   'resize-y',
        horizontal: 'resize-x',
        both:       'resize',
      },
    },
    defaultVariants: { nSize: 'default', nResize: 'vertical' },
  },
);

export type TextareaVariants = VariantProps<typeof textareaVariants>;
