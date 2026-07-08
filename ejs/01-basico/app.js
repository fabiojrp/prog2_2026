const express = require('express');
const app = express();
const PORT = 3000;
// Configura o EJS como mecanismo de visualização
app.set('view engine', 'ejs');
// Pasta de arquivos estáticos
app.use(express.static('public'));


app.get('/login', (req, res) => {

    const nome = "Zé";
    res.render('logado', { nome });

});

app.get('/dados-usuario', (req, res) => {
    const usuario = { 
        nome: "Zé", 
        idade: 30, 
        cidade: "São Paulo"
    };
    res.render('dados-usuario', {usuario});
});

app.get('/lista-usuarios', (req, res) => {
    const dados = [
        {nome: "Zé", idade: 30, cidade: "São Paulo"},
        {nome: "Maria", idade: 25, cidade: "Rio de Janeiro"},
        {nome: "João", idade: 35, cidade: "Belo Horizonte"},
    ];
    res.render('lista-usuarios', {dados});
});

app.get('/login/:nome', (req, res) => {

    const nome = req.params.nome;
    res.render('logado', { nome });
});


app.listen(PORT, () => {
    console.log(`Servidor executando em http://localhost:${PORT}`);
});