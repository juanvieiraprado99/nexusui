# Drawer API

## `n-drawer`

| Input         | Tipo                          | Padrão     | Descrição                                      |
|---------------|-------------------------------|------------|------------------------------------------------|
| `nOpen`       | `boolean` (model)             | `false`    | Estado aberto/fechado (two-way binding)        |
| `nId`         | `string`                      | `''`       | ID customizado para o painel (útil em SSR)     |
| `nPersistent` | `boolean`                     | `false`    | Não fecha no backdrop/ESC; exibe shake         |
| `nRole`       | `'dialog' \| 'navigation'`    | `'dialog'` | Role ARIA do painel                            |

| Output        | Tipo               | Descrição                          |
|---------------|--------------------|------------------------------------|
| `nOpenChange` | `EventEmitter<boolean>` | Emite ao abrir ou fechar       |

## `n-drawer-content`

| Input        | Tipo                                           | Padrão    | Descrição                                     |
|--------------|------------------------------------------------|-----------|-----------------------------------------------|
| `nPosition`  | `'left' \| 'right' \| 'top' \| 'bottom'`       | `'right'` | Borda de entrada do drawer                    |
| `nSize`      | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`       | `'md'`    | Largura (left/right) ou altura (top/bottom)   |
| `nScrollable`| `boolean`                                      | `false`   | Adiciona `overflow-hidden` ao painel          |
| `nHideClose` | `boolean`                                      | `false`   | Oculta o botão X de fechar                   |
| `nHandle`    | `boolean`                                      | `true`    | Exibe barra de handle em top/bottom           |
| `nBackdrop`  | `boolean`                                      | `true`    | Exibe o overlay escuro atrás do drawer        |
| `nClass`     | `string`                                       | `''`      | Classes adicionais no painel                  |

## `[n-drawer-trigger]`

Diretiva aplicada a qualquer elemento. Abre o drawer ao clicar.

Adiciona automaticamente: `aria-haspopup`, `aria-expanded`, `aria-controls`, `data-state`.

## `[n-drawer-close]`

Diretiva aplicada a qualquer elemento. Fecha o drawer ao clicar.

## `n-drawer-header`

| Input    | Tipo     | Padrão | Descrição             |
|----------|----------|--------|-----------------------|
| `nClass` | `string` | `''`   | Classes adicionais    |

## `n-drawer-footer`

| Input    | Tipo     | Padrão | Descrição             |
|----------|----------|--------|-----------------------|
| `nClass` | `string` | `''`   | Classes adicionais    |

## `n-drawer-title`

| Input    | Tipo     | Padrão | Descrição             |
|----------|----------|--------|-----------------------|
| `nClass` | `string` | `''`   | Classes adicionais    |

Recebe o ID do contexto automaticamente (`aria-labelledby`).

## `n-drawer-description`

| Input    | Tipo     | Padrão | Descrição             |
|----------|----------|--------|-----------------------|
| `nClass` | `string` | `''`   | Classes adicionais    |

Recebe o ID do contexto automaticamente (`aria-describedby`).

## Data slots

| Slot          | Elemento                  |
|---------------|---------------------------|
| `root`        | `n-drawer` host           |
| `trigger`     | `[n-drawer-trigger]` host |
| `content`     | painel do drawer          |
| `header`      | `n-drawer-header` host    |
| `footer`      | `n-drawer-footer` host    |
| `title`       | `n-drawer-title` host     |
| `description` | `n-drawer-description` host |
| `close`       | `[n-drawer-close]` host   |
