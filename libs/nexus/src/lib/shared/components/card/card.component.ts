import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { cardVariants, type CardVariants } from './card.variants';

// ── CardComponent ─────────────────────────────────────────────────────────────

@Component({
  selector: 'n-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content />
    @if (nLoading()) {
      <div
        class="absolute inset-0 rounded-[inherit] pointer-events-none animate-pulse bg-foreground/5 flex items-center justify-center"
        aria-hidden="true"
        data-slot="loading-overlay"
      >
        <svg class="size-5 animate-spin text-muted-foreground" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"></path>
        </svg>
      </div>
      <span class="sr-only">Loading</span>
    }
  `,
  // a11y: nClickable torna o card inteiro role="button". NÃO combine nClickable com
  // controles interativos internos (botões, links, inputs) — botão dentro de role="button"
  // é nesting inválido. Use card estático com botões no footer, OU card clickable sem controles.
  host: {
    '[class]': 'classes()',
    '[attr.role]':      'nClickable() ? "button" : null',
    '[attr.tabindex]':  'nClickable() ? "0" : null',
    '[attr.aria-busy]': 'nLoading() ? true : null',
    '(click)':          'handleClick($event)',
    '(keydown.enter)':  'handleKey($event)',
    '(keydown.space)':  'handleKey($event)',
  },
})
export class CardComponent {
  readonly nVariant   = input<CardVariants['nVariant']>('default');
  readonly nSize      = input<CardVariants['nSize']>('default');
  readonly nClass     = input<string>('');
  readonly nClickable = input<boolean>(false);
  readonly nLoading   = input<boolean>(false);
  readonly nSelected  = input<boolean>(false);

  readonly nClick = output<MouseEvent | KeyboardEvent>();

  protected readonly classes = computed(() =>
    mergeClasses(
      cardVariants({ nVariant: this.nVariant(), nSize: this.nSize() }),
      this.nClickable() && [
        'cursor-pointer select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'hover:shadow-md active:scale-[0.99]',
      ],
      this.nSelected() && 'ring-2 ring-primary ring-offset-2',
      this.nLoading() && 'relative overflow-hidden',
      this.nClass(),
    ),
  );

  protected handleClick(event: MouseEvent): void {
    if (!this.nClickable()) return;
    this.nClick.emit(event);
  }

  protected handleKey(event: Event): void {
    if (!this.nClickable()) return;
    event.preventDefault();
    this.nClick.emit(event as KeyboardEvent);
  }
}

// ── CardHeaderComponent ───────────────────────────────────────────────────────

@Component({
  selector: 'n-card-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    '[class]':    'classes()',
    'data-slot':  'card-header',
  },
})
export class CardHeaderComponent {
  readonly nClass = input<string>('');
  protected readonly classes = computed(() =>
    mergeClasses('flex flex-col gap-1.5 pb-4', this.nClass()),
  );
}

// ── CardTitleComponent ────────────────────────────────────────────────────────

@Component({
  selector: 'n-card-title',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    '[class]':    'classes()',
    'data-slot':  'card-title',
    role:         'heading',
    'aria-level': '3',
  },
})
export class CardTitleComponent {
  readonly nClass = input<string>('');
  protected readonly classes = computed(() =>
    mergeClasses('block text-lg font-semibold leading-none tracking-tight', this.nClass()),
  );
}

// ── CardDescriptionComponent ──────────────────────────────────────────────────

@Component({
  selector: 'n-card-description',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    '[class]':   'classes()',
    'data-slot': 'card-description',
  },
})
export class CardDescriptionComponent {
  readonly nClass = input<string>('');
  protected readonly classes = computed(() =>
    mergeClasses('block text-sm text-muted-foreground', this.nClass()),
  );
}

// ── CardContentComponent ──────────────────────────────────────────────────────

@Component({
  selector: 'n-card-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    '[class]':   'classes()',
    'data-slot': 'card-content',
  },
})
export class CardContentComponent {
  readonly nClass = input<string>('');
  protected readonly classes = computed(() => mergeClasses('block', this.nClass()));
}

// ── CardFooterComponent ───────────────────────────────────────────────────────

@Component({
  selector: 'n-card-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    '[class]':   'classes()',
    'data-slot': 'card-footer',
  },
})
export class CardFooterComponent {
  readonly nClass = input<string>('');
  protected readonly classes = computed(() =>
    mergeClasses('flex items-center gap-2 pt-4', this.nClass()),
  );
}
