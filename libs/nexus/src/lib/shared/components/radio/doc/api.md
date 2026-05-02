# Radio API

## `n-radio-group`

### Inputs

| Input            | Tipo                                       | Default      | Descrição                                       |
|------------------|--------------------------------------------|--------------|-------------------------------------------------|
| `nValue`         | `T \| null` (model)                        | `null`       | Valor selecionado. Two-way.                     |
| `nName`          | `string`                                   | gerado       | Atributo `name` propagado aos inputs.           |
| `nLabel`         | `string`                                   | `''`         | Rótulo do grupo.                                |
| `nOrientation`   | `'vertical' \| 'horizontal'`               | `'vertical'` | Direção do layout.                              |
| `nSize`          | `'sm' \| 'default' \| 'lg'`                | `'default'`  | Tamanho propagado aos itens.                    |
| `nVariant`       | `'default' \| 'card'`                      | `'default'`  | Layout dos itens.                               |
| `nColor`         | `'default' \| 'destructive' \| 'success'`  | `'default'`  | Paleta dos itens.                               |
| `nDisabled`      | `boolean`                                  | `false`      | Desabilita todo o grupo.                        |
| `nRequired`      | `boolean`                                  | `false`      | Marca como obrigatório.                         |
| `nLoading`       | `boolean`                                  | `false`      | Mostra skeleton e bloqueia interação.           |
| `nSkeletonRows`  | `number`                                   | `3`          | Quantidade de skeletons quando `nLoading`.      |
| `nError`         | `string \| null`                           | `null`       | Mensagem de erro.                               |
| `nHint`          | `string \| null`                           | `null`       | Texto auxiliar.                                 |
| `nClass`         | `string`                                   | `''`         | Classes extras na raiz.                         |
| `nAriaLabel`     | `string`                                   | `''`         | Label acessível quando não há `nLabel` visível. |
| `nId`            | `string`                                   | gerado       | ID base do grupo.                               |

### Outputs

| Output     | Tipo          | Descrição                       |
|------------|---------------|---------------------------------|
| `nChange`  | `T \| null`   | Emitido quando seleção muda.    |

### data-slot

| Slot              | Elemento                              |
|-------------------|---------------------------------------|
| `root`            | wrapper externo                       |
| `label`           | rótulo do grupo                       |
| `control-wrapper` | container `role="radiogroup"`         |
| `error`           | mensagem de erro (`role="alert"`)     |
| `hint`            | texto auxiliar                        |

---

## `n-radio`

### Inputs

| Input          | Tipo                                       | Default     | Descrição                                                   |
|----------------|--------------------------------------------|-------------|-------------------------------------------------------------|
| `nValue`       | `T` (required)                             | —           | Valor associado a este radio.                               |
| `nLabel`       | `string`                                   | `''`        | Texto do rótulo.                                            |
| `nDescription` | `string`                                   | `''`        | Descrição abaixo do label (alternativa: `slot=description`).|
| `nDisabled`    | `boolean`                                  | `false`     | Desabilita este item.                                       |
| `nRequired`    | `boolean`                                  | `false`     | Marca como obrigatório (apenas modo solo).                  |
| `nSize`        | `'sm' \| 'default' \| 'lg' \| null`        | herda grupo | Override de tamanho.                                        |
| `nVariant`     | `'default' \| 'card' \| null`              | herda grupo | Override de variante.                                       |
| `nColor`       | `'default' \| 'destructive' \| 'success' \| null` | herda grupo | Override de cor.                                     |
| `nChecked`     | `boolean` (model, modo solo)               | `false`     | Estado quando usado fora de grupo.                          |
| `nName`        | `string`                                   | herda grupo | Atributo `name`.                                            |
| `nClass`       | `string`                                   | `''`        | Classes extras na raiz.                                     |
| `nAriaLabel`   | `string`                                   | `''`        | Label acessível quando não há `nLabel` visível.             |
| `nId`          | `string`                                   | gerado      | ID do input.                                                |

### Outputs

| Output     | Tipo         | Descrição                          |
|------------|--------------|------------------------------------|
| `nChange`  | `T`          | Emitido ao selecionar este radio.  |
| `nFocus`   | `FocusEvent` | Foco recebido no input.            |
| `nBlur`    | `FocusEvent` | Foco perdido.                      |

### Content projection

| Slot                  | Descrição                                            |
|-----------------------|------------------------------------------------------|
| `[slot=description]`  | Conteúdo rico abaixo do label (HTML, ícones, etc).   |

### data-slot

| Slot              | Elemento                          |
|-------------------|-----------------------------------|
| `root`            | `<label>` raiz                    |
| `control-wrapper` | container do input + indicador    |
| `control`         | `<input type="radio">`            |
| `indicator`       | bolinha preenchida quando checked |
| `label`           | texto do rótulo                   |
| `description`     | descrição                         |
