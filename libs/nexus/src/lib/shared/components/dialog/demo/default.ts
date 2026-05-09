import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { DialogCloseDirective } from '../dialog-close.directive';
import { DialogComponent } from '../dialog.component';
import { DialogContentComponent } from '../dialog-content.component';
import { DialogDescriptionComponent } from '../dialog-description.component';
import { DialogFooterComponent } from '../dialog-footer.component';
import { DialogHeaderComponent } from '../dialog-header.component';
import { DialogTitleComponent } from '../dialog-title.component';
import { DialogTriggerDirective } from '../dialog-trigger.directive';

@Component({
  selector: 'demo-dialog-default',
  standalone: true,
  imports: [
    ButtonComponent,
    DialogComponent,
    DialogTriggerDirective,
    DialogContentComponent,
    DialogHeaderComponent,
    DialogFooterComponent,
    DialogTitleComponent,
    DialogDescriptionComponent,
    DialogCloseDirective,
  ],
  template: `
    <n-dialog [(nOpen)]="open">
      <button n-button n-dialog-trigger nVariant="outline">Abrir dialog</button>
      <n-dialog-content>
        <n-dialog-header>
          <n-dialog-title>Editar perfil</n-dialog-title>
          <n-dialog-description>
            Faça alterações no seu perfil aqui. Clique em salvar quando terminar.
          </n-dialog-description>
        </n-dialog-header>
        <div class="grid gap-4 py-4">
          <p class="text-sm text-muted-foreground">Conteúdo do formulário aqui.</p>
        </div>
        <n-dialog-footer>
          <button n-button nVariant="outline" n-dialog-close>Cancelar</button>
          <button n-button (nClick)="save()">Salvar</button>
        </n-dialog-footer>
      </n-dialog-content>
    </n-dialog>
  `,
})
export class DialogDefaultDemo {
  open = signal(false);

  save(): void {
    this.open.set(false);
  }
}
