import { Component, signal } from '@angular/core';
import { DatepickerComponent } from '../datepicker.component';

@Component({
  selector: 'demo-datepicker-error',
  standalone: true,
  imports: [DatepickerComponent],
  template: `
    <n-datepicker
      [(nValue)]="value"
      nLabel="Data de início"
      nPlaceholder="Selecione"
      nError="Esta data é obrigatória"
      class="w-full max-w-sm"
    />
  `,
})
export class DatepickerErrorDemo {
  value = signal<Date | null>(null);
}
