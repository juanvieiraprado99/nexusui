import { Component } from '@angular/core';
import { FileUploadComponent } from '../file-upload.component';

@Component({
  selector: 'demo-file-upload-mixed',
  standalone: true,
  imports: [FileUploadComponent],
  template: `
    <div class="flex flex-col gap-4 w-full max-w-lg">
      <n-file-upload
        nLabel="Imagem ou PDF"
        nAccept="image/*,.pdf"
        nPreview="icon"
        [nMultiple]="true"
        [nMaxFiles]="5"
        nHint="Aceita imagens e PDF · string manual"
      />
      <n-file-upload
        nLabel="Qualquer arquivo"
        nAccept="all"
        nPreview="icon"
        nHint="Sem restrição de tipo"
      />
    </div>
  `,
})
export class FileUploadMixedDemo {}
