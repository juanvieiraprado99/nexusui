# Datepicker

Seletor de data com calendário em overlay (CDK Overlay), `Date | null` como valor, integração nativa com Reactive Forms via `injectFormControl`. Sem dependências de bibliotecas de data — formatação via `Intl.DateTimeFormat`.

## Importar

```ts
import {
  DatepickerComponent,
  DatepickerCalendarComponent,
} from '@nexus/lib/shared/components/datepicker';
```

## Uso básico

```html
<n-datepicker [(nValue)]="data" nLabel="Agendamento" nPlaceholder="Selecione uma data" />
```

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

`n-datepicker-calendar` pode ser usado fora do trigger:

```html
<n-datepicker-calendar
  [nValue]="data()"
  (nChange)="data.set($event)"
/>
```

## Acessibilidade

- Trigger: `role=combobox`, `aria-haspopup=dialog`, `aria-expanded`, `aria-controls`
- Calendário: `role=dialog` no painel, `role=grid` na grade, `role=gridcell` em cada dia, com `aria-selected`/`aria-disabled`/`aria-current`
- Teclado: `←`/`→` (dia), `↑`/`↓` (semana), `PageUp`/`PageDown` (mês), `Shift+PageUp/Down` (ano), `Home`/`End` (início/fim da semana), `Enter`/`Space` (selecionar), `Esc` (fechar)
- Foco retorna ao trigger ao fechar via `Esc` ou ao confirmar uma data

## Roadmap

Não disponível em v1 (planejado):

- `n-date-range-picker` — seleção de intervalos
- Time picker e datetime combinado
- Visão de anos/décadas (atalho de salto)
- Múltiplos meses lado a lado
- Localização de strings além das fornecidas pelo `Intl`

## Slots disponíveis

| Slot                | Local                                            |
|---------------------|--------------------------------------------------|
| `root`              | Wrapper externo do componente                    |
| `label`             | `<label>`                                        |
| `trigger`           | Botão que abre o calendário                      |
| `content`           | Painel do calendário (overlay)                   |
| `header`            | Cabeçalho do calendário (mês/ano + navegação)    |
| `grid`              | Grade de dias                                    |
| `item`              | Célula de dia individual                         |
| `footer`            | Rodapé com "Hoje" / "Limpar"                     |
| `error`             | Mensagem de erro                                 |
| `hint`              | Texto auxiliar                                   |
