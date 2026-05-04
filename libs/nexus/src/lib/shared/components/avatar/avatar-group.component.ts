import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { AvatarComponent } from './avatar.component';
import { type AvatarVariants, SIZE_PX } from './avatar.variants';
import { mergeClasses } from '../../utils/merge-classes';

export type AvatarGroupItem = {
  src?:    string;
  name?:   string;
  status?: 'online' | 'offline' | 'away' | 'busy';
};

type AvatarStatus = NonNullable<AvatarGroupItem['status']>;

const STATUS_COLOR: Record<AvatarStatus, string> = {
  online:  '#22c55e',
  offline: '#a1a1aa',
  away:    '#fbbf24',
  busy:    '#ef4444',
};

const STATUS_LABEL: Record<AvatarStatus, string> = {
  online:  'Online',
  offline: 'Offline',
  away:    'Ausente',
  busy:    'Ocupado',
};

const SHAPE_CLASSES: Record<NonNullable<AvatarVariants['nShape']>, string> = {
  circle: 'rounded-full',
  square: 'rounded-md',
};

const SIZE_CLASSES: Record<NonNullable<AvatarVariants['nSize']>, string> = {
  xs:      'size-6',
  sm:      'size-8',
  default: 'size-10',
  lg:      'size-12',
  xl:      'size-16',
};

@Component({
  selector: 'n-avatar-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent],
  template: `
    @for (item of visibleItems(); track $index) {
      <n-avatar
        [nSrc]="item.src ?? ''"
        [nName]="item.name ?? ''"
        [nSize]="nSize()"
        [nShape]="nShape()"
        class="-ml-2 ring-2 ring-background first:ml-0 transition-all duration-200 hover:-translate-y-1 hover:z-10"
      >
        @if (item.status) {
          <span
            class="absolute right-0 bottom-0 rounded-full ring-2 ring-background"
            [style.width]="badgeDotSize()"
            [style.height]="badgeDotSize()"
            [style.background-color]="statusColor(item.status)"
            role="img"
            [attr.aria-label]="statusLabel(item.status)"
          ></span>
        }
      </n-avatar>
    }
    @if (overflowCount() > 0) {
      <div
        class="-ml-2 inline-flex shrink-0 items-center justify-center bg-muted text-muted-foreground font-medium ring-2 ring-background select-none transition-all duration-200 hover:-translate-y-1 hover:z-10"
        [class]="overflowClasses()"
        [style.font-size]="overflowFontSize()"
        role="img"
        [attr.aria-label]="'+' + overflowCount() + ' outros'"
      >+{{ overflowCount() }}</div>
    }
  `,
  host: {
    '[class]':           'classes()',
    '[attr.role]':       '"group"',
    '[attr.aria-label]': 'nAriaLabel()',
  },
})
export class AvatarGroupComponent {
  readonly nItems     = input<AvatarGroupItem[]>([]);
  readonly nMax       = input<number>(5);
  readonly nSize      = input<AvatarVariants['nSize']>('default');
  readonly nShape     = input<AvatarVariants['nShape']>('circle');
  readonly nClass     = input<string>('');
  readonly nAriaLabel = input<string>('Grupo de avatares');

  protected readonly classes = computed(() =>
    mergeClasses('flex items-center', this.nClass()),
  );

  protected readonly visibleItems = computed(() =>
    this.nItems().slice(0, this.nMax()),
  );

  protected readonly overflowCount = computed(() =>
    Math.max(0, this.nItems().length - this.nMax()),
  );

  protected readonly overflowClasses = computed(() =>
    mergeClasses(
      SIZE_CLASSES[this.nSize() ?? 'default'],
      SHAPE_CLASSES[this.nShape() ?? 'circle'],
    ),
  );

  protected readonly overflowFontSize = computed(() => {
    const px = SIZE_PX[this.nSize() ?? 'default'];
    return `${Math.round(px * 0.32)}px`;
  });

  protected readonly badgeDotSize = computed(() => {
    const px = SIZE_PX[this.nSize() ?? 'default'];
    return `${Math.max(8, Math.round(px * 0.28))}px`;
  });

  protected statusColor(status: AvatarStatus): string {
    return STATUS_COLOR[status];
  }

  protected statusLabel(status: AvatarStatus): string {
    return STATUS_LABEL[status];
  }
}
