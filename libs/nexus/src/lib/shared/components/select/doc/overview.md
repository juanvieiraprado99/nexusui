# Select

Headless-styled select with overlay panel. Single or multi-select, groups, type-ahead, ControlValueAccessor.

## Quando usar

- Lista curta-média (≤50 itens), pré-definida.
- Quando `<select>` nativo é estética insuficiente.
- Quando filtro de busca não é necessário (use `n-combobox` se for).

## Uso básico

```html
<n-select [(nValue)]="value">
  <n-select-trigger nPlaceholder="Pick one" />
  <n-select-content>
    <n-select-item nValue="apple" nLabel="Apple" />
    <n-select-item nValue="banana" nLabel="Banana" />
  </n-select-content>
</n-select>
```

## Multi-select

```html
<n-select [(nValues)]="values" [nMultiple]="true" [nClearable]="true" nMultiSummary="list">
  <n-select-trigger />
  <n-select-content>
    <n-select-item nValue="a" nLabel="Alpha" />
    <n-select-item nValue="b" nLabel="Beta" />
  </n-select-content>
</n-select>
```

## Select all + max

```html
<n-select [(nValues)]="tags" [nMultiple]="true" [nSelectAll]="true" [nMaxSelections]="3">
  <n-select-trigger />
  <n-select-content>
    <n-select-item nValue="bug" nLabel="Bug" />
    <n-select-item nValue="docs" nLabel="Docs" />
  </n-select-content>
</n-select>
```

## Groups

```html
<n-select-content>
  <n-select-group nLabel="Americas">
    <n-select-item nValue="ny" nLabel="New York" />
  </n-select-group>
  <n-select-group nLabel="Europe">
    <n-select-item nValue="lon" nLabel="London" />
  </n-select-group>
</n-select-content>
```

## Item com ícone + descrição

```html
<n-select-item nValue="pro" nLabel="Pro" nDescription="Unlimited projects">
  <svg data-slot="icon-leading" ...></svg>
</n-select-item>
```

## Reactive Forms

```ts
role = new FormControl('', { nonNullable: true, validators: [Validators.required] });
```
```html
<n-select [formControl]="role" nLabel="Role" [nRequired]="true" nError="Required">
  ...
</n-select>
```

## Teclado

| Tecla         | Ação                                      |
|---------------|-------------------------------------------|
| `Enter` / `Space` | Abre painel; seleciona item ativo     |
| `↑` / `↓`     | Navega entre itens                         |
| `Home` / `End`| Primeiro / último item (via FocusKeyManager) |
| `Esc`         | Fecha painel                               |
| `Tab`         | Fecha painel + foca próximo elemento       |
| Letras        | Type-ahead — pula pro item começando com texto digitado (debounce 600ms) |
