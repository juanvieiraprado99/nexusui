import { Component } from '@angular/core';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'demo-button-host-types',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="flex items-center gap-4 flex-wrap">
      <n-button>n-button</n-button>
      <button n-button nVariant="secondary" type="submit">button[n-button]</button>
      <a n-button nVariant="outline" href="#">a[n-button]</a>
    </div>
  `,
})
export class ButtonDemoHostTypes {}
