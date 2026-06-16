const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.get('/pessoa/:nome', (req, res) => {
  res.send(`Olá, ${req.params.nome}!`);
});


app.listen(4040);