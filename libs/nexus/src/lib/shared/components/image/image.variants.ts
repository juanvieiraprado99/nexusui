import { cva, type VariantProps } from 'class-variance-authority';

export const imageWrapperVariants = cva('relative overflow-hidden', {
  variants: {
    nRatio: {
      auto: '',
      square: 'aspect-square',
      video: 'aspect-video',
      portrait: 'aspect-[3/4]',
      landscape: 'aspect-[4/3]',
    },
    nRounded: {
      none: '',
      sm: 'rounded-sm',
      default: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
  },
  defaultVariants: { nRatio: 'auto', nRounded: 'none' },
});

export const imageFitVariants = cva('', {
  variants: {
    nFit: {
      cover: 'object-cover',
      contain: 'object-contain',
      fill: 'object-fill',
      none: 'object-none',
    },
  },
  defaultVariants: { nFit: 'cover' },
});

export type ImageVariants = VariantProps<typeof imageWrapperVariants> &
  VariantProps<typeof imageFitVariants>;
