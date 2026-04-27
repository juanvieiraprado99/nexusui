import { Component } from '@angular/core';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'demo-button-variants',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="flex items-center gap-4 flex-wrap">
      <n-button nType="default">Default</n-button>
      <n-button nType="secondary">Secondary</n-button>
      <n-button nType="destructive">Destructive</n-button>
      <n-button nType="outline">Outline</n-button>
      <n-button nType="ghost">Ghost</n-button>
      <n-button nType="link">Link</n-button>
    </div>
  `,
})
export class ButtonDemoVariants {}
