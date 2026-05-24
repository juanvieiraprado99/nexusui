import { Component, signal } from '@angular/core';
import { SignatureComponent } from '../signature.component';
import type { SignatureOutputFormat } from '../signature.types';

@Component({
  selector: 'demo-signature-output-formats',
  standalone: true,
  imports: [SignatureComponent],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex gap-2">
        @for (fmt of formats; track fmt) {
          <button
            type="button"
            (click)="format.set(fmt)"
            class="rounded-md px-3 py-1.5 text-xs font-medium transition-colors border"
            [class]="format() === fmt ? 'bg-primary text-primary-foreground border-primary' : 'border-input bg-background text-muted-foreground hover:bg-accent'"
          >
            {{ fmt }}
          </button>
        }
      </div>

      <n-signature
        nLabel="Assinatura"
        [nOutputFormat]="format()"
        [(nValue)]="value"
      />

      @if (value()) {
        <div class="rounded-md border border-input bg-muted/40 p-3">
          <p class="mb-1 text-xs font-medium text-muted-foreground">Output ({{ format() }}):</p>
          <pre class="text-xs text-foreground break-all whitespace-pre-wrap">{{ value().slice(0, 200) }}{{ value().length > 200 ? '…' : '' }}</pre>
        </div>
      }
    </div>
  `,
})
export class SignatureDemoOutputFormats {
  readonly formats: SignatureOutputFormat[] = ['base64-png', 'base64-svg', 'svg'];
  format = signal<SignatureOutputFormat>('base64-png');
  value = signal('');
}
