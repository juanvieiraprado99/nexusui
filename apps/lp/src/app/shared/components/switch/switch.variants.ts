import { cva, type VariantProps } from 'class-variance-authority';

export const switchVariants = cva(
  [
    'relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
    'transition-colors duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'bg-input',
  ],
  {
    variants: {
      nSize: {
        sm:      'h-5 w-9',
        default: 'h-6 w-11',
        lg:      'h-7 w-14',
      },
      nColor: {
        default: 'data-[state=checked]:bg-primary',
        success: 'data-[state=checked]:bg-green-600',
        danger:  'data-[state=checked]:bg-red-600',
        warning: 'data-[state=checked]:bg-yellow-500',
      },
    },
    defaultVariants: { nSize: 'default', nColor: 'default' },
  },
);

export const switchThumbVariants = cva(
  [
    'pointer-events-none block rounded-full bg-background shadow-lg ring-0',
    'transition-transform duration-200 ease-in-out',
    'flex items-center justify-center',
  ],
  {
    variants: {
      nSize: {
        sm:      'size-4',
        default: 'size-5',
        lg:      'size-6',
      },
    },
    defaultVariants: { nSize: 'default' },
  },
);

export type SwitchVariants = VariantProps<typeof switchVariants>;
