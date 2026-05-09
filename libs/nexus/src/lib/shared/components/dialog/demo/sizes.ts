import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { DialogCloseDirective } from '../dialog-close.directive';
import { DialogComponent } from '../dialog.component';
import { DialogContentComponent } from '../dialog-content.component';
import { DialogDescriptionComponent } from '../dialog-description.component';
import { DialogHeaderComponent } from '../dialog-header.component';
import { DialogTitleComponent } from '../dialog-title.component';
import { DialogTriggerDirective } from '../dialog-trigger.directive';
import { type DialogContentVariants } from '../dialog.variants';

@Component({
  selector: 'demo-dialog-sizes',
  standalone: true,
  imports: [
    ButtonComponent,
    DialogComponent,
    DialogTriggerDirective,
    DialogContentComponent,
    DialogHeaderComponent,
    DialogTitleComponent,
    DialogDescriptionComponent,
    DialogCloseDirective,
  ],
  template: `
    <div class="flex flex-wrap gap-2">
      @for (size of sizes; track size) {
        <n-dialog>
          <button n-button n-dialog-trigger nVariant="outline">{{ size }}</button>
          <n-dialog-content [nSize]="size">
            <n-dialog-header>
              <n-dialog-title>Tamanho: {{ size }}</n-dialog-title>
              <n-dialog-description>
                Este dialog usa nSize="{{ size }}".
              </n-dialog-description>
            </n-dialog-header>
            <div class="py-4">
              <p class="text-sm text-muted-foreground">Conteúdo do dialog.</p>
            </div>
            <div class="flex justify-end">
              <button n-button n-dialog-close>Fechar</button>
            </div>
          </n-dialog-content>
        </n-dialog>
      }
    </div>
  `,
})
export class DialogSizesDemo {
  readonly sizes: DialogContentVariants['nSize'][] = ['sm', 'default', 'lg', 'xl', 'full'];
}
