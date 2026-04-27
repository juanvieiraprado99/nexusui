import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly theme = signal<Theme>(this.getInitialTheme());
  readonly isDark = signal<boolean>(this.resolveIsDark(this.getInitialTheme()));

  constructor() {
    effect(() => {
      const t = this.theme();
      const dark = this.resolveIsDark(t);
      this.isDark.set(dark);
      if (this.isBrowser) {
        document.documentElement.classList.toggle('dark', dark);
        localStorage.setItem('nexus-theme', t);
      }
    });
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  toggle(): void {
    this.theme.set(this.isDark() ? 'light' : 'dark');
  }

  private getInitialTheme(): Theme {
    if (!this.isBrowser) return 'system';
    return (localStorage.getItem('nexus-theme') as Theme | null) ?? 'system';
  }

  private resolveIsDark(theme: Theme): boolean {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    return this.isBrowser && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
