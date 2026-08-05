# Programação Web

## Introdução a Linguagem JavaScript

Para começar, vamos aprender os conceitos básicos sobre JavaScript:

 - Diferença entre variáveis `var`, `let` e `const`
 - Tipos de dados primitivos (string, number, boolean, null, undefined)
 - Estruturas de controle (if, else, switch, loops)
 - Funções e escopo (talvez uma introdução a arrow functions)
 - Manipulação de arrays e objetos, incluindo métodos comuns como `map`, `filter` e `reduce`
 - Desestruturação de objetos e arrays (destructuring)

## Projeto com NodeJS e Sqlite3

 - Configuração do ambiente NodeJS
 - Principais Bibliotecas (express, express-session, better-sqlite3/sequelize, body-parser, dotenv, ejs, nodemon, bcryptjs)
 - Bibliotecas Extras (JWT)

 ## Configuração do Git

 ```bash
 git init .
 touch .gitignore
 echo "node_modules/" >> .gitignore
 echo ".env" >> .gitignore
 ```

 ## Comandos iniciais

 ```bash
    npm init -y
    npm install # Instala as dependências do projeto e cria a pasta node_modules
```

### Instalando Bibliotecas

```bash
    npm install express
    npm install -D nodemon
```

### Executando o servidor com nodemon

```bash
    node server.js
    npm run dev

```