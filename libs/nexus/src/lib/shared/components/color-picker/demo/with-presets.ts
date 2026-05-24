import { Component, signal } from '@angular/core';
import { ColorPickerComponent } from '../color-picker.component';

const TAILWIND_PRESETS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899',
  '#ffffff', '#e5e7eb', '#6b7280', '#111827',
];

@Component({
  selector: 'demo-color-picker-with-presets',
  standalone: true,
  imports: [ColorPickerComponent],
  template: `
    <n-color-picker
      nLabel="Pick a color"
      [nPresets]="presets"
      [(nValue)]="color"
    />
  `,
})
export class ColorPickerWithPresetsDemo {
  color   = signal('#3b82f6');
  presets = TAILWIND_PRESETS;
}
