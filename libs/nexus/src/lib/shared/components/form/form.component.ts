import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import {
  formControlVariants,
  formDescriptionVariants,
  formFieldVariants,
  formLabelVariants,
  formMessageVariants,
  type NFormMessageType,
} from './form.variants';
import { N_FORM_FIELD_CONTEXT, type NFormFieldContext } from './form.tokens';

let _fieldIdCounter = 0;

@Component({
  selector: 'n-form-field, [n-form-field]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'classes()' },
  providers: [{ provide: N_FORM_FIELD_CONTEXT, useExisting: NFormFieldComponent }],
})
export class NFormFieldComponent implements NFormFieldContext {
  readonly nClass = input<string>('');

  private readonly _staticId = `n-field-${++_fieldIdCounter}`;

  readonly fieldId = signal(this._staticId);
  readonly descriptionId = computed(() => `${this.fieldId()}-description`);
  readonly messageId = computed(() => `${this.fieldId()}-message`);

  protected readonly classes = computed(() =>
    mergeClasses(formFieldVariants(), this.nClass()),
  );
}

@Component({
  selector: 'label[n-form-label]',
  standalone: true,
  template: `
    <ng-content />
    @if (nRequired()) {
      <span class="ml-0.5 text-destructive" aria-hidden="true">*</span>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.for]': 'forAttr()',
  },
})
export class NFormLabelComponent {
  private readonly _ctx = inject(N_FORM_FIELD_CONTEXT, { optional: true });

  readonly nClass = input<string>('');
  readonly nFor = input<string>('');
  readonly nRequired = input(false, { transform: booleanAttribute });
  readonly nInvalid = input(false, { transform: booleanAttribute });

  protected readonly forAttr = computed(() => this.nFor() || this._ctx?.fieldId() || null);

  protected readonly classes = computed(() =>
    mergeClasses(
      formLabelVariants({ nRequired: this.nRequired(), nInvalid: this.nInvalid() }),
      this.nClass(),
    ),
  );
}

@Component({
  selector: 'n-form-control, [n-form-control]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    'data-slot': 'control-wrapper',
  },
})
export class NFormControlComponent {
  private readonly _ctx = inject(N_FORM_FIELD_CONTEXT, { optional: true });

  readonly nClass = input<string>('');

  readonly fieldId = computed(() => this._ctx?.fieldId() ?? '');
  readonly descriptionId = computed(() => this._ctx?.descriptionId() ?? '');
  readonly messageId = computed(() => this._ctx?.messageId() ?? '');

  protected readonly classes = computed(() =>
    mergeClasses(formControlVariants(), this.nClass()),
  );
}

@Component({
  selector: 'n-form-description, [n-form-description]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.id]': 'descId()',
    'data-slot': 'description',
  },
})
export class NFormDescriptionComponent {
  private readonly _ctx = inject(N_FORM_FIELD_CONTEXT, { optional: true });

  readonly nClass = input<string>('');
  readonly nId = input<string>('');

  protected readonly descId = computed(() => this.nId() || this._ctx?.descriptionId() || null);

  protected readonly classes = computed(() =>
    mergeClasses(formDescriptionVariants(), this.nClass()),
  );
}

@Component({
  selector: 'n-form-message, [n-form-message]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.id]': 'msgId()',
    '[attr.role]': 'roleAttr()',
    'data-slot': 'message',
  },
})
export class NFormMessageComponent {
  private readonly _ctx = inject(N_FORM_FIELD_CONTEXT, { optional: true });

  readonly nClass = input<string>('');
  readonly nType = input<NFormMessageType>('default');
  readonly nId = input<string>('');

  protected readonly msgId = computed(() => this.nId() || this._ctx?.messageId() || null);
  protected readonly roleAttr = computed(() => this.nType() === 'error' ? 'alert' : null);

  protected readonly classes = computed(() =>
    mergeClasses(formMessageVariants({ nType: this.nType() }), this.nClass()),
  );
}
