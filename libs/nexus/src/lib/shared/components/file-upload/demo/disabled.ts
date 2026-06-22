import { Component } from '@angular/core';
import { FileUploadComponent } from '../file-upload.component';

@Component({
  selector: 'demo-file-upload-disabled',
  standalone: true,
  imports: [FileUploadComponent],
  template: `
    <div class="flex flex-col gap-6 w-full max-w-lg">
      <n-file-upload
        nLabel="Dropzone desabilitado"
        nHint="Não aceita interação"
        [nDisabled]="true"
      />
      <n-file-upload
        nVariant="avatar"
        nLabel="Avatar desabilitado"
        [nDisabled]="true"
      />
    </div>
  `,
})
export class FileUploadDisabledDemo {}
