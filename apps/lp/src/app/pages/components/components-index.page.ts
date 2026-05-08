import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button';
import { DocsLayoutComponent } from '../../shared/layout/docs-layout.component';

interface ComponentEntry {
  name: string;
  slug?: string;
  ready?: boolean;
}

@Component({
  selector: 'app-components-index-page',
  imports: [RouterLink, ButtonComponent, DocsLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <div class="max-w-3xl">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold tracking-tight">Components</h1>
            <p class="mt-2 text-muted-foreground">
              Here you can find all the components available in the library. We are working on adding more components.
            </p>
          </div>
          <div class="flex shrink-0 items-center gap-2">
            <button n-button nVariant="outline" nSize="sm" type="button">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Copy Page
            </button>
            <button n-button nVariant="outline" nSize="icon" type="button" aria-label="Open menu">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        <div class="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
          @for (item of components; track item.name) {
            @if (item.ready && item.slug) {
              <a [routerLink]="'/components/' + item.slug" class="text-sm text-foreground hover:underline underline-offset-4">{{ item.name }}</a>
            } @else {
              <span class="text-sm text-muted-foreground/50 cursor-not-allowed" title="Soon">{{ item.name }}</span>
            }
          }
        </div>

        <div class="mt-12 flex items-center justify-between border-t border-border/60 pt-6">
          <p class="text-xs text-muted-foreground">
            Can't find what you need? Check back soon for community-maintained components.
          </p>
          <a n-button nVariant="outline" nSize="sm" routerLink="/components/button">
            Button
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>

      <div slot="aside">
        <div class="rounded-lg border border-border/60 bg-card p-4">
          <h3 class="text-sm font-semibold">Deploy your nexus-ui app</h3>
          <p class="mt-1 text-xs text-muted-foreground">Trusted by teams worldwide. Ship Angular apps with confidence.</p>
          <button n-button nVariant="outline" nSize="sm" type="button" class="mt-3 w-full">Deploy Now</button>
        </div>
      </div>
    </app-docs-layout>
  `,
})
export class ComponentsIndexPage {
  protected readonly components: ComponentEntry[] = [
    { name: 'Accordion', slug: 'accordion', ready: true }, { name: 'Alert' }, { name: 'Alert Dialog' },
    { name: 'Aspect Ratio' }, { name: 'Avatar', slug: 'avatar', ready: true }, { name: 'Badge', slug: 'badge', ready: true },
    { name: 'Breadcrumb', slug: 'breadcrumb', ready: true }, { name: 'Button', slug: 'button', ready: true }, { name: 'Button Group' },
    { name: 'Calendar' }, { name: 'Card' }, { name: 'Carousel' },
    { name: 'Chart' }, { name: 'Checkbox', slug: 'checkbox', ready: true }, { name: 'Collapsible' },
    { name: 'Combobox', slug: 'combobox', ready: true }, { name: 'Command' }, { name: 'Context Menu' },
    { name: 'Data Table' }, { name: 'Date Picker', slug: 'date-picker', ready: true }, { name: 'Dialog' },
    { name: 'Drawer' }, { name: 'Dropdown Menu', slug: 'dropdown-menu', ready: true }, { name: 'Field' },
    { name: 'Hover Card' }, { name: 'Input', slug: 'input', ready: true }, { name: 'Input Group' },
    { name: 'Input OTP' }, { name: 'Item' }, { name: 'Kbd' }, { name: 'Label', slug: 'label', ready: true },
    { name: 'Menubar' }, { name: 'Native Select' }, { name: 'Navigation Menu' },
    { name: 'Pagination' }, { name: 'Popover' }, { name: 'Progress' },
    { name: 'Radio Group', slug: 'radio-group', ready: true }, { name: 'Resizable' }, { name: 'Scroll Area' },
    { name: 'Select', slug: 'select', ready: true }, { name: 'Separator', slug: 'separator', ready: true }, { name: 'Sheet' },
    { name: 'Sidebar' }, { name: 'Skeleton', slug: 'skeleton', ready: true }, { name: 'Slider', slug: 'slider', ready: true },
    { name: 'Sonner', slug: 'sonner', ready: true }, { name: 'Spinner' }, { name: 'Switch', slug: 'switch', ready: true },
    { name: 'Table' }, { name: 'Tabs' }, { name: 'Textarea', slug: 'textarea', ready: true },
    { name: 'Toast' }, { name: 'Toggle' }, { name: 'Toggle Group' },
    { name: 'Tooltip' }, { name: 'Typography' },
  ];
}
