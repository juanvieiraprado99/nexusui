import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import {
  DropdownMenuComponent,
  DropdownMenuContentComponent,
  DropdownMenuTriggerDirective,
} from '../dropdown-menu';
import { DATA_TABLE_CONTEXT } from './data-table.tokens';

@Component({
  selector: 'n-data-table-column-toggle',
  standalone: true,
  imports: [
    DropdownMenuComponent,
    DropdownMenuContentComponent,
    DropdownMenuTriggerDirective,
  ],
  template: `
    <n-dropdown-menu>
      <button
        type="button"
        [class]="triggerClasses()"
        n-dropdown-menu-trigger
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/>
        </svg>
        Colunas
      </button>

      <n-dropdown-menu-content nAlign="end" nClass="min-w-[160px]">
        <div class="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
          Colunas visíveis
        </div>
        <div class="my-1 h-px bg-border" role="separator" aria-hidden="true"></div>
        @for (col of ctx.columns(); track col.key) {
          @if (col.header) {
            <button
              type="button"
              role="menuitemcheckbox"
              [attr.aria-checked]="ctx.isColumnVisible(col.key)"
              class="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer select-none hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              (click)="toggleColumn($event, col.key)"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                [class.opacity-0]="!ctx.isColumnVisible(col.key)"
              >
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>{{ col.header }}</span>
            </button>
          }
        }
      </n-dropdown-menu-content>
    </n-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class DataTableColumnToggleComponent {
  readonly nClass = input<string>('');

  protected readonly ctx = inject(DATA_TABLE_CONTEXT);

  protected triggerClasses(): string {
    return mergeClasses(
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-all duration-200',
      'h-9 px-3',
      'border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      this.nClass(),
    );
  }

  protected toggleColumn(event: Event, key: string): void {
    event.stopPropagation();
    this.ctx.toggleColumnVisibility(key);
  }
}
