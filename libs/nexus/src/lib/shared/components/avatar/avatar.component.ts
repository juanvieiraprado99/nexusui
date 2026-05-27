import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { mergeClasses } from '../../utils/merge-classes';
import { ImageComponent } from '../image/image.component';
import { avatarVariants, SIZE_PX, type AvatarVariants } from './avatar.variants';
import { STATUS_COLOR, STATUS_LABEL, type AvatarStatus } from './avatar.status';

@Component({
  selector: 'n-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImageComponent, NgTemplateOutlet],
  template: `
    <span class="absolute inset-0 overflow-hidden rounded-[inherit]">
      @if (nSrc()) {
        <n-image
          [nSrc]="nSrc()"
          nAlt=""
          nFit="cover"
          [nFill]="true"
          [nSkeleton]="false"
          nClass="size-full"
        >
          <ng-container nImageFallback>
            <ng-container *ngTemplateOutlet="fallback" />
          </ng-container>
        </n-image>
      } @else {
        <ng-container *ngTemplateOutlet="fallback" />
      }
    </span>

    @if (nStatus()) {
      <span
        class="absolute right-0 bottom-0 rounded-full ring-2 ring-background"
        [style.width]="statusDotSize()"
        [style.height]="statusDotSize()"
        [style.background-color]="statusColorValue()"
        role="img"
        [attr.aria-label]="statusLabelValue()"
      ></span>
    }

    <ng-content />

    <ng-template #fallback>
      <span
        data-slot="fallback"
        class="flex size-full items-center justify-center font-medium select-none"
        [style.background]="fallbackBg()"
        [style.color]="fallbackText()"
        [style.font-size]="fallbackFontSize()"
        aria-hidden="true"
      >{{ initials() || defaultIcon }}</span>
    </ng-template>
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
  readonly nStatus    = input<AvatarStatus | null>(null);
  readonly nClass     = input<string>('');
  readonly nAriaLabel = input<string>('');

  protected readonly defaultIcon = '?';

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

  private readonly fallbackHue = computed(() => {
    const name = this.nName() || '?';
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 360;
  });

  protected readonly fallbackBg = computed(() => `hsl(${this.fallbackHue()}, 55%, 45%)`);

  // Texto branco ou preto conforme luminância da cor gerada — hues claros (amarelo)
  // não têm contraste suficiente contra branco em L=45%.
  protected readonly fallbackText = computed(() =>
    luminance(this.fallbackHue(), 0.55, 0.45) > 0.45 ? '#000' : '#fff',
  );

  protected readonly fallbackFontSize = computed(() => {
    const px = this.sizePixels();
    return `${Math.round(px * 0.38)}px`;
  });

  protected readonly statusDotSize = computed(() => {
    const px = this.sizePixels();
    return `${Math.max(8, Math.round(px * 0.28))}px`;
  });

  protected readonly statusColorValue = computed(() => {
    const s = this.nStatus();
    return s ? STATUS_COLOR[s] : '';
  });

  protected readonly statusLabelValue = computed(() => {
    const s = this.nStatus();
    return s ? STATUS_LABEL[s] : '';
  });

  protected readonly ariaLabel = computed(() =>
    this.nAriaLabel() || (this.nName() ? `Avatar de ${this.nName()}` : 'Avatar'),
  );
}

function luminance(h: number, s: number, l: number): number {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (hp < 1)      [r, g, b] = [c, x, 0];
  else if (hp < 2) [r, g, b] = [x, c, 0];
  else if (hp < 3) [r, g, b] = [0, c, x];
  else if (hp < 4) [r, g, b] = [0, x, c];
  else if (hp < 5) [r, g, b] = [x, 0, c];
  else             [r, g, b] = [c, 0, x];
  return 0.2126 * (r + m) + 0.7152 * (g + m) + 0.0722 * (b + m);
}
