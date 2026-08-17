/*
Fazer um aplicação para calcular a média final de um estudante. O usuário deve
fornecer o nome do aluno, a matéria e 03 notas. Ao clicar em “calcular” o usuário
deve receber uma mensagem do tipo: “O aluno João ficou com a média 8 na
disciplina de Programação 2.”
*/
const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let nome = '', materia = '', nota1, nota2, nota3, media = '';

app.get('/', (req, res) => {
  res.render('index', { nome, materia, media  });
});

app.post('/calcular', (req, res) => {
  nome = req.body.nome;
  materia = req.body.materia;
  nota1 = parseFloat(req.body.nota1);
  nota2 = parseFloat(req.body.nota2);
  nota3 = parseFloat(req.body.nota3);
  media = ((nota1 + nota2 + nota3) / 3).toFixed(1);
  res.render('index', { nome, materia, media });
});

app.listen(port);