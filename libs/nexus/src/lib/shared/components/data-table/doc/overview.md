# Data Table

A powerful data table component with sorting, filtering, column visibility toggle, row selection, and CSV export built on Angular CDK and signals.

## Usage

```typescript
import { NDataTableComponent } from '@/shared/components/data-table';

@Component({
  imports: [NDataTableComponent],
  template: `
    <n-data-table
      [data]="rows"
      [columns]="columns"
    />
  `
})
export class MyComponent {
  columns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
  ];
  rows = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob',   email: 'bob@example.com'   },
  ];
}
```
