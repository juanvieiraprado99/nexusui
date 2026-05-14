# API

## CollapsibleComponent (`n-collapsible`)

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `nOpen` | `model<boolean>` | `false` | Estado open/closed (two-way bindable) |
| `nDisabled` | `input<boolean>` | `false` | Desabilita o toggle |
| `nLazy` | `input<boolean>` | `false` | Desmonta o conteúdo ao fechar |
| `nVariant` | `'default' \| 'bordered' \| 'card'` | `'default'` | Estilo visual |
| `nClass` | `input<string>` | `''` | Classes extras no root |

| Output | Tipo | Descrição |
|---|---|---|
| `nOpenChange` | `output<boolean>` | Emite ao abrir/fechar |

## CollapsibleTriggerComponent (`button[n-collapsible-trigger]`)

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `nClass` | `input<string>` | `''` | Classes extras no trigger |

## CollapsibleContentComponent (`n-collapsible-content`)

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `nClass` | `input<string>` | `''` | Classes extras no conteúdo |
