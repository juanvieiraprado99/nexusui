# Datepicker API

## `n-datepicker`

### Inputs

| Input            | Tipo                                       | Default     | Descrição                                          |
|------------------|--------------------------------------------|-------------|----------------------------------------------------|
| `nValue`         | `Date \| null` (model)                     | `null`      | Data selecionada (two-way).                        |
| `nMin`           | `Date \| null`                             | `null`      | Data mínima permitida.                             |
| `nMax`           | `Date \| null`                             | `null`      | Data máxima permitida.                             |
| `nDisabledDate`  | `(d: Date) => boolean \| null`             | `null`      | Predicado para desabilitar dias específicos.       |
| `nLocale`        | `string`                                   | `navigator.language` | Locale para formatação (`Intl`).          |
| `nWeekStartsOn`  | `0 \| 1`                                   | `0`         | Domingo (`0`) ou segunda (`1`).                    |
| `nFormat`        | `Intl.DateTimeFormatOptions \| null`       | `null`      | Override do formato do trigger.                    |
| `nShowToday`     | `boolean`                                  | `true`      | Mostra atalho "Hoje" no rodapé.                    |
| `nClearable`     | `boolean`                                  | `true`      | Mostra botão "Limpar" no rodapé.                   |
| `nLabel`         | `string`                                   | `''`        | Rótulo do campo.                                   |
| `nPlaceholder`   | `string`                                   | `''`        | Texto exibido quando vazio.                        |
| `nDisabled`      | `boolean`                                  | `false`     | Desabilita o componente.                           |
| `nRequired`      | `boolean`                                  | `false`     | Marca como obrigatório.                            |
| `nError`         | `string \| null`                           | `null`      | Mensagem de erro forçada.                          |
| `nHint`          | `string \| null`                           | `null`      | Texto auxiliar.                                    |
| `nClass`         | `string`                                   | `''`        | Classes extras no trigger.                         |
| `nAriaLabel`     | `string`                                   | `''`        | `aria-label` quando não há `nLabel`.               |
| `nId`            | `string`                                   | `''`        | ID estável (gera automático se vazio).             |
| `nSize`          | `'sm' \| 'default' \| 'lg'`                | `'default'` | Tamanho do trigger.                                |

### Outputs

| Output         | Tipo            | Descrição                                       |
|----------------|-----------------|-------------------------------------------------|
| `nChange`      | `Date \| null`  | Emite quando o valor muda.                      |
| `nOpenChange`  | `boolean`       | Emite quando o painel abre/fecha.               |

### Form integration

Implementa `ControlValueAccessor` — funciona com `formControl`, `formControlName`, `[(ngModel)]`.

---

## `n-datepicker-calendar`

Calendário standalone — usável fora do trigger ou em layouts inline.

### Inputs

| Input            | Tipo                                       | Default     | Descrição                                          |
|------------------|--------------------------------------------|-------------|----------------------------------------------------|
| `nValue`         | `Date \| null`                             | `null`      | Data selecionada (read-only quando dentro de `n-datepicker`). |
| `nMin`           | `Date \| null`                             | `null`      | Data mínima.                                       |
| `nMax`           | `Date \| null`                             | `null`      | Data máxima.                                       |
| `nDisabledDate`  | `(d: Date) => boolean \| null`             | `null`      | Predicado de desabilitação.                        |
| `nLocale`        | `string`                                   | `navigator.language` | Locale para formatação.                   |
| `nWeekStartsOn`  | `0 \| 1`                                   | `0`         | Início da semana.                                  |
| `nShowToday`     | `boolean`                                  | `true`      | Botão "Hoje".                                      |
| `nClearable`     | `boolean`                                  | `true`      | Botão "Limpar".                                    |
| `nClass`         | `string`                                   | `''`        | Classes extras na raiz.                            |
| `nAutoFocus`     | `boolean`                                  | `false`     | Foca automaticamente a célula ativa ao montar.     |

### Outputs

| Output    | Tipo    | Descrição                            |
|-----------|---------|--------------------------------------|
| `nChange` | `Date`  | Emite ao selecionar uma data.        |
| `nClear`  | `void`  | Emite ao clicar em "Limpar".         |

> Quando renderizado dentro de `n-datepicker`, o calendário lê valor/restrições do contexto (`DATEPICKER_CTX`) e ignora os inputs locais.

---

## `data-slot`

| Slot      | Onde                                    |
|-----------|-----------------------------------------|
| `root`    | wrapper externo                         |
| `label`   | `<label>` quando há `nLabel`            |
| `trigger` | botão que abre o calendário             |
| `content` | painel do calendário                    |
| `header`  | mês/ano + navegação                     |
| `grid`    | grade de dias                           |
| `item`    | célula de dia                           |
| `footer`  | rodapé com Hoje/Limpar                  |
| `error`   | mensagem de erro                        |
| `hint`    | texto auxiliar                          |

Estilize via Tailwind:

```html
<n-datepicker nClass="[&[data-slot=trigger]]:bg-yellow-50" />
```
