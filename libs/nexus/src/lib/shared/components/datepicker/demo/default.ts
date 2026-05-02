import { Component, signal } from '@angular/core';
import { DatepickerComponent } from '../datepicker.component';

@Component({
  selector: 'demo-datepicker-default',
  standalone: true,
  imports: [DatepickerComponent],
  template: `
    <n-datepicker
      [(nValue)]="value"
      nPlaceholder="Selecione uma data"
      class="w-full max-w-sm"
    />
  `,
})
export class DatepickerDefaultDemo {
  value = signal<Date | null>(null);
}
