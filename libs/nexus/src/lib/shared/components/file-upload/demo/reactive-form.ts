import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadComponent } from '../file-upload.component';
import type { UploadFile } from '../file-upload.types';

@Component({
  selector: 'demo-file-upload-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, FileUploadComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="flex flex-col gap-4 w-full max-w-lg">
      <n-file-upload
        nLabel="Foto de perfil"
        nAccept="images-raster"
        nHint="JPG, PNG ou WebP · máximo 2 MB"
        [nMaxSize]="2 * 1024 * 1024"
        [nRequired]="true"
        [formControl]="form.controls.photo"
      />
      <div class="flex gap-2">
        <button
          type="submit"
          class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          [disabled]="form.invalid"
        >Enviar</button>
        <button
          type="button"
          class="rounded-md border px-4 py-2 text-sm font-medium"
          (click)="reset()"
        >Limpar</button>
      </div>
      @if (submitted()) {
        <p class="text-xs text-muted-foreground">
          Enviado: {{ form.value.photo?.[0]?.name ?? '—' }}
        </p>
      }
    </form>
  `,
})
export class FileUploadReactiveFormDemo {
  readonly form = new FormGroup({
    photo: new FormControl<UploadFile[]>([], {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: true,
    }),
  });

  private _submitted = false;
  submitted() { return this._submitted; }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this._submitted = true;
    }
  }

  reset(): void {
    this.form.reset();
    this._submitted = false;
  }
}
