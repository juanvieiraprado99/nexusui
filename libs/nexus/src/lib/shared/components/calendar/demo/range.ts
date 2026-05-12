import { Component, computed, signal } from '@angular/core';
import { CalendarComponent } from '../calendar.component';
import type { CalendarValue } from '../calendar.types';

@Component({
  selector: 'demo-calendar-range',
  standalone: true,
  imports: [CalendarComponent],
  template: `
    <div class="flex flex-col items-center gap-4">
      <n-calendar nMode="range" [(nValue)]="value" />
      <p class="text-sm text-muted-foreground">
        {{ rangeLabel() }}
      </p>
    </div>
  `,
})
export class CalendarRangeDemo {
  value = signal<CalendarValue>(null);

  rangeLabel = computed(() => {
    const v = this.value();
    if (!Array.isArray(v) || v.length === 0) return 'Selecione o início do intervalo';
    if (v.length === 1) return `De ${v[0].toLocaleDateString()} — selecione o fim`;
    return `${v[0].toLocaleDateString()} → ${v[1].toLocaleDateString()}`;
  });
}
