import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatepickerComponent } from '../datepicker.component';

@Component({
  selector: 'demo-datepicker-with-form',
  standalone: true,
  imports: [DatepickerComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" class="flex w-full max-w-sm flex-col gap-3">
      <n-datepicker
        formControlName="date"
        nLabel="Agendamento"
        nPlaceholder="Selecione uma data"
        [nRequired]="true"
        [nError]="form.controls.date.touched && form.controls.date.invalid ? 'Selecione uma data' : null"
      />
      <p class="text-muted-foreground text-sm">
        Selecionado:
        <span class="text-foreground font-medium">
          {{ form.controls.date.value ? form.controls.date.value.toLocaleDateString() : 'nenhum' }}
        </span>
      </p>
    </form>
  `,
})
export class DatepickerWithFormDemo {
  readonly form = new FormGroup({
    date: new FormControl<Date | null>(null, Validators.required),
  });
}
