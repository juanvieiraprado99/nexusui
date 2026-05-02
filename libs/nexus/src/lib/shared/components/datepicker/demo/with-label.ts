import { Component, signal } from '@angular/core';
import { DatepickerComponent } from '../datepicker.component';

@Component({
  selector: 'demo-datepicker-with-label',
  standalone: true,
  imports: [DatepickerComponent],
  template: `
    <n-datepicker
      [(nValue)]="value"
      nLabel="Data de nascimento"
      nPlaceholder="dd/mm/aaaa"
      nHint="Usaremos para verificar idade"
      class="w-full max-w-sm"
    />
  `,
})
export class DatepickerWithLabelDemo {
  value = signal<Date | null>(null);
}
