const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Página inicial");
});

app.get("/sobre", (req, res) => {
    res.send("Página sobre");
});

app.get("/contato", (req, res) => {
    res.send("Página de contato");
});

app.listen(3000);
console.log("Servidor rodando na porta 3000");