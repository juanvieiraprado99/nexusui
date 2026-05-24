import { Component } from '@angular/core';
import { TabsComponent } from '../tabs.component';
import { TabsListComponent } from '../tabs-list.component';
import { TabsTriggerComponent } from '../tabs-trigger.component';
import { TabsContentComponent } from '../tabs-content.component';

@Component({
  selector: 'demo-tabs-vertical',
  standalone: true,
  imports: [TabsComponent, TabsListComponent, TabsTriggerComponent, TabsContentComponent],
  template: `
    <n-tabs nDefaultValue="perfil" nOrientation="vertical" nVariant="line">
      <n-tabs-list nClass="min-w-32">
        <button n-tabs-trigger nValue="perfil">Perfil</button>
        <button n-tabs-trigger nValue="seguranca">Segurança</button>
        <button n-tabs-trigger nValue="aparencia">Aparência</button>
        <button n-tabs-trigger nValue="integracoes" [nDisabled]="true">Integrações</button>
      </n-tabs-list>

      <div class="flex-1 pl-6">
        <n-tabs-content nValue="perfil">
          <h3 class="text-sm font-medium mb-1">Perfil</h3>
          <p class="text-sm text-muted-foreground">Atualize seu nome, e-mail e foto de perfil.</p>
        </n-tabs-content>
        <n-tabs-content nValue="seguranca">
          <h3 class="text-sm font-medium mb-1">Segurança</h3>
          <p class="text-sm text-muted-foreground">Gerencie sua senha e autenticação de dois fatores.</p>
        </n-tabs-content>
        <n-tabs-content nValue="aparencia">
          <h3 class="text-sm font-medium mb-1">Aparência</h3>
          <p class="text-sm text-muted-foreground">Escolha entre tema claro, escuro ou do sistema.</p>
        </n-tabs-content>
        <n-tabs-content nValue="integracoes">
          <h3 class="text-sm font-medium mb-1">Integrações</h3>
          <p class="text-sm text-muted-foreground">Conecte serviços externos.</p>
        </n-tabs-content>
      </div>
    </n-tabs>
  `,
})
export class TabsVerticalDemo {}
