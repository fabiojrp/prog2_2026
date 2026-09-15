const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const db = require('./bd/database');
const port = 3000;


app.get('/', (req, res) => {

    res.render('index', { titulo: 'Olá Mundo!', mensagem: 'Bem-vindo ao meu site!' });
});

app.post('', (req, res) => {
    
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});