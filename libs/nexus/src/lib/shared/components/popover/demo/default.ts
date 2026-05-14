import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { PopoverCloseDirective } from '../popover-close.directive';
import { PopoverComponent } from '../popover.component';
import { PopoverContentComponent } from '../popover-content.component';
import { PopoverTriggerDirective } from '../popover-trigger.directive';

@Component({
  selector: 'demo-popover-default',
  standalone: true,
  imports: [
    PopoverComponent,
    PopoverTriggerDirective,
    PopoverContentComponent,
    PopoverCloseDirective,
    ButtonComponent,
  ],
  template: `
    <n-popover>
      <button n-button n-popover-trigger nVariant="outline">Abrir popover</button>
      <n-popover-content>
        <p class="font-medium leading-none">Dimensões</p>
        <p class="mt-1 text-muted-foreground">Define as dimensões do seu layer.</p>
        <button n-button n-popover-close nVariant="ghost" class="mt-4 w-full" nSize="sm">Fechar</button>
      </n-popover-content>
    </n-popover>
  `,
})
export class PopoverDefaultDemo {}
