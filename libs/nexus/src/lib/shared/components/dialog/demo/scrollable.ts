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
  selector: 'demo-dialog-scrollable',
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
    <n-dialog>
      <button n-button n-dialog-trigger nVariant="outline">Dialog com scroll</button>
      <n-dialog-content [nScrollable]="true" nClass="max-h-[80vh]">
        <n-dialog-header>
          <n-dialog-title>Termos de Serviço</n-dialog-title>
          <n-dialog-description>
            Leia os termos com atenção antes de aceitar.
          </n-dialog-description>
        </n-dialog-header>
        <div class="overflow-y-auto flex-1 py-4 pr-2">
          @for (i of items; track i) {
            <p class="text-sm text-muted-foreground mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          }
        </div>
        <n-dialog-footer>
          <button n-button nVariant="outline" n-dialog-close>Recusar</button>
          <button n-button n-dialog-close>Aceitar</button>
        </n-dialog-footer>
      </n-dialog-content>
    </n-dialog>
  `,
})
export class DialogScrollableDemo {
  readonly items = Array.from({ length: 20 }, (_, i) => i);
}
