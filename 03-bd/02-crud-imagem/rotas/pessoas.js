const express = require('express');
const pessoas = express();
const db = require('../bd/database');
const upload = require('../util/imagens');


pessoas.post('/salvar', upload.single('imagem'), (req, res) => {

    const nome = req.body.nome;
    const email = req.body.email;
    const imagem = req.file.filename;

    db.run(
        'INSERT INTO pessoas(nome, email, foto) VALUES (?, ?, ?)',
        [nome, email, imagem],
        function (erro) {
            if (erro) {
                return res.send('Erro ao salvar.');
            }
            res.redirect('/pessoas/lista');
        }
    );
});

pessoas.get('/lista', (req, res) => {

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

module.exports = pessoas;