import { Component, signal } from '@angular/core';
import { ColorPickerComponent } from '../color-picker.component';

@Component({
  selector: 'demo-color-picker-formats',
  standalone: true,
  imports: [ColorPickerComponent],
  template: `
    <div class="flex flex-wrap gap-4">
      <n-color-picker nLabel="HEX"   nFormat="hex"   [(nValue)]="hex" />
      <n-color-picker nLabel="RGB"   nFormat="rgb"   [(nValue)]="rgb" />
      <n-color-picker nLabel="HSL"   nFormat="hsl"   [(nValue)]="hsl" />
      <n-color-picker nLabel="OKLCH" nFormat="oklch" [(nValue)]="oklch" />
    </div>
  `,
})
export class ColorPickerFormatsDemo {
  hex   = signal('#10b981');
  rgb   = signal('#10b981');
  hsl   = signal('#10b981');
  oklch = signal('#10b981');
}
