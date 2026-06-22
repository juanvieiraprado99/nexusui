import { afterNextRender, computed, Directive, ElementRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

@Directive({
  selector: 'input[nInputGroup], textarea[nInputGroup]',
  standalone: true,
  host: { 'data-slot': 'control' },
})
export class InputGroupControlDirective {
  readonly elementRef = inject<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(ElementRef);
  readonly value = signal('');
  readonly isTextarea = computed(() => this.elementRef.nativeElement.tagName === 'TEXTAREA');

  constructor() {
    const el = this.elementRef.nativeElement;
    // Capture any static/attribute value present at construction time.
    this.value.set(el.value);
    // Capture bound values ([value]/ngModel/formControl) once resolved.
    // afterNextRender runs in the browser only, so it stays SSR-safe.
    afterNextRender(() => this.value.set(el.value));
    fromEvent(el, 'input').pipe(takeUntilDestroyed()).subscribe(() => {
      this.value.set(el.value);
    });
  }
}
