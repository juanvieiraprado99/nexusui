import { Component, signal } from '@angular/core';
import { CalendarComponent } from '../calendar.component';
import type { CalendarValue } from '../calendar.types';

@Component({
  selector: 'demo-calendar-multiple',
  standalone: true,
  imports: [CalendarComponent],
  template: `
    <div class="flex flex-col items-center gap-4">
      <n-calendar nMode="multiple" [(nValue)]="value" />
      <p class="text-sm text-muted-foreground">
        {{ count() }} data(s) selecionada(s)
      </p>
    </div>
  `,
})
export class CalendarMultipleDemo {
  value = signal<CalendarValue>(null);

  count() {
    const v = this.value();
    return Array.isArray(v) ? v.length : 0;
  }
}
