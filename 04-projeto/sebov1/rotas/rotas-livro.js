const express = require('express');
const appLivro = express();
const db = require('../banco/database');
const gerarSlug = require('../util/slug');

const MAX_RELACIONADOS = 6;

appLivro.get('/:id', (req, res) => {
    db.get(
        'SELECT * FROM livros WHERE id = ?',
        [req.params.id],
        function (erro, livro) {
            if (erro) {
                console.log(erro.message);
                return res.status(500).send('Erro ao consultar o livro.');
            }
            if (!livro) {
                return res.status(404).send('Livro não encontrado.');
            }

            db.all(
                'SELECT * FROM categorias',
                [],
                function (erro, categorias) {
                    if (erro) {
                        console.log(erro.message);
                        return res.status(500).send('Erro ao consultar categorias.');
                    }

                    db.all(
                        'SELECT * FROM livros WHERE categoria = ? AND id <> ? LIMIT ?',
                        [livro.categoria, livro.id, MAX_RELACIONADOS],
                        function (erro, relacionados) {
                            if (erro) {
                                console.log(erro.message);
                                return res.status(500).send('Erro ao consultar livros relacionados.');
                            }

                            const menu = categorias.map(c => ({
                                nome: c.nome,
                                slug: gerarSlug(c.nome)
                            }));

                            res.render('outros/livro', {
                                livro,
                                relacionados,
                                menu,
                                slugCategoria: gerarSlug(livro.categoria)
                            });
                        }
                    );
                }
            );
        }
    );
});

module.exports = appLivro;
