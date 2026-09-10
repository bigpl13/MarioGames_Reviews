# MarioGames Reviews 

Projeto desenvolvido como **trabalho escolar** com o objetivo de praticar a criação de uma aplicação backend utilizando **Node.js, Express e PostgreSQL**.

O projeto consiste em um sistema de cadastro e consulta de **jogos, plataformas e avaliações**. A aplicação permite realizar operações CRUD (criar, consultar, atualizar e excluir) através de uma API.

## Objetivo

O objetivo principal do projeto é colocar em prática conceitos de:

* Desenvolvimento de APIs com Node.js e Express;
* Banco de dados relacional com PostgreSQL;
* Operações CRUD;
* Relacionamento entre tabelas;
* Utilização de chaves primárias e estrangeiras;
* Utilização do Docker para executar a aplicação e o banco de dados.

## Estrutura do banco de dados

O banco de dados possui três tabelas principais:

### Plataformas

Armazena as plataformas disponíveis para os jogos, como PlayStation, Xbox e Nintendo Switch.

### Jogos

Armazena os jogos cadastrados e possui um relacionamento com a tabela `plataformas`.

### Avaliações

Armazena as avaliações dos jogos e possui um relacionamento com a tabela `jogos`.

O relacionamento entre as tabelas pode ser representado da seguinte forma:

```text
PLATAFORMAS  ----->  JOGOS  ----->  AVALIAÇÕES
```

Dessa forma, um jogo pertence a uma plataforma e uma avaliação pertence a um jogo.

## 🛠️ Tecnologias utilizadas

* **Node.js** — ambiente utilizado para executar o backend;
* **Express** — framework utilizado para criação da API;
* **PostgreSQL** — banco de dados relacional;
* **Docker** — utilizado para executar os serviços do projeto;
* **Pgweb** — interface para visualizar e administrar o banco de dados;
* **JavaScript** — linguagem utilizada no desenvolvimento.

## Estrutura do projeto

```text
MarioGames_Reviews/
│
├── src/
│   ├── routes/
│   │   ├── avaliacao.js
│   │   ├── jogo.js
│   │   ├── plataforma.js
│   │   └── rota.js
│   │
│   ├── static/
│   │   ├── index.html
│   │   └── style.css
│   │
│   ├── db.js
│   └── index.js
│
├── Dockerfile
├── docker-compose.yml
├── init.sql
├── package.json
└── README.md
```

## Como executar

É necessário ter o **Docker** instalado no computador.

Primeiro, abra o terminal na pasta do projeto:

```bash
cd MarioGames_Reviews
```

Depois, execute:

```bash
docker compose up --build -d
```

Após os containers serem iniciados, a aplicação poderá ser acessada em:

```text
http://localhost:3000
```

O Pgweb, utilizado para visualizar o banco de dados, estará disponível em:

```text
http://localhost:8081
```

## Rotas principais

A API possui as seguintes rotas:

| Rota          | Função                        |
| ------------- | ----------------------------- |
| `/plataforma` | Gerenciamento das plataformas |
| `/jogo`       | Gerenciamento dos jogos       |
| `/avaliacao`  | Gerenciamento das avaliações  |
| `/hello`      | Rota utilizada para teste     |

As rotas de plataformas, jogos e avaliações possuem operações de **CRUD**, permitindo criar, consultar, atualizar e excluir registros.

## Banco de dados

O arquivo `init.sql` é responsável pela criação das tabelas e pela inserção de alguns dados iniciais para testes.

O PostgreSQL é executado através do Docker Compose, permitindo que o projeto seja executado de maneira semelhante em diferentes computadores.

## Trabalho escolar

Este projeto foi desenvolvido para fins **educacionais**, com o objetivo de aplicar na prática os conhecimentos estudados sobre desenvolvimento backend, APIs, bancos de dados relacionais e Docker.

---

**MarioGames Reviews — Projeto acadêmico**
