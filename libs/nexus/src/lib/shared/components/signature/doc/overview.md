# Signature

A canvas-based signature pad. Supports mouse on desktop and touch/stylus on mobile. Works as a standalone widget or inside Angular reactive/template-driven forms via `ControlValueAccessor`.

## Features

- Smooth Bézier curves for natural-looking strokes
- Undo last stroke (Ctrl+Z or button)
- Clear button with configurable label
- Placeholder watermark when empty
- Three output formats: `base64-png`, `base64-svg`, `svg`
- Keyboard accessible: `Delete`/`Backspace` clears, `Ctrl+Z` undoes

## Usage

```html
<n-signature nLabel="Assinatura" [(nValue)]="sig" />
```

### With a reactive form

```typescript
form = new FormGroup({
  signature: new FormControl('', Validators.required),
});
```

```html
<n-signature
  formControlName="signature"
  nLabel="Assinatura"
  [nRequired]="true"
  [nError]="form.controls.signature.touched && form.controls.signature.invalid ? 'Obrigatório' : null"
/>
```

### Custom output format

```html
<n-signature nOutputFormat="svg" [(nValue)]="svgString" />
<n-signature nOutputFormat="base64-svg" [(nValue)]="svgDataUrl" />
```

### Custom colors

```html
<n-signature
  nStrokeColor="#1d4ed8"
  [nStrokeWidth]="3"
  nBackgroundColor="#f8fafc"
/>
```
