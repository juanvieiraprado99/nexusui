import { cva, type VariantProps } from 'class-variance-authority';

export const dialogContentVariants = cva(
  [
    'relative bg-background rounded-lg shadow-lg border p-6',
    'flex flex-col gap-4',
    'transition-all duration-150 ease-out',
    'opacity-100 scale-100',
  ],
  {
    variants: {
      nSize: {
        sm:      'w-full max-w-sm',
        default: 'w-full max-w-lg',
        lg:      'w-full max-w-2xl',
        xl:      'w-full max-w-4xl',
        full:    'w-screen h-screen max-w-none rounded-none border-none',
      },
    },
    defaultVariants: { nSize: 'default' },
  },
);

export type DialogContentVariants = VariantProps<typeof dialogContentVariants>;
