import { cva, type VariantProps } from 'class-variance-authority';

export const avatarVariants = cva(
  'relative inline-flex shrink-0',
  {
    variants: {
      nSize: {
        xs:      'size-6',
        sm:      'size-8',
        default: 'size-10',
        lg:      'size-12',
        xl:      'size-16',
      },
      nShape: {
        circle: 'rounded-full',
        square: 'rounded-md',
      },
    },
    defaultVariants: {
      nSize:  'default',
      nShape: 'circle',
    },
  },
);

export type AvatarVariants = VariantProps<typeof avatarVariants>;

export const SIZE_PX: Record<NonNullable<AvatarVariants['nSize']>, number> = {
  xs:      24,
  sm:      32,
  default: 40,
  lg:      48,
  xl:      64,
};
