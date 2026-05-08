import { cva, type VariantProps } from 'class-variance-authority';

export const sonnerVariants = cva(
  'group group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
  {
    variants: {
      nVariant: {
        default: 'group-[.toaster]:bg-background group-[.toaster]:text-foreground',
        destructive:
          'group-[.toaster]:bg-destructive group-[.toaster]:text-foreground group-[.toaster]:border-destructive',
      },
    },
    defaultVariants: {
      nVariant: 'default',
    },
  },
);

export type SonnerVariants = VariantProps<typeof sonnerVariants>;
