import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../components/button';
import { DarkModeService } from 'nexus';

@Component({
  selector: 'app-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-svh flex flex-col bg-background text-foreground">
      <header class="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
        <div class="mx-auto flex h-14 max-w-screen-2xl items-center gap-6 px-6">
          <a routerLink="/" class="flex items-center gap-2 font-semibold tracking-tight">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-md bg-foreground text-background text-xs font-bold">N</span>
            <span class="text-sm">nexus/ui</span>
          </a>
          <nav class="hidden md:flex items-center gap-5 text-sm">
            @for (link of navLinks; track link.path) {
              <a
                [routerLink]="link.path"
                routerLinkActive="text-foreground"
                [routerLinkActiveOptions]="{ exact: link.exact }"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >{{ link.label }}</a>
            }
          </nav>
          <div class="ml-auto flex items-center gap-2">
            <div class="hidden lg:flex relative items-center">
              <svg class="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input
                type="search"
                placeholder="Search documentation..."
                class="h-8 w-64 rounded-md border border-border bg-muted/40 pl-8 pr-9 text-xs text-foreground placeholder:text-muted-foreground transition-colors focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Search documentation"
              />
              <kbd class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-5 items-center rounded border border-border bg-background px-1.5 text-[10px] font-mono text-muted-foreground">⌘K</kbd>
            </div>
            <button
              type="button"
              n-button
              nVariant="ghost"
              nSize="icon"
              aria-label="Toggle theme"
              (nClick)="theme.toggle()"
            >
              @if (theme.isDark()) {
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
              } @else {
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              }
            </button>
            <a n-button nVariant="ghost" nSize="sm" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.92 10.92 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>
              <span class="font-mono text-xs ml-1">GitHub</span>
            </a>
            <a n-button nSize="sm" routerLink="/get-started">Get Started</a>
          </div>
        </div>
      </header>

      <main class="flex-1">
        <router-outlet />
      </main>

      <footer class="border-t border-border/60 py-8">
        <div class="mx-auto max-w-screen-2xl px-6 text-center text-sm text-muted-foreground">
          Built by <span class="font-medium text-foreground underline underline-offset-4">juanp</span>. The source code is available on
          <a href="https://github.com" class="font-medium text-foreground underline underline-offset-4">GitHub</a>.
        </div>
      </footer>
    </div>
  `,
})
export class AppShellComponent {
  protected readonly theme = inject(DarkModeService);

  protected readonly navLinks = [
    { path: '/get-started', label: 'Docs', exact: true },
    { path: '/components', label: 'Components', exact: false },
  ];
}
