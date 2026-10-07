const express = require('express');
const appIndex = express();
const db = require('../banco/database');
const upload = require('../util/imagens');


appIndex.get('/', (req, res) => {
    db.all(
        'SELECT * FROM livros',
        [],
        function (erro, livros) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao consultar livros.');
            }

            db.all(
                'SELECT * FROM categorias',
                [],
                function (erro, categorias) {
                    if (erro) {
                        console.log(erro.message);
                        return res.send('Erro ao consultar categorias.');
                    }
                    res.render('index', { livros, categorias });
                }
            );
        }        
    );
});
module.exports = appIndex;