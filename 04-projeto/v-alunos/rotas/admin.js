const express = require('express');
const appAdmin = express();
const db = require('../banco/database');
const upload = require('../util/imagens');


//================== ROTAS DE LOGIN/INDEX ==================//
appAdmin.get('/index', (req, res) => {
    res.render('admin/index-admin');
});

appAdmin.get('/', (req, res) => {
    res.render('admin/login');
});

appAdmin.post('/login', (req, res) => {
    //algoritmo de autenticação do usuário - FUTURO
    res.redirect('/admin/index');
});


//================== ROTAS DE CATEGORIAS ==================//
appAdmin.get('/categorias', (req, res) => {
    db.all(
        'SELECT * FROM categorias', 
        [], 
        function (erro, categorias) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao consultar categorias.');
            }
            res.render('admin/categorias/lista', { categorias });
        }
    );
});

appAdmin.get('/categorias/form-cadastrar', (req, res) => {
    res.render('admin/categorias/cadastro');
});

appAdmin.post('/categorias/cadastrar', (req, res) => {
    const nome = req.body.nome;
    const descricao = req.body.descricao;

    db.run(
        `INSERT INTO categorias (nome, descricao) VALUES (?, ?)`,
        [nome, descricao],
        function (erro) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao cadastrar categoria.');
            }
            res.redirect('/admin/categorias');
        }
    );
});

//================== ROTAS DE PRODUTOS ==================//


//ROTA PARA CONSULTAR TODOS OS PRODUTOS
appAdmin.get('/produtos', (req, res) => {
    db.all(


        
    );
});

//ROTA PARA EXIBIR O FORMULÁRIO DE CADASTRO DE PRODUTOS
//Precisa consultar as categorias para popular o select do formulário
appAdmin.get('/produtos/form-cadastrar', (req, res) => {
    db.all(
       

    );
});

appAdmin.post('/produtos/cadastrar', upload.single('imagem'), (req, res) => {
    //const imagem = req.file.filename; // Obtém o nome do arquivo enviado

    db.run(
        
        
    );
});

module.exports = appAdmin;