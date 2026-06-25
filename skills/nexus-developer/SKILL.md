---
name: nexus-developer
description: Build and use nexus-ui components in Angular 21. Activate when creating components in libs/nexus, adding components via @nexuslabs/cli, or when the user mentions nexus-ui, n-button, n-input, or any n- prefixed selector.
license: MIT
metadata:
  author: Juan Prado <juanprado99@gmail.com>
  version: '1.0.0'
  homepage: https://github.com/juanvieiraprado99/nexusui
---

# nexus-developer

nexus-ui is a shadcn/ui-style component library for Angular 21. Components are **copied into the user's project** via `npx @nexuslabs/cli@alpha add <name>` — they become the user's own code, not a package dependency.

## Installing components (consumer)

```bash
# One-time setup in a new Angular project
npx @nexuslabs/cli@alpha init

# Add a single component (resolves registryDependencies recursively)
npx @nexuslabs/cli@alpha add button

# Add all registered components
npx @nexuslabs/cli@alpha add --all
```

After `add`, import directly from your configured alias (e.g. `@/components/ui/button`).

---

## Component usage examples

### Primitives

```html
<!-- button -->
<n-button>Click me</n-button>
<n-button nVariant="destructive" nSize="sm">Delete</n-button>
<n-button nVariant="outline" [nLoading]="saving">Save</n-button>
<n-button nVariant="ghost" nDisabled>Disabled</n-button>
<!-- variants: default | destructive | outline | secondary | ghost | link -->
<!-- sizes: default | sm | lg | icon -->

<!-- badge -->
<n-badge>Default</n-badge>
<n-badge nVariant="secondary">Beta</n-badge>
<n-badge nVariant="destructive">Error</n-badge>
<!-- variants: default | secondary | destructive | outline -->

<!-- card -->
<n-card>
  <n-card-header>
    <n-card-title>Title</n-card-title>
    <n-card-description>Description</n-card-description>
  </n-card-header>
  <n-card-content>Body content</n-card-content>
  <n-card-footer>Footer</n-card-footer>
</n-card>

<!-- avatar -->
<n-avatar nSrc="/avatar.png" nAlt="John Doe" nFallback="JD" />

<!-- separator -->
<n-separator />
<n-separator nOrientation="vertical" />

<!-- skeleton -->
<n-skeleton class="h-4 w-48" />

<!-- label -->
<n-label nFor="my-input">Email</n-label>
```

### Form components

```html
<!-- input -->
<n-input [(nValue)]="email" nLabel="Email" nPlaceholder="you@example.com" />
<n-input nType="password" nLabel="Password" nRequired />
<n-input nError="Invalid email" nHint="We'll never share your email" />
<n-input nReadonly nValue="Read only value" nLabel="Username" />
<!-- sizes: default | sm | lg -->

<!-- textarea -->
<n-textarea [(nValue)]="bio" nLabel="Bio" nPlaceholder="Tell us about yourself" />
<n-textarea nCharCount nMaxLength="200" nAutoResize />

<!-- select -->
<n-select [(nValue)]="fruit">
  <n-select-trigger nPlaceholder="Select a fruit" />
  <n-select-content>
    <n-select-item nValue="apple" nLabel="Apple" />
    <n-select-item nValue="banana" nLabel="Banana" />
    <n-select-item nValue="cherry" nLabel="Cherry" />
  </n-select-content>
</n-select>

<!-- checkbox -->
<n-checkbox [(nChecked)]="accepted" nLabel="Accept terms and conditions" />
<n-checkbox [(nChecked)]="opt" nLabel="Marketing emails" nDisabled />

<!-- radio -->
<n-radio-group [(nValue)]="plan" nLabel="Plan">
  <n-radio nValue="free" nLabel="Free" />
  <n-radio nValue="pro" nLabel="Pro" />
  <n-radio nValue="enterprise" nLabel="Enterprise" />
</n-radio-group>

<!-- switch -->
<n-switch [(nChecked)]="notifications" nLabel="Push notifications" />
<!-- sizes: sm | default | lg -->

<!-- slider -->
<n-slider [(nValue)]="volume" nLabel="Volume" nMin="0" nMax="100" nStep="1" />

<!-- combobox (searchable select) -->
<n-combobox
  [(nValue)]="country"
  nLabel="Country"
  nPlaceholder="Select country"
  [nOptions]="countryOptions"
/>
<!-- nOptions: { value: string, label: string }[] -->

<!-- datepicker -->
<n-datepicker [(nValue)]="birthDate" nLabel="Birth date" />
<n-datepicker nShowTime nLabel="Event date & time" />

<!-- input-otp -->
<n-input-otp [(nValue)]="code" nLength="6" nLabel="Verification code" />

<!-- color-picker -->
<n-color-picker [(nValue)]="color" nLabel="Brand color" />

<!-- signature -->
<n-signature [(nValue)]="sig" nLabel="Sign here" />

<!-- Using with Angular Reactive Forms -->
<form [formGroup]="form">
  <n-input formControlName="email" nLabel="Email" />
  <n-checkbox formControlName="terms" nLabel="Accept terms" />
  <n-select formControlName="role">
    <n-select-trigger nPlaceholder="Select role" />
    <n-select-content>
      <n-select-item nValue="admin" nLabel="Admin" />
      <n-select-item nValue="user" nLabel="User" />
    </n-select-content>
  </n-select>
</form>
```

### Overlays

```html
<!-- dialog -->
<n-dialog [(nOpen)]="dialogOpen">
  <button n-button n-dialog-trigger>Open dialog</button>
  <n-dialog-content>
    <n-dialog-header nTitle="Edit profile" nDescription="Make changes to your profile." />
    <div class="py-4"><!-- form fields --></div>
    <n-dialog-footer>
      <button n-button nVariant="outline" n-dialog-close>Cancel</button>
      <button n-button (click)="save()">Save</button>
    </n-dialog-footer>
  </n-dialog-content>
</n-dialog>

<!-- popover -->
<n-popover>
  <button n-button nVariant="outline" n-popover-trigger>Open popover</button>
  <n-popover-content class="w-80">
    <p>Popover content here</p>
  </n-popover-content>
</n-popover>

<!-- tooltip -->
<n-tooltip nContent="This is a tooltip">
  <button n-button nVariant="ghost">Hover me</button>
</n-tooltip>
<!-- sides: top | right | bottom | left -->

<!-- dropdown-menu -->
<n-dropdown-menu>
  <button n-button nVariant="outline" n-dropdown-menu-trigger>Options</button>
  <n-dropdown-menu-content>
    <n-dropdown-menu-item>Edit</n-dropdown-menu-item>
    <n-dropdown-menu-item>Duplicate</n-dropdown-menu-item>
    <n-dropdown-menu-separator />
    <n-dropdown-menu-item nVariant="destructive">Delete</n-dropdown-menu-item>
  </n-dropdown-menu-content>
</n-dropdown-menu>

<!-- context-menu -->
<n-context-menu>
  <n-context-menu-trigger>
    <div class="...">Right-click me</div>
  </n-context-menu-trigger>
  <n-context-menu-content>
    <n-context-menu-item>Open</n-context-menu-item>
    <n-context-menu-item>Copy link</n-context-menu-item>
  </n-context-menu-content>
</n-context-menu>

<!-- drawer -->
<n-drawer [(nOpen)]="drawerOpen" nSide="right">
  <button n-button n-drawer-trigger>Open drawer</button>
  <n-drawer-content>
    <n-drawer-header nTitle="Settings" />
    <div class="p-4"><!-- content --></div>
  </n-drawer-content>
</n-drawer>

<!-- collapsible -->
<n-collapsible [(nOpen)]="collapsed">
  <n-collapsible-trigger>Toggle</n-collapsible-trigger>
  <n-collapsible-content>Hidden content</n-collapsible-content>
</n-collapsible>
```

### Data display

```html
<!-- tabs -->
<n-tabs [(nValue)]="activeTab" nDefaultValue="account">
  <n-tabs-list>
    <n-tabs-trigger nValue="account">Account</n-tabs-trigger>
    <n-tabs-trigger nValue="password">Password</n-tabs-trigger>
  </n-tabs-list>
  <n-tabs-content nValue="account">Account settings</n-tabs-content>
  <n-tabs-content nValue="password">Password settings</n-tabs-content>
</n-tabs>
<!-- variants: default | underline | pills -->

<!-- accordion -->
<n-accordion>
  <n-accordion-item nValue="item-1">
    <n-accordion-trigger>What is nexus-ui?</n-accordion-trigger>
    <n-accordion-content>A shadcn/ui-style Angular component library.</n-accordion-content>
  </n-accordion-item>
  <n-accordion-item nValue="item-2">
    <n-accordion-trigger>How do I install it?</n-accordion-trigger>
    <n-accordion-content>Run npx @nexuslabs/cli@alpha add [component].</n-accordion-content>
  </n-accordion-item>
</n-accordion>

<!-- data-table -->
<n-data-table [nData]="users" [nColumns]="columns" nPageSize="10" />

<!-- table (static) -->
<n-table>
  <n-table-header>
    <n-table-row>
      <n-table-head>Name</n-table-head>
      <n-table-head>Status</n-table-head>
    </n-table-row>
  </n-table-header>
  <n-table-body>
    <n-table-row>
      <n-table-cell>John</n-table-cell>
      <n-table-cell>Active</n-table-cell>
    </n-table-row>
  </n-table-body>
</n-table>

<!-- pagination -->
<n-pagination [(nPage)]="currentPage" [nTotal]="totalItems" [nPageSize]="10" />

<!-- calendar -->
<n-calendar [(nValue)]="selectedDate" />

<!-- progress-bar -->
<n-progress-bar [nValue]="uploadProgress" nMax="100" />
```

### Navigation

```html
<!-- breadcrumb -->
<n-breadcrumb>
  <n-breadcrumb-list>
    <n-breadcrumb-item>
      <n-breadcrumb-link nHref="/">Home</n-breadcrumb-link>
    </n-breadcrumb-item>
    <n-breadcrumb-separator />
    <n-breadcrumb-item>
      <n-breadcrumb-link nHref="/docs">Docs</n-breadcrumb-link>
    </n-breadcrumb-item>
    <n-breadcrumb-separator />
    <n-breadcrumb-item>
      <n-breadcrumb-page>Components</n-breadcrumb-page>
    </n-breadcrumb-item>
  </n-breadcrumb-list>
</n-breadcrumb>

<!-- sidebar -->
<n-sidebar [(nOpen)]="sidebarOpen" nSide="left" nVariant="inset">
  <n-sidebar-content>
    <!-- nav items -->
  </n-sidebar-content>
</n-sidebar>
```

### Feedback

```html
<!-- alert -->
<n-alert nVariant="destructive" nTitle="Error" nDescription="Your session has expired." />
<n-alert nVariant="default" nTitle="Heads up!" nDescription="New features available." />
<!-- variants: default | destructive -->

<!-- sonner (toast notifications) -->
<!-- In component: inject Toaster, call toast() -->
<!-- In app template: <ngx-sonner-toaster /> -->
```

---

## Authoring new components

> Full authoring guide: [references/component-authoring.md](references/component-authoring.md)

### Directory structure

```
libs/nexus/src/lib/shared/components/{name}/
├── {name}.component.ts     # class + template + host bindings
├── {name}.variants.ts      # CVA (only when ≥2 variant keys)
├── index.ts                # public re-export
├── demo/
│   ├── default.ts          # one file per variation, standalone
│   └── disabled.ts
└── doc/
    ├── overview.md
    └── api.md
```

### Mandatory decorators

```ts
@Component({
  selector: 'n-{name}',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // NEVER ViewEncapsulation.None (only exception: sonner, documented inline)
  template: `...`,
  host: { '[class]': 'classes()' },
})
```

### Naming conventions

| Item | Convention |
|---|---|
| Tag selector | `n-{name}` |
| Attribute selector | `{tag}[n-{name}]` (e.g. `button[n-button]`) |
| Inputs | `n` prefix camelCase: `nVariant`, `nSize`, `nDisabled` |
| Outputs | `n` prefix camelCase: `nClick`, `nChange`, `nBlur` |
| Two-way (`model()`) | `n` prefix: `nValue`, `nChecked`, `nOpen` |

### CVA variants pattern

Create `{name}.variants.ts` **only if** the component has ≥2 variant keys:

```ts
import { cva, type VariantProps } from 'class-variance-authority';

export const fooVariants = cva('base-classes', {
  variants: {
    nVariant: { default: '...', destructive: '...' },
    nSize:    { sm: '...', default: '...', lg: '...' },
  },
  defaultVariants: { nVariant: 'default', nSize: 'default' },
});

export type FooVariants = VariantProps<typeof fooVariants>;
```

In the component:

```ts
import { fooVariants, type FooVariants } from './foo.variants';
import { mergeClasses } from '../../utils/merge-classes';

readonly nVariant = input<FooVariants['nVariant']>('default');
readonly nSize    = input<FooVariants['nSize']>('default');
readonly nClass   = input<string>('');

protected readonly classes = computed(() =>
  mergeClasses(fooVariants({ nVariant: this.nVariant(), nSize: this.nSize() }), this.nClass()),
);
```

### Host bindings

Apply computed class directly on host — no extra wrapper div:

```ts
host: {
  '[class]': 'classes()',
  '[attr.aria-busy]': 'nLoading()',
  '[attr.aria-disabled]': 'isDisabled() || nLoading() ? true : null',
  '(click)': 'handleClick($event)',
}
```

For composite components where the host is just a mount point, use `host: { class: 'contents' }`.

### Stable IDs

```ts
let _idCounter = 0;

export class FooComponent {
  private readonly _staticId = `n-foo-${++_idCounter}`;
  readonly nId = input<string>('');
  protected readonly elementId  = computed(() => this.nId() || this._staticId);
  protected readonly errorId    = computed(() => `${this.elementId()}-error`);
  protected readonly hintId     = computed(() => `${this.elementId()}-hint`);
}
```

### Form controls — `injectFormControl`

Every component that enters a form must use `injectFormControl` instead of manual `NgControl`:

```ts
import { ControlValueAccessor } from '@angular/forms';
import { injectFormControl } from '../../utils/form-control';

export class FooComponent implements ControlValueAccessor {
  private readonly _form = injectFormControl<string>(this);

  protected readonly isDisabled = computed(
    () => this.nDisabled() || this._form.disabledByForm(),
  );
  protected readonly hasError = computed(
    () => !!this.nError() || (this._form.controlInvalid() && this._form.controlTouched()),
  );

  protected handleInput(value: string): void {
    this.nValue.set(value);
    this._form.notifyChange(value);
    this.nChange.emit(value);
  }

  protected handleBlur(e: FocusEvent): void {
    this._form.notifyTouched();
    this.nBlur.emit(e);
  }

  writeValue(v: string | null | undefined)   { this.nValue.set(v ?? ''); }
  registerOnChange(fn: (v: string) => void)  { this._form.setOnChange(fn); }
  registerOnTouched(fn: () => void)          { this._form.setOnTouched(fn); }
  setDisabledState(disabled: boolean)        { this._form.setDisabledByForm(disabled); }
}
```

Every form component **must** expose: `nLabel`, `nError`, `nHint`, `nRequired`, `nAriaLabel`. Text controls also expose `nReadonly`.

### `data-slot` — canonical list

Mark internal template parts with `data-slot` so users can target them with Tailwind:

| Slot | When |
|---|---|
| `root` | Outermost div in template |
| `label` | `<label>` element |
| `control-wrapper` | Wraps control + icons |
| `control` | Native `input`, `textarea`, `select` |
| `error` | Error message (`role="alert"`) |
| `hint` | Hint text (shown when no error) |
| `icon-leading` | Left icon |
| `icon-trailing` | Right icon / spinner |
| `trigger` | Button/element that opens overlay |
| `content` | Overlay panel |
| `list` | Scrollable item container |
| `item` | List item (option, menu item) |
| `description` | Long description (cards, modals) |
| `search` | Search input in overlay |

```html
<!-- Usage by consumers -->
<n-input nClass="[&_[data-slot=control]]:bg-yellow-50" />
```

### ARIA checklist

**Buttons/triggers:**
- `[attr.aria-busy]="nLoading()"` when loading state exists
- `[attr.aria-disabled]="isDisabled() || nLoading() ? true : null"`
- `[attr.disabled]="..."` on native `<button>` to block native click

**Form controls:**
- `[attr.aria-invalid]="hasError() ? true : null"`
- `[attr.aria-describedby]="describedBy()"` → `errorId` when error, `hintId` otherwise
- `[attr.aria-required]="nRequired() ? true : null"`
- `<label [for]="elementId()">` when `nLabel` is set
- `role="alert"` on `<p data-slot="error">`

**Overlays:**
- `role="dialog"`, `role="listbox"`, or `role="menu"` as appropriate
- `aria-expanded`, `aria-controls`, `aria-haspopup` on trigger
- Focus trap when modal; return focus on close

### Template order (form components)

```
label
control-wrapper (control + icon-leading/trailing)
error
hint
```

Error and hint are mutually exclusive: hint only renders when `!hasError()`.

### Register in the CLI (mandatory)

Every new component needs an entry in `packages/cli/src/core/registry/data/<category>.ts`:

```ts
{
  name: '{name}',                                 // kebab-case, same as folder
  basePath: 'components/{name}',
  registryDependencies: ['utils'],                // always include utils
  dependencies: ['class-variance-authority'],     // runtime npm deps
  devDependencies: [],
  files: [
    '{name}.component.ts',
    '{name}.variants.ts',                         // only if it exists
    'index.ts',
  ],
}
```

After adding the entry:

```bash
npm run build:registry          # emits apps/web/public/r/{name}.json
npx nx build nexus              # validates lib compiles
```

### Pre-PR checklist

- [ ] `standalone: true`, `OnPush`, no `ViewEncapsulation.None`
- [ ] Selector `n-{name}`. All public inputs/outputs prefixed `n`
- [ ] `host: { '[class]': 'classes()' }` — no wrapper div
- [ ] `{name}.variants.ts` if ≥2 variant keys; `mergeClasses()` in `classes()`
- [ ] Only `nClass` exposed; internal parts via `data-slot`
- [ ] Module-scope ID counter + `nId` input; `errorId`/`hintId` derived
- [ ] Form components: `injectFormControl` + `ControlValueAccessor`
- [ ] Form components: `nLabel`, `nError`, `nHint`, `nRequired`, `nAriaLabel` present
- [ ] ARIA attributes applied per checklist
- [ ] Template order: label → control-wrapper → error → hint
- [ ] At least one demo per relevant variation in `demo/`
- [ ] `doc/overview.md` + `doc/api.md` updated
- [ ] Registry entry added; `npm run build:registry` passes
- [ ] `npx @nexuslabs/cli@alpha add {name}` works in a separate project
- [ ] `npx nx lint nexus && npx nx test nexus && npx nx build nexus` all pass
