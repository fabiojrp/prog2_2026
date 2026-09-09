const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
const rotasPessoas = require('./rotas/pessoas');


// FORMULÁRIO
app.get('/', (req, res) => {
    res.render('index');
});


app.use('/pessoas', rotasPessoas);


app.listen(3000, () => {
    console.log('Servidor executando...');
});