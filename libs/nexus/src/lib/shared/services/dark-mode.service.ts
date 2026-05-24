import { Injectable, signal, effect, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly systemDark = signal(false);

  readonly theme = signal<Theme>(this.getInitialTheme());
  readonly isDark = computed(() => {
    const t = this.theme();
    if (t === 'dark') return true;
    if (t === 'light') return false;
    return this.systemDark();
  });

  constructor() {
    if (this.isBrowser) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      this.systemDark.set(mq.matches);
      mq.addEventListener('change', (e) => this.systemDark.set(e.matches));
    }

    effect(() => {
      if (!this.isBrowser) return;
      document.documentElement.classList.toggle('dark', this.isDark());
      localStorage.setItem('nexus-theme', this.theme());
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
}
