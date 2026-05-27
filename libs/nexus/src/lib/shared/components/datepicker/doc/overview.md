# Datepicker

Seletor de data com calendário em overlay (CDK Overlay), `Date | null` como valor, integração nativa com Reactive Forms via `injectFormControl`. Sem dependências de bibliotecas de data — formatação via `Intl.DateTimeFormat`.

## Importar

```ts
import { DatepickerComponent } from '@nexus/lib/shared/components/datepicker';
```

## Uso básico

```html
<n-datepicker [(nValue)]="data" nLabel="Agendamento" nPlaceholder="Selecione uma data" />
```

## Com hora

```html
<n-datepicker
  [(nValue)]="data"
  nLabel="Data e hora"
  [nShowTime]="true"
  [nMinuteStep]="15"
/>
```

Com `nShowTime`, o valor preserva hora/minuto. O ciclo 12h/24h é derivado do locale (`nHourCycle='auto'`) — força com `nHourCycle="12"` ou `"24"`.

## Com Reactive Forms

```ts
form = new FormGroup({
  date: new FormControl<Date | null>(null, Validators.required),
});
```

```html
<n-datepicker
  formControlName="date"
  nLabel="Data"
  [nRequired]="true"
  [nError]="form.controls.date.touched && form.controls.date.invalid ? 'Obrigatório' : null"
/>
```

## Restrições

```html
<n-datepicker
  [(nValue)]="data"
  [nMin]="amanha"
  [nMax]="daquiUmMes"
  [nDisabledDate]="diasDeFimDeSemana"
/>
```

`nDisabledDate` recebe `(date: Date) => boolean` — retorna `true` para desabilitar o dia.

## Calendário inline

O painel usa o componente `n-calendar`, que também pode ser usado fora do trigger:

```html
<n-calendar [nValue]="data()" (nChange)="data.set($event)" />
```

## Internacionalização

As strings da UI têm defaults em pt-BR e são sobrescritíveis por input:
`nEmptyLabel`, `nTodayLabel`, `nClearLabel`, `nCalendarAriaLabel`, `nHourLabel`,
`nMinuteLabel`, `nMeridiemLabel`. A formatação de data/hora usa `Intl` com `nLocale`.

## Acessibilidade

- Trigger: `role=combobox`, `aria-haspopup=dialog`, `aria-expanded`, `aria-controls`
- Painel: `role=dialog`, `aria-modal=true`, foco preso enquanto aberto (`cdkTrapFocus`) e capturado automaticamente ao abrir
- Calendário: `role=grid` na grade, `role=gridcell` em cada dia, com `aria-selected`/`aria-disabled`/`aria-current`
- Teclado: `←`/`→` (dia), `↑`/`↓` (semana), `PageUp`/`PageDown` (mês), `Shift+PageUp/Down` (ano), `Home`/`End` (início/fim da semana), `Enter`/`Space` (selecionar), `Esc` (fechar)
- Foco retorna ao trigger ao fechar via `Esc` ou ao confirmar uma data

## Roadmap

Não disponível em v1 (planejado):

- `n-date-range-picker` — seleção de intervalos
- Segundos na seleção de hora
- Visão de anos/décadas (atalho de salto)
- Múltiplos meses lado a lado

## Slots disponíveis

| Slot                | Local                                            |
|---------------------|--------------------------------------------------|
| `root`              | Wrapper externo do componente                    |
| `label`             | `<label>`                                        |
| `trigger`           | Botão que abre o calendário                      |
| `content`           | Painel do calendário (overlay, `role=dialog`)    |
| `time`              | Linha de selects de hora (`nShowTime=true`)      |
| `error`             | Mensagem de erro                                 |
| `hint`              | Texto auxiliar                                   |
