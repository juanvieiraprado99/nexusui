import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar.component';

@Component({
  selector: 'demo-calendar-disabled',
  standalone: true,
  imports: [CalendarComponent],
  template: `<n-calendar [nDisabled]="true" />`,
})
export class CalendarDisabledDemo {}
