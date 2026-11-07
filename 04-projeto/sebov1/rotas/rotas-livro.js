const express = require('express');
const appLivro = express();
const db = require('../banco/database');

const MAX_RELACIONADOS = 6;


appLivro.get('/:id', (req, res) => {
    db.get(
        'SELECT * FROM livros WHERE id = ?',
        [req.params.id],
        function (erro, livro){
            if (erro){
                return res.send('Erro ao consultar livro.');                
            }
             db.all(
                'SELECT * FROM categorias',
                [],
                function (erro, categorias) {
                    if (erro) {
                        console.log(erro.message);
                        return res.status(500).send('Erro ao consultar categorias.');
                    }
                    res.render('outros/livro', {livro, categorias});
                }
            )
        }
    )
});


module.exports = appLivro;
