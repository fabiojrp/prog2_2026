const express = require('express');
const app = express();

const PORT = 3000;

// Configura o EJS como mecanismo de visualização
app.set('view engine', 'ejs');

//olá mundo
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/mensagem', (req, res) => {
  res.render('mensagem', { texto: 'Olá, Mundo!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});