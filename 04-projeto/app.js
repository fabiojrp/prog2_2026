const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let categorias = [
    { id: 1, nome: 'Informática', descricao: 'Computadores e acessórios' },
    { id: 2, nome: 'Eletrônicos', descricao: 'Produtos eletrônicos' },
    { id: 3, nome: 'Games', descricao: 'Jogos e consoles' }
];

let produtos = [
    { id: 1, codigo: 'PROD001', nome: 'Notebook Lenovo', categoria: 'Informática', preco: 3499.90, estoque: 12 },
    { id: 2, codigo: 'PROD002', nome: 'Mouse Gamer', categoria: 'Games', preco: 149.90, estoque: 35 },
    { id: 3, codigo: 'PROD003', nome: 'Teclado Mecânico', categoria: 'Informática', preco: 299.90, estoque: 4 }
];

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/produtos', (req, res) => {
    res.render('produtos/lista', { produtos });
});

app.get('/produtos/cadastrar', (req, res) => {
    res.render('produtos/cadastro', { categorias });
});

app.post('/produtos/cadastrar', (req, res) => {
    const novoProduto = {
        id: produtos.length + 1,
        codigo: req.body.codigo,
        nome: req.body.nome,
        categoria: req.body.categoria,
        preco: req.body.preco,
        estoque: req.body.estoque
    };

    produtos.push(novoProduto);
    res.redirect('/produtos');
});

app.get('/categorias', (req, res) => {
    res.render('categorias/lista', { categorias });
});

app.get('/categorias/cadastrar', (req, res) => {
    res.render('categorias/cadastro');
});

app.post('/categorias/cadastrar', (req, res) => {
    const novaCategoria = {
        id: categorias.length + 1,
        nome: req.body.nome,
        descricao: req.body.descricao
    };

    categorias.push(novaCategoria);
    res.redirect('/categorias');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});