import { Component, signal } from '@angular/core';
import { DatepickerComponent } from '../datepicker.component';

@Component({
  selector: 'demo-datepicker-sizes',
  standalone: true,
  imports: [DatepickerComponent],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-3">
      <n-datepicker [(nValue)]="a" nSize="sm" nPlaceholder="Pequeno" />
      <n-datepicker [(nValue)]="b" nSize="default" nPlaceholder="Padrão" />
      <n-datepicker [(nValue)]="c" nSize="lg" nPlaceholder="Grande" />
    </div>
  `,
})
export class DatepickerSizesDemo {
  a = signal<Date | null>(null);
  b = signal<Date | null>(null);
  c = signal<Date | null>(null);
}
