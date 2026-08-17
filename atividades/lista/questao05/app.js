/*
Fazer um cadastro de produtos que gere um relatório de “baixo estoque”. Além
do nome do produto, o usuário deve fornecer o valor e a quantidade daquele
produto. Ao exibir os produtos cadastrados, devem aparecer somente os
produtos com quantidade menor que 10.
*/
const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let produtos = [];
app.get('/', (req, res) => {
  res.render('index', { produtos});
});

app.post('/cadastrar', (req, res) => {
  produtos.push(req.body);
  // Aqui você pode adicionar o produto a uma lista ou banco de dados
  res.render('index', { produtos });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});