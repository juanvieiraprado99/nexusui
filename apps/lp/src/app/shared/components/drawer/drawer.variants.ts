import { cva, type VariantProps } from 'class-variance-authority';

export const drawerContentVariants = cva(
  ['fixed z-50 bg-background shadow-xl', 'flex flex-col', 'transition-transform duration-300'],
  {
    variants: {
      nPosition: {
        left:   'top-0 left-0 h-full border-r',
        right:  'top-0 right-0 h-full border-l',
        top:    'top-0 left-0 w-full border-b',
        bottom: 'bottom-0 left-0 w-full border-t',
      },
      nSize: { sm: '', md: '', lg: '', xl: '', full: '' },
    },
    compoundVariants: [
      // horizontal (left/right) → controla a largura
      { nPosition: ['left', 'right'], nSize: 'sm',   class: 'w-64' },
      { nPosition: ['left', 'right'], nSize: 'md',   class: 'w-80' },
      { nPosition: ['left', 'right'], nSize: 'lg',   class: 'w-96' },
      { nPosition: ['left', 'right'], nSize: 'xl',   class: 'w-[28rem]' },
      { nPosition: ['left', 'right'], nSize: 'full', class: 'w-full' },
      // vertical (top/bottom) → controla a altura
      { nPosition: ['top', 'bottom'], nSize: 'sm',   class: 'h-48' },
      { nPosition: ['top', 'bottom'], nSize: 'md',   class: 'h-72' },
      { nPosition: ['top', 'bottom'], nSize: 'lg',   class: 'h-96' },
      { nPosition: ['top', 'bottom'], nSize: 'xl',   class: 'h-[28rem]' },
      { nPosition: ['top', 'bottom'], nSize: 'full', class: 'h-full' },
    ],
    defaultVariants: { nPosition: 'right', nSize: 'md' },
  },
);

export type DrawerContentVariants = VariantProps<typeof drawerContentVariants>;
