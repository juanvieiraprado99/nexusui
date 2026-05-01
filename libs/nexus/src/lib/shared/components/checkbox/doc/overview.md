# Checkbox

A form control that allows users to select or deselect an option. Supports indeterminate state, size variants, labels, hints, and validation errors.

## Usage

```html
<n-checkbox nLabel="Accept terms and conditions" />
```

## Two-way binding

```html
<n-checkbox nLabel="Remember me" [(nChecked)]="rememberMe" />
```

## Reactive Forms

```html
<n-checkbox formControlName="terms" nLabel="I accept the terms" [nRequired]="true" />
```

## Indeterminate

Use `nIndeterminate` to show a partially-selected state (e.g. "select all" when only some items are checked).

```html
<n-checkbox
  nLabel="Select all"
  [nChecked]="allChecked()"
  [nIndeterminate]="someChecked()"
  (nChange)="toggleAll($event)"
/>
```

## Sizes

```html
<n-checkbox nSize="sm" nLabel="Small" />
<n-checkbox nSize="default" nLabel="Default" />
<n-checkbox nSize="lg" nLabel="Large" />
```
