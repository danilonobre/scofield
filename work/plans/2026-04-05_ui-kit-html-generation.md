# Implementation Plan — UI Kit HTML generation refinement

**Date:** 2026-04-05
**Feature spec:** `work/changes/2026-04-05_feature_ui-kit-html-generation.md`
**Tasks file:** `work/tasks/2026-04-05_ui-kit-html-generation.md`

---

## UI Kit delta

Nenhum. Este pack altera arquivos de spec e comandos — nenhum elemento de UI de projeto é implementado.

---

## Phases and dependencies

```
Phase 1: specs/ui/UI_KIT.md    — spec de marcadores + template de seção (no deps)
Phase 2: mentor.md             — regras de geração + marcadores + pergunta (no deps)
Phase 3: 3a-implement.md       — interações obrigatórias + pergunta pós-aprovação (no deps)
Phase 4: mirrors .cursor/      — depende de Phase 2 e 3
```

Phases 1, 2, 3 são independentes. Phase 4 depende de 2 e 3.

---

## Phase 1 — Atualizar `specs/ui/UI_KIT.md`

### Decisão arquitetural

Adotar arquitetura de marcadores para o `UI_KIT.html`. O CSS/JS completo **não** fica em `UI_KIT.md` — fica no `UI_KIT.html` gerado, dentro da zona `kit:shell`. O `.md` contém apenas:
1. A convenção de marcadores de zona
2. A tabela de operações por situação
3. O template de uma seção de componente (~40 linhas)
4. As regras de geração/edição

### Estrutura de marcadores do `UI_KIT.html`

```
<!-- kit:shell:start -->
  CSS completo + JS (go, toggleSection, toggleAnn)
  layout: sidebar com 4 grupos, hero, #agent-rules com rule-blocks MUST/NEVER/CTX
<!-- kit:shell:end -->

<!-- kit:items:start -->
  <!-- kit:item:NomeComponente:start -->
    <section id="nome-componente">...</section>
  <!-- kit:item:NomeComponente:end -->
<!-- kit:items:end -->

<!-- kit:fundamentals:start -->
  tokens, tipografia, espaçamento, motion
<!-- kit:fundamentals:end -->
```

### Tabela de operações

| Operação | O que editar |
|---|---|
| Primeira geração | Escrever arquivo completo (shell rico + zonas vazias) |
| Novo componente | Edit: inserir `kit:item:[nome]` antes de `kit:items:end` |
| Atualizar componente | Edit: substituir entre `kit:item:[nome]:start` e `kit:item:[nome]:end` |
| Alterar fundamentos | Edit: substituir `kit:fundamentals` |
| Alterar CSS/JS global | Edit: substituir `kit:shell` |

### Template de seção de componente (em `UI_KIT.md`)

O único HTML que o agente precisa saber de cor — o shape completo de uma `<section>`:
- eyebrow (grupo/domínio)
- stitle + sdesc
- `.comp-demo` com state-lbl por variante + hint de interação
- `.ann-box` com tokens do componente

### Regras de geração adicionadas ao arquivo

- O arquivo gerado é `specs/ui/UI_KIT.html`
- O agente **nunca** gera silenciosamente — pergunta após qualquer alteração no `.md`
- Na primeira geração: ler `specs/ui/_tokens.md` e substituir cores placeholder pelos tokens reais
- Ao editar: usar o Edit tool — nunca reescrever o arquivo inteiro

**Arquivos afetados:** `specs/ui/UI_KIT.md` (UPDATE)

---

## Phase 2 — Atualizar `.claude/commands/mentor.md`

### O que muda no step 11

1. **Remover** instruções de geração automática: "Generate the HTML artifact" e "Re-render the artifact after each approval" saem do fluxo.

2. **Após qualquer alteração no `UI_KIT.md`** (aprovação ou adição de item): perguntar:
   > "Deseja que eu atualize o `UI_KIT.html`?"

3. **Se o usuário confirmar e o arquivo não existir** (primeira geração):
   - Ler `specs/ui/_tokens.md` para obter tokens reais
   - Gerar `specs/ui/UI_KIT.html` completo: shell rico (CSS + JS + layout + #agent-rules) + zonas com marcadores
   - #agent-rules populado com regras e contexto do projeto (MUST/NEVER/CTX)
   - Componentes e fundamentos dentro das zonas corretas, cada componente com marcador próprio

4. **Se o usuário confirmar e o arquivo já existir** (atualização):
   - Usar o Edit tool para editar apenas a zona relevante (não reescrever o arquivo inteiro)
   - Novo componente → inserir antes de `kit:items:end`
   - Componente atualizado → substituir sua zona `kit:item:[nome]`

5. **Organização**: componentes agrupados por domínio semântico no sidebar (grupos expansíveis). Cada componente com todos os estados interativos + hint de interação.

**Arquivos afetados:** `.claude/commands/mentor.md`

---

## Phase 3 — Atualizar `.claude/commands/3a-implement.md`

### O que muda no gate de aprovação

1. **Interações obrigatórias** ao renderizar para aprovação (casos CREATE e ALTER):
   - Todos os estados e interações devem funcionar — não apenas aparência estática
   - Incluir `state-lbl` para cada variante + `hint` de interação

2. **Após aprovação e atualização do `UI_KIT.md`**:
   - Se `UI_KIT.html` já existe: usar Edit tool para inserir/atualizar apenas a zona do componente aprovado
   - Perguntar: "Deseja que eu atualize o `UI_KIT.html`?" antes de fazer qualquer edição no arquivo

**Arquivos afetados:** `.claude/commands/3a-implement.md`

---

## Phase 4 — Mirrors `.cursor/commands/`

Copiar verbatim:
- `.cursor/commands/mentor.md`
- `.cursor/commands/3a-implement.md`

---

## Technical risks

- **Agente ignorar marcadores e reescrever tudo**: a instrução deve ser explícita — "use o Edit tool para editar apenas a zona relevante, nunca reescreva o arquivo completo após a primeira geração".

- **Tokens reais na primeira geração**: o agente deve ler `specs/ui/_tokens.md` antes de gerar o shell. Se o arquivo não existir, usar placeholders neutros e avisar o usuário.

---

## All files created or modified

| File | Action |
|---|---|
| `specs/ui/UI_KIT.md` | UPDATE |
| `.claude/commands/mentor.md` | UPDATE |
| `.claude/commands/3a-implement.md` | UPDATE |
| `.cursor/commands/mentor.md` | UPDATE |
| `.cursor/commands/3a-implement.md` | UPDATE |
