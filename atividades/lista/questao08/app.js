/*
Fazer uma calculadora simples de 02 números com as 04 operações. A operação
deve ser escolhida em um <select>.
*/

const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let resultado = '';

app.get('/', (req, res) => {
    res.render('index', { resultado });
});

app.post('/calcular', (req, res) => {
    let { numero1, numero2, operacao } = req.body;

    numero1 = parseFloat(numero1);
    numero2 = parseFloat(numero2);
    
    if (operacao === '+') {
        resultado = numero1 + numero2;
    }else if (operacao === '-') {
        resultado = numero1 - numero2;
    } else if (operacao === '*') {
        resultado = numero1 * numero2;
    } else if (operacao === '/') {
        resultado = numero1 / numero2;
    }

    res.render('index', { resultado });
});

app.listen(port);