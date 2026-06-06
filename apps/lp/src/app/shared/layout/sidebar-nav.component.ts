import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_SECTIONS } from './nav-data';

@Component({
  selector: 'app-sidebar-nav',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav aria-label="Documentation" class="flex flex-col gap-6 py-8 pr-6 text-sm">
      @for (section of sections; track section.title) {
        <div>
          <h4 class="mb-2 px-2 text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground/60">{{ section.title }}</h4>
          <ul class="flex flex-col gap-0.5">
            @for (item of section.items; track item.label) {
              <li>
                @if (item.disabled || !item.path) {
                  <span class="flex items-center rounded-md px-2 py-1.5 text-foreground/30 cursor-not-allowed">
                    {{ item.label }}
                    @if (item.badge) {
                      <span class="ml-auto rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium leading-none text-muted-foreground">{{ item.badge }}</span>
                    }
                  </span>
                } @else {
                  <a
                    [routerLink]="item.path"
                    routerLinkActive="bg-accent text-accent-foreground font-medium"
                    [routerLinkActiveOptions]="{ exact: false }"
                    class="flex items-center rounded-md px-2 py-1.5 text-foreground/70 transition-colors hover:bg-accent/50 hover:text-foreground"
                  >
                    {{ item.label }}
                    @if (item.badge) {
                      <span
                        class="ml-auto rounded-full border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium leading-none text-foreground"
                        [attr.aria-label]="item.badge"
                      >{{ item.badge }}</span>
                    }
                  </a>
                }
              </li>
            }
          </ul>
        </div>
      }
    </nav>
  `,
})
export class SidebarNavComponent {
  protected readonly sections = NAV_SECTIONS;
}
