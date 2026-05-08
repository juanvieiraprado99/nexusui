import { Component } from '@angular/core';
import { toast } from 'ngx-sonner';

function fakeApiCall(shouldFail: boolean): Promise<{ name: string }> {
  return new Promise((resolve, reject) =>
    setTimeout(
      () => (shouldFail ? reject(new Error('Timeout')) : resolve({ name: 'relatório.pdf' })),
      2000,
    ),
  );
}

@Component({
  selector: 'demo-toast-promise',
  standalone: true,
  imports: [],
  template: `
    <div class="flex gap-2">
      <button
        type="button"
        class="px-4 py-2 rounded-md bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors dark:bg-neutral-50 dark:text-neutral-900"
        (click)="upload(false)"
      >
        Upload (sucesso)
      </button>
      <button
        type="button"
        class="px-4 py-2 rounded-md border border-neutral-300 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors dark:border-neutral-700 dark:text-neutral-200"
        (click)="upload(true)"
      >
        Upload (erro)
      </button>
    </div>
  `,
})
export class ToastDemoPromise {
  upload(shouldFail: boolean): void {
    toast.promise(fakeApiCall(shouldFail), {
      loading: 'Enviando arquivo...',
      success: (data: { name: string }) => `Arquivo "${data.name}" enviado com sucesso!`,
      error: 'Falha no upload. Tente novamente.',
    });
  }
}
