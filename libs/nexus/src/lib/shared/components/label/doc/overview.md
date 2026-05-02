# Label

Label tipográfico acessível para campos de formulário. Usado internamente por `n-input`, `n-checkbox`, `n-datepicker` e `n-combobox`, ou diretamente quando você monta o controle por conta própria.

## Quando usar

- Você quer renderizar uma `<label>` consistente acima de um controle nativo (`<input>`, `<select>`, `<textarea>`).
- Você está construindo um componente composto e precisa de uma label que respeita os estilos da nexus-ui.

## Uso básico

```html
<n-label nFor="email">Email</n-label>
<input id="email" type="email" />
```

## Required

Renderiza um indicador `*` em `text-destructive`. Marcado com `aria-hidden="true"` — o `aria-required` real fica no controle.

```html
<n-label nFor="name" [nRequired]="true">Nome</n-label>
```

## Disabled

Aplica `cursor-not-allowed` e `opacity-50`. Espelhe o estado real do controle.

```html
<n-label nFor="city" [nDisabled]="true">Cidade</n-label>
```

## Customização

Use `nClass` para adicionar/sobrescrever utilitários (resolvido via `tailwind-merge`):

```html
<n-label nClass="mb-0 inline">Inline</n-label>
```

## Acessibilidade

- `for` apontando para o `id` do controle.
- `id` opcional (`nId`) para uso com `aria-labelledby` em controles compostos.
