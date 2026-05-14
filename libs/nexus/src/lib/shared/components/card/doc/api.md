# Card API

## CardComponent (`n-card`)

### Inputs

| Input        | Tipo                                                    | Padrão      | Descrição                                        |
|--------------|---------------------------------------------------------|-------------|--------------------------------------------------|
| `nVariant`   | `'default' \| 'elevated' \| 'filled' \| 'ghost'`       | `'default'` | Estilo visual do card                            |
| `nSize`      | `'sm' \| 'default' \| 'lg'`                             | `'default'` | Padding interno                                  |
| `nClass`     | `string`                                                | `''`        | Classes extras (merged via tailwind-merge)       |
| `nClickable` | `boolean`                                               | `false`     | Torna o card interativo (cursor, focus, hover)   |
| `nLoading`   | `boolean`                                               | `false`     | Exibe overlay de carregamento animado            |
| `nSelected`  | `boolean`                                               | `false`     | Destaca o card com anel de seleção (`ring-primary`) |

### Outputs

| Output   | Tipo                            | Descrição                                                        |
|----------|---------------------------------|------------------------------------------------------------------|
| `nClick` | `MouseEvent \| KeyboardEvent`   | Emitido ao clicar ou pressionar Enter/Space (requer `nClickable`) |

### Data Slots

| Atributo                      | Elemento | Propósito                         |
|-------------------------------|----------|-----------------------------------|
| `data-slot="loading-overlay"` | `div`    | Overlay de carregamento pulsante  |

---

## CardHeaderComponent (`n-card-header`)

| Input    | Tipo     | Padrão | Descrição      |
|----------|----------|--------|----------------|
| `nClass` | `string` | `''`   | Classes extras |

`data-slot="card-header"` — flex column com `gap-1.5` e `pb-4`.

---

## CardTitleComponent (`n-card-title`)

| Input    | Tipo     | Padrão | Descrição      |
|----------|----------|--------|----------------|
| `nClass` | `string` | `''`   | Classes extras |

`data-slot="card-title"` — renderiza com `role="heading"` / `aria-level="3"`.

---

## CardDescriptionComponent (`n-card-description`)

| Input    | Tipo     | Padrão | Descrição      |
|----------|----------|--------|----------------|
| `nClass` | `string` | `''`   | Classes extras |

`data-slot="card-description"` — texto secundário em `text-muted-foreground`.

---

## CardContentComponent (`n-card-content`)

| Input    | Tipo     | Padrão | Descrição      |
|----------|----------|--------|----------------|
| `nClass` | `string` | `''`   | Classes extras |

`data-slot="card-content"` — container de conteúdo sem estilo próprio.

---

## CardFooterComponent (`n-card-footer`)

| Input    | Tipo     | Padrão | Descrição      |
|----------|----------|--------|----------------|
| `nClass` | `string` | `''`   | Classes extras |

`data-slot="card-footer"` — flex row com `gap-2` e `pt-4`.
