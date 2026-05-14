# Data Table API

## NDataTableComponent Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `nData` | `T[]` | `[]` | Array of row data |
| `nColumns` | `ColumnDef<T>[]` | `[]` | Column definitions |
| `nPageSize` | `number` | `10` | Rows per page |
| `nSelectable` | `boolean` | `false` | Enable row selection |
| `nExportCsv` | `boolean` | `false` | Show CSV export button |
| `nFilterable` | `boolean` | `true` | Show global filter input |
| `nClass` | `string` | `''` | Additional CSS classes |

## ColumnDef<T>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `key` | `keyof T` | yes | Data property key |
| `header` | `string` | yes | Column header label |
| `sortable` | `boolean` | no | Enable sorting for this column |
| `visible` | `boolean` | no | Initial visibility (default true) |
| `cell` | `(row: T) => string` | no | Custom cell renderer |

## NDataTableComponent Outputs

| Output | Type | Description |
|--------|------|-------------|
| `nSelectionChange` | `EventEmitter<T[]>` | Emits selected rows when selection changes |
