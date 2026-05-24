import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'n-color-picker-swatch',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      data-slot="swatch"
      [class]="classes()"
      [attr.aria-label]="'Select color ' + nColor()"
      [attr.aria-pressed]="nActive()"
      [style.background]="nColor()"
      (click)="nSelect.emit(nColor())"
    ></button>
  `,
})
export class ColorPickerSwatchComponent {
  readonly nColor  = input.required<string>();
  readonly nActive = input<boolean>(false);
  readonly nClass  = input<string>('');
  readonly nSelect = output<string>();

  protected readonly classes = computed(() =>
    mergeClasses(
      'block w-6 h-6 rounded-md border border-input cursor-pointer transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
      this.nActive() && 'ring-2 ring-ring ring-offset-1 scale-110',
      this.nClass(),
    ),
  );
}
