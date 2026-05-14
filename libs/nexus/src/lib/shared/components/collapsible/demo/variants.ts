import { Component } from '@angular/core';
import { CollapsibleComponent } from '../collapsible.component';
import { CollapsibleTriggerComponent } from '../collapsible-trigger.component';
import { CollapsibleContentComponent } from '../collapsible-content.component';

@Component({
  selector: 'demo-collapsible-variants',
  standalone: true,
  imports: [CollapsibleComponent, CollapsibleTriggerComponent, CollapsibleContentComponent],
  template: `
    <div class="flex w-80 flex-col gap-6">
      <div>
        <p class="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Default</p>
        <n-collapsible nVariant="default">
          <button n-collapsible-trigger>Variant: default</button>
          <n-collapsible-content>Sem borda — adequado para seções inline.</n-collapsible-content>
        </n-collapsible>
      </div>
      <div>
        <p class="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Bordered</p>
        <n-collapsible nVariant="bordered">
          <button n-collapsible-trigger>Variant: bordered</button>
          <n-collapsible-content>Borda + cantos arredondados. Padding lateral herdado via contexto.</n-collapsible-content>
        </n-collapsible>
      </div>
      <div>
        <p class="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Card</p>
        <n-collapsible nVariant="card">
          <button n-collapsible-trigger>Variant: card</button>
          <n-collapsible-content>Borda + bg-card + sombra. Ideal para painéis de configuração.</n-collapsible-content>
        </n-collapsible>
      </div>
    </div>
  `,
})
export class CollapsibleVariantsDemo {}
