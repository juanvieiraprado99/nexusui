import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../button/button.component';
import { InputComponent } from '../../input/input.component';
import { DialogCloseDirective } from '../dialog-close.directive';
import { DialogComponent } from '../dialog.component';
import { DialogContentComponent } from '../dialog-content.component';
import { DialogDescriptionComponent } from '../dialog-description.component';
import { DialogFooterComponent } from '../dialog-footer.component';
import { DialogHeaderComponent } from '../dialog-header.component';
import { DialogTitleComponent } from '../dialog-title.component';
import { DialogTriggerDirective } from '../dialog-trigger.directive';

@Component({
  selector: 'demo-dialog-with-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
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
    <n-dialog [(nOpen)]="open" [nPersistent]="true">
      <button n-button n-dialog-trigger>Editar perfil</button>
      <n-dialog-content>
        <n-dialog-header>
          <n-dialog-title>Editar perfil</n-dialog-title>
          <n-dialog-description>
            Alterações não salvas serão perdidas. Clique fora para ver o shake.
          </n-dialog-description>
        </n-dialog-header>

        <form
          [formGroup]="form"
          (ngSubmit)="submit()"
          class="grid gap-4 py-4"
          id="edit-profile-form"
        >
          <n-input formControlName="name" nLabel="Nome" [nRequired]="true" />
          <n-input formControlName="email" nLabel="E-mail" nType="email" [nRequired]="true" />
          <n-input formControlName="username" nLabel="Nome de usuário" />
        </form>

        <n-dialog-footer>
          <button n-button nVariant="outline" n-dialog-close type="button">Cancelar</button>
          <button
            n-button
            type="submit"
            form="edit-profile-form"
            [nDisabled]="form.invalid"
          >
            Salvar alterações
          </button>
        </n-dialog-footer>
      </n-dialog-content>
    </n-dialog>

    @if (lastSaved()) {
      <p class="text-sm text-muted-foreground mt-4">
        Salvo: {{ lastSaved()?.name }} &lt;{{ lastSaved()?.email }}&gt;
      </p>
    }
  `,
})
export class DialogWithFormDemo {
  open = signal(false);
  lastSaved = signal<{ name: string; email: string; username: string } | null>(null);

  readonly form = new FormGroup({
    name:     new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email:    new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    username: new FormControl('', { nonNullable: true }),
  });

  submit(): void {
    if (this.form.invalid) return;
    this.lastSaved.set(this.form.getRawValue());
    this.open.set(false);
  }
}
