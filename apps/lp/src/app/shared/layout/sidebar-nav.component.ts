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
    <nav aria-label="Documentation" class="flex flex-col gap-6 py-8 pr-6 text-sm">
      @for (section of sections; track section.title) {
        <div>
          <h4 class="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{{ section.title }}</h4>
          <ul class="flex flex-col">
            @for (item of section.items; track item.label) {
              <li>
                @if (item.disabled || !item.path) {
                  <span class="flex items-center justify-between rounded-md px-2 py-1.5 text-muted-foreground/60 cursor-not-allowed">
                    {{ item.label }}
                    @if (item.badge) {
                      <span class="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-sky-500" aria-label="soon"></span>
                    }
                  </span>
                } @else {
                  <a
                    [routerLink]="item.path"
                    routerLinkActive="bg-muted text-foreground font-medium"
                    [routerLinkActiveOptions]="{ exact: false }"
                    class="flex items-center justify-between rounded-md px-2 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {{ item.label }}
                    @if (item.badge) {
                      <span class="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-sky-500" [attr.aria-label]="item.badge"></span>
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
        { label: 'Introduction', path: '/' },
        { label: 'Components', path: '/components' },
        { label: 'Installation', disabled: true },
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
      ],
    },
  ];
}
