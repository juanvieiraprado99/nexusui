import { Component, signal } from '@angular/core';
import { RadioComponent } from '../radio.component';
import { RadioGroupComponent } from '../radio-group.component';

@Component({
  selector: 'demo-radio-rich-description',
  standalone: true,
  imports: [RadioComponent, RadioGroupComponent],
  template: `
    <n-radio-group [(nValue)]="method" nVariant="card" nLabel="Método de pagamento">
      <n-radio nValue="card" nLabel="Cartão de crédito">
        <span slot="description" class="flex items-center gap-2">
          <span class="inline-flex h-5 w-7 items-center justify-center rounded bg-blue-600 text-[10px] font-bold text-white">VISA</span>
          <span class="inline-flex h-5 w-7 items-center justify-center rounded bg-orange-500 text-[10px] font-bold text-white">MC</span>
          <span class="text-xs text-muted-foreground">Visa, Mastercard, Amex</span>
        </span>
      </n-radio>
      <n-radio nValue="pix" nLabel="Pix">
        <span slot="description" class="flex items-center gap-1.5 text-xs text-muted-foreground">
          <svg viewBox="0 0 24 24" class="h-4 w-4 text-emerald-600" fill="currentColor">
            <path d="M12 2L2 12l10 10 10-10L12 2zm0 3l7 7-7 7-7-7 7-7z" />
          </svg>
          Aprovação instantânea
        </span>
      </n-radio>
    </n-radio-group>
  `,
})
export class RadioRichDescriptionDemo {
  method = signal<string | null>('card');
}
