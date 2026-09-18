const express = require('express');
const appAdmin = express();
const db = require('../banco/database');
const upload = require('../util/imagens');

appAdmin.get('', (req, res) => {
    res.render('admin/index-admin');
});

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

appAdmin.post('/produtos/cadastrar', (req, res) => {
    const nome = req.body.nome;
    const categoria = req.body.categoria;
    const valor = parseFloat(req.body.valor);
    const estoque = parseInt(req.body.estoque);

    db.run(
        `INSERT INTO produtos (nome, categoria, valor, estoque) VALUES (?, ?, ?, ?)`,
        [nome, categoria, valor, estoque],
        function (erro) {
            if (erro) {
                console.log(erro.message);
            }
            res.redirect('/admin/produtos');
        }
    );
});

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
            }
            res.redirect('/admin/categorias');
        }
    );
});

module.exports = appAdmin;