import { Component } from '@angular/core';
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
  selector: 'demo-dialog-alert',
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
    <n-dialog nRole="alertdialog">
      <button n-button n-dialog-trigger nVariant="destructive">Deletar conta</button>
      <n-dialog-content nSize="sm" [nHideClose]="true">
        <n-dialog-header>
          <n-dialog-title>Tem certeza absoluta?</n-dialog-title>
          <n-dialog-description>
            Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente
            removidos dos nossos servidores.
          </n-dialog-description>
        </n-dialog-header>
        <n-dialog-footer>
          <button n-button nVariant="outline" n-dialog-close>Cancelar</button>
          <button n-button nVariant="destructive" n-dialog-close>Continuar</button>
        </n-dialog-footer>
      </n-dialog-content>
    </n-dialog>
  `,
})
export class DialogAlertDemo {}
