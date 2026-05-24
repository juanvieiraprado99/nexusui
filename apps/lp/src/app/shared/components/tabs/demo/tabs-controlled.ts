import { Component, signal } from '@angular/core';
import { TabsComponent } from '../tabs.component';
import { TabsListComponent } from '../tabs-list.component';
import { TabsTriggerComponent } from '../tabs-trigger.component';
import { TabsContentComponent } from '../tabs-content.component';

@Component({
  selector: 'demo-tabs-controlled',
  standalone: true,
  imports: [TabsComponent, TabsListComponent, TabsTriggerComponent, TabsContentComponent],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground">Aba ativa:</span>
        <code class="text-xs bg-muted px-1.5 py-0.5 rounded">{{ activeTab() }}</code>
        <button
          class="text-xs underline text-muted-foreground ml-2"
          (click)="activeTab.set('b')"
        >
          Ir para Aba 2
        </button>
      </div>

      <n-tabs [(nValue)]="activeTab">
        <n-tabs-list>
          <button n-tabs-trigger nValue="a">Aba 1</button>
          <button n-tabs-trigger nValue="b">Aba 2</button>
          <button n-tabs-trigger nValue="c">Aba 3</button>
        </n-tabs-list>

        <n-tabs-content nValue="a" nClass="pt-4">
          <p class="text-sm">Conteúdo da aba 1.</p>
        </n-tabs-content>
        <n-tabs-content nValue="b" nClass="pt-4">
          <p class="text-sm">Conteúdo da aba 2.</p>
        </n-tabs-content>
        <n-tabs-content nValue="c" nClass="pt-4">
          <p class="text-sm">Conteúdo da aba 3.</p>
        </n-tabs-content>
      </n-tabs>
    </div>
  `,
})
export class TabsControlledDemo {
  activeTab = signal('a');
}
