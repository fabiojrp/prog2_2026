const express = require('express');
const app = express();
// Configura o EJS como mecanismo de visualização
app.set('view engine', 'ejs');
// Pasta de arquivos estáticos
app.use(express.static('public'));
// Permite ler dados de formulários
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;


// Página inicial
app.get('/', (req, res) => {
    res.render('formulario');
});

const nomes = []; // Array para armazenar os nomes cadastrados
app.post('/cadastro', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    nomes.push({ nome, email }); //adiciona o nome e email ao array de nomes
    res.render('logado', { nome, email });
});


app.get('/lista-nomes', (req, res) => {
    res.render('lista-nomes', { nomes });
});

app.listen(PORT, () => {
    console.log(`Servidor executando em http://localhost:${PORT}`);
});