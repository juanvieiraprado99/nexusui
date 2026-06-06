import {
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  inject,
  input,
} from '@angular/core';

/**
 * `nRipple` — efeito de ondulação (Material/shadcn) disparado no clique.
 *
 * Autocontido: a animação usa a Web Animations API (`element.animate`),
 * portanto não depende de nenhum `@keyframes` global — o arquivo funciona
 * sozinho quando copiado para o projeto do usuário via CLI.
 *
 * @example
 * ```html
 * <button n-button nRipple>Click</button>
 * <div nRipple nRippleColor="#3b82f6">Surface</div>
 * ```
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[nRipple]',
  standalone: true,
  host: {
    '(pointerdown)': '_spawn($event)',
  },
})
export class RippleDirective implements OnDestroy {
  /** Cor do ripple. Por padrão herda a cor do texto do host (`currentColor`). */
  readonly nRippleColor = input<string>('currentColor');
  /** Duração da animação em milissegundos. */
  readonly nRippleDuration = input<number>(500);
  /** Desliga o efeito. */
  readonly nRippleDisabled = input<boolean>(false);
  /** Origem sempre no centro do host (ignora o ponto do clique). */
  readonly nRippleCentered = input<boolean>(false);
  /** Não recorta o ripple no limite do host (sem `overflow: hidden`). */
  readonly nRippleUnbounded = input<boolean>(false);

  private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _renderer = inject(Renderer2);

  /** Animações em andamento — canceladas no destroy para evitar callbacks órfãos. */
  private readonly _running = new Set<Animation>();

  protected _spawn(event: PointerEvent): void {
    if (this.nRippleDisabled() || event.button !== 0) return;

    const host = this._host.nativeElement;
    this._prepareHost(host);

    const rect = host.getBoundingClientRect();
    // Diâmetro que cobre o host inteiro a partir da origem (canto mais distante).
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

  /** Garante `position` posicionável e (salvo unbounded) recorte do ripple. */
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
