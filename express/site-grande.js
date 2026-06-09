const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {

    res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <title>Minha Primeira Página Express</title>
</head>
<body>

    <h1 class="p-5 bg-primary text-white">Bem-vindo ao Express!</h1>

    <main class="container w-75 m-4">

    <h2>Sobre o projeto</h2>

    <p>
        Este é um exemplo simples criado para demonstrar como retornar uma página HTML utilizando Express.
        Porém, o código dessa forma não fica nada organizado, e de difícil manutenção!
    </p>

    <h2>Lista de Tecnologias</h2>

    <ul>
        <li>Node.js</li>
        <li>Express</li>
        <li>HTML</li>
    </ul>

    <h2>Informações</h2>

    <p>
        O servidor está executando localmente e respondendo
        às requisições feitas para a rota principal.
    </p>

    <p>
        Em aulas futuras poderemos separar o HTML em arquivos,
        utilizar EJS e integrar com banco de dados.
    </p>

    </main>
    <hr>

    <footer>
        <p class="text-center text-muted">
            Programação II - Exemplo Básico Express
        </p>
    </footer>

</body>
</html>
    `);

});

app.listen(PORT, () => {
    console.log(`Servidor executando em http://localhost:${PORT}`);
});