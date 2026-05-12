# Alert

Displays a contextual message to the user. Supports five semantic variants, optional dismiss button, and auto-dismiss timeout.

## Usage

```html
<n-alert
  nType="info"
  nTitle="New version available"
  nDescription="Run npx @nexuslabs/cli@latest to upgrade."
/>
```

## Dismissible

```html
<n-alert
  nType="warning"
  nTitle="Unsaved changes"
  nDescription="Your changes will be lost if you navigate away."
  [nDismissible]="true"
  (nDismiss)="onDismiss()"
/>
```

## Auto-dismiss

Pass a duration in milliseconds via `nAutoDismissDuration`. The alert emits `nDismiss` and hides itself when the timer fires.

```html
<n-alert
  nType="success"
  nTitle="Saved"
  [nAutoDismissDuration]="3000"
  (nDismiss)="showAlert = false"
/>
```

## Custom icon

Pass a `TemplateRef` to `nIcon` to replace the default icon.

```html
<ng-template #starIcon>
  <svg ...>...</svg>
</ng-template>

<n-alert nTitle="Featured" [nIcon]="starIcon" />
```

## Template content

Both `nTitle` and `nDescription` accept a `TemplateRef<void>` for rich content.

```html
<ng-template #richDesc>
  Learn more at <a href="#">docs.example.com</a>.
</ng-template>

<n-alert nTitle="Setup required" [nDescription]="richDesc" />
```
