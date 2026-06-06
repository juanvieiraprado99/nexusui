import { Component } from '@angular/core';
import { ImageUploadComponent } from '../image-upload.component';

@Component({
  selector: 'demo-image-upload-disabled',
  standalone: true,
  imports: [ImageUploadComponent],
  template: `
    <div class="flex flex-col gap-6 w-full max-w-lg">
      <n-image-upload
        nLabel="Dropzone desabilitado"
        nHint="Não aceita interação"
        [nDisabled]="true"
      />
      <n-image-upload
        nVariant="avatar"
        nLabel="Avatar desabilitado"
        [nDisabled]="true"
      />
    </div>
  `,
})
export class ImageUploadDisabledDemo {}
