import { Component, signal } from '@angular/core';
import { TextareaComponent } from '../textarea.component';

@Component({
  selector: 'demo-textarea-auto-resize',
  standalone: true,
  imports: [TextareaComponent],
  template: `
    <n-textarea
      [(nValue)]="value"
      nLabel="Comentário"
      nPlaceholder="Digite para expandir..."
      [nAutoResize]="true"
      [nMinRows]="2"
      [nMaxRows]="8"
    />
  `,
})
export class TextareaAutoResizeDemo {
  value = signal('');
}
