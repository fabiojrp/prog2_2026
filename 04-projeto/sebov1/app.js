const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const session = require('express-session');

app.use(session({
    secret: 'troque-este-segredo',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 2 } // 2 horas
}));

const appUsuario = require('./rotas/rotas-usuario');
app.use('/usuario', appUsuario);

// disponibiliza a quantidade de itens para o selo do carrinho em todas as views
app.use((req, res, next) => {
    const carrinho = req.session.carrinho || [];
    res.locals.qtdCarrinho = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
    next();
});


const appIndex = require('./rotas/rotas-index');
app.use('/', appIndex);

//importa as rotas admin
const appAdmin = require('./rotas/rotas-admin');
app.use('/admin', appAdmin);

const appLivro = require('./rotas/rotas-livro');
app.use('/livro', appLivro);


const appCarrinho = require('./rotas/rotas-carrinho');
app.use('/carrinho', appCarrinho);



app.get('/livros-categoria', (req, res) => {
    res.render('livros-categoria.ejs');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});