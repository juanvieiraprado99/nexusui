import { cva, type VariantProps } from 'class-variance-authority';

export const datepickerTriggerVariants = cva(
  [
    'flex w-full items-center justify-between rounded-md border border-input bg-background px-3',
    'text-sm text-foreground',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-ring',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'aria-invalid:border-destructive aria-invalid:ring-destructive',
    'cursor-pointer',
  ],
  {
    variants: {
      nSize: {
        sm: 'h-8 px-2 text-xs',
        default: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
      empty: {
        true: 'text-muted-foreground',
        false: '',
      },
    },
    defaultVariants: { nSize: 'default', empty: false },
  },
);

export type DatepickerTriggerVariants = VariantProps<typeof datepickerTriggerVariants>;

export const datepickerDayVariants = cva(
  [
    'inline-flex h-9 w-9 items-center justify-center rounded-md text-sm',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-30',
  ],
  {
    variants: {
      state: {
        default: 'hover:bg-accent hover:text-accent-foreground cursor-pointer',
        selected: 'bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer',
        today: 'border border-primary text-foreground hover:bg-accent cursor-pointer',
        outside: 'text-muted-foreground/40 hover:bg-accent/40 cursor-pointer',
        disabled: 'text-muted-foreground/30 cursor-not-allowed',
      },
    },
    defaultVariants: { state: 'default' },
  },
);

export type DatepickerDayVariants = VariantProps<typeof datepickerDayVariants>;
