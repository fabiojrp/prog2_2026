// Fazer cadastro de filmes, informando: título, ano de lançamento e estilo (ação,
// aventura, romance, etc) em um <select>. Ao exibir os filmes cadastrados,
// organizar por estilo. Exemplo: exibir todos os filmes de ação, depois todos os de
// aventura, depois todos os filmes de romance, etc.
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const filmes = [];

app.get("/", (req, res)=>{
    res.render("filmes", { filmes });
});

app.post("/", (req, res)=>{
    const { titulo, ano, estilo } = req.body;
    filmes.push({ titulo, ano, estilo });
    res.redirect("/");
});

app.listen(3000);