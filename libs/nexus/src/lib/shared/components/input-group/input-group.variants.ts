import { cva, type VariantProps } from 'class-variance-authority';

import { mergeClasses } from '../../utils/merge-classes';

export const inputGroupVariants = cva(
  mergeClasses(
    'flex items-stretch w-full min-w-0 rounded-md border border-input bg-background transition-colors',
    'has-[[data-slot=control]:focus-visible]:ring-2 has-[[data-slot=control]:focus-visible]:ring-ring has-[[data-slot=control]:focus-visible]:border-ring',
    'has-disabled:opacity-50 has-disabled:cursor-not-allowed has-disabled:bg-muted/50',
    'has-[textarea]:flex-col has-[textarea]:h-auto',
  ),
  {
    variants: {
      nSize: {
        sm: 'h-8',
        default: 'h-10',
        lg: 'h-12',
      },
    },
    defaultVariants: {
      nSize: 'default',
    },
  },
);

export const inputGroupAddonVariants = cva(
  'flex items-center gap-1 text-sm text-muted-foreground bg-muted select-none whitespace-nowrap transition-colors',
  {
    variants: {
      nPosition: {
        before: 'border-r order-first',
        after: 'border-l order-last',
      },
      nSize: {
        sm: 'px-2 text-xs',
        default: 'px-3 text-sm',
        lg: 'px-4 text-base',
      },
      nType: {
        default: '',
        textarea: 'items-start w-full',
      },
    },
    defaultVariants: {
      nPosition: 'before',
      nSize: 'default',
      nType: 'default',
    },
    compoundVariants: [
      {
        nPosition: 'before',
        nType: 'default',
        class: 'rounded-l-md',
      },
      {
        nPosition: 'after',
        nType: 'default',
        class: 'rounded-r-md',
      },
      {
        nPosition: 'before',
        nType: 'textarea',
        class: 'pt-2 border-b border-r-0 rounded-tl-md rounded-tr-md',
      },
      {
        nPosition: 'after',
        nType: 'textarea',
        class: 'pb-2 border-t border-l-0 rounded-bl-md rounded-br-md',
      },
    ],
  },
);

export const inputGroupInputVariants = cva(
  mergeClasses(
    'border-0! bg-transparent! shadow-none! outline-none! ring-0! ring-offset-0!',
    'focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:border-0!',
    'flex-1 min-w-0 h-full w-full placeholder:text-muted-foreground',
    'disabled:cursor-not-allowed',
  ),
  {
    variants: {
      nSize: {
        sm: 'px-2 text-xs',
        default: 'px-3 text-sm',
        lg: 'px-4 text-base',
      },
      nHasAddonBefore: {
        true: 'rounded-l-none',
        false: '',
      },
      nHasAddonAfter: {
        true: 'rounded-r-none',
        false: '',
      },
      nHasTrailingIcons: {
        true: 'pr-8!',
        false: '',
      },
    },
    defaultVariants: {
      nSize: 'default',
      nHasAddonBefore: false,
      nHasAddonAfter: false,
      nHasTrailingIcons: false,
    },
  },
);

export type InputGroupVariants = VariantProps<typeof inputGroupVariants>;
export type InputGroupAddonVariants = VariantProps<typeof inputGroupAddonVariants>;
export type InputGroupInputVariants = VariantProps<typeof inputGroupInputVariants>;
