import { Component } from '@angular/core';
import { FileUploadComponent } from '../file-upload.component';

@Component({
  selector: 'demo-file-upload-icon-preview',
  standalone: true,
  imports: [FileUploadComponent],
  template: `
    <div class="flex flex-col gap-4 w-full max-w-lg">
      <n-file-upload
        nLabel="Documentos"
        nPreview="icon"
        nAccept="documents"
        [nMultiple]="true"
        [nMaxFiles]="5"
        nHint="PDF, DOC, DOCX, TXT · múltiplos"
      />
      <n-file-upload
        nLabel="Planilhas"
        nPreview="icon"
        nAccept="spreadsheets"
        [nMultiple]="true"
        nHint="CSV, XLS, XLSX, ODS"
      />
    </div>
  `,
})
export class FileUploadIconPreviewDemo {}
