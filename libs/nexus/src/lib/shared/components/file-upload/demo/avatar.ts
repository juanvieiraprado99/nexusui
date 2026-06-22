import { Component } from '@angular/core';
import { ImageUploadComponent } from '../image-upload.component';

@Component({
  selector: 'demo-image-upload-avatar',
  standalone: true,
  imports: [ImageUploadComponent],
  template: `
    <div class="flex items-center gap-6">
      <n-image-upload nVariant="avatar" nSize="sm" nLabel="Avatar" />
      <n-image-upload nVariant="avatar" nSize="default" nLabel="Avatar" [nCrop]="true" [nCropAspectRatio]="1" />
      <n-image-upload nVariant="avatar" nSize="lg" nLabel="Avatar" />
    </div>
  `,
})
export class ImageUploadAvatarDemo {}
