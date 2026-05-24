import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DarkModeService } from 'nexus';
import { HighlighterService } from '../../services/highlighter.service';

@Component({
  selector: 'app-code-block',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host ::ng-deep .shiki {
      background: transparent !important;
      padding: 0 !important;
      margin: 0;
    }
    :host ::ng-deep .shiki code {
      counter-reset: line;
      display: block;
      padding: 0.875rem 1rem 0.875rem 0;
      font-size: 13px;
    }
    :host ::ng-deep .shiki .line::before {
      counter-increment: line;
      content: counter(line);
      display: inline-block;
      width: 2.5rem;
      padding-right: 1rem;
      text-align: right;
      color: rgba(120,120,120,0.45);
      user-select: none;
    }
  `],
  template: `
    <div class="rounded-md border border-border/60 overflow-hidden bg-zinc-50 text-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
      <div class="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 px-3 py-1.5 text-zinc-500 dark:text-zinc-400">
        <span class="font-mono text-xs">{{ filename() || language() }}</span>
        <button
          type="button"
          (click)="copy()"
          aria-label="Copy code"
          class="h-7 w-7 rounded-md inline-flex items-center justify-center transition-colors cursor-pointer text-zinc-500 hover:text-zinc-900 hover:bg-black/5 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10"
        >
          @if (copied()) {
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          } @else {
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          }
        </button>
      </div>
      @if (highlightedHtml()) {
        <div class="overflow-x-auto font-mono" [innerHTML]="highlightedHtml()"></div>
      } @else {
        <pre class="overflow-x-auto p-4 pl-10 text-[13px] leading-normal font-mono"><code>{{ code() }}</code></pre>
      }
    </div>
  `,
})
export class CodeBlockComponent {
  readonly code = input.required<string>();
  readonly language = input<string>('ts');
  readonly filename = input<string>('');

  protected readonly copied = signal(false);
  protected readonly highlightedHtml = signal<SafeHtml>('');

  private readonly platformId = inject(PLATFORM_ID);
  private readonly highlighter = inject(HighlighterService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly themeService = inject(DarkModeService);

  constructor() {
    effect(() => {
      const code = this.code();
      const lang = this.language();
      const darkMode = this.themeService.isDark();
      if (!isPlatformBrowser(this.platformId)) return;
      this.highlightedHtml.set('');
      this.highlighter.highlight(code, lang, darkMode).then(html => {
        this.highlightedHtml.set(this.sanitizer.bypassSecurityTrustHtml(html));
      });
    });
  }

  protected async copy(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    } catch { /* ignore */ }
  }
}
