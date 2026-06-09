# Combobox

A trigger with a dropdown. The trigger shows the selected value. Set `nSearch` on
`n-combobox-content` to reveal a search box at the top (command-palette style) that filters
the list as you type — it is **off by default** (plain listbox). Supports single-select,
multi-select, async search, groups, and form integration.

Keyboard: `Enter` / `Space` / `ArrowDown` open the panel and focus the search box;
`ArrowUp` / `ArrowDown` move the active option (virtual focus via `aria-activedescendant`,
DOM focus stays on the search input); `Enter` selects the active option; `Escape` closes.

## Basic usage

```html
<n-combobox [(nValue)]="value">
  <n-combobox-trigger nPlaceholder="Select a framework..." />
  <n-combobox-content [nSearch]="true" nSearchPlaceholder="Search frameworks...">
    <n-combobox-item nValue="angular" nLabel="Angular">Angular</n-combobox-item>
    <n-combobox-item nValue="react" nLabel="React">React</n-combobox-item>
    <n-combobox-item nValue="vue" nLabel="Vue">Vue</n-combobox-item>
  </n-combobox-content>
</n-combobox>
```

> `nSearch` enables the in-panel search box (off by default).
> `nPlaceholder` is the **trigger** text shown when nothing is selected.
> `nSearchPlaceholder` is the placeholder of the **search box** inside the open panel.

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
