# Switch

Toggle boolean state. Full form integration, 3 sizes, 4 color variants, loading spinner, icon slots, and optional track labels.

## Basic usage

```html
<n-switch [(nChecked)]="enabled" nLabel="Enable notifications" />
```

## With reactive forms

```html
<n-switch [formControl]="myControl" nLabel="Accept terms" />
```

## Color variants

```html
<n-switch nColor="success" nLabel="Active"   [nChecked]="true" />
<n-switch nColor="danger"  nLabel="Disabled" [nChecked]="true" />
<n-switch nColor="warning" nLabel="Warning"  [nChecked]="true" />
```

## Loading state

Blocks interaction and shows a spinner inside the thumb while an async operation is in progress.

```html
<n-switch [nLoading]="isSaving" nLabel="Auto-save" [(nChecked)]="autoSave" />
```

## Icons inside thumb

Project icons using `nIconOn` and `nIconOff` attributes. They show/hide based on checked state.

```html
<n-switch [(nChecked)]="darkMode" nLabel="Dark mode">
  <svg nIconOff ...><!-- sun --></svg>
  <svg nIconOn  ...><!-- moon --></svg>
</n-switch>
```

## Track labels

Show text inside the track to reinforce the state visually.

```html
<n-switch [(nChecked)]="status" [nShowTrackLabel]="true" nLabel="Status" />
<n-switch [(nChecked)]="status" [nShowTrackLabel]="true" nTrackLabelOn="YES" nTrackLabelOff="NO" />
```

## Validation

```html
<n-switch
  [formControl]="termsControl"
  nLabel="Accept terms"
  nError="You must accept the terms"
  nHint="Required to continue"
/>
```
