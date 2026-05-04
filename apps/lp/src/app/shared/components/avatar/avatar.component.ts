import { Component, ChangeDetectionStrategy, input, computed, linkedSignal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { mergeClasses } from '../../utils/merge-classes';
import { avatarVariants, SIZE_PX, type AvatarVariants } from './avatar.variants';

@Component({
  selector: 'n-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  template: `
    <span class="absolute inset-0 overflow-hidden rounded-[inherit]">
      @if (nSrc() && !imageError()) {
        <img
          [ngSrc]="nSrc()"
          [width]="sizePixels()"
          [height]="sizePixels()"
          alt=""
          class="aspect-square size-full object-cover"
          (error)="imageError.set(true)"
        />
      } @else {
        <span
          data-slot="fallback"
          class="flex size-full items-center justify-center font-medium text-white select-none"
          [style.background]="fallbackBg()"
          [style.font-size]="fallbackFontSize()"
          aria-hidden="true"
        >{{ initials() || defaultIcon }}</span>
      }
    </span>

    <ng-content />
  `,
  host: {
    '[class]':           'classes()',
    '[attr.role]':       '"img"',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class AvatarComponent {
  readonly nSrc       = input<string>('');
  readonly nName      = input<string>('');
  readonly nSize      = input<AvatarVariants['nSize']>('default');
  readonly nShape     = input<AvatarVariants['nShape']>('circle');
  readonly nClass     = input<string>('');
  readonly nAriaLabel = input<string>('');

  protected readonly defaultIcon = '?';

  protected readonly imageError = linkedSignal<boolean>(() => {
    void this.nSrc();
    return false;
  });

  protected readonly classes = computed(() =>
    mergeClasses(
      avatarVariants({ nSize: this.nSize(), nShape: this.nShape() }),
      this.nClass(),
    ),
  );

  protected readonly sizePixels = computed(() =>
    SIZE_PX[this.nSize() ?? 'default'],
  );

  protected readonly initials = computed(() => {
    const name = this.nName().trim();
    if (!name) return '';
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  });

  protected readonly fallbackBg = computed(() => {
    const name = this.nName() || '?';
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 55%, 45%)`;
  });

  protected readonly fallbackFontSize = computed(() => {
    const px = this.sizePixels();
    return `${Math.round(px * 0.38)}px`;
  });

  protected readonly ariaLabel = computed(() =>
    this.nAriaLabel() || (this.nName() ? `Avatar de ${this.nName()}` : 'Avatar'),
  );
}
