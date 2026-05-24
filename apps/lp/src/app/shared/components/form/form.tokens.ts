import { InjectionToken, Signal } from '@angular/core';

export interface NFormFieldContext {
  fieldId: Signal<string>;
  descriptionId: Signal<string>;
  messageId: Signal<string>;
}

export const N_FORM_FIELD_CONTEXT = new InjectionToken<NFormFieldContext>('NFormFieldContext');
