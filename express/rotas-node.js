const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Página inicial</h1>");
        res.send("<h1>Página inicial222</h1>");

});

app.get("/sobre", (req, res) => {
    res.send("<h2>Página sobre</h2>");
});

app.get("/contato", (req, res) => {
    res.send("<p style=\"color: blue;\">Página de contato</p>");
});

app.listen(3000);
console.log("Servidor rodando na porta 3000");