# Feature: UI Kit HTML — refinamento de geração

**Date:** 2026-04-05
**Type:** feature
**Status:** spec-approved

---

## Description

Refinar como o HTML artifact do UI Kit deve ser gerado, especificando:

1. O artifact sempre começa com uma seção de regras para o agente.
2. A organização e agrupamento dos itens segue uma hierarquia por domínio.
3. Todos os componentes devem ser implementados com suas interações (hover, active, disabled, etc.) — nunca estáticos.
4. O template base do HTML artifact é suficientemente rico para guiar qualquer agente, usando o `ui-kit.html` do projeto Tracei como modelo de referência de qualidade.

---

## Expected Behavior

### Estrutura obrigatória do HTML artifact

O artifact gerado a partir de `specs/ui/UI_KIT.md` deve seguir esta estrutura:

```
layout (flex, full height)
├── sidebar (fixed left, sticky, scrollable)
│   ├── logo / wordmark + versão
│   ├── grupo "Para Agentes"
│   │   └── link: Regras para agentes
│   ├── grupo "Componentes"
│   │   └── seções expandíveis por domínio (ex: Buttons, Forms, Navigation, Cards, Feedback)
│   │       └── links para cada componente do grupo
│   ├── grupo "Layouts" (opcional)
│   └── grupo "Fundamentos"
│       ├── Tokens primitivos
│       ├── Tokens semânticos
│       ├── Tipografia
│       ├── Espaçamento
│       └── Motion (se houver)
└── main (scrollable content)
    ├── hero banner (nome do projeto, stack, versão)
    ├── seção: Regras para agentes  ← SEMPRE PRIMEIRA
    │   ├── rule-block MUST (verde) — o que o agente deve sempre fazer
    │   ├── rule-block NEVER (vermelho) — o que o agente nunca deve fazer
    │   └── rule-block CTX (âmbar) — contexto técnico do projeto
    ├── seções de componentes (por domínio)
    │   ├── eyebrow (nome do domínio)
    │   ├── título + descrição
    │   ├── comp-demo interativo (TODOS os estados)
    │   │   ├── label de estado para cada variante
    │   │   └── hint de interação ("Clique para testar")
    │   └── ann-box expansível com tokens usados
    └── seções de fundamentos
        ├── tokens, tipografia, espaçamento, motion
```

### Seção "Regras para agentes" — conteúdo obrigatório

A primeira seção do main deve sempre conter três rule-blocks:

**MUST (sempre fazer):**
- Usar apenas tokens aprovados em `UI_KIT.md` — nunca valores raw (hex, px hardcoded)
- Consultar a seção do componente no UI Kit antes de criar ou editar qualquer elemento
- Implementar todas as variantes e estados documentados (não apenas o happy path)
- Implementar todas as interações documentadas (hover, active, disabled, focus)
- Usar os tokens de motion/animation documentados — nunca valores de duração hardcoded

**NEVER (nunca fazer):**
- Implementar UI elements sem aprovação em `UI_KIT.md`
- Alterar itens `approved` sem aprovação explícita do usuário
- Criar variantes não documentadas sem primeiro adicioná-las ao UI Kit
- Implementar componentes de forma estática quando interações estão especificadas

**CTX (contexto):**
- Stack do projeto (preenchido a partir do contexto do projeto)
- Fonte de verdade dos tokens
- Qualquer restrição técnica relevante

### Regras de organização dos itens

**Sidebar:**
- Componentes agrupados por domínio semântico (ex: "Buttons", "Forms", "Cards", "Navigation", "Feedback")
- Cada grupo é uma seção expansível/colapsável com animação
- "Regras para agentes" sempre como primeiro link, no grupo "Para Agentes"
- "Fundamentos" sempre como último grupo no sidebar

**Main content:**
- Seção "Regras para agentes" sempre primeira, antes de qualquer componente
- Componentes aparecem na mesma ordem que os links do sidebar
- Cada seção de componente tem: eyebrow (domínio) + título + descrição + demo interativo + ann-box de tokens
- Fundamentos (tokens, tipografia, espaçamento) aparecem após todos os componentes

### Componentes com interações obrigatórias

Cada componente documentado no UI Kit deve ser implementado no artifact com **todas as interações visíveis e funcionando**:

- **Estados visuais**: default, hover, active/pressed, disabled, focused, selected/checked
- **Transições**: se o componente tem animação (ex: toggle, modal, swipe), ela deve funcionar no artifact
- **Feedback de interação**: cursores corretos, transform/scale em click, transitions
- Cada estado deve ter um `state-lbl` (label acima) identificando o que está sendo mostrado
- Um `hint` ("Clique para testar", "Arraste para testar") ao final do demo

### Ann-box de tokens

Cada seção de componente deve ter um ann-box expansível listando todos os tokens usados naquele componente:
- Propriedade visual → token semântico/valor
- Permite ao agente saber exatamente quais tokens mapear ao implementar

### Geração automática do artifact — regra de prompt

O agente **nunca gera o HTML artifact automaticamente sem confirmação do usuário**. A regra é:

- Sempre que `specs/ui/UI_KIT.md` for alterado (item aprovado, item adicionado, item alterado), o agente pergunta:
  > "Deseja que eu atualize o `UI_KIT.html`?"
- Só gera ou atualiza o artifact após resposta afirmativa.
- Essa pergunta vale em qualquer comando: `/mentor`, `/3a-implement`, edições manuais via chat.

O arquivo gerado se chama `UI_KIT.html` e fica em `specs/ui/UI_KIT.html`. É sempre gerado a partir do `UI_KIT.md` — nunca mantém estado próprio. Toda vez que o usuário confirma a geração, o arquivo é reescrito do zero a partir do estado atual do `.md`.

Essa regra substitui qualquer instrução anterior que implique geração automática ou regeneração silenciosa.

### Template base atualizado

O template HTML deve incluir:
- CSS completo com as classes: `.layout`, `.sidebar`, `.sb-*`, `.main`, `.hero`, `.section`, `.rule-block`, `.comp-demo`, `.ann-box`, `.state-lbl`, `.hint`
- JavaScript para: `toggleSection()` (grupos expansíveis no sidebar), `toggleAnn()` (ann-box), `go()` (scroll suave + active link), interações específicas de cada componente
- O template deve ser autocontido (sem dependências externas, exceto Google Fonts se o projeto usar)

---

## Acceptance Criteria

1. `specs/ui/UI_KIT.md` contém um template HTML atualizado que inclui: sidebar com grupos expansíveis, hero banner, seção de regras para agentes com 3 rule-blocks, estrutura de seção de componente (eyebrow + title + desc + comp-demo + ann-box), e todas as classes CSS necessárias.
2. O template HTML inclui JavaScript funcional para: navegação com scroll suave, grupos de sidebar expansíveis, ann-boxes expansíveis.
3. As instruções de geração no `mentor.md` explicitam que componentes devem ser implementados com **todos os estados interativos**.
4. As instruções em `3a-implement.md` explicitam que ao renderizar um item no artifact para aprovação, todos os estados e interações do componente devem estar funcionando.
5. A seção "Regras para agentes" é sempre gerada como a primeira seção do main, com os 3 rule-blocks (MUST, NEVER, CTX) populados com as regras e contexto do projeto específico.
6. A organização por domínio (grupos de componentes no sidebar) é documentada como regra de geração.
7. Após qualquer alteração em `UI_KIT.md`, o agente pergunta: "Deseja que eu atualize o `UI_KIT.html`?" — nunca gera o artifact silenciosamente.
8. O arquivo gerado é `specs/ui/UI_KIT.html` — sempre reescrito do zero a partir do `.md` quando o usuário confirma.
9. Os mirrors `.cursor/commands/` são atualizados para refletir as mesmas mudanças.

---

## Rationale

O template atual em `UI_KIT.md` é um scaffold mínimo — suficiente para comunicar a estrutura, mas insuficiente para guiar o agente a gerar um artifact de qualidade real. O modelo do Tracei demonstra o nível correto: componentes com todos os estados interativos, regras explícitas para o agente logo no topo, agrupamento por domínio que facilita navegação.

Sem interações implementadas, o artifact falha no seu propósito: o usuário não consegue validar o comportamento real do componente, apenas sua aparência estática. Com interações, o artifact funciona como uma mini-aplicação de referência — o usuário aprova o comportamento, não só o visual.

A seção de regras para agentes no topo garante que qualquer agente que abra o artifact (ou leia o arquivo) receba as restrições críticas antes de qualquer outra informação.

---

## Spec Artifacts

| Artifact | Action | Reason |
|---|---|---|
| `specs/ui/UI_KIT.md` | UPDATE | Substituir template HTML scaffold por versão rica com sidebar expansível, hero, rule-blocks, comp-demo interativo, ann-box, JS; documentar que o arquivo gerado é `specs/ui/UI_KIT.html` |
| `.claude/commands/mentor.md` | UPDATE | Instruções explícitas: componentes com todos os estados, seção de regras obrigatória, organização por domínio, pergunta obrigatória após alteração do `.md` |
| `.claude/commands/3a-implement.md` | UPDATE | Ao renderizar item: todos os estados e interações devem funcionar; após aprovação perguntar se atualiza o html |
| `.cursor/commands/mentor.md` | UPDATE | Mirror |
| `.cursor/commands/3a-implement.md` | UPDATE | Mirror |

---

## Implementation Notes

_Empty at spec time. Populated during /3a-implement if deviations occur._
