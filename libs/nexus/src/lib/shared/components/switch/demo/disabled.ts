import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SwitchComponent } from '../switch.component';

@Component({
  selector: 'demo-switch-disabled',
  standalone: true,
  imports: [SwitchComponent, ReactiveFormsModule],
  template: `
    <div class="flex flex-col gap-3">
      <n-switch [nDisabled]="true" [nChecked]="false" nLabel="Disabled (off)" />
      <n-switch [nDisabled]="true" [nChecked]="true"  nLabel="Disabled (on)" />
      <n-switch [formControl]="disabledControl"        nLabel="Disabled via FormControl" />
    </div>
  `,
})
export class SwitchDemoDisabled {
  disabledControl = new FormControl({ value: true, disabled: true });
}
