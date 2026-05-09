import { cva, type VariantProps } from 'class-variance-authority';

export const paginationItemVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer select-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      nVariant: {
        default: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost:   'hover:bg-accent hover:text-accent-foreground',
      },
      nSize: {
        sm:      'h-8 w-8 text-xs',
        default: 'h-9 w-9 text-sm',
        lg:      'h-10 w-10 text-base',
      },
      nActive: {
        true:  'bg-primary text-primary-foreground hover:bg-primary/90 pointer-events-none',
        false: '',
      },
    },
    defaultVariants: { nVariant: 'default', nSize: 'default', nActive: false },
  },
);

export type PaginationItemVariants = VariantProps<typeof paginationItemVariants>;
