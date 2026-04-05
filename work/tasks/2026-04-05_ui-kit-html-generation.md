# Tasks — UI Kit HTML generation refinement

**Date:** 2026-04-05
**Plan:** `work/plans/2026-04-05_ui-kit-html-generation.md`
**Feature spec:** `work/changes/2026-04-05_feature_ui-kit-html-generation.md`

---

## Task 01 — Atualizar `specs/ui/UI_KIT.md` com arquitetura de marcadores

**Description:**
Substituir o bloco `## HTML artifact template` pelo novo bloco `## HTML artifact` que documenta a arquitetura de marcadores. O CSS/JS completo não fica aqui — o `.md` contém apenas a convenção, a tabela de operações e o template de uma seção de componente.

**Acceptance criteria:**
- O bloco `## HTML artifact template` é renomeado para `## HTML artifact`
- O bloco contém a **convenção de marcadores** das 4 zonas: `kit:shell`, `kit:items`, `kit:item:[nome]`, `kit:fundamentals` — com exemplo de estrutura
- O bloco contém a **tabela de operações**: primeira geração, novo componente, atualizar componente, alterar fundamentos, alterar CSS/JS global — mapeando cada situação à zona a editar
- O bloco contém o **template de seção de componente** (~40 linhas): eyebrow + stitle + sdesc + `.comp-demo` com `state-lbl` por variante + `hint` + `.ann-box` com tokens
- O bloco contém as **regras de geração**:
  - Arquivo: `specs/ui/UI_KIT.html`
  - Nunca gerar silenciosamente — sempre perguntar após alteração no `.md`
  - Na primeira geração: ler `specs/ui/_tokens.md` e usar tokens reais (não placeholders neutros)
  - Após a primeira geração: usar o Edit tool para editar apenas a zona relevante — nunca reescrever o arquivo completo
- O shell (`kit:shell`) é descrito mas não embutido: o agente sabe que deve conter CSS completo (layout, sidebar expansível, hero, sections, rule-blocks, comp-demo, ann-box, badges) + JS (`go`, `toggleSection`, `toggleAnn`) + estrutura HTML base

**Affected files:** `specs/ui/UI_KIT.md`
**Spec reference:** Feature spec — "Arquitetura de marcadores", "Geração automática do artifact", AC #1, #2, #7, #8
**Blockers:** none

---

## Task 02 — Atualizar `.claude/commands/mentor.md`

**Description:**
Refinar o step 11 (UI Kit setup) para: (1) nunca gerar HTML silenciosamente, (2) perguntar após qualquer alteração no `.md`, (3) instruir corretamente sobre como gerar o HTML quando confirmado, (4) adicionar regra de organização por domínio.

**Acceptance criteria:**
- As instruções "Generate the HTML artifact" e "Re-render the artifact after each approval" são removidas do fluxo automático
- Após cada aprovação/adição no `UI_KIT.md`, o step instrui perguntar: "Deseja que eu atualize o `UI_KIT.html`?"
- Se o usuário confirmar e o **arquivo não existir** (primeira geração):
  - Ler `specs/ui/_tokens.md` para obter tokens reais
  - Gerar `specs/ui/UI_KIT.html` completo: shell (CSS + JS + layout + `#agent-rules` com MUST/NEVER/CTX) + zonas com marcadores + componentes e fundamentos
  - Componentes agrupados por domínio semântico no sidebar, cada um com marcador próprio
- Se o usuário confirmar e o **arquivo já existir**:
  - Usar o Edit tool para editar apenas a zona relevante (não reescrever o arquivo inteiro)
  - Novo componente: inserir antes de `<!-- kit:items:end -->`
  - Componente atualizado: substituir entre `<!-- kit:item:[nome]:start -->` e `<!-- kit:item:[nome]:end -->`
- A instrução é explícita: nunca reescrever o arquivo completo após a primeira geração

**Affected files:** `.claude/commands/mentor.md`
**Spec reference:** Feature spec — "Geração automática do artifact", "Estrutura obrigatória do HTML artifact", "Regras de organização dos itens", AC #3, #5, #6, #7
**Blockers:** none

---

## Task 03 — Atualizar `.claude/commands/3a-implement.md`

**Description:**
Adicionar ao gate de aprovação: (1) interações obrigatórias ao renderizar um item, (2) pergunta pós-aprovação sobre atualização do HTML.

**Acceptance criteria:**
- No caso 2 (CREATE) e caso 3 (ALTER), a instrução de renderização explicita que todos os estados e interações do componente devem estar funcionando no artifact — não apenas aparência estática
- A instrução menciona: incluir `state-lbl` para cada variante e `hint` de interação
- Após o usuário aprovar um item e o agente atualizar `UI_KIT.md`, o gate instrui perguntar: "Deseja que eu atualize o `UI_KIT.html`?"

**Affected files:** `.claude/commands/3a-implement.md`
**Spec reference:** Feature spec — "Componentes com interações obrigatórias", "Geração automática do artifact", AC #4, #7
**Blockers:** none

---

## Task 04 — Mirror `.cursor/commands/mentor.md`

**Description:**
Copiar conteúdo atualizado de `.claude/commands/mentor.md` verbatim para `.cursor/commands/mentor.md`.

**Acceptance criteria:**
- `.cursor/commands/mentor.md` é idêntico a `.claude/commands/mentor.md`

**Affected files:** `.cursor/commands/mentor.md`
**Spec reference:** Feature spec — AC #9
**Blockers:** Task 02

---

## Task 05 — Mirror `.cursor/commands/3a-implement.md`

**Description:**
Copiar conteúdo atualizado de `.claude/commands/3a-implement.md` verbatim para `.cursor/commands/3a-implement.md`.

**Acceptance criteria:**
- `.cursor/commands/3a-implement.md` é idêntico a `.claude/commands/3a-implement.md`

**Affected files:** `.cursor/commands/3a-implement.md`
**Spec reference:** Feature spec — AC #9
**Blockers:** Task 03

---

## Execution order

```
01 (UI_KIT.md)        — sem bloqueadores
02 (mentor.md)        — sem bloqueadores
03 (3a-implement.md)  — sem bloqueadores
04 (cursor mirror)    — depende de 02
05 (cursor mirror)    — depende de 03
```

Tasks 01, 02, 03 podem rodar em paralelo.

---

## Implementation notes

_Empty at plan time. Populated during /3a-implement if deviations occur._
