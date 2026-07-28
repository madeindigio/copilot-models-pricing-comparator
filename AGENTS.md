# Agent Guide - Model Pricing Comparison

## What is this project
LLM price comparison table (GitHub Copilot, OpenRouter). Stack: **React 19 + TypeScript + Vite**. Static data in `src/data/models.ts`, UI in `src/App.tsx`, styles in `src/index.css`.

## MANDATORY operating rules for AI agents

These rules are **MANDATORY** for every task, including small or one-line changes. When a rule conflicts with a shortcut, the rule wins.

### 1. MANDATORY: gather context before starting any task
Before writing or changing anything, recover relevant context first:
1. Search the KB with `kb_search_documents` (or `hybrid_search_remembrances` for combined sessions/code/results). Start **without** tags for broad context; use tags only to narrow deliberately.
2. Follow linked KB documents through `[[wiki links]]`. Use `kb_get_document` and `kb_related_documents` to hop from the best match to related docs before running a new search.
3. Use code intelligence tools to understand the codebase: `code_get_symbols_overview`, `code_find_symbol`, `code_hybrid_search`, and `code_search_pattern`.
4. Use `recall` only when you already know the key you are looking for.
If no relevant context exists after searching, state that briefly and proceed.

### 2. MANDATORY: external research when the answer is not in the repo
When required knowledge is not in the repo or KB, research it instead of guessing:
- Library/framework/API usage → use `c7_resolve_library_id` + `c7_get_library_docs`.
- General facts, current events, error messages → use web search tools and `fetch` to read sources; cross-check load-bearing facts.
- Frontend/UI verification → use browser tools (`browser_navigate`, `browser_get_content`, `browser_evaluate`, `browser_click`, `browser_screenshot`, `browser_console_logs`) to drive and observe the page.

### 3. MANDATORY: plan before non-trivial work
For anything larger than a trivial change:
- Break work into phases, each independently testable.
- Save the plan with `kb_add_document` under `models-pricing-comparison/plans/<slug>_plan.md`.
- Search first to confirm no conflicting plan exists; if unsure, pause and confirm direction with the user.
- Update the plan as phases complete.

### 4. MANDATORY: implement in small, verified increments
- Work in small, testable increments.
- After each increment, run `npm run build` (and `npm run lint` when code was edited) before moving on.
- Match surrounding code style, naming, and idioms.
- Only report a step as done after verifying it (build succeeded, behavior observed). If skipped or failed, say so with evidence.

### 5. MANDATORY: document every change in the knowledge base
After every modification, fix, or refactor, record a summary with `kb_add_document`:
- What changed, files/symbols touched, why, and how it was verified.
- Store under `models-pricing-comparison/changes/<slug>.md` (or `fixes/` / `features/` when applicable).
- Link related docs with `[[filePath|label]]` or `[[concept]]` to keep the KB graph connected.
- If a related document already exists, update it rather than duplicate.

### 6. Choosing the right memory tool
- `remember` / `recall` — only for short, durable facts identified by a known key (e.g. `project.test_command`).
- `kb_add_document` / `kb_search_documents` — for all plans, analyses, and structured documentation; also the primary source for pre-task context recovery.

### 7. General conduct
- Use **English** for code, comments, and documentation.
- Parallelize independent work only when context is preserved.
- Confirm before actions that are hard to reverse or outward-facing, unless durably authorized.

## Main commands
- `npm run dev` — Vite development server
- `npm run build` — TypeScript check + production build
- `npm run lint` — ESLint
- `npm run preview` — preview build

## Conventions
- **Strict TypeScript** code (`tsconfig.app.json`).
- React function components; standard hooks (`useState`, `useMemo`).
- Manual styles in `index.css`, dark theme. Providers and categories use CSS variables.
- Key types: `Provider`, `Category`, `Source`, `ModelPricing` in `src/data/models.ts`.

## How to add or update models
1. Look up data at `https://models.dev/api.json` (see `docs/how-to-update-model-pricing-from-modelsdev.md` for filtering examples).
2. Add an entry to the `models` array in `src/data/models.ts`.
3. If it is a new provider:
   - Add it to the `Provider` type.
   - Add a color in `providerColors` (`src/data/models.ts`).
   - Create a CSS variable and class `.provider-badge.provider-<slug>` in `src/index.css`.
   - Add it to the `providers` array in `src/App.tsx` for the filter.
4. Run `npm run lint && npm run build` before considering it done.

## Critical files
| File | Purpose |
|---------|-----------|
| `src/data/models.ts` | Data and types for all models |
| `src/App.tsx` | Table, filters, sorting, non-frontier models dropdown |
| `src/index.css` | Provider/category variables and classes |
| `docs/how-to-update-model-pricing-from-modelsdev.md` | Detailed pricing update guide |

## Things to avoid
- Do not convert data to backend/DB without consensus: it remains static.
- Do not break the `Provider` type or its associated CSS classes.
- Do not skip `npm run build` after changing types or adding models.
