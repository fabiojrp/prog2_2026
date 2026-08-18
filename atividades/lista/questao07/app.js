// Fazer uma aplicação que simule um login, digitando email e senha. Direcionar
// para uma página principal, caso esteja correto, ou voltar para a página inicial
// (login), caso digite os valores inválidos
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const usuarioCorreto = "admin";
const senhaCorreta = "123654";

app.get("/", (req, res)=>{
    res.render("login");
});

app.post("/efetuarLogin", (req, res)=>{
    const {usuario, senha} = req.body;

    if (usuario === usuarioCorreto && senha === senhaCorreta){
        res.render("principal", {usuario});
    }else{
        res.render("login");
    }
});

app.listen(3000);