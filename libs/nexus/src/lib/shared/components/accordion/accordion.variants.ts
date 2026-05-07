import { cva, type VariantProps } from 'class-variance-authority';

export const accordionVariants = cva('w-full', {
  variants: {
    nVariant: {
      default: 'border border-border rounded-md divide-y divide-border',
      ghost:   'divide-y divide-border',
      flush:   'divide-y divide-border [&_[data-slot=trigger]]:px-0 [&_[data-slot=content]]:px-0',
    },
    nSize: {
      sm:      '[&_[data-slot=trigger]]:py-2 [&_[data-slot=trigger]]:text-sm [&_[data-slot=content]]:text-sm',
      default: '',
      lg:      '[&_[data-slot=trigger]]:py-5 [&_[data-slot=trigger]]:text-lg',
    },
  },
  defaultVariants: { nVariant: 'default', nSize: 'default' },
});

export type AccordionVariants = VariantProps<typeof accordionVariants>;
