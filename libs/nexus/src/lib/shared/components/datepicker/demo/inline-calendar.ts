import { Component, signal } from '@angular/core';
import { DatepickerCalendarComponent } from '../datepicker-calendar.component';

@Component({
  selector: 'demo-datepicker-inline-calendar',
  standalone: true,
  imports: [DatepickerCalendarComponent],
  template: `
    <div class="flex flex-col items-center gap-3">
      <n-datepicker-calendar
        [nValue]="value()"
        (nChange)="value.set($event)"
        (nClear)="value.set(null)"
      />
      <p class="text-muted-foreground text-sm">
        Selecionado:
        <span class="text-foreground font-medium">
          {{ value() ? value()!.toLocaleDateString() : 'nenhum' }}
        </span>
      </p>
    </div>
  `,
})
export class DatepickerInlineCalendarDemo {
  value = signal<Date | null>(null);
}
