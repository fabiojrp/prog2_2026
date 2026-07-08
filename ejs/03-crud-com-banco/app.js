const express = require('express');
const path = require('path');

const db = require('./database');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// FORMULÁRIO

app.get('/', (req, res) => {

    res.render('index');

});


// CADASTRO

app.post('/salvar', (req, res) => {

    const { nome, email } = req.body;

    db.run(
        'INSERT INTO pessoas(nome, email) VALUES (?, ?)',
        [nome, email],
        function (erro) {

            if (erro) {
                return res.send('Erro ao salvar.');
            }

            res.redirect('/lista');
        }
    );

});


// LISTAGEM

app.get('/lista', (req, res) => {

    db.all(
        'SELECT * FROM pessoas',
        [],
        (erro, registros) => {

            if (erro) {
                return res.send('Erro ao consultar.');
            }

            res.render('lista', {
                pessoas: registros
            });

        }
    );

});

app.listen(3000, () => {
    console.log('Servidor executando...');
});