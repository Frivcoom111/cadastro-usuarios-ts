# Cadastro de Usuários — API REST

API REST de cadastro de usuários desenvolvida com Node.js, Express e TypeORM, usando TypeScript e SQLite como banco de dados.

Projeto acadêmico — 2º Ano de Ferramentas de Frameworks (NodeJS e NestJS) — UniALFA.

---

## Tecnologias

| Tecnologia | Versão | Papel |
|---|---|---|
| Node.js | v24 | Runtime |
| TypeScript | ^6 | Linguagem |
| Express | ^5 | Framework HTTP |
| TypeORM | ^0.3 | ORM + Migrations |
| SQLite3 | ^5 | Banco de dados |
| Zod | ^4 | Validação de DTOs |
| bcrypt | — | Hash de senha |
| dotenv | ^17 | Variáveis de ambiente |
| reflect-metadata | ^0.2 | Metadados para decorators TypeORM |
| ts-node | ^10 | Execução TypeScript em desenvolvimento |
| nodemon | ^3 | Reinício automático em desenvolvimento |

---

## Estrutura do projeto

```
src/
├── config/
│   └── database.ts                 # DataSource TypeORM (SQLite)
├── controllers/
│   └── users.controller.ts         # Camada HTTP — recebe req, devolve res
├── dtos/
│   ├── ICreateUserDTO.ts           # Dados para criar usuário
│   └── IUpdateUserDTO.ts           # Dados (parciais) para atualizar
├── entities/
│   └── users.entity.ts             # Entidade User mapeada pelo TypeORM
├── errors/
│   └── AppError.ts                 # Classe de erro customizada (status + msg)
├── interfaces/
│   ├── users.interface.ts          # Contrato de resposta
│   └── users.repository.interface.ts
├── middlewares/
│   └── errorHandler.middleware.ts  # Captura erros e formata resposta
├── migrations/                     # Migrations geradas pelo TypeORM
├── repositories/
│   └── users.repository.ts         # Acesso ao banco (TypeORM Repository)
├── routes/
│   └── users.routes.ts             # Definição das rotas
├── seeds/
│   └── seed.ts                     # Popula banco com dados iniciais
├── services/
│   └── users.service.ts            # Regras de negócio
├── utils/
│   ├── generateHash.ts             # Hash de senha (bcrypt)
│   └── getRequiredEnv.ts           # Lê env obrigatórias (lança se faltar)
├── validators/
│   └── usersValidators.ts          # Schemas Zod
├── app.ts                          # Configuração do Express
└── server.ts                       # Ponto de entrada — inicializa banco e sobe servidor
```

---

## Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Criar arquivo `.env`

```bash
cp .env.example .env
```

Edite com os valores:

```
PORT=3000
FRONTEND_URL=http://localhost:5173
SALT=10
```

### 3. Criar o banco (rodar migrations)

```bash
npm run migration:run
```

### 4. (Opcional) Popular com dados iniciais

```bash
npm run seed:run
```

### 5. Iniciar em desenvolvimento

```bash
npm run dev
```

---

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `PORT` | Sim | Porta do servidor Express |
| `FRONTEND_URL` | Sim | URL permitida em CORS |
| `SALT` | Sim | Salt rounds do bcrypt (ex: 10) |

Lidas via [src/utils/getRequiredEnv.ts](src/utils/getRequiredEnv.ts) — lança erro se ausente.

---

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia em desenvolvimento (nodemon + ts-node) |
| `npm run build` | Compila TypeScript para `dist/` |
| `npm start` | Executa o build compilado |
| `npm run migration:generate` | Gera nova migration comparando entidades vs banco |
| `npm run migration:run` | Aplica migrations pendentes |
| `npm run migration:revert` | Desfaz a última migration aplicada |
| `npm run migration:show` | Lista migrations e status (`[X]` aplicada, `[ ]` pendente) |
| `npm run seed:run` | Popula o banco com dados iniciais |

---

## Endpoints

Base URL: `http://localhost:3000`

| Método | Rota | Descrição | Body |
|---|---|---|---|
| `GET` | `/users` | Lista todos os usuários | — |
| `GET` | `/users/:id` | Busca usuário por ID | — |
| `POST` | `/users` | Cria novo usuário | `{ name, email, password, age, phone }` |
| `PATCH` | `/users?id=<uuid>` | Atualiza usuário (campos parciais) | `{ ...campos }` |
| `DELETE` | `/users?id=<uuid>` | Remove usuário | — |

### Exemplo — criar usuário

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Carlos",
    "email": "carlos@email.com",
    "password": "123456",
    "age": 22,
    "phone": "44920009152"
  }'
```

---

## Entidade User

| Campo | Tipo | Restrições |
|---|---|---|
| `id` | UUID | Gerado automaticamente |
| `name` | string | Obrigatório |
| `email` | string | Único, obrigatório |
| `password` | string | Hash bcrypt — nunca armazenado em texto puro |
| `age` | number | Obrigatório |
| `phone` | number | Único, obrigatório |
| `createdAt` | Date | Preenchido automaticamente na criação |
| `updatedAt` | Date | Atualizado automaticamente a cada modificação |

---

## Arquitetura — camadas

```
Request → Routes → Controller → Service → Repository → Database
                              ↓
                          Validator (Zod)
                              ↓
                          AppError → ErrorHandler middleware
```

- **Controller** — orquestra request/response, delega para service
- **Service** — regras de negócio (hash de senha, verificação de duplicidade, etc.)
- **Repository** — abstração de acesso ao banco
- **Validator** — valida payload de entrada com Zod
- **AppError** — erro customizado com `statusCode` e mensagem
- **errorHandler middleware** — centraliza tratamento de erros

---

## Migrations

Em vez de `synchronize: true` (perigoso em produção), o projeto usa migrations versionadas.

Fluxo para mudar schema:

```bash
# 1. Edita uma entidade (ex: src/entities/users.entity.ts)
# 2. Gera migration com base na diff
npm run migration:generate

# 3. Aplica
npm run migration:run

# 4. Confere status
npm run migration:show
```

---

## Observações

- O banco SQLite é criado automaticamente no arquivo `database.sqlite` na raiz.
- `synchronize: false` no DataSource — schema é controlado **somente** via migrations.
- Senha **sempre** salva como hash bcrypt — texto puro nunca persiste.
- Imports locais sem extensão `.js` graças a `moduleResolution: bundler` no tsconfig. ts-node roda em CJS via override no `tsconfig.json` (`"ts-node": { "compilerOptions": { "module": "commonjs" } }`).
- Tem que rodar com `ts-node`, **não** `tsx` — esbuild não suporta `emitDecoratorMetadata`, e o TypeORM precisa disso pra inferir tipos das colunas.