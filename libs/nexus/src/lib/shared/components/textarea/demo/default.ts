import { Component, signal } from '@angular/core';
import { TextareaComponent } from '../textarea.component';

@Component({
  selector: 'demo-textarea-default',
  standalone: true,
  imports: [TextareaComponent],
  template: `
    <n-textarea
      [(nValue)]="value"
      nLabel="Descrição"
      nPlaceholder="Digite sua mensagem..."
      nHint="Máximo de 500 caracteres."
    />
  `,
})
export class TextareaDefaultDemo {
  value = signal('');
}
