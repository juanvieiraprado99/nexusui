import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  inject,
  input,
  Renderer2,
  signal,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { mergeClasses } from '../../utils/merge-classes';
import { InputGroupControlDirective } from './input-group-control.directive';
import {
  inputGroupAddonVariants,
  inputGroupInputVariants,
  inputGroupVariants,
} from './input-group.variants';

@Component({
  selector: 'n-input-group',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (hasAddonBefore()) {
      <div [class]="addonBeforeClasses()" data-slot="addon-before">
        @if (isAddonBeforeTemplate()) {
          <ng-container [ngTemplateOutlet]="$any(nAddonBefore())" />
        } @else {
          {{ nAddonBefore() }}
        }
      </div>
    }

    <div class="relative flex flex-1 items-center" data-slot="control-wrapper">
      <ng-content />

      @if (hasTrailingIcons()) {
        <div [class]="trailingIconsClasses()" aria-hidden="false">
          @if (nClearable() && controlValue()) {
            <button
              type="button"
              class="flex h-5 w-5 items-center justify-center rounded-sm text-muted-foreground opacity-60 hover:opacity-100 hover:text-foreground transition-opacity"
              (click)="handleClear()"
              aria-label="Limpar campo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>
          }

          @if (nCopyable()) {
            <button
              type="button"
              class="flex h-5 w-5 items-center justify-center rounded-sm transition-opacity"
              [class]="copyButtonClasses()"
              [attr.disabled]="!controlValue() ? true : null"
              (click)="handleCopy()"
              [attr.aria-label]="showCopySuccess() ? 'Copiado' : 'Copiar'"
            >
              @if (showCopySuccess()) {
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-green-600">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                </svg>
              }
            </button>
          }

          @if (nLoading()) {
            <div class="pointer-events-none flex items-center" aria-hidden="true">
              <svg
                class="animate-spin h-4 w-4 shrink-0 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          }
        </div>
      }
    </div>

    @if (hasAddonAfter()) {
      <div [class]="addonAfterClasses()" data-slot="addon-after">
        @if (isAddonAfterTemplate()) {
          <ng-container [ngTemplateOutlet]="$any(nAddonAfter())" />
        } @else {
          {{ nAddonAfter() }}
        }
      </div>
    }
  `,
  host: {
    '[class]': 'classes()',
    '[attr.aria-disabled]': 'isDisabledOrLoading()',
    '[attr.data-disabled]': 'isDisabledOrLoading()',
    '[attr.aria-busy]': 'nLoading() || null',
    'data-slot': 'input-group',
    'role': 'group',
  },
})
export class InputGroupComponent {
  readonly nAddonBefore  = input<string | TemplateRef<void>>('');
  readonly nAddonAfter   = input<string | TemplateRef<void>>('');
  readonly nAddonAlign   = input<'inline' | 'block'>('inline');
  readonly nSize         = input<'sm' | 'default' | 'lg'>('default');
  readonly nDisabled     = input(false, { transform: booleanAttribute });
  readonly nLoading      = input(false, { transform: booleanAttribute });
  readonly nClearable    = input(false, { transform: booleanAttribute });
  readonly nCopyable     = input(false, { transform: booleanAttribute });
  readonly nClass        = input<string>('');

  private readonly control  = contentChild(InputGroupControlDirective);
  private readonly renderer = inject(Renderer2);

  protected readonly isDisabledOrLoading   = computed(() => (this.nDisabled() || this.nLoading()) ? true : null);
  protected readonly hasAddonBefore        = computed(() => !!this.nAddonBefore());
  protected readonly hasAddonAfter         = computed(() => !!this.nAddonAfter());
  protected readonly isTextarea            = computed(() => this.control()?.isTextarea() ?? false);
  protected readonly isAddonBeforeTemplate = computed(() => this.nAddonBefore() instanceof TemplateRef);
  protected readonly isAddonAfterTemplate  = computed(() => this.nAddonAfter() instanceof TemplateRef);
  protected readonly controlValue          = computed(() => this.control()?.value() ?? '');
  protected readonly hasTrailingIcons      = computed(() => this.nLoading() || this.nClearable() || this.nCopyable());
  protected readonly showCopySuccess       = signal(false);

  protected readonly classes = computed(() =>
    mergeClasses(
      inputGroupVariants({ nSize: this.nSize() }),
      this.nAddonAlign() === 'block' && 'flex-col h-auto',
      this.nClass(),
    ),
  );

  protected readonly addonBeforeClasses = computed(() =>
    inputGroupAddonVariants({
      nSize: this.nSize(),
      nPosition: 'before',
      nType: this.isTextarea() ? 'textarea' : 'default',
    }),
  );

  protected readonly addonAfterClasses = computed(() =>
    inputGroupAddonVariants({
      nSize: this.nSize(),
      nPosition: 'after',
      nType: this.isTextarea() ? 'textarea' : 'default',
    }),
  );

  protected readonly trailingIconsClasses = computed(() =>
    mergeClasses(
      'absolute right-2 flex items-center gap-0.5',
      this.isTextarea() ? 'top-2' : 'top-1/2 -translate-y-1/2',
    ),
  );

  protected readonly copyButtonClasses = computed(() =>
    mergeClasses(
      'text-muted-foreground',
      this.controlValue()
        ? 'opacity-60 hover:opacity-100 hover:text-foreground'
        : 'opacity-30 cursor-not-allowed',
    ),
  );

  constructor() {
    effect(() => {
      const ctrl = this.control();
      if (!ctrl) return;

      ctrl.size.set(this.nSize());
      ctrl.disabled.set(this.nDisabled() || this.nLoading());

      const el = ctrl.elementRef.nativeElement;
      const classes = inputGroupInputVariants({
        nSize: this.nSize(),
        nHasAddonBefore: this.hasAddonBefore(),
        nHasAddonAfter: this.hasAddonAfter(),
        nHasTrailingIcons: this.hasTrailingIcons(),
      });

      const prev = el.getAttribute('data-ig-prev') ?? '';
      prev.split(' ').filter(Boolean).forEach(c => this.renderer.removeClass(el, c));
      classes.split(' ').filter(Boolean).forEach(c => this.renderer.addClass(el, c));
      el.setAttribute('data-ig-prev', classes);
    });
  }

  protected handleClear(): void {
    const el = this.control()?.elementRef.nativeElement;
    if (!el) return;
    this.renderer.setProperty(el, 'value', '');
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.focus();
  }

  protected async handleCopy(): Promise<void> {
    const val = this.controlValue();
    if (!val) return;
    try {
      await navigator.clipboard.writeText(val);
      this.showCopySuccess.set(true);
      setTimeout(() => this.showCopySuccess.set(false), 1500);
    } catch {
      // clipboard unavailable (insecure context)
    }
  }
}
