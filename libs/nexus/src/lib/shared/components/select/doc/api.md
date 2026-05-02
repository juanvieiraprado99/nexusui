# Select API

## `<n-select>`

| Input                  | Tipo                          | Default | Descrição                                              |
|------------------------|-------------------------------|---------|--------------------------------------------------------|
| `nValue`               | `string` (model)              | `''`    | Valor em modo single                                   |
| `nValues`              | `string[]` (model)            | `[]`    | Valores em modo multi                                  |
| `nMultiple`            | `boolean`                     | `false` | Habilita multi-select                                  |
| `nDisabled`            | `boolean`                     | `false` | Desabilita interação                                   |
| `nLoading`             | `boolean`                     | `false` | Mostra spinner no trigger e skeleton no painel         |
| `nClearable`           | `boolean`                     | `false` | Mostra botão X quando há valor                         |
| `nSelectAll`           | `boolean`                     | `false` | Header "Select all" (apenas multi)                     |
| `nMaxSelections`       | `number \| null`              | `null`  | Cap de seleções (multi). Itens excedentes ficam off    |
| `nMultiSummary`        | `'count' \| 'list'`           | `'count'` | Como exibir seleção no trigger em multi              |
| `nMatchTriggerWidth`   | `boolean`                     | `true`  | Painel acompanha largura do trigger                    |
| `nLabel`               | `string`                      | `''`    | Label visível                                          |
| `nError`               | `string \| null`              | `null`  | Mensagem de erro                                       |
| `nHint`                | `string \| null`              | `null`  | Texto auxiliar                                         |
| `nRequired`            | `boolean`                     | `false` | Marca campo como obrigatório                           |
| `nAriaLabel`           | `string`                      | `''`    | Aria-label (quando não há `nLabel`)                    |
| `nId`                  | `string`                      | `''`    | ID estável (SSR)                                       |

| Output                 | Tipo                          | Descrição                                              |
|------------------------|-------------------------------|--------------------------------------------------------|
| `nOpenChange`          | `boolean`                     | Emite quando painel abre/fecha                         |
| `nChange`              | `string \| string[]`          | Emite ao selecionar item                               |

Implementa `ControlValueAccessor`.

## `<n-select-trigger>`

| Input          | Tipo                                  | Default                |
|----------------|---------------------------------------|------------------------|
| `nSize`        | `'sm' \| 'default' \| 'lg'`           | `'default'`            |
| `nPlaceholder` | `string`                              | `'Select an option...'`|
| `nClass`       | `string`                              | `''`                   |

## `<n-select-content>`

| Input          | Tipo                                          | Default      |
|----------------|-----------------------------------------------|--------------|
| `nSide`        | `'top' \| 'bottom' \| 'left' \| 'right'`      | `'bottom'`   |
| `nAlign`       | `'start' \| 'center' \| 'end'`                | `'start'`    |
| `nSideOffset`  | `number`                                      | `4`          |
| `nAlignOffset` | `number`                                      | `0`          |
| `nClass`       | `string`                                      | `''`         |

## `<n-select-item>`

| Input          | Tipo                          | Default      |
|----------------|-------------------------------|--------------|
| `nValue`       | `string` (required)           | —            |
| `nLabel`       | `string`                      | `''`         |
| `nDescription` | `string`                      | `''`         |
| `nDisabled`    | `boolean`                     | `false`      |
| `nVariant`     | `'default' \| 'destructive'`  | `'default'`  |
| `nClass`       | `string`                      | `''`         |

Slot `data-slot="icon-leading"` aceita SVG/projeção à esquerda.

## `<n-select-group>`

| Input    | Tipo     | Default |
|----------|----------|---------|
| `nLabel` | `string` | `''`    |

## `<n-select-empty>`

Renderiza conteúdo projetado quando painel está aberto e não há itens registrados.

## Data slots

| Slot              | Onde aparece                                 |
|-------------------|----------------------------------------------|
| `root`            | Container do `<n-select>`                    |
| `trigger`         | Botão do `<n-select-trigger>`                |
| `content`         | Painel overlay do `<n-select-content>`       |
| `item`            | Cada `<n-select-item>`                       |
| `group`           | Cada `<n-select-group>`                      |
| `group-label`     | Label sticky do grupo                        |
| `description`     | Linha secundária do item                     |
| `icon-leading`    | Ícone projetado à esquerda do item           |
| `icon-trailing`   | Chevron / spinner / clear do trigger         |
| `select-all`      | Header de "Select all" no painel             |
| `loading`         | Skeleton de loading no painel                |
| `empty`           | Slot vazio                                   |
| `error` / `hint`  | Mensagens auxiliares                         |
