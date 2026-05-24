import { Component } from '@angular/core';
import { InputComponent } from '../../input/input.component';
import {
  NFormControlComponent,
  NFormDescriptionComponent,
  NFormFieldComponent,
  NFormLabelComponent,
} from '../form.component';

@Component({
  selector: 'demo-form-default',
  standalone: true,
  imports: [
    InputComponent,
    NFormFieldComponent,
    NFormLabelComponent,
    NFormControlComponent,
    NFormDescriptionComponent,
  ],
  template: `
    <n-form-field class="w-80">
      <label n-form-label>Username</label>
      <n-form-control #ctrl>
        <n-input [nId]="ctrl.fieldId()" nPlaceholder="@username" />
      </n-form-control>
      <n-form-description>This will be your public display name.</n-form-description>
    </n-form-field>
  `,
})
export class FormDemoDefault {}
