import { cva, type VariantProps } from 'class-variance-authority';

export const tableVariants = cva(
  'w-full caption-bottom text-sm',
  {
    variants: {
      nVariant: {
        default: '',
        striped: '[&_tbody_tr:nth-child(odd)]:bg-muted/50',
        bordered: 'border border-border [&_th]:border [&_td]:border',
      },
      nSize: {
        default: '',
        compact: '[&_td]:py-1.5 [&_th]:py-1.5 [&_td]:px-3 [&_th]:px-3 text-xs',
        comfortable: '[&_td]:py-4 [&_th]:py-4',
      },
    },
    defaultVariants: {
      nVariant: 'default',
      nSize: 'default',
    },
  },
);

export const tableHeaderVariants = cva('[&_tr]:border-b');

export const tableBodyVariants = cva('[&_tr:last-child]:border-0');

export const tableFooterVariants = cva('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0');

export const tableRowVariants = cva(
  'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
);

export const tableHeadVariants = cva(
  'h-10 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5',
);

export const tableCellVariants = cva(
  'p-4 align-middle [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5',
);

export const tableCaptionVariants = cva('mt-4 text-sm text-muted-foreground');

export const tableScrollVariants = cva(
  'relative w-full overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md',
);

export type TableVariants = VariantProps<typeof tableVariants>;
export type TableSizeVariants = NonNullable<TableVariants['nSize']>;
export type TableVariantVariants = NonNullable<TableVariants['nVariant']>;
