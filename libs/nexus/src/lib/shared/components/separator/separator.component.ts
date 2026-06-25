import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import {
  separatorLineVariants,
  separatorRootVariants,
  type SeparatorLineVariants,
  type SeparatorRootVariants,
} from './separator.variants';

@Component({
  selector: 'n-separator',
  standalone: true,
  template: `
    <span
      data-slot="line"
      [class]="lineClasses()"
      class="flex-1"
      aria-hidden="true"
    ></span>
    <span
      data-slot="label"
      class="text-xs text-muted-foreground whitespace-nowrap flex items-center"
      [class.px-2]="hasMiddle() && nOrientation() === 'horizontal'"
      [class.py-2]="hasMiddle() && nOrientation() === 'vertical'"
      [hidden]="!hasMiddle()"
    >
      @if (nLabel()) { <span>{{ nLabel() }}</span> }
      <span #contentSlot class="flex items-center"><ng-content /></span>
    </span>
    <span
      data-slot="line"
      [class]="lineClasses()"
      class="flex-1"
      aria-hidden="true"
      [hidden]="!hasMiddle()"
    ></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'root',
    '[class]': 'rootClasses()',
    '[attr.role]': 'nDecorative() ? "none" : "separator"',
    '[attr.aria-orientation]':
      'nDecorative() ? null : (nOrientation() === "vertical" ? "vertical" : null)',
    '[attr.aria-label]': 'nDecorative() ? null : (nLabel() || null)',
  },
})
export class SeparatorComponent {
  readonly nOrientation = input<SeparatorLineVariants['nOrientation']>('horizontal');
  readonly nVariant     = input<SeparatorLineVariants['nVariant']>('solid');
  readonly nSize        = input<SeparatorLineVariants['nSize']>('default');
  readonly nIntensity   = input<SeparatorLineVariants['nIntensity']>('default');
  readonly nGradient    = input<boolean>(false);
  readonly nInset       = input<SeparatorRootVariants['nInset']>(false);
  readonly nDecorative  = input<boolean>(false);
  readonly nLabel       = input<string>('');
  readonly nClass       = input<string>('');

  private readonly _contentSlot = viewChild<ElementRef<HTMLElement>>('contentSlot');
  private readonly _hasProjected = signal(false);
  private readonly _destroyRef = inject(DestroyRef);

  protected readonly hasMiddle = computed(
    () => !!this.nLabel() || this._hasProjected(),
  );

  protected readonly rootClasses = computed(() =>
    mergeClasses(
      separatorRootVariants({ nOrientation: this.nOrientation(), nInset: this.nInset() }),
      this.nClass(),
    ),
  );

  protected readonly lineClasses = computed(() =>
    separatorLineVariants({
      nOrientation: this.nOrientation(),
      nVariant: this.nVariant(),
      nSize: this.nSize(),
      nIntensity: this.nIntensity(),
      nGradient: this.nGradient(),
    }),
  );

  constructor() {
    // Browser-only. Detects projected content and keeps tracking it, so the
    // separator reacts to content added/removed after init (e.g. an @if icon).
    afterNextRender(() => {
      const el = this._contentSlot()?.nativeElement;
      if (!el) return;
      const update = () =>
        this._hasProjected.set(
          (el.textContent?.trim().length ?? 0) > 0 || el.childElementCount > 0,
        );
      update();
      const observer = new MutationObserver(update);
      observer.observe(el, { childList: true, subtree: true, characterData: true });
      this._destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
