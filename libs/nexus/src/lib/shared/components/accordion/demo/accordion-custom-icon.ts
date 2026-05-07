import { Component } from '@angular/core';
import { AccordionComponent } from '../accordion.component';
import { AccordionItemComponent } from '../accordion-item.component';
import { AccordionTriggerComponent } from '../accordion-trigger.component';
import { AccordionContentComponent } from '../accordion-content.component';

@Component({
  selector: 'demo-accordion-custom-icon',
  standalone: true,
  imports: [AccordionComponent, AccordionItemComponent, AccordionTriggerComponent, AccordionContentComponent],
  template: `
    <n-accordion nVariant="ghost">
      <n-accordion-item nValue="item-1">
        <button n-accordion-trigger nIcon="plus-minus">Pergunta frequente 1</button>
        <n-accordion-content>Resposta para a primeira pergunta frequente do produto.</n-accordion-content>
      </n-accordion-item>

      <n-accordion-item nValue="item-2">
        <button n-accordion-trigger nIcon="plus-minus">Pergunta frequente 2</button>
        <n-accordion-content>Resposta para a segunda pergunta frequente do produto.</n-accordion-content>
      </n-accordion-item>

      <n-accordion-item nValue="item-3">
        <button n-accordion-trigger nIcon="plus-minus">Pergunta frequente 3</button>
        <n-accordion-content>Resposta para a terceira pergunta frequente do produto.</n-accordion-content>
      </n-accordion-item>
    </n-accordion>
  `,
})
export class AccordionCustomIconDemo {}
