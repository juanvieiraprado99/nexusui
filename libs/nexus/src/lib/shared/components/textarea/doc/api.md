# Textarea API

## Inputs

| Input          | Tipo                                          | Default      | Descrição                                           |
|----------------|-----------------------------------------------|--------------|-----------------------------------------------------|
| `nSize`        | `'sm' \| 'default' \| 'lg'`                  | `'default'`  | Tamanho (padding e fonte)                           |
| `nResize`      | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Comportamento de resize CSS                     |
| `nLabel`       | `string`                                      | `''`         | Label visível acima do controle                     |
| `nPlaceholder` | `string`                                      | `''`         | Placeholder do textarea                             |
| `nDisabled`    | `boolean`                                     | `false`      | Desabilita o controle                               |
| `nRequired`    | `boolean`                                     | `false`      | Marca o campo como obrigatório                      |
| `nError`       | `string \| null`                              | `null`       | Mensagem de erro (substitui hint)                   |
| `nHint`        | `string \| null`                              | `null`       | Texto auxiliar abaixo do controle                   |
| `nClass`       | `string`                                      | `''`         | Classes extras no wrapper raiz                      |
| `nAriaLabel`   | `string`                                      | `''`         | `aria-label` quando não há `nLabel`                 |
| `nId`          | `string`                                      | `''`         | ID estável (SSR). Gerado automaticamente se vazio   |
| `nRows`        | `number`                                      | `3`          | Linhas iniciais (`rows` nativo)                     |
| `nAutoResize`  | `boolean`                                     | `false`      | Auto-expande conforme o conteúdo cresce             |
| `nMinRows`     | `number`                                      | `3`          | Mínimo de linhas quando `nAutoResize=true`          |
| `nMaxRows`     | `number`                                      | `0`          | Máximo de linhas quando `nAutoResize=true` (0 = ∞)  |
| `nMaxLength`   | `number`                                      | `0`          | Limite de caracteres via `maxlength` nativo (0 = ∞) |
| `nCharCount`   | `boolean`                                     | `false`      | Exibe contador de caracteres                        |

## Model (two-way)

| Model    | Tipo     | Descrição        |
|----------|----------|------------------|
| `nValue` | `string` | Valor do textarea |

## Outputs

| Output    | Tipo         | Descrição                          |
|-----------|--------------|------------------------------------|
| `nBlur`   | `FocusEvent` | Emitido ao perder foco             |
| `nChange` | `string`     | Emitido a cada mudança de valor    |

## Data-slots

| Slot            | Elemento              | Descrição                                |
|-----------------|-----------------------|------------------------------------------|
| `root`          | `<div>`               | Container externo                        |
| `control-wrapper` | `<div>`             | Wrapper imediato do textarea             |
| `control`       | `<textarea>`          | Elemento nativo                          |
| `error`         | `<p role="alert">`    | Mensagem de erro                         |
| `hint`          | `<p>`                 | Texto auxiliar (oculto quando há erro)   |
| `char-count`    | `<span>`              | Contador de caracteres                   |
