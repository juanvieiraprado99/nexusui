import { cva, type VariantProps } from 'class-variance-authority';

export const collapsibleVariants = cva('w-full', {
  variants: {
    nVariant: {
      default: '',
      bordered: 'border border-border rounded-lg bg-card',
      card: 'border border-border rounded-lg bg-card shadow-sm',
    },
  },
  defaultVariants: { nVariant: 'default' },
});

export const collapsibleTriggerVariants = cva(
  'flex w-full items-center justify-between py-4 text-sm font-medium transition-all' +
    ' hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring' +
    ' focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' +
    ' [&[data-state=open]>svg]:rotate-180',
  {
    variants: {
      nVariant: {
        default: '',
        bordered: 'px-4',
        card: 'px-4',
      },
    },
    defaultVariants: { nVariant: 'default' },
  },
);

export const collapsibleContentVariants = cva('pb-4 pt-0 text-sm text-foreground', {
  variants: {
    nVariant: {
      default: '',
      bordered: 'px-4',
      card: 'px-4',
    },
  },
  defaultVariants: { nVariant: 'default' },
});

export type CollapsibleVariants = VariantProps<typeof collapsibleVariants>;
