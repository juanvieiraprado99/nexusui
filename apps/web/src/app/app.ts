import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DarkModeToggle } from './shared/components/dark-mode-toggle/dark-mode-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, DarkModeToggle],
  template: `
    <header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div class="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <a routerLink="/" class="font-semibold text-lg">nexus-ui</a>
        <dark-mode-toggle />
      </div>
    </header>
    <main>
      <router-outlet />
    </main>
  `,
})
export class App {}
