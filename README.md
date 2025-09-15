# Task API

API REST para gerenciamento de tarefas, construída com **Node.js**, **Express** e **MongoDB (Mongoose)**.

O projeto segue boas práticas de arquitetura, com controllers, services, models e middleware de tratamento global de erros.

---

### Tecnologias utilizadas

-   Node.js
-   Express
-   MongoDB
-   Mongoose
-   Dotenv

---

### Estrutura do projeto

```
src/
 ├── app.js                # Configuração do app Express
 ├── server.js             # Inicialização do servidor
 ├── database/
 │    └── mongoose.database.js  # Conexão com o MongoDB
 ├── models/
 │    └── task.model.js    # Definição do schema Task
 ├── controllers/
 │    └── task.controller.js   # Controladores da API
 ├── services/
 │    └── taskService.js  # Regras de negócio
 ├── routes/
 │    └── task.routes.js   # Rotas da aplicação
 └── middlewares/
      └── errorHandler.js  # Middleware global de erros
```

---

### Instalação e execução

1. Clone este repositório:

```bash
git clone https://github.com/thiaguss/TaskManager.git
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo .env na raiz do projeto:

```ini
PORT=3000
MONGO_URI=mongodb://localhost:27017/tasksdb
```

4. Inicie o servidor:

```bash
npm run start:dev
```

O servidor estará rodando em: http://localhost:3000

---

### Endpoints da API

**Criar uma nova tarefa**

```
POST /tasks
```

**Body (JSON):**

```json
{
    "description": "Estudar Node.js"
}
```

**Listar todas as tarefas**

```
GET /tasks
```

**Buscar uma tarefa por ID**

```
GET /tasks/:id
```

**Atualizar uma tarefa**

```
PATCH /tasks
```

**Body (JSON):**

```json
{
    "isCompleted": true
}
```

**Deletar uma tarefa**

```
DELETE /tasks/:id
```

---

### Tratamento de erros

A API retorna erros padronizados no formato JSON:

```json
{
    "error": "Mensagem descritiva do erro"
}
```

Exemplos:

-   `400` → ID inválido ou dados incorretos
-   `404` → Task não encontrada
-   `500` → Erro interno do servidor
