import { Component, signal } from '@angular/core';
import { AccordionComponent } from '../accordion.component';
import { AccordionItemComponent } from '../accordion-item.component';
import { AccordionTriggerComponent } from '../accordion-trigger.component';
import { AccordionContentComponent } from '../accordion-content.component';

@Component({
  selector: 'demo-accordion-multiple',
  standalone: true,
  imports: [AccordionComponent, AccordionItemComponent, AccordionTriggerComponent, AccordionContentComponent],
  template: `
    <n-accordion nType="multiple" [(nValues)]="openItems">
      <n-accordion-item nValue="item-1">
        <button n-accordion-trigger>Seção 1</button>
        <n-accordion-content>
          Conteúdo da primeira seção. No modo múltiplo, vários itens podem ficar abertos simultaneamente.
        </n-accordion-content>
      </n-accordion-item>

      <n-accordion-item nValue="item-2">
        <button n-accordion-trigger>Seção 2</button>
        <n-accordion-content>
          Conteúdo da segunda seção. Abrir este item não fecha o anterior.
        </n-accordion-content>
      </n-accordion-item>

      <n-accordion-item nValue="item-3">
        <button n-accordion-trigger>Seção 3</button>
        <n-accordion-content>
          Conteúdo da terceira seção.
        </n-accordion-content>
      </n-accordion-item>
    </n-accordion>

    <p class="mt-4 text-sm text-muted-foreground">Abertos: {{ openItems().join(', ') || 'nenhum' }}</p>
  `,
})
export class AccordionMultipleDemo {
  openItems = signal<string[]>([]);
}
