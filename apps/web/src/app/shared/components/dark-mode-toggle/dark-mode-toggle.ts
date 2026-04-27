import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DarkModeService } from 'nexus';

@Component({
  selector: 'dark-mode-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      (click)="darkMode.toggle()"
      class="inline-flex items-center justify-center rounded-md w-9 h-9 border border-border bg-background hover:bg-accent transition-colors"
      [attr.aria-label]="darkMode.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      @if (darkMode.isDark()) {
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      } @else {
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      }
    </button>
  `,
})
export class DarkModeToggle {
  protected readonly darkMode = inject(DarkModeService);
}
