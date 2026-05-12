import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarComponent } from '../calendar.component';

@Component({
  selector: 'demo-calendar-with-form',
  standalone: true,
  imports: [CalendarComponent, ReactiveFormsModule],
  template: `
    <div class="flex flex-col items-center gap-4">
      <n-calendar [formControl]="dateControl" />
      <div class="text-sm space-y-1 text-center">
        <p class="text-muted-foreground">
          Valor: <span class="text-foreground font-medium">{{ displayValue() }}</span>
        </p>
        <p [class]="dateControl.valid ? 'text-green-600' : 'text-destructive'">
          {{ dateControl.valid ? 'Válido' : 'Obrigatório' }}
        </p>
      </div>
      <button
        type="button"
        class="text-xs text-muted-foreground underline hover:text-foreground"
        (click)="dateControl.reset()"
      >
        Limpar
      </button>
    </div>
  `,
})
export class CalendarWithFormDemo {
  dateControl = new FormControl<Date | null>(null, Validators.required);

  displayValue() {
    const v = this.dateControl.value;
    return v instanceof Date ? v.toLocaleDateString() : 'nenhum';
  }
}
