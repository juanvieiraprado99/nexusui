import { Component, signal } from '@angular/core';
import { DatepickerComponent } from '../datepicker.component';

@Component({
  selector: 'demo-datepicker-disabled-weekends',
  standalone: true,
  imports: [DatepickerComponent],
  template: `
    <n-datepicker
      [(nValue)]="value"
      nLabel="Dia útil"
      nHint="Sábados e domingos não estão disponíveis"
      [nDisabledDate]="isWeekend"
      class="w-full max-w-sm"
    />
  `,
})
export class DatepickerDisabledWeekendsDemo {
  value = signal<Date | null>(null);
  readonly isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;
}
