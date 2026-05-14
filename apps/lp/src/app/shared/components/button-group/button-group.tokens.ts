import { InjectionToken } from '@angular/core';
import type { Signal } from '@angular/core';
import type { ButtonVariants } from '../button/button.variants';

export interface ButtonGroupContext {
  nSize: Signal<ButtonVariants['nSize']>;
  nVariant: Signal<ButtonVariants['nVariant']>;
  nDisabled: Signal<boolean>;
}

export const BUTTON_GROUP_CONTEXT = new InjectionToken<ButtonGroupContext>('ButtonGroupContext');
