const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//importa as rotas admin
const rotasAdmin = require('./rotas/admin');
app.use('/admin', rotasAdmin);


const db = require('./banco/database');

app.get('/', (req, res) => {
    let sql = 'SELECT * FROM categorias';
    db.all(sql, [], function (erro, categorias) {
        if (erro) {
            console.log(erro.message);
            return res.send('Erro ao consultar categorias.');
        }
        const categoria = req.query.categoria;
        if (!categoria) {
            return res.render('index', { categorias, produtos: [] });
        }
        sql = 'SELECT * FROM produtos WHERE categoria = ?';

        db.all(sql, [categoria], function (erro, produtos) {
            if (erro) {
                console.log(erro.message);
                return res.send('Erro ao consultar produtos.');
            }
            res.render('index', { categorias, produtos });
        });
    });
});

app.get('/produtos', (req, res) => {

});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});