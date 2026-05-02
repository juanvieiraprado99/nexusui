import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  computed,
  inject,
  input,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { SELECT_CONTEXT } from './select.tokens';
import { selectTriggerVariants, type SelectTriggerVariants } from './select.variants';

@Component({
  selector: 'n-select-trigger',
  standalone: true,
  template: `
    <button
      #triggerBtn
      type="button"
      [id]="ctx.triggerId"
      role="combobox"
      aria-haspopup="listbox"
      data-slot="trigger"
      [attr.aria-expanded]="ctx.open()"
      [attr.aria-controls]="ctx.contentId"
      [attr.aria-busy]="ctx.loading() ? true : null"
      [attr.aria-disabled]="ctx.disabled() ? true : null"
      [attr.disabled]="ctx.disabled() ? true : null"
      [attr.data-disabled]="ctx.disabled() ? '' : null"
      [attr.aria-labelledby]="ctx.labelId() || null"
      [attr.aria-label]="ctx.labelId() ? null : (ctx.ariaLabel() || null)"
      [attr.aria-invalid]="ctx.hasError() ? true : null"
      [attr.data-invalid]="ctx.hasError() ? '' : null"
      [attr.aria-required]="ctx.required() ? true : null"
      [attr.aria-describedby]="ctx.describedBy()"
      [attr.data-state]="ctx.open() ? 'open' : 'closed'"
      [class]="classes()"
      (click)="handleClick()"
      (keydown)="handleKeydown($event)"
    >
      <span class="flex flex-1 items-center gap-2 truncate text-left"
            [class.text-muted-foreground]="!hasValue()">
        @if (ctx.multiple() && hasValue() && ctx.multiSummary() === 'list') {
          <span class="truncate">{{ multiList() }}</span>
        } @else {
          <span class="truncate">{{ displayText() }}</span>
        }
      </span>

      <span class="ml-auto flex shrink-0 items-center gap-1">
        @if (ctx.clearable() && hasValue() && !ctx.loading() && !ctx.disabled()) {
          <span
            role="button"
            tabindex="-1"
            class="rounded-sm opacity-50 hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-ring"
            aria-label="Clear selection"
            data-slot="icon-trailing"
            (click)="handleClear($event)"
            (keydown)="handleClearKey($event)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </span>
        }
        @if (ctx.loading()) {
          <svg class="h-4 w-4 animate-spin text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true" data-slot="icon-trailing">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
        } @else {
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-50 transition-transform"
               [class.rotate-180]="ctx.open()"
               viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-slot="icon-trailing">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        }
      </span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class SelectTriggerComponent implements AfterViewInit, OnDestroy {
  readonly nSize = input<SelectTriggerVariants['nSize']>('default');
  readonly nPlaceholder = input<string>('Select an option...');
  readonly nClass = input<string>('');

  protected readonly ctx = inject(SELECT_CONTEXT);

  @ViewChild('triggerBtn') private _triggerBtnRef!: ElementRef<HTMLButtonElement>;

  protected readonly classes = computed(() =>
    mergeClasses(selectTriggerVariants({ nSize: this.nSize() }), this.nClass()),
  );

  protected readonly hasValue = computed(() =>
    this.ctx.multiple() ? this.ctx.values().length > 0 : !!this.ctx.value(),
  );

  protected readonly displayText = computed(() => {
    if (this.ctx.multiple()) {
      const count = this.ctx.values().length;
      return count > 0 ? `${count} selected` : this.nPlaceholder();
    }
    return this.ctx.selectedLabel() || this.ctx.value() || this.nPlaceholder();
  });

  protected readonly multiList = computed(() => {
    const labels = this.ctx.selectedLabels();
    const order = this.ctx.values();
    return order.map(v => labels[v] ?? v).join(', ');
  });

  ngAfterViewInit(): void {
    this.ctx.setTriggerEl(this._triggerBtnRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx.setTriggerEl(null);
  }

  protected handleClick(): void {
    if (this.ctx.disabled()) return;
    this.ctx.togglePanel();
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (this.ctx.disabled()) return;

    if (!this.ctx.open()) {
      switch (event.key) {
        case 'Enter':
        case ' ':
        case 'ArrowDown':
        case 'ArrowUp':
          event.preventDefault();
          this.ctx.openPanel();
          return;
      }
      if (this._isPrintable(event)) {
        event.preventDefault();
        this.ctx.openPanel();
        queueMicrotask(() => this.ctx.typeAhead(event.key));
      }
    }
  }

  protected handleClear(event: Event): void {
    event.stopPropagation();
    this.ctx.clearSelection();
  }

  protected handleClearKey(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      this.ctx.clearSelection();
    }
  }

  private _isPrintable(event: KeyboardEvent): boolean {
    return event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
  }
}
