const express = require('express');
const app = express();

const PORT = 3000;

// Permite ler dados de formulários
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
app.use(express.static('public'));

// Configura EJS
app.set('view engine', 'ejs');

// "Banco de dados" em memória
let tarefas = [];

// Página principal
app.get('/', (req, res) => {

    res.render('index', {
        tarefas
    });

});

// Recebe dados do formulário
app.post('/cadastrar', (req, res) => {

    const descricao = req.body.descricao;
    const data = req.body.data;
    const hora = req.body.hora;
    const local = req.body.local;

    tarefas.push({descricao, data, hora, local});

    res.redirect('/');

});

app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});