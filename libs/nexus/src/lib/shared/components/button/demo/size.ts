import { Component } from '@angular/core';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'demo-button-size',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="flex items-center gap-4 flex-wrap">
      <n-button nSize="sm">Small</n-button>
      <n-button>Default</n-button>
      <n-button nSize="lg">Large</n-button>
      <n-button nSize="icon" aria-label="icon button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </n-button>
    </div>
  `,
})
export class ButtonDemoSize {}
