# API

## `[nRipple]` (RippleDirective)

Diretiva de atributo. Aplique em qualquer elemento.

### Inputs

| Input | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `nRippleColor` | `string` | `'currentColor'` | Cor do ripple. Aceita qualquer cor CSS. |
| `nRippleDuration` | `number` | `500` | Duração da animação em milissegundos. |
| `nRippleDisabled` | `boolean` | `false` | Desliga o efeito. |
| `nRippleCentered` | `boolean` | `false` | Origem sempre no centro do host (ignora o ponto do clique). |
| `nRippleUnbounded` | `boolean` | `false` | Não aplica `overflow: hidden` — o ripple pode transbordar o host. |

### Comportamento

- Dispara em `pointerdown` apenas para o botão primário (`event.button === 0`).
- Garante `position: relative` no host quando ele é `static`.
- Aplica `overflow: hidden` no host, salvo quando `nRippleUnbounded` é `true`.
- Cada ripple é removido do DOM ao fim da animação; animações pendentes são canceladas no destroy.

### data-slot

| Slot | Elemento |
|------|----------|
| `ripple` | `<span>` injetado por clique (efeito visual, `aria-hidden`). |
