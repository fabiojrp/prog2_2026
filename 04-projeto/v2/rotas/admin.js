const express = require('express');
const appAdmin = express();
const db = require('../banco/database');
const upload = require('../util/imagens');


//================= INDEX/LOGIN =====================

appAdmin.get('/index', (req, res) => {
    res.render('admin/index-admin');
});

appAdmin.get('/', (req, res) => {
    res.render('admin/login');
});

appAdmin.post('/login', (req, res) => {
    //algoritmo de autenticação do usuário
    res.redirect('/admin/index');
});


//================= CATEGORIAS =====================

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

appAdmin.get('/categorias/cadastrar', (req, res) => {
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

appAdmin.get('/categorias/excluir/:id', (req, res) => {
    const id = req.params.id;
    db.run(
        'DELETE FROM categorias WHERE id = ?',
        [id],
        function (erro) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao excluir categoria.');
            }
            res.redirect('/admin/categorias');
        }
    );
});

//================= PRODUTOS =====================
appAdmin.get('/produtos', (req, res) => {
    db.all(
        'SELECT * FROM produtos', 
        [],
        function (erro, produtos) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao consultar produtos.');
            }
            res.render('admin/produtos/lista', { produtos });
        }
    );
});

appAdmin.get('/produtos/cadastrar', (req, res) => {
    db.all(
        'SELECT * FROM categorias',
        [],
        function (erro, categorias) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao consultar categorias.');
            }
            res.render('admin/produtos/cadastro', { categorias });
        }
    );
});

appAdmin.post('/produtos/cadastrar', upload.single('imagem'), (req, res) => {
    const nome = req.body.nome;
    const categoria = req.body.categoria;
    const valor = parseFloat(req.body.valor);
    const estoque = parseInt(req.body.estoque);
    const imagem = req.file.filename; // Obtém o nome do arquivo enviado

    db.run(
        `INSERT INTO produtos (nome, categoria, valor, estoque, imagem) VALUES (?, ?, ?, ?, ?)`,
        [nome, categoria, valor, estoque, imagem],
        function (erro) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao cadastrar produto.');
            }
            res.redirect('/admin/produtos');
        }
    );
});

appAdmin.get('/produtos/excluir/:id', (req, res) => {
    const id = req.params.id;
    db.run(
        'DELETE FROM produtos WHERE id = ?',
        [id],
        function (erro) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao excluir produto.');
            }
            res.redirect('/admin/produtos');
        }
    );
});

module.exports = appAdmin;