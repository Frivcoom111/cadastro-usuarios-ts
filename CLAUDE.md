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