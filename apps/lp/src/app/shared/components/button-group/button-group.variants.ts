import { cva, type VariantProps } from 'class-variance-authority';

export const buttonGroupVariants = cva(
  'inline-flex',
  {
    variants: {
      nOrientation: {
        horizontal: 'flex-row items-center [&>*:not(:first-child)]:rounded-s-none [&>*:not(:last-child)]:rounded-e-none [&>*:not(:first-child)]:-ms-px',
        vertical: 'flex-col [&>*]:w-full [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none [&>*:not(:first-child)]:-mt-px',
      },
    },
    defaultVariants: {
      nOrientation: 'horizontal',
    },
  },
);

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>;
