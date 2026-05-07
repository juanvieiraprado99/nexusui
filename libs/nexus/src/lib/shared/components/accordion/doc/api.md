# Accordion API

## `n-accordion`

| Input | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `nVariant` | `'default' \| 'ghost' \| 'flush'` | `'default'` | Estilo visual |
| `nSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Tamanho do trigger |
| `nType` | `'single' \| 'multiple'` | `'single'` | Modo de abertura |
| `nCollapsible` | `boolean` | `true` | Permite fechar o item aberto (single) |
| `nClass` | `string` | `''` | Classes adicionais |

| Model | Tipo | Descrição |
|-------|------|-----------|
| `nValue` | `string` | Item aberto (single) |
| `nValues` | `string[]` | Itens abertos (multiple) |

| Output | Tipo | Descrição |
|--------|------|-----------|
| `nOpenChange` | `string \| string[]` | Emite ao abrir/fechar |

## `n-accordion-item`

| Input | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `nValue` | `string` | **required** | Identificador único do item |
| `nDisabled` | `boolean` | `false` | Desabilita interação |
| `nClass` | `string` | `''` | Classes adicionais |

| `data-state` | Valor | Descrição |
|---|---|---|
| `data-state` | `"open"` / `"closed"` | Estado atual do item |
| `data-disabled` | `""` / ausente | Item desabilitado |

## `button[n-accordion-trigger]`

| Input | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `nIcon` | `'chevron' \| 'plus-minus'` | `'chevron'` | Ícone indicador |
| `nClass` | `string` | `''` | Classes adicionais |

## `n-accordion-content`

| Input | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `nClass` | `string` | `''` | Classes adicionais no conteúdo interno |

## `data-slot`

| Slot | Elemento | Descrição |
|------|----------|-----------|
| `item` | `n-accordion-item` | Container do item |
| `trigger` | `button[n-accordion-trigger]` | Botão de abertura |
| `content` | Inner div de `n-accordion-content` | Área de conteúdo |
