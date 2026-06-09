const express = require('express');
const app = express();

const PORT = 3000;

// Configura o EJS como mecanismo de visualização
app.set('view engine', 'ejs');

// Pasta de arquivos estáticos
app.use(express.static('public'));

// Página inicial
app.get('/', (req, res) => {

    const nome = "Fabio";

    const disciplinas = [
        "Programação II",
        "Banco de Dados",
        "Computação Gráfica"
    ];

    res.render('index', {
        nome,
        disciplinas
    });

});

// Página sobre
app.get('/sobre', (req, res) => {

    res.render('sobre');

});

app.listen(PORT, () => {
    console.log(`Servidor executando em http://localhost:${PORT}`);
});