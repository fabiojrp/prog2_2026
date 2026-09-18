const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./banco/ecommerce.db', (erro) => {
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
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            categoria TEXT,
            valor FLOAT,
            estoque INTEGER DEFAULT 0
        );
    `);

});

module.exports = db;