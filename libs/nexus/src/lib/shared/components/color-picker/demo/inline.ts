import { Component, signal } from '@angular/core';
import { ColorPickerComponent } from '../color-picker.component';

@Component({
  selector: 'demo-color-picker-inline',
  standalone: true,
  imports: [ColorPickerComponent],
  template: `
    <div class="flex flex-col gap-4">
      <n-color-picker nMode="inline" [(nValue)]="color" />
      <div
        class="h-16 rounded-md border border-border transition-colors"
        [style.background]="color()"
      ></div>
    </div>
  `,
})
export class ColorPickerInlineDemo {
  color = signal('#a855f7');
}
