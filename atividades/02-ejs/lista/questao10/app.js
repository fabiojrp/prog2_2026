// Fazer cadastro de produtos com as informações: nome, valor, marca e modelo.
// Exibir os dados na forma de tabela, e no final mostrar a soma total dos valores
// de todos os produtos.
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const produtos = [];
let somaTotal = 0;

app.get("/", (req, res)=>{
    res.render("index", { produtos, somaTotal });
});

app.post("/cadastrar", (req, res)=>{
    const { nome, valor, marca, modelo } = req.body;
    produtos.push({ nome, valor, marca, modelo });
    somaTotal += parseFloat(valor);
    res.render("index", { produtos, somaTotal });
});

app.listen(3000);