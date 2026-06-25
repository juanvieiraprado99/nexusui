import { cva, type VariantProps } from 'class-variance-authority';

export const skeletonVariants = cva(
  'block animate-pulse bg-muted',
  {
    variants: {
      nShape: {
        default: 'rounded-md',
        circle:  'rounded-full',
      },
    },
    defaultVariants: { nShape: 'default' },
  },
);

export type SkeletonVariants = VariantProps<typeof skeletonVariants>;
