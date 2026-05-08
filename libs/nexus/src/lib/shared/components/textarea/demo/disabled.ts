import { Component, signal } from '@angular/core';
import { TextareaComponent } from '../textarea.component';

@Component({
  selector: 'demo-textarea-disabled',
  standalone: true,
  imports: [TextareaComponent],
  template: `
    <n-textarea
      [(nValue)]="value"
      nLabel="Notas (somente leitura)"
      [nDisabled]="true"
    />
  `,
})
export class TextareaDisabledDemo {
  value = signal('Este campo está desabilitado.');
}
