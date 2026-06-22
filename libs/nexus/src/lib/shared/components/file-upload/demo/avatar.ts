import { Component } from '@angular/core';
import { FileUploadComponent } from '../file-upload.component';

@Component({
  selector: 'demo-file-upload-avatar',
  standalone: true,
  imports: [FileUploadComponent],
  template: `
    <div class="flex items-center gap-6">
      <n-file-upload nVariant="avatar" nSize="sm" nLabel="Avatar" />
      <n-file-upload nVariant="avatar" nSize="default" nLabel="Avatar" [nCrop]="true" [nCropAspectRatio]="1" />
      <n-file-upload nVariant="avatar" nSize="lg" nLabel="Avatar" />
    </div>
  `,
})
export class FileUploadAvatarDemo {}
