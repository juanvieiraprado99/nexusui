import { Component, signal } from '@angular/core';
import { TextareaComponent } from '../textarea.component';

@Component({
  selector: 'demo-textarea-char-count',
  standalone: true,
  imports: [TextareaComponent],
  template: `
    <n-textarea
      [(nValue)]="value"
      nLabel="Bio"
      nPlaceholder="Fale sobre você..."
      [nCharCount]="true"
      [nMaxLength]="200"
    />
  `,
})
export class TextareaCharCountDemo {
  value = signal('');
}
