# Ripple

Diretiva `nRipple` — adiciona o efeito de ondulação (ripple) estilo Material/shadcn a
qualquer elemento, disparado no clique a partir do ponto pressionado.

A animação usa a **Web Animations API** (`element.animate`), portanto é **autocontida**:
não depende de nenhum `@keyframes` global e funciona assim que copiada para o seu projeto.
Por ser apenas DOM/animação, não tem dependências de runtime além do `@angular/core`.

## Uso

Aplique a diretiva em qualquer host. Ela garante automaticamente `position: relative` e
`overflow: hidden` no host (salvo `nRippleUnbounded`).

```html
<div nRipple class="rounded-lg bg-muted p-6">Surface</div>
```

### Em um botão

```html
<button n-button nRipple nRippleColor="rgba(255,255,255,0.6)">Click</button>
```

### Cor customizada

Por padrão o ripple herda `currentColor`. Passe qualquer cor CSS:

```html
<div nRipple nRippleColor="#3b82f6">Azul</div>
```

### Centralizado (icon buttons)

Ignora o ponto do clique e parte sempre do centro:

```html
<button nRipple [nRippleCentered]="true" class="h-12 w-12 rounded-full">★</button>
```

### Unbounded

Não recorta no limite do host — útil para ícones circulares onde o ripple deve transbordar:

```html
<button nRipple [nRippleUnbounded]="true" [nRippleCentered]="true">♥</button>
```

### Desabilitar

```html
<div nRipple [nRippleDisabled]="true">Sem ripple</div>
```
