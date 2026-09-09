const sqlite3 = require('../01-crud-organizado/node_modules/sqlite3/lib/sqlite3').verbose();

const db = new sqlite3.Database('./banco.db', (erro) => {
    if (erro) {
        console.log(erro.message);
    } else {
        console.log('Banco conectado.');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS pessoas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL
        )
    `);

});

module.exports = db;