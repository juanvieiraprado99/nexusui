import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { SonnerComponent, toast } from '../../../shared/components/sonner';
import { ButtonComponent } from '../../../shared/components/button';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow {
  prop: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-sonner-doc-page',
  imports: [SonnerComponent, ButtonComponent, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <n-sonner nPosition="bottom-right" [nRichColors]="richColors()" />

    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Sonner</h1>
          <p class="mt-2 text-muted-foreground">
            Toast notifications powered by
            <a href="https://github.com/tutkli/ngx-sonner" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4 hover:text-foreground">ngx-sonner</a>.
            An opinionated, accessible toast component for Angular.
          </p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <button n-button type="button" (click)="showDefault()">Show Toast</button>
          </app-example>
        </div>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Installation</h2>
          <div class="mt-3 rounded-lg border border-border/60 bg-card overflow-hidden">
            <div role="tablist" aria-label="Installation method" class="flex items-center gap-1 border-b border-border/60 px-2 py-1.5">
              <button
                role="tab"
                type="button"
                [attr.aria-selected]="installTab() === 'cli'"
                (click)="installTab.set('cli')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'cli'"
                [class.text-foreground]="installTab() === 'cli'"
                [class.text-muted-foreground]="installTab() !== 'cli'"
              >CLI</button>
              <button
                role="tab"
                type="button"
                [attr.aria-selected]="installTab() === 'manual'"
                (click)="installTab.set('manual')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'manual'"
                [class.text-foreground]="installTab() === 'manual'"
                [class.text-muted-foreground]="installTab() !== 'manual'"
              >Manual</button>
            </div>
            <div class="p-4">
              @if (installTab() === 'cli') {
                <app-code-block code="npx @nexuslabs/cli add sonner" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install the peer dependency:
                    <div class="mt-2 ml-5">
                      <app-code-block code="npm install ngx-sonner" language="bash" />
                    </div>
                  </li>
                  <li class="pt-3">Install styling utilities:
                    <div class="mt-2 ml-5">
                      <app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" />
                    </div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">sonner.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">sonner.variants.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into your project under <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/sonner/</code>.</li>
                  <li class="pt-3">Ensure <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">mergeClasses</code> util exists at <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/utils/merge-classes.ts</code>.</li>
                </ol>
              }
            </div>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Usage</h2>
          <div class="mt-3 space-y-3">
            <app-code-block [code]="importCode" language="ts" filename="app.component.ts" />
            <app-code-block [code]="usageCode" language="html" />
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Examples</h2>

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Promise</h3>
          <div class="mt-3">
            <app-example title="toast.promise()" [code]="promiseCode">
              <div class="flex gap-2">
                <button n-button type="button" (click)="uploadSuccess()">Upload (success)</button>
                <button n-button nVariant="outline" type="button" (click)="uploadError()">Upload (error)</button>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Variants</h3>
          <div class="mt-3">
            <app-example title="success / error / warning / info" [code]="variantsCode">
              <div class="flex flex-wrap gap-2">
                <button n-button type="button" (click)="showDefault()">Default</button>
                <button n-button type="button" nVariant="secondary" (click)="showSuccess()">Success</button>
                <button n-button type="button" nVariant="destructive" (click)="showError()">Error</button>
                <button n-button type="button" nVariant="outline" (click)="showWarning()">Warning</button>
                <button n-button type="button" nVariant="ghost" (click)="showInfo()">Info</button>
                <button n-button type="button" nVariant="outline" (click)="showWithAction()">With Action</button>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Rich Colors</h3>
          <div class="mt-3">
            <app-example title="nRichColors — set on the component, not per toast" [code]="richColorsCode">
              <div class="flex flex-col gap-4">
                <div class="flex items-center gap-3">
                  <button
                    n-button
                    type="button"
                    [nVariant]="richColors() ? 'default' : 'outline'"
                    (click)="richColors.set(!richColors())"
                  >
                    nRichColors: {{ richColors() ? 'true' : 'false' }}
                  </button>
                  <span class="text-xs text-muted-foreground">Toggle to compare</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <button n-button type="button" nVariant="secondary" (click)="showSuccessRich()">Success</button>
                  <button n-button type="button" nVariant="destructive" (click)="showErrorRich()">Error</button>
                  <button n-button type="button" nVariant="outline" (click)="showWarningRich()">Warning</button>
                  <button n-button type="button" nVariant="ghost" (click)="showInfoRich()">Info</button>
                </div>
              </div>
            </app-example>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>
          <div class="mt-3 overflow-x-auto rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead class="bg-muted/40 text-muted-foreground">
                <tr>
                  <th class="px-4 py-2 text-left font-medium">Prop</th>
                  <th class="px-4 py-2 text-left font-medium">Type</th>
                  <th class="px-4 py-2 text-left font-medium">Default</th>
                  <th class="px-4 py-2 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                @for (row of apiRows; track row.prop) {
                  <tr class="border-t border-border/60">
                    <td class="px-4 py-2 font-mono text-xs text-foreground">{{ row.prop }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.type }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.default }}</td>
                    <td class="px-4 py-2 text-muted-foreground">{{ row.description }}</td>
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
export class SonnerDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly richColors = signal(false);

  protected showDefault(): void {
    toast('Event scheduled', { description: 'Friday, May 9 at 5:00 PM' });
  }

  protected showSuccess(): void {
    toast.success('Saved successfully!', { description: 'All changes have been persisted.' });
  }

  protected showError(): void {
    toast.error('Failed to save', { description: 'Check your connection and try again.' });
  }

  protected showWarning(): void {
    toast.warning('Session expiring', { description: 'You will be signed out in 5 minutes.' });
  }

  protected showInfo(): void {
    toast.info('New version available', { description: 'Update to get the latest features.' });
  }

  protected showWithAction(): void {
    toast('File moved to trash', {
      action: {
        label: 'Undo',
        onClick: () => toast.success('Action undone!'),
      },
    });
  }

  protected uploadSuccess(): void {
    toast.promise(new Promise<{ name: string }>((res) => setTimeout(() => res({ name: 'report.pdf' }), 2000)), {
      loading: 'Uploading file…',
      success: (data: { name: string }) => `"${data.name}" uploaded successfully!`,
      error: 'Upload failed. Please try again.',
    });
  }

  protected uploadError(): void {
    toast.promise(new Promise<void>((_, rej) => setTimeout(() => rej(new Error('Timeout')), 2000)), {
      loading: 'Uploading file…',
      success: 'Uploaded!',
      error: 'Upload failed. Please try again.',
    });
  }

  protected showSuccessRich(): void {
    toast.success('Payment received!', { description: 'Your invoice has been paid.' });
  }

  protected showErrorRich(): void {
    toast.error('Payment failed', { description: 'Please update your payment method.' });
  }

  protected showWarningRich(): void {
    toast.warning('Session expiring', { description: 'You will be signed out in 5 minutes.' });
  }

  protected showInfoRich(): void {
    toast.info('New version available', { description: 'Update to get the latest features.' });
  }

  protected readonly defaultCode = `// Place <n-sonner> once in your root component or layout
// then call toast() anywhere in your app
showToast(): void {
  toast('Event scheduled', { description: 'Friday, May 9 at 5:00 PM' });
}`;

  protected readonly importCode = `import { Component } from '@angular/core';
import { SonnerComponent, toast } from './shared/components/sonner';

@Component({
  selector: 'app-root',
  imports: [SonnerComponent],
  template: \`
    <n-sonner nPosition="bottom-right" />
    <!-- rest of your app -->
  \`,
})
export class AppComponent {
  showToast(): void {
    toast('Hello!');
  }
}`;

  protected readonly usageCode = `<!-- Place once in your root layout -->
<n-sonner nPosition="bottom-right" [nRichColors]="true" />

<!-- Then call toast() from any component -->`;

  protected readonly promiseCode = `upload(): void {
  toast.promise(uploadFile(), {
    loading: 'Uploading file…',
    success: (data) => \`"\${data.name}" uploaded!\`,
    error: 'Upload failed.',
  });
}`;

  protected readonly variantsCode = `toast('Default message');
toast.success('Saved!', { description: 'Changes persisted.' });
toast.error('Failed', { description: 'Try again.' });
toast.warning('Expiring soon');
toast.info('Update available');
toast('File deleted', {
  action: { label: 'Undo', onClick: () => toast.success('Undone!') },
});`;

  protected readonly richColorsCode = `<!-- richColors is set on the component, affects all toasts -->
<n-sonner [nRichColors]="true" />

<!-- Then call toast() as usual — colors apply automatically -->
toast.success('Payment received!');
toast.error('Payment failed');
toast.warning('Session expiring');
toast.info('New version available');`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nPosition', type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'", default: "'bottom-right'", description: 'Position of the toast stack on screen.' },
    { prop: 'nTheme', type: "'light' | 'dark' | 'system'", default: "'system'", description: 'Color theme for the toasts.' },
    { prop: 'nRichColors', type: 'boolean', default: 'false', description: 'Enables color-coded success/error/warning/info toasts.' },
    { prop: 'nExpand', type: 'boolean', default: 'false', description: 'Toasts expand on hover to show full content.' },
    { prop: 'nDuration', type: 'number', default: '4000', description: 'Auto-dismiss duration in milliseconds.' },
    { prop: 'nVisibleToasts', type: 'number', default: '3', description: 'Maximum number of toasts shown at once.' },
    { prop: 'nCloseButton', type: 'boolean', default: 'false', description: 'Shows a close button on each toast.' },
    { prop: 'nVariant', type: "'default' | 'destructive'", default: "'default'", description: 'Theme variant applied via CSS class binding.' },
    { prop: 'nDir', type: "'ltr' | 'rtl' | 'auto'", default: "'auto'", description: 'Text direction.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes on the toaster element.' },
  ];
}
