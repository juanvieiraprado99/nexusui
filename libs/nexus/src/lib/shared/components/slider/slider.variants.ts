import { cva, type VariantProps } from 'class-variance-authority';

export const sliderTrackVariants = cva(
  'relative rounded-full bg-secondary overflow-visible',
  {
    variants: {
      nSize:        { sm: '', md: '', lg: '' },
      nOrientation: { horizontal: 'w-full', vertical: 'h-full' },
    },
    compoundVariants: [
      { nOrientation: 'horizontal', nSize: 'sm', class: 'h-0.5' },
      { nOrientation: 'horizontal', nSize: 'md', class: 'h-1'   },
      { nOrientation: 'horizontal', nSize: 'lg', class: 'h-1.5' },
      { nOrientation: 'vertical',   nSize: 'sm', class: 'w-0.5' },
      { nOrientation: 'vertical',   nSize: 'md', class: 'w-1'   },
      { nOrientation: 'vertical',   nSize: 'lg', class: 'w-1.5' },
    ],
    defaultVariants: { nSize: 'md', nOrientation: 'horizontal' },
  },
);

export const sliderThumbVariants = cva(
  'absolute rounded-full border-2 bg-background shadow-md cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-shadow z-10 select-none touch-none',
  {
    variants: {
      nSize: {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
      nVariant: {
        default: 'border-primary',
        accent:  'border-violet-500',
      },
    },
    defaultVariants: { nSize: 'md', nVariant: 'default' },
  },
);

export const sliderTrackActiveVariants = cva(
  'absolute rounded-full',
  {
    variants: {
      nVariant: {
        default: 'bg-primary',
        accent:  'bg-violet-500',
      },
    },
    defaultVariants: { nVariant: 'default' },
  },
);

export type SliderVariants = {
  nVariant: NonNullable<VariantProps<typeof sliderThumbVariants>['nVariant']>;
  nSize:    NonNullable<VariantProps<typeof sliderThumbVariants>['nSize']>;
};
