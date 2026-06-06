import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { breadcrumbVariants, type BreadcrumbVariants } from './breadcrumb.variants';

@Component({
  selector: 'n-breadcrumb',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes()',
    'role': 'navigation',
    '[attr.aria-label]': 'nAriaLabel()',
    'data-slot': 'breadcrumb',
  },
})
export class BreadcrumbComponent {
  readonly nSize      = input<BreadcrumbVariants['nSize']>('default');
  readonly nAriaLabel = input<string>('breadcrumb');
  readonly nClass     = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses(breadcrumbVariants({ nSize: this.nSize() }), this.nClass()),
  );
}

@Component({
  selector: 'n-breadcrumb-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes()',
    'role': 'list',
    'data-slot': 'breadcrumb-list',
  },
})
export class BreadcrumbListComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('flex flex-wrap items-center gap-1.5 sm:gap-2.5', this.nClass()),
  );
}

@Component({
  selector: 'n-breadcrumb-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes()',
    'role': 'listitem',
    'data-slot': 'breadcrumb-item',
  },
})
export class BreadcrumbItemComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('inline-flex items-center gap-1.5', this.nClass()),
  );
}

@Component({
  selector: 'n-breadcrumb-link, a[n-breadcrumb-link]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes()',
    '[attr.aria-disabled]': 'nDisabled() ? true : null',
    '[attr.tabindex]': 'nDisabled() ? "-1" : null',
    'data-slot': 'breadcrumb-link',
  },
})
export class BreadcrumbLinkComponent {
  readonly nDisabled = input<boolean>(false);
  readonly nClass    = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses(
      'transition-colors hover:text-foreground',
      this.nDisabled() && 'pointer-events-none opacity-60',
      this.nClass(),
    ),
  );
}

@Component({
  selector: 'n-breadcrumb-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes()',
    '[attr.aria-current]': '"page"',
    '[attr.aria-disabled]': '"true"',
    'data-slot': 'breadcrumb-page',
  },
})
export class BreadcrumbPageComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('font-normal text-foreground', this.nClass()),
  );
}

@Component({
  selector: 'n-breadcrumb-separator',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </ng-content>
  `,
  host: {
    '[class]': 'classes()',
    '[attr.aria-hidden]': '"true"',
    'role': 'presentation',
    'data-slot': 'breadcrumb-separator',
  },
})
export class BreadcrumbSeparatorComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('[&>svg]:size-3.5', this.nClass()),
  );
}

@Component({
  selector: 'n-breadcrumb-ellipsis',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span aria-hidden="true">&#8230;</span>
    <span class="sr-only">{{ nSrLabel() }}</span>
  `,
  host: {
    '[class]': 'classes()',
    'role': 'presentation',
    'data-slot': 'breadcrumb-ellipsis',
  },
})
export class BreadcrumbEllipsisComponent {
  readonly nSrLabel = input<string>('More pages');
  readonly nClass   = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('flex h-9 w-9 items-center justify-center', this.nClass()),
  );
}
