import { cva, type VariantProps } from 'class-variance-authority';

export const cardVariants = cva(
  'block rounded-xl bg-card text-card-foreground transition-all duration-200',
  {
    variants: {
      nVariant: {
        default:  'border border-border shadow-sm',
        elevated: 'border border-border shadow-md hover:shadow-lg',
        filled:   'bg-muted border-transparent shadow-none',
        ghost:    'border-transparent shadow-none bg-transparent',
      },
      nSize: {
        sm:      'p-4',
        default: 'p-6',
        lg:      'p-8',
      },
    },
    defaultVariants: { nVariant: 'default', nSize: 'default' },
  },
);

export type CardVariants = VariantProps<typeof cardVariants>;
