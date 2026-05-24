import { Component, signal } from '@angular/core';
import { ColorPickerComponent } from '../color-picker.component';

@Component({
  selector: 'demo-color-picker-default',
  standalone: true,
  imports: [ColorPickerComponent],
  template: `
    <div class="flex flex-col gap-2">
      <n-color-picker nLabel="Brand color" [(nValue)]="color" />
      <p class="text-sm text-muted-foreground">Value: {{ color() }}</p>
    </div>
  `,
})
export class ColorPickerDefaultDemo {
  color = signal('#3b82f6');
}
