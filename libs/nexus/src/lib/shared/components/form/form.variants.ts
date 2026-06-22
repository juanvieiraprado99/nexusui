import { cva, type VariantProps } from 'class-variance-authority';

export const formFieldVariants = cva('grid gap-2');

export const formLabelVariants = cva(
  'text-sm font-medium leading-none',
  {
    variants: {
      nRequired: {
        true: '',
        false: '',
      },
      nInvalid: {
        true: 'text-destructive',
        false: '',
      },
    },
    defaultVariants: {
      nRequired: false,
      nInvalid: false,
    },
  },
);

export const formControlVariants = cva('');

export const formDescriptionVariants = cva('text-muted-foreground text-sm');

export const formMessageVariants = cva('text-sm font-medium', {
  variants: {
    nType: {
      default: 'text-muted-foreground',
      error: 'text-destructive',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
    },
  },
  defaultVariants: { nType: 'default' },
});

export type NFormMessageType = NonNullable<VariantProps<typeof formMessageVariants>['nType']>;
