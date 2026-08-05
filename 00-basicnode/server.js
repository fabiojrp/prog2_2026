const express = require('express')
//import express from 'express'

//import filmesRoutes from "./src/rotas/filmes.routes.js";
const filmesRoutes = require("./src/rotas/filmes.routes.js");
//import usersRoutes from "./src/rotas/users.routes.js";
const usersRoutes = require("./src/rotas/users.routes.js");

// Carregar o banco de dados (SQLITE3)
// import db from './src/db/database.js'
// db.init()

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const PORT = process.env.PORT || 3000;

// Rotas
app.get("/", (req, res) => {
  // res.status(200).json({ message: 'API is running' })
  res.send("Tela Inicial");
});

app.use("/filmes", filmesRoutes);
app.use("/users", usersRoutes); // Usando as mesmas rotas de filmes para usuários como exemplo

// Fallback route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running ON http://localhost:${PORT}`);
});
