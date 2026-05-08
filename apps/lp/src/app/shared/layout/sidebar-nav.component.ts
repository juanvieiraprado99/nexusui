import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path?: string;
  badge?: 'new' | 'soon';
  disabled?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

@Component({
  selector: 'app-sidebar-nav',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav aria-label="Documentation" class="flex flex-col gap-4 py-8 pr-6 text-sm">
      @for (section of sections; track section.title) {
        <div>
          <h4 class="mb-1 px-2 text-xs font-medium text-muted-foreground/70">{{ section.title }}</h4>
          <ul class="flex flex-col">
            @for (item of section.items; track item.label) {
              <li>
                @if (item.disabled || !item.path) {
                  <span class="flex items-center rounded-md px-2 py-1.5 text-foreground/30 cursor-not-allowed">
                    {{ item.label }}
                    @if (item.badge) {
                      <span class="ml-auto rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium leading-none text-muted-foreground">{{ item.badge }}</span>
                    }
                  </span>
                } @else {
                  <a
                    [routerLink]="item.path"
                    routerLinkActive="bg-accent text-accent-foreground font-medium"
                    [routerLinkActiveOptions]="{ exact: false }"
                    class="flex items-center rounded-md px-2 py-1.5 text-foreground/70 hover:text-foreground hover:bg-accent/50 transition-colors"
                  >
                    {{ item.label }}
                    @if (item.badge) {
                      <span class="ml-auto rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium leading-none text-muted-foreground" [attr.aria-label]="item.badge">{{ item.badge }}</span>
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
  protected readonly sections: NavSection[] = [
    {
      title: 'Sections',
      items: [
        { label: 'Get Started', path: '/get-started' },
        { label: 'Components', path: '/components' },
        { label: 'Installation', path: '/installation' },
        { label: 'Theming', disabled: true },
        { label: 'CLI', disabled: true, badge: 'new' },
        { label: 'RTL', disabled: true },
        { label: 'Skills', disabled: true, badge: 'new' },
        { label: 'MCP Server', disabled: true },
        { label: 'Registry', disabled: true },
        { label: 'Forms', disabled: true },
        { label: 'Changelog', disabled: true, badge: 'new' },
      ],
    },
    {
      title: 'Components',
      items: [
        { label: 'Accordion', path: '/components/accordion' },
        { label: 'Avatar', path: '/components/avatar' },
        { label: 'Badge', path: '/components/badge' },
        { label: 'Breadcrumb', path: '/components/breadcrumb' },
        { label: 'Button', path: '/components/button' },
        { label: 'Checkbox', path: '/components/checkbox' },
        { label: 'Combobox', path: '/components/combobox' },
        { label: 'Date Picker', path: '/components/date-picker' },
        { label: 'Dropdown Menu', path: '/components/dropdown-menu' },
        { label: 'Input', path: '/components/input' },
        { label: 'Label', path: '/components/label' },
        { label: 'Radio Group', path: '/components/radio-group' },
        { label: 'Select', path: '/components/select' },
        { label: 'Separator', path: '/components/separator' },
        { label: 'Skeleton', path: '/components/skeleton' },
        { label: 'Switch', path: '/components/switch' },
      ],
    },
  ];
}
