import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  TemplateRef,
  ViewContainerRef,
  viewChild,
  afterNextRender,
  computed,
  forwardRef,
  inject,
  input,
  linkedSignal,
  model,
  output,
  signal,
  type Signal,
} from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { ControlValueAccessor } from '@angular/forms';
import {
  ConnectedPosition,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { injectFormControl } from '../../utils/form-control';
import { mergeClasses } from '../../utils/merge-classes';
import { LabelComponent } from '../label';
import { COLOR_PICKER_CONTEXT, type ColorPickerContext, type ColorFormat } from './color-picker.tokens';
import { ColorPickerCanvasComponent } from './color-picker-canvas.component';
import { ColorPickerHueSliderComponent } from './color-picker-hue-slider.component';
import { ColorPickerAlphaSliderComponent } from './color-picker-alpha-slider.component';
import { ColorPickerSwatchComponent } from './color-picker-swatch.component';
import {
  type HsvColor,
  hsvToString,
  stringToHsv,
} from './color-picker.utils';
import {
  colorPickerVariants,
  colorPickerTriggerVariants,
  type ColorPickerVariants,
} from './color-picker.variants';

let _cpIdCounter = 0;
const RECENT_KEY = 'nexus-color-picker-recent';
const RECENT_MAX = 8;

interface EyeDropper {
  open(): Promise<{ sRGBHex: string }>;
}

declare global {
  interface Window {
    EyeDropper?: { new (): EyeDropper };
  }
}

@Component({
  selector: 'n-color-picker',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    LabelComponent,
    ColorPickerCanvasComponent,
    ColorPickerHueSliderComponent,
    ColorPickerAlphaSliderComponent,
    ColorPickerSwatchComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  providers: [
    { provide: COLOR_PICKER_CONTEXT, useExisting: forwardRef(() => ColorPickerComponent) },
  ],
  template: `
    <div data-slot="root" [class]="rootClasses()">

      @if (nLabel()) {
        <n-label
          [nFor]="nMode() === 'popup' ? pickerId() : ''"
          [nRequired]="nRequired()"
          [nDisabled]="disabled()"
        >{{ nLabel() }}</n-label>
      }

      @if (nMode() === 'popup') {
        <div #trigger class="flex items-center gap-1 w-fit">
          <button
            type="button"
            [id]="pickerId()"
            data-slot="trigger"
            [class]="triggerClasses()"
            [disabled]="disabled()"
            [attr.aria-haspopup]="'dialog'"
            [attr.aria-expanded]="open()"
            [attr.aria-controls]="contentId()"
            [attr.aria-label]="nLabel() ? null : nAriaLabel() || null"
            [attr.aria-describedby]="describedBy()"
            [attr.aria-invalid]="hasError() ? true : null"
            [attr.data-state]="open() ? 'open' : 'closed'"
            (click)="toggle()"
            (keydown)="onTriggerKeydown($event)"
          >
            <span
              aria-hidden="true"
              class="w-5 h-5 rounded-sm border border-black/10 shrink-0 transition-colors"
              [style.background]="nValue() || '#ffffff'"
            ></span>
            <span class="truncate flex-1 text-left">{{ nValue() || 'Pick a color' }}</span>
          </button>

          @if (nValue()) {
            <button
              type="button"
              [class]="iconBtnClasses()"
              [attr.aria-label]="copied() ? 'Copied!' : 'Copy color value'"
              [disabled]="disabled()"
              (click)="copyValue()"
            >
              <ng-container [ngTemplateOutlet]="copyIconTpl" />
            </button>
          }
        </div>
      }

      @if (nMode() === 'inline') {
        <ng-container [ngTemplateOutlet]="panelTpl" />
      }

      <ng-template #panelTpl>
        <div
          [id]="contentId()"
          data-slot="content"
          [attr.role]="nMode() === 'popup' ? 'dialog' : 'group'"
          aria-label="Color picker"
          [class]="panelClasses()"
        >
          <!-- SV Canvas -->
          <n-color-picker-canvas class="block h-44 rounded-sm" />

          <!-- Sliders -->
          <div class="flex flex-col gap-2.5 pt-0.5">
            <n-color-picker-hue-slider />
            @if (nShowAlpha()) {
              <n-color-picker-alpha-slider />
            }
          </div>

          <!-- Format row -->
          <div class="flex items-center gap-1.5">
            <div class="relative flex-1">
              <span
                aria-hidden="true"
                class="pointer-events-none absolute inset-y-0 left-2 flex items-center"
              >
                <span
                  class="block w-4 h-4 rounded-sm border border-border"
                  [style.background]="nValue()"
                ></span>
              </span>
              <input
                type="text"
                data-slot="control"
                [class]="formatInputClasses()"
                [value]="nValue()"
                [attr.aria-label]="'Color value in ' + format() + ' format'"
                (blur)="onFormatBlur($event)"
                (keydown.enter)="onFormatEnter($event)"
              />
            </div>
            <button
              type="button"
              [class]="iconBtnClasses()"
              [attr.aria-label]="'Switch to ' + nextFormat() + ' format'"
              style="min-width:2.75rem"
              (click)="cycleFormat()"
            >
              <span class="text-[10px] font-mono font-semibold">{{ format().toUpperCase() }}</span>
            </button>
            @if (nShowEyedropper() && eyedropperSupported()) {
              <button
                type="button"
                [class]="iconBtnClasses()"
                aria-label="Pick color from screen"
                (click)="openEyedropper()"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8Z"/></svg>
              </button>
            }
            <button
              type="button"
              [class]="iconBtnClasses()"
              [attr.aria-label]="copied() ? 'Copied!' : 'Copy color value'"
              (click)="copyValue()"
            >
              <ng-container [ngTemplateOutlet]="copyIconTpl" />
            </button>
          </div>

          <!-- Presets -->
          @if (nPresets().length > 0) {
            <div data-slot="presets" class="flex flex-col gap-1.5">
              <span class="text-xs text-muted-foreground">Presets</span>
              <div class="flex flex-wrap gap-1.5">
                @for (preset of nPresets(); track preset) {
                  <n-color-picker-swatch
                    [nColor]="preset"
                    [nActive]="nValue() === preset"
                    (nSelect)="onPresetSelect($event)"
                  />
                }
              </div>
            </div>
          }

          <!-- Recent colors -->
          @if (nMode() !== 'inline' && recentColors().length > 0) {
            <div data-slot="recent" class="flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <span class="text-xs text-muted-foreground">Recent</span>
                <button
                  type="button"
                  class="flex items-center justify-center w-5 h-5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  aria-label="Clear recent colors"
                  (click)="clearRecent()"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                </button>
              </div>
              <div class="flex flex-wrap gap-1.5">
                @for (color of recentColors(); track color) {
                  <n-color-picker-swatch
                    [nColor]="color"
                    [nActive]="nValue() === color"
                    (nSelect)="onPresetSelect($event)"
                  />
                }
              </div>
            </div>
          }

        </div>
      </ng-template>

      <ng-template #copyIconTpl>
        @if (copied()) {
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
        } @else {
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        }
      </ng-template>

      @if (hasError()) {
        <p [id]="errorId()" class="mt-1 text-xs text-destructive" role="alert" data-slot="error">
          {{ nError() }}
        </p>
      }
      @if (nHint() && !hasError()) {
        <p [id]="hintId()" class="mt-1 text-xs text-muted-foreground" data-slot="hint">
          {{ nHint() }}
        </p>
      }

    </div>
  `,
})
export class ColorPickerComponent implements ControlValueAccessor, ColorPickerContext, OnDestroy {
  // ── Inputs ──────────────────────────────────────────────────────────────────
  readonly nValue          = model<string>('');
  readonly nMode           = input<'inline' | 'popup'>('popup');
  readonly nFormat         = input<ColorFormat>('hex');
  readonly nShowAlpha      = input<boolean>(false);
  readonly nPresets        = input<string[]>([]);
  readonly nShowEyedropper = input<boolean>(false);
  readonly nSize           = input<ColorPickerVariants['nSize']>('default');
  readonly nLabel          = input<string>('');
  readonly nError          = input<string | null>(null);
  readonly nHint           = input<string | null>(null);
  readonly nRequired       = input<boolean>(false);
  readonly nDisabled       = input<boolean>(false);
  readonly nClass          = input<string>('');
  readonly nId             = input<string>('');
  readonly nAriaLabel      = input<string>('');

  readonly nChange     = output<string>();
  readonly nOpenChange = output<boolean>();

  // ── Private state ────────────────────────────────────────────────────────────
  private readonly _hsv    = signal<HsvColor>({ h: 0, s: 0, v: 1, a: 1 });
  private readonly _format = linkedSignal<ColorFormat>(() => this.nFormat());
  private readonly _open   = signal(false);
  private readonly _recent = signal<string[]>([]);
  private readonly _copied = signal(false);
  private _copiedTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly _staticId   = `n-cp-${++_cpIdCounter}`;
  private readonly _form       = injectFormControl<string>(this);
  private readonly _overlay    = inject(Overlay);
  private readonly _vcr        = inject(ViewContainerRef);
  private readonly _platformId = inject(PLATFORM_ID);

  private readonly _triggerEl = viewChild<ElementRef<HTMLElement>>('trigger');
  private readonly _panelTpl = viewChild.required<TemplateRef<unknown>>('panelTpl');

  private _overlayRef: OverlayRef | null = null;
  private _portal: TemplatePortal | null = null;
  private _backdropSub?: Subscription;

  // ── ColorPickerContext (provided via useExisting) ─────────────────────────────
  readonly hsv:       Signal<HsvColor>    = this._hsv.asReadonly();
  readonly format:    Signal<ColorFormat> = this._format.asReadonly();
  readonly showAlpha: Signal<boolean>     = computed(() => this.nShowAlpha());
  readonly disabled:  Signal<boolean>     = computed(() => this.nDisabled() || this._form.disabledByForm());

  updateHsv(patch: Partial<HsvColor>): void {
    this._hsv.update(c => ({ ...c, ...patch }));
    this._emit();
  }

  setHue(h: number): void {
    this._hsv.update(c => ({ ...c, h: Math.max(0, Math.min(360, h)) }));
    this._emit();
  }

  setSV(s: number, v: number): void {
    this._hsv.update(c => ({ ...c, s: Math.max(0, Math.min(1, s)), v: Math.max(0, Math.min(1, v)) }));
    this._emit();
  }

  setAlpha(a: number): void {
    this._hsv.update(c => ({ ...c, a: Math.max(0, Math.min(1, a)) }));
    this._emit();
  }

  setFormat(f: ColorFormat): void {
    this._format.set(f);
    this._emit();
  }

  // ── Computed ─────────────────────────────────────────────────────────────────
  protected readonly hasError = computed(
    () => !!this.nError() || (this._form.controlInvalid() && this._form.controlTouched()),
  );

  protected readonly pickerId  = computed(() => this.nId() || this._staticId);
  protected readonly contentId = computed(() => `${this.pickerId()}-content`);
  protected readonly errorId   = computed(() => `${this.pickerId()}-error`);
  protected readonly hintId    = computed(() => `${this.pickerId()}-hint`);

  protected readonly open         = this._open.asReadonly();
  protected readonly recentColors = this._recent.asReadonly();
  protected readonly copied       = this._copied.asReadonly();

  protected readonly eyedropperSupported = signal(false);

  protected readonly describedBy = computed<string | null>(() => {
    if (this.hasError()) return this.errorId();
    if (this.nHint())   return this.hintId();
    return null;
  });

  protected readonly nextFormat = computed<ColorFormat>(() => {
    const order: ColorFormat[] = ['hex', 'rgb', 'hsl', 'oklch'];
    return order[(order.indexOf(this._format()) + 1) % order.length];
  });

  // ── Classes ───────────────────────────────────────────────────────────────────
  protected readonly rootClasses = computed(() =>
    mergeClasses(colorPickerVariants({ nSize: this.nSize() }), this.nClass()),
  );

  protected readonly triggerClasses = computed(() =>
    mergeClasses(colorPickerTriggerVariants({ nSize: this.nSize() })),
  );

  protected readonly panelClasses = computed(() =>
    mergeClasses(
      'flex flex-col gap-3 p-3 rounded-lg border border-border bg-popover shadow-md w-64',
      this.nMode() === 'inline' && 'shadow-none border-border/50',
    ),
  );

  protected readonly formatInputClasses = computed(() =>
    mergeClasses(
      'w-full h-8 pl-8 pr-2 text-xs border border-input rounded-md bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-mono',
      this.disabled() && 'opacity-50 cursor-not-allowed',
    ),
  );

  protected readonly iconBtnClasses = computed(() =>
    mergeClasses(
      'h-8 w-8 flex items-center justify-center border border-input rounded-md bg-background hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring shrink-0',
    ),
  );

  // ── Lifecycle ─────────────────────────────────────────────────────────────────

  constructor() {
    afterNextRender(() => {
      this._portal = new TemplatePortal(this._panelTpl(), this._vcr);

      const parsed = stringToHsv(this.nValue());
      if (parsed) {
        this._hsv.set(parsed);
        this.nValue.set(hsvToString(parsed, this._format(), this.nShowAlpha()));
      }

      if (!isPlatformBrowser(this._platformId)) return;

      try {
        const stored = localStorage.getItem(RECENT_KEY);
        if (stored) this._recent.set(JSON.parse(stored));
      } catch { /* ignore */ }

      if ('EyeDropper' in window) this.eyedropperSupported.set(true);
    });
  }

  ngOnDestroy(): void {
    this._detach();
    if (this._copiedTimer) clearTimeout(this._copiedTimer);
  }

  // ── Popup ──────────────────────────────────────────────────────────────────────

  protected toggle(): void {
    if (this.disabled()) return;
    if (this._open()) this._close(true);
    else this._openPanel();
  }

  private _openPanel(): void {
    if (this._open()) return;
    this._open.set(true);
    this.nOpenChange.emit(true);
    this._attach();
  }

  private _close(returnFocus: boolean): void {
    if (!this._open()) return;
    this._open.set(false);
    this.nOpenChange.emit(false);
    this._detach();
    this._form.notifyTouched();
    this._saveRecent(this.nValue());
    if (returnFocus) queueMicrotask(() =>
      (this._triggerEl()?.nativeElement.querySelector('button') as HTMLElement | null)?.focus(),
    );
  }

  private _attach(): void {
    const trigger = this._triggerEl()?.nativeElement;
    if (!trigger || !this._portal || this._overlayRef?.hasAttached()) return;

    const positions: ConnectedPosition[] = [
      { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top',    offsetY:  4 },
      { originX: 'start', originY: 'top',    overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
      { originX: 'end',   originY: 'bottom', overlayX: 'end',   overlayY: 'top',    offsetY:  4 },
      { originX: 'end',   originY: 'top',    overlayX: 'end',   overlayY: 'bottom', offsetY: -4 },
    ];

    const config = new OverlayConfig({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(trigger)
        .withPositions(positions)
        .withFlexibleDimensions(false)
        .withPush(true),
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    this._overlayRef = this._overlay.create(config);
    this._overlayRef.attach(this._portal);
    this._backdropSub = this._overlayRef.backdropClick().subscribe(() => this._close(false));
    this._overlayRef.keydownEvents().subscribe(e => {
      if (e.key === 'Escape') { e.preventDefault(); this._close(true); }
      else if (e.key === 'Tab') this._close(false);
    });
  }

  private _detach(): void {
    this._backdropSub?.unsubscribe();
    this._backdropSub = undefined;
    if (this._overlayRef?.hasAttached()) this._overlayRef.detach();
    this._overlayRef?.dispose();
    this._overlayRef = null;
  }

  protected onTriggerKeydown(e: KeyboardEvent): void {
    // Enter/Space already fire the native button click → toggle(); only ArrowDown needs handling.
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._openPanel();
    }
  }

  // ── Format ────────────────────────────────────────────────────────────────────

  protected cycleFormat(): void {
    const order: ColorFormat[] = ['hex', 'rgb', 'hsl', 'oklch'];
    this._format.set(order[(order.indexOf(this._format()) + 1) % order.length]);
    this._emit();
  }

  protected onFormatBlur(e: FocusEvent): void {
    const raw = (e.target as HTMLInputElement).value.trim();
    const parsed = stringToHsv(raw);
    if (parsed) {
      this._hsv.set(parsed);
      this._emit();
    } else {
      (e.target as HTMLInputElement).value = this.nValue();
    }
  }

  protected onFormatEnter(e: Event): void {
    (e.target as HTMLInputElement).blur();
  }

  // ── Presets / Recent ─────────────────────────────────────────────────────────

  protected onPresetSelect(color: string): void {
    const parsed = stringToHsv(color);
    if (!parsed) return;
    this._hsv.set(parsed);
    this._emit();
    this._saveRecent(color);
  }

  private _saveRecent(color: string): void {
    if (!isPlatformBrowser(this._platformId) || !color) return;
    const next = [color, ...this._recent().filter(c => c !== color)].slice(0, RECENT_MAX);
    this._recent.set(next);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  }

  protected clearRecent(): void {
    this._recent.set([]);
    try { localStorage.removeItem(RECENT_KEY); } catch { /* ignore */ }
  }

  // ── Eyedropper ────────────────────────────────────────────────────────────────

  protected openEyedropper(): void {
    if (!window.EyeDropper) return;
    new window.EyeDropper().open().then(res => {
      const parsed = stringToHsv(res.sRGBHex);
      if (parsed) { this._hsv.set(parsed); this._emit(); }
    }).catch(() => { /* user cancelled */ });
  }

  // ── Copy ──────────────────────────────────────────────────────────────────────

  protected copyValue(): void {
    const v = this.nValue();
    if (!v || !navigator?.clipboard) return;
    navigator.clipboard.writeText(v).then(() => {
      this._copied.set(true);
      if (this._copiedTimer) clearTimeout(this._copiedTimer);
      this._copiedTimer = setTimeout(() => this._copied.set(false), 1500);
    }).catch(() => { /* ignore */ });
  }

  // ── Emit ──────────────────────────────────────────────────────────────────────

  private _emit(): void {
    const str = hsvToString(this._hsv(), this._format(), this.nShowAlpha());
    this.nValue.set(str);
    this._form.notifyChange(str);
    this.nChange.emit(str);
  }

  // ── ControlValueAccessor ──────────────────────────────────────────────────────

  writeValue(v: string | null | undefined): void {
    const str = v ?? '';
    if (!str) { this.nValue.set(''); return; }
    const parsed = stringToHsv(str);
    if (parsed) {
      this._hsv.set(parsed);
      this.nValue.set(hsvToString(parsed, this._format(), this.nShowAlpha()));
    } else {
      this.nValue.set(str);
    }
  }

  registerOnChange(fn: (v: string) => void): void { this._form.setOnChange(fn); }
  registerOnTouched(fn: () => void): void          { this._form.setOnTouched(fn); }
  setDisabledState(d: boolean): void               { this._form.setDisabledByForm(d); }
}
