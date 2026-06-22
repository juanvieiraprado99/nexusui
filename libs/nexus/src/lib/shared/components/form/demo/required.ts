import { Component } from '@angular/core';
import { InputComponent } from '../../input/input.component';
import { TextareaComponent } from '../../textarea/textarea.component';
import {
  NFormControlComponent,
  NFormDescriptionComponent,
  NFormFieldComponent,
  NFormLabelComponent,
} from '../form.component';

@Component({
  selector: 'demo-form-required',
  standalone: true,
  imports: [
    InputComponent,
    TextareaComponent,
    NFormFieldComponent,
    NFormLabelComponent,
    NFormControlComponent,
    NFormDescriptionComponent,
  ],
  template: `
    <div class="w-80 space-y-4">
      <n-form-field nRequired>
        <label n-form-label>Full name</label>
        <n-form-control #ctrl>
          <n-input [nId]="ctrl.fieldId()" nPlaceholder="John Doe" [nRequired]="true" />
        </n-form-control>
        <n-form-description>Used on your public profile.</n-form-description>
      </n-form-field>

      <n-form-field>
        <label n-form-label>Bio</label>
        <n-form-control #bioCtrl>
          <n-textarea [nId]="bioCtrl.fieldId()" nPlaceholder="Tell us about yourself" />
        </n-form-control>
        <n-form-description>Optional. Max 160 characters.</n-form-description>
      </n-form-field>
    </div>
  `,
})
export class FormDemoRequired {}
