import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
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
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'classes()' },
  providers: [{ provide: N_FORM_FIELD_CONTEXT, useExisting: NFormFieldComponent }],
})
export class NFormFieldComponent implements NFormFieldContext {
  readonly nClass = input<string>('');
  readonly nId = input<string>('');
  readonly nInvalid = input(false, { transform: booleanAttribute });
  readonly nRequired = input(false, { transform: booleanAttribute });

  private readonly _staticId = `n-field-${++_fieldIdCounter}`;

  readonly fieldId = computed(() => this.nId() || this._staticId);
  readonly descriptionId = computed(() => `${this.fieldId()}-description`);
  readonly messageId = computed(() => `${this.fieldId()}-message`);
  readonly invalid = computed(() => this.nInvalid());
  readonly required = computed(() => this.nRequired());

  protected readonly classes = computed(() =>
    mergeClasses(formFieldVariants(), this.nClass()),
  );
}

@Component({
  selector: 'label[n-form-label]',
  template: `
    <ng-content />
    @if (required()) {
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

  // Own input OR field context — set state once on n-form-field, or override per-label.
  protected readonly required = computed(() => this.nRequired() || (this._ctx?.required() ?? false));
  protected readonly invalid = computed(() => this.nInvalid() || (this._ctx?.invalid() ?? false));

  protected readonly classes = computed(() =>
    mergeClasses(
      formLabelVariants({ nRequired: this.required(), nInvalid: this.invalid() }),
      this.nClass(),
    ),
  );
}

@Component({
  selector: 'n-form-control, [n-form-control]',
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
