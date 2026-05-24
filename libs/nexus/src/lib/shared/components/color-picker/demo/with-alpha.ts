import { Component, signal } from '@angular/core';
import { ColorPickerComponent } from '../color-picker.component';

@Component({
  selector: 'demo-color-picker-with-alpha',
  standalone: true,
  imports: [ColorPickerComponent],
  template: `
    <div class="flex flex-col gap-2">
      <n-color-picker
        nLabel="Background color"
        nFormat="hex"
        [nShowAlpha]="true"
        [(nValue)]="color"
      />
      <div
        class="h-12 rounded-md border border-border text-sm flex items-center justify-center text-muted-foreground"
        [style.background]="color()"
      >
        Preview
      </div>
    </div>
  `,
})
export class ColorPickerWithAlphaDemo {
  color = signal('#3b82f680');
}
