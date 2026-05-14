import { cva, type VariantProps } from 'class-variance-authority';

export const drawerContentVariants = cva(
  ['fixed z-50 bg-background shadow-xl', 'flex flex-col'],
  {
    variants: {
      nPosition: {
        left:   'top-0 left-0 h-full border-r',
        right:  'top-0 right-0 h-full border-l',
        top:    'top-0 left-0 w-full border-b',
        bottom: 'bottom-0 left-0 w-full border-t',
      },
    },
    defaultVariants: { nPosition: 'right' },
  },
);

export type DrawerContentVariants = VariantProps<typeof drawerContentVariants>;
