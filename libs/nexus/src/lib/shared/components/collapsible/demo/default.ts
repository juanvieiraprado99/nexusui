import { Component } from '@angular/core';
import { CollapsibleComponent } from '../collapsible.component';
import { CollapsibleTriggerComponent } from '../collapsible-trigger.component';
import { CollapsibleContentComponent } from '../collapsible-content.component';

@Component({
  selector: 'demo-collapsible-default',
  standalone: true,
  imports: [CollapsibleComponent, CollapsibleTriggerComponent, CollapsibleContentComponent],
  template: `
    <n-collapsible class="w-80">
      <button
        n-collapsible-trigger
        nClass="rounded-md border border-border px-4 hover:bg-accent hover:no-underline"
      >
        Repositórios em que contribuo
      </button>
      <n-collapsible-content>
        <div class="rounded-md border border-border px-4 py-3 font-mono text-sm">
          &#64;radix-ui/primitives
        </div>
        <div class="mt-2 rounded-md border border-border px-4 py-3 font-mono text-sm">
          &#64;radix-ui/colors
        </div>
        <div class="mt-2 rounded-md border border-border px-4 py-3 font-mono text-sm">
          &#64;stitches/react
        </div>
      </n-collapsible-content>
    </n-collapsible>
  `,
})
export class CollapsibleDefaultDemo {}
