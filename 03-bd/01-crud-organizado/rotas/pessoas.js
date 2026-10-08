const express = require('express');
const pessoasApp = express();
const db = require('../bd/database');

pessoasApp.post('/salvar', (req, res) => {

    const { nome, email, data_nascimento } = req.body;

    db.run(
        'INSERT INTO pessoas(nome, email, data_nascimento) VALUES (?, ?, ?)',
        [nome, email, data_nascimento],
        function (erro) {
            if (erro) {
                return res.send('Erro ao salvar.');
            }
            res.redirect('/pessoas/listar');
        }
    );
});

pessoasApp.get('/listar', (req, res) => {

    db.all(
        'SELECT * FROM pessoas',
        [],
        (erro, pessoas) => {

            if (erro) {
                return res.send('Erro ao consultar.');
            }
            res.render('lista.ejs', {pessoas});
        }
    );
});

pessoasApp.get('/buscar', (req, res) => {
    db.all(
        'SELECT * FROM pessoas WHERE data_nascimento BETWEEN ? AND ?',
        [data_inicio, data_fim],
        (erro, pessoas) => {
            if (erro) {
                return res.send('Erro ao consultar.');
            }
            res.render('busca.ejs', { pessoas });
        }
    );});

pessoasApp.post('/buscar', (req, res) => {
    const { data_inicio, data_fim } = req.body;

    db.all(
        'SELECT * FROM pessoas WHERE data_nascimento BETWEEN ? AND ?',
        [data_inicio, data_fim],
        (erro, pessoas) => {
            if (erro) {
                return res.send('Erro ao consultar.');
            }
            res.render('busca.ejs', { pessoas });
        }
    );
});

module.exports = pessoasApp;