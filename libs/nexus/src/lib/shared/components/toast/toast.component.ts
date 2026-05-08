import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { NgxSonnerToaster } from 'ngx-sonner';
import { mergeClasses } from '../../utils/merge-classes';
import { toastVariants, type ToastVariants } from './toast.variants';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

@Component({
  selector: 'n-toast, n-toaster',
  standalone: true,
  imports: [NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster
      [theme]="nTheme()"
      [class]="classes()"
      [position]="nPosition()"
      [richColors]="nRichColors()"
      [expand]="nExpand()"
      [duration]="nDuration()"
      [visibleToasts]="nVisibleToasts()"
      [closeButton]="nCloseButton()"
      [toastOptions]="nToastOptions()"
      [dir]="nDir()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ViewEncapsulation.None needed: ngx-sonner injects global CSS that must be unscoped
  encapsulation: ViewEncapsulation.None,
})
export class ToastComponent {
  readonly nClass = input<string>('');
  readonly nVariant = input<ToastVariants['nVariant']>('default');
  readonly nTheme = input<'light' | 'dark' | 'system'>('system');
  readonly nPosition = input<ToastPosition>('bottom-right');
  readonly nRichColors = input<boolean>(false);
  readonly nExpand = input<boolean>(false);
  readonly nDuration = input<number>(4000);
  readonly nVisibleToasts = input<number>(3);
  readonly nCloseButton = input<boolean>(false);
  readonly nToastOptions = input<Record<string, unknown>>({});
  readonly nDir = input<'ltr' | 'rtl' | 'auto'>('auto');

  protected readonly classes = computed(() =>
    mergeClasses('toaster group', toastVariants({ nVariant: this.nVariant() }), this.nClass()),
  );
}
