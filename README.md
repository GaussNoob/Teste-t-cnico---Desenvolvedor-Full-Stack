# Teste Técnico - Desenvolvedor Full Stack

## Objetivo

Sistema de controle de gastos residenciais separado em:

- `backend/` -> Web API em C#/.NET
- `frontend/` -> Interface em React + TypeScript

Persistência em SQLite (`backend/GastosApi/Banco.db`), mantendo dados após reinício.

## Tecnologias

- Backend: .NET 10, ASP.NET Core Web API, Entity Framework Core, SQLite
- Frontend: React, TypeScript, Vite
- Persistência: SQLite local

## Como executar

### Backend

```bash
cd backend/GastosApi
dotnet tool restore
dotnet ef database update
dotnet run
```

API padrão: `http://localhost:5252`

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Arquivo `.env` do frontend:

```env
VITE_API_URL=http://localhost:5252/api
```

## Regras de negócio implementadas

### 1) Cadastro de pessoas

- Criação, edição, exclusão e listagem.
- Campos: `Id` (Guid automático), `Nome` (máx. 200), `Idade`.
- Exclusão de pessoa remove transações relacionadas (cascade delete).

### 2) Cadastro de categorias

- Criação e listagem.
- Campos: `Id` (Guid automático), `Descricao` (máx. 400), `Finalidade` (`despesas`, `receitas`, `ambas`).

### 3) Cadastro de transações

- Criação e listagem.
- Campos: `Id`, `Descricao` (máx. 400), `Valor` (> 0), `Tipo`, `CategoriaId`, `PessoaId`.
- Validações de negócio:
  - Menor de idade (`< 18`) não pode lançar receita.
  - Categoria deve ser compatível com o tipo da transação.

### 4) Totais por pessoa

- Endpoint e tela de consulta com:
  - total de receitas por pessoa
  - total de despesas por pessoa
  - saldo por pessoa
- Rodapé com total geral de receitas, despesas e saldo líquido.

## Arquitetura e organização

- DTOs para entrada/saída de dados.
- Controllers com validações de regra de negócio.
- Repositories para abstração de acesso a dados.
- Frontend organizado por `pages`, `services`, `types` e `utils`.
- URL da API centralizada em `frontend/src/services/api.ts`.
- Tratamento padronizado de erro no frontend (`utils/error.ts`).

## Observações

- O item "totais por categoria" foi tratado como opcional e não faz parte da entrega atual.
- Não existem referências a "Maxiprod" no código-fonte.
- Fiquei um pouco confuso na questão das enumerações, por isso acabei criando dois enums.
- Como não foi citada nenhuma forma de persistência, utilizei o SQLite, mas considerei bastante o uso do PostgreSQL; no entanto, acredito que isso poderia dificultar os testes da aplicação, já que o SQLite não exige instalação.
- Alguns comentários podem ter ficado sem acentuação, pois meu teclado é em inglês e posso ter deixado passar alguns detalhes.
- Os comentários iniciais foram mais verbosos, pois eu estava descrevendo praticamente tudo o que estava implementando; depois, reduzi essa quantidade.
- Além disso, gostaria de dizer que faz um tempo que não utilizo React e estou um pouco enferrujado; por isso, peço desculpas por eventuais erros cometidos.
- Embora não tenha sido solicitado, utilizei Docker para evitar problemas com dependências.

## Execução com Docker (sem instalar versões locais de Node/.NET)

Pré-requisito: Docker + Docker Compose.

Na raiz do projeto:

```bash
docker compose up --build
```

Acessos:

- Frontend: `http://localhost:5173`
- Backend (opcional direto): `http://localhost:5252`

Observações:

- O frontend faz proxy de `/api` para o backend dentro da rede Docker.
- O banco SQLite fica persistido em volume Docker (`backend_data`).
