const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const pessoas = require('./rotas/pessoas');


// FORMULÁRIO
app.get('/', (req, res) => {
    res.render('index');
});


app.use('/pessoas', pessoas);


app.listen(3000, () => {
    console.log('Servidor executando...');
});