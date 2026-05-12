import { cva } from 'class-variance-authority';

export const calendarVariants = cva('bg-background p-3 w-fit rounded-lg border border-border');

export const calendarNavVariants = cva('flex items-center justify-between gap-2 mb-4');

export const calendarWeekdayVariants = cva(
  'text-muted-foreground font-normal text-center text-[0.75rem] w-9 py-1',
);

export const calendarDayVariants = cva(
  'p-0 relative focus-within:relative focus-within:z-20 flex mt-1 size-9',
);

export const calendarDayButtonVariants = cva(
  [
    'p-0 font-normal flex items-center justify-center whitespace-nowrap rounded-md',
    'ring-offset-background transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'hover:bg-accent hover:text-accent-foreground size-full text-sm',
  ],
  {
    variants: {
      selected: {
        true: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        false: '',
      },
      today: {
        true: 'border border-primary',
        false: '',
      },
      outside: {
        true: 'text-muted-foreground opacity-50',
        false: '',
      },
      disabled: {
        true: 'text-muted-foreground opacity-50 cursor-not-allowed',
        false: '',
      },
      rangeStart: {
        true: 'rounded-r-none bg-primary text-primary-foreground',
        false: '',
      },
      rangeEnd: {
        true: 'rounded-l-none bg-primary text-primary-foreground',
        false: '',
      },
      inRange: {
        true: 'rounded-none bg-accent hover:bg-accent',
        false: '',
      },
    },
    compoundVariants: [
      {
        today: true,
        selected: false,
        rangeStart: false,
        rangeEnd: false,
        inRange: false,
        className: 'bg-accent/50 text-accent-foreground',
      },
      {
        today: true,
        selected: true,
        className: 'bg-primary text-primary-foreground border-primary',
      },
      {
        rangeStart: true,
        rangeEnd: true,
        className: 'rounded-md bg-primary text-primary-foreground',
      },
    ],
    defaultVariants: {
      selected: false,
      today: false,
      outside: false,
      disabled: false,
      rangeStart: false,
      rangeEnd: false,
      inRange: false,
    },
  },
);
