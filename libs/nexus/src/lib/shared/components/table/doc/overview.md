# Table

A set of composable table primitives for displaying structured data. Use `n-table` for static or lightly interactive tables; use `n-data-table` when you need built-in sorting, filtering, selection, or pagination.

## Usage

```html
<table n-table>
  <thead n-table-header>
    <tr n-table-row>
      <th n-table-head>Name</th>
      <th n-table-head>Status</th>
      <th n-table-head class="text-right">Amount</th>
    </tr>
  </thead>
  <tbody n-table-body>
    @for (row of rows; track row.name) {
      <tr n-table-row>
        <td n-table-cell class="font-medium">{{ row.name }}</td>
        <td n-table-cell>{{ row.status }}</td>
        <td n-table-cell class="text-right">{{ row.amount }}</td>
      </tr>
    }
  </tbody>
</table>
```

## Variants

```html
<!-- Striped rows -->
<table n-table nVariant="striped">...</table>

<!-- Full border grid -->
<table n-table nVariant="bordered">...</table>
```

## Sizes

```html
<table n-table nSize="compact">...</table>
<table n-table nSize="comfortable">...</table>
```

## With caption

```html
<table n-table>
  <caption n-table-caption>A list of recent invoices.</caption>
  ...
</table>
```

## With footer

```html
<table n-table>
  ...
  <tfoot n-table-footer>
    <tr n-table-row>
      <td n-table-cell colspan="3" class="text-right font-semibold">Total</td>
      <td n-table-cell class="text-right font-semibold">$975.00</td>
    </tr>
  </tfoot>
</table>
```

## Scrollable (responsive)

Wrap in `n-table-scroll` to enable horizontal scroll on small screens:

```html
<n-table-scroll>
  <table n-table>
    ...
  </table>
</n-table-scroll>
```
