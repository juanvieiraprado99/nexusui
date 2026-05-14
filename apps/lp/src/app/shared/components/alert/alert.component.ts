import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  TemplateRef,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { mergeClasses } from '../../utils/merge-classes';
import {
  alertDescriptionVariants,
  alertDismissVariants,
  alertIconVariants,
  alertTitleVariants,
  alertVariants,
  type NAlertTypeVariants,
} from './alert.variants';

@Component({
  selector: 'n-alert',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!dismissed()) {
      @if (nIcon() || hasDefaultIcon()) {
        <span [class]="iconClasses()" data-slot="alert-icon" aria-hidden="true">
          @if (nIcon()) {
            <ng-container [ngTemplateOutlet]="nIcon()!" />
          } @else {
            @switch (nType()) {
              @case ('info') {
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4M12 8h.01"/>
                </svg>
              }
              @case ('success') {
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="m9 11 3 3L22 4"/>
                </svg>
              }
              @case ('warning') {
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                  <path d="M12 9v4M12 17h.01"/>
                </svg>
              }
              @case ('destructive') {
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m15 9-6 6M9 9l6 6"/>
                </svg>
              }
            }
          }
        </span>
      }

      <div class="flex-1 min-w-0" [class.pr-6]="nDismissible()">
        @if (nTitle()) {
          <div [class]="titleClasses()" data-slot="alert-title">
            @if (isTemplate(nTitle())) {
              <ng-container [ngTemplateOutlet]="$any(nTitle())" />
            } @else {
              {{ nTitle() }}
            }
          </div>
        }

        @if (nDescription()) {
          <div [class]="descriptionClasses()" data-slot="alert-description">
            @if (isTemplate(nDescription())) {
              <ng-container [ngTemplateOutlet]="$any(nDescription())" />
            } @else {
              {{ nDescription() }}
            }
          </div>
        }
      </div>

      @if (nDismissible()) {
        <button
          type="button"
          [class]="dismissClasses()"
          aria-label="Dismiss"
          data-slot="alert-dismiss"
          (click)="dismiss()"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      }
    }
  `,
  host: {
    role: 'alert',
    '[class]': 'classes()',
    '[attr.data-slot]': '"alert"',
    '[attr.data-type]': 'nType()',
    '[attr.hidden]': 'dismissed() ? true : null',
  },
})
export class AlertComponent implements OnDestroy {
  readonly nClass                = input<string>('');
  readonly nTitle                = input<string | TemplateRef<void>>('');
  readonly nDescription          = input<string | TemplateRef<void>>('');
  readonly nIcon                 = input<TemplateRef<void>>();
  readonly nType                 = input<NAlertTypeVariants>('default');
  readonly nDismissible          = input<boolean>(false);
  readonly nAutoDismissDuration  = input<number>(0);

  readonly nDismiss = output<void>();

  protected readonly dismissed = signal(false);

  private _timer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      const duration = this.nAutoDismissDuration();
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
      if (duration > 0 && !this.dismissed()) {
        this._timer = setTimeout(() => this.dismiss(), duration);
      }
    });
  }

  ngOnDestroy(): void {
    if (this._timer) clearTimeout(this._timer);
  }

  protected dismiss(): void {
    this.dismissed.set(true);
    this.nDismiss.emit();
  }

  protected isTemplate(value: string | TemplateRef<void> | undefined): value is TemplateRef<void> {
    return value instanceof TemplateRef;
  }

  protected readonly hasDefaultIcon = computed(() => this.nType() !== 'default');

  protected readonly classes = computed(() =>
    mergeClasses(alertVariants({ nType: this.nType() }), this.nClass()),
  );

  protected readonly iconClasses = computed(() =>
    alertIconVariants({ nType: this.nType() }),
  );

  protected readonly titleClasses       = computed(() => alertTitleVariants());
  protected readonly descriptionClasses = computed(() => alertDescriptionVariants());
  protected readonly dismissClasses     = computed(() => alertDismissVariants());
}
