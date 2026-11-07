# 🛠️ Case Web - Sistema de Chamados de TI (case-web-chamadosTI)

Sistema para gerenciamento de chamados técnicos de TI, permitindo cadastro, visualização, atualização e exclusão de perfis e controle de chamados.


## 📁 Estrutura do Projeto

```text
case-web/
├── README.md                      # Documentação principal do projeto
│
├── backend/                       # API REST em Node.js
│   ├── docker-compose.yml         # Configuração do PostgreSQL conteinerizado
│   ├── knexfile.js                # Configurações de conexão e migrations do Knex
│   ├── package.json               # Dependências e scripts do backend
│   ├── .env                       # Variáveis de ambiente locais (não versionar)
│   ├── .env.example               # Modelo de variáveis de ambiente
│   └── src/
│       ├── server.js              # Inicialização do servidor Express
│       ├── controller/            # Controladores de rotas e requisições HTTP
│       ├── database/              # Conexão Knex e migrations do banco
│       ├── middleware/            # Middlewares da aplicação
│       ├── routes/                # Definição das rotas REST
│       └── services/              # Regras de negócio e operações no banco
│
└── frontend/case-web-chamadosTI/  # Aplicação Frontend em React + Vite
    ├── index.html                 # Template HTML base
    ├── package.json               # Dependências e scripts do frontend
    ├── vite.config.js             # Configurações do Vite
    └── src/
        ├── main.jsx               # Ponto de entrada com rotas e Bootstrap
        ├── index.css              # Estilos globais da aplicação
        ├── components/            # Componentes reutilizáveis
        └── pages/                 # Páginas da aplicação
```

---

## 📋 Pré-requisitos

Para rodar este projeto localmente, certifique-se de possuir:
* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [Git](https://git-scm.com/)
* [Docker Desktop](https://www.docker.com/) rodando **OU** [PostgreSQL](https://www.postgresql.org/) instalado localmente na porta `5432`.

---

## ⚙️ Passo a Passo para Inicialização

### 1. Clonar o Repositório
```bash
git clone <URL_DO_REPOSITORIO>
cd case-web
```

---

### 2. Configurar o Banco de Dados (PostgreSQL)

Você pode rodar o banco de dados via **Docker Compose** ou utilizando uma instalação local do PostgreSQL:

#### Opção A: Via Docker Compose
Certifique-se de que o **Docker Desktop** está aberto e em execução. Na pasta `backend`:
```bash
cd backend
docker compose up -d
```
*Isso criará e iniciará um container PostgreSQL 16 com o banco `chamados` na porta padrão `5432`.*

#### Opção B: Via PostgreSQL Local
Se você já possui o PostgreSQL instalado e rodando na sua máquina:
1. Certifique-se de que o serviço do PostgreSQL está ativo.
2. Crie a base de dados chamada **`chamados`**:
   ```sql
   CREATE DATABASE chamados;
   ```

---

### 3. Configurar e Executar o Backend

1. Na pasta `backend`:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie o arquivo `.env` com base no `.env.example`
  
   *Se necessário, altere as credenciais de usuário/senha no `.env` para corresponder ao seu banco.*

4. Execute as migrations para criar as tabelas no banco de dados:
   ```bash
   npm run migrate
   ```

5. Inicie o servidor da API:
   ```bash
   npm run dev
   ```
   *O backend estará acessível em: **`http://localhost:3000`**.*

---

### 4. Configurar e Executar o Frontend

1. Em um novo terminal, navegue até a pasta do frontend:
   ```bash
   cd frontend/case-web-chamadosTI
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse no navegador:
   * **`http://localhost:5173`**

---

## 📜 Scripts Disponíveis

### Backend (`/backend`)
* `npm run dev`: Inicia o servidor com hot-reload (`node --watch`).
* `npm start`: Inicia o servidor em modo de produção.
* `npm run migrate`: Executa todas as migrations pendentes no banco.
* `npm run migrate:rollback`: Desfaz o último lote de migrations.

### Frontend (`/frontend/case-web-chamadosTI`)
* `npm run dev`: Inicia o servidor de desenvolvimento Vite.
* `npm run build`: Gera o build otimizado para produção na pasta `dist/`.
* `npm run preview`: Visualiza o build de produção localmente.