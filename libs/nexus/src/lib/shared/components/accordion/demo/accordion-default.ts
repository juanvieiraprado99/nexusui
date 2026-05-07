import { Component } from '@angular/core';
import { AccordionComponent } from '../accordion.component';
import { AccordionItemComponent } from '../accordion-item.component';
import { AccordionTriggerComponent } from '../accordion-trigger.component';
import { AccordionContentComponent } from '../accordion-content.component';

@Component({
  selector: 'demo-accordion-default',
  standalone: true,
  imports: [AccordionComponent, AccordionItemComponent, AccordionTriggerComponent, AccordionContentComponent],
  template: `
    <n-accordion>
      <n-accordion-item nValue="item-1">
        <button n-accordion-trigger>O que é nexus-ui?</button>
        <n-accordion-content>
          nexus-ui é uma biblioteca de componentes Angular no estilo shadcn/ui.
          Os componentes são copiados diretamente para o seu projeto via CLI.
        </n-accordion-content>
      </n-accordion-item>

      <n-accordion-item nValue="item-2">
        <button n-accordion-trigger>Como instalar?</button>
        <n-accordion-content>
          Execute <code>npx &#64;nexuslabs/cli&#64;alpha init</code> para configurar o projeto,
          depois <code>npx &#64;nexuslabs/cli&#64;alpha add accordion</code> para adicionar este componente.
        </n-accordion-content>
      </n-accordion-item>

      <n-accordion-item nValue="item-3">
        <button n-accordion-trigger>Posso customizar?</button>
        <n-accordion-content>
          Sim! Como os arquivos ficam no seu projeto, você tem controle total sobre o código.
          Use <code>nClass</code> ou edite o arquivo diretamente.
        </n-accordion-content>
      </n-accordion-item>
    </n-accordion>
  `,
})
export class AccordionDefaultDemo {}
