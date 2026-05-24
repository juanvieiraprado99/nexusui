import { InjectionToken, type Signal } from '@angular/core';
import type { HsvColor, ColorFormat } from './color-picker.utils';

export type { ColorFormat };

export interface ColorPickerContext {
  readonly hsv:       Signal<HsvColor>;
  readonly format:    Signal<ColorFormat>;
  readonly showAlpha: Signal<boolean>;
  readonly disabled:  Signal<boolean>;
  updateHsv(patch: Partial<HsvColor>): void;
  setHue(h: number): void;
  setSV(s: number, v: number): void;
  setAlpha(a: number): void;
  setFormat(f: ColorFormat): void;
}

export const COLOR_PICKER_CONTEXT = new InjectionToken<ColorPickerContext>('COLOR_PICKER_CONTEXT');
