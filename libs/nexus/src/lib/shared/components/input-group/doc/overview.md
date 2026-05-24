# Input Group

Agrupa um campo de texto com addons (texto, ícones ou botões) antes e/ou depois do controle.

## Uso

```typescript
import { InputGroupComponent, InputGroupControlDirective } from '@/components/input-group';
```

```html
<n-input-group nAddonBefore="https://">
  <input nInputGroup type="text" placeholder="dominio.com" />
</n-input-group>
```

## Exemplos

### Addon de texto

```html
<n-input-group nAddonBefore="@" nAddonAfter=".com">
  <input nInputGroup type="text" placeholder="usuario" />
</n-input-group>
```

### Addon com ícone (TemplateRef)

```html
<n-input-group [nAddonBefore]="mailIcon">
  <input nInputGroup type="email" placeholder="seu@email.com" />
</n-input-group>

<ng-template #mailIcon>
  <svg ...>...</svg>
</ng-template>
```

### Addon com botão

```html
<n-input-group [nAddonAfter]="searchBtn">
  <input nInputGroup type="search" placeholder="Pesquisar..." />
</n-input-group>

<ng-template #searchBtn>
  <button n-button nVariant="ghost" nSize="sm">Buscar</button>
</ng-template>
```

### Campo com limpeza (nClearable)

```html
<n-input-group nClearable>
  <input nInputGroup type="text" [(ngModel)]="value" placeholder="Digite algo..." />
</n-input-group>
```

O botão X aparece quando há valor. Ao clicar, limpa o campo e dispara o evento `input` — compatível com `ngModel` e `formControlName`.

### Campo com cópia (nCopyable)

```html
<n-input-group nCopyable nAddonBefore="Token">
  <input nInputGroup type="text" [value]="apiKey" readonly />
</n-input-group>
```

### Textarea com addons em bloco

Addons com textarea são posicionados automaticamente acima/abaixo do controle:

```html
<n-input-group nAddonBefore="Nota" nAddonAfter="máx. 500 caracteres">
  <textarea nInputGroup rows="4" placeholder="Descrição..."></textarea>
</n-input-group>
```

### Integração com formulários reativos

O `n-input-group` é um wrapper visual — o `formControlName` fica no input projetado:

```html
<form [formGroup]="form">
  <n-input-group nAddonBefore="R$">
    <input nInputGroup type="number" formControlName="preco" />
  </n-input-group>
</form>
```
