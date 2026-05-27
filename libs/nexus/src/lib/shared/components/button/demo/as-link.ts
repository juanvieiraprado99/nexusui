import { Component } from '@angular/core';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'demo-button-as-link',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="flex items-center gap-4 flex-wrap">
      <a n-button href="https://nexus-ui.dev" target="_blank" rel="noopener">Docs</a>
      <a n-button nVariant="outline" href="https://nexus-ui.dev" target="_blank" rel="noopener">External</a>
      <a n-button nVariant="link" href="https://nexus-ui.dev" target="_blank" rel="noopener">Link style</a>
    </div>
  `,
})
export class ButtonDemoAsLink {}
