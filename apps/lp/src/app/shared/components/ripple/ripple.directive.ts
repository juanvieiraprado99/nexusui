import {
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  inject,
  input,
} from '@angular/core';

/**
 * `nRipple` — Material/shadcn-style ripple effect triggered on click.
 *
 * Self-contained: the animation uses the Web Animations API (`element.animate`),
 * so it has no dependency on any global `@keyframes` — the file works on its own
 * once copied into your project via the CLI.
 *
 * @example
 * ```html
 * <button n-button nRipple>Click</button>
 * <div nRipple nRippleColor="#3b82f6">Surface</div>
 * ```
 */
@Directive({
  selector: '[nRipple]',
  host: {
    '(pointerdown)': '_spawn($event)',
  },
})
export class RippleDirective implements OnDestroy {
  /** Ripple color. Defaults to the host's text color (`currentColor`). */
  readonly nRippleColor = input<string>('currentColor');
  /** Animation duration in milliseconds. */
  readonly nRippleDuration = input<number>(500);
  /** Disables the effect. */
  readonly nRippleDisabled = input<boolean>(false);
  /** Always originate from the host center (ignores the click point). */
  readonly nRippleCentered = input<boolean>(false);
  /** Do not clip the ripple at the host bounds (no `overflow: hidden`). */
  readonly nRippleUnbounded = input<boolean>(false);

  private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _renderer = inject(Renderer2);

  /** In-flight animations — cancelled on destroy to avoid orphan callbacks. */
  private readonly _running = new Set<Animation>();

  protected _spawn(event: PointerEvent): void {
    if (this.nRippleDisabled() || event.button !== 0) return;

    const host = this._host.nativeElement;
    this._prepareHost(host);

    const rect = host.getBoundingClientRect();
    // Diameter that covers the whole host from the origin (farthest corner).
    const diameter = Math.max(rect.width, rect.height) * 2;
    const radius = diameter / 2;

    const originX = this.nRippleCentered() ? rect.width / 2 : event.clientX - rect.left;
    const originY = this.nRippleCentered() ? rect.height / 2 : event.clientY - rect.top;

    const ripple = this._renderer.createElement('span') as HTMLElement;
    this._renderer.setAttribute(ripple, 'data-slot', 'ripple');
    this._renderer.setAttribute(ripple, 'aria-hidden', 'true');

    const styles: Record<string, string> = {
      position: 'absolute',
      top: `${originY - radius}px`,
      left: `${originX - radius}px`,
      width: `${diameter}px`,
      height: `${diameter}px`,
      'border-radius': '50%',
      'background-color': this.nRippleColor(),
      'pointer-events': 'none',
      transform: 'scale(0)',
      opacity: '0.35',
    };
    for (const [prop, value] of Object.entries(styles)) {
      this._renderer.setStyle(ripple, prop, value);
    }

    this._renderer.appendChild(host, ripple);

    const animation = ripple.animate(
      [
        { transform: 'scale(0)', opacity: 0.35 },
        { transform: 'scale(1)', opacity: 0 },
      ],
      { duration: this.nRippleDuration(), easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    );

    this._running.add(animation);
    animation.onfinish = () => {
      this._running.delete(animation);
      this._renderer.removeChild(host, ripple);
    };
  }

  /** Ensure positionable host and (unless unbounded) ripple clipping. */
  private _prepareHost(host: HTMLElement): void {
    const computed = getComputedStyle(host);
    if (computed.position === 'static') {
      this._renderer.setStyle(host, 'position', 'relative');
    }
    if (!this.nRippleUnbounded() && computed.overflow !== 'hidden') {
      this._renderer.setStyle(host, 'overflow', 'hidden');
    }
  }

  ngOnDestroy(): void {
    for (const animation of this._running) {
      animation.cancel();
    }
    this._running.clear();
  }
}
