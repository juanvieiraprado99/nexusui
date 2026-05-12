# Button Group

Groups multiple buttons into a visually connected unit. Supports horizontal and vertical orientation, propagates `size`, `variant`, and `disabled` state to all child buttons, and enables keyboard navigation with arrow keys.

## Usage

```html
<n-button-group nAriaLabel="Text alignment">
  <button n-button nVariant="outline">Left</button>
  <button n-button nVariant="outline">Center</button>
  <button n-button nVariant="outline">Right</button>
</n-button-group>
```

## Vertical orientation

```html
<n-button-group nOrientation="vertical" class="w-48">
  <button n-button nVariant="outline">Profile</button>
  <button n-button nVariant="outline">Settings</button>
  <button n-button nVariant="outline">Sign out</button>
</n-button-group>
```

## Context propagation

Set `nSize` or `nVariant` once on the group — all child buttons inherit:

```html
<n-button-group nVariant="outline" nSize="sm">
  <button n-button>Bold</button>
  <button n-button>Italic</button>
  <button n-button>Underline</button>
</n-button-group>
```

## Keyboard navigation

Arrow keys (`←/→` for horizontal, `↑/↓` for vertical) move focus between buttons. Disabled buttons are skipped.
