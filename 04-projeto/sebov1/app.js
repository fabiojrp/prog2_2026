const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const appIndex = require('./rotas/rotas-index');
app.use('/', appIndex);

//importa as rotas admin
const appAdmin = require('./rotas/rotas-admin');
app.use('/admin', appAdmin);

// const appLivro = require('./rotas/rotas-livro');
// app.use('/livro', appLivro);

app.get('/livro', (req, res) => {
    res.render('livro-html.ejs');
});

app.get('/livros-categoria', (req, res) => {
    res.render('livros-categoria.ejs');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});