import { Component } from '@angular/core';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'demo-sonner-default',
  standalone: true,
  imports: [],
  template: `
    <button
      type="button"
      class="px-4 py-2 rounded-md bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200"
      (click)="show()"
    >
      Mostrar toast
    </button>
  `,
})
export class SonnerDemoDefault {
  show(): void {
    toast('Evento agendado', { description: 'Sexta-feira, 09 de maio de 2025 às 17h' });
  }
}
