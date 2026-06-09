import { Component } from '@angular/core';
import { CollapsibleComponent } from '../collapsible.component';
import { CollapsibleTriggerComponent } from '../collapsible-trigger.component';
import { CollapsibleContentComponent } from '../collapsible-content.component';

@Component({
  selector: 'demo-collapsible-lazy',
  standalone: true,
  imports: [CollapsibleComponent, CollapsibleTriggerComponent, CollapsibleContentComponent],
  template: `
    <n-collapsible class="w-80" [nLazy]="true">
      <button
        n-collapsible-trigger
        nClass="rounded-md border border-border px-4 hover:bg-accent hover:no-underline"
      >
        Conteúdo com montagem lazy
      </button>
      <n-collapsible-content>
        <p class="text-sm text-muted-foreground">
          Com <code class="rounded bg-muted px-1 font-mono">nLazy=true</code> o conteúdo é
          desmontado do DOM ao fechar. Útil para tabelas grandes, gráficos ou componentes
          com custo de inicialização.
        </p>
      </n-collapsible-content>
    </n-collapsible>
  `,
})
export class CollapsibleLazyDemo {}
