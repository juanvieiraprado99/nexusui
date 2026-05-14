import { cva, type VariantProps } from 'class-variance-authority';

export const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm flex items-start gap-3',
  {
    variants: {
      nType: {
        default:     'bg-card text-card-foreground border-border',
        info:        'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/40 dark:text-blue-100 dark:border-blue-800',
        success:     'bg-green-100 text-green-900 border-green-300 dark:bg-green-950/40 dark:text-green-100 dark:border-green-800',
        warning:     'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/40 dark:text-amber-100 dark:border-amber-800',
        destructive: 'bg-red-100 text-red-900 border-red-300 dark:bg-red-950/40 dark:text-red-100 dark:border-red-800',
      },
    },
    defaultVariants: { nType: 'default' },
  },
);

export const alertIconVariants = cva('shrink-0 mt-0.5 size-4', {
  variants: {
    nType: {
      default:     'text-foreground/60',
      info:        'text-blue-600 dark:text-blue-400',
      success:     'text-green-600 dark:text-green-400',
      warning:     'text-amber-600 dark:text-amber-400',
      destructive: 'text-red-600 dark:text-red-400',
    },
  },
  defaultVariants: { nType: 'default' },
});

export const alertTitleVariants = cva('font-medium tracking-tight leading-none');

export const alertDescriptionVariants = cva('text-sm/relaxed mt-1 opacity-80');

export const alertDismissVariants = cva(
  'absolute top-2 right-2 p-1 rounded opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer',
);

export type AlertVariants = VariantProps<typeof alertVariants>;
export type NAlertTypeVariants = NonNullable<AlertVariants['nType']>;
