import { Component } from '@angular/core';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'demo-button-disabled',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="flex items-center gap-4 flex-wrap">
      <n-button [nDisabled]="true">Default</n-button>
      <n-button nVariant="destructive" [nDisabled]="true">Destructive</n-button>
      <n-button nVariant="outline" [nDisabled]="true">Outline</n-button>
      <a n-button nVariant="link" href="#" [nDisabled]="true">Link</a>
    </div>
  `,
})
export class ButtonDemoDisabled {}
