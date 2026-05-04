import { Component, ChangeDetectionStrategy, input, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from '../button';

@Component({
  selector: 'app-code-block',
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="group relative rounded-md border border-border/60 bg-zinc-950 text-zinc-100">
      @if (filename()) {
        <div class="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-zinc-400">
          <span class="font-mono">{{ filename() }}</span>
          <span class="uppercase tracking-wide">{{ language() }}</span>
        </div>
      }
      <div class="relative">
        <pre class="overflow-x-auto p-4 text-[13px] leading-relaxed font-mono"><code>{{ code() }}</code></pre>
        <button
          type="button"
          n-button
          nVariant="ghost"
          nSize="icon"
          (nClick)="copy()"
          aria-label="Copy code"
          class="absolute right-2 top-2 h-7 w-7 text-zinc-400 hover:text-white hover:bg-white/10"
        >
          @if (copied()) {
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          } @else {
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          }
        </button>
      </div>
    </div>
  `,
})
export class CodeBlockComponent {
  readonly code = input.required<string>();
  readonly language = input<string>('ts');
  readonly filename = input<string>('');

  protected readonly copied = signal(false);
  private readonly platformId = inject(PLATFORM_ID);

  protected async copy(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    } catch { /* ignore */ }
  }
}
