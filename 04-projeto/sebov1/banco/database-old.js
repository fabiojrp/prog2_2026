const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./banco/sebo.db', (erro) => {
    if (erro) {
        console.log(erro.message);
    } else {
        console.log('Banco conectado.');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS categorias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            descricao TEXT
        );
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS livros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            destaque INTEGER DEFAULT 0,
            categoria TEXT,
            autor TEXT,
            editora TEXT,
            ano INTEGER,
            valor FLOAT,
            sinopse TEXT,
            imagem TEXT
            );
            `);

});

module.exports = db;