import { Component } from '@angular/core';
import { FileUploadComponent } from '../file-upload.component';

@Component({
  selector: 'demo-file-upload-sizes',
  standalone: true,
  imports: [FileUploadComponent],
  template: `
    <div class="flex flex-col gap-4 w-full max-w-lg">
      <n-file-upload nSize="sm" nLabel="Small" nHint="nSize=&quot;sm&quot;" />
      <n-file-upload nSize="default" nLabel="Default" nHint="nSize=&quot;default&quot;" />
      <n-file-upload nSize="lg" nLabel="Large" nHint="nSize=&quot;lg&quot;" />
    </div>
  `,
})
export class FileUploadSizesDemo {}
