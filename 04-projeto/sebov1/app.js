const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

//importa as rotas admin
const appAdmin = require('./rotas/admin');
app.use('/admin', appAdmin);


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});