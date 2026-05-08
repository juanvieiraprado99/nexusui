import { cva, type VariantProps } from 'class-variance-authority';

export const breadcrumbVariants = cva(
  'flex flex-wrap gap-1.5 break-words text-muted-foreground',
  {
    variants: {
      nSize: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: { nSize: 'default' },
  },
);

export type BreadcrumbVariants = VariantProps<typeof breadcrumbVariants>;
