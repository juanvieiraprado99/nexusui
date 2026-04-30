# API — Dropdown Menu

## `<n-dropdown-menu>` — raiz

Provê contexto. Sem renderização própria (`class="contents"`).

### Inputs

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `nOpen` (model) | `boolean` | `false` | Estado aberto/fechado. Two-way. |
| `nId` | `string` | `''` | Override de id estável (SSR). |

### Outputs

| Nome | Tipo |
|---|---|
| `nOpenChange` | `boolean` |

---

## `[n-dropdown-menu-trigger]` — directive

Aplica em `<button>`. Liga `aria-expanded`, `aria-controls`, `aria-haspopup`. Toggle no clique. `↓`/`Enter`/`Space` abre.

---

## `<n-dropdown-menu-content>`

Painel renderizado via overlay quando `nOpen` é true.

### Inputs

| Nome | Tipo | Default |
|---|---|---|
| `nSide` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| `nAlign` | `'start' \| 'center' \| 'end'` | `'start'` |
| `nSideOffset` | `number` | `4` |
| `nAlignOffset` | `number` | `0` |
| `nSize` | `'sm' \| 'default'` | `'default'` |
| `nClass` | `string` | `''` |

---

## `<n-dropdown-menu-item>`

### Inputs

| Nome | Tipo | Default |
|---|---|---|
| `nVariant` | `'default' \| 'destructive'` | `'default'` |
| `nInset` | `boolean` | `false` |
| `nDisabled` | `boolean` | `false` |
| `nClass` | `string` | `''` |

### Outputs

| Nome | Tipo |
|---|---|
| `nSelect` | `Event` (clique ou Enter/Space) |

---

## `<n-dropdown-menu-label>` / `<n-dropdown-menu-group>` / `<n-dropdown-menu-separator>` / `<n-dropdown-menu-shortcut>`

Todos aceitam `nClass: string`. Label e Group também aceitam `nInset: boolean` (label).

---

## `<n-dropdown-menu-sub>` / `<n-dropdown-menu-sub-trigger>` / `<n-dropdown-menu-sub-content>`

Submenu aninhado. `<n-dropdown-menu-sub>` provê `DROPDOWN_MENU_SUB_CONTEXT`. `sub-trigger` abre no hover ou `→`. `sub-content` reposiciona à direita do trigger (fallback à esquerda).

### `n-dropdown-menu-sub-trigger` Inputs

| Nome | Tipo | Default |
|---|---|---|
| `nInset` | `boolean` | `false` |
| `nDisabled` | `boolean` | `false` |
| `nClass` | `string` | `''` |

### `n-dropdown-menu-sub-content` Inputs

| Nome | Tipo | Default |
|---|---|---|
| `nClass` | `string` | `''` |

---

## `data-slot`

| Slot | Onde |
|---|---|
| `root` | `n-dropdown-menu` |
| `trigger` | `[n-dropdown-menu-trigger]` |
| `content` | painel principal |
| `item` | item de menu |
| `label` | label de grupo |
| `separator` | separador |
| `group` | container `role=group` |
| `shortcut` | atalho de teclado |
| `sub-trigger` | item que abre submenu |
| `sub-content` | painel do submenu |

Customizar internamente:

```html
<n-dropdown-menu-content nClass="[&_[data-slot=item]]:py-2">
```
