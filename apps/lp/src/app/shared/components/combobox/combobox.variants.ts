import { cva, type VariantProps } from 'class-variance-authority';

export const comboboxTriggerVariants = cva(
  [
    'relative flex w-full cursor-default items-center gap-2 rounded-md border border-input bg-background px-3 text-sm ring-offset-background',
    'transition-all duration-200',
    'focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:border-ring',
    'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
  ],
  {
    variants: {
      nSize: {
        sm: 'h-8 text-xs',
        default: 'h-10',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: { nSize: 'default' },
  },
);

export type ComboboxTriggerVariants = VariantProps<typeof comboboxTriggerVariants>;

export const comboboxContentVariants = cva(
  [
    'z-50 min-w-[8rem] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
    'duration-150 fill-mode-forwards',
    // Enter
    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
    'data-[state=open]:data-[side=bottom]:slide-in-from-top-2 data-[state=open]:data-[side=top]:slide-in-from-bottom-2',
    'data-[state=open]:data-[side=left]:slide-in-from-right-2 data-[state=open]:data-[side=right]:slide-in-from-left-2',
    // Exit
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    'data-[state=closed]:data-[side=bottom]:slide-out-to-top-2 data-[state=closed]:data-[side=top]:slide-out-to-bottom-2',
    'data-[state=closed]:data-[side=left]:slide-out-to-right-2 data-[state=closed]:data-[side=right]:slide-out-to-left-2',
  ],
  { variants: {}, defaultVariants: {} },
);

export const comboboxItemVariants = cva(
  [
    'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
    'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    '[&_svg]:size-4 [&_svg]:shrink-0',
  ],
  {
    variants: {
      nVariant: {
        default: '',
        destructive:
          'text-destructive data-[highlighted]:bg-destructive data-[highlighted]:text-destructive-foreground',
      },
    },
    defaultVariants: { nVariant: 'default' },
  },
);

export type ComboboxItemVariants = VariantProps<typeof comboboxItemVariants>;
