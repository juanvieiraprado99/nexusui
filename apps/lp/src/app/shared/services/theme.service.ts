import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_KEY = 'nexus-theme';
type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly theme = signal<Theme>(this.read());

  constructor() {
    effect(() => {
      const t = this.theme();
      if (!this.isBrowser) return;
      const root = document.documentElement;
      root.classList.toggle('dark', t === 'dark');
      try { localStorage.setItem(STORAGE_KEY, t); } catch { /* ignore */ }
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  private read(): Theme {
    if (!this.isBrowser) return 'dark';
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === 'light' || stored === 'dark') return stored;
    } catch { /* ignore */ }
    return 'dark';
  }
}
