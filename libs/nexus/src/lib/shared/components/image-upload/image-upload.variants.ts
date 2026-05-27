import { cva, type VariantProps } from 'class-variance-authority';

export const imageUploadVariants = cva(
  'relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input bg-background transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      nVariant: {
        dropzone: 'w-full cursor-pointer hover:border-primary/60 hover:bg-accent/40',
        avatar: 'rounded-full cursor-pointer overflow-hidden hover:opacity-80',
      },
      nSize: {
        sm:      '',
        default: '',
        lg:      '',
      },
    },
    compoundVariants: [
      { nVariant: 'dropzone', nSize: 'sm',      class: 'min-h-28 p-4' },
      { nVariant: 'dropzone', nSize: 'default', class: 'min-h-40 p-6' },
      { nVariant: 'dropzone', nSize: 'lg',      class: 'min-h-52 p-8' },
      { nVariant: 'avatar',   nSize: 'sm',      class: 'h-16 w-16' },
      { nVariant: 'avatar',   nSize: 'default', class: 'h-24 w-24' },
      { nVariant: 'avatar',   nSize: 'lg',      class: 'h-32 w-32' },
    ],
    defaultVariants: {
      nVariant: 'dropzone',
      nSize: 'default',
    },
  },
);

export type ImageUploadVariants = VariantProps<typeof imageUploadVariants>;
