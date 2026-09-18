const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//importa as rotas admin
const rotasAdmin = require('./rotas/admin');
app.use('/admin', rotasAdmin);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});