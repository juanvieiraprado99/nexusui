import { Component, signal } from '@angular/core';
import { DatepickerComponent } from '../datepicker.component';

@Component({
  selector: 'demo-datepicker-with-time',
  standalone: true,
  imports: [DatepickerComponent],
  template: `
    <n-datepicker
      [(nValue)]="value"
      nLabel="Data e hora"
      nPlaceholder="Selecione data e hora"
      [nShowTime]="true"
      [nMinuteStep]="15"
      class="w-full max-w-sm"
    />
  `,
})
export class DatepickerWithTimeDemo {
  value = signal<Date | null>(null);
}
