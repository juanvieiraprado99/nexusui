import { cva, type VariantProps } from 'class-variance-authority';

export const switchVariants = cva(
  [
    'relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
    'transition-colors duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'bg-input',
  ],
  {
    variants: {
      nSize: {
        sm:      'h-5 w-9',
        default: 'h-6 w-11',
        lg:      'h-7 w-14',
      },
      nColor: {
        default: 'data-[state=checked]:bg-primary',
        success: 'data-[state=checked]:bg-green-600',
        danger:  'data-[state=checked]:bg-red-600',
        warning: 'data-[state=checked]:bg-yellow-500',
      },
    },
    defaultVariants: { nSize: 'default', nColor: 'default' },
  },
);

export const switchThumbVariants = cva(
  [
    'pointer-events-none block rounded-full bg-background shadow-lg ring-0',
    'transition-transform duration-200 ease-in-out',
    'flex items-center justify-center',
  ],
  {
    variants: {
      nSize: {
        sm:      'size-4',
        default: 'size-5',
        lg:      'size-6',
      },
    },
    defaultVariants: { nSize: 'default' },
  },
);

export type SwitchVariants = VariantProps<typeof switchVariants>;

type SwitchSize = NonNullable<SwitchVariants['nSize']>;

/** Thumb x-translate when checked, keyed by size. `label` = wider track when nShowTrackLabel. */
export const switchThumbTranslate: Record<SwitchSize, { normal: string; label: string }> = {
  sm:      { normal: 'translate-x-4', label: 'translate-x-9'  },
  default: { normal: 'translate-x-5', label: 'translate-x-10' },
  lg:      { normal: 'translate-x-7', label: 'translate-x-11' },
};

/** Extra track width when nShowTrackLabel is enabled, keyed by size. */
export const switchTrackLabelWidth: Record<SwitchSize, string> = {
  sm:      'w-[3.5rem]',
  default: 'w-16',
  lg:      'w-[4.5rem]',
};

/** Spinner size inside the thumb, keyed by size. */
export const switchSpinnerSize: Record<SwitchSize, string> = {
  sm:      'size-2.5',
  default: 'size-3',
  lg:      'size-4',
};
