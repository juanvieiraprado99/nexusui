import { cva, type VariantProps } from 'class-variance-authority';

export const progressBarTrackVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      nSize: {
        sm: 'h-1',
        default: 'h-2.5',
        lg: 'h-4',
      },
    },
    defaultVariants: { nSize: 'default' },
  },
);

export const progressBarFillVariants = cva('h-full rounded-full', {
  variants: {
    nVariant: {
      default: 'bg-primary',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      destructive: 'bg-destructive',
    },
  },
  defaultVariants: { nVariant: 'default' },
});

export type ProgressBarTrackVariants = VariantProps<typeof progressBarTrackVariants>;
export type ProgressBarFillVariants = VariantProps<typeof progressBarFillVariants>;
