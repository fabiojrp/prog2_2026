const express = require('express');
const app = express();

const PORT = 3000;
// Permite ler dados de formulários
app.use(express.urlencoded({ extended: true }));

// Configura o EJS como mecanismo de visualização
app.set('view engine', 'ejs');

// Pasta de arquivos estáticos
app.use(express.static('public'));

// Página inicial
app.get('/', (req, res) => {
    res.render('index');
});

// Página interna
app.get('/login/:nome', (req, res) => {

    const nome = req.params.nome;

    res.render('logado', { nome });

});

app.get('/login', (req, res) => {

    const nome = "Zé";

    res.render('logado', { nome });

});

app.post('/form-nome', (req, res) => {

    const nome = req.body.nome
    res.render('logado', { nome });

});

app.listen(PORT, () => {
    console.log(`Servidor executando em http://localhost:${PORT}`);
});