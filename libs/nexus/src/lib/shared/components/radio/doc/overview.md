# Radio

Grupo de radio buttons com seleção mútua, navegação por teclado completa (WAI-ARIA `radiogroup`) e integração com Angular Forms. Composto por dois componentes: `n-radio-group` (pai) e `n-radio` (item).

## Quando usar

- Permite ao usuário escolher **exatamente uma** opção dentre 2-7 alternativas visíveis ao mesmo tempo.
- Para listas longas (8+) prefira `n-combobox` ou `n-select`.
- Para múltipla seleção use `n-checkbox`.

## Uso básico

```ts
import { RadioComponent, RadioGroupComponent } from '@/shared/components/radio';

@Component({
  imports: [RadioComponent, RadioGroupComponent],
  template: `
    <n-radio-group [(nValue)]="plan" nLabel="Plano">
      <n-radio nValue="free" nLabel="Gratuito" />
      <n-radio nValue="pro" nLabel="Pro" />
    </n-radio-group>
  `,
})
export class Demo {
  plan = signal<string | null>(null);
}
```

## Reactive Forms

O `n-radio-group` implementa `ControlValueAccessor`. Bind com `[formControl]` ou `[formControlName]`:

```html
<n-radio-group
  [formControl]="plan"
  nLabel="Plano"
  nRequired
  [nError]="plan.touched && plan.invalid ? 'Selecione um plano' : null"
>
  <n-radio nValue="free" nLabel="Gratuito" />
  <n-radio nValue="pro" nLabel="Pro" />
</n-radio-group>
```

## Variante card

Use `nVariant="card"` no grupo para layout em cartão com label + descrição:

```html
<n-radio-group [(nValue)]="plan" nVariant="card" nLabel="Plano">
  <n-radio nValue="pro" nLabel="Pro" nDescription="Para times pequenos." />
  <n-radio nValue="ent" nLabel="Enterprise" nDescription="SLA dedicado, SSO." />
</n-radio-group>
```

## Descrição rica

Projete conteúdo com `slot="description"` para ícones e formatação:

```html
<n-radio nValue="pix" nLabel="Pix">
  <span slot="description" class="flex items-center gap-1.5">
    <svg ...></svg> Aprovação instantânea
  </span>
</n-radio>
```

## Loading

Mostre skeleton enquanto opções carregam de uma API:

```html
<n-radio-group [nLoading]="loading()" [nSkeletonRows]="4" nLabel="Opções">
  @for (opt of options(); track opt.id) {
    <n-radio [nValue]="opt.id" [nLabel]="opt.label" />
  }
</n-radio-group>
```

## Acessibilidade

- Wrapper aplica `role="radiogroup"` com `aria-labelledby`/`aria-describedby`/`aria-required`/`aria-invalid`.
- Roving tabindex: apenas o item selecionado (ou o primeiro habilitado) entra no Tab order.
- Setas (↑/↓/←/→) movem foco e selecionam, pulando itens disabled. Seta sai do final ↔ início.
- `aria-busy` ativado durante `nLoading`.
- Mensagem de erro com `role="alert"`.
