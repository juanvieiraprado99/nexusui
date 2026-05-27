import {
  afterNextRender,
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { mergeClasses } from '../../utils/merge-classes';
import { COLOR_PICKER_CONTEXT } from './color-picker.tokens';
import { hsvToRgb, type HsvColor } from './color-picker.utils';

@Component({
  selector: 'n-color-picker-canvas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
  template: `
    <canvas
      #canvas
      data-slot="control"
      class="block w-full h-full touch-none rounded-sm"
      tabindex="0"
      role="img"
      [attr.aria-label]="ariaLabel()"
      (keydown)="onKeydown($event)"
    ></canvas>
    <span class="sr-only" aria-live="polite" aria-atomic="true">{{ ariaLabel() }}</span>
  `,
})
export class ColorPickerCanvasComponent implements OnDestroy {
  private readonly _ctx    = inject(COLOR_PICKER_CONTEXT);
  private readonly _pid    = inject(PLATFORM_ID);
  private readonly _ref    = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private _ctx2d:  CanvasRenderingContext2D | null = null;
  private _ro:     ResizeObserver | null = null;
  private _drag    = false;

  protected readonly ariaLabel = computed(() => {
    const { h, s, v } = this._ctx.hsv();
    return `Color canvas. Hue ${Math.round(h)}°, saturation ${Math.round(s * 100)}%, brightness ${Math.round(v * 100)}%.`;
  });

  protected readonly hostClasses = computed(() =>
    mergeClasses(
      'relative overflow-hidden',
      this._ctx.disabled() && 'opacity-50 pointer-events-none',
    ),
  );

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this._pid)) return;
      this._init();
    });

    afterRenderEffect({
      write: () => {
        const hsv = this._ctx.hsv();
        if (!this._ctx2d) return;
        this._draw(hsv);
      },
    });
  }

  ngOnDestroy(): void {
    const el = this._ref()?.nativeElement;
    if (el) {
      el.removeEventListener('pointerdown', this._onDown);
      el.removeEventListener('pointermove', this._onMove);
      el.removeEventListener('pointerup', this._onUp);
      el.removeEventListener('lostpointercapture', this._onUp);
    }
    this._ro?.disconnect();
  }

  private _init(): void {
    const canvas = this._ref().nativeElement;
    this._ctx2d = canvas.getContext('2d');
    if (!this._ctx2d) return;

    this._sync(canvas);
    this._draw(this._ctx.hsv());

    canvas.addEventListener('pointerdown', this._onDown);
    canvas.addEventListener('pointermove', this._onMove);
    canvas.addEventListener('pointerup', this._onUp);
    canvas.addEventListener('lostpointercapture', this._onUp);

    this._ro = new ResizeObserver(() => {
      this._sync(canvas);
      this._draw(this._ctx.hsv());
    });
    this._ro.observe(canvas);
  }

  private _sync(canvas: HTMLCanvasElement): void {
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = Math.round(canvas.clientWidth  * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    this._ctx2d?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private _draw(hsv: HsvColor): void {
    const ctx = this._ctx2d!;
    const w = ctx.canvas.clientWidth;
    const h = ctx.canvas.clientHeight;
    if (w === 0 || h === 0) return;

    const { r, g, b } = hsvToRgb({ h: hsv.h, s: 1, v: 1, a: 1 });
    const ri = Math.round(r * 255), gi = Math.round(g * 255), bi = Math.round(b * 255);

    const hGrad = ctx.createLinearGradient(0, 0, w, 0);
    hGrad.addColorStop(0, '#ffffff');
    hGrad.addColorStop(1, `rgb(${ri},${gi},${bi})`);
    ctx.fillStyle = hGrad;
    ctx.fillRect(0, 0, w, h);

    const vGrad = ctx.createLinearGradient(0, 0, 0, h);
    vGrad.addColorStop(0, 'rgba(0,0,0,0)');
    vGrad.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = vGrad;
    ctx.fillRect(0, 0, w, h);

    const cx = hsv.s * w;
    const cy = (1 - hsv.v) * h;
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  private _fromPointer(e: PointerEvent): void {
    const canvas = this._ref().nativeElement;
    const rect   = canvas.getBoundingClientRect();
    const s = Math.max(0, Math.min(1, (e.clientX - rect.left)  / rect.width));
    const v = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
    this._ctx.setSV(s, v);
  }

  private _onDown = (e: PointerEvent): void => {
    if (this._ctx.disabled()) return;
    e.preventDefault();
    (e.currentTarget as HTMLCanvasElement).setPointerCapture(e.pointerId);
    this._drag = true;
    this._fromPointer(e);
  };

  private _onMove = (e: PointerEvent): void => {
    if (!this._drag) return;
    this._fromPointer(e);
  };

  private _onUp = (): void => { this._drag = false; };

  protected onKeydown(e: KeyboardEvent): void {
    if (this._ctx.disabled()) return;
    const step = e.shiftKey ? 0.1 : 0.02;
    const { s, v } = this._ctx.hsv();
    if      (e.key === 'ArrowRight') { e.preventDefault(); this._ctx.setSV(Math.min(1, s + step), v); }
    else if (e.key === 'ArrowLeft')  { e.preventDefault(); this._ctx.setSV(Math.max(0, s - step), v); }
    else if (e.key === 'ArrowUp')    { e.preventDefault(); this._ctx.setSV(s, Math.min(1, v + step)); }
    else if (e.key === 'ArrowDown')  { e.preventDefault(); this._ctx.setSV(s, Math.max(0, v - step)); }
  }
}
