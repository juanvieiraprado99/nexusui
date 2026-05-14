import { cva, type VariantProps } from 'class-variance-authority';

export const dataTableHeadCellVariants = cva(
  'h-10 text-left align-middle font-medium text-muted-foreground',
  {
    variants: {
      nSize: {
        compact: 'px-3 py-1.5 text-xs',
        default: 'px-4 py-3 text-sm',
        comfortable: 'px-6 py-4 text-sm',
      },
    },
    defaultVariants: { nSize: 'default' },
  },
);

export const dataTableCellVariants = cva('align-middle', {
  variants: {
    nSize: {
      compact: 'px-3 py-1.5 text-xs',
      default: 'px-4 py-3 text-sm',
      comfortable: 'px-6 py-4 text-sm',
    },
  },
  defaultVariants: { nSize: 'default' },
});

export type DataTableVariants = VariantProps<typeof dataTableHeadCellVariants>;
