import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  TableBodyComponent,
  TableCaptionComponent,
  TableCellComponent,
  TableComponent,
  TableFooterComponent,
  TableHeaderComponent,
  TableHeadComponent,
  TableRowComponent,
  TableScrollComponent,
} from '../../../shared/components/table';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow {
  element: string;
  selector: string;
  inputs: string;
  description: string;
}

interface Invoice {
  invoice: string;
  status: string;
  method: string;
  amount: string;
}

@Component({
  selector: 'app-table-doc-page',
  imports: [
    TableComponent,
    TableHeaderComponent,
    TableBodyComponent,
    TableFooterComponent,
    TableRowComponent,
    TableHeadComponent,
    TableCellComponent,
    TableCaptionComponent,
    TableScrollComponent,
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
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Table</h1>
          <p class="mt-2 text-muted-foreground">Primitive table components for building structured data layouts. Compose <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono text-foreground">table[n-table]</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono text-foreground">thead[n-table-header]</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono text-foreground">tbody[n-table-body]</code>, and more for full control.</p>
        </header>

        <!-- Default -->
        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <n-table-scroll>
              <table n-table>
                <thead n-table-header>
                  <tr n-table-row>
                    <th n-table-head>Invoice</th>
                    <th n-table-head>Status</th>
                    <th n-table-head>Method</th>
                    <th n-table-head class="text-right">Amount</th>
                  </tr>
                </thead>
                <tbody n-table-body>
                  @for (row of invoices; track row.invoice) {
                    <tr n-table-row>
                      <td n-table-cell class="font-medium">{{ row.invoice }}</td>
                      <td n-table-cell>{{ row.status }}</td>
                      <td n-table-cell>{{ row.method }}</td>
                      <td n-table-cell class="text-right">{{ row.amount }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </n-table-scroll>
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
                <app-code-block code="npx @nexuslabs/cli@alpha add table" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy all files from <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">table/</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/table/</code>.</li>
                </ol>
              }
            </div>
          </div>
        </section>

        <!-- Usage -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Usage</h2>
          <div class="mt-3 space-y-3">
            <app-code-block [code]="importCode" language="ts" filename="my-page.component.ts" />
            <app-code-block [code]="usageCode" language="html" />
          </div>
        </section>

        <!-- Examples -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Examples</h2>

          <!-- Striped -->
          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Striped</h3>
          <div class="mt-3">
            <app-example title='nVariant="striped"' [code]="stripedCode">
              <n-table-scroll>
                <table n-table nVariant="striped">
                  <thead n-table-header>
                    <tr n-table-row>
                      <th n-table-head>Invoice</th>
                      <th n-table-head>Status</th>
                      <th n-table-head>Method</th>
                      <th n-table-head class="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody n-table-body>
                    @for (row of invoices; track row.invoice) {
                      <tr n-table-row>
                        <td n-table-cell class="font-medium">{{ row.invoice }}</td>
                        <td n-table-cell>{{ row.status }}</td>
                        <td n-table-cell>{{ row.method }}</td>
                        <td n-table-cell class="text-right">{{ row.amount }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </n-table-scroll>
            </app-example>
          </div>

          <!-- Bordered -->
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Bordered</h3>
          <div class="mt-3">
            <app-example title='nVariant="bordered"' [code]="borderedCode">
              <n-table-scroll>
                <table n-table nVariant="bordered">
                  <thead n-table-header>
                    <tr n-table-row>
                      <th n-table-head>Invoice</th>
                      <th n-table-head>Status</th>
                      <th n-table-head>Method</th>
                      <th n-table-head class="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody n-table-body>
                    @for (row of invoices; track row.invoice) {
                      <tr n-table-row>
                        <td n-table-cell class="font-medium">{{ row.invoice }}</td>
                        <td n-table-cell>{{ row.status }}</td>
                        <td n-table-cell>{{ row.method }}</td>
                        <td n-table-cell class="text-right">{{ row.amount }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </n-table-scroll>
            </app-example>
          </div>

          <!-- Compact -->
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Compact</h3>
          <div class="mt-3">
            <app-example title='nSize="compact"' [code]="compactCode">
              <n-table-scroll>
                <table n-table nSize="compact">
                  <thead n-table-header>
                    <tr n-table-row>
                      <th n-table-head>Invoice</th>
                      <th n-table-head>Status</th>
                      <th n-table-head>Method</th>
                      <th n-table-head class="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody n-table-body>
                    @for (row of invoices; track row.invoice) {
                      <tr n-table-row>
                        <td n-table-cell class="font-medium">{{ row.invoice }}</td>
                        <td n-table-cell>{{ row.status }}</td>
                        <td n-table-cell>{{ row.method }}</td>
                        <td n-table-cell class="text-right">{{ row.amount }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </n-table-scroll>
            </app-example>
          </div>

          <!-- Comfortable -->
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Comfortable</h3>
          <div class="mt-3">
            <app-example title='nSize="comfortable"' [code]="comfortableCode">
              <n-table-scroll>
                <table n-table nSize="comfortable">
                  <thead n-table-header>
                    <tr n-table-row>
                      <th n-table-head>Invoice</th>
                      <th n-table-head>Status</th>
                      <th n-table-head>Method</th>
                      <th n-table-head class="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody n-table-body>
                    @for (row of invoices; track row.invoice) {
                      <tr n-table-row>
                        <td n-table-cell class="font-medium">{{ row.invoice }}</td>
                        <td n-table-cell>{{ row.status }}</td>
                        <td n-table-cell>{{ row.method }}</td>
                        <td n-table-cell class="text-right">{{ row.amount }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </n-table-scroll>
            </app-example>
          </div>

          <!-- With Caption -->
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With Caption</h3>
          <div class="mt-3">
            <app-example title="caption[n-table-caption]" [code]="captionCode">
              <n-table-scroll>
                <table n-table>
                  <caption n-table-caption>A list of your recent invoices.</caption>
                  <thead n-table-header>
                    <tr n-table-row>
                      <th n-table-head>Invoice</th>
                      <th n-table-head>Status</th>
                      <th n-table-head>Method</th>
                      <th n-table-head class="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody n-table-body>
                    @for (row of invoices; track row.invoice) {
                      <tr n-table-row>
                        <td n-table-cell class="font-medium">{{ row.invoice }}</td>
                        <td n-table-cell>{{ row.status }}</td>
                        <td n-table-cell>{{ row.method }}</td>
                        <td n-table-cell class="text-right">{{ row.amount }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </n-table-scroll>
            </app-example>
          </div>

          <!-- With Footer -->
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With Footer</h3>
          <div class="mt-3">
            <app-example title="tfoot[n-table-footer]" [code]="footerCode">
              <n-table-scroll>
                <table n-table>
                  <thead n-table-header>
                    <tr n-table-row>
                      <th n-table-head>Invoice</th>
                      <th n-table-head>Status</th>
                      <th n-table-head>Method</th>
                      <th n-table-head class="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody n-table-body>
                    @for (row of invoices; track row.invoice) {
                      <tr n-table-row>
                        <td n-table-cell class="font-medium">{{ row.invoice }}</td>
                        <td n-table-cell>{{ row.status }}</td>
                        <td n-table-cell>{{ row.method }}</td>
                        <td n-table-cell class="text-right">{{ row.amount }}</td>
                      </tr>
                    }
                  </tbody>
                  <tfoot n-table-footer>
                    <tr n-table-row>
                      <td n-table-cell colspan="3">Total</td>
                      <td n-table-cell class="text-right">$2,500.00</td>
                    </tr>
                  </tfoot>
                </table>
              </n-table-scroll>
            </app-example>
          </div>

          <!-- Scrollable -->
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Scrollable</h3>
          <div class="mt-3">
            <app-example title="n-table-scroll wrapper" [code]="scrollableCode">
              <n-table-scroll nLabel="Invoices">
                <table n-table>
                  <thead n-table-header>
                    <tr n-table-row>
                      <th n-table-head>Invoice</th>
                      <th n-table-head>Status</th>
                      <th n-table-head>Method</th>
                      <th n-table-head>Date</th>
                      <th n-table-head>Customer</th>
                      <th n-table-head>Email</th>
                      <th n-table-head class="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody n-table-body>
                    @for (row of wideInvoices; track row.invoice) {
                      <tr n-table-row>
                        <td n-table-cell class="font-medium">{{ row.invoice }}</td>
                        <td n-table-cell>{{ row.status }}</td>
                        <td n-table-cell>{{ row.method }}</td>
                        <td n-table-cell>{{ row.date }}</td>
                        <td n-table-cell>{{ row.customer }}</td>
                        <td n-table-cell>{{ row.email }}</td>
                        <td n-table-cell class="text-right">{{ row.amount }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </n-table-scroll>
            </app-example>
          </div>
        </section>

        <!-- API Reference -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>
          <div class="mt-3 overflow-x-auto rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead class="bg-muted/40 text-muted-foreground">
                <tr>
                  <th class="px-4 py-2 text-left font-medium">Element</th>
                  <th class="px-4 py-2 text-left font-medium">Selector</th>
                  <th class="px-4 py-2 text-left font-medium">Inputs</th>
                  <th class="px-4 py-2 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                @for (row of apiRows; track row.element) {
                  <tr class="border-t border-border/60">
                    <td class="px-4 py-2 font-mono text-xs text-foreground">{{ row.element }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.selector }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.inputs }}</td>
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
export class TableDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');

  protected readonly invoices: Invoice[] = [
    { invoice: 'INV-001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
    { invoice: 'INV-002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
    { invoice: 'INV-003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
    { invoice: 'INV-004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
    { invoice: 'INV-005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
  ];

  protected readonly wideInvoices = [
    { invoice: 'INV-001', status: 'Paid', method: 'Credit Card', date: '2024-01-15', customer: 'Alice Johnson', email: 'alice@example.com', amount: '$250.00' },
    { invoice: 'INV-002', status: 'Pending', method: 'PayPal', date: '2024-01-18', customer: 'Bob Smith', email: 'bob@example.com', amount: '$150.00' },
    { invoice: 'INV-003', status: 'Unpaid', method: 'Bank Transfer', date: '2024-01-22', customer: 'Carol White', email: 'carol@example.com', amount: '$350.00' },
    { invoice: 'INV-004', status: 'Paid', method: 'Credit Card', date: '2024-01-25', customer: 'David Lee', email: 'david@example.com', amount: '$450.00' },
  ];

  protected readonly defaultCode = `<n-table-scroll>
  <table n-table>
    <thead n-table-header>
      <tr n-table-row>
        <th n-table-head>Invoice</th>
        <th n-table-head>Status</th>
        <th n-table-head class="text-right">Amount</th>
      </tr>
    </thead>
    <tbody n-table-body>
      @for (row of rows; track row.invoice) {
        <tr n-table-row>
          <td n-table-cell class="font-medium">{{ row.invoice }}</td>
          <td n-table-cell>{{ row.status }}</td>
          <td n-table-cell class="text-right">{{ row.amount }}</td>
        </tr>
      }
    </tbody>
  </table>
</n-table-scroll>`;

  protected readonly stripedCode = `<table n-table nVariant="striped">
  ...
</table>`;

  protected readonly borderedCode = `<table n-table nVariant="bordered">
  ...
</table>`;

  protected readonly compactCode = `<table n-table nSize="compact">
  ...
</table>`;

  protected readonly comfortableCode = `<table n-table nSize="comfortable">
  ...
</table>`;

  protected readonly captionCode = `<table n-table>
  <caption n-table-caption>A list of your recent invoices.</caption>
  <thead n-table-header>...</thead>
  <tbody n-table-body>...</tbody>
</table>`;

  protected readonly footerCode = `<table n-table>
  <thead n-table-header>...</thead>
  <tbody n-table-body>...</tbody>
  <tfoot n-table-footer>
    <tr n-table-row>
      <td n-table-cell colspan="3">Total</td>
      <td n-table-cell class="text-right">$2,500.00</td>
    </tr>
  </tfoot>
</table>`;

  protected readonly scrollableCode = `<!-- nLabel makes it a focusable, announced scroll region (keyboard + SR) -->
<n-table-scroll nLabel="Invoices">
  <table n-table>
    ...many columns...
  </table>
</n-table-scroll>`;

  protected readonly importCode = `import {
  TableComponent,
  TableHeaderComponent,
  TableBodyComponent,
  TableFooterComponent,
  TableRowComponent,
  TableHeadComponent,
  TableCellComponent,
  TableCaptionComponent,
  TableScrollComponent,
} from './shared/components/table';

@Component({
  imports: [
    TableComponent, TableHeaderComponent, TableBodyComponent,
    TableFooterComponent, TableRowComponent, TableHeadComponent,
    TableCellComponent, TableCaptionComponent, TableScrollComponent,
  ],
  ...
})`;

  protected readonly usageCode = `<n-table-scroll>
  <table n-table>
    <thead n-table-header>
      <tr n-table-row>
        <th n-table-head>Name</th>
        <th n-table-head>Value</th>
      </tr>
    </thead>
    <tbody n-table-body>
      <tr n-table-row>
        <td n-table-cell>Item A</td>
        <td n-table-cell>100</td>
      </tr>
    </tbody>
  </table>
</n-table-scroll>`;

  protected readonly apiRows: ApiRow[] = [
    { element: 'TableComponent', selector: 'table[n-table]', inputs: 'nVariant, nSize, nClass', description: 'Root table element. Controls variant and size.' },
    { element: 'TableHeaderComponent', selector: 'thead[n-table-header]', inputs: 'nClass', description: 'Table thead wrapper.' },
    { element: 'TableBodyComponent', selector: 'tbody[n-table-body]', inputs: 'nClass', description: 'Table tbody wrapper.' },
    { element: 'TableFooterComponent', selector: 'tfoot[n-table-footer]', inputs: 'nClass', description: 'Table tfoot wrapper with muted background.' },
    { element: 'TableRowComponent', selector: 'tr[n-table-row]', inputs: 'nClass', description: 'Table row with hover and selected states.' },
    { element: 'TableHeadComponent', selector: 'th[n-table-head]', inputs: 'nClass', description: 'Table header cell.' },
    { element: 'TableCellComponent', selector: 'td[n-table-cell]', inputs: 'nClass', description: 'Table data cell.' },
    { element: 'TableCaptionComponent', selector: 'caption[n-table-caption]', inputs: 'nClass', description: 'Table caption, displayed below the table.' },
    { element: 'TableScrollComponent', selector: 'n-table-scroll', inputs: 'nLabel, nClass', description: 'Responsive horizontal scroll container. Keyboard-focusable; set nLabel to expose it as a named ARIA region.' },
  ];
}
