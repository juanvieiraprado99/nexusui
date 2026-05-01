# Combobox

An input with a filterable dropdown. Supports single-select, multi-select, async search, groups, and form integration.

## Basic usage

```html
<n-combobox [(nValue)]="value">
  <n-combobox-trigger nPlaceholder="Select a framework..." />
  <n-combobox-content>
    <n-combobox-item nValue="angular" nLabel="Angular">Angular</n-combobox-item>
    <n-combobox-item nValue="react" nLabel="React">React</n-combobox-item>
    <n-combobox-item nValue="vue" nLabel="Vue">Vue</n-combobox-item>
  </n-combobox-content>
</n-combobox>
```

## Multi-select

```html
<n-combobox [(nValues)]="selectedValues" [nMultiple]="true">
  <n-combobox-trigger nPlaceholder="Select skills..." />
  <n-combobox-content>
    <n-combobox-item nValue="ts" nLabel="TypeScript">TypeScript</n-combobox-item>
    <n-combobox-item nValue="go" nLabel="Go">Go</n-combobox-item>
  </n-combobox-content>
</n-combobox>
```

## With groups and empty state

```html
<n-combobox [(nValue)]="value">
  <n-combobox-trigger nPlaceholder="Select..." />
  <n-combobox-content>
    <n-combobox-group nLabel="Frontend">
      <n-combobox-item nValue="ts" nLabel="TypeScript">TypeScript</n-combobox-item>
    </n-combobox-group>
    <n-combobox-empty>No results found.</n-combobox-empty>
  </n-combobox-content>
</n-combobox>
```

## Async / remote search

Use `nFilterChange` to trigger a remote fetch. Set `nLoading` while fetching.

```html
<n-combobox
  [(nValue)]="value"
  [nLoading]="loading()"
  (nFilterChange)="onSearch($event)"
>
  <n-combobox-trigger nPlaceholder="Search..." />
  <n-combobox-content>
    @for (item of results(); track item.value) {
      <n-combobox-item [nValue]="item.value" [nLabel]="item.label">
        {{ item.label }}
      </n-combobox-item>
    }
    <n-combobox-empty>No results.</n-combobox-empty>
  </n-combobox-content>
</n-combobox>
```

## Reactive forms

```html
<n-combobox [formControl]="control">
  <n-combobox-trigger nPlaceholder="Select..." />
  <n-combobox-content>
    <n-combobox-item nValue="a" nLabel="Option A">Option A</n-combobox-item>
  </n-combobox-content>
</n-combobox>
```
