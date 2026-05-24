import { Component, signal } from '@angular/core';
import { SignatureComponent } from '../signature.component';

@Component({
  selector: 'demo-signature-default',
  standalone: true,
  imports: [SignatureComponent],
  template: `
    <div class="flex flex-col gap-4">
      <n-signature
        nLabel="Assinatura"
        nHint="Assine com o mouse ou dedo"
        [(nValue)]="value"
      />
      @if (value()) {
        <p class="text-xs text-muted-foreground">Saída: {{ value().slice(0, 60) }}…</p>
      }
    </div>
  `,
})
export class SignatureDemoDefault {
  value = signal('');
}
