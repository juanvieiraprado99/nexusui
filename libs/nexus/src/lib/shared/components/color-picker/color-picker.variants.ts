import { cva, type VariantProps } from 'class-variance-authority';

export const colorPickerVariants = cva(
  'flex flex-col gap-1.5',
  {
    variants: {
      nSize: {
        sm:      'text-xs',
        default: 'text-sm',
        lg:      'text-base',
      },
    },
    defaultVariants: { nSize: 'default' },
  },
);

export const colorPickerTriggerVariants = cva(
  'inline-flex items-center gap-2 rounded-md border border-input bg-background px-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      nSize: {
        sm:      'h-8 text-xs',
        default: 'h-9 text-sm',
        lg:      'h-10 text-base',
      },
    },
    defaultVariants: { nSize: 'default' },
  },
);

export type ColorPickerVariants = VariantProps<typeof colorPickerVariants>;
