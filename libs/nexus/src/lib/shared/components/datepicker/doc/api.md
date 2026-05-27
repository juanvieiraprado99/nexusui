# Datepicker API

## `n-datepicker`

Campo de data com trigger + calendário em overlay (CDK). Implementa `ControlValueAccessor`.
Opcionalmente seleciona hora (`nShowTime`).

### Inputs

| Input               | Tipo                                  | Default              | Descrição                                                  |
|---------------------|---------------------------------------|----------------------|------------------------------------------------------------|
| `nValue`            | `Date \| null` (model)                | `null`               | Data/hora selecionada (two-way).                           |
| `nMin`              | `Date \| null`                        | `null`               | Data mínima permitida.                                     |
| `nMax`              | `Date \| null`                        | `null`               | Data máxima permitida.                                     |
| `nDisabledDate`     | `(d: Date) => boolean \| null`        | `null`               | Predicado para desabilitar dias específicos.               |
| `nLocale`           | `string`                              | `''` (auto)          | Locale `Intl`. Vazio resolve para `navigator.language`.    |
| `nWeekStartsOn`     | `0 \| 1`                              | `0`                  | Domingo (`0`) ou segunda (`1`).                            |
| `nFormat`           | `Intl.DateTimeFormatOptions \| null`  | `null`               | Override do formato do trigger.                            |
| `nShowToday`        | `boolean`                             | `true`               | Mostra atalho "Hoje" no rodapé.                            |
| `nClearable`        | `boolean`                             | `true`               | Mostra botão "Limpar" no rodapé.                           |
| `nShowTime`         | `boolean`                             | `false`              | Habilita seleção de hora (selects hora/minuto).            |
| `nMinuteStep`       | `number`                              | `1`                  | Incremento dos minutos (ex.: `15` → 00/15/30/45).          |
| `nHourCycle`        | `'auto' \| '12' \| '24'`              | `'auto'`             | Ciclo horário. `'auto'` deriva do locale.                  |
| `nLabel`            | `string`                              | `''`                 | Rótulo do campo.                                           |
| `nPlaceholder`      | `string`                              | `''`                 | Texto exibido quando vazio.                                |
| `nDisabled`         | `boolean`                             | `false`              | Desabilita o componente.                                   |
| `nRequired`         | `boolean`                             | `false`              | Marca como obrigatório.                                    |
| `nError`            | `string \| null`                      | `null`               | Mensagem de erro forçada.                                  |
| `nHint`             | `string \| null`                      | `null`               | Texto auxiliar.                                            |
| `nClass`            | `string`                              | `''`                 | Classes extras no trigger.                                 |
| `nAriaLabel`        | `string`                              | `''`                 | `aria-label` quando não há `nLabel`.                       |
| `nId`               | `string`                              | `''`                 | ID estável (gera automático se vazio).                     |
| `nSize`             | `'sm' \| 'default' \| 'lg'`           | `'default'`          | Tamanho do trigger e dos selects de hora.                  |
| `nEmptyLabel`       | `string`                              | `'Selecione uma data'`| Texto do trigger quando vazio (sem placeholder).          |
| `nTodayLabel`       | `string`                              | `'Hoje'`             | Rótulo do botão "Hoje".                                    |
| `nNowLabel`         | `string`                              | `'Agora'`            | Rótulo do botão "Agora" (hora atual, modo `nShowTime`).    |
| `nClearLabel`       | `string`                              | `'Limpar'`           | Rótulo do botão "Limpar".                                  |
| `nCalendarAriaLabel`| `string`                              | `'Calendário'`       | `aria-label` do painel (`role="dialog"`).                  |
| `nHourLabel`        | `string`                              | `'Hora'`             | `aria-label` do select de hora.                            |
| `nMinuteLabel`      | `string`                              | `'Minuto'`           | `aria-label` do select de minuto.                          |
| `nMeridiemLabel`    | `string`                              | `'Período'`          | `aria-label` do select AM/PM (modo 12h).                   |

### Outputs

| Output         | Tipo            | Descrição                                       |
|----------------|-----------------|-------------------------------------------------|
| `nChange`      | `Date \| null`  | Emite quando o valor muda.                      |
| `nOpenChange`  | `boolean`       | Emite quando o painel abre/fecha.               |

### Comportamento de hora

- Com `nShowTime=true` o valor preserva hora/minuto; sem ele, a hora é zerada (`startOfDay`).
- Selecionar um dia mantém a hora atual e **fecha** o painel; trocar a hora atualiza o valor e **mantém** o painel aberto.
- `nHourCycle='auto'` usa `Intl` para decidir 12h (AM/PM) ou 24h conforme o locale.

### Form integration

Implementa `ControlValueAccessor` — funciona com `formControl`, `formControlName`, `[(ngModel)]`.

---

## `data-slot`

| Slot      | Onde                                         |
|-----------|----------------------------------------------|
| `root`    | wrapper externo                              |
| `label`   | `<label>` quando há `nLabel`                 |
| `trigger` | botão que abre o calendário                  |
| `content` | painel (`role="dialog"`)                     |
| `time`    | linha de selects de hora (`nShowTime=true`)  |
| `error`   | mensagem de erro                             |
| `hint`    | texto auxiliar                               |

Estilize via Tailwind mirando o slot:

```html
<n-datepicker nClass="data-[slot=trigger]:bg-yellow-50" />
```
