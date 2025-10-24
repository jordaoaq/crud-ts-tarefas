# API de Gerenciamento de Tarefas (CRUD em TypeScript)

Este repositório contém uma API REST desenvolvida em Node.js e TypeScript para gerenciar uma lista de tarefas. O projeto implementa as operações fundamentais de CRUD (Create, Read, Update, Delete) e serve como um exemplo prático de construção de APIs com essas tecnologias.

## 🚀 Visão Geral do Projeto

O objetivo principal é fornecer endpoints claros e funcionais para:

* Criar novas tarefas.
* Listar todas as tarefas cadastradas.
* Obter detalhes de uma tarefa específica por seu ID.
* Atualizar o conteúdo ou o status de uma tarefa.
* Remover uma tarefa do sistema.

## 🛠️ Tecnologias Utilizadas

* **[Node.js](https://nodejs.org/en/)**: Ambiente de execução para o servidor.
* **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
* **[Express.js](https://expressjs.com/pt-br/)**: Framework web para a criação do servidor e gerenciamento de rotas.
* **[ts-node-dev](https://github.com/wclr/ts-node-dev)**: Utilitário para executar o TypeScript em modo de desenvolvimento com *hot-reload*.

---

## ⚙️ Instalação e Execução Local

Para executar este projeto em sua máquina local, siga os passos abaixo.

### Pré-requisitos

* [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
* [Git](https://git-scm.com/)
* [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/jordaoaq/crud-ts-tarefas.git
    ```

2.  **Acesse o diretório do projeto:**
    ```bash
    cd crud-ts-tarefas
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

4.  **Execute o servidor:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

Após a execução, o servidor estará disponível no endereço `http://localhost:3000`.

---

## 📡 Documentação da API (Endpoints)

A API segue os padrões RESTful.

**URL Base:** `http://localhost:3000`

---

### 1. Criar Tarefa

Cria uma nova tarefa.

* **Método:** `POST`
* **Endpoint:** `/tarefas`
* **Corpo da Requisição (Body):**
    ```json
    {
      "titulo": "Título da Tarefa",
      "descricao": "Descrição opcional da tarefa."
    }
    ```
* **Resposta (Sucesso: 201 Created):**
    ```json
    {
      "id": 1,
      "titulo": "Título da Tarefa",
      "descricao": "Descrição opcional da tarefa.",
      "concluida": false
    }
    ```

---

### 2. Listar Todas as Tarefas

Retorna um array com todas as tarefas cadastradas.

* **Método:** `GET`
* **Endpoint:** `/tarefas`
* **Corpo da Requisição:** Nenhum.
* **Resposta (Sucesso: 200 OK):**
    ```json
    [
      {
        "id": 1,
        "titulo": "Título da Tarefa",
        "descricao": "Descrição opcional da tarefa.",
        "concluida": false
      },
      {
        "id": 2,
        "titulo": "Outra Tarefa",
        "descricao": "Outra descrição.",
        "concluida": true
      }
    ]
    ```

---

### 3. Obter Tarefa por ID

Retorna os dados de uma tarefa específica.

* **Método:** `GET`
* **Endpoint:** `/tarefas/:id`
* **Exemplo:** `/tarefas/1`
* **Corpo da Requisição:** Nenhum.
* **Resposta (Sucesso: 200 OK):**
    ```json
    {
      "id": 1,
      "titulo": "Título da Tarefa",
      "descricao": "Descrição opcional da tarefa.",
      "concluida": false
    }
    ```
* **Resposta (Erro: 404 Not Found):**
    ```json
    {
      "erro": "Tarefa não encontrada"
    }
    ```

---

### 4. Atualizar Tarefa

Atualiza os dados de uma tarefa existente.

* **Método:** `PUT`
* **Endpoint:** `/tarefas/:id`
* **Exemplo:** `/tarefas/1`
* **Corpo da Requisição (Body):**
    ```json
    {
      "titulo": "Título Atualizado",
      "descricao": "Descrição atualizada.",
      "concluida": true
    }
    ```
* **Resposta (Sucesso: 200 OK):** O objeto da tarefa com os dados atualizados.

---

### 5. Excluir Tarefa

Remove uma tarefa do sistema.

* **Método:** `DELETE`
* **Endpoint:** `/tarefas/:id`
* **Exemplo:** `/tarefas/1`
* **Corpo da Requisição:** Nenhum.
* **Resposta (Sucesso: 204 No Content):** Nenhuma resposta no corpo.

