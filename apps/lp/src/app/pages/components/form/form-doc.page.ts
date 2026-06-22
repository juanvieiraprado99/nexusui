import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NFormFieldComponent,
  NFormLabelComponent,
  NFormControlComponent,
  NFormDescriptionComponent,
  NFormMessageComponent,
} from '../../../shared/components/form';
import { InputComponent } from '../../../shared/components/input';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-form-doc-page',
  imports: [
    FormsModule,
    NFormFieldComponent,
    NFormLabelComponent,
    NFormControlComponent,
    NFormDescriptionComponent,
    NFormMessageComponent,
    InputComponent,
    DocsLayoutComponent,
    CodeBlockComponent,
    ExampleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Form</h1>
          <p class="mt-2 text-muted-foreground">
            Composable form field primitives — field wrapper, label, control, description, and
            message — that wire up accessible IDs automatically via context injection.
          </p>
        </header>

        <!-- Default -->
        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div class="w-full max-w-sm">
              <n-form-field>
                <label n-form-label>Email</label>
                <n-form-control>
                  <n-input nPlaceholder="you@example.com" nType="email" [(nValue)]="emailValue" />
                </n-form-control>
                <n-form-description>We'll never share your email.</n-form-description>
              </n-form-field>
            </div>
          </app-example>
        </div>

        <!-- Required -->
        <div class="mt-6">
          <app-example title="Required field" [code]="requiredCode">
            <div class="w-full max-w-sm">
              <n-form-field nRequired>
                <label n-form-label>Username</label>
                <n-form-control>
                  <n-input nPlaceholder="john_doe" [(nValue)]="usernameValue" />
                </n-form-control>
                <n-form-description>This will be your public display name.</n-form-description>
              </n-form-field>
            </div>
          </app-example>
        </div>

        <!-- Error state -->
        <div class="mt-6">
          <app-example title="Error state" [code]="errorCode">
            <div class="w-full max-w-sm">
              <n-form-field nRequired nInvalid>
                <label n-form-label>Password</label>
                <n-form-control>
                  <n-input nType="password" nPlaceholder="••••••••" nError="Password is required" [(nValue)]="passwordValue" />
                </n-form-control>
                <n-form-message nType="error">Password is required.</n-form-message>
              </n-form-field>
            </div>
          </app-example>
        </div>

        <!-- Message types -->
        <div class="mt-6">
          <app-example title="Message types" [code]="messageTypesCode">
            <div class="w-full max-w-sm space-y-4">
              <n-form-field>
                <label n-form-label>Default message</label>
                <n-form-control>
                  <n-input nPlaceholder="Enter value" [(nValue)]="msg1" />
                </n-form-control>
                <n-form-message nType="default">This is a default hint message.</n-form-message>
              </n-form-field>
              <n-form-field nInvalid>
                <label n-form-label>Error message</label>
                <n-form-control>
                  <n-input nPlaceholder="Enter value" nError="Required" [(nValue)]="msg2" />
                </n-form-control>
                <n-form-message nType="error">This field is required.</n-form-message>
              </n-form-field>
              <n-form-field>
                <label n-form-label>Success message</label>
                <n-form-control>
                  <n-input nPlaceholder="Enter value" [(nValue)]="msg3" />
                </n-form-control>
                <n-form-message nType="success">Username is available!</n-form-message>
              </n-form-field>
              <n-form-field>
                <label n-form-label>Warning message</label>
                <n-form-control>
                  <n-input nPlaceholder="Enter value" [(nValue)]="msg4" />
                </n-form-control>
                <n-form-message nType="warning">This action cannot be undone.</n-form-message>
              </n-form-field>
            </div>
          </app-example>
        </div>

        <!-- Multiple fields -->
        <div class="mt-6">
          <app-example title="Multiple fields" [code]="multipleCode">
            <div class="w-full max-w-sm space-y-4">
              <n-form-field nRequired>
                <label n-form-label>First name</label>
                <n-form-control>
                  <n-input nPlaceholder="John" [(nValue)]="firstName" />
                </n-form-control>
              </n-form-field>
              <n-form-field nRequired>
                <label n-form-label>Last name</label>
                <n-form-control>
                  <n-input nPlaceholder="Doe" [(nValue)]="lastName" />
                </n-form-control>
              </n-form-field>
              <n-form-field>
                <label n-form-label>Bio</label>
                <n-form-control>
                  <n-input nPlaceholder="Tell us about yourself" [(nValue)]="bio" />
                </n-form-control>
                <n-form-description>Max 160 characters.</n-form-description>
              </n-form-field>
            </div>
          </app-example>
        </div>

        <!-- Installation -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Installation</h2>
          <div class="mt-3 rounded-lg border border-border/60 bg-card overflow-hidden">
            <div role="tablist" aria-label="Installation method" class="flex items-center gap-1 border-b border-border/60 px-2 py-1.5">
              <button role="tab" type="button" [attr.aria-selected]="installTab() === 'cli'" (click)="installTab.set('cli')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'cli'" [class.text-foreground]="installTab() === 'cli'"
                [class.text-muted-foreground]="installTab() !== 'cli'">CLI</button>
              <button role="tab" type="button" [attr.aria-selected]="installTab() === 'manual'" (click)="installTab.set('manual')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'manual'" [class.text-foreground]="installTab() === 'manual'"
                [class.text-muted-foreground]="installTab() !== 'manual'">Manual</button>
            </div>
            <div class="p-4">
              @if (installTab() === 'cli') {
                <app-code-block code="npx @nexuslabs/cli@alpha add form" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">form.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">form.variants.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">form.tokens.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/form/</code>.</li>
                  <li class="pt-3">Ensure <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">mergeClasses</code> util exists in <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/utils/</code>.</li>
                </ol>
              }
            </div>
          </div>
        </section>

        <!-- Usage -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Usage</h2>
          <div class="mt-3 space-y-3">
            <app-code-block [code]="importCode" language="ts" filename="my-form.component.ts" />
            <app-code-block [code]="usageCode" language="html" />
          </div>
        </section>

        <!-- API -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>

          <h3 class="mt-6 text-base font-semibold">NFormFieldComponent</h3>
          <p class="mt-1 text-sm text-muted-foreground">Root wrapper. Provides context with auto-generated IDs for label, control, description, and message linkage.</p>
          <div class="mt-3 overflow-x-auto rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead class="border-b border-border/60 bg-muted/30">
                <tr>
                  <th class="px-4 py-2.5 text-left font-medium">Prop</th>
                  <th class="px-4 py-2.5 text-left font-medium">Type</th>
                  <th class="px-4 py-2.5 text-left font-medium">Default</th>
                  <th class="px-4 py-2.5 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border/40">
                @for (row of fieldApiRows; track row.prop) {
                  <tr class="bg-card">
                    <td class="px-4 py-2.5 font-mono text-xs text-foreground">{{ row.prop }}</td>
                    <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{{ row.type }}</td>
                    <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{{ row.default }}</td>
                    <td class="px-4 py-2.5 text-muted-foreground">{{ row.description }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <h3 class="mt-8 text-base font-semibold">NFormLabelComponent</h3>
          <p class="mt-1 text-sm text-muted-foreground">Accessible label. Auto-links to the nearest <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">n-form-field</code> via context.</p>
          <div class="mt-3 overflow-x-auto rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead class="border-b border-border/60 bg-muted/30">
                <tr>
                  <th class="px-4 py-2.5 text-left font-medium">Prop</th>
                  <th class="px-4 py-2.5 text-left font-medium">Type</th>
                  <th class="px-4 py-2.5 text-left font-medium">Default</th>
                  <th class="px-4 py-2.5 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border/40">
                @for (row of labelApiRows; track row.prop) {
                  <tr class="bg-card">
                    <td class="px-4 py-2.5 font-mono text-xs text-foreground">{{ row.prop }}</td>
                    <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{{ row.type }}</td>
                    <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{{ row.default }}</td>
                    <td class="px-4 py-2.5 text-muted-foreground">{{ row.description }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <h3 class="mt-8 text-base font-semibold">NFormMessageComponent</h3>
          <p class="mt-1 text-sm text-muted-foreground">Inline message below the control. Adds <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">role="alert"</code> when type is <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">error</code>.</p>
          <div class="mt-3 overflow-x-auto rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead class="border-b border-border/60 bg-muted/30">
                <tr>
                  <th class="px-4 py-2.5 text-left font-medium">Prop</th>
                  <th class="px-4 py-2.5 text-left font-medium">Type</th>
                  <th class="px-4 py-2.5 text-left font-medium">Default</th>
                  <th class="px-4 py-2.5 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border/40">
                @for (row of messageApiRows; track row.prop) {
                  <tr class="bg-card">
                    <td class="px-4 py-2.5 font-mono text-xs text-foreground">{{ row.prop }}</td>
                    <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{{ row.type }}</td>
                    <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{{ row.default }}</td>
                    <td class="px-4 py-2.5 text-muted-foreground">{{ row.description }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </section>
      </article>
    </app-docs-layout>
  `,
})
export class FormDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');

  protected readonly emailValue = signal('');
  protected readonly usernameValue = signal('');
  protected readonly passwordValue = signal('');
  protected readonly msg1 = signal('');
  protected readonly msg2 = signal('');
  protected readonly msg3 = signal('nexus_user');
  protected readonly msg4 = signal('');
  protected readonly firstName = signal('');
  protected readonly lastName = signal('');
  protected readonly bio = signal('');

  protected readonly defaultCode = `<n-form-field>
  <label n-form-label>Email</label>
  <n-form-control>
    <n-input nPlaceholder="you@example.com" nType="email" [(nValue)]="email" />
  </n-form-control>
  <n-form-description>We'll never share your email.</n-form-description>
</n-form-field>`;

  protected readonly requiredCode = `<n-form-field nRequired>
  <label n-form-label>Username</label>
  <n-form-control>
    <n-input nPlaceholder="john_doe" [(nValue)]="username" />
  </n-form-control>
  <n-form-description>This will be your public display name.</n-form-description>
</n-form-field>`;

  protected readonly errorCode = `<n-form-field nRequired nInvalid>
  <label n-form-label>Password</label>
  <n-form-control>
    <n-input nType="password" nPlaceholder="••••••••" nError="Password is required" [(nValue)]="password" />
  </n-form-control>
  <n-form-message nType="error">Password is required.</n-form-message>
</n-form-field>`;

  protected readonly messageTypesCode = `<!-- default -->
<n-form-message nType="default">This is a default hint message.</n-form-message>

<!-- error — adds role="alert" -->
<n-form-message nType="error">This field is required.</n-form-message>

<!-- success -->
<n-form-message nType="success">Username is available!</n-form-message>

<!-- warning -->
<n-form-message nType="warning">This action cannot be undone.</n-form-message>`;

  protected readonly multipleCode = `<div class="space-y-4">
  <n-form-field nRequired>
    <label n-form-label>First name</label>
    <n-form-control>
      <n-input nPlaceholder="John" [(nValue)]="firstName" />
    </n-form-control>
  </n-form-field>

  <n-form-field nRequired>
    <label n-form-label>Last name</label>
    <n-form-control>
      <n-input nPlaceholder="Doe" [(nValue)]="lastName" />
    </n-form-control>
  </n-form-field>

  <n-form-field>
    <label n-form-label>Bio</label>
    <n-form-control>
      <n-input nPlaceholder="Tell us about yourself" [(nValue)]="bio" />
    </n-form-control>
    <n-form-description>Max 160 characters.</n-form-description>
  </n-form-field>
</div>`;

  protected readonly importCode = `import {
  NFormFieldComponent,
  NFormLabelComponent,
  NFormControlComponent,
  NFormDescriptionComponent,
  NFormMessageComponent,
} from '@/shared/components/form';
import { InputComponent } from '@/shared/components/input';`;

  protected readonly usageCode = `<n-form-field nRequired [nInvalid]="email.invalid && email.touched">
  <label n-form-label>Email</label>
  <n-form-control>
    <n-input nType="email" nPlaceholder="you@example.com" [(nValue)]="email" />
  </n-form-control>
  <n-form-description>We'll never share your email.</n-form-description>
  <n-form-message nType="error">{{ errorMessage }}</n-form-message>
</n-form-field>`;

  protected readonly fieldApiRows: ApiRow[] = [
    { prop: 'nId', type: 'string', default: "''", description: 'Explicit base field id (SSR-stable). Auto-generated when omitted; descendants derive description/message ids from it.' },
    { prop: 'nInvalid', type: 'boolean', default: 'false', description: 'Field-level invalid state. Descendant labels read it from context (no need to repeat nInvalid per label).' },
    { prop: 'nRequired', type: 'boolean', default: 'false', description: 'Field-level required state. Descendant labels render the asterisk (*) automatically.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes merged onto the host element.' },
  ];

  protected readonly labelApiRows: ApiRow[] = [
    { prop: 'nFor', type: 'string', default: "''", description: 'Explicit `for` attribute. Auto-resolved from parent n-form-field context when omitted.' },
    { prop: 'nRequired', type: 'boolean', default: 'false', description: 'Appends a red asterisk (*) and applies the required variant styles.' },
    { prop: 'nInvalid', type: 'boolean', default: 'false', description: 'Applies destructive (red) text color to indicate an invalid state.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes.' },
  ];

  protected readonly messageApiRows: ApiRow[] = [
    { prop: 'nType', type: "'default' | 'error' | 'success' | 'warning'", default: "'default'", description: 'Controls text color. Error type also adds role="alert" for accessibility.' },
    { prop: 'nId', type: 'string', default: "''", description: 'Explicit id attribute. Auto-resolved from parent n-form-field context when omitted.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes.' },
  ];
}
