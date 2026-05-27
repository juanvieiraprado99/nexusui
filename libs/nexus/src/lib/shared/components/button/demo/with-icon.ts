import { Component } from '@angular/core';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'demo-button-with-icon',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="flex items-center gap-4 flex-wrap">
      <n-button>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
        Continue
      </n-button>
      <n-button nVariant="outline">
        Download
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
        </svg>
      </n-button>
    </div>
  `,
})
export class ButtonDemoWithIcon {}
