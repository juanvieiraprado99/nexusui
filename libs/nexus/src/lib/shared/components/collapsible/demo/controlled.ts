import { Component, signal } from '@angular/core';
import { CollapsibleComponent } from '../collapsible.component';
import { CollapsibleTriggerComponent } from '../collapsible-trigger.component';
import { CollapsibleContentComponent } from '../collapsible-content.component';

@Component({
  selector: 'demo-collapsible-controlled',
  standalone: true,
  imports: [CollapsibleComponent, CollapsibleTriggerComponent, CollapsibleContentComponent],
  template: `
    <div class="flex w-80 flex-col gap-4">
      <div class="flex items-center gap-3">
        <span class="text-sm text-muted-foreground">
          Estado: <strong>{{ isOpen() ? 'aberto' : 'fechado' }}</strong>
        </span>
        <button
          class="rounded border border-border px-2 py-1 text-xs hover:bg-accent"
          (click)="isOpen.set(!isOpen())"
        >
          Toggle externo
        </button>
      </div>
      <n-collapsible [(nOpen)]="isOpen">
        <button n-collapsible-trigger>Detalhes técnicos</button>
        <n-collapsible-content>
          <p class="text-sm text-muted-foreground">
            Modo controlado via
            <code class="rounded bg-muted px-1 font-mono">[(nOpen)]</code>.
            O botão externo e o trigger interno compartilham o mesmo signal.
          </p>
        </n-collapsible-content>
      </n-collapsible>
    </div>
  `,
})
export class CollapsibleControlledDemo {
  isOpen = signal(false);
}
