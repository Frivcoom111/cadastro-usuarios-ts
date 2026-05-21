# CLAUDE.md

Contexto do projeto para o Claude Code.

## O que é este projeto

API REST de cadastro de usuários para fins acadêmicos (UniALFA). Stack: Node.js v24 + TypeScript + Express v5 + TypeORM + SQLite.

## Comandos essenciais

```bash
npm run dev      # desenvolvimento (nodemon + ts-node)
npm run build    # compila com tsc → dist/
npm start        # roda o build compilado
```

## Arquitetura

- **Ponto de entrada:** `src/server.ts` — inicializa o TypeORM DataSource e sobe o Express
- **App Express:** `src/app.ts` — middlewares globais
- **Banco:** `src/config/database.ts` — DataSource SQLite com `synchronize: true`
- **Entidade:** `src/entities/user.entity.ts` — mapeada pelo TypeORM com decorators
- **DTOs:** `src/dtos/` — `ICreateUserDTO` e `IUpdateUserDTO` (extends Partial do create)
- **Rotas:** `src/routes/users.routes.ts`

## Configuração TypeScript

- `"module": "nodenext"` — ESM com extensões `.js` obrigatórias nos imports locais
- `"emitDecoratorMetadata": true` + `"experimentalDecorators": true` — necessários para TypeORM
- `reflect-metadata` deve ser o **primeiro** import em `src/server.ts`

## Execução em desenvolvimento

O `nodemon.json` usa `ts-node` para executar os arquivos TypeScript diretamente.
O runner deve suportar `emitDecoratorMetadata` (o `tsx`/esbuild não suporta — use `ts-node`).

## Banco de dados

SQLite via TypeORM. O arquivo `database.sqlite` é criado automaticamente na raiz.
`synchronize: true` — o schema é atualizado automaticamente a partir das entidades. Não usar em produção.

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `PORT` | Sim | Porta do servidor Express |

Lidas via `src/utils/getRequiredEnv.ts` — lança erro se estiver ausente ou vazia.

## Convenções

- Interfaces de DTO em `src/dtos/` com prefixo `I` (ex: `ICreateUserDTO`)
- Entidades TypeORM em `src/entities/` com sufixo `.entity.ts`
- Imports locais com extensão `.js` (obrigatório no modo `nodenext`)

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.
