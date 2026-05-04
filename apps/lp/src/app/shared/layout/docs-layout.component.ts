import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SidebarNavComponent } from './sidebar-nav.component';

@Component({
  selector: 'app-docs-layout',
  imports: [SidebarNavComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-screen-2xl px-6">
      <div class="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_240px] gap-8">
        <aside class="hidden lg:block border-r border-border/60">
          <app-sidebar-nav />
        </aside>
        <div class="min-w-0 py-8">
          <ng-content />
        </div>
        <aside class="hidden xl:block py-8">
          <ng-content select="[slot=aside]" />
        </aside>
      </div>
    </div>
  `,
})
export class DocsLayoutComponent {}
