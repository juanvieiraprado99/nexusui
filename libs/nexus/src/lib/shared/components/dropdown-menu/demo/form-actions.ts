import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../button/button.component';
import { InputComponent } from '../../input/input.component';
import { DropdownMenuComponent } from '../dropdown-menu.component';
import { DropdownMenuContentComponent } from '../dropdown-menu-content.component';
import { DropdownMenuItemComponent } from '../dropdown-menu-item.component';
import { DropdownMenuSeparatorComponent } from '../dropdown-menu-separator.component';
import { DropdownMenuShortcutComponent } from '../dropdown-menu-shortcut.component';
import { DropdownMenuTriggerDirective } from '../dropdown-menu-trigger.directive';

@Component({
  selector: 'demo-dropdown-menu-form-actions',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    DropdownMenuComponent,
    DropdownMenuTriggerDirective,
    DropdownMenuContentComponent,
    DropdownMenuItemComponent,
    DropdownMenuSeparatorComponent,
    DropdownMenuShortcutComponent,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="publish()" class="flex flex-col gap-3 max-w-sm">
      <n-input formControlName="title" nLabel="Título" [nRequired]="true" />
      <n-input formControlName="slug" nLabel="Slug" />

      <div class="flex items-center gap-2">
        <button n-button type="submit" [nDisabled]="form.invalid">Publicar</button>

        <n-dropdown-menu>
          <button n-button n-dropdown-menu-trigger nVariant="outline" type="button" aria-label="Mais ações">
            ⋯
          </button>
          <n-dropdown-menu-content nAlign="end">
            <n-dropdown-menu-item (nSelect)="saveDraft()">
              Salvar rascunho
              <n-dropdown-menu-shortcut>⌘S</n-dropdown-menu-shortcut>
            </n-dropdown-menu-item>
            <n-dropdown-menu-item (nSelect)="duplicate()">
              Duplicar
              <n-dropdown-menu-shortcut>⌘D</n-dropdown-menu-shortcut>
            </n-dropdown-menu-item>
            <n-dropdown-menu-separator />
            <n-dropdown-menu-item (nSelect)="form.reset()">
              Limpar formulário
            </n-dropdown-menu-item>
            <n-dropdown-menu-item nVariant="destructive" (nSelect)="discard()">
              Descartar
            </n-dropdown-menu-item>
          </n-dropdown-menu-content>
        </n-dropdown-menu>
      </div>

      @if (lastAction()) {
        <p class="text-sm text-muted-foreground">Última ação: {{ lastAction() }}</p>
      }
    </form>
  `,
})
export class DropdownMenuFormActionsDemo {
  readonly form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    slug: new FormControl('', { nonNullable: true }),
  });

  readonly lastAction = signal<string | null>(null);

  publish(): void {
    if (this.form.invalid) return;
    this.lastAction.set(`publicar (${JSON.stringify(this.form.value)})`);
  }

  saveDraft(): void {
    this.lastAction.set(`rascunho (${JSON.stringify(this.form.value)})`);
  }

  duplicate(): void {
    this.lastAction.set('duplicar');
  }

  discard(): void {
    this.form.reset();
    this.lastAction.set('descartar');
  }
}
