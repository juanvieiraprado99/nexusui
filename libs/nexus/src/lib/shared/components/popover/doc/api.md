# API — Popover

## `n-popover`

| Input | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `nOpen` | `boolean` (model) | `false` | Estado aberto/fechado (two-way) |
| `nId` | `string` | `''` | ID base para IDs gerados (ARIA) |
| `nPersistent` | `boolean` | `false` | Não fecha ao clicar fora |
| `nModal` | `boolean` | `false` | Aprisiona foco no conteúdo (focus trap) |
| `nTrigger` | `'click' \| 'hover' \| 'focus'` | `'click'` | Modo de abertura |

| Output | Tipo | Descrição |
|--------|------|-----------|
| `nOpenChange` | `boolean` | Emite ao mudar estado |

## `[n-popover-trigger]`

Diretiva aplicada em qualquer elemento. Herda comportamento do `nTrigger` do contexto.

| Atributo ARIA gerado | Valor |
|----------------------|-------|
| `aria-haspopup` | `"dialog"` |
| `aria-expanded` | estado atual |
| `aria-controls` | ID do conteúdo (quando aberto) |

## `n-popover-content`

| Input | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `nSide` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Lado preferido |
| `nAlign` | `'start' \| 'center' \| 'end'` | `'center'` | Alinhamento no eixo secundário |
| `nSideOffset` | `number` | `8` | Distância em px do trigger |
| `nAlignOffset` | `number` | `0` | Deslocamento no eixo de alinhamento |
| `nArrow` | `boolean` | `true` | Exibe seta apontando pro trigger |
| `nSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Largura e padding predefinidos |
| `nClass` | `string` | `''` | Classes adicionais |

## `[n-popover-close]`

Diretiva aplicada em qualquer elemento. Fecha o popover e retorna foco ao trigger ao clicar.

## `data-slot`

| Slot | Elemento |
|------|----------|
| `root` | `n-popover` |
| `trigger` | `[n-popover-trigger]` |
| `content` | painel do overlay |
| `close` | `[n-popover-close]` |
