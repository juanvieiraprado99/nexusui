import { Component, signal } from '@angular/core';
import { DatepickerComponent } from '../datepicker.component';

@Component({
  selector: 'demo-datepicker-min-max',
  standalone: true,
  imports: [DatepickerComponent],
  template: `
    <n-datepicker
      [(nValue)]="value"
      nLabel="Janela de reserva"
      nHint="Disponível apenas nos próximos 30 dias"
      [nMin]="min"
      [nMax]="max"
      class="w-full max-w-sm"
    />
  `,
})
export class DatepickerMinMaxDemo {
  value = signal<Date | null>(null);
  readonly min = new Date();
  readonly max = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d;
  })();
}
