# API — Context Menu

## `<n-context-menu>`

Componente raiz. Gerencia estado aberto/fechado e coordenadas do cursor.

| Input / Output | Tipo | Padrão | Descrição |
|----------------|------|--------|-----------|
| `nOpen` | `model<boolean>` | `false` | Estado aberto (two-way) |
| `nId` | `input<string>` | `''` | ID base para IDs derivados |
| `nOpenChange` | `output<boolean>` | — | Emite ao abrir/fechar |

## `[n-context-menu-trigger]`

Diretiva aplicada a qualquer elemento. Abre o menu nas coordenadas do cursor ao clicar com botão direito. Suporta Shift+F10 para acessibilidade por teclado.

## `<n-context-menu-content>`

Painel overlay. Posicionado nas coordenadas do cursor com clamping automático ao viewport.

| Input | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `nSize` | `'sm' \| 'default'` | `'default'` | Tamanho do texto |
| `nClass` | `string` | `''` | Classes extras |

## `<n-context-menu-item>`

Item de ação padrão.

| Input / Output | Tipo | Padrão | Descrição |
|----------------|------|--------|-----------|
| `nVariant` | `'default' \| 'destructive'` | `'default'` | Variante visual |
| `nInset` | `boolean` | `false` | Recuo à esquerda (alinha com items com ícone) |
| `nDisabled` | `boolean` | `false` | Desabilita o item |
| `nClass` | `string` | `''` | Classes extras |
| `nSelect` | `output<Event>` | — | Emite ao selecionar |

## `<n-context-menu-checkbox-item>`

Item com estado de checkbox. Não fecha o menu ao selecionar por padrão.

| Input / Output | Tipo | Padrão | Descrição |
|----------------|------|--------|-----------|
| `nChecked` | `model<boolean>` | `false` | Estado checked (two-way) |
| `nDisabled` | `boolean` | `false` | Desabilita o item |
| `nInset` | `boolean` | `false` | Recuo à esquerda |
| `nCloseOnSelect` | `boolean` | `false` | Fecha o menu ao selecionar |
| `nClass` | `string` | `''` | Classes extras |
| `nSelect` | `output<Event>` | — | Emite ao selecionar |

## `<n-context-menu-radio-group>`

Agrupa radio items com valor compartilhado.

| Input / Output | Tipo | Padrão | Descrição |
|----------------|------|--------|-----------|
| `nValue` | `model<string \| null>` | `null` | Valor selecionado (two-way) |
| `nClass` | `string` | `''` | Classes extras |

## `<n-context-menu-radio-item>`

Item de seleção exclusiva dentro de um radio group.

| Input / Output | Tipo | Padrão | Descrição |
|----------------|------|--------|-----------|
| `nValue` | `input.required<string>` | — | Valor deste item |
| `nDisabled` | `boolean` | `false` | Desabilita o item |
| `nClass` | `string` | `''` | Classes extras |
| `nSelect` | `output<string>` | — | Emite o valor ao selecionar |

## `<n-context-menu-sub>` / `<n-context-menu-sub-trigger>` / `<n-context-menu-sub-content>`

Submenu aninhado. O sub-content usa `flexibleConnectedTo` no trigger (não cursor).

| Input (sub-trigger) | Tipo | Padrão | Descrição |
|---------------------|------|--------|-----------|
| `nInset` | `boolean` | `false` | Recuo à esquerda |
| `nDisabled` | `boolean` | `false` | Desabilita o trigger |
| `nClass` | `string` | `''` | Classes extras |

## `<n-context-menu-label>`

Rótulo não-interativo para grupos.

## `<n-context-menu-separator>`

Linha divisória horizontal.

## `<n-context-menu-shortcut>`

Exibe atalho de teclado alinhado à direita do item.

## `<n-context-menu-group>`

Agrupa items com `role="group"`.

## `data-slot` values

| Slot | Elemento |
|------|----------|
| `root` | Host de `n-context-menu` |
| `trigger` | Host de `[n-context-menu-trigger]` |
| `content` | Painel do overlay |
| `item` | `n-context-menu-item` |
| `checkbox-item` | `n-context-menu-checkbox-item` |
| `radio-group` | `n-context-menu-radio-group` |
| `radio-item` | `n-context-menu-radio-item` |
| `sub` | `n-context-menu-sub` |
| `sub-trigger` | `n-context-menu-sub-trigger` |
| `sub-content` | Painel do submenu overlay |
| `label` | `n-context-menu-label` |
| `separator` | `n-context-menu-separator` |
| `shortcut` | `n-context-menu-shortcut` |
| `group` | `n-context-menu-group` |
