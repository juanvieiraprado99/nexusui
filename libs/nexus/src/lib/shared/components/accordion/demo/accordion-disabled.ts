import { Component } from '@angular/core';
import { AccordionComponent } from '../accordion.component';
import { AccordionItemComponent } from '../accordion-item.component';
import { AccordionTriggerComponent } from '../accordion-trigger.component';
import { AccordionContentComponent } from '../accordion-content.component';

@Component({
  selector: 'demo-accordion-disabled',
  standalone: true,
  imports: [AccordionComponent, AccordionItemComponent, AccordionTriggerComponent, AccordionContentComponent],
  template: `
    <n-accordion>
      <n-accordion-item nValue="item-1">
        <button n-accordion-trigger>Item ativo</button>
        <n-accordion-content>Este item funciona normalmente.</n-accordion-content>
      </n-accordion-item>

      <n-accordion-item nValue="item-2" [nDisabled]="true">
        <button n-accordion-trigger>Item desabilitado</button>
        <n-accordion-content>Este conteúdo não pode ser acessado.</n-accordion-content>
      </n-accordion-item>

      <n-accordion-item nValue="item-3">
        <button n-accordion-trigger>Outro item ativo</button>
        <n-accordion-content>Este item também funciona normalmente.</n-accordion-content>
      </n-accordion-item>
    </n-accordion>
  `,
})
export class AccordionDisabledDemo {}
