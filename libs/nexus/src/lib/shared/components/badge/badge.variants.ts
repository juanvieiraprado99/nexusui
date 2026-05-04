import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors select-none',
  {
    variants: {
      nVariant: {
        default:     'border-transparent bg-primary text-primary-foreground',
        secondary:   'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        outline:     'border-border text-foreground',
        success:     'border-transparent bg-green-500 text-white',
        warning:     'border-transparent bg-amber-400 text-white',
      },
    },
    defaultVariants: {
      nVariant: 'default',
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
