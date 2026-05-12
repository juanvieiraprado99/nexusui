import { Component, signal } from '@angular/core';
import { CalendarComponent } from '../calendar.component';
import type { CalendarValue } from '../calendar.types';

@Component({
  selector: 'demo-calendar-default',
  standalone: true,
  imports: [CalendarComponent],
  template: `
    <div class="flex flex-col items-center gap-4">
      <n-calendar [(nValue)]="value" />
      <p class="text-sm text-muted-foreground">
        Selecionado:
        <span class="text-foreground font-medium">
          {{ value() ? asDate(value())!.toLocaleDateString() : 'nenhum' }}
        </span>
      </p>
    </div>
  `,
})
export class CalendarDefaultDemo {
  value = signal<CalendarValue>(null);

  asDate(v: CalendarValue): Date | null {
    return v instanceof Date ? v : null;
  }
}
