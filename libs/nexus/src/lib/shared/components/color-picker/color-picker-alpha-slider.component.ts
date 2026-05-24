import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { COLOR_PICKER_CONTEXT } from './color-picker.tokens';
import { alphaGradientCss, hsvToRgb } from './color-picker.utils';

@Component({
  selector: 'n-color-picker-alpha-slider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
  template: `
    <div
      data-slot="alpha-track"
      class="relative h-3 rounded-full cursor-pointer overflow-hidden"
      (pointerdown)="onTrackDown($event)"
    >
      <div
        class="absolute inset-0 rounded-full"
        style="background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:8px 8px;background-position:0 0,0 4px,4px -4px,-4px 0"
      ></div>
      <div class="absolute inset-0 rounded-full" [style.background]="gradient()"></div>
      <div
        data-slot="alpha-thumb"
        tabindex="0"
        role="slider"
        [attr.aria-valuemin]="0"
        [attr.aria-valuemax]="100"
        [attr.aria-valuenow]="alphaRound()"
        [attr.aria-valuetext]="alphaRound() + '%'"
        aria-label="Opacity"
        class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-sm cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 transition-none"
        [style.left]="thumbLeft()"
        [style.background]="thumbColor()"
        (pointerdown)="onThumbDown($event)"
        (pointermove)="onThumbMove($event)"
        (pointerup)="onThumbUp()"
        (keydown)="onKeydown($event)"
      ></div>
    </div>
  `,
})
export class ColorPickerAlphaSliderComponent {
  protected readonly ctx = inject(COLOR_PICKER_CONTEXT);

  private _drag = false;

  protected readonly hostClasses = computed(() =>
    mergeClasses('block px-2', this.ctx.disabled() && 'opacity-50 pointer-events-none'),
  );

  protected readonly gradient   = computed(() => alphaGradientCss(this.ctx.hsv()));
  protected readonly alphaRound = computed(() => Math.round(this.ctx.hsv().a * 100));
  protected readonly thumbLeft  = computed(() => `${this.ctx.hsv().a * 100}%`);
  protected readonly thumbColor = computed(() => {
    const { h, s, v, a } = this.ctx.hsv();
    const { r, g, b } = hsvToRgb({ h, s, v, a: 1 });
    const ri = Math.round(r * 255), gi = Math.round(g * 255), bi = Math.round(b * 255);
    return `rgba(${ri},${gi},${bi},${a.toFixed(2)})`;
  });

  protected onTrackDown(e: PointerEvent): void {
    if (this.ctx.disabled()) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    this.ctx.setAlpha(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
  }

  protected onThumbDown(e: PointerEvent): void {
    if (this.ctx.disabled()) return;
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this._drag = true;
  }

  protected onThumbMove(e: PointerEvent): void {
    if (!this._drag) return;
    const track = (e.currentTarget as HTMLElement).parentElement!;
    const rect  = track.getBoundingClientRect();
    this.ctx.setAlpha(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
  }

  protected onThumbUp(): void {
    this._drag = false;
  }

  protected onKeydown(e: KeyboardEvent): void {
    if (this.ctx.disabled()) return;
    const step = e.shiftKey ? 0.1 : 0.01;
    const a = this.ctx.hsv().a;
    if      (e.key === 'ArrowRight' || e.key === 'ArrowUp')  { e.preventDefault(); this.ctx.setAlpha(Math.min(1, a + step)); }
    else if (e.key === 'ArrowLeft'  || e.key === 'ArrowDown') { e.preventDefault(); this.ctx.setAlpha(Math.max(0, a - step)); }
    else if (e.key === 'Home') { e.preventDefault(); this.ctx.setAlpha(0); }
    else if (e.key === 'End')  { e.preventDefault(); this.ctx.setAlpha(1); }
  }
}
