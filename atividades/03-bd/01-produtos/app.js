const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const db = require('./banco/database.js');

let produtos = [];
app.get('/', (req, res) => {
  res.render('form-cadastro.ejs', { produtos});
});

app.post('/cadastrar', (req, res) => {
  produtos.push(req.body);
  res.render('lista-produtos.ejs', { produtos });
});

app.listen(3000);