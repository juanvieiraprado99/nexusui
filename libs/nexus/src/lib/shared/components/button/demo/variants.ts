import { Component } from '@angular/core';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'demo-button-variants',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="flex items-center gap-4 flex-wrap">
      <n-button nVariant="default">Default</n-button>
      <n-button nVariant="secondary">Secondary</n-button>
      <n-button nVariant="destructive">Destructive</n-button>
      <n-button nVariant="outline">Outline</n-button>
      <n-button nVariant="ghost">Ghost</n-button>
      <n-button nVariant="link">Link</n-button>
    </div>
  `,
})
export class ButtonDemoVariants {}
