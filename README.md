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
| TypeORM | ^0.3 | ORM |
| SQLite3 | ^5 | Banco de dados |
| Zod | ^4 | Validação de dados |
| dotenv | ^17 | Variáveis de ambiente |
| reflect-metadata | ^0.2 | Metadados para decorators TypeORM |
| ts-node | — | Execução TypeScript em desenvolvimento |
| nodemon | ^3 | Reinício automático em desenvolvimento |

---

## Estrutura do projeto

```
src/
├── config/
│   └── database.ts        # Configuração do DataSource (TypeORM + SQLite)
├── dtos/
│   ├── ICreateUserDTO.ts  # Dados necessários para criar um usuário
│   └── IUpdateUserDTO.ts  # Dados (opcionais) para atualizar um usuário
├── entities/
│   └── user.entity.ts     # Entidade User mapeada pelo TypeORM
├── interfaces/
│   └── users.interface.ts # Interface IUsers (contrato de resposta)
├── routes/
│   └── users.routes.ts    # Rotas de usuários
├── utils/
│   └── getRequiredEnv.ts  # Utilitário para ler variáveis de ambiente obrigatórias
├── app.ts                 # Configuração do Express
└── server.ts              # Ponto de entrada — inicializa banco e sobe servidor
```

---

## Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Criar o arquivo `.env`

```bash
cp .env.example .env
```

Edite o `.env` e defina a porta:

```
PORT=3000
```

---

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia em modo desenvolvimento com nodemon + ts-node |
| `npm run build` | Compila TypeScript para `dist/` |
| `npm start` | Executa o build compilado |

---

## Entidade User

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | UUID | Gerado automaticamente |
| `name` | string | Nome do usuário |
| `email` | string (único) | E-mail do usuário |
| `password` | string | Senha |
| `age` | number | Idade |
| `createdAt` | Date | Preenchido automaticamente na criação |
| `updatedAt` | Date | Atualizado automaticamente a cada modificação |

---

## Observações

- O banco de dados SQLite é criado automaticamente no arquivo `database.sqlite` na raiz do projeto.
- `synchronize: true` no TypeORM sincroniza o schema automaticamente em desenvolvimento. Não usar em produção.