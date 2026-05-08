# Textarea

Área de texto multilinha com suporte a formulários reativos, auto-resize e contador de caracteres.

## Uso básico

```html
<n-textarea [(nValue)]="value" nLabel="Mensagem" nPlaceholder="Digite aqui..." />
```

## Com auto-resize

Expande automaticamente conforme o usuário digita, respeitando os limites de linhas.

```html
<n-textarea
  [(nValue)]="value"
  nLabel="Comentário"
  [nAutoResize]="true"
  [nMinRows]="2"
  [nMaxRows]="10"
/>
```

## Com contador de caracteres

```html
<n-textarea
  [(nValue)]="value"
  nLabel="Bio"
  [nCharCount]="true"
  [nMaxLength]="200"
/>
```

## Com formulários reativos

```ts
form = new FormGroup({
  message: new FormControl('', [Validators.required, Validators.maxLength(500)]),
});
```

```html
<form [formGroup]="form">
  <n-textarea
    formControlName="message"
    nLabel="Mensagem"
    nError="Campo obrigatório."
  />
</form>
```

## Controle de resize

```html
<n-textarea nResize="none" />
<n-textarea nResize="vertical" />   <!-- padrão -->
<n-textarea nResize="horizontal" />
<n-textarea nResize="both" />
```

> Quando `nAutoResize="true"`, o resize é desativado automaticamente (`resize-none`).
