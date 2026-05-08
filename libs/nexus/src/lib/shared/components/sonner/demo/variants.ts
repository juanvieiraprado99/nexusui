import { Component } from '@angular/core';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'demo-sonner-variants',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-wrap gap-2">
      <button type="button" class="px-3 py-1.5 rounded-md bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors dark:bg-neutral-50 dark:text-neutral-900" (click)="showDefault()">Default</button>
      <button type="button" class="px-3 py-1.5 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors" (click)="showSuccess()">Success</button>
      <button type="button" class="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors" (click)="showError()">Error</button>
      <button type="button" class="px-3 py-1.5 rounded-md bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors" (click)="showWarning()">Warning</button>
      <button type="button" class="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors" (click)="showInfo()">Info</button>
      <button type="button" class="px-3 py-1.5 rounded-md border border-neutral-300 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800" (click)="showWithAction()">Com ação</button>
    </div>
  `,
})
export class SonnerDemoVariants {
  showDefault(): void {
    toast('Informação geral');
  }

  showSuccess(): void {
    toast.success('Salvo com sucesso!', { description: 'Todas as alterações foram persistidas.' });
  }

  showError(): void {
    toast.error('Falha ao salvar', { description: 'Verifique sua conexão e tente novamente.' });
  }

  showWarning(): void {
    toast.warning('Sessão expirando', { description: 'Você será desconectado em 5 minutos.' });
  }

  showInfo(): void {
    toast.info('Nova versão disponível', { description: 'Atualize para obter os últimos recursos.' });
  }

  showWithAction(): void {
    toast('Arquivo movido para lixeira', {
      action: {
        label: 'Desfazer',
        onClick: () => toast.success('Ação desfeita!'),
      },
    });
  }
}
