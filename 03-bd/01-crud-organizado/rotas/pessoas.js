const express = require('express');
const app = express();
const db = require('../bd/database');

app.post('/salvar', (req, res) => {

    const { nome, email } = req.body;

    db.run(
        'INSERT INTO pessoas(nome, email) VALUES (?, ?)',
        [nome, email],
        function (erro) {
            if (erro) {
                return res.send('Erro ao salvar.');
            }
            res.redirect('/pessoas/lista');
        }
    );
});

app.get('/lista', (req, res) => {

    db.all(
        'SELECT * FROM pessoas',
        [],
        (erro, pessoas) => {

            if (erro) {
                return res.send('Erro ao consultar.');
            }

            res.render('lista', {pessoas});
        }
    );
});

module.exports = app;