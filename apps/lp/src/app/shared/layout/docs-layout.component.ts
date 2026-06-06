import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  viewChild,
  ElementRef,
  afterNextRender,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SidebarNavComponent } from './sidebar-nav.component';
import { ButtonComponent } from '../components/button';
import { NAV_FLAT, NavItem } from './nav-data';
import { SidebarScrollService } from './sidebar-scroll.service';

interface TocEntry {
  id: string;
  text: string;
  level: number;
}

@Component({
  selector: 'app-docs-layout',
  imports: [SidebarNavComponent, ButtonComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-screen-2xl px-6">
      <div class="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_240px] gap-8">
        <aside #sidebar (scroll)="onSidebarScroll($event)" class="hidden lg:block border-r border-border/60 lg:sticky lg:top-14 lg:self-start lg:h-[calc(100svh-3.5rem)] lg:overflow-y-auto">
          <app-sidebar-nav />
        </aside>

        <div class="min-w-0 py-8">
          <div #content>
            <ng-content />
          </div>

          @if (prev() || next()) {
            <nav class="mt-16 flex items-center justify-between gap-4 border-t border-border/60 pt-6" aria-label="Pagination">
              @if (prev(); as p) {
                <a n-button nVariant="outline" [routerLink]="p.path" class="group">
                  <svg class="mr-1 transition-transform group-hover:-translate-x-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
                  {{ p.label }}
                </a>
              } @else {
                <span></span>
              }
              @if (next(); as n) {
                <a n-button nVariant="outline" [routerLink]="n.path" class="group ml-auto">
                  {{ n.label }}
                  <svg class="ml-1 transition-transform group-hover:translate-x-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
                </a>
              }
            </nav>
          }
        </div>

        <aside class="hidden xl:block py-8">
          <div class="sticky top-20">
            @if (toc().length) {
              <p class="mb-3 text-sm font-medium text-foreground">On This Page</p>
              <ul class="flex flex-col gap-2 border-l border-border/60 text-sm">
                @for (entry of toc(); track entry.id) {
                  <li [style.padding-left.px]="entry.level === 3 ? 16 : 0">
                    <a
                      [href]="'#' + entry.id"
                      (click)="scrollTo($event, entry.id)"
                      class="-ml-px block border-l-2 pl-3 transition-colors"
                      [class.border-foreground]="activeId() === entry.id"
                      [class.text-foreground]="activeId() === entry.id"
                      [class.font-medium]="activeId() === entry.id"
                      [class.border-transparent]="activeId() !== entry.id"
                      [class.text-muted-foreground]="activeId() !== entry.id"
                      [class.hover:text-foreground]="activeId() !== entry.id"
                      [attr.aria-current]="activeId() === entry.id ? 'location' : null"
                    >{{ entry.text }}</a>
                  </li>
                }
              </ul>
            }
            <!-- legacy slot: pages may still project extra aside content -->
            <ng-content select="[slot=aside]" />
          </div>
        </aside>
      </div>
    </div>
  `,
})
export class DocsLayoutComponent {
  private readonly router = inject(Router);
  private readonly sidebarScroll = inject(SidebarScrollService);
  private readonly content = viewChild.required<ElementRef<HTMLElement>>('content');
  private readonly sidebar = viewChild<ElementRef<HTMLElement>>('sidebar');

  protected readonly toc = signal<TocEntry[]>([]);
  protected readonly activeId = signal<string | null>(null);

  private readonly currentPath = this.router.url.split(/[?#]/)[0];

  protected readonly prev = computed<NavItem | null>(() => {
    const i = NAV_FLAT.findIndex((n) => n.path === this.currentPath);
    return i > 0 ? NAV_FLAT[i - 1] : null;
  });

  protected readonly next = computed<NavItem | null>(() => {
    const i = NAV_FLAT.findIndex((n) => n.path === this.currentPath);
    return i >= 0 && i < NAV_FLAT.length - 1 ? NAV_FLAT[i + 1] : null;
  });

  constructor() {
    afterNextRender(() => {
      this.buildToc();
      const aside = this.sidebar()?.nativeElement;
      if (aside) aside.scrollTop = this.sidebarScroll.get();
    });
  }

  protected onSidebarScroll(event: Event): void {
    this.sidebarScroll.save((event.target as HTMLElement).scrollTop);
  }

  private buildToc(): void {
    const root = this.content().nativeElement;
    const headings = Array.from(root.querySelectorAll<HTMLElement>('h2, h3'));
    const used = new Set<string>();
    const entries: TocEntry[] = [];

    for (const el of headings) {
      const text = (el.textContent ?? '').trim();
      if (!text) continue;
      let id = el.id || this.slugify(text);
      let n = 2;
      while (used.has(id)) id = `${this.slugify(text)}-${n++}`;
      used.add(id);
      el.id = id;
      el.style.scrollMarginTop = '5rem';
      entries.push({ id, text, level: el.tagName === 'H3' ? 3 : 2 });
    }

    this.toc.set(entries);

    if (entries.length) {
      const observer = new IntersectionObserver(
        (records) => {
          for (const r of records) {
            if (r.isIntersecting) this.activeId.set((r.target as HTMLElement).id);
          }
        },
        { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
      );
      for (const el of headings) observer.observe(el);
      this.activeId.set(entries[0].id);
    }
  }

  protected scrollTo(event: Event, id: string): void {
    event.preventDefault();
    const el = this.content().nativeElement.querySelector(`#${CSS.escape(id)}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.activeId.set(id);
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
