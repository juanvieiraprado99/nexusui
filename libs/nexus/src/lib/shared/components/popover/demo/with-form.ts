import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../button/button.component';
import { InputComponent } from '../../input/input.component';
import { PopoverCloseDirective } from '../popover-close.directive';
import { PopoverComponent } from '../popover.component';
import { PopoverContentComponent } from '../popover-content.component';
import { PopoverTriggerDirective } from '../popover-trigger.directive';

@Component({
  selector: 'demo-popover-with-form',
  standalone: true,
  imports: [
    FormsModule,
    PopoverComponent,
    PopoverTriggerDirective,
    PopoverContentComponent,
    PopoverCloseDirective,
    ButtonComponent,
    InputComponent,
  ],
  template: `
    <n-popover [nModal]="true" [nPersistent]="true">
      <button n-button n-popover-trigger nVariant="outline">Editar perfil</button>
      <n-popover-content nSize="lg">
        <p class="font-medium leading-none">Editar perfil</p>
        <p class="mt-1 text-muted-foreground text-xs">Faça alterações no seu perfil aqui.</p>
        <div class="mt-4 grid gap-3">
          <n-input nLabel="Nome" [(nValue)]="name" />
          <n-input nLabel="Usuário" [(nValue)]="username" />
        </div>
        <div class="mt-4 flex justify-end gap-2">
          <button n-button n-popover-close nVariant="outline" nSize="sm">Cancelar</button>
          <button n-button n-popover-close nSize="sm" (click)="save()">Salvar</button>
        </div>
      </n-popover-content>
    </n-popover>
  `,
})
export class PopoverWithFormDemo {
  name = signal('João Silva');
  username = signal('@joaosilva');

  save(): void {
    console.log('Salvo', this.name(), this.username());
  }
}
