import { Component } from '@angular/core';
import { TabsComponent } from '../tabs.component';
import { TabsListComponent } from '../tabs-list.component';
import { TabsTriggerComponent } from '../tabs-trigger.component';
import { TabsContentComponent } from '../tabs-content.component';

@Component({
  selector: 'demo-tabs-default',
  standalone: true,
  imports: [TabsComponent, TabsListComponent, TabsTriggerComponent, TabsContentComponent],
  template: `
    <n-tabs nDefaultValue="conta">
      <n-tabs-list>
        <button n-tabs-trigger nValue="conta">Conta</button>
        <button n-tabs-trigger nValue="senha">Senha</button>
        <button n-tabs-trigger nValue="notificacoes">Notificações</button>
      </n-tabs-list>

      <n-tabs-content nValue="conta" nClass="pt-4">
        <p class="text-sm text-muted-foreground">Gerencie as configurações da sua conta.</p>
      </n-tabs-content>

      <n-tabs-content nValue="senha" nClass="pt-4">
        <p class="text-sm text-muted-foreground">Altere sua senha aqui.</p>
      </n-tabs-content>

      <n-tabs-content nValue="notificacoes" nClass="pt-4">
        <p class="text-sm text-muted-foreground">Configure suas preferências de notificação.</p>
      </n-tabs-content>
    </n-tabs>
  `,
})
export class TabsDefaultDemo {}
