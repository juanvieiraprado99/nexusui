import { Component } from '@angular/core';
import { ImageUploadComponent } from '../image-upload.component';

@Component({
  selector: 'demo-image-upload-icon-preview',
  standalone: true,
  imports: [ImageUploadComponent],
  template: `
    <div class="flex flex-col gap-4 w-full max-w-lg">
      <n-image-upload
        nLabel="Documentos"
        nPreview="icon"
        nAccept="documents"
        [nMultiple]="true"
        [nMaxFiles]="5"
        nHint="PDF, DOC, DOCX, TXT · múltiplos"
      />
      <n-image-upload
        nLabel="Planilhas"
        nPreview="icon"
        nAccept="spreadsheets"
        [nMultiple]="true"
        nHint="CSV, XLS, XLSX, ODS"
      />
    </div>
  `,
})
export class ImageUploadIconPreviewDemo {}
