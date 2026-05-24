import { Component } from '@angular/core';
import { TabsComponent } from '../tabs.component';
import { TabsListComponent } from '../tabs-list.component';
import { TabsTriggerComponent } from '../tabs-trigger.component';
import { TabsContentComponent } from '../tabs-content.component';

@Component({
  selector: 'demo-tabs-variants',
  standalone: true,
  imports: [TabsComponent, TabsListComponent, TabsTriggerComponent, TabsContentComponent],
  template: `
    <div class="flex flex-col gap-8">
      <div>
        <p class="text-xs text-muted-foreground mb-2">pills (padrão)</p>
        <n-tabs nDefaultValue="a" nVariant="pills">
          <n-tabs-list>
            <button n-tabs-trigger nValue="a">Aba 1</button>
            <button n-tabs-trigger nValue="b">Aba 2</button>
            <button n-tabs-trigger nValue="c">Aba 3</button>
          </n-tabs-list>
          <n-tabs-content nValue="a" nClass="pt-3"><p class="text-sm">Conteúdo 1</p></n-tabs-content>
          <n-tabs-content nValue="b" nClass="pt-3"><p class="text-sm">Conteúdo 2</p></n-tabs-content>
          <n-tabs-content nValue="c" nClass="pt-3"><p class="text-sm">Conteúdo 3</p></n-tabs-content>
        </n-tabs>
      </div>

      <div>
        <p class="text-xs text-muted-foreground mb-2">line</p>
        <n-tabs nDefaultValue="a" nVariant="line">
          <n-tabs-list>
            <button n-tabs-trigger nValue="a">Aba 1</button>
            <button n-tabs-trigger nValue="b">Aba 2</button>
            <button n-tabs-trigger nValue="c">Aba 3</button>
          </n-tabs-list>
          <n-tabs-content nValue="a" nClass="pt-3"><p class="text-sm">Conteúdo 1</p></n-tabs-content>
          <n-tabs-content nValue="b" nClass="pt-3"><p class="text-sm">Conteúdo 2</p></n-tabs-content>
          <n-tabs-content nValue="c" nClass="pt-3"><p class="text-sm">Conteúdo 3</p></n-tabs-content>
        </n-tabs>
      </div>

      <div>
        <p class="text-xs text-muted-foreground mb-2">boxed</p>
        <n-tabs nDefaultValue="a" nVariant="boxed">
          <n-tabs-list>
            <button n-tabs-trigger nValue="a">Aba 1</button>
            <button n-tabs-trigger nValue="b">Aba 2</button>
            <button n-tabs-trigger nValue="c">Aba 3</button>
          </n-tabs-list>
          <n-tabs-content nValue="a" nClass="pt-3"><p class="text-sm">Conteúdo 1</p></n-tabs-content>
          <n-tabs-content nValue="b" nClass="pt-3"><p class="text-sm">Conteúdo 2</p></n-tabs-content>
          <n-tabs-content nValue="c" nClass="pt-3"><p class="text-sm">Conteúdo 3</p></n-tabs-content>
        </n-tabs>
      </div>
    </div>
  `,
})
export class TabsVariantsDemo {}
