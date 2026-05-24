import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { SelectComponent } from '../select/select.component';
import { SelectContentComponent } from '../select/select-content.component';
import { SelectItemComponent } from '../select/select-item.component';
import { SelectTriggerComponent } from '../select/select-trigger.component';
import { paginationItemVariants, type PaginationItemVariants } from './pagination.variants';

@Component({
  selector: 'n-pagination',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SelectComponent, SelectTriggerComponent, SelectContentComponent, SelectItemComponent],
  template: `
    @if (nShowPageSizeSelector()) {
      <div class="flex items-center gap-2 text-sm" data-slot="page-size-selector">
        <span class="text-muted-foreground whitespace-nowrap">Rows per page</span>
        <n-select
          [nValue]="pageSizeStr()"
          (nValueChange)="onPageSizeChange($event)"
          [nDisabled]="nDisabled()"
          class="w-[4.5rem]">
          <n-select-trigger [nSize]="nSize()" />
          <n-select-content>
            @for (opt of nPageSizeOptions(); track opt) {
              <n-select-item [nValue]="opt.toString()" [nLabel]="opt.toString()" />
            }
          </n-select-content>
        </n-select>
      </div>
    }

    <div class="flex items-center gap-1" data-slot="nav">

      @if (nShowFirstLast()) {
        <button
          type="button"
          [class]="itemClasses(false)"
          [disabled]="nDisabled() || nPage() <= 1"
          aria-label="Go to first page"
          (click)="goToPage(1)">
          <svg xmlns="http://www.w3.org/2000/svg" [attr.width]="iconSize()" [attr.height]="iconSize()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="11 17 6 12 11 7"/>
            <polyline points="18 17 13 12 18 7"/>
          </svg>
        </button>
      }

      <button
        type="button"
        [class]="itemClasses(false)"
        [disabled]="nDisabled() || nPage() <= 1"
        aria-label="Go to previous page"
        (click)="goToPage(nPage() - 1)">
        <svg xmlns="http://www.w3.org/2000/svg" [attr.width]="iconSize()" [attr.height]="iconSize()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      @if (nCompact()) {
        <span class="px-2 text-sm tabular-nums text-muted-foreground" data-slot="compact-info">
          {{ nPage() }} / {{ totalPages() }}
        </span>
      } @else {
        @for (item of pageItems(); track $index) {
          @if (item === '...') {
            <span [class]="ellipsisClasses()" aria-hidden="true">…</span>
          } @else {
            <button
              type="button"
              [class]="itemClasses(item === nPage())"
              [disabled]="nDisabled() || item === nPage()"
              [attr.aria-label]="'Page ' + item"
              [attr.aria-current]="item === nPage() ? 'page' : null"
              (click)="goToPage(+item)">
              {{ item }}
            </button>
          }
        }
      }

      <button
        type="button"
        [class]="itemClasses(false)"
        [disabled]="nDisabled() || nPage() >= totalPages()"
        aria-label="Go to next page"
        (click)="goToPage(nPage() + 1)">
        <svg xmlns="http://www.w3.org/2000/svg" [attr.width]="iconSize()" [attr.height]="iconSize()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      @if (nShowFirstLast()) {
        <button
          type="button"
          [class]="itemClasses(false)"
          [disabled]="nDisabled() || nPage() >= totalPages()"
          aria-label="Go to last page"
          (click)="goToPage(totalPages())">
          <svg xmlns="http://www.w3.org/2000/svg" [attr.width]="iconSize()" [attr.height]="iconSize()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="13 17 18 12 13 7"/>
            <polyline points="6 17 11 12 6 7"/>
          </svg>
        </button>
      }

    </div>
  `,
  host: {
    '[class]': 'hostClasses()',
    'role': 'navigation',
    '[attr.aria-label]': 'nAriaLabel()',
    'data-slot': 'root',
  },
})
export class PaginationComponent {
  readonly nPage             = model<number>(1);
  readonly nTotalPages       = input<number>(1);
  readonly nTotalItems       = input<number | null>(null);
  readonly nPageSize         = model<number>(10);
  readonly nPageSizeOptions  = input<number[]>([10, 25, 50, 100]);
  readonly nSiblingCount     = input<number>(1);
  readonly nBoundaryCount    = input<number>(1);
  readonly nShowFirstLast    = input<boolean>(true);
  readonly nShowPageSizeSelector = input<boolean>(false);
  readonly nCompact          = input<boolean>(false);
  readonly nDisabled         = input<boolean>(false);
  readonly nVariant          = input<PaginationItemVariants['nVariant']>('default');
  readonly nSize             = input<PaginationItemVariants['nSize']>('default');
  readonly nClass            = input<string>('');
  readonly nAriaLabel        = input<string>('Pagination');

  protected readonly totalPages = computed(() => {
    const totalItems = this.nTotalItems();
    return totalItems != null
      ? Math.max(1, Math.ceil(totalItems / this.nPageSize()))
      : Math.max(1, this.nTotalPages());
  });

  protected readonly pageItems = computed<(number | '...')[]>(() => {
    const total   = this.totalPages();
    const current = this.nPage();
    const sibling  = this.nSiblingCount();
    const boundary = this.nBoundaryCount();

    const range = (start: number, end: number): number[] =>
      Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i);

    const leftBoundary  = range(1, Math.min(boundary, total));
    const rightBoundary = range(Math.max(total - boundary + 1, boundary + 1), total);
    const siblings      = range(Math.max(1, current - sibling), Math.min(total, current + sibling));

    const allPages   = new Set([...leftBoundary, ...siblings, ...rightBoundary]);
    const sorted     = Array.from(allPages).sort((a, b) => a - b);
    const result: (number | '...')[] = [];
    let prev = 0;
    for (const page of sorted) {
      if (page - prev > 1) result.push('...');
      result.push(page);
      prev = page;
    }
    return result;
  });

  protected readonly pageSizeStr = computed(() => this.nPageSize().toString());

  protected readonly hostClasses = computed(() =>
    mergeClasses('flex flex-wrap items-center gap-4', this.nClass()),
  );

  protected readonly ellipsisClasses = computed(() => {
    const sizeMap: Record<string, string> = {
      sm:      'h-8 w-8 text-xs',
      default: 'h-9 w-9 text-sm',
      lg:      'h-10 w-10 text-base',
    };
    return mergeClasses(
      'inline-flex items-center justify-center text-muted-foreground select-none cursor-default',
      sizeMap[this.nSize() ?? 'default'],
    );
  });

  protected readonly iconSize = computed(() =>
    ({ sm: '14', default: '16', lg: '18' }[this.nSize() ?? 'default']),
  );

  constructor() {
    effect(() => {
      const max = this.totalPages();
      if (this.nPage() > max) {
        this.nPage.set(max);
      }
    });
  }

  protected itemClasses(active: boolean): string {
    return mergeClasses(
      paginationItemVariants({ nVariant: this.nVariant(), nSize: this.nSize(), nActive: active }),
    );
  }

  protected goToPage(page: number): void {
    const clamped = Math.max(1, Math.min(page, this.totalPages()));
    if (clamped !== this.nPage()) {
      this.nPage.set(clamped);
    }
  }

  protected onPageSizeChange(value: string): void {
    const size = parseInt(value, 10);
    if (!isNaN(size) && size > 0) {
      this.nPageSize.set(size);
      this.nPage.set(1);
    }
  }
}
