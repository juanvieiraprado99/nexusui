import { computed, Directive, ElementRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

@Directive({
  selector: 'input[nInputGroup], textarea[nInputGroup]',
  standalone: true,
  host: { 'data-slot': 'control' },
})
export class InputGroupControlDirective {
  readonly elementRef = inject<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(ElementRef);
  readonly size = signal<'sm' | 'default' | 'lg'>('default');
  readonly disabled = signal(false);
  readonly value = signal('');
  readonly isTextarea = computed(() => this.elementRef.nativeElement.tagName === 'TEXTAREA');

  constructor() {
    const el = this.elementRef.nativeElement;
    fromEvent(el, 'input').pipe(takeUntilDestroyed()).subscribe(() => {
      this.value.set(el.value);
    });
  }
}
