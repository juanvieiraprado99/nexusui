# Padrão de autoria de componentes — `libs/nexus/src/lib/shared/components/`

> Este documento é **obrigatório** para qualquer novo componente desta pasta. Como o `nexus-ui-cli` **copia** estes arquivos para o projeto do usuário (estilo shadcn/ui), divergências de padrão se transformam em código que o usuário herda. Consistência aqui é UX para quem consome.

---

## 1. Objetivo

Garantir que cada componente seja:

- **Standalone**, `OnPush`, sem `ViewEncapsulation.None`.
- **Tipado** via CVA quando houver variantes.
- **Acessível** por padrão (ARIA correto, IDs estáveis, navegação por teclado).
- **Componível** via `data-slot` (igual shadcn/ui) — o usuário estiliza partes internas sem precisar de inputs de classe específicos.
- **Pronto para formulários** quando aplicável (`injectFormControl`).

---

## 2. Estrutura de diretório

Cada componente vive em `libs/nexus/src/lib/shared/components/{name}/`:

```
{name}/
├── {name}.component.ts     # classe + template + host bindings
├── {name}.variants.ts      # CVA (apenas se houver ≥ 2 chaves de variante)
├── index.ts                # re-export público
├── demo/
│   ├── default.ts          # uma variação por arquivo, standalone
│   ├── disabled.ts
│   └── ...
└── doc/
    ├── overview.md         # descrição + exemplos de uso
    └── api.md              # tabela de inputs/outputs/data-slots
```

Após criar o componente, **adicione a entrada em** `packages/cli/src/core/registry/registry-data.ts` — sem isso o CLI e o build de registry não enxergam o componente, e o usuário final não consegue rodar `nexus-ui-cli add {name}`. Veja a seção **13. Registro no CLI** abaixo.

---

## 3. Decoradores obrigatórios

```ts
@Component({
  selector: 'n-{name}',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // NÃO usar ViewEncapsulation.None — manter o default (Emulated)
  template: `...`,
  host: { '[class]': 'classes()' },
})
```

Regras:

- `standalone: true` sempre.
- `changeDetection: ChangeDetectionStrategy.OnPush` sempre.
- **Nunca** `encapsulation: ViewEncapsulation.None`. Estilos vêm de Tailwind aplicado no template/host; encapsulation default basta.
- Sem `imports: [...]` quando o template não consome outros componentes.

---

## 4. Seletor & nomenclatura

| Item                    | Convenção                                                     |
|-------------------------|---------------------------------------------------------------|
| Seletor de tag          | `n-{name}` (ex.: `n-button`, `n-input`, `n-select`)           |
| Seletor de atributo     | `{tag}[n-{name}]` quando faz sentido (ex.: `button[n-button]`)|
| Inputs                  | Prefixo `n` em camelCase: `nVariant`, `nSize`, `nDisabled`    |
| Outputs                 | Prefixo `n` em camelCase: `nClick`, `nChange`, `nBlur`        |
| Two-way (`model()`)     | Prefixo `n`: `nValue`, `nChecked`, `nOpen`                    |

> Não use `onClick`, `change`, `clicked` etc. **Tudo** público começa com `n`.

---

## 5. Host bindings

Aplique a classe computada **direto no host** — sem `<div>` wrapper extra:

```ts
host: {
  '[class]': 'classes()',
  '[attr.aria-busy]': 'nLoading()',
  '(click)': 'handleClick($event)',
}
```

Para componentes compostos cujo host serve só como ponto de montagem (ex.: `n-input` que renderiza wrapper + label + control + error), use `host: { class: 'contents' }` para que o host não introduza box próprio.

---

## 6. CVA — `{name}.variants.ts`

Crie `{name}.variants.ts` **se e somente se** o componente tiver `≥ 2` chaves de variante (ex.: `nVariant` + `nSize`). Caso contrário, monte as classes inline.

Forma do arquivo:

```ts
import { cva, type VariantProps } from 'class-variance-authority';

export const fooVariants = cva(
  'base classes always applied',
  {
    variants: {
      nVariant: { default: '...', destructive: '...' },
      nSize:    { sm: '...', default: '...', lg: '...' },
    },
    defaultVariants: { nVariant: 'default', nSize: 'default' },
  },
);

export type FooVariants = VariantProps<typeof fooVariants>;
```

Use no componente:

```ts
import { fooVariants, type FooVariants } from './foo.variants';

readonly nVariant = input<FooVariants['nVariant']>('default');
readonly nSize    = input<FooVariants['nSize']>('default');

protected readonly classes = computed(() =>
  mergeClasses(fooVariants({ nVariant: this.nVariant(), nSize: this.nSize() }), this.nClass()),
);
```

`mergeClasses()` está em `libs/nexus/src/lib/shared/utils/merge-classes.ts` — combina `clsx` + `tailwind-merge`.

---

## 7. Inputs/outputs públicos

### Classes

- **Apenas `nClass`** na raiz. Não exponha `nInputClass`, `nLabelClass`, etc.
- O usuário customiza partes internas via Tailwind global mirando `data-slot`:
  ```html
  <n-input nClass="[&_[data-slot=control]]:bg-yellow-50" />
  ```

### IDs

- Counter module-scope:
  ```ts
  let _idCounter = 0;
  // ...
  private readonly _staticId = `n-{name}-${++_idCounter}`;
  protected readonly elementId = computed(() => this.nId() || this._staticId);
  ```
- Sempre exponha `nId: input<string>('')` para casos com SSR estável.
- IDs derivados (`errorId`, `hintId`) **devem** ser computed sobre `elementId()`:
  ```ts
  protected readonly errorId = computed(() => `${this.elementId()}-error`);
  protected readonly hintId  = computed(() => `${this.elementId()}-hint`);
  ```

### Outputs

- Prefixo `n` (`nClick`, `nChange`, `nBlur`, `nFocus`, `nOpenChange`).
- Tipos exatos: `Event`, `FocusEvent`, `string`, etc. Nada de `any`.

---

## 8. `data-slot` — convenção shadcn/ui

Componentes **compostos** (mais de um nó relevante no template) marcam cada slot interno com `data-slot="…"`. Atômicos (ex.: `n-button`) não precisam.

### Lista canônica

| Slot                  | Quando usar                                                  |
|-----------------------|--------------------------------------------------------------|
| `root`                | div mais externo do template                                 |
| `label`               | `<label>` associado ao controle                              |
| `control-wrapper`     | container imediato do controle (envolve input + ícones)      |
| `control`             | elemento de controle nativo (`input`, `textarea`, `select`)  |
| `error`               | mensagem de erro (`role="alert"`)                            |
| `hint`                | texto auxiliar abaixo do controle                            |
| `icon-leading`        | ícone à esquerda do controle                                 |
| `icon-trailing`       | ícone/spinner à direita do controle                          |
| `description`         | descrição longa (cards, modais)                              |
| `trigger`             | botão/elemento que abre overlay (popover, combobox, dialog)  |
| `content`             | painel/portal aberto pelo trigger                            |
| `item`                | item de lista (option, menu item, accordion item)            |
| `sub-trigger`         | item que abre submenu (dropdown-menu, navigation-menu)       |
| `sub-content`         | painel de submenu aberto a partir de `sub-trigger`           |

> Nomes são canônicos — **não** crie variantes (`input-root`, `wrapper`, etc.). Se um componente novo precisa de um slot fora desta lista, adicione-o aqui antes de usar.

---

## 9. Form controls — `injectFormControl`

Componentes que podem entrar em formulário **devem** usar `injectFormControl` em vez de injetar `NgControl` manual:

- `input`, `textarea`, `select`, `checkbox`, `radio`, `switch`, `slider`, `date-picker`, `combobox`.

Padrão:

```ts
import { ControlValueAccessor } from '@angular/forms';
import { injectFormControl } from '../../utils/form-control';

export class FooComponent implements ControlValueAccessor {
  private readonly _form = injectFormControl<string>(this);

  protected readonly isDisabled = computed(
    () => this.nDisabled() || this._form.disabledByForm(),
  );
  protected readonly hasError = computed(
    () => !!this.nError() || (this._form.controlInvalid() && this._form.controlTouched()),
  );

  protected handleInput(value: string): void {
    this.nValue.set(value);
    this._form.notifyChange(value);
    this.nChange.emit(value);
  }

  protected handleBlur(e: FocusEvent): void {
    this._form.notifyTouched();
    this.nBlur.emit(e);
  }

  writeValue(v: string | null | undefined)         { this.nValue.set(v ?? ''); }
  registerOnChange(fn: (v: string) => void)        { this._form.setOnChange(fn); }
  registerOnTouched(fn: () => void)                { this._form.setOnTouched(fn); }
  setDisabledState(disabled: boolean)              { this._form.setDisabledByForm(disabled); }
}
```

`injectFormControl` está em `libs/nexus/src/lib/shared/utils/form-control.ts` e expõe: `controlInvalid`, `controlTouched`, `disabledByForm`, `notifyChange`, `notifyTouched`, `setOnChange`, `setOnTouched`, `setDisabledByForm`.

---

## 10. Acessibilidade — checklist obrigatória

Antes de abrir PR, valide os atributos ARIA aplicáveis ao tipo de componente:

### Buttons / triggers

- `[attr.aria-busy]="nLoading()"` quando há estado de carregamento
- `[attr.aria-disabled]="nDisabled() || nLoading()"`
- `[attr.disabled]="…"` para impedir clique nativo
- `role="button"` apenas se o host **não** for `<button>`/`<a>`

### Form controls

- `[attr.aria-invalid]="hasError() ? true : null"`
- `[attr.aria-describedby]="describedBy()"` (apontando para `errorId` quando há erro, `hintId` caso contrário)
- `[attr.aria-required]="nRequired() ? true : null"`
- `[attr.aria-label]` quando não há `<label>` visível
- `<label [for]="elementId()">` sempre que houver `nLabel`

### Mensagens

- Erro: `role="alert"` no `<p data-slot="error">`
- Indicador `*` de required: `aria-hidden="true"`

### Overlays (popover, dialog, combobox)

- `role` apropriado (`dialog`, `listbox`, `menu`)
- `aria-expanded`, `aria-controls`, `aria-haspopup` no trigger
- Foco gerenciado: focus-trap quando modal, retorno de foco ao fechar

---

## 11. Ordem de template em form components

Sempre nesta ordem (cima para baixo):

```
label
control-wrapper (control + icon-leading/trailing)
error
hint
```

Erro e hint são mutuamente exclusivos: hint só renderiza quando `!hasError()`.

---

## 12. Demos

- Um arquivo por variação em `demo/{nome-da-variacao}.ts`.
- Cada arquivo é um componente Angular `standalone: true` com seletor único (`demo-{component}-{variation}`).
- Sem lógica de negócio — apenas demonstram o uso real (props, two-way, forms reativos quando aplicável).
- O nome do arquivo (sem `.ts`) entra como chave no registry — mantenha kebab-case.

Exemplo:

```ts
// demo/default.ts
import { Component, signal } from '@angular/core';
import { InputComponent } from '../input.component';

@Component({
  selector: 'demo-input-default',
  standalone: true,
  imports: [InputComponent],
  template: `<n-input [(nValue)]="value" nLabel="Nome" />`,
})
export class InputDefaultDemo {
  value = signal('');
}
```

---

## 13. Registro no CLI — **obrigatório**

Todo componente novo **precisa** de uma entrada em `packages/cli/src/core/registry/registry-data.ts`. Sem isso:

- `npm run build:registry` não emite `apps/web/public/r/{name}.json`.
- `nexus-ui-cli add {name}` falha com `component not found`.
- Componente fica invisível para qualquer projeto que consome a lib.

### Forma da entrada

```ts
{
  name: '{name}',                                  // kebab-case, igual ao nome da pasta
  basePath: 'components/{name}',                   // caminho dentro de libs/nexus/src/lib/shared/
  registryDependencies: ['utils', /* outros */],   // outros componentes do registry necessários
  dependencies: ['class-variance-authority'],      // npm deps de runtime
  devDependencies: [],                             // npm deps de dev (raro)
  files: [
    '{name}.component.ts',
    '{name}.variants.ts',                          // só se existir
    'index.ts',
  ],
}
```

### Regras

- `name` **idêntico** à pasta e ao seletor (sem prefixo `n-`). Ex.: pasta `button/` → `name: 'button'`.
- `registryDependencies` **sempre** inclui `'utils'` (componentes usam `mergeClasses`).
- `dependencies` lista pacotes npm que o arquivo importa diretamente (ex.: `class-variance-authority` para CVA, `@angular/forms` para form components).
- `files` lista **todos** os arquivos `.ts` da pasta raiz do componente (não inclua `demo/` nem `doc/` — o build script lê esses por convenção).
- Se o componente depende de outro do registry (ex.: `combobox` usa `popover` + `input`), declare em `registryDependencies` — o CLI resolve recursivamente.

### Após adicionar a entrada

```bash
npm run build:registry          # gera apps/web/public/r/{name}.json
npx nx build nexus              # valida que a lib compila
```

Teste em projeto separado: `nexus-ui-cli add {name}` deve baixar e copiar os arquivos sem erro.

---

## 14. Checklist final (pré-PR)

- [ ] Decoradores: `standalone`, `OnPush`, **sem** `ViewEncapsulation.None`.
- [ ] Seletor `n-{name}`. Inputs/outputs com prefixo `n`.
- [ ] Host bindings via `[class]="classes()"` direto, sem wrapper extra.
- [ ] `{name}.variants.ts` criado se ≥ 2 chaves de variante.
- [ ] Apenas `nClass` exposto. Slots internos via `data-slot` da lista canônica.
- [ ] IDs: counter module-scope + input `nId` opcional. `errorId`/`hintId` derivados.
- [ ] Form components: `injectFormControl` + `ControlValueAccessor`.
- [ ] Checklist ARIA aplicada (seção 10).
- [ ] Ordem do template (seção 11) respeitada em form components.
- [ ] Pelo menos uma demo por variação relevante em `demo/`.
- [ ] `doc/overview.md` + `doc/api.md` atualizados (incluindo tabela de `data-slot`).
- [ ] Entrada adicionada em `packages/cli/src/core/registry/registry-data.ts` (seção 13) — `name`, `basePath`, `files`, `registryDependencies`, `dependencies`.
- [ ] `npm run build:registry` rodado sem erros — `apps/web/public/r/{name}.json` gerado.
- [ ] `nexus-ui-cli add {name}` testado em projeto separado.
- [ ] `npx nx lint nexus && npx nx test nexus && npx nx build nexus` passam.
