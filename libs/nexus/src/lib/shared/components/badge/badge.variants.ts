import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border font-semibold transition-colors select-none [a&]:cursor-pointer [a&]:hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      nVariant: {
        default:     'border-transparent bg-primary text-primary-foreground',
        secondary:   'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        outline:     'border-border text-foreground',
        success:     'border-transparent bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400',
        warning:     'border-transparent bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400',
      },
      nSize: {
        sm:      'px-2 py-0 text-[10px]',
        default: 'px-2.5 py-0.5 text-xs',
        lg:      'px-3 py-0.5 text-sm',
      },
    },
    defaultVariants: {
      nVariant: 'default',
      nSize:    'default',
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
