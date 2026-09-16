const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./banco/meubanco.db', (erro) => {
    if (erro) {
        console.log(erro.message);
    } else {
        console.log('Banco conectado.');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS NOME_DA_TABELA (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            CAMPO1 TEXT NOT NULL,
            CAMPO2 INTEGER NOT NULL,
            CAMPO3 FLOAT NOT NULL
        )
    `);

});

module.exports = db;