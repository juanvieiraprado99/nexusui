import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { COLOR_PICKER_CONTEXT } from './color-picker.tokens';
import { hueGradientCss } from './color-picker.utils';

@Component({
  selector: 'n-color-picker-hue-slider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClasses()' },
  template: `
    <div
      data-slot="hue-track"
      class="relative h-3 rounded-full cursor-pointer"
      [style.background]="gradient"
      (pointerdown)="onTrackDown($event)"
    >
      <div
        data-slot="hue-thumb"
        tabindex="0"
        role="slider"
        [attr.aria-valuemin]="0"
        [attr.aria-valuemax]="360"
        [attr.aria-valuenow]="hueRound()"
        [attr.aria-valuetext]="hueRound() + '°'"
        aria-label="Hue"
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
export class ColorPickerHueSliderComponent {
  protected readonly ctx = inject(COLOR_PICKER_CONTEXT);
  protected readonly gradient = hueGradientCss();

  private _drag = false;

  protected readonly hostClasses = computed(() =>
    mergeClasses('block px-2', this.ctx.disabled() && 'opacity-50 pointer-events-none'),
  );

  protected readonly hueRound  = computed(() => Math.round(this.ctx.hsv().h));
  protected readonly thumbLeft  = computed(() => `${(this.ctx.hsv().h / 360) * 100}%`);
  protected readonly thumbColor = computed(() => `hsl(${this.ctx.hsv().h}, 100%, 50%)`);

  protected onTrackDown(e: PointerEvent): void {
    if (this.ctx.disabled()) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    this.ctx.setHue(Math.max(0, Math.min(360, ((e.clientX - rect.left) / rect.width) * 360)));
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
    const rect = track.getBoundingClientRect();
    this.ctx.setHue(Math.max(0, Math.min(360, ((e.clientX - rect.left) / rect.width) * 360)));
  }

  protected onThumbUp(): void {
    this._drag = false;
  }

  protected onKeydown(e: KeyboardEvent): void {
    if (this.ctx.disabled()) return;
    const step = e.shiftKey ? 10 : 1;
    const h = this.ctx.hsv().h;
    if      (e.key === 'ArrowRight' || e.key === 'ArrowUp')   { e.preventDefault(); this.ctx.setHue(Math.min(360, h + step)); }
    else if (e.key === 'ArrowLeft'  || e.key === 'ArrowDown')  { e.preventDefault(); this.ctx.setHue(Math.max(0, h - step)); }
    else if (e.key === 'Home')  { e.preventDefault(); this.ctx.setHue(0); }
    else if (e.key === 'End')   { e.preventDefault(); this.ctx.setHue(360); }
  }
}
