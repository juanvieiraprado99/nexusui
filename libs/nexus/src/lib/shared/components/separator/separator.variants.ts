import { cva, type VariantProps } from 'class-variance-authority';

export const separatorLineVariants = cva(
  'shrink-0',
  {
    variants: {
      nOrientation: {
        horizontal: 'h-px w-full',
        vertical: 'w-px h-full min-h-4',
      },
      nVariant: {
        solid: 'bg-border',
        dashed: 'bg-transparent border-dashed border-border',
        dotted: 'bg-transparent border-dotted border-border',
      },
      nSize: {
        sm: '',
        default: '',
        lg: '',
      },
      nIntensity: {
        default: '',
        muted: 'opacity-50',
        strong: '',
      },
      nGradient: {
        true: 'bg-gradient-to-r from-transparent via-border to-transparent',
        false: '',
      },
    },
    compoundVariants: [
      // thickness × orientation
      { nOrientation: 'horizontal', nSize: 'sm', class: 'h-px' },
      { nOrientation: 'horizontal', nSize: 'default', class: 'h-px' },
      { nOrientation: 'horizontal', nSize: 'lg', class: 'h-0.5' },
      { nOrientation: 'vertical', nSize: 'sm', class: 'w-px' },
      { nOrientation: 'vertical', nSize: 'default', class: 'w-px' },
      { nOrientation: 'vertical', nSize: 'lg', class: 'w-0.5' },
      // dashed/dotted use border instead of bg — strip h/w to border
      { nVariant: 'dashed', nOrientation: 'horizontal', class: 'border-t bg-transparent h-0' },
      { nVariant: 'dotted', nOrientation: 'horizontal', class: 'border-t bg-transparent h-0' },
      { nVariant: 'dashed', nOrientation: 'vertical', class: 'border-l bg-transparent w-0' },
      { nVariant: 'dotted', nOrientation: 'vertical', class: 'border-l bg-transparent w-0' },
      // intensity
      { nVariant: 'solid', nIntensity: 'strong', class: 'bg-foreground/30' },
      { nVariant: 'dashed', nIntensity: 'strong', class: 'border-foreground/30' },
      { nVariant: 'dotted', nIntensity: 'strong', class: 'border-foreground/30' },
      // gradient overrides solid bg
      { nGradient: true, nVariant: 'solid', class: 'bg-gradient-to-r from-transparent via-border to-transparent' },
    ],
    defaultVariants: {
      nOrientation: 'horizontal',
      nVariant: 'solid',
      nSize: 'default',
      nIntensity: 'default',
      nGradient: false,
    },
  },
);

export type SeparatorLineVariants = VariantProps<typeof separatorLineVariants>;

export const separatorRootVariants = cva(
  'flex items-center',
  {
    variants: {
      nOrientation: {
        horizontal: 'w-full flex-row',
        vertical: 'h-full flex-col self-stretch',
      },
      nInset: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { nOrientation: 'horizontal', nInset: true, class: 'my-4' },
      { nOrientation: 'vertical', nInset: true, class: 'mx-4' },
    ],
    defaultVariants: {
      nOrientation: 'horizontal',
      nInset: false,
    },
  },
);

export type SeparatorRootVariants = VariantProps<typeof separatorRootVariants>;
