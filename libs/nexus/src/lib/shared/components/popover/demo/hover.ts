import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { PopoverComponent } from '../popover.component';
import { PopoverContentComponent } from '../popover-content.component';
import { PopoverTriggerDirective } from '../popover-trigger.directive';

@Component({
  selector: 'demo-popover-hover',
  standalone: true,
  imports: [PopoverComponent, PopoverTriggerDirective, PopoverContentComponent, ButtonComponent],
  template: `
    <n-popover nTrigger="hover">
      <button n-button n-popover-trigger nVariant="outline">Passe o mouse</button>
      <n-popover-content nSize="sm">
        <p class="font-medium leading-none">Dica rápida</p>
        <p class="mt-1 text-muted-foreground">Abre ao passar o mouse, fecha ao sair.</p>
      </n-popover-content>
    </n-popover>
  `,
})
export class PopoverHoverDemo {}
